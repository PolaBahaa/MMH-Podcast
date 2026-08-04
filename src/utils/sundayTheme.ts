export interface SundayVerseTheme {
  containerClass: string;
  textClass: string;
  refClass: string;
  badgeClass: string;
}

/**
 * Returns the dynamic accent theme for the Bible verse box per Sunday episode.
 */
export const getSundayVerseStyle = (episodeNumber: number): SundayVerseTheme => {
  switch (episodeNumber) {
    case 1: // Treasures → Warm Gold
      return {
        containerClass: 'bg-amber-950/25 backdrop-blur-md border-amber-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
        textClass: 'text-amber-100',
        refClass: 'text-amber-300/85',
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      };
    case 2: // Temptation → Desert Sand
      return {
        containerClass: 'bg-stone-900/35 backdrop-blur-md border-amber-700/35 shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
        textClass: 'text-stone-100',
        refClass: 'text-amber-200/80',
        badgeClass: 'bg-amber-700/20 text-amber-200 border-amber-700/30',
      };
    case 3: // Prodigal Son → Deep Amber
      return {
        containerClass: 'bg-amber-950/35 backdrop-blur-md border-amber-600/40 shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
        textClass: 'text-amber-50',
        refClass: 'text-amber-400/90',
        badgeClass: 'bg-amber-600/20 text-amber-300 border-amber-600/30',
      };
    case 4: // Samaritan Woman → Soft Blue
      return {
        containerClass: 'bg-sky-950/30 backdrop-blur-md border-sky-500/35 shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
        textClass: 'text-sky-100',
        refClass: 'text-sky-300/90',
        badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      };
    case 5: // Paralytic → Emerald
      return {
        containerClass: 'bg-emerald-950/30 backdrop-blur-md border-emerald-500/35 shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
        textClass: 'text-emerald-100',
        refClass: 'text-emerald-300/90',
        badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      };
    case 6: // Blind Man → Royal Blue
      return {
        containerClass: 'bg-blue-950/30 backdrop-blur-md border-blue-500/35 shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
        textClass: 'text-blue-100',
        refClass: 'text-indigo-300/90',
        badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      };
    case 7: // Palm Sunday → Olive Green
      return {
        containerClass: 'bg-lime-950/30 backdrop-blur-md border-lime-500/35 shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
        textClass: 'text-lime-100',
        refClass: 'text-lime-300/90',
        badgeClass: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
      };
    default:
      return {
        containerClass: 'bg-black/25 backdrop-blur-md border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
        textClass: 'text-amber-100',
        refClass: 'text-amber-300/80',
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      };
  }
};
