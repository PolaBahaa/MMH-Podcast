export interface JesusPosition {
  left: string;      // e.g. '38%'
  top: string;       // e.g. '54%'
  scale: number;     // e.g. 0.92
  flipX?: boolean;   // horizontally flip character facing direction
}

export interface CameraTransform {
  scale: number;     // e.g. 1.05
  panX: number;      // e.g. -20
  panY: number;      // e.g. -10
}

export type ActiveSection =
  | 'home'
  | 'journey'
  | 'episode'
  | 'activities'
  | 'quiz'
  | 'puzzle'
  | 'crossword'
  | 'store'
  | 'profile'
  | 'achievements'
  | 'leaderboard'
  | 'settings'
  | 'auth';

export type CompletionStatus = 'completed' | 'not_started' | 'locked';

export interface EpisodeDetails {
  learningObjectives: string[];
  bibleReferences: string[];
  keyVerse: string;
  keyVerseRef: string;
  discussionTopics: string[];
  reflectionQuestion: string;
}

export interface SceneData {
  id: string;
  episodeNumber: number;
  sundayTitle: string;
  subtitle: string;
  description: string;
  duration: string;
  status: CompletionStatus;
  verse: string;
  verseRef: string;
  jesusPos: JesusPosition;
  camera: CameraTransform;
  themeColor: string;
  bgType: 'city_gate' | 'bethesda_pool' | 'sunlit_alley' | 'treasure_field' | 'samaritan_well' | 'country_house' | 'mountain_summit';
  episodeDetails?: EpisodeDetails;
}

export type TransitionDirection = 'next' | 'prev';
