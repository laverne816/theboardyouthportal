import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  RotateCcw, 
  MapPin, 
  ArrowUpDown, 
  Inbox,
  Compass
} from 'lucide-react';
import { Opportunity, CategoryType, Province, ExperienceLevel } from '../types';
import { OpportunityCard } from '../components/OpportunityCard';
import { PROVINCES, CATEGORY_THEMES } from '../data/opportunities';
import { playPopSound } from '../utils/sound';

interface OpportunitiesPageProps {
  opportunities: Opportunity[];
  pinnedIds: string[];
  onTogglePin: (opp: Opportunity) => void;
  onViewDetails: (opp: Opportunity) => void;
  initialQuery?: string;
  initialCategory?: CategoryType;
  initialProvince?: Province;
  initialMatchedIds?: string[];
}

type SortOption = 'closing_soon' | 'newest' | 'alphabetical';
type DateFilter = 'all' | 'this_week' | 'this_month';

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({
  opportunities,
  pinnedIds,
  onTogglePin,
  onViewDetails,
  initialQuery = '',
  initialCategory,
  initialProvince,
  initialMatchedIds
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedProvince, setSelectedProvince] = useState<Province | 'All'>(
    initialProvince || 'All'
  );
  const [selectedLevels, setSelectedLevels] = useState<ExperienceLevel[]>([]);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('closing_soon');
  const [pathwayFilterActive, setPathwayFilterActive] = useState<boolean>(
    !!(initialMatchedIds && initialMatchedIds.length > 0)
  );

  useEffect(() => {
    if (initialMatchedIds && initialMatchedIds.length > 0) {
      setPathwayFilterActive(true);
    }
  }, [initialMatchedIds]);

  const categoriesList: CategoryType[] = ['Job', 'Learnership', 'Internship', 'Bursary', 'Course', 'Event'];
  const levelsList: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

  const handleToggleCategory = (cat: CategoryType) => {
    playPopSound();
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleToggleLevel = (lvl: ExperienceLevel) => {
    playPopSound();
    setSelectedLevels(prev => 
      prev.includes(lvl) ? prev.filter(l => l !== lvl) : [...prev, lvl]
    );
  };

  const handleResetFilters = () => {
    playPopSound();
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedProvince('All');
    setSelectedLevels([]);
    setDateFilter('all');
    setSortBy('closing_soon');
    setPathwayFilterActive(false);
  };

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      // Pathway match filter if active
      if (pathwayFilterActive && initialMatchedIds && initialMatchedIds.length > 0) {
        if (!initialMatchedIds.includes(opp.id)) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesOrg = opp.organisation.toLowerCase().includes(q);
        const matchesDesc = opp.shortDescription.toLowerCase().includes(q);
        const matchesTag = opp.tags.some(t => t.toLowerCase().includes(q));
        const matchesLoc = opp.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOrg && !matchesDesc && !matchesTag && !matchesLoc) {
          return false;
        }
      }

      // Categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(opp.category)) {
        return false;
      }

      // Province
      if (selectedProvince !== 'All' && opp.province !== selectedProvince) {
        return false;
      }

      // Experience level
      if (selectedLevels.length > 0 && !selectedLevels.includes(opp.experienceLevel)) {
        return false;
      }

      // Date quick filter
      if (dateFilter !== 'all') {
        const target = new Date(opp.closingDate).getTime();
        const now = new Date().getTime();
        const diffDays = (target - now) / (1000 * 60 * 60 * 24);

        if (dateFilter === 'this_week' && (diffDays > 7 || diffDays < 0)) {
          return false;
        }
        if (dateFilter === 'this_month' && (diffDays > 30 || diffDays < 0)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'closing_soon') {
        return new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime();
      }
      if (sortBy === 'newest') {
        return b.id.localeCompare(a.id);
      }
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [opportunities, searchQuery, selectedCategories, selectedProvince, selectedLevels, dateFilter, sortBy, pathwayFilterActive, initialMatchedIds]);

  const hasActiveFilters = searchQuery.trim() !== '' || 
    selectedCategories.length > 0 || 
    selectedProvince !== 'All' || 
    selectedLevels.length > 0 || 
    dateFilter !== 'all' ||
    pathwayFilterActive;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Page Title & Banner */}
      <div className="cyber-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-[#D99AB8] text-[#211525] font-mono font-black text-xs uppercase rounded-md">
                THE WALL 📌
              </span>
              <span className="text-xs font-mono text-[#B6AAB9] uppercase tracking-widest">
                Real-Time Verified Opportunities
              </span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F1EAF2]">
              ALL PINNED OPPORTUNITIES
            </h1>
            <p className="text-xs sm:text-sm text-[#B6AAB9] mt-1 max-w-2xl font-medium">
              Filter by track, location, closing date, or experience level. Every opportunity is vetted for zero-fee authenticity.
            </p>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="font-mono text-xs font-bold text-[#B6AAB9] block uppercase">
              CURRENTLY POSTED
            </span>
            <span className="font-heading font-black text-3xl sm:text-4xl text-[#91B8CC]">
              {filteredOpportunities.length} <span className="text-base text-[#B6AAB9] font-mono font-normal">/ {opportunities.length}</span>
            </span>
          </div>
        </div>

        {/* Active Pathway Banner */}
        {pathwayFilterActive && initialMatchedIds && (
          <div className="mt-4 p-3 bg-[#B6A0D1]/15 border border-[#B6A0D1]/40 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#B6A0D1]">
              <Compass className="w-4 h-4" />
              <span className="font-mono font-bold">
                Filtered by your custom Youth Pathway ({initialMatchedIds.length} recommended openings)
              </span>
            </div>
            <button
              onClick={() => setPathwayFilterActive(false)}
              className="text-xs font-mono underline hover:text-[#F1EAF2]"
            >
              Clear Pathway Filter
            </button>
          </div>
        )}
      </div>

      {/* Filter and Control Matrix */}
      <div className="cyber-card rounded-2xl p-5 sm:p-6 space-y-6">
        {/* Search Bar & Quick Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Main search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D99AB8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword (e.g. Vodacom, IT, Bursary, Retail, Cape Town)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(73,52,73,0.85)] bg-[#100D16]/90 text-xs text-[#F1EAF2] placeholder:text-[#B6AAB9] focus:outline-none focus:border-[#D99AB8]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#B6AAB9] hover:text-[#F1EAF2]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Province selector */}
          <div className="flex items-center gap-2">
            <div className="relative min-w-[180px]">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#91B8CC]" />
              <select
                value={selectedProvince}
                onChange={(e) => {
                  playPopSound();
                  setSelectedProvince(e.target.value as Province | 'All');
                }}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-[rgba(73,52,73,0.85)] bg-[#100D16] text-xs text-[#F1EAF2] font-semibold appearance-none focus:outline-none focus:border-[#91B8CC]"
              >
                <option value="All">All 9 Provinces (SA)</option>
                {PROVINCES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[170px]">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#B6A0D1]" />
              <select
                value={sortBy}
                onChange={(e) => {
                  playPopSound();
                  setSortBy(e.target.value as SortOption);
                }}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-[rgba(73,52,73,0.85)] bg-[#100D16] text-xs text-[#F1EAF2] font-semibold appearance-none focus:outline-none focus:border-[#B6A0D1]"
              >
                <option value="closing_soon">Closing Soonest</option>
                <option value="newest">Recently Added</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Multi-Select Chips */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-[#B6AAB9] mb-2.5">
            Filter by Category:
          </label>
          <div className="flex flex-wrap gap-2">
            {categoriesList.map(cat => {
              const isSelected = selectedCategories.includes(cat);
              const theme = CATEGORY_THEMES[cat];

              return (
                <button
                  key={cat}
                  onClick={() => handleToggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-heading font-black uppercase transition-all duration-150 flex items-center gap-1.5 border ${
                    isSelected 
                      ? 'bg-[#D99AB8] text-[#211525] border-[#D99AB8] translate-y-[-1px]'
                      : 'bg-[#100D16]/80 text-[#B6AAB9] border-[rgba(73,52,73,0.85)] hover:border-[#D99AB8] hover:text-[#F1EAF2]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: isSelected ? '#211525' : theme.badgeBg }}
                  ></span>
                  <span>{cat}s</span>
                  {isSelected && <span className="ml-0.5 text-[10px]">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience Level & Closing Date Quick Filters */}
        <div className="pt-4 border-t border-[rgba(73,52,73,0.6)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#B6AAB9] mr-1">
              Level:
            </span>
            {levelsList.map(lvl => {
              const isSelected = selectedLevels.includes(lvl);
              return (
                <button
                  key={lvl}
                  onClick={() => handleToggleLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border ${
                    isSelected
                      ? 'bg-[#91B8CC] text-[#211525] border-[#91B8CC] font-bold'
                      : 'bg-[#100D16] text-[#B6AAB9] border-[rgba(73,52,73,0.85)] hover:border-[#91B8CC] hover:text-[#F1EAF2]'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#B6AAB9] mr-1">
              Closing:
            </span>
            {(['all', 'this_week', 'this_month'] as DateFilter[]).map(d => (
              <button
                key={d}
                onClick={() => {
                  playPopSound();
                  setDateFilter(d);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border ${
                  dateFilter === d
                    ? 'bg-[#B6A0D1] text-[#211525] border-[#B6A0D1] font-bold'
                    : 'bg-[#100D16] text-[#B6AAB9] border-[rgba(73,52,73,0.85)] hover:border-[#B6A0D1] hover:text-[#F1EAF2]'
                }`}
              >
                {d === 'all' ? 'All Deadlines' : d === 'this_week' ? 'Closing This Week (<7d)' : 'This Month (<30d)'}
              </button>
            ))}
          </div>

          {/* Reset button if active */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs font-mono font-bold text-[#D99AB8] hover:underline ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Opportunity Cards */}
      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              isPinned={pinnedIds.includes(opp.id)}
              onTogglePin={onTogglePin}
              onViewDetails={onViewDetails}
              applyRotation={false}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="cyber-card rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[rgba(33,25,37,0.92)] border border-[rgba(73,52,73,0.85)] mx-auto flex items-center justify-center">
            <Inbox className="w-8 h-8 text-[#D99AB8]" />
          </div>
          <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-[#F1EAF2]">
            NOTHING PINNED HERE YET
          </h3>
          <p className="text-xs sm:text-sm text-[#B6AAB9] max-w-md mx-auto">
            We couldn't find any opportunities matching your active filter criteria. Try clearing some filters to see all available listings.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#91B8CC] text-[#211525] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#91B8CC]/90 transition-transform active:scale-95"
            >
              RESET ALL FILTERS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
