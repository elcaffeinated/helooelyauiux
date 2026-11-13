import { useEffect, useRef, useState } from 'react'
import { education, profile, skills } from '../data'
import { Close, Download, External, Eye } from '../icons'
import { Label } from './Shared'

export default function Resume() {
  const [open, setOpen] = useState(false)
  const url = profile.resume
  if (!url) return null

  return (
    <section id="resume" className="wrap section grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
      <div data-r="left">
        <Label accent="purple">RÉSUMÉ</Label>
        <h2 className="big max-w-[620px] !text-fg">The short version, <em className="serif-accent text-pink [text-shadow:0_0_28px_#f5449ab3]">on paper.</em></h2>
        <p className="lead mt-7 max-w-[491px]">Education, skills and selected work in one page. Read it here or take a copy with you.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="btn btn-light">
            <Eye className="size-6" /> View resume
          </button>
          <a href={url} download="Elya-Resume.pdf" className="btn btn-ghost">
            <Download className="size-6" /> Download PDF
          </a>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-fg">
          Open in a new tab <External className="size-4" />
        </a>
      </div>

      <div data-r="right" className="group relative mx-auto w-full max-w-[460px]">
        <div className="absolute -inset-8 rounded-full bg-violet/25 blur-3xl" aria-hidden />
        <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-2xl border border-line bg-surface transition-transform duration-500 group-hover:translate-x-6 group-hover:rotate-6" aria-hidden />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-label="Preview resume"
          className="relative block w-full cursor-pointer rounded-2xl bg-white p-8 text-left text-[#1c1826] shadow-[0_24px_60px_#00000070] transition-transform duration-500 hover:-translate-y-2 hover:-rotate-1 md:p-10"
        >
          <span className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-pink" aria-hidden />
          <span className="block text-3xl font-extrabold tracking-tight">Elya</span>
          <span className="mt-1 block text-sm font-medium text-[#5d566b]">Junior Web Developer · UI/UX Designer</span>
          <span className="mt-6 block font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a8398]">Education</span>
          {education.slice(0, 2).map((e) => (
            <span key={e.title} className="mt-2 block">
              <span className="block text-[13px] font-bold">{e.title}</span>
              <span className="block text-[11px] leading-snug text-[#5d566b]">{e.text}</span>
            </span>
          ))}
          <span className="mt-5 block font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a8398]">Skills</span>
          <span className="mt-2 flex flex-wrap gap-1.5">
            {skills.flatMap(([, items]) => items).slice(0, 9).map((s) => (
              <span key={s} className="rounded-full bg-[#efe8fc] px-2.5 py-0.5 font-mono text-[10px] text-[#4803bf]">{s}</span>
            ))}
          </span>
          <span className="mt-6 block space-y-1.5" aria-hidden>
            <i className="block h-1.5 w-full rounded bg-[#e8e4f0]" />
            <i className="block h-1.5 w-5/6 rounded bg-[#e8e4f0]" />
            <i className="block h-1.5 w-2/3 rounded bg-[#e8e4f0]" />
          </span>
          <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-medium text-[#4803bf]">Click to preview <Eye className="size-4" /></span>
        </button>
      </div>

      {open && <Viewer url={url} onClose={() => setOpen(false)} />}
    </section>
  )
}

function Viewer({ url, onClose }: { url: string; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)

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

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-3 md:p-7">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md [animation:mfade_.25s]" onClick={onClose} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Resume"
        tabIndex={-1}
        className="relative flex h-[92vh] w-full max-w-[960px] flex-col overflow-hidden rounded-[24px] border border-lilac/50 bg-bg shadow-[0_0_60px_#4b248e] outline-none [animation:mpop_.32s_cubic-bezier(.2,.8,.2,1)]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <h2 className="font-mono text-sm tracking-wide text-soft">Elya-Resume.pdf</h2>
          <div className="flex items-center gap-2">
            <a href={url} download="Elya-Resume.pdf" className="inline-flex items-center gap-2 rounded-full bg-btn px-4 py-2 text-sm font-semibold text-btn-fg transition hover:opacity-90">
              <Download className="size-4" /> Download
            </a>
            <button onClick={onClose} aria-label="Close resume" className="grid size-10 cursor-pointer place-items-center rounded-full border border-line text-fg transition hover:bg-fg hover:text-bg">
              <Close className="size-5" />
            </button>
          </div>
        </div>
        <object data={`${url}#view=FitH`} type="application/pdf" className="min-h-0 w-full flex-1 bg-white" aria-label="Resume PDF">
          <div className="grid h-full place-items-center p-8 text-center">
            <p className="max-w-sm text-muted">Your browser can’t show PDFs inline. <a className="text-fg underline" href={url} target="_blank" rel="noopener noreferrer">Open the resume in a new tab</a> or use the Download button.</p>
          </div>
        </object>
      </div>
    </div>
  )
}
