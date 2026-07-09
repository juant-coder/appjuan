import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppState, AppStore } from "@/types/store";
import { todayStr, daysBetween } from "@/lib/date";
import { getLesson } from "@/lib/units";
import { evaluateBadges } from "@/lib/badges";

const MAX_HEARTS = 5;
const REGEN_INTERVAL_HOURS = 4;
const REGEN_INTERVAL_MS = REGEN_INTERVAL_HOURS * 60 * 60 * 1000;
const XP_PER_CORRECT = 10;
const PERFECT_BONUS = 20;

const initialState: AppState = {
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  hearts: MAX_HEARTS,
  heartsUpdatedAt: null,
  progress: {},
  badges: [],
  currentSession: null,
  theme: "dark",
  avatar: "🤑",
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      hydrateOnLoad: () => {
        get().regenerateHearts();

        set((state) => {
          const today = todayStr();
          if (state.lastActiveDate === null || state.lastActiveDate === today) {
            return {};
          }
          const gap = daysBetween(state.lastActiveDate, today);
          if (gap > 1) {
            return { streak: 0 };
          }
          return {};
        });
      },

      startLesson: (unitId, lessonId) => {
        set({
          currentSession: {
            unitId,
            lessonId,
            questionIndex: 0,
            correctCount: 0,
            incorrectCount: 0,
            mistakesMade: false,
          },
        });
      },

      answerQuestion: (optionIndex) => {
        const state = get();
        const session = state.currentSession;
        if (!session) {
          return { correct: false, correctIndex: -1, explicacao: "" };
        }
        const lesson = getLesson(session.unitId, session.lessonId);
        const question = lesson?.perguntas[session.questionIndex];
        if (!question) {
          return { correct: false, correctIndex: -1, explicacao: "" };
        }
        const correct = optionIndex === question.correta;

        set((s) => {
          if (!s.currentSession) return {};
          return {
            currentSession: {
              ...s.currentSession,
              correctCount: s.currentSession.correctCount + (correct ? 1 : 0),
              incorrectCount: s.currentSession.incorrectCount + (correct ? 0 : 1),
              mistakesMade: s.currentSession.mistakesMade || !correct,
            },
          };
        });

        if (!correct) {
          get().loseHeart();
        }

        return { correct, correctIndex: question.correta, explicacao: question.explicacao };
      },

      nextQuestion: () => {
        set((s) => {
          if (!s.currentSession) return {};
          return {
            currentSession: {
              ...s.currentSession,
              questionIndex: s.currentSession.questionIndex + 1,
            },
          };
        });
      },

      completeLesson: () => {
        const state = get();
        const session = state.currentSession;
        if (!session) {
          return { xpEarned: 0, perfect: false, newBadges: [] };
        }

        const xpEarned =
          session.correctCount * XP_PER_CORRECT + (session.mistakesMade ? 0 : PERFECT_BONUS);
        const perfect = !session.mistakesMade;
        const today = todayStr();

        set((s) => {
          const existing = s.progress[session.lessonId];
          let newStreak = s.streak;
          if (s.lastActiveDate === today) {
            newStreak = s.streak;
          } else if (s.lastActiveDate === null || daysBetween(s.lastActiveDate, today) === 1) {
            newStreak = s.streak + 1;
          } else {
            newStreak = 1;
          }

          return {
            xp: s.xp + xpEarned,
            streak: newStreak,
            lastActiveDate: today,
            progress: {
              ...s.progress,
              [session.lessonId]: {
                lessonId: session.lessonId,
                completed: true,
                bestScore: Math.max(existing?.bestScore ?? 0, session.correctCount),
                perfect: existing?.perfect || perfect,
              },
            },
            currentSession: null,
          };
        });

        const newBadges = get().checkAndAwardBadges();

        return { xpEarned, perfect, newBadges };
      },

      loseHeart: () => {
        set((s) => {
          if (s.hearts <= 0) return {};
          return {
            hearts: s.hearts - 1,
            heartsUpdatedAt: s.heartsUpdatedAt ?? new Date().toISOString(),
          };
        });
      },

      regenerateHearts: () => {
        set((s) => {
          if (s.hearts >= MAX_HEARTS || !s.heartsUpdatedAt) return {};
          const elapsed = Date.now() - new Date(s.heartsUpdatedAt).getTime();
          const heartsToAdd = Math.floor(elapsed / REGEN_INTERVAL_MS);
          if (heartsToAdd <= 0) return {};
          const newHearts = Math.min(MAX_HEARTS, s.hearts + heartsToAdd);
          const added = newHearts - s.hearts;
          const newAnchor =
            newHearts >= MAX_HEARTS
              ? null
              : new Date(new Date(s.heartsUpdatedAt).getTime() + added * REGEN_INTERVAL_MS).toISOString();
          return { hearts: newHearts, heartsUpdatedAt: newAnchor };
        });
      },

      resetSession: () => {
        set({ currentSession: null });
      },

      setTheme: (theme) => {
        set({ theme });
      },

      setAvatar: (avatar) => {
        set({ avatar });
      },

      checkAndAwardBadges: () => {
        const state = get();
        const newIds = evaluateBadges(state);
        if (newIds.length > 0) {
          const now = new Date().toISOString();
          set((s) => ({
            badges: [...s.badges, ...newIds.map((id) => ({ badgeId: id, earnedAt: now }))],
          }));
        }
        return newIds;
      },
    }),
    {
      name: "granamais-storage",
      version: 1,
    }
  )
);

export const HEARTS_REGEN_INTERVAL_HOURS = REGEN_INTERVAL_HOURS;
export const MAX_HEARTS_COUNT = MAX_HEARTS;
