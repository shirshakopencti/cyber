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
      initial={{ opacity: 0, y: 30 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
      className="glow-card border border-[#00f3ff]/15 bg-[#0a0a0c]/85 backdrop-blur-md p-6 sm:p-7 rounded-lg flex flex-col gap-4 cursor-crosshair h-full hover:border-[#00f3ff]/40 transition-colors shadow-lg shadow-black/40"
    >
      <div className="text-[#00f3ff] mb-1">{icon}</div>
      <h3 className="text-zinc-100 font-bold tracking-widest text-sm uppercase">{title}</h3>
      <p className="text-zinc-400 text-xs sm:text-sm font-mono leading-relaxed">{desc}</p>
    </motion.div>
  );
};

function App() {
  const [arcsData, setArcsData] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  const globeEl = useRef();
  const globalSpotlightRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

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

    const numArcs = 24;
    const aData = [...Array(numArcs).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 160,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 160,
      endLng: (Math.random() - 0.5) * 360,
      color: ['#00f3ff', '#00ff41', '#0077ff'][Math.floor(Math.random() * 3)]
    }));
    setArcsData(aData);

    const timeout = setTimeout(() => {
      if (globeEl.current) {
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.6;
        globeEl.current.controls().enableZoom = false;
      }
    }, 800);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-[#00f3ff] selection:text-black pb-32">
      
      {/* Centered Fixed 3D Cyber Globe (Stays in center while scrolling) */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-30 z-0 overflow-hidden">
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
          arcsData={arcsData}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor="color"
          arcDashLength={0.45}
          arcDashGap={0.25}
          arcDashAnimateTime={1400}
          backgroundColor="rgba(0,0,0,0)"
          width={windowDimensions.width}
          height={windowDimensions.height}
        />
      </div>

      {/* Global Mouse Spotlight Background */}
      <div 
        ref={globalSpotlightRef}
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: 'var(--mouse-opacity, 0)',
          background: 'radial-gradient(600px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(0, 243, 255, 0.12), transparent 40%)'
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center z-50 border-b border-[#00f3ff]/10 bg-[#050505]/85 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#00f3ff] rounded-sm animate-pulse shadow-[0_0_8px_#00f3ff]"></div>
          <span className="font-bold tracking-widest text-xs sm:text-sm text-zinc-100">SHIRSHAK</span>
        </div>
        <div className="flex gap-4 sm:gap-8 text-[11px] sm:text-xs font-mono text-zinc-400 hidden md:flex">
          <a href="#about" className="hover:text-[#00f3ff] transition-colors">ABOUT</a>
          <a href="#certs" className="hover:text-[#00f3ff] transition-colors">CERTIFICATIONS</a>
          <a href="#arsenal" className="hover:text-[#00f3ff] transition-colors">ARSENAL</a>
          <a href="#blogs" className="hover:text-[#00f3ff] transition-colors">BLOGS</a>
        </div>
        <a 
          href="https://github.com/Shirshakhtml" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block border border-[#00f3ff]/60 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-colors rounded-sm shadow-[0_0_10px_rgba(0,243,255,0.15)]"
        >
          GITHUB
        </a>
      </nav>

      {/* Hero Section */}
      <main id="about" className="relative z-10 w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-32 sm:pt-44 min-h-screen flex flex-col justify-center pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="text-[#00ff41] font-mono text-xs sm:text-sm mb-3 sm:mb-4 tracking-widest">// OFFENSIVE_SECURITY_ENGINEER</p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-none tracking-tight mb-6 sm:mb-8 text-zinc-100 drop-shadow-md">
            SHIRSHAK<br/>ROY
          </h1>
          
          <p className="text-zinc-300 font-mono text-xs sm:text-base md:text-lg max-w-xl mb-8 sm:mb-12 uppercase leading-relaxed border-l-2 border-[#00f3ff] pl-4 bg-black/40 py-2 rounded-r">
            I BREAK INTO SYSTEMS <span className="text-[#00ff41] font-bold underline">ETHICALLY</span> SO OTHERS CAN SLEEP SOUNDLY. PENETRATION TESTER & SECURITY RESEARCHER FORTIFYING DEFENSES.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a 
              href="#arsenal" 
              className="inline-block bg-[#00f3ff] text-black font-bold px-5 sm:px-6 py-2.5 sm:py-3 text-xs tracking-widest hover:bg-[#00c8ff] transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)] rounded-sm"
            >
              VIEW ARSENAL
            </a>
            <a 
              href="https://www.linkedin.com/in/shirshak-pentester/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block border border-[#00f3ff] text-[#00f3ff] px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-mono hover:bg-[#00f3ff]/15 transition-all rounded-sm"
            >
              LINKEDIN
            </a>
          </div>
        </motion.div>
      </main>

      {/* Certifications Section */}
      <section id="certs" className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-[#00f3ff] mb-2">CERTIFICATIONS</h2>
          <div className="w-16 h-1 bg-[#00f3ff]"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SpotlightCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
            title="CRTE"
            desc="Certified Red Team Expert. Advanced Active Directory exploitation, trust abuse, and defense bypass."
          />
          <SpotlightCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12l5.25 5 2.625-3M8.25 17L12.5 12l2.25-3M16 7l5-5"/></svg>}
            title="CRTP"
            desc="Certified Red Team Professional. Identifying, evaluating, and exploiting Active Directory vulnerabilities."
          />
          <SpotlightCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>}
            title="PNPT"
            desc="Practical Network Penetration Tester. Full-scale OSINT, external, internal network and Active Directory assessments."
          />
        </div>
      </section>

      {/* Arsenal / Tools Section */}
      <section id="arsenal" className="relative z-10 container mx-auto px-4 sm:px-6 pt-28 sm:pt-36">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-[#00f3ff] mb-2">ARSENAL</h2>
          <p className="text-[#00ff41]/90 font-mono text-xs uppercase mb-3">// Custom Scripts & Tools</p>
          <div className="w-16 h-1 bg-[#00f3ff]"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SpotlightCard 
            icon={<span className="font-mono font-bold text-lg text-[#00f3ff]">SubDom</span>}
            title="Subdomain Enumeration"
            desc="An all-in-one shell script designed for rapid, robust subdomain enumeration and passive discovery."
          />
          <SpotlightCard 
            icon={<span className="font-mono font-bold text-lg text-[#00f3ff]">SMBEnum</span>}
            title="Python Assessment Tool"
            desc="Advanced Server Message Block (SMB) enumeration, share permission checks, and null-session assessment."
          />
          <SpotlightCard 
            icon={<span className="font-mono font-bold text-lg text-[#00f3ff]">JSAnalyser</span>}
            title="JavaScript Analyzer"
            desc="Python security analysis utility for extracting hidden endpoints, secrets, and keys from client-side JS."
          />
          <SpotlightCard 
            icon={<span className="font-mono font-bold text-lg text-[#00f3ff]">Passgen</span>}
            title="Secure Password Gen"
            desc="Cryptographically secure password generation tool with customizable entropy and character sets."
          />
        </div>
      </section>

      {/* Blogs & Research Section */}
      <section id="blogs" className="relative z-10 container mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-28">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-[#00f3ff] mb-2">BLOGS & RESEARCH</h2>
          <p className="text-[#00ff41]/90 font-mono text-xs uppercase mb-3">// CTF Writeups & Vulnerability Disclosures</p>
          <div className="w-16 h-1 bg-[#00f3ff]"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
