import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Orb moves inverse to mouse (parallax)
  const orbX = useTransform(smoothX, [-1, 1], [-80, 80]);
  const orbY = useTransform(smoothY, [-1, 1], [-80, 80]);

  const name = "Harshini Chowdary Kilari";
  const words = name.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      transition: { type: 'spring', damping: 22, stiffness: 120 } 
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6" id="hero">
      
      {/* Interactive Glowing Orb */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-accent/20 rounded-full blur-[100px] md:blur-[160px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ x: orbX, y: orbY }}
      />

      <div className="z-10 flex flex-col items-center text-center max-w-6xl mt-[-5vh]">
        <motion.div
           className="overflow-visible mb-6"
           variants={containerVariants}
           initial="hidden"
           animate="visible"
        >
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2 perspective-1000">
            {words.map((word, index) => (
              <motion.span 
                key={index} 
                className="block text-[clamp(48px,8vw,120px)] font-semibold tracking-tighter leading-[0.9] text-white"
                variants={childVariants}
                style={{ transformStyle: "preserve-3d" }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono text-zinc-400 text-sm md:text-lg mb-12 tracking-wider uppercase">
            &lt; Software Engineer / Cloud / AI &gt;
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <a href="#work" className="magnetic px-8 py-4 bg-accent text-white font-medium rounded-sm hover:scale-105 active:scale-95 transition-all">
            View Work
          </a>
          <a href="/HARSHINIUC_.pdf" target="_blank" className="magnetic px-8 py-4 bg-transparent text-zinc-300 font-medium rounded-sm border border-zinc-700 hover:border-zinc-300 hover:text-white transition-colors">
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
