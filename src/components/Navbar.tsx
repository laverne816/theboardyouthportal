import React, { useState } from 'react';
import { 
  Pin, 
  Volume2, 
  VolumeX, 
  LayoutDashboard,
  CheckCircle2,
  X
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'opportunities' | 'pathway' | 'toolkit' | 'contact';
  setActiveTab: (tab: 'home' | 'opportunities' | 'pathway' | 'toolkit' | 'contact') => void;
  pinnedCount: number;
  onOpenSavedPins: () => void;
  onOpenDashboard: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  pinnedCount,
  onOpenSavedPins,
  onOpenDashboard,
  soundEnabled,
  onToggleSound
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'The Board', tag: 'HUB', emoji: '✨' },
    { id: 'pathway', label: 'Pathway Map', tag: 'FLIGHTPATH', emoji: '🚀' },
    { id: 'opportunities', label: 'The Wall', tag: 'EXPLORE', emoji: '📌' },
    { id: 'toolkit', label: 'The Toolkit', tag: 'GUIDES', emoji: '🧰' },
    { id: 'contact', label: 'Pin a Note', tag: 'DESK', emoji: '📝' }
  ] as const;

  const handleNavClick = (tab: typeof navItems[number]['id']) => {
    setActiveTab(tab);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[rgba(16,13,22,0.96)] backdrop-blur-xl border-b border-[rgba(73,52,73,0.85)] transition-all">
        {/* Top Minimal Ticker */}
        <div className="px-4 py-1.5 text-xs font-semibold flex items-center justify-between border-b border-[rgba(73,52,73,0.5)] bg-[rgba(33,25,37,0.7)]">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-block px-2 py-0.5 bg-[#D99AB8] text-[#211525] text-[10px] font-mono uppercase tracking-wider rounded font-black">
              VERIFIED PORTAL
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#B6AAB9]">
              South Africa's Official Zero-Fee Youth Opportunities Bulletin · Hand-Checked Real Intakes
            </span>
            <span className="sm:hidden font-mono text-[11px] text-[#F1EAF2]">
              🇿🇦 Verified SA Youth Board
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:flex items-center gap-1 font-mono text-[11px] text-[#91B8CC]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Real Live Portals
            </span>
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute sound effects' : 'Enable tactile sounds'}
              aria-label="Toggle sound effects"
              className="p-1 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-[#D99AB8] rounded text-[#B6A0D1]"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#D99AB8]" /> : <VolumeX className="w-3.5 h-3.5 opacity-50" />}
            </button>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Zone */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-[#D99AB8]"
            >
              <div className="w-9 h-9 rounded-xl border border-[rgba(73,52,73,0.85)] bg-[rgba(33,25,37,0.92)] p-[1.5px] group-hover:border-[#D99AB8] transition-colors">
                <div className="w-full h-full bg-[#100D16] rounded-[10px] flex items-center justify-center font-black text-xl font-heading text-[#D99AB8]">
                  B
                </div>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight font-heading uppercase leading-none block text-[#F1EAF2]">
                  THE BOARD
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B6AAB9] block">
                  Your future, pinned.
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded-xl border ${
                    isActive
                      ? 'bg-[#D99AB8] text-[#211525] border-[#D99AB8] font-black'
                      : 'text-[#B6AAB9] border-transparent hover:text-[#F1EAF2] hover:bg-[rgba(33,25,37,0.92)] hover:border-[rgba(73,52,73,0.85)]'
                  }`}
                >
                  <span className="mr-1">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Cluster with 3-Line Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Saved Pins Button */}
            <button
              onClick={onOpenSavedPins}
              aria-label="View saved opportunities"
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#B6A0D1] text-[#211525] rounded-xl transition-colors hover:bg-[#B6A0D1]/90"
            >
              <Pin className="w-3.5 h-3.5 fill-[#211525]" />
              <span className="hidden sm:inline">Pins</span>
              <span className="ml-1 px-1.5 py-0.2 bg-[#100D16] text-[#B6A0D1] text-xs font-mono font-black rounded">
                {pinnedCount}
              </span>
            </button>

            {/* Application Tracker Button */}
            <button
              onClick={onOpenDashboard}
              aria-label="Open application tracker"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-[rgba(73,52,73,0.85)] bg-[rgba(33,25,37,0.92)] text-[#F1EAF2] rounded-xl hover:border-[#D99AB8] transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#91B8CC]" />
              <span>Tracker</span>
            </button>

            {/* Three-Line Menu Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu drawer"
              title="Menu navigation"
              className="flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-xl border border-[rgba(73,52,73,0.85)] bg-[rgba(33,25,37,0.92)] hover:border-[#D99AB8] transition-all active:scale-95 shadow-none"
            >
              <span className="w-4 h-0.5 rounded-full bg-[#D99AB8]"></span>
              <span className="w-4 h-0.5 rounded-full bg-[#B6A0D1]"></span>
              <span className="w-4 h-0.5 rounded-full bg-[#91B8CC]"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Full Navigation Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#100D16]/80 backdrop-blur-md flex justify-end animate-fadeIn">
          <div className="w-full max-w-sm h-full flex flex-col border-l border-[rgba(73,52,73,0.85)] shadow-2xl p-6 bg-[#100D16]/95 text-[#F1EAF2]">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(73,52,73,0.85)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D99AB8] text-[#211525] flex items-center justify-center font-bold font-heading">
                  B
                </div>
                <div>
                  <h3 className="font-heading font-black text-lg uppercase leading-none text-[#F1EAF2]">THE BOARD</h3>
                  <span className="text-[10px] font-mono text-[#B6AAB9] uppercase">PORTAL MENU</span>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg border border-[rgba(73,52,73,0.85)] hover:bg-[rgba(33,25,37,0.92)]"
                aria-label="Close menu drawer"
              >
                <X className="w-5 h-5 text-[#B6AAB9]" />
              </button>
            </div>

            {/* Navigation List */}
            <div className="flex-1 overflow-y-auto py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    activeTab === item.id
                      ? 'bg-[#D99AB8] text-[#211525] border-[#D99AB8] font-black'
                      : 'bg-[rgba(33,25,37,0.7)] text-[#B6AAB9] border-[rgba(73,52,73,0.6)] hover:border-[#B6A0D1] hover:text-[#F1EAF2]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.emoji}</span>
                    <span className="font-heading font-black text-sm uppercase tracking-wide">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40">
                    {item.tag}
                  </span>
                </button>
              ))}

              <div className="pt-4 border-t border-[rgba(73,52,73,0.85)] space-y-2">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenDashboard();
                  }}
                  className="w-full text-left p-3.5 rounded-xl border border-[#91B8CC]/40 bg-[#91B8CC]/10 text-[#F1EAF2] flex items-center justify-between hover:bg-[#91B8CC]/20"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-[#91B8CC]" />
                    <span className="font-heading font-black text-sm uppercase">Application Tracker</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#91B8CC]">KANBAN</span>
                </button>

                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenSavedPins();
                  }}
                  className="w-full text-left p-3.5 rounded-xl border border-[#B6A0D1]/40 bg-[#B6A0D1]/10 text-[#F1EAF2] flex items-center justify-between hover:bg-[#B6A0D1]/20"
                >
                  <div className="flex items-center gap-2">
                    <Pin className="w-4 h-4 text-[#B6A0D1]" />
                    <span className="font-heading font-black text-sm uppercase">Saved Bookmarks</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#B6A0D1]">{pinnedCount}</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-[rgba(73,52,73,0.85)] text-[11px] font-mono text-[#B6AAB9] flex items-center justify-between">
              <span>MZANSI YOUTH 2026</span>
              <span className="text-[#91B8CC]">100% Zero-Fee</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
