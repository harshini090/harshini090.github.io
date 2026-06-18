import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function Experience() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end center"]
  });

  const experiences = [
    {
      role: "Classroom Technology & Programming Assistant",
      company: "University of Cincinnati",
      date: "May 2026 — Present",
      description: "Lead the user interface (UI) redesign and deployment of the UC Nursing online resource platform, enhancing digital layouts, navigation hierarchy, and overall accessibility. Collaborate with Instructional Design team to engineer, prototype, and program interactive HTML resources."
    },
    {
      role: "Classroom Technology Assistant",
      company: "University of Cincinnati",
      date: "Nov 2025 — May 2026",
      description: "Delivered Tier II technical, hardware, network, and AV support for 20+ classrooms via Zendesk and remote diagnostics. Assisted in physical tech updates and setup, collaborating closely with faculty and staff."
    },
    {
      role: "Cloud Infrastructure Intern",
      company: "Find Me LLC · Remote",
      date: "Dec 2025 — Mar 2026",
      description: "Architected AWS backend infrastructure using CloudFormation, EC2, and S3, boosting CRM system reliability and cutting deployment time by 30%. Authored cross-functional API documentation using Git."
    },
    {
      role: "Graduate Assistant, IT Support",
      company: "University of Cincinnati",
      date: "Dec 2024 — Oct 2025",
      description: "Resolved technical incidents for 100+ endpoints via ServiceNow, overseeing ticket lifecycles and technical escalations. Administered Active Directory accounts and utilized MDT/SCCM for automated system imaging."
    },
    {
      role: "Research Assistant, Data Engineering",
      company: "KL University",
      date: "Jun 2023 — May 2024",
      description: "Built Python data validation ETL pipelines with Pandas processing over 10,000+ records, decreasing preparation times by 35%. Developed interactive reporting scripts using Python data libraries."
    }
  ];

  return (
    <section className="py-32 w-full max-w-4xl px-6 md:px-12 mx-auto" id="experience">
      <div className="mb-20 text-center">
        <h2 className="text-xs md:text-sm font-mono text-accent mb-4 uppercase tracking-[0.2em] font-medium">04. Experience</h2>
        <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white">Professional Journey</h3>
      </div>

      <div className="relative" ref={containerRef}>
        
        {/* The Animated SVG Timeline Line */}
        <svg className="absolute left-[13px] md:left-[21px] top-0 h-full w-[2px] bg-zinc-900 rounded-full" preserveAspectRatio="none">
          <motion.line 
            x1="0" y1="0" x2="0" y2="100%" 
            stroke="#6366f1" 
            strokeWidth="4"
            className="origin-top"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

        <div className="space-y-16 pl-12 md:pl-20">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx} 
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[45px] md:-left-[68px] top-[6px] w-[9px] h-[9px] md:w-[13px] md:h-[13px] rounded-full bg-[#0a0a0a] border-2 border-accent z-10 shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2">
                <h4 className="text-xl md:text-2xl font-medium text-white tracking-tight">{exp.role}</h4>
                <span className="font-mono text-xs md:text-sm text-zinc-500 tracking-wider whitespace-nowrap">{exp.date}</span>
              </div>
              <p className="text-accent font-medium mb-4 text-sm md:text-base">{exp.company}</p>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-2xl">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
