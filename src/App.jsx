import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Globe from 'react-globe.gl';

const SpotlightCard = ({ title, desc, icon }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--x', `${x}px`);
    divRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="glow-card border border-[#00f3ff]/10 bg-[#0a0a0a]/80 backdrop-blur-sm p-6 flex flex-col gap-4 cursor-crosshair h-full"
    >
      <div className="text-[#00f3ff] mb-2">{icon}</div>
      <h3 className="text-zinc-200 font-bold tracking-widest text-sm uppercase">{title}</h3>
      <p className="text-zinc-400 text-sm font-mono leading-relaxed">{desc}</p>
    </motion.div>
  );
};

function App() {
  const [arcsData, setArcsData] = useState([]);
  const globeEl = useRef();
  const globalSpotlightRef = useRef(null);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (globalSpotlightRef.current) {
        globalSpotlightRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        globalSpotlightRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
        globalSpotlightRef.current.style.setProperty('--mouse-opacity', '1');
      }
    };
    
    const handleMouseLeave = () => {
      if (globalSpotlightRef.current) {
        globalSpotlightRef.current.style.setProperty('--mouse-opacity', '0');
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    const numArcs = 20;
    const aData = [...Array(numArcs).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: ['#00f3ff', '#00aaff', '#0077ff'][Math.floor(Math.random() * 3)]
    }));
    setArcsData(aData);

    const timeout = setTimeout(() => {
      if (globeEl.current) {
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.5;
        globeEl.current.controls().enableZoom = false;
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-[#00f3ff] selection:text-black pb-32">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 border-b border-[#00f3ff]/10 bg-[#050505]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#00f3ff] animate-pulse"></div>
          <span className="font-bold tracking-widest text-sm text-zinc-100">SHIRSHAK</span>
        </div>
        <div className="flex gap-8 text-xs font-mono text-zinc-400 hidden md:flex">
          <a href="#about" className="hover:text-[#00f3ff] transition-colors">ABOUT</a>
          <a href="#certs" className="hover:text-[#00f3ff] transition-colors">CERTIFICATIONS</a>
          <a href="#arsenal" className="hover:text-[#00f3ff] transition-colors">ARSENAL</a>
          <a href="#blogs" className="hover:text-[#00f3ff] transition-colors">BLOGS</a>
        </div>
        <a href="https://github.com/Shirshakhtml" target="_blank" rel="noopener noreferrer" className="inline-block border border-[#00f3ff] px-4 py-2 text-xs font-mono text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-colors">
          GITHUB
        </a>
      </nav>

      {/* Global Mouse Spotlight */}
      <div 
        ref={globalSpotlightRef}
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: 'var(--mouse-opacity, 0)',
          background: 'radial-gradient(600px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(0, 243, 255, 0.15), transparent 40%)'
        }}
      />

      {/* 3D Globe Background */}
      <div className="fixed right-0 top-0 w-full h-full pointer-events-none opacity-30 translate-x-1/4 translate-y-1/4 z-0">
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
          arcsData={arcsData}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={1500}
          backgroundColor="rgba(0,0,0,0)"
          width={1000}
          height={1000}
        />
      </div>

      {/* Hero Content */}
      <main id="about" className="relative z-10 w-full px-6 md:px-12 lg:px-24 pt-40 md:pt-60 min-h-screen flex flex-col justify-center pb-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl lg:max-w-3xl"
        >
          <p className="text-[#00ff41] font-mono text-sm mb-4 tracking-widest">// OFFENSIVE_SECURITY_ENGINEER</p>
          <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-zinc-100">
            SHIRSHAK<br/>ROY
          </h1>
          
          <p className="text-zinc-400 font-mono text-base md:text-lg max-w-xl mb-12 uppercase leading-relaxed border-l-2 border-[#00f3ff] pl-4">
            I BREAK INTO SYSTEMS <span className="text-[#00ff41] font-bold underline">ETHICALLY</span> SO OTHERS CAN SLEEP SOUNDLY. PENETRATION TESTER & SECURITY RESEARCHER FORTIFYING DEFENSES.
          </p>

          <div className="flex gap-4">
            <a href="#arsenal" className="inline-block bg-[#00f3ff] text-black font-bold px-6 py-3 text-xs tracking-widest hover:bg-[#00c8ff] transition-colors shadow-[0_0_15px_rgba(0,243,255,0.4)]">
              VIEW ARSENAL
            </a>
            <a href="https://www.linkedin.com/in/shirshak-pentester/" target="_blank" rel="noopener noreferrer" className="inline-block border border-[#00f3ff] text-[#00f3ff] px-6 py-3 text-xs font-mono hover:bg-[#00f3ff]/10 transition-colors">
              LINKEDIN
            </a>
          </div>
        </motion.div>
      </main>

      {/* Certifications Section */}
      <section id="certs" className="relative z-10 container mx-auto px-6 pt-32">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black tracking-widest text-[#00f3ff] mb-2">CERTIFICATIONS</h2>
          <div className="w-16 h-1 bg-[#00f3ff]"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpotlightCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
            title="CRTE"
            desc="Certified Red Team Expert. Advanced Active Directory exploitation and defense bypass."
          />
          <SpotlightCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12l5.25 5 2.625-3M8.25 17L12.5 12l2.25-3M16 7l5-5"/></svg>}
            title="CRTP"
            desc="Certified Red Team Professional. Identifying and exploiting AD vulnerabilities."
          />
          <SpotlightCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>}
            title="PNPT"
            desc="Practical Network Penetration Tester. Full-scale external/internal network assessments."
          />
        </div>
      </section>

      {/* Arsenal / Tools Section */}
      <section id="arsenal" className="relative z-10 container mx-auto px-6 pt-40">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black tracking-widest text-[#00f3ff] mb-2">ARSENAL</h2>
          <p className="text-[#00ff41]/80 font-mono text-xs uppercase mb-4">// Custom Scripts & Tools</p>
          <div className="w-16 h-1 bg-[#00f3ff]"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpotlightCard 
            icon={<span className="font-mono font-bold text-lg">SubDom</span>}
            title="Subdomain Enumeration"
            desc="An all-in-one shell script for robust subdomain enumeration and discovery."
          />
          <SpotlightCard 
            icon={<span className="font-mono font-bold text-lg">SMBEnum</span>}
            title="Python Assessment Tool"
            desc="Advanced Server Message Block (SMB) enumeration and vulnerability assessment tool."
          />
          <SpotlightCard 
            icon={<span className="font-mono font-bold text-lg">JSAnalyser</span>}
            title="JavaScript Analyzer"
            desc="Python utility designed for deep security analysis of client-side JavaScript files."
          />
          <SpotlightCard 
            icon={<span className="font-mono font-bold text-lg">Passgen</span>}
            title="Secure Gen"
            desc="Cryptographically strong password generator script developed in Python."
          />
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="relative z-10 container mx-auto px-6 pt-40 pb-20">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black tracking-widest text-[#00f3ff] mb-2">BLOGS & RESEARCH</h2>
          <p className="text-[#00ff41]/80 font-mono text-xs uppercase mb-4">// CTF Writeups & Vulnerability Disclosures</p>
          <div className="w-16 h-1 bg-[#00f3ff]"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpotlightCard 
            icon={<svg className="animate-pulse" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>}
            title="[ ENCRYPTED_ARCHIVE ]"
            desc="Technical writeups, CTF walkthroughs, and vulnerability disclosures are currently being compiled. Decryption sequence initiated... ETA: Soon."
          />
        </div>
      </section>

    </div>
  );
}

export default App;
