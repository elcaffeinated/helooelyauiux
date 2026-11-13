import { Label } from './Shared'

const facts = [
  ['BASED IN', 'Philippines'],
  ['STUDYING', '3rd-year BSIT'],
  ['FOCUS', 'Web + UI/UX'],
]

export default function About() {
  return (
    <section id="about" className="wrap section grid items-center gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-[86px]">
      <div data-r="left" className="relative mx-auto w-full max-w-[420px]">
        <div className="absolute -inset-6 rounded-[56px] bg-violet/30 blur-3xl" aria-hidden />
        <div className="relative h-[480px] overflow-hidden rounded-[40px] border border-lilac bg-gradient-to-br from-[#2a1d44] to-[#0b0612] shadow-[inset_0_0_5px_3px_#4803bf,0_0_22px_1px_#4b248e] md:h-[540px]">
          <img src="/assets/photo.jpg" alt="Portrait of elya" loading="lazy" className="size-full object-cover [object-position:20%_center] transition-transform duration-700 hover:scale-105" />
        </div>
        <div className="absolute -bottom-5 -right-3 rotate-3 rounded-2xl border border-line bg-surface/90 px-4 py-3 font-mono text-xs text-soft shadow-xl backdrop-blur md:-right-8">
          <span className="text-pink">●</span> Photographer on the side
        </div>
      </div>

      <div data-r="right">
        <Label accent="pink">ABOUT ME</Label>
        <h2 className="big !text-[clamp(2.2rem,4.6vw,3.9rem)] !font-semibold !text-fg">A little about me.</h2>
        <p className="lead mt-7 max-w-[560px]">
          I’m a 3rd-year BSIT student specializing in Web Development, with a growing interest in UI/UX design and app design. I enjoy exploring creative ideas, designing user interfaces, and finding ways to make digital experiences both visually appealing and easy to use. Outside of tech, I also enjoy photography, which allows me to express my creativity through a different lens.
        </p>
        <p className="acc-teal mt-8 inline-flex items-center gap-3 rounded-full border border-teal/60 bg-teal/10 px-5 py-2.5 font-mono text-sm">
          <i className="dot !size-2.5" />
          <span>Currently open to: <b className="font-normal text-teal">internships / freelance</b></span>
        </p>
        <dl className="mt-10 grid max-w-[560px] grid-cols-3 gap-4 border-t border-line pt-6">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[11px] tracking-widest text-muted">{k}</dt>
              <dd className="mt-1 text-[15px] font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
