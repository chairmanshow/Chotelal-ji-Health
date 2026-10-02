export type HealthCategory = 'piles_sitting' | 'mental_health' | 'hair_growth' | 'general';

export type SeverityLevel = 'mild' | 'moderate' | 'severe';

export type AppLanguage = 'hinglish' | 'english';

export interface SymptomInput {
  category: HealthCategory;
  symptoms: string;
  duration: string;
  severity: SeverityLevel;
  lifestyle: {
    sittingHours: number;
    stressLevel: 'low' | 'moderate' | 'high';
    waterIntakeLiters: number;
    dietType: 'vegetarian' | 'non_vegetarian' | 'vegan';
  };
  imageBase64?: string;
  imageName?: string;
  language: AppLanguage;
}

export interface HerbalRemedy {
  id: string;
  name: string;
  hindiName: string;
  ingredients: string;
  howToUse: string;
  frequency: string;
  benefits: string;
  caution?: string;
  iconName?: string;
}

export interface LifestyleExercise {
  id: string;
  title: string;
  hindiTitle: string;
  type: 'yoga' | 'ergonomics' | 'diet' | 'pranayama';
  instructions: string;
  timing: string;
  benefits: string;
  dos: string[];
  donts: string[];
}

export interface DoctorAdvice {
  specialistType: string;
  aiDoctorSummary: string;
  redFlags: string[];
  recommendedLabTests: string[];
  urgencyLevel: 'routine' | 'consult_within_48h' | 'immediate_emergency';
  clinicalNotes: string;
}

export interface RecommendedProduct {
  id: string;
  name: string;
  hindiName: string;
  category: HealthCategory;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  keyIngredients: string[];
  badge?: string;
  inStock: boolean;
}

export interface DiagnosisResultData {
  id: string;
  createdAt: string;
  // Direct Dynamic AI Fields
  diagnosis_text?: string;
  herbal_remedies?: string[];
  ayurvedic_treatment?: string[];
  exercises?: string[];
  warning?: string;

  patientSummary: {
    category: HealthCategory;
    reportedSymptoms: string;
    severity: SeverityLevel;
    duration: string;
  };
  diagnosis: {
    primaryCondition: string;
    primaryConditionHindi: string;
    ayurvedicDosha: string;
    confidenceScore: number;
    rootCauseAnalysis: string;
    prognosisSummary: string;
  };
  chotelalPersonalNote: string;
  tier1HerbalRemedies: HerbalRemedy[];
  tier2LifestyleAndYoga: LifestyleExercise[];
  tier3DoctorAdvice: DoctorAdvice;
  matchedProductIds: string[];
}

export interface CartItem {
  product: RecommendedProduct;
  quantity: number;
}

export interface DoctorProfile {
  id: string;
  name: string;
  qualification: string;
  experienceYears: number;
  specialty: string;
  languages: string[];
  rating: number;
  consultationFee: number;
  availableNext: string;
  avatar: string;
}
