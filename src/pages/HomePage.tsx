import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Pin, 
  Clock, 
  CheckCircle, 
  Flame, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Calendar, 
  ShieldAlert, 
  Sparkles, 
  ChevronRight, 
  TrendingUp, 
  MapPin, 
  Compass, 
  Zap,
  Globe
} from 'lucide-react';
import { Opportunity, CategoryType, Province } from '../types';
import { OpportunityCard } from '../components/OpportunityCard';
import { ScamWarningBanner } from '../components/ScamWarningBanner';
import { PathwayMap } from '../components/PathwayMap';
import { calculateCountdown } from '../utils/countdown';
import { playPopSound } from '../utils/sound';

interface HomePageProps {
  opportunities: Opportunity[];
  pinnedIds: string[];
  onTogglePin: (opp: Opportunity) => void;
  onViewDetails: (opp: Opportunity) => void;
  onNavigateToWall: (searchQuery?: string, category?: CategoryType, province?: Province, matchedIds?: string[]) => void;
  onNavigateToToolkit: (resourceId?: string) => void;
  onNavigateToContact: () => void;
  onOpenSavedPins: () => void;
  onOpenScamQuiz: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  opportunities,
  pinnedIds,
  onTogglePin,
  onViewDetails,
  onNavigateToWall,
  onNavigateToToolkit,
  onNavigateToContact,
  onOpenSavedPins,
  onOpenScamQuiz
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playPopSound();
    onNavigateToWall(searchInput.trim());
  };

  const featuredOpportunities = opportunities.filter(o => o.isFeatured).slice(0, 4);

  const closingSoonOpportunities = [...opportunities]
    .sort((a, b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime())
    .slice(0, 4);

  // Muted Plum & Rose Category blocks
  const categoryBlocks: {
    type: CategoryType;
    label: string;
    desc: string;
    emoji: string;
    accentColor: string;
    badgeBg: string;
    count: number;
  }[] = [
    {
      type: 'Job',
      label: 'JOBS',
      desc: 'Verified entry-level, retail & corporate positions with real monthly salaries',
      emoji: '💼',
      accentColor: '#91B8CC',
      badgeBg: '#91B8CC',
      count: opportunities.filter(o => o.category === 'Job').length
    },
    {
      type: 'Learnership',
      label: 'LEARNERSHIPS',
      desc: 'Accredited NQF qualifications with monthly living stipends, tools & data',
      emoji: '⚡',
      accentColor: '#B6A0D1',
      badgeBg: '#B6A0D1',
      count: opportunities.filter(o => o.category === 'Learnership').length
    },
    {
      type: 'Internship',
      label: 'INTERNSHIPS',
      desc: 'Graduate & TVET rotations in banking, cloud infrastructure & tech labs',
      emoji: '🚀',
      accentColor: '#D99AB8',
      badgeBg: '#D99AB8',
      count: opportunities.filter(o => o.category === 'Internship').length
    },
    {
      type: 'Bursary',
      label: 'BURSARIES',
      desc: 'Full-ride undergraduate funding covering tuition, residence, and book allowances',
      emoji: '💎',
      accentColor: '#D99AB8',
      badgeBg: '#D99AB8',
      count: opportunities.filter(o => o.category === 'Bursary').length
    },
    {
      type: 'Course',
      label: 'COURSES',
      desc: 'Zero-tuition coding bootcamps & fully subsidised vendor certifications',
      emoji: '💻',
      accentColor: '#91B8CC',
      badgeBg: '#91B8CC',
      count: opportunities.filter(o => o.category === 'Course').length
    },
    {
      type: 'Event',
      label: 'CAREER HUBS',
      desc: 'Youth expos, SAYouth data-free networks, and employer hiring days',
      emoji: '🌐',
      accentColor: '#B6A0D1',
      badgeBg: '#B6A0D1',
      count: opportunities.filter(o => o.category === 'Event').length
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Scam Warning Notice Pinned to Top */}
      <ScamWarningBanner 
        onOpenScamQuiz={onOpenScamQuiz}
        onNavigateContact={onNavigateToContact}
      />

      {/* Hero Section: Muted Plum & Rose Header */}
      <section className="relative px-4 sm:px-6 max-w-7xl mx-auto pt-4">
        <div className="cyber-card rounded-3xl p-6 sm:p-12 relative overflow-hidden">
          <div className="max-w-4xl relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[#D99AB8] text-[#211525] font-mono font-black text-xs uppercase tracking-wider rounded-lg">
                ⚡ VERIFIED YOUTH PORTAL · 2026
              </span>
              <span className="text-xs font-mono text-[#91B8CC] uppercase tracking-widest hidden sm:inline flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                Live Real-Life Intakes Only
              </span>
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.93] uppercase text-[#F1EAF2]">
              YOUR FUTURE, <span className="text-[#D99AB8]">PINNED.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg font-medium max-w-2xl leading-relaxed text-[#B6AAB9]">
              Explore verified South African jobs, learnerships, bursaries, and courses. Every listing links directly to legitimate, currently open real-life portals with zero recruitment fees.
            </p>

            {/* Prominent Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl">
              <div className="relative flex flex-col sm:flex-row items-stretch gap-2 bg-[#100D16]/90 border border-[rgba(73,52,73,0.85)] rounded-2xl p-2 transition-all focus-within:border-[#D99AB8]">
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-5 h-5 text-[#91B8CC] shrink-0" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search e.g. 'Software', 'Gauteng', 'Vodacom', 'Matric', 'Bursary'..."
                    className="w-full pl-3 pr-2 py-2.5 text-sm sm:text-base font-medium text-[#F1EAF2] placeholder:text-[#B6AAB9] bg-transparent outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D99AB8] text-[#211525] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#C989A8] transition-all active:scale-95 shrink-0"
                >
                  SEARCH THE BOARD
                </button>
              </div>
            </form>

            {/* Hero Quick Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateToWall()}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#91B8CC] text-[#211525] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#91B8CC]/90 transition-all hover:scale-102"
              >
                <span>BROWSE REAL OPPORTUNITIES</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSavedPins}
                className="flex items-center gap-2 px-5 py-3.5 font-heading font-bold text-xs uppercase rounded-xl border border-[rgba(73,52,73,0.85)] bg-[rgba(33,25,37,0.92)] text-[#F1EAF2] hover:border-[#D99AB8] transition-colors"
              >
                <Pin className="w-4 h-4 fill-[#B6A0D1] text-[#B6A0D1]" />
                <span>SAVED FOR LATER ({pinnedIds.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Youth Journey Pathway Map Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <PathwayMap
          opportunities={opportunities}
          pinnedIds={pinnedIds}
          onTogglePin={onTogglePin}
          onViewDetails={onViewDetails}
          onFilterWallByPathway={(matchedIds) => onNavigateToWall(undefined, undefined, undefined, matchedIds)}
        />
      </section>

      {/* Featured Bulletin Opportunities */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D99AB8] inline-block"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B6AAB9]">
                VERIFIED REAL-LIFE OPENINGS
              </span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#F1EAF2]">
              FEATURED ON THE BULLETIN
            </h2>
          </div>

          <button
            onClick={() => onNavigateToWall()}
            className="flex items-center gap-1.5 font-heading font-bold text-xs uppercase px-4 py-2 border rounded-xl transition-colors bg-[rgba(33,25,37,0.92)] text-[#F1EAF2] border-[rgba(73,52,73,0.85)] hover:border-[#91B8CC]"
          >
            <span>View All ({opportunities.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pinned cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {featuredOpportunities.map((opp) => (
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
      </section>

      {/* Category Blocks Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#91B8CC] block mb-1">
            EXPLORE PATHWAYS
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#F1EAF2]">
            CHOOSE YOUR TRACK
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryBlocks.map((cat) => (
            <div
              key={cat.type}
              onClick={() => onNavigateToWall(undefined, cat.type)}
              className="cyber-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between min-h-[180px] group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#100D16] border border-[rgba(73,52,73,0.85)] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                  {cat.emoji}
                </div>
                <span 
                  style={{ borderColor: cat.accentColor, color: cat.accentColor }}
                  className="px-2.5 py-1 bg-[#100D16] font-mono font-black text-xs uppercase rounded-lg border"
                >
                  {cat.count} ACTIVE
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-heading font-black text-xl uppercase tracking-tight text-[#F1EAF2] group-hover:text-[#D99AB8] transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs font-medium mt-1 line-clamp-2 text-[#B6AAB9]">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[rgba(73,52,73,0.6)] flex items-center justify-between text-xs font-bold font-mono uppercase text-[#91B8CC]">
                <span>Explore Openings</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Deadlines List */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="cyber-card rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[rgba(73,52,73,0.85)]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-[#D99AB8] fill-[#D99AB8]" />
                <span className="text-xs font-mono font-black uppercase tracking-wider text-[#D99AB8]">
                  DEADLINE COUNTDOWN
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#F1EAF2]">
                🔥 CLOSING SOONEST IN REAL LIFE
              </h2>
            </div>
            <span className="px-3 py-1 bg-[#D99AB8] text-[#211525] font-mono font-black text-xs uppercase rounded-lg">
              APPLY BEFORE CUT-OFF
            </span>
          </div>

          <div className="space-y-3">
            {closingSoonOpportunities.map((opp) => {
              const countdown = calculateCountdown(opp.closingDate);
              return (
                <div
                  key={opp.id}
                  onClick={() => onViewDetails(opp)}
                  className="p-4 rounded-xl border border-[rgba(73,52,73,0.85)] bg-[#100D16]/80 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-[#D99AB8] cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D99AB8] text-[#211525] flex items-center justify-center font-heading font-black text-sm shrink-0">
                      {opp.organisationInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 bg-[rgba(33,25,37,0.92)] text-[#91B8CC] text-[10px] font-mono uppercase font-bold rounded border border-[rgba(73,52,73,0.85)]">
                          {opp.category}
                        </span>
                        <span className="text-xs font-bold text-[#B6AAB9]">
                          {opp.organisation}
                        </span>
                      </div>
                      <h4 className="font-heading font-black text-base sm:text-lg text-[#F1EAF2] mt-0.5">
                        {opp.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                    <div className="text-left md:text-right">
                      <div className="text-[10px] font-mono uppercase text-[#B6AAB9]">
                        Remaining
                      </div>
                      <div className="text-sm font-mono font-black text-[#D99AB8]">
                        {countdown.formattedString}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(opp);
                      }}
                      className="px-4 py-2 bg-[#91B8CC] text-[#211525] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#91B8CC]/90 transition-colors"
                    >
                      View Poster →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Career Resources Teaser Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D99AB8] block mb-1">
              THE TOOLKIT
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#F1EAF2]">
              🧰 CAREER PREP GUIDES
            </h2>
          </div>

          <button
            onClick={() => onNavigateToToolkit()}
            className="flex items-center gap-1.5 font-heading font-bold text-xs uppercase px-4 py-2 border rounded-xl bg-[rgba(33,25,37,0.92)] text-[#F1EAF2] border-[rgba(73,52,73,0.85)] hover:border-[#B6A0D1]"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div 
            onClick={() => onNavigateToToolkit('cv')}
            className="cyber-card p-6 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all"
          >
            <span className="px-2.5 py-0.5 bg-[#91B8CC] text-[#211525] font-mono text-[10px] font-black uppercase rounded-md">
              GUIDE 01
            </span>
            <h3 className="font-heading font-black text-xl uppercase tracking-tight mt-3 text-[#F1EAF2]">
              "YOUR CV, SORTED"
            </h3>
            <p className="text-xs text-[#B6AAB9] mt-2 leading-relaxed">
              Standard South African 2-page CV structure, ATS keywords, and avoiding outdated clutter like ID photo selfies.
            </p>
            <div className="mt-4 pt-2 border-t border-[rgba(73,52,73,0.6)] text-xs font-bold font-mono uppercase text-[#91B8CC] flex items-center justify-between">
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => onNavigateToToolkit('interview')}
            className="cyber-card p-6 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all"
          >
            <span className="px-2.5 py-0.5 bg-[#B6A0D1] text-[#211525] font-mono text-[10px] font-black uppercase rounded-md">
              GUIDE 02
            </span>
            <h3 className="font-heading font-black text-xl uppercase tracking-tight mt-3 text-[#F1EAF2]">
              "OWN THE INTERVIEW"
            </h3>
            <p className="text-xs text-[#B6AAB9] mt-2 leading-relaxed">
              Master the STAR method for situational questions, prepare questions for the panel, and ace phone screenings.
            </p>
            <div className="mt-4 pt-2 border-t border-[rgba(73,52,73,0.6)] text-xs font-bold font-mono uppercase text-[#B6A0D1] flex items-center justify-between">
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => onNavigateToToolkit('scam')}
            className="cyber-card p-6 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all"
          >
            <span className="px-2.5 py-0.5 bg-[#D99AB8] text-[#211525] font-mono text-[10px] font-black uppercase rounded-md">
              GUIDE 03
            </span>
            <h3 className="font-heading font-black text-xl uppercase tracking-tight mt-3 text-[#F1EAF2]">
              "SPOT THE SCAM"
            </h3>
            <p className="text-xs text-[#B6AAB9] mt-2 leading-relaxed">
              Recognize fraudulent job ads, protect your money from fake medical booking charges, and verify employer domains.
            </p>
            <div className="mt-4 pt-2 border-t border-[rgba(73,52,73,0.6)] text-xs font-bold font-mono uppercase text-[#D99AB8] flex items-center justify-between">
              <span>Take Scam Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
