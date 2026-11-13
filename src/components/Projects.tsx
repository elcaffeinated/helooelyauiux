import { useEffect, useRef, useState } from 'react'
import { projects, type Filter, type Project } from '../data'
import { Arrow, Close } from '../icons'
import Cover from './Cover'
import { Label } from './Shared'

const filters: [Filter, string][] = [['all', 'All'], ['ui-ux', 'UI-UX'], ['web', 'Web'], ['photo', 'Photo']]

/** Bento placement on large screens, depending on how many projects are visible. */
function slot(i: number, count: number) {
  if (i === 0) return count === 1 ? 'lg:col-span-6' : count === 2 ? 'lg:col-span-3 lg:row-span-2' : 'lg:col-span-3 lg:row-span-2'
  if (i === 1) return count === 2 ? 'lg:col-span-3 lg:row-span-2' : 'lg:col-start-4 lg:col-span-3'
  if (i === 2) return 'lg:col-start-4 lg:col-span-3'
  if (i === 3) return count === 4 ? 'lg:col-span-6' : 'lg:col-span-3'
  return 'lg:col-span-3'
}

export default function Projects({ filter, onFilter }: { filter: Filter; onFilter: (f: Filter) => void }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const list = projects.filter((p) => filter === 'all' || p.type === filter)
  const open = projects.find((p) => p.id === openId) ?? null

  return (
    <section id="projects" className="wrap section">
      <Label accent="amber" data-r>SELECTED WORK</Label>
      <h2 className="big max-w-[992px] title-glow" data-r>Projects with purpose.</h2>

      <div className="mt-9 flex flex-wrap gap-2.5" role="group" aria-label="Filter projects" data-r>
        {filters.map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => onFilter(key)}
            className="cursor-pointer rounded-full border border-soft/35 px-5 py-2.5 font-mono text-sm tracking-wide text-soft transition hover:border-fg hover:text-fg aria-pressed:border-btn aria-pressed:bg-btn aria-pressed:text-btn-fg aria-pressed:shadow-[0_0_18px_#ffffff40]"
          >
            {label}
          </button>
        ))}
        <span className="ml-auto self-center font-mono text-sm text-muted" aria-live="polite">{list.length} {list.length === 1 ? 'project' : 'projects'}</span>
      </div>

      <div key={filter} className="mt-9 grid gap-6 lg:auto-rows-[300px] lg:grid-cols-6 lg:gap-8">
        {list.map((p, i) => (
          <article
            key={p.id}
            data-r
            style={{ ['--d' as string]: `${i * 0.07}s` }}
            className={`glow-card spot acc-${p.accent} group flex min-h-[340px] flex-col overflow-hidden rounded-[26px] ${slot(i, list.length)}`}
          >
            <div className={`relative flex-1 overflow-hidden ${i === 0 && list.length > 1 ? 'min-h-[260px]' : 'min-h-[150px]'}`}>
              <Cover type={p.type} accent={p.accent} large={i === 0 && list.length > 1} />
            </div>
            <div className="relative z-[2] grid grid-cols-[1fr_auto] items-end gap-x-4 px-6 pb-5 pt-4">
              <h3 className="text-2xl leading-tight">{p.title}</h3>
              <Arrow className="row-span-3 col-start-2 row-start-1 w-8 self-end transition-transform duration-300 group-hover:translate-x-2" />
              <p className="text-sm text-soft">{p.category}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-fg/30 px-2.5 py-0.5 font-mono text-xs text-soft">{t}</span>
                ))}
              </div>
            </div>
            <button type="button" aria-haspopup="dialog" onClick={() => setOpenId(p.id)} className="absolute inset-0 z-[3] cursor-pointer rounded-[26px] focus-visible:outline-offset-[-5px]">
              <span className="sr-only">Open case study: {p.title}</span>
            </button>
          </article>
        ))}
        {!list.length && <p className="col-span-full py-10 font-mono text-muted">No projects in this category yet.</p>}
      </div>

      {open && <CaseStudy p={open} list={list} onClose={() => setOpenId(null)} onNav={setOpenId} />}
    </section>
  )
}

