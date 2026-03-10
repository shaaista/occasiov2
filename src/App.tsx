import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Invitations from './sections/Invitations';
import ChapterTransition from './sections/ChapterTransition';
import DecorGifts from './sections/DecorGifts';
import Timeline from './sections/Timeline';
import QuoteSection from './sections/QuoteSection';
import Footer from './sections/Footer';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
// Promote all GSAP-animated elements to GPU layers
gsap.config({ force3D: true });

function App() {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
      fastScrollEnd: true,
    });

    // Sync Lenis smooth scroll with GSAP ScrollTrigger
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    ScrollTrigger.refresh();

    return () => {
      if (lenis) lenis.off('scroll', ScrollTrigger.update);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.07, wheelMultiplier: 0.9 }}>
      <div className="relative min-h-screen bg-background-dark">
        <Navigation />

        <main className="relative w-full">
          {/* Hero — pinned layer that scales away */}
          <section className="relative z-10">
            <Hero />
          </section>

          {/* Timeline — reveals via clipPath over pinned Hero */}
          <div id="timeline" className="relative z-20 bg-[#d5ddd0]">
            <Timeline />
          </div>


          {/* Shared dark bg — Invitations + ChapterTransition as one continuous surface */}
          <div className="relative z-20 bg-background-dark">
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 40% 30%, rgba(102,117,88,0.12), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(80,92,69,0.2), transparent 50%)',
              }}
            />
            <Invitations />
            <ChapterTransition />
          </div>

          {/* DecorGifts — reveals via clipPath */}
          <div id="decor" className="relative z-30">
            <DecorGifts />
          </div>

          {/* Quote breather section */}
          <QuoteSection />


          {/* Footer */}
          <div id="footer" className="relative z-30">
            <Footer />
          </div>
        </main>
      </div>
    </ReactLenis>
  );
}

export default App;
