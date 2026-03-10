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
          <div id="timeline" className="relative z-20 bg-[#EADDD7]">
            <Timeline />
          </div>

          {/* Transition bridge: Stone → Dark (smooth color morph) */}
          <div
            className="relative z-20 h-[30vh] md:h-[50vh]"
            style={{
              background:
                'linear-gradient(to bottom, #EADDD7 0%, #d4c0b8 12%, #b8948a 25%, #8a5c5e 40%, #5c3040 55%, #3a1a2a 72%, #2a1520 86%, #211119 100%)',
            }}
          />

          {/* Shared dark bg — Invitations + ChapterTransition as one continuous surface */}
          <div className="relative z-20 bg-background-dark">
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 40% 30%, rgba(230,25,128,0.12), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(74,13,46,0.2), transparent 50%)',
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

          {/* Transition bridge: Stone → Black (smooth color morph) */}
          <div
            className="relative z-30 h-[25vh] md:h-[40vh]"
            style={{
              background:
                'linear-gradient(to bottom, #EADDD7 0%, #d4c0b8 10%, #b09080 22%, #7a5860 38%, #4a2838 52%, #2c1520 68%, #160a0e 82%, #000000 100%)',
            }}
          />

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
