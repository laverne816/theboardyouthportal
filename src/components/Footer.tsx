import React from 'react';
import { ShieldAlert, Sparkles, CheckCircle2, Heart } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
  onSelectProvince?: (province: string) => void;
  onOpenScamQuiz?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectProvince,
  onOpenScamQuiz
}) => {
  return (
    <footer className="border-t border-[rgba(255,182,217,0.18)] mt-20 bg-[#0b0914] text-[#a69db9]">
      {/* Notice Banner */}
      <div className="bg-[#161226]/80 backdrop-blur-md px-4 py-3 border-b border-[rgba(255,182,217,0.12)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-[#ff85c0] text-[#0b0914] px-2 py-0.5 font-black uppercase rounded text-[10px]">
              VERIFIED PORTAL
            </span>
            <span className="text-[#f3effa]">
              All opportunities are hand-checked against official South African SETA, provincial, and corporate platforms.
            </span>
          </div>
          <div className="flex items-center gap-2 font-bold shrink-0 text-[#80d8ff]">
            <CheckCircle2 className="w-4 h-4 text-[#80d8ff]" />
            <span>Zero recruitment fee guarantee</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff85c0] via-[#b388ff] to-[#80d8ff] text-[#0b0914] flex items-center justify-center font-black text-lg font-heading">
                B
              </div>
              <span className="font-heading font-black text-xl tracking-tight uppercase text-[#f3effa]">
                THE BOARD
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#a69db9]">
              The verified digital bulletin board empowering young South Africans with high-signal jobs, learnerships, internships, bursaries, and training opportunities.
            </p>
            <div className="p-3 bg-[#161226]/60 border border-[#ff85c0]/30 text-[#f3effa] text-xs rounded-xl shadow-sm">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-[#ff85c0]">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Recruitment Alert</span>
              </div>
              <p className="text-[11px] leading-tight text-[#a69db9]">
                Legitimate employers never charge for applications, uniform fees, or medical exams.
              </p>
              {onOpenScamQuiz && (
                <button
                  onClick={onOpenScamQuiz}
                  className="mt-2 text-[10px] font-mono text-[#80d8ff] hover:underline uppercase font-bold flex items-center gap-1"
                >
                  Take 60s Scam Detection Quiz →
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-[#b388ff] mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {['Job', 'Learnership', 'Internship', 'Bursary', 'Course', 'Event'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory && onSelectCategory(cat)}
                    className="hover:text-[#ff85c0] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#80d8ff]/60"></span>
                    <span>{cat}s</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Provinces */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-[#80d8ff] mb-3">
              Regions & Remote
            </h4>
            <ul className="space-y-2 text-xs">
              {['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Limpopo', 'National / Remote'].map((prov) => (
                <li key={prov}>
                  <button
                    onClick={() => onSelectProvince && onSelectProvince(prov)}
                    className="hover:text-[#80d8ff] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff85c0]/60"></span>
                    <span>{prov}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Transparency & Policy */}
          <div className="space-y-3 text-xs">
            <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-[#ff85c0]">
              Transparency
            </h4>
            <p className="text-[11px] leading-relaxed text-[#a69db9]">
              <strong className="text-[#f3effa]">Zero Monetization:</strong> The Board is a non-commercial, free public youth directory. We never accept payment from recruiters to feature listings.
            </p>
            <p className="text-[11px] leading-relaxed text-[#a69db9]">
              <strong className="text-[#f3effa]">Expired Listings:</strong> Opportunities are automatically flagged when their closing date passes to prevent wasted applicant airtime.
            </p>
            <div className="pt-2 text-[10px] font-mono text-[#a69db9] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#ff85c0]" />
              <span>Built for Young South Africans</span>
            </div>
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#b388ff] block mb-1 font-bold">Tech Stack:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ff85c0]/15 text-[#ff85c0] border border-[#ff85c0]/30">HTML5</span>
                <span className="text-[#a69db9] text-[10px]">•</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#80d8ff]/15 text-[#80d8ff] border border-[#80d8ff]/30">CSS3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(255,182,217,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-[#a69db9]">
            © 2026 THE BOARD · All rights reserved. Built with HTML5 • CSS3.
          </p>
          <div className="flex items-center gap-4 text-[#a69db9]">
            <span className="text-[#ff85c0] flex items-center gap-1 font-bold">
              <span>Your future, pinned</span>
              <Heart className="w-3 h-3 fill-[#ff85c0]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
