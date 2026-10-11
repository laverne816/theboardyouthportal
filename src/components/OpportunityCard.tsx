import React, { useState, useEffect } from 'react';
import { Pin, MapPin, Briefcase, Clock, ChevronRight, CheckCircle, Flame } from 'lucide-react';
import { Opportunity } from '../types';
import { calculateCountdown } from '../utils/countdown';
import { playPinSound, playPopSound } from '../utils/sound';

interface OpportunityCardProps {
  opportunity: Opportunity;
  isPinned: boolean;
  onTogglePin: (opp: Opportunity) => void;
  onViewDetails: (opp: Opportunity) => void;
  applyRotation?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  isPinned,
  onTogglePin,
  onViewDetails
}) => {
  const [countdown, setCountdown] = useState(() => calculateCountdown(opportunity.closingDate));
  const [justPinned, setJustPinned] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(opportunity.closingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [opportunity.closingDate]);

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPinSound();
    setJustPinned(true);
    setTimeout(() => setJustPinned(false), 500);
    onTogglePin(opportunity);
  };

  const handleCardClick = () => {
    playPopSound();
    onViewDetails(opportunity);
  };

  return (
    <article
      onClick={handleCardClick}
      className="cyber-card group relative flex flex-col justify-between p-5 rounded-2xl cursor-pointer"
      aria-label={`Opportunity: ${opportunity.title} by ${opportunity.organisation}`}
    >
      {/* Top Pin Button */}
      <div className="absolute -top-3 left-6 z-20 flex items-center gap-1">
        <button
          onClick={handlePinClick}
          aria-label={isPinned ? 'Unpin opportunity' : 'Pin opportunity'}
          title={isPinned ? 'Pinned to your board! Click to unpin' : 'Pin this opportunity'}
          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-none ${
            isPinned 
              ? 'bg-[#D99AB8] text-[#211525] border-[#D99AB8]' 
              : 'bg-[#100D16] border-[rgba(73,52,73,0.85)] text-[#B6AAB9] hover:text-[#F1EAF2] hover:border-[#D99AB8]'
          } ${justPinned ? 'animate-pin-drop' : ''}`}
        >
          <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-[#211525]' : ''}`} />
        </button>
      </div>

      {/* Top Meta Header */}
      <div>
        <div className="flex items-start justify-between gap-3 pt-1 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category badge */}
            <span
              style={{
                backgroundColor: opportunity.accentColor.badgeBg,
                color: '#211525'
              }}
              className="px-2.5 py-0.5 text-xs font-mono font-black uppercase tracking-wider rounded-md shadow-none"
            >
              {opportunity.category}
            </span>

            {/* Experience level */}
            <span className="px-2 py-0.5 text-[11px] font-mono font-bold uppercase rounded-md bg-[rgba(33,25,37,0.92)] text-[#B6AAB9] border border-[rgba(73,52,73,0.85)]">
              {opportunity.experienceLevel}
            </span>

            {/* Verified badge */}
            {opportunity.isVerified && (
              <span className="flex items-center gap-0.5 text-[10px] font-mono font-bold text-[#91B8CC]">
                <CheckCircle className="w-3 h-3 text-[#91B8CC]" />
                <span>Verified Real Portal</span>
              </span>
            )}
          </div>

          {/* Closing Soon Sticky Badge */}
          {countdown.isClosingSoon && !countdown.isExpired && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#D99AB8] text-[#211525] text-[10px] font-mono font-black uppercase rounded-md shrink-0">
              <Flame className="w-3 h-3 fill-[#211525]" />
              <span>Closing Soon</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-black text-lg sm:text-xl leading-snug group-hover:text-[#D99AB8] transition-colors line-clamp-2 text-[#F1EAF2]">
          {opportunity.title}
        </h3>

        {/* Organisation */}
        <div className="flex items-center gap-2 mt-1.5 text-xs font-bold text-[#B6AAB9]">
          <div className="w-5 h-5 rounded-md bg-[#100D16] text-[#91B8CC] border border-[#91B8CC]/40 flex items-center justify-center font-mono text-[10px] font-black shrink-0">
            {opportunity.organisationInitials}
          </div>
          <span className="truncate">{opportunity.organisation}</span>
        </div>

        {/* Short Description */}
        <p className="mt-2.5 text-xs line-clamp-3 leading-relaxed text-[#B6AAB9]">
          {opportunity.shortDescription}
        </p>

        {/* Location & Stipend Specs */}
        <div className="mt-3.5 pt-3 border-t border-[rgba(73,52,73,0.6)] space-y-1.5 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-[#B6AAB9]">
            <MapPin className="w-3.5 h-3.5 text-[#D99AB8] shrink-0" />
            <span className="truncate">{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#91B8CC] font-mono">
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate font-bold">{opportunity.stipendOrSalary}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Live Countdown & Actions */}
      <div className="mt-4 pt-3 border-t border-[rgba(73,52,73,0.6)] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#B6AAB9]">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className={countdown.isClosingSoon ? 'text-[#D99AB8] font-black' : ''}>
            {countdown.formattedString}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePinClick}
            aria-label={isPinned ? 'Unpin' : 'Pin'}
            className={`px-2.5 py-1 text-xs font-bold uppercase rounded-lg transition-colors border ${
              isPinned 
                ? 'bg-[#D99AB8] text-[#211525] border-[#D99AB8]' 
                : 'bg-[rgba(33,25,37,0.92)] text-[#F1EAF2] border-[rgba(73,52,73,0.85)] hover:border-[#D99AB8]'
            }`}
          >
            {isPinned ? '📌 Saved' : 'Pin'}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="flex items-center gap-0.5 px-3 py-1 bg-[#91B8CC] text-[#211525] font-heading font-black text-xs uppercase rounded-lg transition-transform group-hover:translate-x-0.5 hover:bg-[#91B8CC]/90"
          >
            <span>View</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
