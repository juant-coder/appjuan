export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  bestScore: number;
  perfect: boolean;
}

export interface EarnedBadge {
  badgeId: string;
  earnedAt: string;
}

export interface LessonSession {
  unitId: string;
  lessonId: string;
  questionIndex: number;
  correctCount: number;
  incorrectCount: number;
  mistakesMade: boolean;
}

export interface AnswerResult {
  correct: boolean;
  correctIndex: number;
  explicacao: string;
  respostaCerta?: string;
}

export interface CompleteLessonResult {
  xpEarned: number;
  perfect: boolean;
  newBadges: string[];
}

export type Theme = "dark" | "light";

export interface HistoryEntry {
  date: string;
  lessonId: string;
  xpEarned: number;
}

export interface AppState {
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  hearts: number;
  heartsUpdatedAt: string | null;
  progress: Record<string, LessonProgress>;
  badges: EarnedBadge[];
  currentSession: LessonSession | null;
  theme: Theme;
  avatar: string;
  history: HistoryEntry[];
  reviewSuggested: boolean;
  onboarded: boolean;
  focus: string[];
  unlockedUpTo: number;
}

export interface AppActions {
  hydrateOnLoad: () => void;
  startLesson: (unitId: string, lessonId: string) => void;
  answerQuestion: (answer: number | string) => AnswerResult;
  nextQuestion: () => void;
  completeLesson: () => CompleteLessonResult;
  loseHeart: () => void;
  regenerateHearts: () => void;
  resetSession: () => void;
  checkAndAwardBadges: () => string[];
  setTheme: (theme: Theme) => void;
  setAvatar: (avatar: string) => void;
  completeReview: (correctCount: number) => number;
  dismissReview: () => void;
  completeOnboarding: (focus: string[], unlockedUpTo: number) => void;
}

export type AppStore = AppState & AppActions;
