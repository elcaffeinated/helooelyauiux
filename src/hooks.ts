import { useCallback, useEffect, useRef, useState } from 'react'

/** Toggles `.in` on every [data-r] element as it enters and leaves the viewport, so blocks
 *  animate in on the way down AND on the way back up. Children are tagged (data-k + --i)
 *  so they fade up one after another each time. */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const el = e.target as HTMLElement
          const tall = e.boundingClientRect.height > innerHeight * 0.8
          if (e.isIntersecting && (e.intersectionRatio >= 0.12 || tall)) {
            el.classList.add('in')
          } else if (!e.isIntersecting) {
            el.classList.remove('in')
            // remember which side it left from, so it re-enters from that side
            el.dataset.from = e.boundingClientRect.top < 0 ? 'top' : 'bottom'
          }
        }),
      { threshold: [0, 0.12], rootMargin: '0px 0px -3% 0px' },
    )
    const prep = (el: HTMLElement) => {
      if (el.dataset.rk) return
      el.dataset.rk = '1'
      let i = 0
      Array.from(el.children).forEach((c) => {
        const k = c as HTMLElement
        if (k.hasAttribute('data-r') || k.tagName === 'SCRIPT' || k.tagName === 'STYLE') return
        if (getComputedStyle(k).animationName !== 'none') return // keep elements that already have their own animation
        k.setAttribute('data-k', '')
        k.style.setProperty('--i', String(Math.min(i++, 8)))
      })
    }
    const scan = () =>
      document.querySelectorAll<HTMLElement>('[data-r]').forEach((el) => {
        if (el.dataset.ro) return
        el.dataset.ro = '1'
        prep(el)
        io.observe(el)
      })
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    // at the very bottom of the page, make sure anything on screen is revealed (e.g. the footer's last line)
    const atBottom = () => {
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4)
        document.querySelectorAll('[data-r]:not(.in)').forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.top < innerHeight && r.bottom > 0) el.classList.add('in')
        })
    }
    addEventListener('scroll', atBottom, { passive: true })
    return () => {
      io.disconnect()
      mo.disconnect()
      removeEventListener('scroll', atBottom)
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
