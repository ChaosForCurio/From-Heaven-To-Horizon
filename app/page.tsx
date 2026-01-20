import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import ProjectSlider from '@/components/ProjectSlider'
import Skills from '@/components/Skills'
import About from '@/components/About'
import Contact from '@/components/Contact'

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
