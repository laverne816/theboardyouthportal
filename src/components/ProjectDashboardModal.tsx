import React, { useState } from 'react';
import { 
  X, 
  FolderKanban, 
  Clock, 
  FileEdit, 
  Trash2,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Opportunity, ApplicationStatus, ApplicationTrackItem } from '../types';
import { getApplicationTracks, updateApplicationStatus } from '../utils/storage';
import { calculateCountdown } from '../utils/countdown';
import { playPopSound, playSuccessSound } from '../utils/sound';

interface ProjectDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
}

const COLUMNS: { id: ApplicationStatus; title: string; color: string; badge: string }[] = [
  { id: 'pinned', title: 'Pinned (Watching)', color: '#b388ff', badge: '📌' },
  { id: 'in_progress', title: 'In Progress (Docs)', color: '#80d8ff', badge: '✍️' },
  { id: 'submitted', title: 'Submitted', color: '#ff85c0', badge: '🚀' },
  { id: 'interviewing', title: 'Interview / Test', color: '#b388ff', badge: '🎯' },
  { id: 'accepted', title: 'Offered / Accepted', color: '#80d8ff', badge: '🎉' }
];

export const ProjectDashboardModal: React.FC<ProjectDashboardModalProps> = ({
  isOpen,
  onClose,
  opportunities,
  onSelectOpportunity
}) => {
  const [tracks, setTracks] = useState<ApplicationTrackItem[]>(() => getApplicationTracks());
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setTracks(getApplicationTracks());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMoveStatus = (oppId: string, newStatus: ApplicationStatus) => {
    playPopSound();
    if (newStatus === 'accepted') {
      playSuccessSound();
    }
    updateApplicationStatus(oppId, newStatus);
    setTracks(getApplicationTracks());
  };

  const handleSaveNotes = (oppId: string) => {
    playSuccessSound();
    const existing = tracks.find(t => t.opportunityId === oppId);
    updateApplicationStatus(oppId, existing ? existing.status : 'pinned', noteDraft);
    setTracks(getApplicationTracks());
    setEditingNotesId(null);
  };

  const getOpp = (oppId: string) => opportunities.find(o => o.id === oppId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="w-full max-w-6xl border border-[rgba(255,182,217,0.25)] rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col bg-[#0b0914] text-[#f3effa]"
        role="dialog"
        aria-modal="true"
        aria-label="Application Kanban Tracker"
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-[rgba(255,182,217,0.18)] bg-[#161226]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff85c0] to-[#b388ff] text-[#0b0914] flex items-center justify-center font-bold glow-pink">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#80d8ff]/20 text-[#80d8ff] border border-[#80d8ff]/30 font-bold uppercase">
                  INTERACTIVE TRACKER
                </span>
                <span className="text-xs font-mono text-[#a69db9]">
                  {tracks.length} Opportunities Tracked
                </span>
              </div>
              <h2 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#f3effa]">
                APPLICATION KANBAN BOARD 📊
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-[rgba(255,182,217,0.2)] text-[#a69db9] hover:text-[#f3effa] hover:border-[#ff85c0] transition-colors"
            aria-label="Close kanban"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Board Content */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6">
          <div className="flex gap-4 min-w-[1000px] pb-4">
            {COLUMNS.map(col => {
              const columnTracks = tracks.filter(t => t.status === col.id);

              return (
                <div 
                  key={col.id}
                  className="flex-1 min-w-[210px] bg-[#161226]/50 rounded-2xl p-3 border border-[rgba(255,182,217,0.12)] flex flex-col"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{col.badge}</span>
                      <h3 className="font-heading font-black text-xs uppercase tracking-wide text-[#f3effa]">
                        {col.title}
                      </h3>
                    </div>
                    <span 
                      style={{ backgroundColor: `${col.color}25`, color: col.color, borderColor: `${col.color}40` }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border"
                    >
                      {columnTracks.length}
                    </span>
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {columnTracks.map(track => {
                      const opp = getOpp(track.opportunityId);
                      if (!opp) return null;
                      const countdown = calculateCountdown(opp.closingDate);

                      return (
                        <div
                          key={track.opportunityId}
                          className="cyber-card p-3 rounded-xl border relative group"
                        >
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span 
                              style={{
                                backgroundColor: opp.accentColor.badgeBg,
                                color: '#0b0914'
                              }}
                              className="px-1.5 py-0.2 rounded text-[9px] font-mono font-black uppercase"
                            >
                              {opp.category}
                            </span>

                            <div className="flex items-center gap-1 text-[10px] font-mono text-[#a69db9]">
                              <Clock className="w-2.5 h-2.5 text-[#ff85c0]" />
                              <span>{countdown.formattedString.split(' ')[0]}</span>
                            </div>
                          </div>

                          <h4 
                            onClick={() => {
                              playPopSound();
                              onClose();
                              onSelectOpportunity(opp);
                            }}
                            className="font-heading font-black text-xs text-[#f3effa] hover:text-[#ff85c0] cursor-pointer line-clamp-2 transition-colors"
                          >
                            {opp.title}
                          </h4>

                          <p className="text-[11px] text-[#a69db9] truncate mt-0.5">
                            {opp.organisation}
                          </p>

                          {/* Notes snippet */}
                          {track.notes && (
                            <div className="mt-2 p-1.5 bg-[#0b0914]/80 rounded text-[10px] text-[#80d8ff] font-mono border border-[rgba(255,182,217,0.1)]">
                              "{track.notes}"
                            </div>
                          )}

                          {/* Quick Status Shift Controls */}
                          <div className="mt-3 pt-2 border-t border-[rgba(255,182,217,0.12)] flex items-center justify-between text-[10px] font-mono">
                            <select
                              value={track.status}
                              onChange={(e) => handleMoveStatus(track.opportunityId, e.target.value as ApplicationStatus)}
                              className="bg-[#0b0914] text-[#f3effa] border border-[rgba(255,182,217,0.2)] rounded px-1.5 py-0.5 text-[10px] outline-none"
                            >
                              <option value="pinned">Pinned</option>
                              <option value="in_progress">In Progress</option>
                              <option value="submitted">Submitted</option>
                              <option value="interviewing">Interview</option>
                              <option value="accepted">Accepted</option>
                            </select>

                            <button
                              onClick={() => {
                                playPopSound();
                                onClose();
                                onSelectOpportunity(opp);
                              }}
                              className="text-[#80d8ff] hover:underline"
                            >
                              Open ↗
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {columnTracks.length === 0 && (
                      <div className="p-4 border border-dashed border-[rgba(255,182,217,0.12)] rounded-xl text-center text-[10px] font-mono text-[#a69db9]">
                        Empty
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
