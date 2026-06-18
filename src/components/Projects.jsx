import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse relative to the card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    // Multiply by max rotation degree
    setRotateX(yPct * -12); // Negative so tilting "follows" cursor naturally
    setRotateY(xPct * 12);
    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setMousePos({ x: -1000, y: -1000 });
  };

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-3xl border border-zinc-800/60 bg-[#0c0c0c] overflow-hidden group hover:border-zinc-700/80 transition-colors duration-300 ${className}`}
      onMouseMove={isTouch ? undefined : handleMouseMove}
      onMouseLeave={isTouch ? undefined : handleMouseLeave}
      animate={{ rotateX: isTouch ? 0 : rotateX, rotateY: isTouch ? 0 : rotateY }}
      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    >
      {/* Spotlight Effect */}
      {!isTouch && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.12), transparent 40%)` }}
        />
      )}
      
      {/* Content wrapper with internal layout and subtle shift on hover */}
      <div 
        className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col justify-between group-hover:bg-[#6366f1]/[0.015] transition-colors duration-500"
        style={{ transform: "translateZ(30px)" }} // Pushes content "out"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const projects = [
    {
      title: "ClaimSense",
      description: "AI-powered insurance claims processing platform with NLP document parsing and multi-tenant architecture. Built with async task queues and Celery workers to handle heavy workloads.",
      tags: ["FastAPI", "Python", "Docker", "Redis", "Celery"],
      link: "https://github.com/harshini090/ClaimSense",
      bentoSpan: "col-span-1 md:col-span-2 row-span-2",
      mediaUrl: "https://raw.githubusercontent.com/harshini090/ClaimSense/main/assets/demo.webp"
    },
    {
      title: "Content Analytics",
      description: "Interactive data viz dashboard transforming complex metrics across 15+ regions intelligently.",
      tags: ["React", "Recharts", "Vite"],
      link: "https://content-performance-dashboard-mu.vercel.app/",
      bentoSpan: "col-span-1 md:col-span-1 row-span-1",
    },
    {
      title: "Tic Tac Toe AI",
      description: "Minimax algorithm opponent built purely in memory to explore LLM-assisted game dev.",
      tags: ["Vanilla JS", "Prompt Engineering"],
      link: "https://tic-tac-toe-ai--harshinichowda4.replit.app/",
      bentoSpan: "col-span-1 md:col-span-1 row-span-1",
      mediaUrl: "/demos/tic-tac-toe.mov"
    },
    {
      title: "Solstice Framework",
      description: "Front-end UI redesign and interactive HTML resources for the UC Nursing online resource platform.",
      tags: ["HTML/CSS", "JavaScript", "UI/UX"],
      link: "https://github.com/harshini090/Solsticeguide",
      bentoSpan: "col-span-1 md:col-span-1 row-span-1",
      mediaUrl: "/demos/solstice.mov"
    },
    {
      title: "CBT Simulation",
      description: "State-of-the-art interactive web simulation of a Cognitive Behavioral Therapy session featuring dynamic AI avatars and non-linear branching dialogue.",
      tags: ["Vanilla JS", "CSS3", "Web Speech API"],
      link: "https://github.com/harshini090/CBTsimulatiom",
      bentoSpan: "col-span-1 md:col-span-2 row-span-2",
      mediaUrl: "/demos/CBT.mov"
    },
    {
      title: "Real Estate System",
      description: "Enterprise-grade RESTful platform processing 1000+ daily transactions with admin analytics.",
      tags: ["Django", "PostgreSQL", "REST APIs"],
      link: "https://github.com/harshini090/MYHackathon",
      bentoSpan: "col-span-1 md:col-span-1 row-span-1",
    }
  ];

  return (
    <section className="py-32 w-full max-w-7xl px-6 md:px-12 mx-auto" id="work">
      <div className="mb-20">
        <h2 className="text-xs md:text-sm font-mono text-accent mb-4 uppercase tracking-[0.2em] font-medium">03. Selected Work</h2>
        <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white max-w-2xl">Things I've built that scale and inspire.</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
        {projects.map((project, idx) => (
          <TiltCard key={idx} className={project.bentoSpan}>
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <span className="text-zinc-500 font-mono text-sm leading-none">{`0${idx + 1}`}</span>
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="magnetic group/link w-12 h-12 rounded-full border border-zinc-800 bg-[#0a0a0a] flex items-center justify-center hover:bg-zinc-800 transition-colors pointer-events-auto shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-zinc-400 group-hover/link:text-white group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-all">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              
              <h4 className="text-2xl font-medium text-white mb-4 tracking-tight">{project.title}</h4>
              <p className="text-zinc-400 leading-relaxed max-w-lg mb-6">{project.description}</p>
              
              {project.mediaUrl && (
                <div className="w-full relative rounded-lg overflow-hidden border border-zinc-800/80 mb-6 group-hover:border-accent/30 transition-colors pointer-events-none">
                  {project.mediaUrl.endsWith('.mov') || project.mediaUrl.endsWith('.mp4') ? (
                    <video 
                      src={project.mediaUrl} 
                      className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                    />
                  ) : (
                    <img src={project.mediaUrl} alt={`${project.title} Demo`} className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-80 pointer-events-none"></div>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
