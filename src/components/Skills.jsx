import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SKILLS = [
  { category: "Design & UI/UX", items: ["UI Design", "User-Centered Design", "Wireframing", "High-Fidelity Prototyping", "Front-end Optimization"] },
  { category: "CRM & Support", items: ["ServiceNow", "Active Directory", "Salesforce", "Endpoint Management", "Troubleshooting", "SCCM", "System Imaging"] },
  { category: "Development", items: ["Python", "JavaScript", "React", "Django", "HTML/CSS", "REST APIs", "AWS (EC2, S3)", "Docker", "Git"] },
  { category: "Documentation", items: ["Technical Writing", "Knowledge-Base Management", "SOP Creation", "Process Documentation"] }
];

export default function Skills() {
  return (
    <section className="py-32 w-full max-w-7xl px-6 md:px-12 mx-auto bg-background" id="skills">
      <div className="mb-20">
        <h2 className="text-xs md:text-sm font-mono text-zinc-500 uppercase tracking-[0.2em] font-medium mb-4">02. Arsenal</h2>
        <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white max-w-2xl">Tools & Technologies I use to build.</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {SKILLS.map((skillSet, idx) => (
          <div key={idx} className="flex flex-col">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100 mb-6 md:mb-8 opacity-90">
              {skillSet.category}
            </h3>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              {skillSet.items.map((item, i) => (
                <div 
                  key={i} 
                  className="px-4 py-2 md:px-6 md:py-3 rounded-full border border-zinc-800 bg-[#0c0c0c] text-zinc-300 font-mono text-sm md:text-base hover:bg-[#151515] hover:border-accent/50 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
