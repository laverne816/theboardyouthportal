export type CategoryType = 
  | 'Job' 
  | 'Learnership' 
  | 'Internship' 
  | 'Bursary' 
  | 'Course' 
  | 'Event';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type Province = 
  | 'Gauteng'
  | 'Western Cape'
  | 'KwaZulu-Natal'
  | 'Eastern Cape'
  | 'Free State'
  | 'Limpopo'
  | 'Mpumalanga'
  | 'North West'
  | 'Northern Cape'
  | 'National / Remote';

export type CandidateStage = 'matriculant' | 'graduate' | 'tvet' | 'self_taught';

export type QualificationType = 
  | 'matric_pure' 
  | 'matric_lit' 
  | 'tvet_ncv' 
  | 'diploma' 
  | 'degree_stem' 
  | 'degree_commerce_arts';

export type ExperienceBracket = 'zero_exp' | 'some_exp' | 'skilled';

export interface PathwayProfile {
  stage: CandidateStage;
  qualification: QualificationType;
  experience: ExperienceBracket;
  targetGoal: 'income_now' | 'degree_bursary' | 'high_tech_career';
}

export interface PathwayStep {
  id: string;
  stepNumber: number;
  phase: string;
  title: string;
  timeframe: string;
  earningOrStipend: string;
  description: string;
  recommendedCategory: CategoryType;
  keySkills: string[];
  actionAdvice: string;
  provinceHubs: Province[];
}

export interface Opportunity {
  id: string;
  title: string;
  organisation: string;
  organisationInitials: string;
  category: CategoryType;
  accentColor: {
    bg: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    pinColor: string;
  };
  location: string;
  province: Province;
  stipendOrSalary: string;
  closingDate: string; // ISO string
  experienceLevel: ExperienceLevel;
  shortDescription: string;
  fullDescription: string;
  eligibilityRequirements: string[];
  requiredQualifications: string[];
  requiredDocuments: string[];
  applicationSteps: string[];
  officialApplicationUrl: string;
  dateAdded: string;
  lastUpdated: string;
  isFeatured: boolean;
  isVerified: boolean;
  rotationDeg?: number;
  contactEmail?: string;
  quotaSeats?: string;
  tags: string[];
  targetStages: CandidateStage[];
  targetQualifications: QualificationType[];
}

export type ApplicationStatus = 'pinned' | 'in_progress' | 'submitted' | 'interviewing' | 'accepted';

export interface ApplicationTrackItem {
  opportunityId: string;
  status: ApplicationStatus;
  pinnedAt: string;
  notes?: string;
  checklistState: { [key: string]: boolean };
}
