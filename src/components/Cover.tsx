import type { Accent, ProjectType } from '../data'

/** Generated cover art so each project has a visual before real screenshots exist. */
export default function Cover({ type, accent, large = false }: { type: ProjectType; accent: Accent; large?: boolean }) {
  return (
    <div
      className={`acc-${accent} relative size-full overflow-hidden`}
      style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--glow) 55%, #05020c), var(--c))' }}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute -right-10 -top-10 size-56 rounded-full bg-white/20 blur-3xl" />

      {type === 'web' && (
        <div className={`absolute left-1/2 top-[18%] w-[72%] -translate-x-1/2 rounded-2xl border border-white/30 bg-black/45 p-3 shadow-2xl backdrop-blur transition-transform duration-700 group-hover:-translate-y-3 group-hover:scale-[1.03] ${large ? 'h-[78%]' : 'h-[88%]'}`}>
          <div className="flex gap-1.5"><i className="size-2 rounded-full bg-white/60" /><i className="size-2 rounded-full bg-white/40" /><i className="size-2 rounded-full bg-white/25" /></div>
          <div className="mt-3 h-4 w-2/3 rounded bg-white/70" />
          <div className="mt-2 h-2 w-1/2 rounded bg-white/35" />
          <div className="mt-4 grid grid-cols-3 gap-2"><i className="h-14 rounded-lg bg-white/25" /><i className="h-14 rounded-lg bg-white/15" /><i className="h-14 rounded-lg bg-white/25" /></div>
          <div className="mt-3 h-8 w-24 rounded-full bg-white/80" />
        </div>
      )}

      {type === 'ui-ux' && (
        <>
          <div className="absolute left-[24%] top-[16%] h-[92%] w-[26%] min-w-[84px] -rotate-6 rounded-[22px] border border-white/40 bg-black/45 p-2.5 shadow-2xl backdrop-blur transition-transform duration-700 group-hover:-translate-y-3 group-hover:-rotate-[9deg]">
            <div className="mx-auto h-1 w-8 rounded bg-white/50" />
            <div className="mt-3 h-10 rounded-lg bg-white/70" />
            <div className="mt-2 h-3 w-3/4 rounded bg-white/40" />
            <div className="mt-2 h-3 w-1/2 rounded bg-white/25" />
            <div className="mt-3 grid grid-cols-2 gap-1.5"><i className="h-10 rounded-md bg-white/25" /><i className="h-10 rounded-md bg-white/20" /></div>
          </div>
          <div className="absolute right-[22%] top-[28%] h-[92%] w-[26%] min-w-[84px] rotate-6 rounded-[22px] border border-white/40 bg-black/55 p-2.5 shadow-2xl backdrop-blur transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[9deg]">
            <div className="mx-auto h-1 w-8 rounded bg-white/50" />
            <div className="mt-3 size-12 rounded-full bg-white/70" />
            <div className="mt-3 h-3 w-full rounded bg-white/40" />
            <div className="mt-2 h-3 w-2/3 rounded bg-white/25" />
            <div className="mt-3 h-8 rounded-full bg-white/80" />
          </div>
        </>
      )}

      {type === 'photo' && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[220, 160, 100, 44].map((s, i) => (
            <span key={s} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 transition-transform duration-700 group-hover:scale-110" style={{ width: s, height: s, background: i === 3 ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.05)', transitionDelay: `${i * 40}ms` }} />
          ))}
          <span className="block size-[220px]" />
        </div>
      )}
    </div>
  )
}
