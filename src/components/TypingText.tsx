'use client'

import { animate, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import CursorBlinker from './CursorBlinker'

interface TypingChunk {
  content: string
  className?: string
}

interface TypingTextProps {
  text: TypingChunk[]
  speed?: number
  delay?: number
  className?: string
  isCursorBlinker?: boolean
  onComplete?: () => void
}

export default function TypingText({
  text,
  speed = 12,
  delay = 0.5,
  className,
  isCursorBlinker = true,
  onComplete,
}: TypingTextProps) {
  const [visible, setVisible] = useState<React.ReactNode[]>([])
  const full = text.map(t => t.content).join('')
  const count = useMotionValue(0)
  const [isCompleted, setIsCompleted] = useState(false) // 완료 상태 추가

  useEffect(() => {
    if (isCompleted) return; // 이미 완료된 경우 애니메이션 재실행 방지

    const duration = full.length / speed

    const controls = animate(count, full.length, {
      type: 'tween',
      delay,
      duration,
      ease: 'linear',
      onUpdate: latest => {
        const len = Math.round(latest)
        let shown = 0
        const parts: React.ReactNode[] = []

        for (const [i, chunk] of text.entries()) {
          if (shown >= len) break
          const slice = chunk.content.slice(0, len - shown)
          shown += slice.length
          slice.split('\n').forEach((line, idx, arr) => {
            parts.push(
              <span key={`${i}-${idx}`} className={chunk.className}>
                {line}
              </span>
            )
            if (idx < arr.length - 1) parts.push(<br key={`br-${i}-${idx}`} />)
          })
        }
        setVisible(parts)
      },
      onComplete: () => {
        setIsCompleted(true)
        onComplete?.()
      },
    })

    const skip = () => {
      if (isCompleted) return

      controls.stop()
      count.set(full.length)

      const parts: React.ReactNode[] = []
      text.forEach((chunk, i) => {
        chunk.content.split('\n').forEach((line, idx, arr) => {
          parts.push(
            <span key={`${i}-${idx}`} className={chunk.className}>
              {line}
            </span>
          )
          if (idx < arr.length - 1) {
            parts.push(<br key={`br-${i}-${idx}`} />)
          }
        })
      })

      setVisible(parts)
      setIsCompleted(true)
      onComplete?.()
    }


    // 지연 시간 후 이벤트 리스너 추가
    const timer = setTimeout(() => {
      const kd = (e: KeyboardEvent) => e.key === 'Enter' && skip()
      window.addEventListener('keydown', kd)
      window.addEventListener('click', skip)
      return () => {
        window.removeEventListener('keydown', kd)
        window.removeEventListener('click', skip)
      }
    }, delay * 1000) // delay 초 후에 이벤트 리스너 활성화

    return () => {
      controls.stop()
      clearTimeout(timer)
    }
  }, [full, speed, delay, text, onComplete, isCompleted])

  return (
    <span className={className}>
      {visible}
      {isCursorBlinker && !isCompleted && <CursorBlinker />}
    </span>
  )
}