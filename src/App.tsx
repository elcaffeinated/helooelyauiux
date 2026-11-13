import { useState } from 'react'
import About from './components/About'
import Banner from './components/Banner'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Resume from './components/Resume'
import Projects from './components/Projects'
import Services from './components/Services'
import Toolkit from './components/Toolkit'
import { navLinks, type Filter } from './data'
import { useReveal, useScrollState, useSpotlight, useTheme } from './hooks'

const ids = navLinks.map((l) => l.id)

export default function App() {
  useReveal()
  useSpotlight()
  const { active, scrolled, progress, past } = useScrollState(ids)
  const { light, toggle } = useTheme()
  const [filter, setFilter] = useState<Filter>('all')

  return (
    <>
      <a href="#main" className="fixed left-4 top-[-64px] z-[200] rounded-lg bg-white px-4 py-2.5 font-mono text-sm text-black focus:top-3">Skip to content</a>
      <Nav active={active} scrolled={scrolled} progress={progress} light={light} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <Marquee />
        <Banner />
        <About />
        <Services onPick={setFilter} />
        <Projects filter={filter} onFilter={setFilter} />
        <Toolkit />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <a
        href="#contact"
        className={`fixed bottom-4 right-4 z-[45] inline-flex h-[52px] items-center rounded-full bg-btn px-6 font-semibold text-btn-fg shadow-[0_6px_20px_#00000080] transition-all duration-300 md:hidden ${past && active !== 'contact' ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'}`}
      >
        Let’s talk
      </a>
    </>
  )
}
