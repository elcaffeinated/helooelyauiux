import { useState, type FormEvent } from 'react'
import { profile } from '../data'
import { Check, Copy } from '../icons'
import { Label } from './Shared'

type Errors = Partial<Record<'first' | 'last' | 'email' | 'message', string>>

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState('')
  const [copied, setCopied] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const v = (k: string) => String(f.get(k) ?? '').trim()
    const next: Errors = {}
    if (!v('first')) next.first = 'Please add your first name.'
    if (!v('last')) next.last = 'Please add your last name.'
    if (!/^\S+@\S+\.\S+$/.test(v('email'))) next.email = 'Enter a valid email address.'
    if (v('message').length < 10) next.message = 'Tell me a bit more (10+ characters).'
    setErrors(next)
    if (Object.keys(next).length) {
      setStatus('Please fix the highlighted fields.')
      return
    }
    // No server is connected, so hand the message to the visitor's email app.
    const body = `${v('message')}\n\n— ${v('first')} ${v('last')}\n${v('email')}${v('phone') ? `\n${v('phone')}` : ''}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${v('first')} ${v('last')}`)}&body=${encodeURIComponent(body)}`
    setStatus('Opening your email app with the message ready to send.')
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setStatus(`Copy failed. My email is ${profile.email}`)
    }
  }

  const err = (k: keyof Errors) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `err-${k}` : undefined })
  const Msg = ({ k }: { k: keyof Errors }) => (errors[k] ? <span id={`err-${k}`} className="mt-1.5 block text-[13px] text-pink">{errors[k]}</span> : null)

  return (
    <section id="contact" className="wrap section grid items-center gap-14 lg:grid-cols-[825fr_570fr] lg:gap-[72px]">
      <form onSubmit={submit} noValidate data-r="left" className="rounded-[40px] border border-soft/50 bg-panel/60 p-7 shadow-[0_0_22px_1px_#4b248e,inset_0_0_7px_#c8a8ff33] backdrop-blur-md md:rounded-[56px] md:p-12">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <label className="field">First Name<input name="first" placeholder="Juan" autoComplete="given-name" {...err('first')} /><Msg k="first" /></label>
          <label className="field">Last Name<input name="last" placeholder="Dela Cruz" autoComplete="family-name" {...err('last')} /><Msg k="last" /></label>
          <label className="field">Email<input type="email" name="email" placeholder="juan@email.com" autoComplete="email" {...err('email')} /><Msg k="email" /></label>
          <label className="field">Contact Number<input type="tel" name="phone" placeholder="09123456789" autoComplete="tel" /></label>
        </div>
        <label className="field mt-8">Message<textarea name="message" placeholder="Tell me about your idea…" {...err('message')} /><Msg k="message" /></label>
        <button className="mt-9 h-16 w-full cursor-pointer rounded-full bg-btn text-lg font-semibold tracking-wide text-btn-fg shadow-[inset_0_0_6px_#ffffff7d] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_color-mix(in_srgb,var(--btn-bg)_60%,transparent)]">Send message</button>
        <p role="status" aria-live="polite" className="mt-4 min-h-[22px] text-center font-mono text-sm text-muted">{status}</p>
      </form>

      <div data-r="right">
        <Label accent="teal">SAY HELLO :)</Label>
        <h2 className="big !mt-9 !font-bold">Have something <em className="serif-accent font-semibold text-pink [text-shadow:0_0_28px_#f5449ab3]">interesting</em> in mind?</h2>
        <p className="lead mt-8">Tell me the rough idea. I’ll bring the curiosity, good questions, and probably a moodboard.</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}`} className="text-lg text-muted underline decoration-pink/60 underline-offset-4 transition hover:text-fg">{profile.email}</a>
          <button type="button" onClick={copy} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-soft transition hover:border-fg hover:text-fg" aria-label="Copy email address">
            {copied ? <Check className="size-4 text-teal" /> : <Copy className="size-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </section>
  )
}
