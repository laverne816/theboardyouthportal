import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Target, 
  TrendingUp, 
  Zap, 
  ChevronRight,
  Flame,
  Star
} from 'lucide-react';
import { Opportunity, CandidateStage, QualificationType, ExperienceBracket, PathwayStep } from '../types';
import { OpportunityCard } from './OpportunityCard';
import { playPopSound, playSuccessSound } from '../utils/sound';

interface PathwayMapProps {
  opportunities: Opportunity[];
  pinnedIds: string[];
  onTogglePin: (opp: Opportunity) => void;
  onViewDetails: (opp: Opportunity) => void;
  onFilterWallByPathway?: (matchedOppIds: string[]) => void;
}

export const PathwayMap: React.FC<PathwayMapProps> = ({
  opportunities,
  pinnedIds,
  onTogglePin,
  onViewDetails,
  onFilterWallByPathway
}) => {
  const [stage, setStage] = useState<CandidateStage>('matriculant');
  const [qualification, setQualification] = useState<QualificationType>('matric_pure');
  const [experience, setExperience] = useState<ExperienceBracket>('zero_exp');
  const [targetGoal, setTargetGoal] = useState<'income_now' | 'degree_bursary' | 'high_tech_career'>('income_now');
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);

  // Dynamic 4-step pathway trajectory populated with emojis and soft cyber aesthetics
  const generatedPathway: PathwayStep[] = useMemo(() => {
    if (stage === 'matriculant') {
      if (targetGoal === 'degree_bursary') {
        return [
          {
            id: 'mat-burs-1',
            stepNumber: 1,
            phase: '📋 AUDIT & PREP',
            title: '📑 Academic Verification & Household Audit',
            timeframe: 'Months 1 - 2',
            earningOrStipend: '⏳ R0 (Selection Phase)',
            description: 'Certify Grade 11 final & Grade 12 preliminary marks at SAPS. Compile 3-month proof of household income for Sasol or Allan Gray bursary committees.',
            recommendedCategory: 'Bursary',
            keySkills: ['📐 Pure Maths 65%+', '🧪 Physical Science', '📄 Academic Statements'],
            actionAdvice: '⚡ Submit university provisional acceptance letters to ensure eligibility before closing date.',
            provinceHubs: ['National / Remote', 'Gauteng', 'Western Cape']
          },
          {
            id: 'mat-burs-2',
            stepNumber: 2,
            phase: '🎓 CAMPUS LIFE',
            title: '🏛️ 1st Year Full-Cover University Placement',
            timeframe: 'Year 1',
            earningOrStipend: '💎 Full Tuition + R4,800/mo Living Allowance',
            description: 'Enroll in accredited STEM or BCom degree at public SA university with 100% tuition, on-campus residence, laptop, and textbook allowance covered.',
            recommendedCategory: 'Bursary',
            keySkills: ['🧠 Analytical Logic', '📚 University Study Skills', '👥 Peer Study Groups'],
            actionAdvice: '🌟 Maintain min 65% aggregate to secure annual bursary renewal and vacation work guarantees.',
            provinceHubs: ['Western Cape', 'Gauteng', 'Eastern Cape']
          },
          {
            id: 'mat-burs-3',
            stepNumber: 3,
            phase: '💼 INDUSTRY LAB',
            title: '🚀 Paid Corporate Vacation Work & Labs',
            timeframe: 'Year 2 - 3',
            earningOrStipend: '💵 R9,000 - R12,000 / month (During Vac)',
            description: 'Complete 6-8 weeks paid workplace vacation work in corporate engineering/data labs (Sasol, Standard Bank, Capitec).',
            recommendedCategory: 'Internship',
            keySkills: ['🐍 Python / SQL', '📊 Financial Modelling', '⚡ Agile Delivery'],
            actionAdvice: '🤝 Pair with senior staff mentors and document project contributions for final year conversion.',
            provinceHubs: ['Gauteng', 'Western Cape']
          },
          {
            id: 'mat-burs-4',
            stepNumber: 4,
            phase: '🏆 GRADUATE OFFER',
            title: '🌟 Permanent Corporate Associate / CA Trainee',
            timeframe: 'Post-Graduation',
            earningOrStipend: '💰 R28,000 - R42,000 / month',
            description: 'Transition directly into corporate graduate acceleration programmes with zero student debt.',
            recommendedCategory: 'Job',
            keySkills: ['🏗️ System Architecture', '📈 Commercial Leadership', '🎯 Squad Management'],
            actionAdvice: '🚀 Leverage company network to transition into permanent squad engineering or accounting.',
            provinceHubs: ['Gauteng', 'Western Cape', 'KwaZulu-Natal']
          }
        ];
      }

      // Matriculant - Immediate Income / Technical
      return [
        {
          id: 'mat-inc-1',
          stepNumber: 1,
          phase: '📑 READINESS',
          title: '📋 SETA Portfolio & Police Certification',
          timeframe: 'Month 1',
          earningOrStipend: '⏳ R0 (Setup Phase)',
          description: 'Get 3 certified copies of your Smart ID / Barcode ID and Matric results stamped at your local SAPS station (< 3 months old).',
          recommendedCategory: 'Course',
          keySkills: ['📄 2-Page Clean PDF CV', '🆔 Certified ID Copies', '🏠 Proof of Residence'],
          actionAdvice: '⚡ Create profile on SAYouth.mobi and The Board to bypass third-party agent charges.',
          provinceHubs: ['Gauteng', 'Western Cape', 'KwaZulu-Natal']
        },
        {
          id: 'mat-inc-2',
          stepNumber: 2,
          phase: '⚡ ACCREDITATION',
          title: '💻 Accredited NQF Level 5 Learnership Intake',
          timeframe: 'Months 2 - 12',
          earningOrStipend: '💵 R6,500 - R8,500 / month + Laptop & Data',
          description: 'Join corporate programmes like Vodacom Youth Academy, BMW Training Academy, or AgriSETA for classroom and practical work.',
          recommendedCategory: 'Learnership',
          keySkills: ['☁️ Systems Support', '🤝 Client Operations', '🦺 Health & Safety'],
          actionAdvice: '🎯 Complete all theoretical formative assessments early to maximise shop-floor rotation hours.',
          provinceHubs: ['Gauteng', 'Free State', 'Limpopo']
        },
        {
          id: 'mat-inc-3',
          stepNumber: 3,
          phase: '🔮 CERTIFICATION',
          title: '🛠️ Trade Test & Vendor Exam Completion',
          timeframe: 'Month 12 - 18',
          earningOrStipend: '💵 R9,800 - R14,000 / month',
          description: 'Complete formal trade test or vendor certification (e.g. CompTIA, Microsoft Azure, SAPVIA Solar).',
          recommendedCategory: 'Learnership',
          keySkills: ['🤖 Mechatronics / Cloud', '🔍 Root-Cause Diagnosis', '⚙️ Quality Assurance'],
          actionAdvice: '📝 Request written reference letters from your supervisor 30 days before contract expiry.',
          provinceHubs: ['Gauteng', 'Western Cape']
        },
        {
          id: 'mat-inc-4',
          stepNumber: 4,
          phase: '🌟 PERMANENT ROLE',
          title: '🏆 Full-Time Junior Specialist or Technician',
          timeframe: 'Month 18+',
          earningOrStipend: '💰 R16,000 - R24,000 / month + Medical Aid',
          description: 'Securing permanent placement with medical aid, provident fund, and ongoing shift allowances.',
          recommendedCategory: 'Job',
          keySkills: ['🚀 Autonomous Operations', '📡 Field Support', '💡 Solutions Architect'],
          actionAdvice: '📈 Negotiate permanent conversion or leverage your NQF 5 certificate for specialist roles.',
          provinceHubs: ['Gauteng', 'KwaZulu-Natal', 'Western Cape']
        }
      ];
    }

    if (stage === 'tvet') {
      return [
        {
          id: 'tvet-1',
          phase: '📑 LOGBOOK SIGN',
          stepNumber: 1,
          title: '📐 NCV / N3 Workplace Logbook Registration',
          timeframe: 'Months 1 - 2',
          earningOrStipend: '⏳ R0 - R3,000 (Prep)',
          description: 'Collate TVET college transcripts, trade theory marks, and register on SETA artisan database for official apprenticeship pairing.',
          recommendedCategory: 'Learnership',
          keySkills: ['🔌 Electrical Drawings', '🦺 Industrial Safety', '📐 Technical Numeracy'],
          actionAdvice: '⚡ Confirm TVET college coordinator signs off on your 18-month workplace logbook requirements.',
          provinceHubs: ['Gauteng', 'Free State', 'Eastern Cape']
        },
        {
          id: 'tvet-2',
          phase: '⚡ APPRENTICESHIP',
          stepNumber: 2,
          title: '🏭 Dual-System Industrial Trade Rotation',
          timeframe: 'Months 3 - 18',
          earningOrStipend: '💵 R7,500 - R10,500 / month + Tool Bag',
          description: 'Work alongside certified artisans at industrial facilities (BMW Rosslyn, GreenCape Solar, Sasolburg).',
          recommendedCategory: 'Learnership',
          keySkills: ['⚙️ CNC Machining', '☀️ Solar Inverters', '🔧 Hydraulics'],
          actionAdvice: '📝 Log every task in your official artisan book weekly and get mentor signatures promptly.',
          provinceHubs: ['Gauteng', 'Free State', 'KwaZulu-Natal']
        },
        {
          id: 'tvet-3',
          phase: '🔮 RED SEAL',
          stepNumber: 3,
          title: '🛡️ Red Seal Trade Test Examination',
          timeframe: 'Months 18 - 24',
          earningOrStipend: '💵 R12,000 - R16,000 / month',
          description: 'Pass the national artisan trade test at accredited INDLELA or regional assessment center.',
          recommendedCategory: 'Course',
          keySkills: ['🔴 Red Seal Standard', '📏 Precision Calibration', '⚡ Electrical Faults'],
          actionAdvice: '🎯 Practice mock trade test runs at TVET simulation centers.',
          provinceHubs: ['Gauteng', 'Free State']
        },
        {
          id: 'tvet-4',
          phase: '🌟 QUALIFIED ARTISAN',
          stepNumber: 4,
          title: '🏆 Qualified Artisan / Renewable Contractor',
          timeframe: 'Year 2+',
          earningOrStipend: '💰 R22,000 - R35,000 / month',
          description: 'High-demand scarce skills career as licensed electrician, solar specialist, or automotive artisan.',
          recommendedCategory: 'Job',
          keySkills: ['🏗️ Project Management', '⚡ Plant Maintenance', '✍️ Independent Sign-Off'],
          actionAdvice: '🚀 Register with professional councils and consider launching independent service contractor business.',
          provinceHubs: ['National / Remote', 'Gauteng', 'Western Cape']
        }
      ];
    }

    if (stage === 'graduate') {
      return [
        {
          id: 'grad-1',
          phase: '💻 PORTFOLIO PUSH',
          stepNumber: 1,
          title: '⚡ GitHub Repos & Technical Screening Prep',
          timeframe: 'Month 1',
          earningOrStipend: '⏳ R0 (Benchmarking)',
          description: 'Assemble GitHub repositories, verified transcripts, and complete HackerRank or LeetCode baseline assessments.',
          recommendedCategory: 'Course',
          keySkills: ['💻 HTML5 & CSS3', '🔄 Responsive Grid & Flexbox', '🌐 Semantic Web & Accessibility'],
          actionAdvice: '🚀 Highlight clean, semantic web layouts and modern styling built with HTML5 and CSS3.',
          provinceHubs: ['Western Cape', 'Gauteng', 'National / Remote']
        },
        {
          id: 'grad-2',
          phase: '🚀 ENTERPRISE SQUAD',
          stepNumber: 2,
          title: '🏢 Capitec / AWS Graduate Tech Programme',
          timeframe: 'Months 2 - 12',
          earningOrStipend: '💵 R18,500 - R24,000 / month + Medical Aid',
          description: 'Embedded in high-velocity product squads at Capitec, Amazon Web Services, or Discovery Bank.',
          recommendedCategory: 'Internship',
          keySkills: ['☁️ Microservices', '📊 Distributed Systems', '⚡ Agile Standups'],
          actionAdvice: '🎯 Take ownership of production bugs early to demonstrate engineering grit to squad lead.',
          provinceHubs: ['Western Cape', 'Gauteng']
        },
        {
          id: 'grad-3',
          phase: '🔮 MID-LEVEL PROMO',
          stepNumber: 3,
          title: '💎 Mid-Level Software Engineer Conversion',
          timeframe: 'Months 12 - 24',
          earningOrStipend: '💵 R28,000 - R38,000 / month',
          description: 'Promoted to full-time Software Engineer, Cloud Architect, or Product Analyst.',
          recommendedCategory: 'Job',
          keySkills: ['☁️ Cloud Infrastructure', '📡 Event Streaming', '📐 Domain Modeling'],
          actionAdvice: '📜 Pursue company-sponsored cloud certifications (AWS Solutions Architect, GCP).',
          provinceHubs: ['Western Cape', 'Gauteng', 'National / Remote']
        },
        {
          id: 'grad-4',
          phase: '🌟 TECH LEAD',
          stepNumber: 4,
          title: '🏆 Senior Systems Architect / Squad Lead',
          timeframe: 'Year 3+',
          earningOrStipend: '💰 R45,000 - R75,000+ / month',
          description: 'Architecting high-scale digital infrastructure serving millions of African consumers.',
          recommendedCategory: 'Job',
          keySkills: ['🏛️ High-Scale Systems', '👥 Tech Mentorship', '🌍 Enterprise Strategy'],
          actionAdvice: '🌟 Mentor incoming cohorts on The Board and lead engineering open-source initiatives.',
          provinceHubs: ['National / Remote', 'Western Cape', 'Gauteng']
        }
      ];
    }

    // Self-Taught / Career Switcher
    return [
      {
        id: 'self-1',
        phase: '🧩 APTITUDE TEST',
        stepNumber: 1,
        title: '🎮 Zero-Tuition Bootcamp Logic Challenges',
        timeframe: 'Months 1 - 2',
        earningOrStipend: '💎 Free Tuition + R2,500/mo Travel Stipend',
        description: 'Complete online logic challenges and qualify for peer-to-peer intensive campuses (WeThinkCode_, GirlCode).',
        recommendedCategory: 'Course',
        keySkills: ['🧠 Algorithmic Thinking', '🧩 Logic Puzzles', '🔍 Problem Decomposition'],
        actionAdvice: '⚡ No matric certificate required — selection is 100% merit-based cognitive problem solving.',
        provinceHubs: ['Gauteng', 'Western Cape', 'KwaZulu-Natal']
      },
      {
        id: 'self-2',
        phase: '💻 IMMERSION SPRINT',
        stepNumber: 2,
        title: '⚡ Peer-to-Peer Full-Stack Sprints',
        timeframe: 'Months 3 - 14',
        earningOrStipend: '💵 R3,000 - R5,000 / month (Stipend)',
        description: 'Collaborative coding sprints without teachers, building real-world software projects with daily peer code reviews.',
        recommendedCategory: 'Course',
        keySkills: ['🧱 Clean Architecture', '📦 Data Structures', '🧪 Automated Testing'],
        actionAdvice: '👥 Collaborate in pairs and contribute consistently to open group repositories.',
        provinceHubs: ['Gauteng', 'Western Cape', 'KwaZulu-Natal']
      },
      {
        id: 'self-3',
        phase: '🚀 CORPORATE ROTATION',
        stepNumber: 3,
        title: '🏢 Guaranteed Partner Internship Placement',
        timeframe: 'Months 14 - 20',
        earningOrStipend: '💵 R14,000 - R19,000 / month',
        description: 'Direct placement into sponsoring corporate banks and tech startups with conversion quotas.',
        recommendedCategory: 'Internship',
        keySkills: ['🌐 Semantic HTML5', '⚡ Responsive CSS3 & Grid', '🎨 UI Styling & Custom Properties'],
        actionAdvice: '🎯 Exceed sprint velocity targets during your 6-month corporate evaluation.',
        provinceHubs: ['Gauteng', 'Western Cape']
      },
      {
        id: 'self-4',
        phase: '🌟 JUNIOR DEV',
        stepNumber: 4,
        title: '🏆 Permanent Junior Software Developer',
        timeframe: 'Month 20+',
        earningOrStipend: '💰 R25,000 - R35,000 / month',
        description: 'Permanent technical career without university debt or traditional degree gatekeeping.',
        recommendedCategory: 'Job',
        keySkills: ['🚀 Feature Delivery', '☁️ Microservices', '👥 Technical Mentorship'],
        actionAdvice: '📈 Build personal brand and establish technical authority in the South African tech ecosystem.',
        provinceHubs: ['Gauteng', 'Western Cape', 'National / Remote']
      }
    ];
  }, [stage, qualification, experience, targetGoal]);

  // Match opportunities
  const matchedOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const stageMatch = opp.targetStages ? opp.targetStages.includes(stage) : true;
      const qualMatch = opp.targetQualifications ? opp.targetQualifications.includes(qualification) : true;
      if (experience === 'zero_exp' && opp.experienceLevel !== 'Beginner') {
        return false;
      }
      return stageMatch || qualMatch;
    });
  }, [opportunities, stage, qualification, experience]);

  const activeNode = generatedPathway[activeNodeIndex] || generatedPathway[0];

  const handleStageSelect = (newStage: CandidateStage) => {
    playPopSound();
    setStage(newStage);
    setActiveNodeIndex(0);
    if (newStage === 'matriculant') setQualification('matric_pure');
    if (newStage === 'tvet') setQualification('tvet_ncv');
    if (newStage === 'graduate') setQualification('degree_stem');
    if (newStage === 'self_taught') setQualification('matric_lit');
  };

  const handleApplyFilter = () => {
    playSuccessSound();
    if (onFilterWallByPathway) {
      onFilterWallByPathway(matchedOpportunities.map(o => o.id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Interactive Pathway Selector Console */}
      <div className="cyber-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Console Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(73,52,73,0.85)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-[#D99AB8] text-[#211525] font-mono font-bold text-xs uppercase tracking-wider rounded-md">
                🔮 PATHWAY FLIGHT ENGINE
              </span>
              <span className="text-xs font-mono text-[#B6AAB9] uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#91B8CC]" />
                Personalised Mzansi Roadmap
              </span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#F1EAF2]">
              🗺️ GENERATE YOUR CAREER PATHWAY
            </h2>
            <p className="text-xs sm:text-sm text-[#B6AAB9] max-w-2xl mt-1">
              Select your current status below. The engine maps your 4-stage trajectory with realistic stipend projections, required certificates, and verified portals.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 bg-[#100D16]/90 border border-[rgba(73,52,73,0.85)] rounded-xl text-right">
              <span className="text-[10px] font-mono text-[#B6AAB9] uppercase block">🎯 REAL OPENINGS</span>
              <span className="font-heading font-black text-2xl text-[#91B8CC]">
                {matchedOpportunities.length} <span className="text-xs text-[#B6AAB9] font-mono font-normal">MATCHES</span>
              </span>
            </div>
          </div>
        </div>

        {/* Input Parameters Matrix */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
          {/* Option 1: Candidate Stage */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-[#D99AB8] mb-2 flex items-center gap-1.5">
              <span>🎒</span>
              <span>1. Current Situation</span>
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'matriculant', label: 'Matriculant / School Leaver', emoji: '🎒' },
                { id: 'tvet', label: 'TVET / Trade Artisan', emoji: '⚙️' },
                { id: 'graduate', label: 'University / Tech Graduate', emoji: '🎓' },
                { id: 'self_taught', label: 'Self-Taught / Code Hacker', emoji: '💻' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleStageSelect(item.id as CandidateStage)}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                    stage === item.id
                      ? 'bg-[#D99AB8] text-[#211525] border-[#D99AB8] font-bold shadow-none translate-x-1'
                      : 'bg-[#100D16]/70 text-[#B6AAB9] border-[rgba(73,52,73,0.7)] hover:border-[#D99AB8] hover:text-[#F1EAF2]'
                  }`}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Option 2: Latest Qualification */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-[#B6A0D1] mb-2 flex items-center gap-1.5">
              <span>📜</span>
              <span>2. Latest Qualification</span>
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'matric_pure', label: '📐 Matric (Pure Maths 50%+)' },
                { id: 'matric_lit', label: '📊 Matric (Maths Lit 60%+)' },
                { id: 'tvet_ncv', label: '🔧 NCV Level 4 / N3 Trade' },
                { id: 'diploma', label: '🏛️ National Diploma / Cert' },
                { id: 'degree_stem', label: "💻 Bachelor's Degree (STEM / IT)" },
                { id: 'degree_commerce_arts', label: "📈 Bachelor's (Commerce / Arts)" }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    playPopSound();
                    setQualification(item.id as QualificationType);
                  }}
                  className={`w-full p-2 text-left text-xs rounded-xl border transition-all truncate ${
                    qualification === item.id
                      ? 'bg-[#B6A0D1] text-[#211525] border-[#B6A0D1] font-bold translate-x-1 shadow-none'
                      : 'bg-[#100D16]/70 text-[#B6AAB9] border-[rgba(73,52,73,0.7)] hover:border-[#B6A0D1]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Option 3: Experience Bracket */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-[#91B8CC] mb-2 flex items-center gap-1.5">
              <span>💼</span>
              <span>3. Work Experience</span>
            </label>
            <div className="space-y-2">
              {[
                { id: 'zero_exp', label: '🌱 Zero Work Experience', sub: 'First entry opportunity' },
                { id: 'some_exp', label: '⚡ 1 - 2 Years Experience', sub: 'Retail / Gig / TVET logbook' },
                { id: 'skilled', label: '🚀 Specialist / Intermediate', sub: 'Prior bootcamp or junior post' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    playPopSound();
                    setExperience(item.id as ExperienceBracket);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                    experience === item.id
                      ? 'bg-[#91B8CC] text-[#211525] border-[#91B8CC] font-bold translate-x-1 shadow-none'
                      : 'bg-[#100D16]/70 text-[#B6AAB9] border-[rgba(73,52,73,0.7)] hover:border-[#91B8CC]'
                  }`}
                >
                  <div className="font-bold">{item.label}</div>
                  <div className={`text-[10px] ${experience === item.id ? 'text-[#211525]/80' : 'text-[#B6AAB9]'}`}>
                    {item.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Option 4: Target Ambition */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-[#D99AB8] mb-2 flex items-center gap-1.5">
              <span>🎯</span>
              <span>4. Target Ambition</span>
            </label>
            <div className="space-y-2">
              {[
                { id: 'income_now', label: '💵 Immediate Income & Stipend', sub: 'Learnership / Retail / Artisan' },
                { id: 'degree_bursary', label: '💎 Full University Bursary', sub: 'Tuition + Residence + Meals' },
                { id: 'high_tech_career', label: '🚀 High-Growth Tech Career', sub: 'Bootcamps & Graduate Roles' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    playPopSound();
                    setTargetGoal(item.id as any);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                    targetGoal === item.id
                      ? 'bg-[#F1EAF2] text-[#211525] border-[#F1EAF2] font-bold translate-x-1 shadow-none'
                      : 'bg-[#100D16]/70 text-[#B6AAB9] border-[rgba(73,52,73,0.7)] hover:border-[#F1EAF2]'
                  }`}
                >
                  <div className="font-bold">{item.label}</div>
                  <div className={`text-[10px] ${targetGoal === item.id ? 'text-[#211525]/80' : 'text-[#B6AAB9]'}`}>
                    {item.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generated 4-Stage Pathway Timeline Map */}
      <div className="cyber-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[rgba(73,52,73,0.85)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#91B8CC]"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#91B8CC]">
                ⚡ LIVE TRAJECTORY TIMELINE
              </span>
            </div>
            <h3 className="font-heading font-black text-xl sm:text-3xl text-[#F1EAF2] uppercase mt-1">
              🛣️ YOUR 4-STAGE FLIGHTPATH
            </h3>
            <p className="text-xs text-[#B6AAB9] mt-0.5">
              Tap any milestone to view monthly stipend brackets, required skills, and tactical steps.
            </p>
          </div>

          <button
            onClick={handleApplyFilter}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#D99AB8] text-[#211525] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#D99AB8]/90 transition-all hover:scale-102"
          >
            <span>VIEW {matchedOpportunities.length} REAL-LIFE OPPORTUNITIES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Milestone Nodes Row */}
        <div className="relative mb-8">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-[rgba(33,25,37,0.92)] -translate-y-1/2 z-0">
            <div 
              style={{ width: `${((activeNodeIndex + 1) / generatedPathway.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#D99AB8] via-[#B6A0D1] to-[#91B8CC] transition-all duration-500"
            ></div>
          </div>

          {/* Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {generatedPathway.map((step, idx) => {
              const isCurrent = activeNodeIndex === idx;

              return (
                <div
                  key={step.id}
                  onClick={() => {
                    playPopSound();
                    setActiveNodeIndex(idx);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isCurrent
                      ? 'bg-[rgba(33,25,37,0.92)] border-[#D99AB8] scale-102'
                      : 'bg-[#100D16]/80 border-[rgba(73,52,73,0.85)] hover:border-[#B6A0D1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-black text-xs border ${
                      isCurrent 
                        ? 'bg-[#D99AB8] text-[#211525] border-[#D99AB8]' 
                        : 'bg-[#100D16] text-[#91B8CC] border-[#91B8CC]/40'
                    }`}>
                      0{step.stepNumber}
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md ${
                      isCurrent ? 'bg-[#D99AB8]/20 text-[#D99AB8] border border-[#D99AB8]/40' : 'bg-[rgba(33,25,37,0.92)] text-[#B6AAB9]'
                    }`}>
                      {step.phase}
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-sm text-[#F1EAF2] line-clamp-2 leading-snug">
                    {step.title}
                  </h4>

                  <div className="mt-3 pt-2 border-t border-[rgba(73,52,73,0.6)] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#B6AAB9]">{step.timeframe}</span>
                    <span className="text-[#91B8CC] font-bold truncate max-w-[120px]">
                      {step.earningOrStipend.split('+')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Detail Pane */}
        <div className="bg-[#100D16]/95 border border-[rgba(73,52,73,0.85)] rounded-xl p-5 sm:p-6 text-[#F1EAF2] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[rgba(73,52,73,0.85)]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#D99AB8]/15 text-[#D99AB8] border border-[#D99AB8]/40 font-black font-mono">
                STAGE 0{activeNode.stepNumber}
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#B6A0D1] uppercase font-bold tracking-wider">
                  {activeNode.phase} · {activeNode.timeframe}
                </span>
                <h4 className="font-heading font-black text-lg sm:text-xl text-[#F1EAF2]">
                  {activeNode.title}
                </h4>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="text-[10px] font-mono text-[#B6AAB9] uppercase block">💰 PROJECTED STIPEND / INCOME</span>
              <span className="text-base sm:text-lg font-mono font-black text-[#91B8CC]">
                {activeNode.earningOrStipend}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#B6AAB9] leading-relaxed">
            {activeNode.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-3 bg-[rgba(33,25,37,0.92)] rounded-xl border border-[rgba(73,52,73,0.85)]">
              <span className="text-[10px] font-mono font-bold text-[#D99AB8] uppercase block mb-1">
                ⚡ KEY SKILLS & REQUIREMENTS
              </span>
              <div className="flex flex-wrap gap-1">
                {activeNode.keySkills.map((sk, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 bg-[#100D16] text-[#F1EAF2] rounded-md border border-[rgba(73,52,73,0.85)]">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[rgba(33,25,37,0.92)] rounded-xl border border-[rgba(73,52,73,0.85)]">
              <span className="text-[10px] font-mono font-bold text-[#B6A0D1] uppercase block mb-1">
                💡 ACTIONABLE ADVICE
              </span>
              <p className="text-xs text-[#B6AAB9]">
                {activeNode.actionAdvice}
              </p>
            </div>

            <div className="p-3 bg-[rgba(33,25,37,0.92)] rounded-xl border border-[rgba(73,52,73,0.85)]">
              <span className="text-[10px] font-mono font-bold text-[#91B8CC] uppercase block mb-1">
                📍 KEY PROVINCIAL HUBS
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#F1EAF2]">
                <MapPin className="w-3.5 h-3.5 text-[#D99AB8]" />
                <span>{activeNode.provinceHubs.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Matched Opportunities Section */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D99AB8] block mb-0.5">
              ⚡ CURRENT REAL-LIFE OPENINGS
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#F1EAF2]">
              ROLES MATCHING YOUR PATHWAY ({matchedOpportunities.length})
            </h3>
          </div>

          <button
            onClick={handleApplyFilter}
            className="flex items-center gap-1.5 font-heading font-bold text-xs uppercase px-4 py-2 border border-[rgba(73,52,73,0.85)] bg-[rgba(33,25,37,0.92)] text-[#F1EAF2] rounded-xl hover:border-[#D99AB8] transition-colors"
          >
            <span>Explore on The Wall</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {matchedOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedOpportunities.slice(0, 3).map((opp) => (
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
        ) : (
          <div className="p-8 bg-[rgba(33,25,37,0.6)] border border-[rgba(73,52,73,0.85)] rounded-2xl text-center text-[#B6AAB9] text-xs">
            No exact active roles open right now for this specific filter. Try adjusting your qualification or ambition above!
          </div>
        )}
      </div>
    </div>
  );
};
