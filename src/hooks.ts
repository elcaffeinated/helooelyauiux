import { useCallback, useEffect, useRef, useState } from 'react'

/** Adds `.in` to every [data-r] element as it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    const scan = () => document.querySelectorAll('[data-r]:not(.in)').forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

/** Writes pointer position into --mx/--my on the nearest `.spot` element. */
export function useSpotlight() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest?.('.spot') as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', move, { passive: true })
    return () => document.removeEventListener('pointermove', move)
  }, [])
}

/** Active section, nav "scrolled" state and page scroll progress (0..1). */
export function useScrollState(ids: string[]) {
  const [state, setState] = useState({ active: ids[0], scrolled: false, progress: 0, past: false })
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      let active = ids[0]
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < innerHeight * 0.4) active = id
      })
      const max = document.documentElement.scrollHeight - innerHeight
      if (max > 0 && scrollY >= max - 4) active = ids[ids.length - 1]
      setState({ active, scrolled: scrollY > 40, progress: max > 0 ? Math.min(1, scrollY / max) : 0, past: scrollY > 600 })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    update()
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ids.join('|')])
  return state
}

/** Translates an element on scroll relative to the viewport centre. */
export function useParallax<T extends HTMLElement>(factor: number, clamp?: number) {
  const ref = useRef<T>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const run = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      let y = (r.top + r.height / 2 - innerHeight / 2) * factor
      if (clamp) y = Math.max(-clamp, Math.min(clamp, y))
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run)
    }
    addEventListener('scroll', onScroll, { passive: true })
    run()
    return () => {
      removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [factor, clamp])
  return ref
}

export function useTheme() {
  const [light, setLight] = useState(() => document.documentElement.classList.contains('light'))
  useEffect(() => {
    document.documentElement.classList.toggle('light', light)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f8f6fc' : '#000000')
    try {
      localStorage.setItem('theme', light ? 'light' : 'dark')
    } catch {
      /* storage unavailable */
    }
  }, [light])
  const toggle = useCallback(() => setLight((v) => !v), [])
  return { light, toggle }
}

/** Cycles through a list of strings on an interval. */
export function useCycle(items: string[], ms = 2400) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), ms)
    return () => clearInterval(t)
  }, [items.length, ms])
  return { index: i, value: items[i] }
}
