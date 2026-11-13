import { navLinks } from '../data'
import { ArrowUp } from '../icons'
import { Logo } from './Shared'

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line px-[5%] pb-10 pt-12 md:px-11">
      <div data-r className="mx-auto flex max-w-[1368px] flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <Logo className="scale-110" />
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-sm text-soft">
          {navLinks.filter((l) => l.id !== 'toolkit').map((l) => <a key={l.id} href={`#${l.id}`} className="transition hover:text-fg hover:[text-shadow:0_0_12px_currentColor]">{l.label}</a>)}
        </nav>
        <a href="#home" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs text-soft transition hover:border-fg hover:text-fg">
          Back to top <ArrowUp className="size-4" />
        </a>
      </div>
      <div data-r style={{ ['--d' as string]: '.1s' }} className="mx-auto mt-10 flex max-w-[1368px] flex-col items-center justify-between gap-2 font-mono text-[13px] text-muted md:flex-row">
        <p>Junior web developer with a UI/UX design edge, based in the Philippines.</p>
        <p>© {new Date().getFullYear()} Elya creates. All rights reserved.</p>
      </div>
    </footer>
  )
}
