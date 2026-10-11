import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { ToolkitPage } from './pages/ToolkitPage';
import { ContactPage } from './pages/ContactPage';
import { PathwayMap } from './components/PathwayMap';
import { OpportunityModal } from './components/OpportunityModal';
import { SavedPinsDrawer } from './components/SavedPinsDrawer';
import { ProjectDashboardModal } from './components/ProjectDashboardModal';
import { ScamQuizModal } from './components/ScamQuizModal';
import { SAMPLE_OPPORTUNITIES } from './data/opportunities';
import { Opportunity, CategoryType, Province } from './types';
import { 
  getPinnedIds, 
  togglePinId, 
  addRecentlyViewedId 
} from './utils/storage';
import { isSoundEnabled, toggleSound } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'opportunities' | 'pathway' | 'toolkit' | 'contact'>('home');
  const [opportunities] = useState<Opportunity[]>(SAMPLE_OPPORTUNITIES);
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => getPinnedIds());
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modals & Drawers
  const [isSavedPinsOpen, setIsSavedPinsOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isScamQuizOpen, setIsScamQuizOpen] = useState(false);

  // Cross-page navigation presets
  const [wallInitialQuery, setWallInitialQuery] = useState('');
  const [wallInitialCategory, setWallInitialCategory] = useState<CategoryType | undefined>(undefined);
  const [wallInitialProvince, setWallInitialProvince] = useState<Province | undefined>(undefined);
  const [wallInitialMatchedIds, setWallInitialMatchedIds] = useState<string[] | undefined>(undefined);
  const [toolkitInitialResource, setToolkitInitialResource] = useState<string | undefined>(undefined);

  const [soundActive, setSoundActive] = useState<boolean>(() => isSoundEnabled());

  // Handle escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setIsSavedPinsOpen(false);
        setIsDashboardOpen(false);
        setIsScamQuizOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
  };

  const handleTogglePin = (opp: Opportunity) => {
    togglePinId(opp.id);
    setPinnedIds(getPinnedIds());
  };

  const handleUnpinFromDrawer = (id: string) => {
    togglePinId(id);
    setPinnedIds(getPinnedIds());
  };

  const handleViewDetails = (opp: Opportunity) => {
    addRecentlyViewedId(opp.id);
    setSelectedOpportunity(opp);
    setIsModalOpen(true);
  };

  const handleNavigateToWall = (
    query?: string, 
    category?: CategoryType, 
    province?: Province, 
    matchedIds?: string[]
  ) => {
    setWallInitialQuery(query || '');
    setWallInitialCategory(category);
    setWallInitialProvince(province);
    setWallInitialMatchedIds(matchedIds);
    setActiveTab('opportunities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToToolkit = (resourceId?: string) => {
    setToolkitInitialResource(resourceId);
    setActiveTab('toolkit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pinnedOpportunities = opportunities.filter(o => pinnedIds.includes(o.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#100D16] text-[#F1EAF2] bg-cyber-grid selection:bg-[#D99AB8] selection:text-[#211525]">
      {/* Top Navbar with 3-line menu */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pinnedCount={pinnedIds.length}
        onOpenSavedPins={() => setIsSavedPinsOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        soundEnabled={soundActive}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full pt-4">
        {activeTab === 'home' && (
          <HomePage
            opportunities={opportunities}
            pinnedIds={pinnedIds}
            onTogglePin={handleTogglePin}
            onViewDetails={handleViewDetails}
            onNavigateToWall={handleNavigateToWall}
            onNavigateToToolkit={handleNavigateToToolkit}
            onNavigateToContact={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSavedPins={() => setIsSavedPinsOpen(true)}
            onOpenScamQuiz={() => setIsScamQuizOpen(true)}
          />
        )}

        {activeTab === 'pathway' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            <div className="cyber-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-[#B6A0D1] text-[#211525] font-mono font-black text-xs uppercase rounded-md">
                      🚀 FLIGHTPATH ENGINE
                    </span>
                    <span className="text-xs font-mono text-[#B6AAB9] uppercase tracking-widest">
                      Custom Mzansi Trajectory
                    </span>
                  </div>
                  <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F1EAF2]">
                    THE YOUTH PATHWAY MAP 🗺️
                  </h1>
                  <p className="text-xs sm:text-sm text-[#B6AAB9] mt-2 max-w-2xl font-medium leading-relaxed">
                    Choose your status, latest qualification, and experience level below. The engine will chart your milestone roadmap with realistic stipends and filter real verified South African opportunities.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNavigateToWall()}
                    className="px-4 py-2 bg-[#91B8CC] text-[#211525] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#91B8CC]/90 transition-transform active:scale-95"
                  >
                    Explore The Wall 📌
                  </button>
                </div>
              </div>
            </div>

            <PathwayMap
              opportunities={opportunities}
              pinnedIds={pinnedIds}
              onTogglePin={handleTogglePin}
              onViewDetails={handleViewDetails}
              onFilterWallByPathway={(matchedIds) => handleNavigateToWall(undefined, undefined, undefined, matchedIds)}
            />
          </div>
        )}

        {activeTab === 'opportunities' && (
          <OpportunitiesPage
            opportunities={opportunities}
            pinnedIds={pinnedIds}
            onTogglePin={handleTogglePin}
            onViewDetails={handleViewDetails}
            initialQuery={wallInitialQuery}
            initialCategory={wallInitialCategory}
            initialProvince={wallInitialProvince}
            initialMatchedIds={wallInitialMatchedIds}
          />
        )}

        {activeTab === 'toolkit' && (
          <ToolkitPage
            initialResourceId={toolkitInitialResource}
            onOpenScamQuiz={() => setIsScamQuizOpen(true)}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectCategory={(cat) => handleNavigateToWall(undefined, cat as CategoryType)}
        onSelectProvince={(prov) => handleNavigateToWall(undefined, undefined, prov as Province)}
        onOpenScamQuiz={() => setIsScamQuizOpen(true)}
      />

      {/* Detail Poster Modal ("THE PINNED POSTER") */}
      {isModalOpen && selectedOpportunity && (
        <OpportunityModal
          opportunity={selectedOpportunity}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isPinned={pinnedIds.includes(selectedOpportunity.id)}
          onTogglePin={handleTogglePin}
        />
      )}

      {/* Saved Pins Slide-out Drawer */}
      {isSavedPinsOpen && (
        <SavedPinsDrawer
          isOpen={isSavedPinsOpen}
          onClose={() => setIsSavedPinsOpen(false)}
          pinnedOpportunities={pinnedOpportunities}
          onUnpin={handleUnpinFromDrawer}
          onSelectOpportunity={handleViewDetails}
          onOpenDashboard={() => setIsDashboardOpen(true)}
        />
      )}

      {/* Project Dashboard & Kanban Tracker Modal */}
      {isDashboardOpen && (
        <ProjectDashboardModal
          isOpen={isDashboardOpen}
          onClose={() => setIsDashboardOpen(false)}
          opportunities={opportunities}
          onSelectOpportunity={handleViewDetails}
        />
      )}

      {/* Spot The Scam Interactive Quiz Modal */}
      {isScamQuizOpen && (
        <ScamQuizModal
          isOpen={isScamQuizOpen}
          onClose={() => setIsScamQuizOpen(false)}
        />
      )}
    </div>
  );
}
