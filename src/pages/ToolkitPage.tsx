import React, { useState } from 'react';
import { 
  FileText, 
  MessageSquare, 
  UserCheck, 
  Send, 
  ShieldAlert, 
  FolderCheck, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { playPopSound, playSuccessSound } from '../utils/sound';

interface ToolkitPageProps {
  initialResourceId?: string;
  onOpenScamQuiz?: () => void;
}

interface ResourceItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  accentColor: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const ToolkitPage: React.FC<ToolkitPageProps> = ({
  initialResourceId,
  onOpenScamQuiz
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(initialResourceId || 'cv');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    playPopSound();
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleCopyText = (key: string, text: string) => {
    playSuccessSound();
    navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const resources: ResourceItem[] = [
    {
      id: 'cv',
      title: 'YOUR CV, SORTED',
      subtitle: 'Modern South African 2-page format designed for ATS parsers and hiring managers.',
      tag: 'RESUME CRAFT',
      accentColor: '#80d8ff',
      icon: <FileText className="w-6 h-6 text-[#80d8ff]" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#a69db9]">
          <p className="leading-relaxed">
            In South Africa, recruiters receive hundreds of CVs per opening. To stand out, your CV must be maximum <strong className="text-[#f3effa]">2 pages</strong>, cleanly formatted in PDF, and free of outdated distractions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[rgba(255,182,217,0.15)] bg-[#0b0914]/80">
              <strong className="text-[#80d8ff] block mb-2 font-mono">✅ WHAT TO INCLUDE:</strong>
              <ul className="list-disc pl-4 space-y-1.5 text-xs text-[#a69db9]">
                <li>Contact Info: Full Name, Clean Professional Email, Cell Phone, City & Province.</li>
                <li>Professional Summary: 2-3 sentences on your key skills and drive.</li>
                <li>Education: Matric subjects (mention Pure Maths / Tech subjects), Tertiary degrees or NCV certificates.</li>
                <li>Work & Volunteer Experience: Action verbs (Organised, Assisted, Built).</li>
                <li>Digital Skills: Excel, Google Docs, Python, POS cashier systems, etc.</li>
                <li>Two contactable references with work phone numbers.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-[rgba(255,182,217,0.15)] bg-[#0b0914]/80">
              <strong className="text-[#ff85c0] block mb-2 font-mono">❌ WHAT TO REMOVE (OUTDATED):</strong>
              <ul className="list-disc pl-4 space-y-1.5 text-xs text-[#a69db9]">
                <li>NO ID photo selfie (avoids unconscious bias & saves file size).</li>
                <li>NO full ID number or home street address (protects against identity theft).</li>
                <li>NO marital status, religion, or gender details.</li>
                <li>NO Microsoft Word .docx files — always export to a clean <strong className="text-[#f3effa]">PDF</strong>.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[rgba(255,182,217,0.15)] bg-[#0b0914]/80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-bold text-xs uppercase text-[#b388ff]">
                COPYABLE CV PROFESSIONAL SUMMARY TEMPLATE:
              </span>
              <button
                onClick={() => handleCopyText('cv_summary', "Motivated and adaptable Grade 12 graduate with a strong analytical foundation in Mathematics and IT. Experienced in customer service, digital communications, and teamwork through school leadership and community volunteering. Seeking a fast-paced learnership or junior role to deliver immediate reliability and build a long-term technical career.")}
                className="flex items-center gap-1 text-xs font-bold font-mono px-2.5 py-1 bg-[#ff85c0] text-[#0b0914] rounded-lg hover:bg-[#ff85c0]/90 transition-colors"
              >
                {copiedSection === 'cv_summary' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'cv_summary' ? 'Copied!' : 'Copy Template'}</span>
              </button>
            </div>
            <p className="font-mono text-xs p-3 bg-[#161226] text-[#f3effa] border border-[rgba(255,182,217,0.12)] rounded-lg leading-relaxed italic">
              "Motivated and adaptable Grade 12 graduate with a strong analytical foundation in Mathematics and IT. Experienced in customer service, digital communications, and teamwork through school leadership and community volunteering. Seeking a fast-paced learnership or junior role to deliver immediate reliability and build a long-term technical career."
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'interview',
      title: 'OWN THE INTERVIEW',
      subtitle: 'Frameworks and prep rituals to walk into panel and video interviews with confidence.',
      tag: 'INTERVIEW READINESS',
      accentColor: '#b388ff',
      icon: <MessageSquare className="w-6 h-6 text-[#b388ff]" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#a69db9]">
          <p className="leading-relaxed">
            The secret to acing South African corporate or SETA interviews is the <strong className="text-[#f3effa]">STAR Method</strong>: Situation, Task, Action, Result.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { letter: 'S', title: 'Situation', desc: 'Set the context briefly (e.g. During my final school project...)', color: '#ff85c0' },
              { letter: 'T', title: 'Task', desc: 'Describe the challenge or responsibility you faced.', color: '#b388ff' },
              { letter: 'A', title: 'Action', desc: 'Focus on what YOU did specifically — tools used and teamwork.', color: '#80d8ff' },
              { letter: 'R', title: 'Result', desc: 'Share the positive outcome or what you learned from the experience.', color: '#f3effa' }
            ].map(star => (
              <div key={star.letter} className="p-3 bg-[#0b0914]/80 rounded-xl border border-[rgba(255,182,217,0.15)]">
                <span className="font-heading font-black text-xl block mb-1" style={{ color: star.color }}>
                  {star.letter} — {star.title}
                </span>
                <p className="text-xs text-[#a69db9] leading-tight">{star.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-[rgba(255,182,217,0.15)] bg-[#0b0914]/80 space-y-2">
            <strong className="text-[#80d8ff] block font-mono">Top Questions to Ask the Interviewer:</strong>
            <ul className="list-disc pl-4 space-y-1 text-xs text-[#a69db9]">
              <li>"What does success look like in the first 90 days of this learnership/role?"</li>
              <li>"How does the team support continuous learning and mentorship?"</li>
              <li>"What are the next milestones in your selection timeline?"</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'docs',
      title: 'GET YOUR DOCS READY',
      subtitle: 'Certification rules at SAPS, file compression, and standard documentation checklists.',
      tag: 'DOCUMENTS',
      accentColor: '#ff85c0',
      icon: <FolderCheck className="w-6 h-6 text-[#ff85c0]" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#a69db9]">
          <p className="leading-relaxed">
            Incomplete or uncertified documentation is the #1 reason South African youth applications are discarded before screening.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#0b0914]/80 rounded-xl border border-[rgba(255,182,217,0.15)]">
              <span className="font-heading font-bold text-xs uppercase text-[#ff85c0] block mb-1">
                👮 SAPS Certification
              </span>
              <p className="text-xs leading-relaxed text-[#a69db9]">
                Visit your nearest police station with original documents + photocopies. Certification stamps must be less than <strong>3 months old</strong>.
              </p>
            </div>

            <div className="p-4 bg-[#0b0914]/80 rounded-xl border border-[rgba(255,182,217,0.15)]">
              <span className="font-heading font-bold text-xs uppercase text-[#b388ff] block mb-1">
                📦 File Compression
              </span>
              <p className="text-xs leading-relaxed text-[#a69db9]">
                Most HR systems reject attachments over 2MB. Use free tools like <code>iLovePDF</code> or mobile scanners to compress attachments to under 1.5MB.
              </p>
            </div>

            <div className="p-4 bg-[#0b0914]/80 rounded-xl border border-[rgba(255,182,217,0.15)]">
              <span className="font-heading font-bold text-xs uppercase text-[#80d8ff] block mb-1">
                🏦 Bank Confirmation
              </span>
              <p className="text-xs leading-relaxed text-[#a69db9]">
                Download a formal Bank Confirmation Letter via your banking app (Capitec, FNB, Standard Bank). Never send handwritten notes.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'scams',
      title: 'SPOT THE SCAM: SAFETY MANUAL',
      subtitle: 'Identify fake employment syndicates, phishing portals, and fraudulent recruitment fees.',
      tag: 'DEFENSE',
      accentColor: '#ff85c0',
      icon: <ShieldAlert className="w-6 h-6 text-[#ff85c0]" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#a69db9]">
          <p className="leading-relaxed">
            Unemployed youth are frequent targets of fraudulent recruitment scams. Remember: <strong className="text-[#ff85c0]">No legitimate company charges money to give you a job.</strong>
          </p>

          <div className="p-4 rounded-xl border border-[#ff85c0]/30 bg-[#ff85c0]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <strong className="text-[#ff85c0] text-sm block">Test Your Scam Radar</strong>
              <p className="text-xs text-[#a69db9] mt-0.5">
                Take our 60-second interactive scenario quiz to test your ability to spot recruitment fraud.
              </p>
            </div>
            {onOpenScamQuiz && (
              <button
                onClick={onOpenScamQuiz}
                className="px-4 py-2 bg-[#ff85c0] text-[#0b0914] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#ff85c0]/90 transition-transform active:scale-95 glow-pink shrink-0"
              >
                Launch Quiz 🛡️
              </button>
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header Banner */}
      <div className="cyber-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff85c0]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#80d8ff]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-[#b388ff] text-[#0b0914] font-mono font-black text-xs uppercase rounded-md shadow-sm">
              THE TOOLKIT 🧰
            </span>
            <span className="text-xs font-mono text-[#a69db9] uppercase tracking-widest">
              Career Readiness Repository
            </span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#f3effa]">
            FREE CAREER RESOURCES
          </h1>
          <p className="text-xs sm:text-sm text-[#a69db9] mt-2 max-w-2xl font-medium leading-relaxed">
            Zero-fluff templates, SAPS certification walkthroughs, interview question banks, and defensive anti-scam playbooks tailored for South African youth.
          </p>
        </div>
      </div>

      {/* Accordion Resource Cards */}
      <div className="space-y-4">
        {resources.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`cyber-card rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded 
                  ? 'border-[#ff85c0]/50 shadow-[0_0_30px_rgba(255,133,192,0.15)]' 
                  : 'border-[rgba(255,182,217,0.18)] hover:border-[#b388ff]'
              }`}
            >
              {/* Trigger Header */}
              <button
                onClick={() => handleToggle(item.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3 rounded-xl bg-[#161226] border border-[rgba(255,182,217,0.2)] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#0b0914] text-[#80d8ff] border border-[rgba(255,182,217,0.15)]">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-lg sm:text-xl uppercase tracking-tight text-[#f3effa]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#a69db9] mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-[#161226] text-[#a69db9] border border-[rgba(255,182,217,0.15)] shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-[#ff85c0]" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[rgba(255,182,217,0.12)] bg-[#161226]/40 animate-fadeIn">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
