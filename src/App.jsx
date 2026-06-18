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
