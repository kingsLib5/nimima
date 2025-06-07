import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const slideshowRef = useRef(null);

  const slides = [
    { id: 1, title: "Nigeria Manufacturers, Industry, and Marketer Awards (NIMIMA) 2025", content: "A formal request from Broadway Media Entertainment for the recognition and endorsement of an initiative celebrating excellence, innovation, and contributions within Nigeria’s manufacturing and commercial sectors.", image: "https://placehold.co/400x200/3182ce/ffffff?text=NIMIMA+2025+Logo", type: "text" },
    { id: 2, title: "Formal Request to the Honourable Minister", content: "We formally request the recognition and endorsement of NIMIMA 2025. This initiative aims to celebrate excellence, innovation, and contributions within Nigeria’s manufacturing and commercial sectors.", image: "https://placehold.co/400x200/4a5568/ffffff?text=Formal+Letter", type: "text" },
    { id: 3, title: "Celebrating Excellence and Innovation", content: "NIMIMA 2025 highlights the critical role played by indigenous manufacturers, industrialists, and marketers in driving economic growth, job creation, and national development.", image: "https://placehold.co/400x200/38a169/ffffff?text=Nigerian+Industry", type: "text" },
    { id: 4, title: "Bringing Together Key Stakeholders", content: "The award ceremony will bring together key stakeholders from the public and private sectors, creating a platform to encourage healthy competition, showcase best practices, and inspire excellence.", image: "https://placehold.co/400x200/d69e2e/ffffff?text=Stakeholders+Meeting", type: "text" },
    { id: 5, title: "Reinforcing the Ministry's Commitment", content: "Recognition by the Federal Ministry of Commerce will lend credibility and national visibility to the awards, reinforcing the Ministry’s commitment to supporting local enterprise and industrial development.", image: "https://placehold.co/400x200/5a67d8/ffffff?text=Government+Support", type: "text" },
    { id: 6, title: "Organizer's Profile: Broadway Media Entertainment", content: "Established in 2013 and duly registered under the Corporate Affairs Commission (CAC). We are the proud founders and hosts of the Nigeria Music Ambassadors Award (NIMAA), held annually since 2015.", image: "https://placehold.co/400x200/c53030/ffffff?text=BME+Logo", type: "text" },
    { id: 7, title: "Experience in National Award Events", content: "Our experience includes participation in several national award events, such as:", items: ["The Eddys Award","Rotary Club of Nigeria Award","Catholic Archdiocese of Lagos Award","NIMAA Award"], image: "https://placehold.co/400x200/319795/ffffff?text=Award+Ceremony", type: "list" },
    { id: 8, title: "Partnerships for Talent Development", content: "We have partnered with The Guardian Newspaper and Arura House of Talent to support talent hunts and promote upcoming Nigerian music artists and creatives.", image: "https://placehold.co/400x200/9f7aea/ffffff?text=Talent+Promotion", type: "text" },
    { id: 9, title: "Purpose and Objectives of NIMIMA 2025", items: ["Recognize excellence in Nigeria's manufacturing, industrial, and marketing sectors.","Promote innovation, productivity, and sustainable business practices.","Encourage local production and consumption of Made-in-Nigeria products.","Provide a platform for collaboration between industry leaders and policymakers."], image: "https://placehold.co/400x200/ed8936/ffffff?text=Objectives+Icon", type: "list" },
    { id: 10, title: "Benefits for the Government & National Economy", items: ["Alignment with national economic diversification and industrialization policies.","Increased government revenue through business growth and formalization.","Enhanced public image as a champion of local enterprise."], image: "https://placehold.co/400x200/4299e1/ffffff?text=Economic+Growth", type: "list" },
    { id: 11, title: "Benefits for Manufacturers & Industries", items: ["Job creation, entrepreneurship, innovation, and skill development.","National recognition, brand visibility, and access to government opportunities."], image: "https://placehold.co/400x200/81e6d9/ffffff?text=Industry+Success", type: "list" },
    { id: 12, title: "Request for Endorsement and Collaboration", content: "We humbly request your endorsement of this initiative and would be honoured to collaborate with your Ministry to ensure its success.", image: "https://placehold.co/400x200/718096/ffffff?text=Collaboration", type: "text" },
    { id: 13, title: "Enclosed Concept Note & Invitation to Meet", content: "Enclosed is a detailed concept note for your review. We welcome the opportunity to meet with your office to present this proposal in person.", image: "https://placehold.co/400x200/a0aec0/ffffff?text=Concept+Note", type: "text" },
    { id: 14, title: "Thank You", content: "Thank you for your continued support of initiatives that promote local enterprise, economic empowerment, and national development.", image: "https://placehold.co/400x200/2b6cb0/ffffff?text=Thank+You", type: "closing", signature: "[Your Full Name]", position: "[Your Position]", company: "Broadway Media Entertainment" }
  ];

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? (handleNext(), 0) : p + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [currentSlide, autoPlay]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') setAutoPlay(ap => !ap);
      if (e.key.toLowerCase() === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [autoPlay]);

  const handlePrev = () => {
    setProgress(0);
    setCurrentSlide(i => (i > 0 ? i - 1 : slides.length - 1));
  };
  const handleNext = () => {
    setProgress(0);
    setCurrentSlide(i => (i < slides.length - 1 ? i + 1 : 0));
  };
  const goToSlide = i => {
    setProgress(0);
    setCurrentSlide(i);
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      slideshowRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const current = slides[currentSlide];

  return (
    <div ref={slideshowRef} className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 md:p-8 relative dark">
      <div className="absolute inset-0 bg-black/50 pointer-events-none flex items-center justify-center">
        <div className="text-[15rem] font-bold text-white opacity-5 md:opacity-10">NIMIMA</div>
      </div>

      <div className={`w-full max-w-6xl bg-gray-800 dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isFullscreen ? 'min-h-screen max-w-none rounded-none' : ''}`}>
        <div className="h-2 bg-gray-700 w-full relative">
          <div className="h-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-100" style={{ width: `${progress}%` }} />
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-gray-700 to-transparent" />
        </div>

        <div className="backdrop-blur-sm bg-gray-800/60 p-3 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <button onClick={() => setAutoPlay(ap => !ap)} className="p-2 rounded-full hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-teal-400" title={autoPlay ? "Pause" : "Play"}>
              {autoPlay
                ? <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                : <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              }
            </button>

            <button onClick={toggleFullscreen} className="p-2 rounded-full hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-teal-400" title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
              {isFullscreen
                ? <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 20h12M10 16l-4 4m0 0l-4-4m4 4V4m0 16l4-4m0 0l4 4m-4-4V4" /></svg>
                : <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" /></svg>
              }
            </button>

            <div className="text-sm text-gray-400">{autoPlay ? "Auto-play: ON" : "Auto-play: OFF"}</div>
          </div>

          <div className="text-sm text-gray-300 font-medium">
            Press <span className="bg-gray-700 px-2 py-1 rounded">Space</span> to toggle autoplay, <span className="bg-gray-700 px-2 py-1 rounded mx-1">← →</span> to navigate, <span className="bg-gray-700 px-2 py-1 rounded ml-1">F</span> for fullscreen
          </div>
        </div>

        <div className="relative min-h-[500px] md:min-h-[140vh] flex flex-col" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="flex-grow flex flex-col items-center justify-center p-6 md:p-10 text-center relative z-10">
              <div className="w-full flex justify-between items-center mb-6">
                <div className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-serif">
                  Slide {current.id} of {slides.length}
                </div>
                <div className="flex space-x-2">
                  {slides.map((_, idx) => (
                    <button key={idx} onClick={() => goToSlide(idx)} className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-teal-400 scale-125' : 'bg-gray-600 hover:bg-teal-300'}`} aria-label={`Go to slide ${idx + 1}`} />
                  ))}
                </div>
              </div>

              <div className="w-full max-w-4xl">
                <motion.h2 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                  {current.title}
                </motion.h2>

                {current.image && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="mx-auto mb-8 rounded-xl overflow-hidden shadow-2xl border-4 border-white/20">
                    <img src={current.image} alt={current.title} className="w-full max-w-md mx-auto object-cover" />
                  </motion.div>
                )}

                {current.type === 'text' && (
                  <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="max-w-2xl leading-relaxed text-gray-300 text-lg md:text-xl mx-auto">
                    {current.content}
                  </motion.p>
                )}

                {current.type === 'list' && (
                  <motion.ul initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-left max-w-2xl mx-auto space-y-3">
                    {current.items.map((item, i) => (
                      <motion.li key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-start p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/80 transition-colors">
                        <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-teal-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="ml-3 text-gray-100 text-lg">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                {current.type === 'closing' && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8">
                    <p className="text-xl text-gray-200 mb-8">{current.content}</p>
                    <div className="mt-10 p-6 bg-gray-700/30 rounded-xl border border-gray-600 max-w-md mx-auto">
                      <p className="text-2xl font-bold text-white">{current.signature}</p>
                      <p className="text-xl text-teal-300 mt-1">{current.position}</p>
                      <p className="text-lg text-teal-400 font-medium mt-1">{current.company}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center backdrop-blur-sm bg-gray-900/70 border-t border-gray-700 z-20">
            <button onClick={handlePrev} className="flex items-center px-5 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium shadow-md transition transform hover:-translate-x-1 active:scale-95 focus:ring-2 focus:ring-teal-400" aria-label="Previous Slide">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Previous
            </button>

            <div className="flex items-center">
              <button onClick={() => goToSlide(0)} className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white font-medium mr-4 transition transform hover:scale-105 active:scale-95 focus:ring-2 focus:ring-teal-400">
                Restart
              </button>
              <button onClick={handleNext} className="flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium shadow-lg transition transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-teal-400" aria-label="Next Slide">
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>© 2025 Broadway Media Entertainment • NIMIMA Awards</p>
        <div className="mt-2 flex justify-center space-x-4">
          <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Professional Presentation</span>
          <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>Enhanced Experience</span>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
