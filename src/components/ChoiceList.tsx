'use client'

import { choicePreset, type UIPreset } from '@/lib/uiPresets'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

interface Choice {
  key: string
  label: string
}

interface ChoiceListProps {
  open: boolean
  choices: Choice[]
  onSelect: (key: string) => void
  variant?: UIPreset
  /** true → 말풍선 아래에 붙는 인라인 / false → 오버레이 */
  inline?: boolean
  className?: string // wrapper 오버라이드
  textClassName?: string // 버튼 텍스트 클래스 오버라이드
}

export default function ChoiceList({
  open,
  choices,
  onSelect,
  variant = 'light',
  inline = false,
  className,
  textClassName = 'text-base',
}: ChoiceListProps) {
  const preset = choicePreset[variant]

  /* ── wrapper: overlay vs inline ── */
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    inline ? (
      <div className="flex w-full justify-center">{children}</div>
    ) : (
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    )

  return (
    <AnimatePresence>
      {open && (
        <Wrapper>
          <motion.ul
            className={cn(
              'mb-4 w-[90%] max-w-md space-y-3 rounded-xl border',
              preset.wrapper,
              className
            )}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 16 }}
          >
            {choices.map(c => (
              <motion.li key={c.key} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => onSelect(c.key)}
                  className={cn(
                    /* ① 공통 레이아웃 + 애니메이션 */
                    'flex w-full cursor-pointer items-center rounded-full border px-2 py-3 transition-all duration-150 ease-out hover:scale-[1.02] active:scale-100 sm:py-3 sm:pr-6 sm:pl-5',
                    /* ② 프리셋 색상/호버/포커스 */
                    preset.button
                  )}
                >
                  <div className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center">
                    <span className="text-sm">▶</span>
                  </div>
                  <span className={cn(textClassName, 'text-sm sm:text-base')}>
                    {c.label}
                  </span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </Wrapper>
      )}
    </AnimatePresence>
  )
}
