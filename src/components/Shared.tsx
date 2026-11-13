import type { ReactNode } from 'react'
import type { Accent } from '../data'

export function Label({ accent, children, ...rest }: { accent: Accent; children: ReactNode } & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`label acc-${accent}`} {...rest}>
      <i className="dot" />
      {children}
    </p>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid size-9 place-items-center rounded-full bg-pink font-serif text-xl font-bold italic leading-none text-white shadow-[0_0_18px_#f5449a99]">e</span>
      <span className="font-serif text-xl font-semibold italic tracking-wide">elya</span>
    </span>
  )
}
