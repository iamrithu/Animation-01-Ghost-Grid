"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { 
  Droplets, 
  TrainFront, 
  Zap, 
  Factory, 
  Building2, 
  ArrowRight,
  MapPin,
  CornerRightDown
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

// --- TYPES ---
type SectionItem = {
  id: number;
  category: string;
  title: string;
  heading: string;
  desc: string;
  img: string;
  icon: React.ElementType;
  color: string;
};

// --- DATA ---
const SECTIONS: SectionItem[] = [
  {
    id: 1,
    category: "Hydrology",
    title: "Clean Water",
    heading: "Purification Systems",
    desc: "Advanced reservoirs ensuring a sustainable future.",
    img: "https://images.pexels.com/photos/2699258/pexels-photo-2699258.jpeg",
    icon: Droplets,
    color: "#06b6d4", // Cyan-500
  },
  {
    id: 2,
    category: "Transit",
    title: "Hyper Loop",
    heading: "Rapid Network",
    desc: "Next-generation high-speed rail networks.",
    img: "https://images.pexels.com/photos/258510/pexels-photo-258510.jpeg",
    icon: TrainFront,
    color: "#f59e0b", // Amber-500
  },
  {
    id: 3,
    category: "Energy",
    title: "Power Grid",
    heading: "High Voltage",
    desc: "Transmission infrastructure for extreme loads.",
    img: "https://images.pexels.com/photos/189524/pexels-photo-189524.jpeg",
    icon: Zap,
    color: "#8b5cf6", // Violet-500
  },
  {
    id: 4,
    category: "Industry",
    title: "Mega Factory",
    heading: "Production",
    desc: "Automated heavy-duty industrial framing.",
    img: "https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg",
    icon: Factory,
    color: "#10b981", // Emerald-500
  },
  {
    id: 5,
    category: "Urban",
    title: "City Scape",
    heading: "Architecture",
    desc: "Foundations bridging design and durability.",
    img: "https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg",
    icon: Building2,
    color: "#ec4899", // Pink-500
  },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef<number | null>(null);
  const totalPanels = SECTIONS.length;
  const [isLoaded, setIsLoaded] = useState(false);

  const { contextSafe } = useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true)
    });

    // 1. SETUP PANELS
    const panels = gsap.utils.toArray('.visual-panel');
    panels.forEach((panel: any, i) => {
      const width = 100 / totalPanels;
      const left = i * width;
      const right = 100 - (left + width);
      gsap.set(panel, { clipPath: `inset(0% ${right}% 0% ${left}%)`, zIndex: 1 });
    });

    // 2. INTRO SEQUENCE
    const counterObj = { val: 0 };
    const counterEl = document.getElementById("loader-counter");
    
    tl.to(counterObj, {
        val: 100, duration: 1.5, ease: "power2.out",
        onUpdate: () => { if(counterEl) counterEl.innerText = Math.floor(counterObj.val).toString(); }
    });
    
    tl.to('.loader-top', { yPercent: -100, duration: 1.2, ease: "power4.inOut" }, "-=0.3");
    tl.to('.loader-bottom', { yPercent: 100, duration: 1.2, ease: "power4.inOut" }, "<");
    tl.to('#main-content', { opacity: 1, duration: 1, delay: 0.2 }, "-=0.8");
    tl.from('.nav-container', { yPercent: 100, opacity:0, duration: 1, ease: "power3.out" }, "-=0.6");

  }, { scope: containerRef });


  // --- CINEMATIC HOVER LOGIC ---
  const handleHover = contextSafe((activeIndex: number) => {
    if (!isLoaded) return; 
    if (activeIndexRef.current === activeIndex) return;
    
    activeIndexRef.current = activeIndex;
    const activeColor = SECTIONS[activeIndex].color;

    // 1. Hide Center Title (Slower fade)
    gsap.to('#main-content', { opacity: 0, scale: 0.95, duration: 0.6, overwrite: true });

    // 2. Update Nav UI (Refined timing)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((nav, i) => {
      const borderTop = nav.querySelector('.nav-border');
      const lightBeam = nav.querySelector('.nav-beam');
      const title = nav.querySelector('.nav-title');
      const category = nav.querySelector('.nav-category');
      const icon = nav.querySelector('.nav-icon');
      const iconBox = nav.querySelector('.nav-icon-box');
      const ctaContainer = nav.querySelector('.nav-cta-container');
      const ctaBtn = nav.querySelector('.nav-cta-btn');
      const number = nav.querySelector('.nav-number');

      if (i === activeIndex) {
        // --- ACTIVE STATE ---
        
        // Border: Fill and Glow
        gsap.to(borderTop, { 
            width: '100%', 
            backgroundColor: activeColor, 
            height: '4px', 
            boxShadow: `0 0 20px ${activeColor}`,
            duration: 0.6, 
            ease: "expo.out",
            overwrite: true 
        });
        
        // Light Beam: Shoot up
        gsap.to(lightBeam, { 
            opacity: 1, 
            height: '100%',
            background: `linear-gradient(to top, ${activeColor}20, transparent)`, 
            duration: 0.8, 
            ease: "power2.out",
            overwrite: true 
        });

        // Icon Box: Colorize & Scale
        gsap.to(iconBox, { 
            backgroundColor: `${activeColor}20`, 
            borderColor: activeColor,
            duration: 0.5,
            overwrite: true
        });
        gsap.to(icon, { color: activeColor, scale: 1.1, duration: 0.5, overwrite: true });

        // Text: Lift & Highlight
        gsap.to(category, { color: activeColor, opacity: 1, duration: 0.4, overwrite: true });
        gsap.to(title, { y: -4, color: '#FFFFFF', duration: 0.5, overwrite: true });
        
        // Number: Fade out slightly/Shift
        gsap.to(number, { opacity: 0.1, x: 20, duration: 0.6, overwrite: true });

        // CTA: Spring Up
        gsap.to(ctaContainer, { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: "elastic.out(1, 0.7)", // Bouncy effect
            overwrite: true 
        });
        
        // Button Styling
        if(ctaBtn) {
            gsap.to(ctaBtn, { 
                backgroundColor: activeColor, 
                boxShadow: `0 10px 30px -5px ${activeColor}66`,
                color: '#000000',
                duration: 0.4
            });
        }

      } else {
        // --- INACTIVE STATE ---
        
        // Border: Reset
        gsap.to(borderTop, { width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', height: '1px', boxShadow: 'none', duration: 0.6, overwrite: true });
        
        // Light Beam: Reset
        gsap.to(lightBeam, { opacity: 0, height: '0%', duration: 0.6, overwrite: true });

        // Icon Box: Reset
        gsap.to(iconBox, { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.1)', duration: 0.5, overwrite: true });
        gsap.to(icon, { color: '#71717a', scale: 1, duration: 0.5, overwrite: true });

        // Text: Reset
        gsap.to(category, { color: '#71717a', opacity: 0.7, duration: 0.4, overwrite: true });
        gsap.to(title, { y: 0, color: '#a1a1aa', duration: 0.5, overwrite: true });
        
        // Number: Reset
        gsap.to(number, { opacity: 0.15, x: 0, duration: 0.6, overwrite: true });

        // CTA: Hide
        gsap.to(ctaContainer, { y: 25, opacity: 0, duration: 0.4, overwrite: true });
      }
    });

    // 3. SLOWER PANEL ANIMATION
    const panels = gsap.utils.toArray('.visual-panel');
    panels.forEach((panel: any, i) => {
      const content = panel.querySelector('.panel-content');
      const img = panel.querySelector('img');

      if (i === activeIndex) {
        gsap.set(panel, { zIndex: 10 }); 
        
        // Slower duration: 1.25s
        gsap.to(panel, { 
            clipPath: 'inset(0% 0% 0% 0%)', 
            duration: 1.25, 
            ease: "power4.inOut", // Cinematic ease
            overwrite: 'auto' 
        });
        
        // Content delays to let panel open first
        gsap.to(content, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out", overwrite: true });
        gsap.to(img, { scale: 1.1, opacity: 1, duration: 1.5, ease: "power2.out", overwrite: true });
      
      } else {
        const width = 100 / totalPanels;
        const left = i * width;
        const right = 100 - (left + width);
        gsap.set(panel, { zIndex: 1 });
        
        gsap.to(panel, { 
            clipPath: `inset(0% ${right}% 0% ${left}%)`, 
            duration: 1.25, 
            ease: "power4.inOut", 
            overwrite: 'auto' 
        });
        
        gsap.to(content, { opacity: 0, y: 30, duration: 0.4, overwrite: true });
        gsap.to(img, { scale: 1, opacity: 0.5, duration: 0.8, overwrite: true });
      }
    });
  });

  const handleLeave = contextSafe(() => {
    if (!isLoaded) return;
    activeIndexRef.current = null;

    // Reset Nav
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
      gsap.to(nav.querySelector('.nav-border'), { width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', height: '1px', boxShadow: 'none', duration: 0.6, overwrite: true });
      gsap.to(nav.querySelector('.nav-beam'), { opacity: 0, height: '0%', duration: 0.6, overwrite: true });
      gsap.to(nav.querySelector('.nav-icon-box'), { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.1)', duration: 0.5, overwrite: true });
      gsap.to(nav.querySelector('.nav-icon'), { color: '#71717a', scale: 1, duration: 0.5, overwrite: true });
      gsap.to(nav.querySelector('.nav-category'), { color: '#71717a', opacity: 0.7, duration: 0.4, overwrite: true });
      gsap.to(nav.querySelector('.nav-title'), { y: 0, color: '#a1a1aa', duration: 0.5, overwrite: true });
      gsap.to(nav.querySelector('.nav-number'), { opacity: 0.15, x: 0, duration: 0.6, overwrite: true });
      gsap.to(nav.querySelector('.nav-cta-container'), { y: 25, opacity: 0, duration: 0.4, overwrite: true });
    });

    // Reset Panels (Slower)
    const panels = gsap.utils.toArray('.visual-panel');
    panels.forEach((panel: any, i) => {
      const width = 100 / totalPanels;
      const left = i * width;
      const right = 100 - (left + width);
      gsap.set(panel, { zIndex: 1 });
      
      gsap.to(panel, { 
        clipPath: `inset(0% ${right}% 0% ${left}%)`, 
        duration: 1.2, 
        ease: "power4.inOut", 
        overwrite: true 
      });
      
      gsap.to(panel.querySelector('.panel-content'), { opacity: 0, y: 30, duration: 0.4, overwrite: true });
      gsap.to(panel.querySelector('img'), { scale: 1, opacity: 0.8, duration: 1.2, overwrite: true });
    });

    // Show Main Title
    gsap.to('#main-content', { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, overwrite: true });
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-zinc-950 text-white font-sans"
    >
      {/* LOADER */}
      <div className="loader-top fixed top-0 left-0 w-full h-[50vh] bg-zinc-950 z-[100] border-b border-white/10 flex items-end justify-center pb-8">
         <div className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">System Boot</div>
      </div>
      <div className="loader-bottom fixed bottom-0 left-0 w-full h-[50vh] bg-zinc-950 z-[100] border-t border-white/10 flex items-start justify-center pt-8">
         <span id="loader-counter" className="text-[8rem] leading-none font-oswald font-black text-zinc-800">0</span>
      </div>

      {/* PANELS */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {SECTIONS.map((info) => (
            <div key={info.id} className="visual-panel absolute inset-0 w-full h-full bg-zinc-900 will-change-[clip-path]">
              <Image src={info.img} alt={info.title} fill className="opacity-50 object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="panel-content absolute inset-0 flex flex-col justify-center items-start px-12 md:px-32 opacity-0 translate-y-10 z-20 pointer-events-auto">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="h-[1px] w-12 bg-white/30"></div>
                    <span className="text-sm font-mono tracking-widest uppercase text-white/80" style={{ color: info.color }}>
                        Sector 0{info.id} // Online
                    </span>
                 </div>
                 
                 <h2 className="font-oswald text-6xl md:text-[8rem] font-bold uppercase leading-[0.9] mb-6 text-white drop-shadow-2xl">
                  {info.heading}
                 </h2>
                 
                 <p className="text-xl text-zinc-300 max-w-lg leading-relaxed font-light pl-6 border-l-4" style={{ borderColor: info.color }}>
                  {info.desc}
                 </p>
              </div>
            </div>
        ))}
      </div>

      {/* MAIN TITLE (Static) */}
      <div id="main-content" className="absolute inset-0 z-20 flex flex-col justify-center items-center pointer-events-none text-center pb-32">
        <h4 className="text-zinc-500 tracking-[0.6em] font-bold uppercase mb-6 text-xs animate-pulse">Select Division</h4>
        <h1 className="font-oswald text-7xl md:text-[10rem] font-bold uppercase leading-[0.8] text-white mix-blend-overlay opacity-80">
          Global <br/> Scale
        </h1>
      </div>

      {/* --- FANCY HOLOGRAPHIC BOTTOM NAV --- */}
      <div id="bottom-nav" className="nav-container absolute bottom-0 left-0 w-full h-[180px] z-50">
        
        {/* Glass Base */}
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-2xl border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"></div>

        <div className="relative w-full h-full flex pointer-events-auto">
          {SECTIONS.map((info, index) => (
            <div
              key={info.id}
              className="nav-item flex-1 relative cursor-pointer group border-r border-white/5 last:border-0 overflow-hidden"
              onMouseEnter={() => handleHover(index)}
            >
                {/* 1. Interactive Light Beam (Holographic effect) */}
                <div className="nav-beam absolute bottom-0 left-0 w-full h-0 opacity-0 pointer-events-none" />

                {/* 2. Active Border Top (Glows) */}
                <div className="nav-border absolute top-0 left-0 w-full h-[1px] bg-white/5 shadow-none transition-all" />

                <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 md:px-10 pb-10">
                    
                    {/* Top Section: Icon & Category */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="nav-icon-box p-2 rounded-lg border border-white/10 bg-transparent transition-colors">
                            <info.icon className="nav-icon w-5 h-5 text-zinc-500 transition-transform" />
                        </div>
                        <span className="nav-category text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 opacity-70">
                            {info.category}
                        </span>
                    </div>

                    {/* Middle: Big Title */}
                    <div className="relative mb-2">
                        <h3 className="nav-title font-oswald text-3xl md:text-4xl font-bold uppercase text-zinc-400 transition-colors">
                            {info.title}
                        </h3>
                    </div>

                    {/* Bottom: CTA Button (Hidden by default) */}
                    <div className="nav-cta-container absolute bottom-10 right-10 opacity-0 translate-y-6">
                        <button className="nav-cta-btn flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                            Explore
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Decorative Big Number (Background) */}
                    <div className="nav-number absolute top-6 right-6 pointer-events-none opacity-[0.15] transition-transform">
                        <span className="text-[5rem] leading-none font-oswald font-black text-white select-none">0{info.id}</span>
                    </div>

                </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTION LAYER */}
      <div id="interaction-layer" onMouseLeave={handleLeave} className="absolute inset-0 w-full h-full z-40 flex flex-col">
        <div className="flex-1 w-full flex">
            {SECTIONS.map((info, index) => (
                <div key={info.id} className="flex-1 h-full cursor-pointer" onMouseEnter={() => handleHover(index)} />
            ))}
        </div>
        <div className="h-[180px] w-full pointer-events-none" />
      </div>

    </section>
  );
};

export default HeroSection;