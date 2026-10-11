import { Opportunity, Province, CandidateStage, QualificationType } from '../types';

export const PALETTE = {
  bgDark: '#100D16',
  bgCard: 'rgba(33, 25, 37, 0.92)',
  bgCardBorder: 'rgba(73, 52, 73, 0.85)',
  textMain: '#F1EAF2',
  textMuted: '#B6AAB9',
  accentPink: '#D99AB8',
  accentLavender: '#B6A0D1',
  accentCyan: '#91B8CC',
  accentGlow: 'transparent'
};

export const CATEGORY_THEMES = {
  Job: {
    bg: 'rgba(33, 25, 37, 0.92)',
    text: '#F1EAF2',
    badgeBg: '#91B8CC', // Muted cyan
    badgeText: '#211525',
    border: '#91B8CC',
    pinColor: '#91B8CC'
  },
  Learnership: {
    bg: 'rgba(33, 25, 37, 0.92)',
    text: '#F1EAF2',
    badgeBg: '#B6A0D1', // Muted lavender
    badgeText: '#211525',
    border: '#B6A0D1',
    pinColor: '#B6A0D1'
  },
  Internship: {
    bg: 'rgba(33, 25, 37, 0.92)',
    text: '#F1EAF2',
    badgeBg: '#D99AB8', // Muted rose
    badgeText: '#211525',
    border: '#D99AB8',
    pinColor: '#D99AB8'
  },
  Bursary: {
    bg: 'rgba(33, 25, 37, 0.92)',
    text: '#F1EAF2',
    badgeBg: '#D99AB8', // Muted rose
    badgeText: '#211525',
    border: '#D99AB8',
    pinColor: '#D99AB8'
  },
  Course: {
    bg: 'rgba(33, 25, 37, 0.92)',
    text: '#F1EAF2',
    badgeBg: '#91B8CC', // Muted cyan
    badgeText: '#211525',
    border: '#91B8CC',
    pinColor: '#91B8CC'
  },
  Event: {
    bg: 'rgba(33, 25, 37, 0.92)',
    text: '#F1EAF2',
    badgeBg: '#B6A0D1', // Muted lavender
    badgeText: '#211525',
    border: '#B6A0D1',
    pinColor: '#B6A0D1'
  }
};

