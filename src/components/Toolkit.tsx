import { education, skills } from '../data'
import { Arrow } from '../icons'
import { Label } from './Shared'

export default function Toolkit() {
  return (
    <section id="toolkit" className="wrap section grid items-start gap-10 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-14">
      <div data-r="left" className="xl:sticky xl:top-32">
        <Label accent="indigo">MY TOOLKIT</Label>
        <h2 className="big max-w-[615px] !text-fg">Designer <em className="serif-accent text-lilac [text-shadow:0_0_26px_#8138ffaa]">Hands.</em></h2>
        <p className="lead mt-7 max-w-[491px]">I care about the whole product: how it looks, how it works, and how it feels to use.</p>
      </div>

      <div data-r="right" className="grid gap-12 rounded-[40px] border border-line bg-panel p-7 shadow-[0_0_22px_1px_#4b248e,inset_0_0_40px_#4b248e59] md:grid-cols-2 md:gap-x-16 md:rounded-[56px] md:p-14">
        <div className="md:row-span-2">
          <h3 className="mb-1.5 font-mono text-sm uppercase tracking-[0.08em] text-soft">Education</h3>
          <ul>
            {education.map((e) => (
              <li key={e.title} className="border-t border-line py-5 first:border-t-0">
                <span className="font-mono text-sm text-lilac">{e.tag}</span>
                <h4 className="mt-2 text-[26px] font-medium leading-tight">{e.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{e.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-1.5 font-mono text-sm uppercase tracking-[0.08em] text-soft">Skills</h3>
          {skills.map(([group, items]) => (
            <div key={group} className="mt-5">
              <h4 className="mb-2.5 font-mono text-sm tracking-wide text-soft">{group}</h4>
              <div className="flex flex-wrap gap-2">{items.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            </div>
          ))}
        </div>
        <a href="#projects" className="btn btn-amber self-end justify-self-start">Explore my work <Arrow className="w-6" /></a>
      </div>
    </section>
  )
}