function CaseStudy({ p, list, onClose, onNav }: { p: Project; list: Project[]; onClose: () => void; onNav: (id: string) => void }) {
  const panel = useRef<HTMLDivElement>(null)
  const idx = list.findIndex((x) => x.id === p.id)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    document.documentElement.style.overflow = 'hidden'
    panel.current?.focus()
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !panel.current) return
      const f = [...panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
      if (!f.length) return
      const first = f[0], last = f[f.length - 1], cur = document.activeElement
      if (e.shiftKey && (cur === first || cur === panel.current)) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('keydown', key)
      document.documentElement.style.overflow = ''
      prev?.focus?.()
    }
  }, [onClose])

  useEffect(() => { panel.current?.scrollTo({ top: 0 }) }, [p.id])

  const neighbor = (d: number) => list[(idx + d + list.length) % list.length]
  const sec = 'rounded-2xl border border-line bg-fg/[0.04] p-5'
  const h3 = 'mb-2 font-mono text-xs uppercase tracking-[0.12em] text-muted'

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4 md:p-7">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md [animation:mfade_.25s]" onClick={onClose} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cs-title"
        tabIndex={-1}
        className={`acc-${p.accent} relative max-h-[92vh] w-full max-w-[940px] overflow-auto rounded-[28px] border border-[var(--c)]/60 bg-bg text-fg shadow-[0_0_60px_color-mix(in_srgb,var(--glow)_55%,transparent)] outline-none [animation:mpop_.32s_cubic-bezier(.2,.8,.2,1)]`}
      >
        <button onClick={onClose} aria-label="Close case study" className="absolute right-4 top-4 z-10 grid size-11 cursor-pointer place-items-center rounded-full border border-white/50 bg-black/60 text-white transition hover:bg-white hover:text-black">
          <Close className="size-5" />
        </button>
        <div className="group h-56 md:h-80"><Cover type={p.type} accent={p.accent} large /></div>
        <div className="px-6 pt-8 md:px-11 md:pt-10">
          <p className="font-mono text-sm tracking-wide text-soft">{p.category}</p>
          <h2 id="cs-title" className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{p.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => <span key={t} className="rounded-full border border-fg/30 px-3 py-1 font-mono text-xs text-soft">{t}</span>)}
          </div>
        </div>
        <div className="px-6 pb-8 pt-8 md:px-11 md:pb-10">
          <div className="grid gap-4 md:grid-cols-2">
            <section className={`${sec} md:col-span-2`}><h3 className={h3}>Overview</h3><p className="leading-relaxed text-soft">{p.overview}</p></section>
            <section className={sec}><h3 className={h3}>My Role</h3><p className="leading-relaxed text-soft">{p.role}</p></section>
            <section className={sec}>
              <h3 className={h3}>Tools</h3>
              <ul className="flex flex-wrap gap-2">{p.tools.map((t) => <li key={t} className="rounded-full bg-[var(--c)]/20 px-3 py-1 font-mono text-xs">{t}</li>)}</ul>
            </section>
            <section className={`${sec} md:col-span-2`}>
              <h3 className={h3}>Process</h3>
              <ol className="grid gap-3">
                {p.process.map((s, i) => (
                  <li key={s} className="flex gap-4 text-soft"><span className="font-mono text-[var(--c)]">{String(i + 1).padStart(2, '0')}</span>{s}</li>
                ))}
              </ol>
            </section>
            <section className={`${sec} md:col-span-2`}><h3 className={h3}>Result</h3><p className="leading-relaxed text-soft">{p.result}</p></section>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {p.live && <a className="btn btn-light !h-14" href={p.live} target="_blank" rel="noopener noreferrer">Live site <Arrow className="w-5" /></a>}
            {p.github && <a className="btn btn-ghost !h-14" href={p.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {list.length > 1 && (
              <div className="ml-auto flex gap-2 font-mono text-sm">
                <button onClick={() => onNav(neighbor(-1).id)} className="cursor-pointer rounded-full border border-line px-4 py-2 text-soft transition hover:border-fg hover:text-fg">← Prev</button>
                <button onClick={() => onNav(neighbor(1).id)} className="cursor-pointer rounded-full border border-line px-4 py-2 text-soft transition hover:border-fg hover:text-fg">Next →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
