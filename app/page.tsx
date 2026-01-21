import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import ProjectSlider from '@/components/ui/ProjectSlider'
import Skills from '@/components/sections/Skills'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="w-full relative min-h-screen bg-[#0a0a0a]">
      <Header />
      <Hero />
      <div className="relative z-20">
        <ProjectSlider />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </div>
    </main>
  )
}
