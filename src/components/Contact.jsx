import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('harshinichowdarykilari@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 md:py-48 w-full max-w-4xl px-6 md:px-12 mx-auto flex flex-col items-center justify-center text-center" id="contact">
      <motion.h2 
        className="text-sm font-mono text-accent mb-6 uppercase tracking-[0.2em] font-medium"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        viewport={{ once: true }}
      >
        05. What's Next?
      </motion.h2>
      
      <motion.h3 
        className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-12"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        Let's build<br/>something.
      </motion.h3>

      <motion.div 
        className="relative mb-20"
        whileInView={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.95 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <button 
          onClick={copyEmail}
          className="magnetic group px-8 py-5 rounded-full border border-zinc-700 bg-[#111111] hover:border-accent hover:bg-[#151515] transition-all flex items-center gap-4"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-zinc-400 group-hover:text-accent transition-colors"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span className="font-mono text-sm md:text-base text-zinc-300 group-hover:text-white transition-colors">
            harshinichowdarykilari@gmail.com
          </span>
        </button>

        <AnimatePresence>
          {copied && (
            <motion.div 
              className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-accent text-white text-xs font-medium rounded-md shadow-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              Copied to clipboard!
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        className="flex gap-8 border-t border-zinc-900 w-full justify-center pt-16"
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
      >
        <a href="https://github.com/harshini090" target="_blank" rel="noreferrer" className="magnetic p-4 text-zinc-500 hover:text-white transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 19 1s-1.33-.42-4.38 2.5a15.46 15.46 0 0 0-8 0C3.33.58 2 1 2 1a5.07 5.07 0 0 0-.25 3.77A5.44 5.44 0 0 0 0 7.98c0 5.42 3.3 6.61 6.44 7a4.8 4.8 0 0 0-1 3.02v4"/><path d="M9 20a5 5 0 0 1-5-2"/></svg>
        </a>
        <a href="https://linkedin.com/in/harshinichowdarykilari" target="_blank" rel="noreferrer" className="magnetic p-4 text-zinc-500 hover:text-white transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </motion.div>
      
      <p className="mt-16 font-mono text-xs text-zinc-600">
        Designed & Built by Harshini Chowdary Kilari <br/>
        React.js · Framer Motion · TailwindCSS
      </p>
    </section>
  );
}
