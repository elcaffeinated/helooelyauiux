import { profile } from '../data'
import { useCycle, useParallax } from '../hooks'
import { Arrow, Figma, Github, Linkedin } from '../icons'
import { Label } from './Shared'

const socialIcons = { figma: Figma, github: Github, linkedin: Linkedin }

export default function Hero() {
  const blob = useParallax<HTMLDivElement>(0.12)
  const role = useCycle(profile.roles)
  const socials = (Object.entries(profile.socials) as [keyof typeof socialIcons, string][]).filter(([, url]) => url)

  return (
    <section id="home" className="relative mx-auto w-full max-w-[1523px] overflow-x-clip px-[5%] pb-10 pt-40 md:px-[74px] md:pt-[190px]">
      <div className="aurora pointer-events-none absolute -left-24 top-24 size-[420px] rounded-full bg-violet/30 blur-[120px]" aria-hidden />
      <div ref={blob} className="pointer-events-none absolute -right-14 top-48 w-[250px] opacity-90 sm:right-0 sm:w-[340px] md:right-10 md:top-52 md:w-[420px] lg:right-[130px] lg:w-[500px]" aria-hidden>
        <img className="blob block h-auto w-full max-w-none" src="/assets/blob.webp" alt="" width={729} height={850} fetchPriority="high" />
      </div>

      <Label accent="purple" data-r>STILL BECOMING</Label>
      <h1 className="hero-title relative mt-7 text-[clamp(2.5rem,8.2vw,6.25rem)] font-extrabold leading-[1.06] tracking-tight" data-r style={{ ['--d' as string]: '.08s' }}>
        <span className="block">I’m Designing</span>
        <span className="block">Interfaces</span>
        <span className="block">with</span>
        <em className="hero-em serif-accent mt-0.5 block text-[1.1em] leading-[1.05] tracking-wide text-pink">Personality.</em>
      </h1>

      <p className="relative mt-8 max-w-[520px] text-lg leading-relaxed text-muted" data-r style={{ ['--d' as string]: '.16s' }}>
        Hey, I’m elya, a junior web developer with a UI/UX design edge. I love turning ideas into thoughtful, playful digital experiences!
      </p>

      <p className="relative mt-6 flex items-center gap-3 font-mono text-sm text-soft" data-r style={{ ['--d' as string]: '.22s' }} aria-live="off">
        <span className="h-px w-8 bg-pink" aria-hidden />
        <span>Currently:</span>
        <span key={role.value} className="role font-medium text-fg">{role.value}</span>
      </p>

      <div className="relative mt-10 flex flex-wrap items-center justify-between gap-8" data-r style={{ ['--d' as string]: '.28s' }}>
        <div className="flex flex-wrap gap-4">
          <a href="#projects" className="btn btn-light">Explore my work <Arrow className="w-6" /></a>
          <a href="#contact" className="btn btn-ghost">Let’s Talk</a>
        </div>
        {socials.length > 0 && (
          <ul className="flex items-center gap-6">
            {socials.map(([key, url]) => {
              const Icon = socialIcons[key]
              return (
                <li key={key}>
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={key} className="block text-soft transition hover:-translate-y-1 hover:scale-110 hover:text-fg">
                    <Icon className="size-7" />
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
