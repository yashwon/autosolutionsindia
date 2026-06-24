"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import FrameSequence from "./FrameSequence";

export default function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const navbarRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const line4Ref = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGlowTab, setActiveGlowTab] = useState<string | null>(null);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: string,
    frame: number,
    isMobileMenu = false
  ) => {
    e.preventDefault();
    setActiveGlowTab(tab);
    
    if (isMobileMenu) {
      setMenuOpen(false);
    }

    if (typeof window !== "undefined") {
      const HERO_VH = 800;
      const range = (HERO_VH / 100 - 1) * window.innerHeight;
      const progress = (frame - 1) / 603;
      const targetScrollY = progress * range;

      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(targetScrollY, {
          duration: 2.2,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });
      }
    }

    // Temporary premium glow
    setTimeout(() => {
      setActiveGlowTab((prev) => (prev === tab ? null : prev));
    }, 2200);
  };

  const logoSrc = "/logoSrc.png";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.2,
      });

      tl.fromTo(
        navbarRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 1.4 },
        0
      );

      tl.fromTo(
        line1Ref.current,
        { yPercent: 110, opacity: 0, rotateZ: 1.5, transformOrigin: "left top" },
        { yPercent: 0, opacity: 1, rotateZ: 0, duration: 1.7 },
        0.4
      );

      tl.fromTo(
        line2Ref.current,
        { yPercent: 110, opacity: 0, rotateZ: 1.5, transformOrigin: "left top" },
        { yPercent: 0, opacity: 1, rotateZ: 0, duration: 1.7 },
        0.55
      );

      tl.fromTo(
        line3Ref.current,
        { yPercent: 110, opacity: 0, rotateZ: 1.5, transformOrigin: "left top" },
        { yPercent: 0, opacity: 1, rotateZ: 0, duration: 1.7 },
        0.7
      );

      tl.fromTo(
        line4Ref.current,
        { yPercent: 110, opacity: 0, rotateZ: 1.5, transformOrigin: "left top" },
        { yPercent: 0, opacity: 1, rotateZ: 0, duration: 1.7 },
        0.85
      );

      tl.fromTo(
        sliderRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 1.8 },
        1.1
      );

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "3% top",
          scrub: 0.8,
        },
      });

      exitTl.to(
        headlineRef.current,
        { y: -90, opacity: 0, ease: "power1.in" },
        0
      );

      exitTl.to(
        sliderRef.current,
        { opacity: 0, ease: "none" },
        0
      );

      gsap.to(stickyRef.current, {
        y: "-=6",
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div aria-hidden className="noise-overlay" />

      <section
        id="hero-container"
        ref={containerRef}
        style={{ position: "relative", width: "100%", height: "800vh" }}
      >
        <FrameSequence
          frameCount={604}
          framePath="/frames/frame_"
          padLength={4}
          extension=".webp"
        />

        <div ref={stickyRef} className="hero-sticky">
          <div aria-hidden className="hero-vignette" />

          {/* DESKTOP NAVBAR */}
          <nav
            ref={navbarRef}
            style={{
              position: "fixed",
              top: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(920px, 72vw)",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "42px",
              zIndex: 9999,
              opacity: 0,
              pointerEvents: "auto",
              fontFamily: "var(--font-inter), var(--font-archivo), sans-serif",
            }}
            className="hero-navbar-custom"
          >
            <a
              href="#results"
              onClick={(e) => handleNavClick(e, "results", 312)}
              style={{
                ...navLinkStyle,
                ...(activeGlowTab === "results" ? activeGlowStyle : {
                  transition: "color 0.8s ease, text-shadow 0.8s ease",
                }),
              }}
            >
              Results
            </a>

            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, "projects", 160)}
              style={{
                ...navLinkStyle,
                ...(activeGlowTab === "projects" ? activeGlowStyle : {
                  transition: "color 0.8s ease, text-shadow 0.8s ease",
                }),
              }}
            >
              Projects
            </a>

            <a
              href="#hero-container"
              aria-label="Auto Solutions home"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "210px",
              }}
            >
              <img
                src={logoSrc}
                alt="Auto Solutions"
                style={{
                  width: "210px",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </a>

            <a
              href="#team"
              onClick={(e) => handleNavClick(e, "team", 355)}
              style={{
                ...navLinkStyle,
                ...(activeGlowTab === "team" ? activeGlowStyle : {
                  transition: "color 0.8s ease, text-shadow 0.8s ease",
                }),
              }}
            >
              Team
            </a>

            <button
              type="button"
              onClick={onOpenBooking}
              style={bookButtonStyle}
            >
              Join the community
            </button>
          </nav>

          {/* MOBILE NAVBAR */}
          <div
            style={{
              position: "fixed",
              top: "22px",
              left: "20px",
              right: "20px",
              height: "44px",
              display: "none",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 10000,
              pointerEvents: "auto",
            }}
            className="mobile-navbar-custom"
          >
            <a href="#hero-container" aria-label="Auto Solutions home">
              <img
                src={logoSrc}
                alt="Auto Solutions"
                style={{
                  width: "160px",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(0,0,0,0.28)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7H20M4 12H20M4 17H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>

          {menuOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9998,
                padding: "95px 24px 24px",
                background: "rgba(0,0,0,0.96)",
                pointerEvents: "auto",
                display: "none",
                flexDirection: "column",
                gap: "20px",
              }}
              className="mobile-menu-custom"
            >
              <a
                onClick={(e) => handleNavClick(e, "projects", 160, true)}
                href="#projects"
                style={{
                  ...mobileLinkStyle,
                  ...(activeGlowTab === "projects" ? activeGlowStyle : {
                    transition: "color 0.8s ease, text-shadow 0.8s ease",
                  }),
                }}
              >
                Projects
              </a>
              <a
                onClick={(e) => handleNavClick(e, "results", 312, true)}
                href="#results"
                style={{
                  ...mobileLinkStyle,
                  ...(activeGlowTab === "results" ? activeGlowStyle : {
                    transition: "color 0.8s ease, text-shadow 0.8s ease",
                  }),
                }}
              >
                Results
              </a>
              <a
                onClick={(e) => handleNavClick(e, "team", 355, true)}
                href="#team"
                style={{
                  ...mobileLinkStyle,
                  ...(activeGlowTab === "team" ? activeGlowStyle : {
                    transition: "color 0.8s ease, text-shadow 0.8s ease",
                  }),
                }}
              >
                Team
              </a>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenBooking();
                }}
                style={{
                  ...bookButtonStyle,
                  width: "100%",
                  fontSize: "1.1rem",
                  padding: "16px 24px",
                }}
              >
                Join the community
              </button>
            </div>
          )}

          <div className="hero-center">
            <h1
              ref={headlineRef}
              className="hero-headline"
              style={{ pointerEvents: "none" }}
            >
              <span className="hero-line-mask">
                <span ref={line1Ref} className="hero-line-inner">
                  We Identify
                </span>
              </span>

              <span className="hero-line-mask">
                <span ref={line2Ref} className="hero-line-inner">
                  Revenue <em className="hero-headline-em">Gaps.</em>
                </span>
              </span>

              <span className="hero-line-mask">
                <span ref={line3Ref} className="hero-line-inner">
                  Then Automate
                </span>
              </span>

              <span className="hero-line-mask">
                <span ref={line4Ref} className="hero-line-inner">
                  <em className="hero-headline-em">Growth.</em>
                </span>
              </span>
            </h1>
          </div>



          <div
            ref={sliderRef}
            className="bottom-slider-indicator"
            style={{ opacity: 0 }}
          >
            <div className="slider-indicator-dot" />
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 767px) {
          .hero-navbar-custom {
            display: none !important;
          }

          .mobile-navbar-custom {
            display: flex !important;
          }

          .mobile-menu-custom {
            display: flex !important;
          }
        }

        @media (min-width: 768px) {
          .hero-navbar-custom {
            display: flex !important;
          }

          .mobile-navbar-custom,
          .mobile-menu-custom {
            display: none !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1200px) {
.hero-navbar-custom {
  width: min(860px, 82vw) !important;
  gap: 32px !important;
}

          .hero-navbar-custom img {
  width: 210px !important;
}
        }

        @media (min-width: 1201px) {
          .hero-navbar-custom {
  width: min(920px, 72vw) !important;
}
        }
      `}</style>
    </>
  );
}

const navLinkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.86)",
  textDecoration: "none",
  fontSize: "clamp(0.9rem, 1.05vw, 1.12rem)",
  fontWeight: 400,
  letterSpacing: "-0.02em",
  lineHeight: 1,
  whiteSpace: "nowrap",
};

const bookButtonStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.92)",
  textDecoration: "none",
  fontSize: "clamp(0.88rem, 1vw, 1.08rem)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: 1,
  whiteSpace: "nowrap",
  padding: "13px 25px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(0,0,0,0.12)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

const mobileLinkStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.45rem",
  fontWeight: 400,
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
  fontFamily: "var(--font-inter), var(--font-archivo), sans-serif",
};

const activeGlowStyle: React.CSSProperties = {
  color: "#ffffff",
  textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)",
  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
};