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
      <img src="/logo.webp" alt="" width={36} height={36} className="size-9 rounded-full object-cover shadow-[0_0_18px_#f5449a99] ring-1 ring-pink/60" />
      <span className="font-serif text-xl font-semibold italic tracking-wide">elya</span>
    </span>
  )
}
