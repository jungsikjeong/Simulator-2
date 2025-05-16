// src/lib/uiPresets.ts
export type UIPreset = 'light' | 'dark' | 'glass' | 'start' | 'fail' | 'romance' | 'ending'

/* 대사 박스 */
export const dialoguePreset: Record<UIPreset, string> = {
  light: 'bg-gradient-to-r from-[#a2b3cb]/70 via-white/70 to-[#a2b3cb]/70 border-none rounded-xl text-gray-800 shadow-sm ring-1 ring-white/30',
  dark: 'bg-black/80 border border-gray-600 text-white shadow-md',
  glass: 'bg-white/30 border border-white/40 text-white backdrop-blur-md shadow',
  start: 'bg-soft-blue-80 border-2 border-soft-blue text-white shadow-xl',
  fail: 'bg-white/80 border-none rounded-xl text-gray-700 shadow-md ring-1 ring-gray-200/50',
  romance: ' border-none rounded-xl text-white',
  ending: 'bg-soft-blue-ending border border-soft-blue/30 rounded-xl text-white shadow-md '
}

/* 선택지 리스트 */
export const choicePreset: Record<
  UIPreset,
  { wrapper: string; button: string }
> = {
  /* ░░ Light ░░ */
  light: {
    wrapper: 'bg-none border-none',
    button: [
      'bg-[#fff]/80 hover:bg-[#e0edfe]/90 active:bg-[#FFE6D9]/95',
      'text-gray-800 border border-gray-200/50 shadow-sm',
    ].join(' '),
  },

  /* ░░ Dark ░░ */
  dark: {
    wrapper: 'bg-black/75 border-white/20',
    button: [
      'bg-black/60 hover:bg-black/20 active:bg-black/80',
      'text-white border-white/30',
    ].join(' '),
  },

  /* ░░ Glass ░░ */
  glass: {
    wrapper: 'bg-black/40 backdrop-blur-sm',
    button: [
      'bg-white/25 hover:bg-white/40 active:bg-white/50',
      'text-white border-white/40 backdrop-blur-md',
    ].join(' '),
  },

  start: {
    wrapper: 'bg-white/90 border-none shadow-md backdrop-blur-sm',
    button: [
      'bg-[#FFF8F3] hover:bg-[#FFF0E8] active:bg-[#FFE6D9]',
      'text-gray-800 border border-gray-200/50 shadow-sm',
    ].join(' '),
  },

  /* ░░ Fail ░░ */
  fail: {
    wrapper: 'bg-white/90 border-none shadow-md',
    button: [
      'bg-blue-50 hover:bg-blue-100 active:bg-blue-200',
      'text-blue-600 border border-blue-100 shadow-sm',
    ].join(' '),
  },

  /* ░░ Romance ░░ */
  romance: {
    wrapper: '',
    button: '',
  },

  /* ░░ Ending ░░ */
  ending: {
    wrapper: 'bg-white/90 border-none shadow-md',
    button: [
      'bg-white/70 hover:bg-white/90 active:bg-white',
      'text-gray-800 border border-gray-200/50 shadow-sm',
    ].join(' '),
  },
}