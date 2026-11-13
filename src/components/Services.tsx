import { services, type Filter } from '../data'
import { Arrow, Camera, Code, Layers, Layout } from '../icons'
import { Label } from './Shared'

const icons = { code: Code, layout: Layout, layers: Layers, camera: Camera }

export default function Services({ onPick }: { onPick: (f: Filter) => void }) {
  return (
    <section id="services" className="wrap section">
      <Label accent="teal" data-r>WHAT I DO</Label>
      <h2 className="big max-w-[915px] title-glow" data-r>Ideas, shaped into useful things.</h2>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = icons[s.icon]
          return (
            <a
              key={s.n}
              href="#projects"
              onClick={() => onPick(s.filter)}
              data-r
              style={{ ['--d' as string]: `${i * 0.08}s` }}
              className={`glow-card spot acc-${s.accent} group flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[26px] p-6 lg:min-h-[371px]`}
            >
              <div className="relative z-[2] flex items-start justify-between">
                <span className="grid size-[56px] place-items-center rounded-xl border border-[var(--c)] bg-[color-mix(in_srgb,var(--glow)_65%,transparent)] text-white shadow-[inset_0_0_7px_#ffffff80] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="size-7" />
                </span>
                <b className="font-mono text-lg font-normal tracking-wider text-muted">{s.n}</b>
              </div>
              <div className="relative z-[2]">
                <h3 className="text-[25px] font-medium">{s.title}</h3>
                <p className="mt-2 max-w-[275px] text-sm leading-snug text-muted">{s.text}</p>
                <span className="mt-8 flex justify-end">
                  <span className="grid size-[56px] place-items-center rounded-xl border border-[var(--c)] bg-[color-mix(in_srgb,var(--glow)_65%,transparent)] text-white">
                    <Arrow className="w-7 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
