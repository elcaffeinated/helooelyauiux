import { useParallax } from '../hooks'

export default function Banner() {
  const bg = useParallax<HTMLDivElement>(-0.05, 48)
  return (
    <section
      data-r="scale"
      className="relative mx-auto mt-24 flex h-[480px] w-[94%] max-w-[1437px] flex-col justify-end overflow-hidden rounded-[26px] border border-violet/40 px-7 pb-12 shadow-[0_0_26px_#8b5cf6,inset_0_0_40px_#00000080] md:mt-32 md:h-[687px] md:px-[84px] md:pb-32"
    >
      <div ref={bg} className="absolute -inset-y-[8%] inset-x-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/web.webp)' }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden />
      <p className="acc-pink relative flex items-center gap-4 font-mono text-sm tracking-wider text-white/85 md:ml-10 md:text-base">
        <i className="dot" />
        SCROLL TO DISCOVER PROJECTS
      </p>
      <h2 className="relative mt-4 text-[clamp(2.4rem,7vw,5.9rem)] font-medium leading-[1.1] tracking-[-0.06em] text-[#f2f2f2]">
        Making the web feel
        <em className="serif-accent block text-[0.94em] leading-[1.1] tracking-[0.01em] text-[#c8a8ff] [text-shadow:0_0_30px_#8b5cf6cc]">Less ordinary.</em>
      </h2>
    </section>
  )
}
