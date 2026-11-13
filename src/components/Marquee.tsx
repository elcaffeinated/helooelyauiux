const words = ['Web Development', 'UI Design', 'UX Research', 'Wireframing', 'React', 'Figma', 'Prototyping', 'Photography', 'Node.js', 'Accessibility']

export default function Marquee() {
  const row = [...words, ...words]
  return (
    <div data-r className="marquee relative mt-10 overflow-hidden border-y border-line py-5" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-10 pr-10 font-mono text-sm uppercase tracking-[0.18em] text-muted">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <span className="size-1.5 rounded-full bg-pink shadow-[0_0_10px_#f5449a]" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  )
}
