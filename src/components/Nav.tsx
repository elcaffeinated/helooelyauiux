import { useState } from 'react'
import { navLinks } from '../data'
import { Close, Menu, Moon, Sun } from '../icons'
import { Logo } from './Shared'

type Props = { active: string; scrolled: boolean; progress: number; light: boolean; onToggleTheme: () => void }

export default function Nav({ active, scrolled, progress, light, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent" aria-hidden>
        <div className="h-full origin-left bg-gradient-to-r from-violet via-pink to-amber" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <header
        className={`animate-[navIn_0.9s_ease_backwards] fixed left-1/2 z-50 w-[calc(100%-32px)] max-w-[1269px] -translate-x-1/2 transition-[top] duration-500 ${scrolled ? 'top-3' : 'top-6 md:top-10'}`}
      >
        <div
          className={`flex h-[62px] items-center justify-between rounded-full border border-line px-3 pl-5 shadow-[inset_0_0_4px_#00000040] transition-colors duration-500 ${scrolled ? 'bg-surface/80 backdrop-blur-xl' : 'bg-surface'}`}
        >
          <a href="#home" aria-label="elya, back to top" className="shrink-0">
            <Logo />
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-6 font-mono text-[13px] text-soft lg:flex xl:gap-8">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative py-1.5 transition-colors hover:text-fg ${active === l.id ? 'text-fg' : ''} after:absolute after:inset-x-0 after:bottom-0 after:mx-auto after:h-px after:bg-pink after:transition-[width] after:duration-300 ${active === l.id ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-pressed={light}
              aria-label={`Light mode: ${light ? 'on' : 'off'}. Switch to ${light ? 'dark' : 'light'} mode`}
              className="group inline-flex h-[46px] cursor-pointer items-center gap-2 rounded-full border border-line bg-fg/10 px-4 font-mono text-[13px] text-fg transition-colors hover:bg-fg/20"
            >
              {light ? <Moon className="size-[18px] transition-transform duration-500 group-hover:-rotate-12" /> : <Sun className="size-[18px] transition-transform duration-500 group-hover:rotate-90" />}
              <span className="hidden sm:inline">{light ? 'Light mode: on' : 'Light mode: off'}</span>
            </button>
            <button
              type="button"
              className="grid size-[46px] cursor-pointer place-items-center rounded-full border border-line text-fg lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Close className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          hidden={!open}
          className="mt-2 grid gap-1 rounded-3xl border border-line bg-surface/95 p-3 font-mono text-sm backdrop-blur-xl lg:hidden"
        >
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={`rounded-2xl px-4 py-3 transition-colors hover:bg-fg/10 ${active === l.id ? 'bg-fg/10 text-fg' : 'text-soft'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </header>
    </>
  )
}
