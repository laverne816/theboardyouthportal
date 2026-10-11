import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface ScamWarningBannerProps {
  onOpenScamQuiz?: () => void;
  onNavigateContact?: () => void;
}

export const ScamWarningBanner: React.FC<ScamWarningBannerProps> = ({
  onOpenScamQuiz
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative mx-auto my-6 max-w-7xl px-4 sm:px-6">
      <div className="cyber-card p-4 sm:p-5 rounded-2xl border border-[#ff85c0]/30 shadow-[0_0_25px_rgba(255,133,192,0.15)] relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-[#ff85c0] text-[#0b0914] rounded-xl shrink-0 glow-pink">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#0b0914] text-[#ff85c0] border border-[#ff85c0]/40 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
                  CRITICAL YOUTH SAFETY NOTICE
                </span>
                <span className="text-[10px] font-mono text-[#80d8ff] font-bold uppercase tracking-wider">
                  PROTECT YOUR MONEY
                </span>
              </div>
              <h2 className="font-heading font-black text-base sm:text-lg text-[#f3effa] mt-1">
                Real South African Employers NEVER Charge You Money to Apply or Work.
              </h2>
              <p className="text-xs text-[#a69db9] max-w-3xl mt-0.5">
                If an agent asks for money for "uniform fees", "medical checks", "courier charges", or "interview slots" via PEP Paxi or CashSend — it is 100% a scam.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            {onOpenScamQuiz && (
              <button
                onClick={onOpenScamQuiz}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#ff85c0] text-[#0b0914] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#ff85c0]/90 transition-transform active:scale-95 glow-pink"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Spot The Scam Quiz</span>
              </button>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-[#161226] text-[#f3effa] font-bold text-xs uppercase border border-[rgba(255,182,217,0.2)] rounded-xl hover:border-[#b388ff] transition-colors"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? 'Hide Red Flags' : 'Read 4 Red Flags'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Educational Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-[rgba(255,182,217,0.15)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#0b0914]/80 p-3 rounded-xl border border-[rgba(255,182,217,0.12)]">
              <span className="font-heading font-bold text-[#ff85c0] block mb-1">01. Demanding Any Upfront Fee</span>
              <p className="text-[#a69db9]">
                Any request for cash deposits, PEP Paxi, eWallet, or Western Union for "medical bookings" is fraud.
              </p>
            </div>
            <div className="bg-[#0b0914]/80 p-3 rounded-xl border border-[rgba(255,182,217,0.12)]">
              <span className="font-heading font-bold text-[#ff85c0] block mb-1">02. Unofficial Email Addresses</span>
              <p className="text-[#a69db9]">
                Official recruiters use corporate domains (e.g. <code>@standardbank.co.za</code>), never free <code>@gmail.com</code> addresses.
              </p>
            </div>
            <div className="bg-[#0b0914]/80 p-3 rounded-xl border border-[rgba(255,182,217,0.12)]">
              <span className="font-heading font-bold text-[#ff85c0] block mb-1">03. WhatsApp-Only "Interviews"</span>
              <p className="text-[#a69db9]">
                Be suspicious of offers made solely over WhatsApp chat without formal video calls or in-person panel verification.
              </p>
            </div>
            <div className="bg-[#0b0914]/80 p-3 rounded-xl border border-[rgba(255,182,217,0.12)]">
              <span className="font-heading font-bold text-[#ff85c0] block mb-1">04. Asking for Banking PINs</span>
              <p className="text-[#a69db9]">
                Legitimate payroll requires your official Bank Confirmation Letter — NEVER your ATM card PIN or OTP numbers.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
