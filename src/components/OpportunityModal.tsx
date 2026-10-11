import React, { useState, useEffect } from 'react';
import { 
  X, 
  Pin, 
  Share2, 
  ExternalLink, 
  Clock, 
  MapPin, 
  Briefcase, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  Check, 
  Sparkles,
  Flame,
  Globe
} from 'lucide-react';
import { Opportunity, ApplicationStatus } from '../types';
import { calculateCountdown, formatDisplayDate } from '../utils/countdown';
import { getChecklistState, toggleChecklistItem, updateApplicationStatus, getApplicationTracks } from '../utils/storage';
import { playPinSound, playPopSound, playSuccessSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface OpportunityModalProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
  isPinned: boolean;
  onTogglePin: (opp: Opportunity) => void;
}

export const OpportunityModal: React.FC<OpportunityModalProps> = ({
  opportunity,
  isOpen,
  onClose,
  isPinned,
  onTogglePin
}) => {
  const [countdown, setCountdown] = useState(() => 
    calculateCountdown(opportunity?.closingDate || '')
  );
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({});
  const [showApplySafetyModal, setShowApplySafetyModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [appStatus, setAppStatus] = useState<ApplicationStatus>('pinned');

  useEffect(() => {
    if (opportunity) {
      setCountdown(calculateCountdown(opportunity.closingDate));
      setChecklist(getChecklistState(opportunity.id));
      const tracks = getApplicationTracks();
      const existing = tracks.find(t => t.opportunityId === opportunity.id);
      if (existing) {
        setAppStatus(existing.status);
      }
    }
  }, [opportunity]);

  useEffect(() => {
    if (!opportunity?.closingDate) return;
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(opportunity.closingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [opportunity?.closingDate]);

  if (!isOpen || !opportunity) return null;

  const handleToggleCheck = (item: string) => {
    playPopSound();
    const updated = toggleChecklistItem(opportunity.id, item);
    setChecklist({ ...updated });

    const allRequired = opportunity.requiredDocuments;
    const completedCount = allRequired.filter(doc => updated[doc]).length;
    if (completedCount === allRequired.length) {
      playSuccessSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    playPopSound();
    setAppStatus(newStatus);
    updateApplicationStatus(opportunity.id, newStatus);
  };

  const handleShare = async () => {
    playPopSound();
    const shareData = {
      title: `${opportunity.title} on THE BOARD`,
      text: `Verified real-life ${opportunity.category} opportunity: ${opportunity.title} by ${opportunity.organisation}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleProceedToOfficialSite = () => {
    setShowApplySafetyModal(false);
    updateApplicationStatus(opportunity.id, 'in_progress', 'Accessed official real-life application portal.');
    setAppStatus('in_progress');
    const targetUrl = opportunity.officialApplicationUrl.startsWith('http') 
      ? opportunity.officialApplicationUrl 
      : `https://${opportunity.officialApplicationUrl}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl border border-[rgba(255,182,217,0.25)] rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col bg-[#0e0b1a] text-[#f3effa]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top Header Strip */}
        <div 
          style={{ backgroundColor: opportunity.accentColor.badgeBg }}
          className="relative px-6 py-3.5 border-b border-black/20 flex items-center justify-between text-[#0b0914]"
        >
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#0b0914] text-[#80d8ff] text-[11px] font-mono font-black uppercase rounded">
              VERIFIED REAL APPLICATION
            </span>
            <span className="text-xs font-mono font-bold uppercase hidden sm:inline text-[#0b0914]/80">
              ID #{opportunity.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playPinSound();
                onTogglePin(opportunity);
              }}
              className={`p-1.5 rounded-lg border font-bold text-xs uppercase transition-transform active:scale-95 ${
                isPinned 
                  ? 'bg-[#0b0914] text-[#ff85c0] border-[#0b0914]' 
                  : 'bg-[#0b0914]/80 text-[#f3effa] border-[rgba(255,182,217,0.3)] hover:bg-[#161226]'
              }`}
              title={isPinned ? 'Pinned to your board' : 'Pin to your board'}
            >
              <Pin className={`w-4 h-4 ${isPinned ? 'fill-[#ff85c0]' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-[rgba(255,182,217,0.3)] bg-[#0b0914]/80 text-[#f3effa] hover:bg-[#161226] transition-transform active:scale-95"
              title="Share opportunity"
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#80d8ff]" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-[rgba(255,182,217,0.3)] bg-[#0b0914] text-[#f3effa] hover:bg-[#161226] transition-transform active:scale-95"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Poster Header */}
          <div className="border-b border-[rgba(255,182,217,0.15)] pb-5">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                style={{
                  backgroundColor: opportunity.accentColor.badgeBg,
                  color: '#0b0914'
                }}
                className="px-3 py-1 text-xs font-mono font-black uppercase rounded-md shadow-xs"
              >
                {opportunity.category}
              </span>
              <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded-md bg-[#161226] text-[#a69db9] border border-[rgba(255,182,217,0.15)]">
                {opportunity.experienceLevel} Level
              </span>
              <span className="px-2.5 py-1 bg-[#80d8ff]/20 text-[#80d8ff] text-xs font-mono font-bold uppercase rounded-md border border-[#80d8ff]/40 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Fee Screened</span>
              </span>
              {countdown.isClosingSoon && (
                <span className="px-2.5 py-1 bg-[#ff85c0] text-[#0b0914] text-xs font-mono font-black uppercase rounded-md flex items-center gap-1 animate-pulse">
                  <Flame className="w-3.5 h-3.5 fill-[#0b0914]" />
                  <span>Closing Soon (&lt; 7 days)</span>
                </span>
              )}
            </div>

            <h1 id="modal-title" className="font-heading font-black text-2xl sm:text-4xl leading-tight text-[#f3effa]">
              {opportunity.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#0b0914] text-[#80d8ff] border border-[#80d8ff]/40 flex items-center justify-center font-mono text-xs font-black">
                  {opportunity.organisationInitials}
                </div>
                <span className="font-bold text-[#f3effa]">{opportunity.organisation}</span>
              </div>
              <div className="flex items-center gap-1 text-[#a69db9]">
                <MapPin className="w-4 h-4 text-[#ff85c0]" />
                <span>{opportunity.location}</span>
              </div>
              <div className="flex items-center gap-1 text-[#80d8ff] font-mono">
                <Briefcase className="w-4 h-4" />
                <span className="font-bold">{opportunity.stipendOrSalary}</span>
              </div>
            </div>
          </div>

          {/* Prominent Live Countdown Timer Banner */}
          <div className="p-4 bg-[#161226] border border-[rgba(255,182,217,0.2)] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#80d8ff] stroke-[2.5]" />
              <div>
                <span className="text-[10px] font-mono uppercase font-black tracking-wider text-[#a69db9] block">
                  APPLICATION CLOSING DEADLINE
                </span>
                <span className="font-heading font-black text-lg text-[#f3effa]">
                  {formatDisplayDate(opportunity.closingDate)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#a69db9] font-bold block">TIME REMAINING:</span>
              <span className={`text-xl font-mono font-black ${countdown.isClosingSoon ? 'text-[#ff85c0]' : 'text-[#80d8ff]'}`}>
                {countdown.formattedString}
              </span>
            </div>
          </div>

          {/* Direct Verified Portal Banner */}
          <div className="p-4 bg-[#0b0914] border border-[#80d8ff]/30 rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#a69db9]">
              <Globe className="w-4 h-4 text-[#80d8ff] shrink-0" />
              <span>Official Destination: <strong className="text-[#f3effa]">{opportunity.officialApplicationUrl}</strong></span>
            </div>
            <a
              href={opportunity.officialApplicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#80d8ff] text-[#0b0914] font-bold text-xs uppercase rounded-md shrink-0 flex items-center gap-1 hover:bg-[#80d8ff]/90"
            >
              <span>Direct Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Full Description */}
          <div>
            <h3 className="font-heading font-black text-lg uppercase tracking-wide mb-2 text-[#f3effa]">
              Role & Programme Overview
            </h3>
            <p className="text-sm leading-relaxed text-[#a69db9]">
              {opportunity.fullDescription}
            </p>
          </div>

          {/* Split Columns: Eligibility & Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border bg-[#161226]/60 border-[rgba(255,182,217,0.15)]">
              <h4 className="font-heading font-black text-sm uppercase tracking-wider mb-3 pb-2 border-b border-[rgba(255,182,217,0.15)] text-[#ff85c0]">
                Eligibility Criteria
              </h4>
              <ul className="space-y-2 text-xs">
                {opportunity.eligibilityRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#a69db9]">
                    <span className="w-1.5 h-1.5 bg-[#ff85c0] rounded-full mt-1.5 shrink-0"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border bg-[#161226]/60 border-[rgba(255,182,217,0.15)]">
              <h4 className="font-heading font-black text-sm uppercase tracking-wider mb-3 pb-2 border-b border-[rgba(255,182,217,0.15)] text-[#b388ff]">
                Minimum Qualifications
              </h4>
              <ul className="space-y-2 text-xs">
                {opportunity.requiredQualifications.map((qual, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#a69db9]">
                    <span className="w-1.5 h-1.5 bg-[#b388ff] rounded-full mt-1.5 shrink-0"></span>
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Document Checklist */}
          <div className="p-5 rounded-xl border bg-[#161226]/80 border-[#80d8ff]/30">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-heading font-black text-sm uppercase tracking-wider flex items-center gap-1.5 text-[#f3effa]">
                  <CheckSquare className="w-4 h-4 text-[#80d8ff]" />
                  <span>Document Readiness Checklist</span>
                </h4>
                <p className="text-[11px] text-[#a69db9]">
                  Check off documents as you prepare them. Automatically saved on this device.
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-[#80d8ff]/20 text-[#80d8ff] px-2.5 py-0.5 border border-[#80d8ff]/40 rounded-md">
                {opportunity.requiredDocuments.filter(d => checklist[d]).length} / {opportunity.requiredDocuments.length} ready
              </span>
            </div>

            <div className="space-y-2">
              {opportunity.requiredDocuments.map((doc, idx) => {
                const isChecked = !!checklist[doc];
                return (
                  <label
                    key={idx}
                    onClick={() => handleToggleCheck(doc)}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors cursor-pointer select-none text-xs font-semibold ${
                      isChecked
                        ? 'bg-[#80d8ff]/15 border-[#80d8ff] text-[#f3effa]'
                        : 'bg-[#0b0914] border-[rgba(255,182,217,0.15)] text-[#a69db9] hover:border-[#80d8ff]'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-[#80d8ff] shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-[#a69db9]/60 shrink-0" />
                    )}
                    <span className={isChecked ? 'line-through opacity-75' : ''}>{doc}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h4 className="font-heading font-black text-sm uppercase tracking-wider mb-3 text-[#f3effa]">
              Application Instructions
            </h4>
            <div className="space-y-2.5">
              {opportunity.applicationSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-md bg-[#80d8ff] text-[#0b0914] flex items-center justify-center font-mono font-black shrink-0 text-xs">
                    {idx + 1}
                  </div>
                  <p className="pt-0.5 leading-relaxed text-[#a69db9]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tracker Status Switcher */}
          <div className="p-4 rounded-xl border bg-[#161226]/50 border-[rgba(255,182,217,0.15)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-2 text-[#a69db9]">
              UPDATE STATUS IN YOUR TRACKER:
            </span>
            <div className="flex flex-wrap gap-2">
              {(['pinned', 'in_progress', 'submitted', 'interviewing', 'accepted'] as ApplicationStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-3 py-1 text-xs font-bold uppercase rounded-lg transition-all ${
                    appStatus === status
                      ? 'bg-[#ff85c0] text-[#0b0914] font-black shadow-md scale-105'
                      : 'bg-[#0b0914] text-[#a69db9] border border-[rgba(255,182,217,0.15)] hover:border-[#ff85c0]'
                  }`}
                >
                  {status === 'pinned' && '📌 Pinned'}
                  {status === 'in_progress' && '✍️ In Progress'}
                  {status === 'submitted' && '🚀 Submitted'}
                  {status === 'interviewing' && '🎯 Interviewing'}
                  {status === 'accepted' && '🎉 Accepted'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-[rgba(255,182,217,0.15)] bg-[#0b0914] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#a69db9]">
            <ShieldCheck className="w-4 h-4 text-[#80d8ff] shrink-0" />
            <span>Direct link to official verified hiring portal</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                playPinSound();
                onTogglePin(opportunity);
              }}
              className={`flex-1 sm:flex-initial px-4 py-2.5 font-heading font-bold text-xs uppercase rounded-xl border transition-transform active:translate-y-0.5 ${
                isPinned 
                  ? 'bg-[#ff85c0] text-[#0b0914] border-[#ff85c0]' 
                  : 'bg-[#161226] text-[#f3effa] border-[rgba(255,182,217,0.2)] hover:border-[#ff85c0]'
              }`}
            >
              {isPinned ? '📌 PINNED' : 'PIN FOR LATER'}
            </button>

            <button
              onClick={() => setShowApplySafetyModal(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 bg-[#ff85c0] text-[#0b0914] font-heading font-black text-sm uppercase rounded-xl shadow-lg hover:bg-[#ff85c0]/90 transition-all hover:scale-102 glow-pink"
            >
              <span>APPLY ON OFFICIAL PORTAL</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Safety Confirmation Modal */}
        {showApplySafetyModal && (
          <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
            <div className="bg-[#0e0b1a] text-[#f3effa] max-w-md w-full border border-[rgba(255,182,217,0.3)] rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-2 text-[#ff85c0]">
                <Globe className="w-6 h-6 stroke-[2.5]" />
                <h3 className="font-heading font-black text-lg uppercase">
                  Proceed to Official Portal
                </h3>
              </div>

              <p className="text-xs text-[#a69db9] leading-relaxed">
                You are proceeding directly to <strong>{opportunity.organisation}</strong>'s real-life application portal:
                <br />
                <code className="bg-[#0b0914] p-2 rounded-lg font-mono text-[11px] block mt-2 break-all border border-[rgba(255,182,217,0.2)] text-[#80d8ff]">
                  {opportunity.officialApplicationUrl}
                </code>
              </p>

              <div className="p-3 bg-[#161226] border border-[#ff85c0]/30 rounded-xl text-xs text-[#a69db9] space-y-1">
                <strong className="text-[#ff85c0]">Zero Fee Guarantee:</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  <li>Legitimate employers never ask for PEP Paxi or CashSend payments.</li>
                  <li>Have your certified ID and 2-page CV ready for upload.</li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowApplySafetyModal(false)}
                  className="px-4 py-2 border border-[rgba(255,182,217,0.2)] font-bold text-xs uppercase hover:bg-[#161226] rounded-xl text-[#a69db9]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedToOfficialSite}
                  className="px-5 py-2 bg-[#80d8ff] text-[#0b0914] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#80d8ff]/90 transition-colors glow-cyan"
                >
                  Open Official Application
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
