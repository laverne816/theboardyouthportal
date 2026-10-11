import React from 'react';
import { X, Pin, Trash2, ArrowRight, Clock, MapPin, Briefcase } from 'lucide-react';
import { Opportunity } from '../types';
import { calculateCountdown } from '../utils/countdown';
import { playPinSound, playPopSound } from '../utils/sound';

interface SavedPinsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pinnedOpportunities: Opportunity[];
  onUnpin: (id: string) => void;
  onSelectOpportunity: (opp: Opportunity) => void;
  onOpenDashboard: () => void;
}

export const SavedPinsDrawer: React.FC<SavedPinsDrawerProps> = ({
  isOpen,
  onClose,
  pinnedOpportunities,
  onUnpin,
  onSelectOpportunity,
  onOpenDashboard
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md h-full flex flex-col border-l border-[rgba(255,182,217,0.2)] shadow-2xl bg-[#0b0914]/95 text-[#f3effa]"
        role="dialog"
        aria-modal="true"
        aria-label="Your Pinned Opportunities"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[rgba(255,182,217,0.18)] bg-[#161226]/80 text-[#f3effa] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#b388ff] text-[#0b0914] flex items-center justify-center font-bold glow-lavender">
              <Pin className="w-4 h-4 fill-[#0b0914]" />
            </div>
            <div>
              <h3 className="font-heading font-black text-xl tracking-tight uppercase leading-none text-[#f3effa]">
                SAVED PINS
              </h3>
              <span className="text-[11px] font-mono text-[#a69db9] uppercase">
                {pinnedOpportunities.length} Bookmarked Opportunities
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[rgba(255,182,217,0.2)] text-[#a69db9] hover:text-[#f3effa] hover:border-[#ff85c0]"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {pinnedOpportunities.length > 0 ? (
            pinnedOpportunities.map((opp) => {
              const countdown = calculateCountdown(opp.closingDate);

              return (
                <div
                  key={opp.id}
                  className="cyber-card p-4 rounded-xl border relative transition-all group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      style={{
                        backgroundColor: opp.accentColor.badgeBg,
                        color: '#0b0914'
                      }}
                      className="px-2 py-0.5 text-[10px] font-mono font-black uppercase rounded shadow-xs"
                    >
                      {opp.category}
                    </span>

                    <button
                      onClick={() => {
                        playPinSound();
                        onUnpin(opp.id);
                      }}
                      className="p-1 text-[#a69db9] hover:text-[#ff85c0] rounded transition-colors"
                      title="Remove pin"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 
                    onClick={() => {
                      playPopSound();
                      onClose();
                      onSelectOpportunity(opp);
                    }}
                    className="font-heading font-black text-sm text-[#f3effa] hover:text-[#ff85c0] cursor-pointer line-clamp-2 transition-colors"
                  >
                    {opp.title}
                  </h4>

                  <p className="text-xs text-[#a69db9] font-medium mt-1 truncate">
                    {opp.organisation}
                  </p>

                  <div className="mt-3 pt-2 border-t border-[rgba(255,182,217,0.12)] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1 font-mono text-[#a69db9]">
                      <Clock className="w-3 h-3 text-[#ff85c0]" />
                      <span className={countdown.isClosingSoon ? 'text-[#ff85c0] font-bold' : ''}>
                        {countdown.formattedString}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        playPopSound();
                        onClose();
                        onSelectOpportunity(opp);
                      }}
                      className="font-mono font-bold text-xs uppercase text-[#80d8ff] hover:underline flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#161226] border border-[rgba(255,182,217,0.2)] mx-auto flex items-center justify-center text-[#ff85c0]">
                <Pin className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="font-heading font-black text-lg uppercase text-[#f3effa]">
                NO PINS SAVED YET
              </h4>
              <p className="text-xs text-[#a69db9] max-w-xs mx-auto">
                Tap the pin icon on any opportunity card to save it here for fast access and status tracking.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {pinnedOpportunities.length > 0 && (
          <div className="p-4 border-t border-[rgba(255,182,217,0.18)] bg-[#161226]/80 flex items-center justify-between gap-3">
            <span className="text-xs font-mono text-[#a69db9]">
              {pinnedOpportunities.length} Saved
            </span>
            <button
              onClick={() => {
                playPopSound();
                onClose();
                onOpenDashboard();
              }}
              className="flex items-center gap-1 px-4 py-2 bg-[#ff85c0] text-[#0b0914] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#ff85c0]/90 transition-transform active:scale-95 glow-pink"
            >
              <span>Application Kanban</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
