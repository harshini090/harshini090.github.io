import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative mr-2 md:mr-3 mt-1 inline-block">
      <motion.span style={{ opacity }} className="text-zinc-100">
        {children}
      </motion.span>
    </span>
  );
};

export default function About() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end center"]
  });

  const bio = "I build infrastructure that scales and interfaces that inspire. As a software engineer obsessed with the intersection of cloud architecture and frontend performance, I write code that doesn't just work—it executes with precision. I blur the line between deep system design and meticulous UI craft.";
  const words = bio.split(" ");

  return (
    <section ref={containerRef} className="py-32 md:py-56 w-full max-w-7xl px-6 md:px-12 mx-auto flex flex-col items-start justify-center" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 w-full">
        
        {/* Left Column: Scroll Word Reveal */}
        <div className="flex flex-col justify-center">
          <h2 className="text-xs md:text-sm font-mono text-accent mb-8 uppercase tracking-[0.2em] font-medium">01. About</h2>
          <p className="text-2xl md:text-4xl lg:text-[42px] font-medium leading-[1.3] tracking-tight text-white flex flex-wrap">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
            })}
          </p>
        </div>

        {/* Right Column: Terminal Stats */}
        <motion.div 
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs md:text-sm">
            <div className="flex items-center px-4 py-3 border-b border-zinc-800 bg-[#111111]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
              </div>
              <p className="ml-4 text-zinc-500">guest@harshini-dev ~</p>
            </div>
            <div className="p-6 md:p-8 text-zinc-300 space-y-5">
              <div>
                <span className="text-accent">❯</span> <span className="text-zinc-100">whoami</span>
                <p className="mt-2 text-zinc-400">Harshini Chowdary Kilari</p>
              </div>
              <div>
                <span className="text-accent">❯</span> <span className="text-zinc-100">cat education.txt</span>
                <p className="mt-2 text-zinc-400">MS Computer Science, University of Cincinnati</p>
              </div>
              <div>
                <span className="text-accent">❯</span> <span className="text-zinc-100">aws --version</span>
                <p className="mt-2 text-zinc-400">AWS Certified Developer & Cloud Practitioner</p>
              </div>
              <div>
                <span className="text-accent">❯</span> <span className="text-zinc-100">echo $MISSION</span>
                <p className="mt-2 text-[#4ade80]">"Build robust backends and beautiful frontends."</p>
              </div>
              <div className="flex items-center">
                <span className="text-accent">❯</span> <span className="ml-2 inline-block w-2 h-4 bg-zinc-400 animate-pulse"></span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
