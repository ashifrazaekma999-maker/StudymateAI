
export enum CourseLevel {
  CLASS_10 = 'Class 10',
  CLASS_11_12 = 'Class 11-12',
  GRADUATION = 'Graduation',
  POST_GRADUATION = 'Post-Graduation'
}

export type AppLanguage = 'English' | 'Hindi' | 'Bengali' | 'Marathi' | 'Tamil' | 'Telugu' | 'Gujarati' | 'Kannada' | 'Urdu';

export type LearningStyle = 'Visual' | 'Reading/Writing' | 'Practice-based' | 'Conceptual';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface User {
  userId: string;
  fullName: string;
  age: number;
  mobile: string;
  email: string;
  state: string;
  courseLevel: CourseLevel;
  branch: string;
  college: string;
  password?: string;
  preferredLanguage: AppLanguage;
  learningStyle?: LearningStyle;
  xp?: number;
  level?: number;
  badges?: Badge[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  type?: 'text' | 'code' | 'diagram' | 'quiz' | 'flashcards';
  timestamp: number;
}

export interface StudyGroup {
  id: string;
  name: string;
  members: number;
  subject: string;
  recentActivity: string;
}

export interface ProgressStat {
  subject: string;
  completion: number;
  lastScore: number;
  studyTime: number; // in minutes
}