export const SAMPLE_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Digital Systems Operations Learnership (NQF 5)',
    organisation: 'Vodacom Youth Academy & MICT SETA',
    organisationInitials: 'VD',
    category: 'Learnership',
    accentColor: CATEGORY_THEMES.Learnership,
    location: 'Midrand, Gauteng',
    province: 'Gauteng',
    stipendOrSalary: 'R7,200 / month + Laptop & Data',
    closingDate: '2026-10-15T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: '12-month accredited IT systems support and cloud operations programme with practical corporate workplace placement.',
    fullDescription: 'The Vodacom Youth Academy in partnership with MICT SETA is seeking ambitious, unemployed South African youth aged 18-28 for an intensive 12-month learnership. Successful candidates complete accredited NQF Level 5 certifications in Systems Support, Cloud Infrastructure fundamentals, and Customer Operations, supported by senior technical mentors.',
    eligibilityRequirements: [
      'South African Citizen with valid Green Barcode ID or Smart Card',
      'Aged between 18 and 28 years old at commencement',
      'Currently unemployed and not registered in any full-time study',
      'Clean criminal record and clear background check',
      'Reside within commuting distance of Midrand campus'
    ],
    requiredQualifications: [
      'Grade 12 (Matric) with Pure Mathematics (min 50%) or Math Literacy (min 60%)',
      'English First Additional Language (min 50%)',
      'Basic computer literacy and enthusiasm for tech'
    ],
    requiredDocuments: [
      'Certified copy of South African ID (not older than 3 months)',
      'Certified copy of Grade 12 Certificate / Statement of Results',
      'Updated Curriculum Vitae (max 2 pages, PDF format)',
      'Proof of residential address (municipal bill or councillor letter)'
    ],
    applicationSteps: [
      'Verify eligibility criteria and ensure all required documents are certified at SAPS.',
      'Click "Apply Now" to navigate to the official Vodacom Early Careers portal.',
      'Complete the online aptitude and problem-solving assessment.',
      'Shortlisted applicants will receive SMS invitations for panel interviews in Midrand.'
    ],
    officialApplicationUrl: 'https://www.vodacom.com/early-careers.php',
    dateAdded: '28 Sep 2026',
    lastUpdated: '08 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'youth.programmes@vodacom.co.za',
    quotaSeats: '45 learners',
    tags: ['NQF 5', 'Cloud Tech', 'SETA Accredited', 'Stipend'],
    targetStages: ['matriculant', 'tvet'],
    targetQualifications: ['matric_pure', 'matric_lit', 'tvet_ncv']
  },
  {
    id: 'opp-2',
    title: 'Junior Software Engineering Graduate Programme',
    organisation: 'Capitec Bank Tech Labs',
    organisationInitials: 'CP',
    category: 'Internship',
    accentColor: CATEGORY_THEMES.Internship,
    location: 'Stellenbosch & Cape Town, Western Cape',
    province: 'Western Cape',
    stipendOrSalary: 'R18,500 / month + Medical Aid Subsidy',
    closingDate: '2026-10-18T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: 'Build high-scale digital banking microservices alongside senior engineers in an agile squad.',
    fullDescription: 'Join Africa\'s largest digital bank by client count. Capitec is expanding its Stellenbosch and Technopark engineering hubs. You will pair with lead architects on cloud services, API design, event-driven banking pipelines, and mobile payment interfaces.',
    eligibilityRequirements: [
      'South African youth or permanent residents aged 20-29',
      'Graduated in 2025 or graduating by December 2026',
      'Willing to work on a hybrid basis (3 days office, 2 days remote)'
    ],
    requiredQualifications: [
      'BSc Computer Science, BEng Software/Electrical, BTech Information Technology or completed recognized bootcamp (e.g., WeThinkCode_, HyperionDev)',
      'Solid foundation in at least one modern language: Java, TypeScript, C#, Go, or Python'
    ],
    requiredDocuments: [
      'Certified copy of South African ID',
      'Official academic transcript and degree / diploma certificate',
      'CV detailing GitHub profile or portfolio project links'
    ],
    applicationSteps: [
      'Submit your application through the official Capitec Careers portal.',
      'Complete the technical coding challenge within 72 hours of receiving the link.',
      'Participate in a technical architecture interview with squad leads.',
      'Final HR background check and offer letter issuance.'
    ],
    officialApplicationUrl: 'https://www.capitecbank.co.za/about-us/careers/',
    dateAdded: '01 Oct 2026',
    lastUpdated: '09 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'graduates@capitecbank.co.za',
    quotaSeats: '20 graduates',
    tags: ['FinTech', 'Hybrid', 'Full-time Conversion', 'Mentorship'],
    targetStages: ['graduate', 'self_taught'],
    targetQualifications: ['degree_stem', 'diploma']
  },
  {
    id: 'opp-3',
    title: 'Full STEM Undergraduate Bursary Programme 2027',
    organisation: 'Sasol Foundation & Trust',
    organisationInitials: 'SS',
    category: 'Bursary',
    accentColor: CATEGORY_THEMES.Bursary,
    location: 'National / All Recognized SA Public Universities',
    province: 'National / Remote',
    stipendOrSalary: 'Full Tuition + Accommodation + R4,800/mo Living Allowance',
    closingDate: '2026-10-24T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: 'Comprehensive financial support including 100% tuition, on-campus residence, textbooks, and vacation work opportunities.',
    fullDescription: 'The Sasol Foundation Bursary Programme invests in talented South African youth pursuing degrees in Science, Technology, Engineering, Data Science, and Green Chemistry. The bursary covers 100% of university tuition fees, on-campus accommodation, monthly meals and living allowance, as well as vacation work assignments.',
    eligibilityRequirements: [
      'South African citizen by birth',
      'Combined gross household income not exceeding R600,000 per annum',
      'Accepted or applying to study full-time at a recognized South African public university in 2027',
      'Current Grade 12 or current 1st-year university students'
    ],
    requiredQualifications: [
      'Grade 12 Mathematics (Pure) min Level 6 (70%)',
      'Physical Sciences min Level 6 (70%)',
      'English min Level 5 (60%)'
    ],
    requiredDocuments: [
      'Certified ID copy of applicant and both parents/guardians',
      'Grade 11 final report + Grade 12 Term 2 / Term 3 results',
      'Proof of household income (3 months payslips or SASSA proof)',
      'Provisional university acceptance letter (if already available)'
    ],
    applicationSteps: [
      'Register on the official Sasol Bursaries Portal and complete student profile.',
      'Upload certified supporting financial and academic documents.',
      'Undergo psychometric evaluation and online video submission.',
      'Final award letters announced after matric result verification.'
    ],
    officialApplicationUrl: 'https://www.sasolbursaries.com/',
    dateAdded: '25 Sep 2026',
    lastUpdated: '07 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'bursaries@sasol.com',
    quotaSeats: '120 bursaries',
    tags: ['Full Cover', 'STEM', 'Vacation Work', 'Grade 12 / 1st Year'],
    targetStages: ['matriculant'],
    targetQualifications: ['matric_pure']
  },
  {
    id: 'opp-4',
    title: 'Store Operations & Customer Experience Associate',
    organisation: 'Cotton On Group SA',
    organisationInitials: 'CO',
    category: 'Job',
    accentColor: CATEGORY_THEMES.Job,
    location: 'Gateway Theatre of Shopping, Durban, KwaZulu-Natal',
    province: 'KwaZulu-Natal',
    stipendOrSalary: 'R8,200 - R9,500 / month + Store Staff Discount',
    closingDate: '2026-10-14T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: 'Permanent retail associate role focusing on customer service, POS operations, visual merchandising and stock handling.',
    fullDescription: 'Are you energetic, passionate about youth fashion and great customer experiences? Cotton On Gateway is looking for team members to deliver outstanding service on the retail floor. You will manage customer consultations, point of sale transactions, restocking, and visual display merchandising.',
    eligibilityRequirements: [
      'South African ID holder aged 18+',
      'Able to work flexible retail shifts including weekends and public holidays',
      'High energy, polite communication and reliable timekeeping',
      'Living within 25km of Umhlanga / Durban North'
    ],
    requiredQualifications: [
      'Grade 12 (Matric) Certificate',
      'Basic numeracy and comfortable handling till cash/card terminals'
    ],
    requiredDocuments: [
      'Updated 1-page CV with 2 contactable references',
      'Certified copy of ID (within 3 months)',
      'Matric certificate'
    ],
    applicationSteps: [
      'Complete application on Cotton On Group Careers official portal.',
      'Shortlisted applicants invited for an energetic group assessment session at Gateway store.',
      'Reference checks completed within 48 hours.'
    ],
    officialApplicationUrl: 'https://cottonongroup.com/careers/',
    dateAdded: '03 Oct 2026',
    lastUpdated: '10 Oct 2026',
    isFeatured: false,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'careers.za@cottonon.com',
    quotaSeats: '6 positions',
    tags: ['Permanent', 'Retail', 'No Exp Needed', 'Durban'],
    targetStages: ['matriculant', 'tvet'],
    targetQualifications: ['matric_pure', 'matric_lit']
  },
  {
    id: 'opp-5',
    title: 'Full-Stack Software Development Bootcamp (Tuition-Free)',
    organisation: 'WeThinkCode_ Campus',
    organisationInitials: 'WT',
    category: 'Course',
    accentColor: CATEGORY_THEMES.Course,
    location: 'Braamfontein (JHB) & Woodstock (CPT) & Durban (KZN)',
    province: 'Gauteng',
    stipendOrSalary: 'Free Tuition (Zero Fees) + Monthly Travel Stipend R2,500',
    closingDate: '2026-10-30T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: 'Zero fees, peer-to-peer 16-month software development curriculum with direct corporate internship placement.',
    fullDescription: 'WeThinkCode_ is a world-class software engineering academy open to everyone between 16 and 35. No prior coding experience or matric maths score required — selection is purely based on your problem-solving aptitude through online game-based assessments and a physical selection bootcamp.',
    eligibilityRequirements: [
      'South African citizen or valid work permit',
      'Aged 16 to 35 on day of registration',
      'Able to commit full-time (Monday to Friday, 08:30 to 17:00)'
    ],
    requiredQualifications: [
      'No matric required for entrance — passing the cognitive tests is sufficient!',
      'Relentless curiosity, teamwork and logical thinking'
    ],
    requiredDocuments: [
      'Copy of ID or passport',
      'Signed commitment agreement'
    ],
    applicationSteps: [
      'Visit official WeThinkCode_ portal and play the 2 online logic puzzles (approx. 2 hours).',
      'If you achieve a passing score, you will be invited to an online open day.',
      'Attend the rigorous 6-day in-person Bootcamp.',
      'Accept your spot in the cohort starting early next year.'
    ],
    officialApplicationUrl: 'https://www.wethinkcode.co.za/',
    dateAdded: '15 Sep 2026',
    lastUpdated: '06 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'admissions@wethinkcode.co.za',
    quotaSeats: '300 learners',
    tags: ['No Fees', 'Peer-to-Peer', 'Industry Placed', 'Youth 16-35'],
    targetStages: ['matriculant', 'self_taught', 'tvet'],
    targetQualifications: ['matric_pure', 'matric_lit', 'tvet_ncv']
  },
  {
    id: 'opp-6',
    title: 'SA Youth National Job & Learnership Network',
    organisation: 'SA Youth / Harambee & Presidency PYEI',
    organisationInitials: 'SA',
    category: 'Event',
    accentColor: CATEGORY_THEMES.Event,
    location: 'National / All 9 Provinces (Data-Free on Mobile)',
    province: 'National / Remote',
    stipendOrSalary: '100% Free Service + Data-Free on All SA Networks',
    closingDate: '2026-10-31T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: 'South Africa\'s zero-rated national employment platform matching youth with real entry-level jobs, learnerships and PYEI programmes.',
    fullDescription: 'SA Youth is a 100% free, zero-rated (no data needed) national network for young South Africans. Created by Harambee Youth Employment Accelerator and the Presidency, it links young job seekers with verified employers, government schools assistant roles, SETA learnerships, and digital freelance gigs.',
    eligibilityRequirements: [
      'Open to all South African youth aged 18 to 34',
      'Free registration on any mobile phone (zero data required)'
    ],
    requiredQualifications: [
      'All qualifications welcome — from Grade 9 to university postgraduate degrees'
    ],
    requiredDocuments: [
      'South African ID number',
      'Phone number reachable via SMS'
    ],
    applicationSteps: [
      'Click Apply Now to navigate to the official sayouth.mobi portal.',
      'Register your free profile or sign in with your ID number.',
      'Browse and apply directly to vacancies within your municipality with zero data cost.'
    ],
    officialApplicationUrl: 'https://sayouth.mobi/',
    dateAdded: '02 Oct 2026',
    lastUpdated: '10 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'support@sayouth.org.za',
    quotaSeats: 'Unlimited Youth',
    tags: ['Data-Free', 'Official National Network', 'No Fees', 'Instant Matching'],
    targetStages: ['matriculant', 'graduate', 'tvet', 'self_taught'],
    targetQualifications: ['matric_pure', 'matric_lit', 'tvet_ncv', 'diploma', 'degree_stem', 'degree_commerce_arts']
  },
  {
    id: 'opp-7',
    title: 'Automotive Manufacturing Technician Apprenticeship',
    organisation: 'BMW Group South Africa Plant Rosslyn',
    organisationInitials: 'BM',
    category: 'Learnership',
    accentColor: CATEGORY_THEMES.Learnership,
    location: 'Rosslyn, Pretoria, Gauteng',
    province: 'Gauteng',
    stipendOrSalary: 'R9,800 / month + Safety Gear + Transport Subsidy',
    closingDate: '2026-10-19T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: '3-year German dual-system trade test qualification in mechatronics and high-precision vehicle assembly.',
    fullDescription: 'BMW South Africa\'s prestigious Training Academy in Rosslyn produces world-class mechatronics and toolmaker artisans. Selected candidates undergo theoretical and hands-on shop-floor training on electric vehicle robotics, robotics calibration, and German engineering standards.',
    eligibilityRequirements: [
      'South African Citizen aged 18 to 26',
      'Passionate about precision automotive manufacturing',
      'Physically fit and passed occupational medical'
    ],
    requiredQualifications: [
      'Technical Matric (Grade 12) with Pure Maths (50%) and Physical Science (50%) OR N3 / NCV Level 4 in Mechanical / Electrical'
    ],
    requiredDocuments: [
      'Certified ID copy',
      'Certified Matric / N3 certificate and full statements',
      'Medical fitness declaration'
    ],
    applicationSteps: [
      'Submit credentials on BMW South Africa Careers official portal.',
      'Complete mechanical comprehension assessment.',
      'Technical practical assessment at Rosslyn Academy.'
    ],
    officialApplicationUrl: 'https://www.bmw.co.za/en/topics/fascination-bmw/careers.html',
    dateAdded: '29 Sep 2026',
    lastUpdated: '05 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'apprentice.recruitment@bmw.co.za',
    quotaSeats: '30 apprentices',
    tags: ['Artisan Trade', 'German Standard', 'EV Tech', 'High Stipend'],
    targetStages: ['matriculant', 'tvet'],
    targetQualifications: ['matric_pure', 'tvet_ncv']
  },
  {
    id: 'opp-8',
    title: 'Youth Environmental & Tourism Ambassador Internship',
    organisation: 'City of Cape Town Environmental Directorate',
    organisationInitials: 'CT',
    category: 'Internship',
    accentColor: CATEGORY_THEMES.Internship,
    location: 'Cape Town, Western Cape',
    province: 'Western Cape',
    stipendOrSalary: 'R6,800 / month',
    closingDate: '2026-10-27T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: 'Community nature reserve conservation, eco-tourism guiding, and municipal sustainability education.',
    fullDescription: 'Work across Cape Town\'s world-renowned nature reserves (Table Mountain, Rondevlei, Tygerberg, Blaauwberg). Interns assist conservation rangers with alien plant clearance, eco-tourism visitor education, and indigenous fynbos rehabilitation projects.',
    eligibilityRequirements: [
      'Unemployed youth residing within the City of Cape Town municipality',
      'Aged 18 to 30 years old',
      'Passion for outdoors, nature conservation, and environmental education'
    ],
    requiredQualifications: [
      'Grade 12 Certificate with good English and communication skills',
      'Diploma in Nature Conservation or Tourism is an advantage but not mandatory'
    ],
    requiredDocuments: [
      'Certified ID Copy',
      'Matric Certificate',
      'Proof of Cape Town address (rates account or affidavit)'
    ],
    applicationSteps: [
      'Apply online via City of Cape Town Jobs portal.',
      'Attend brief group interview and fitness walk at Table Bay nature reserve.'
    ],
    officialApplicationUrl: 'https://www.capetown.gov.za/City-Connect/Apply/Jobs-and-internships/Apply-for-a-job-or-internship',
    dateAdded: '04 Oct 2026',
    lastUpdated: '09 Oct 2026',
    isFeatured: false,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'environmental.youth@capetown.gov.za',
    quotaSeats: '50 interns',
    tags: ['Municipal', 'Conservation', 'Tourism', 'Cape Town'],
    targetStages: ['matriculant', 'graduate'],
    targetQualifications: ['matric_pure', 'matric_lit', 'diploma']
  },
  {
    id: 'opp-9',
    title: 'Chartered Accounting Fellowship Bursary 2027',
    organisation: 'Allan Gray Orbis Foundation',
    organisationInitials: 'AG',
    category: 'Bursary',
    accentColor: CATEGORY_THEMES.Bursary,
    location: 'Rhodes, UCT, Wits, UJ, Stellenbosch, UP, Fort Hare & NMU',
    province: 'National / Remote',
    stipendOrSalary: 'Comprehensive: Tuition, Residence, Allowance + Mentorship',
    closingDate: '2026-11-10T23:59:59Z',
    experienceLevel: 'Intermediate',
    shortDescription: 'Prestigious fellowship fostering entrepreneurial leaders pursuing BCom Accounting / Finance.',
    fullDescription: 'The Allan Gray Fellowship is more than financial assistance; it is a holistic development ecosystem designed to cultivate high-impact entrepreneurs. Fellows receive complete university tuition funding, accommodation, monthly living allowances, book subsidies, and personal executive coaching.',
    eligibilityRequirements: [
      'South African citizenship',
      'Belief in the future of South Africa and demonstrating entrepreneurial leadership',
      'Intent to pursue BCom Accounting, Law, Engineering, or Pure Sciences'
    ],
    requiredQualifications: [
      'Grade 12 with minimum 65% in Pure Mathematics and 70% overall average',
      'Under 21 years of age in matric year'
    ],
    requiredDocuments: [
      'Certified copy of South African ID',
      'Matric mid-year / preliminary exam results',
      'Two letters of recommendation (teacher, community leader)',
      '1,000-word essay on entrepreneurial vision for South Africa'
    ],
    applicationSteps: [
      'Submit candidate application on official Allan Gray Orbis Foundation portal.',
      'Participate in regional selection camp.',
      'Final Board interviews in November.'
    ],
    officialApplicationUrl: 'https://www.allangrayorbis.org/fellowship-programme/',
    dateAdded: '20 Sep 2026',
    lastUpdated: '04 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'fellowship@allangray.co.za',
    quotaSeats: '80 fellows',
    tags: ['Prestige', 'Full Ride', 'Entrepreneurship', 'CA Track'],
    targetStages: ['matriculant'],
    targetQualifications: ['matric_pure']
  },
  {
    id: 'opp-10',
    title: 'Customer Success & Cloud Support Specialist',
    organisation: 'Amazon Web Services (AWS) South Africa',
    organisationInitials: 'AW',
    category: 'Job',
    accentColor: CATEGORY_THEMES.Job,
    location: 'Cape Town (CBD / Foreshore), Western Cape',
    province: 'Western Cape',
    stipendOrSalary: 'R19,000 - R24,000 / month + Night Shift Allowance & Benefits',
    closingDate: '2026-10-21T23:59:59Z',
    experienceLevel: 'Intermediate',
    shortDescription: 'Permanent role supporting global cloud enterprise customers via chat, email, and ticketing systems.',
    fullDescription: 'Amazon Web Services Cape Town Development Centre is hiring dynamic Customer Support Specialists. You will act as the first line of engagement for AWS cloud clients worldwide, resolving billing inquiries, access configuration questions, and service entitlement requests.',
    eligibilityRequirements: [
      'South African citizen or permanent resident',
      'Fluent written and spoken English',
      'Comfortable with rotational shifts covering 24/7 global operations'
    ],
    requiredQualifications: [
      'Completed Diploma or Bachelor\'s Degree in any discipline (Business, IT, Arts, Communications)',
      'Strong problem solving and empathy skills'
    ],
    requiredDocuments: [
      'Curriculum Vitae with contact details',
      'Certified ID copy and degree certificate'
    ],
    applicationSteps: [
      'Submit application on official Amazon.jobs Cape Town location portal.',
      'Standardized virtual assessment (customer scenarios & basic typing/logic).',
      'Two behavioral interviews using the Amazon Leadership Principles.'
    ],
    officialApplicationUrl: 'https://www.amazon.jobs/en/locations/cape-town-south-africa',
    dateAdded: '02 Oct 2026',
    lastUpdated: '09 Oct 2026',
    isFeatured: false,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'capetown-recruiting@amazon.com',
    quotaSeats: '15 positions',
    tags: ['Permanent', 'Global Tech', 'Cloud', 'Medical Aid + Pension'],
    targetStages: ['graduate', 'self_taught'],
    targetQualifications: ['diploma', 'degree_commerce_arts', 'degree_stem']
  },
  {
    id: 'opp-11',
    title: 'Agricultural Technology & Hydroponics Learnership',
    organisation: 'AgriSETA Enterprise Development Programme',
    organisationInitials: 'AG',
    category: 'Learnership',
    accentColor: CATEGORY_THEMES.Learnership,
    location: 'Polokwane & Tzaneen, Limpopo',
    province: 'Limpopo',
    stipendOrSalary: 'R5,500 / month + Daily Meals on Farm',
    closingDate: '2026-10-28T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: '12-month AgriSETA accredited qualification in modern precision farming, smart irrigation, and export packing.',
    fullDescription: 'Empowering Limpopo youth in modern commercial agribusiness. This learnership combines classroom modules at Limpopo Agricultural College with commercial farm rotations in citrus, macadamia, and greenhouse berry production.',
    eligibilityRequirements: [
      'Unemployed South African youth from Limpopo rural & peri-urban districts',
      'Aged 18 to 30',
      'Commitment to physical outdoor agricultural work'
    ],
    requiredQualifications: [
      'Grade 12 with Agricultural Science or Life Sciences preferred, or general matric pass'
    ],
    requiredDocuments: [
      'Certified ID copy',
      'Certified Grade 12 Certificate',
      'Proof of residence stamped by Traditional Council or Municipality'
    ],
    applicationSteps: [
      'Apply online on AgriSETA portal or collect forms at Limpopo Department of Agriculture district offices.',
      'Shortlisted applicants invited for interview at Polokwane Agriculture Centre.'
    ],
    officialApplicationUrl: 'https://www.agriseta.co.za/',
    dateAdded: '26 Sep 2026',
    lastUpdated: '06 Oct 2026',
    isFeatured: false,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'limpopo.youth@agri-enterprise.gov.za',
    quotaSeats: '60 learners',
    tags: ['AgriSETA', 'Limpopo', 'Smart Farming', 'Food Security'],
    targetStages: ['matriculant', 'tvet'],
    targetQualifications: ['matric_pure', 'matric_lit', 'tvet_ncv']
  },
  {
    id: 'opp-12',
    title: 'Certified Cyber Security Junior Analyst Course (CompTIA Sec+)',
    organisation: 'Cisco Networking Academy & CSIR',
    organisationInitials: 'CS',
    category: 'Course',
    accentColor: CATEGORY_THEMES.Course,
    location: 'Online / Self-Paced + Weekly Live Labs (National)',
    province: 'National / Remote',
    stipendOrSalary: '100% Subsidised Exam Vouchers ($390 Value) + Free Courseware',
    closingDate: '2026-11-05T23:59:59Z',
    experienceLevel: 'Intermediate',
    shortDescription: 'Free sponsored certification voucher programme preparing young South Africans for defense against cyber threats.',
    fullDescription: 'In partnership with the Council for Scientific and Industrial Research (CSIR), Cisco NetAcad offers fully funded scholarship seats for youth pursuing cyber security careers. Includes network defense, vulnerability assessment, threat intelligence, and a fully funded CompTIA Security+ examination voucher upon successful completion.',
    eligibilityRequirements: [
      'South African youth aged 18 to 32',
      'Access to a PC/laptop with steady internet for 6 hours/week',
      'Committed to completing the 10-week syllabus'
    ],
    requiredQualifications: [
      'Basic IT networking knowledge or completed IT matric / diploma'
    ],
    requiredDocuments: [
      'Certified copy of South African ID',
      'Short motivational paragraph (150 words)'
    ],
    applicationSteps: [
      'Sign up on the official Cisco NetAcad Skills-For-All portal.',
      'Complete baseline IT diagnostic quiz.',
      'Receive access to live laboratory sessions and sponsored CompTIA exam voucher.'
    ],
    officialApplicationUrl: 'https://www.netacad.com/',
    dateAdded: '01 Oct 2026',
    lastUpdated: '08 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'cyberyouth@csir.co.za',
    quotaSeats: '250 seats',
    tags: ['Certification', 'Cybersecurity', 'Free Voucher', 'Remote'],
    targetStages: ['matriculant', 'graduate', 'self_taught'],
    targetQualifications: ['matric_pure', 'diploma', 'degree_stem']
  },
  {
    id: 'opp-13',
    title: 'National Priority Teaching Bursary Programme (Funza Lushaka)',
    organisation: 'Department of Basic Education (DBE) & NSFAS',
    organisationInitials: 'FL',
    category: 'Bursary',
    accentColor: CATEGORY_THEMES.Bursary,
    location: 'National / All Recognized SA Public Universities',
    province: 'National / Remote',
    stipendOrSalary: '100% Tuition + Campus Residence + Meals + Book Allowance',
    closingDate: '2026-11-15T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: 'Multi-year full-ride government bursary for young South Africans pursuing Bachelor of Education (BEd) or PGCE.',
    fullDescription: 'The Funza Lushaka Bursary Programme is a multi-year national government initiative promoting teaching in priority subjects including Foundation Phase, Mathematics, Sciences, and Indigenous African Languages. Successful recipients receive 100% tuition coverage, university residence accommodation, meal allowances, book grants, and direct contractual placement into provincial public school posts upon graduation.',
    eligibilityRequirements: [
      'South African Citizen with valid ID document',
      'Accepted or currently registered for an accredited BEd or PGCE at a public South African university',
      'Under 30 years old on initial registration',
      'Committed to teaching in a provincial public school for the duration of funding received'
    ],
    requiredQualifications: [
      'Grade 12 (Matric) with Bachelor Degree endorsement pass',
      'Minimum Level 4 (50%) in English and subject specialization'
    ],
    requiredDocuments: [
      'Certified copy of South African ID',
      'Certified Matric Certificate or Academic Transcript',
      'Provisional university admission letter'
    ],
    applicationSteps: [
      'Register student profile on the official Funza Lushaka DBE portal.',
      'Select university campus and chosen priority subject phase.',
      'Submit academic transcripts and track approval status.'
    ],
    officialApplicationUrl: 'https://www.funzalushaka.doe.gov.za/',
    dateAdded: '05 Oct 2026',
    lastUpdated: '10 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'funzalushaka@dbe.gov.za',
    quotaSeats: '5,000 bursaries',
    tags: ['Full Cover', 'Teaching', 'Government', 'Guaranteed Placement'],
    targetStages: ['matriculant', 'graduate'],
    targetQualifications: ['matric_pure', 'matric_lit', 'diploma']
  },
  {
    id: 'opp-14',
    title: '12-Month Quality Work Experience Programme (YES4Youth)',
    organisation: 'Youth Employment Service (YES) & Corporate Partners',
    organisationInitials: 'YE',
    category: 'Job',
    accentColor: CATEGORY_THEMES.Job,
    location: 'National / Gauteng, Western Cape, KZN & Eastern Cape',
    province: 'National / Remote',
    stipendOrSalary: 'R4,800 - R7,500 / month (Paid Corporate Work Experience)',
    closingDate: '2026-10-25T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: 'National presidential initiative providing unemployed youth with a 12-month paid corporate placement, smart device, and reference letter.',
    fullDescription: 'YES is a business-led government collaboration that has created over 140,000 paid work experiences for young South Africans. Youth are placed in leading corporate environments (Nedbank, Toyota, Shoprite, Investec) for 12 continuous months, earning a guaranteed monthly stipend while building a CV with an official reference letter and smartphone-based digital learning modules.',
    eligibilityRequirements: [
      'South African citizen aged 18 to 29 years',
      'Currently unemployed at time of registration',
      'Not previously completed a 12-month YES work experience'
    ],
    requiredQualifications: [
      'Matric (Grade 12) or equivalent TVET certificate'
    ],
    requiredDocuments: [
      'Valid South African ID number',
      'Curriculum Vitae in PDF format',
      'Proof of residence'
    ],
    applicationSteps: [
      'Sign up on the official YES4Youth portal.',
      'Complete profile with your nearest municipality and skill interests.',
      'Receive SMS match notifications when partner corporates review applicants in your area.'
    ],
    officialApplicationUrl: 'https://www.yes4youth.co.za/',
    dateAdded: '02 Oct 2026',
    lastUpdated: '09 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'youth@yes.co.za',
    quotaSeats: '2,500 placements',
    tags: ['YES4Youth', 'Corporate Placements', '12 Months', 'Reference Letter'],
    targetStages: ['matriculant', 'tvet', 'graduate'],
    targetQualifications: ['matric_pure', 'matric_lit', 'tvet_ncv', 'diploma']
  },
  {
    id: 'opp-15',
    title: 'Banking & Financial Markets Youth Learnership 2026/2027',
    organisation: 'Standard Bank Group & BANKSETA',
    organisationInitials: 'SB',
    category: 'Learnership',
    accentColor: CATEGORY_THEMES.Learnership,
    location: 'Johannesburg (Rosebank / Simmonds St) & Durban, KZN',
    province: 'Gauteng',
    stipendOrSalary: 'R8,500 / month + Medical Aid Subsidy',
    closingDate: '2026-10-22T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: '12-month accredited NQF 5 banking operations learnership within corporate retail, investment and digital branches.',
    fullDescription: 'Standard Bank South Africa is accepting applications for its flagship BANKSETA-registered Youth Learnership. Successful candidates gain hands-on commercial experience in customer operations, digital payment systems, regulatory compliance, and branch omnichannel services, earning a nationally recognized NQF Level 5 qualification and an R8,500 monthly stipend.',
    eligibilityRequirements: [
      'South African citizen aged 18 to 30',
      'Currently unemployed and not studying full-time',
      'Clear credit record (ITC) and clear criminal record'
    ],
    requiredQualifications: [
      'Grade 12 (Matric) with Pure Mathematics (min 50%) or Math Literacy (min 60%)',
      'English First Additional Language (min 50%)'
    ],
    requiredDocuments: [
      'Certified copy of Smart ID or Green ID book',
      'Certified Matric Certificate',
      'Updated 2-page CV'
    ],
    applicationSteps: [
      'Access the official Standard Bank Early Careers portal.',
      'Register candidate profile and upload certified documents.',
      'Complete automated numerical and situational judgment tests online.'
    ],
    officialApplicationUrl: 'https://jobs.standardbank.com/content/Early-Careers/',
    dateAdded: '01 Oct 2026',
    lastUpdated: '10 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'learnerships@standardbank.co.za',
    quotaSeats: '85 learners',
    tags: ['Banking', 'NQF 5', 'BANKSETA', 'High Stipend'],
    targetStages: ['matriculant', 'tvet'],
    targetQualifications: ['matric_pure', 'matric_lit', 'diploma']
  },
  {
    id: 'opp-16',
    title: 'National Student Financial Aid Scheme (NSFAS Bursary)',
    organisation: 'Department of Higher Education & Training (DHET)',
    organisationInitials: 'NS',
    category: 'Bursary',
    accentColor: CATEGORY_THEMES.Bursary,
    location: 'All 26 Public Universities & 50 TVET Colleges (National)',
    province: 'National / Remote',
    stipendOrSalary: '100% Tuition + Accommodation + Monthly Living & Travel Allowance',
    closingDate: '2026-11-30T23:59:59Z',
    experienceLevel: 'Beginner',
    shortDescription: 'Official government comprehensive funding bursary for undergraduate students from working-class households.',
    fullDescription: 'NSFAS is the South African government\'s bursary fund for poor and working-class students. It covers 100% of registration fees, university tuition fees, prescribed learning materials, student accommodation, and monthly allowances for personal living expenses. Once approved, the bursary does not need to be repaid.',
    eligibilityRequirements: [
      'South African citizen or permanent resident',
      'SASSA grant recipients immediately qualify financially',
      'Combined gross household income not exceeding R350,000 per year (or R600,000 for students with disabilities)',
      'Applying to or registered at a public SA University or TVET College'
    ],
    requiredQualifications: [
      'Grade 12 National Senior Certificate (Matric) or TVET NCV Level 4'
    ],
    requiredDocuments: [
      'Copy of South African ID card or birth certificate',
      'Consent form signed by parents/guardians for income verification',
      'Proof of household income (if non-SASSA)'
    ],
    applicationSteps: [
      'Create a my.NSFAS account on the official portal.',
      'Submit ID number, phone number, and household income details.',
      'Track real-time evaluation and funding confirmation status.'
    ],
    officialApplicationUrl: 'https://www.nsfas.org.za/',
    dateAdded: '01 Oct 2026',
    lastUpdated: '11 Oct 2026',
    isFeatured: true,
    isVerified: true,
    rotationDeg: 0,
    contactEmail: 'info@nsfas.org.za',
    quotaSeats: 'Over 500,000 students',
    tags: ['Government Bursary', 'Full Cover', 'Universities & TVETs', 'Zero Repayment'],
    targetStages: ['matriculant', 'tvet'],
    targetQualifications: ['matric_pure', 'matric_lit', 'tvet_ncv']
  }
];

export const PROVINCES: Province[] = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
  'National / Remote'
];
