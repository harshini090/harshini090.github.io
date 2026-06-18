import React from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothTouch: false }}>
      <CustomCursor />
      <ScrollProgress />
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
      </div>

      <main className="relative z-10 w-full flex flex-col items-center selection:bg-accent selection:text-white">
        {/* Classy Logo */}
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
          className="fixed top-6 left-6 md:top-10 md:left-10 z-50 group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-zinc-800 bg-[#0a0a0a]/50 backdrop-blur-md hover:border-zinc-500 hover:bg-white/5 transition-all duration-500 magnetic"
        >
          <span className="font-serif text-xs md:text-sm tracking-[0.2em] font-light text-zinc-300 group-hover:text-white transition-colors ml-[0.2em]">
            HCK
          </span>
        </a>

        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </ReactLenis>
  );
}

export default App;
