"use client";
import { useEffect, useRef, useState } from "react";

/* ── CONTENT ─────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "marketing-funnels",
    title: "Freelancing",
    description:
      "We provide professional freelancing services for businesses, startups, and personal brands. From websites to automation support, we help clients complete digital work faster with clean execution and practical solutions.",
    detail:
      "Services include website design, landing pages, frontend development, automation setup, and business-focused digital solutions.",
    detailLabel: "Work includes:",
    link: null,
    linkLabel: null,
  },
  {
    id: "outreach-automation",
    title: "AI Receptionist",
    description:
      "A smart AI receptionist system built for clinics, hospitals, and service businesses. It can answer customer calls, check availability, book appointments, send confirmations, and reduce missed leads without needing manual staff every time.",
    detail:
      "Useful for clinics, hospitals, salons, consultancies, and local businesses that receive frequent calls and appointment requests.",
    detailLabel: "Use case:",
    link: null,
    linkLabel: null,
  },
  {
    id: "voice-infrastructure",
    title: "Whatsapp\nBots",
    description:
      "We build WhatsApp automation bots that help businesses reply faster, collect customer details, send updates, confirm bookings, and manage follow-ups automatically. It improves customer communication and saves time for business owners.",
    detail:
      "Can be used for appointment confirmations, order updates, reminders, lead collection, FAQs, and customer support workflows.",
    detailLabel: "Automation includes:",
    link: null,
    linkLabel: null,
  },
  {
    id: "ai-receptionist",
    title: "Website with\nSKS",
    description:
      "We create modern business websites with SKS-focused execution: strong structure, clean design, smooth user experience, and conversion-focused content. The goal is to make every website look professional and help the business get more enquiries.",
    detail:
      "Includes landing pages, business websites, responsive layouts, service sections, contact forms, and clear call-to-action design.",
    detailLabel: "Website features:",
    link: null,
    linkLabel: null,
  },
  {
    id: "meat-erp",
    title: "Voice\nInfrastructure",
    description:
      "We develop voice infrastructure that allows businesses to use real-time AI voice systems for calls, conversations, and customer handling. It connects speech recognition, AI response generation, and text-to-speech into one smooth communication flow.",
    detail:
      "Can support AI calling, voice assistants, appointment booking calls, customer support voice flows, and multilingual conversations.",
    detailLabel: "Capabilities:",
    link: null,
    linkLabel: null,
  },
];

/* Desktop positions — mobile/tablet override these via responsive logic */
const PROJECT_POSITIONS: Record<string, { left: string; top: string }> = {
  "marketing-funnels": { left: "35%", top: "50%" },
  "outreach-automation": { left: "35%", top: "50%" },
  "voice-infrastructure": { left: "50%", top: "50%" },
  "ai-receptionist": { left: "50%", top: "50%" },
  "meat-erp": { left: "35%", top: "50%" },
};

const TEAM = [
  {
    name: "Medi Ram Charan",
    role: "CEO",
    tagline: "The one who sees around the corners.",
    paragraphs: [
      "He leads AutoSolutions vision, shapes the strategy, and owns every client relationship from first conversation to final handover.",
      "Not just a sales guy, he's the reason the right problems get solved for the right people.",
    ],
    socialLabel: "Instagram",
    socialUrl: "https://www.instagram.com/rc___4u/",
  },
  {
    name: "Taduri Yakshak",
    role: "CTO",
    tagline: "The one who builds it.",
    paragraphs: [
      "He is the reason any of this actually works. A serial builder who thrives in the deep end.",
      "Give him a vision and he'll hand you the infrastructure.",
      "Currently building AutoSolutions' internal ops dashboard from scratch — because the company runs on the same philosophy it sells.",
    ],
    socialLabel: "LinkedIn",
    socialUrl: "https://www.linkedin.com/in/taduri-yakshak/",
  },
];

const STATS = [
  {
    title: "100%",
    subtext: "Custom Solutions Built From Scratch",
  },
  {
    title: "AI",
    subtext: "Websites & Business Automation",
  },
  {
    title: "Complete",
    subtext: "Design, Development & Deployment",
  },
];

/* ── FRAME RANGES (mapped proportionally from reference 604-frame sequence) ─ */
const R = {
  youDontHave: { s: 23, e: 47 },
  stuck: { s: 49, e: 65 },
  weGoInto: { s: 65, e: 93 },
  andEliminate: { s: 95, e: 120 },
  whatWeBuilt: { s: 127, e: 144 },
  projects: [
    { s: 147, e: 177 },
    { s: 178, e: 205 },
    { s: 205, e: 221 },
    { s: 222, e: 233 },
    { s: 234, e: 255 },
  ],
  resultsHeadline: { s: 305, e: 320 },
  stats: { s: 320, e: 343 },
  teamTitle: { s: 342, e: 368 },
  teamCard0: { s: 393, e: 417 },
  teamCard1: { s: 500, e: 551 },
  bookingMsg: { s: 553, e: 575 },
  bookingCta: { s: 577, e: 604 },
  calEmbed: { s: 578, e: 604 },
  footer: { s: 583, e: 604 },
};

/* ── HELPERS ─────────────────────────────────────────────────────────────── */
const TS = "0px 4px 24px rgba(0,0,0,0.55), 0px 1px 6px rgba(0,0,0,0.38)";
const FA = "var(--font-inter), var(--font-archivo), sans-serif";
const FS = "var(--font-playfair), Georgia, serif";

function ss(t: number) {
  return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
}
function fOp(f: number, s: number, e: number, fi = 6, fo = 6) {
  if (f < s || f > e) return 0;
  if (f < s + fi) return ss((f - s) / fi);
  if (f > e - fo) return ss((e - f) / fo);
  return 1;
}
function gStyle(op: number): React.CSSProperties {
  const sc = (0.97 + 0.03 * op).toFixed(4);
  return {
    opacity: op,
    transform: `translateZ(0) scale(${sc})`,
    willChange: "transform, opacity",
  };
}

const fixedCenter: React.CSSProperties = {
  position: "fixed", left: 0, width: "100vw", pointerEvents: "none",
};

/* ── WINDOW WIDTH HOOK ───────────────────────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(1440);
  useEffect(() => {
    setWidth(window.innerWidth);
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setWidth(window.innerWidth), 150);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return width;
}

/* ── COMPONENT ───────────────────────────────────────────────────────────── */
export default function ScrollOverlay({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [frame, setFrame] = useState(1);
  const tgt = useRef(1);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const cur = useRef(1);
  const raf = useRef<number | null>(null);

  /* Responsive breakpoints */
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  useEffect(() => {
    const HERO_VH = 800;
    const onScroll = () => {
      const range = (HERO_VH / 100 - 1) * window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / range));
      tgt.current = Math.min(604, Math.max(1, Math.floor(progress * 603) + 1));
    };
    const tick = () => {
      const diff = tgt.current - cur.current;
      if (Math.abs(diff) > 0.5) {
        cur.current += diff * 0.14;
        const next = Math.round(cur.current);
        if (next !== frame) setFrame(next);
      }
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const f = frame;

  // rotating word for "systems that are ___"
  const rWords = ["purpose-built,", "AI-powered,", "made for you."];
  const total = R.andEliminate.e - R.andEliminate.s;
  const segment = total / 3;
  const rIdx =
    f < R.andEliminate.s + segment ? 0 :
      f < R.andEliminate.s + segment * 2 ? 1 : 2;

  /* ── Responsive heading styles (defined inside component for breakpoint access) */
  const hdStyle: React.CSSProperties = {
    fontFamily: FA,
    fontWeight: 800,
    fontSize: isMobile
      ? "clamp(1.35rem, 6.5vw, 2.1rem)"
      : isTablet
        ? "clamp(1.6rem, 3.8vw, 3rem)"
        : "clamp(1.8rem, 4.2vw, 5rem)",
    lineHeight: 1.1,
    color: "#fff",
    textShadow: TS,
  };
  const hdItalic: React.CSSProperties = {
    fontFamily: FS,
    fontWeight: 700,
    fontStyle: "italic",
    fontSize: isMobile
      ? "clamp(1.35rem, 6.5vw, 2.1rem)"
      : isTablet
        ? "clamp(1.6rem, 3.8vw, 3rem)"
        : "clamp(1.8rem, 4.2vw, 5rem)",
    lineHeight: 1.1,
    color: "#fff",
    textShadow: TS,
  };

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none" style={{ zIndex: 3 }}>

      {/* 2 ── You don't have it ────────────────────────────────────────── */}
      {f >= R.youDontHave.s && f <= R.youDontHave.e && (
        <div style={{
          ...fixedCenter,
          top: isMobile ? "36vh" : "34vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? "4px" : "0.4vw",
          padding: isMobile ? "0 16px" : isTablet ? "0 24px" : 0,
          boxSizing: "border-box",
          ...gStyle(fOp(f, R.youDontHave.s, R.youDontHave.e)),
        }}>
          <div style={hdStyle}>You don&apos;t have it.</div>
          <div style={{
            display: "flex",
            alignItems: "baseline",
            gap: isMobile ? "8px" : "0.8vw",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <span style={hdStyle}>So instead of </span>
            <span style={hdItalic}>growing</span>
          </div>
          <div style={hdStyle}>your business</div>
        </div>
      )}

      {/* 3 ── you're stuck running it ──────────────────────────────────── */}
      {f >= R.stuck.s && f <= R.stuck.e && (
        <div style={{
          ...fixedCenter,
          top: isMobile ? "40vh" : "38vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? "8px" : "0.8vw",
          flexWrap: "wrap",
          padding: isMobile ? "0 16px" : isTablet ? "0 24px" : 0,
          boxSizing: "border-box",
          ...gStyle(fOp(f, R.stuck.s, R.stuck.e)),
        }}>
          <span style={hdStyle}>you&apos;re</span>
          <span style={hdItalic}>stuck</span>
          <span style={hdStyle}>running it.</span>
        </div>
      )}

      {/* 4 ── We go into your business ────────────────────────────────── */}
      {f >= R.weGoInto.s && f <= R.weGoInto.e && (() => {
        const op = fOp(f, R.weGoInto.s, R.weGoInto.e);
        const baseFontSize = isMobile
          ? "clamp(1.2rem, 5.5vw, 1.75rem)"
          : isTablet
            ? "clamp(1.4rem, 3.2vw, 2.6rem)"
            : "clamp(1.5rem, 4vw, 4.8rem)";

        const baseText: React.CSSProperties = {
          fontFamily: FA,
          fontWeight: 800,
          fontSize: baseFontSize,
          lineHeight: 1.15,
          color: "#fff",
          textShadow: TS,
          pointerEvents: "none",
        };

        if (isMobile) {
          /* Mobile: stack both halves centered */
          return (
            <div style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "calc(100vw - 32px)",
              textAlign: "center",
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              gap: "1.8rem",
              ...gStyle(op),
            }}>
              <div style={baseText}>
                We go into your<br />business, find out exactly
              </div>
              <div style={baseText}>
                what&apos;s pulling you<br />away from growth.
              </div>
            </div>
          );
        }

        if (isTablet) {
          return <>
            <div style={{ ...baseText, position: "fixed", left: "4vw", top: "22vh", textAlign: "left", ...gStyle(op) }}>
              We go<br />into your<br />business,<br />find out exactly
            </div>
            <div style={{ ...baseText, position: "fixed", right: "4vw", bottom: "20vh", textAlign: "right", ...gStyle(op) }}>
              what&apos;s<br />pulling you<br />away from<br />growth.
            </div>
          </>;
        }

        /* Desktop: original split layout */
        return <>
          <div style={{ ...baseText, position: "fixed", left: "5.7vw", top: "18vh", textAlign: "left", ...gStyle(op) }}>
            We go<br />into your<br />business,<br />find out exactly
          </div>
          <div style={{ ...baseText, position: "fixed", right: "4.2vw", bottom: "13vh", textAlign: "right", ...gStyle(op) }}>
            what&apos;s<br />pulling you<br />away from<br />growth.
          </div>
        </>;
      })()}

      {/* 5 ── and Eliminate it with ────────────────────────────────────── */}
      {f >= R.andEliminate.s && f <= R.andEliminate.e && (
        <div style={{
          ...fixedCenter,
          top: isMobile ? "36vh" : "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? "6px" : "0.4vw",
          padding: isMobile ? "0 16px" : isTablet ? "0 24px" : 0,
          boxSizing: "border-box",
          ...gStyle(fOp(f, R.andEliminate.s, R.andEliminate.e)),
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "8px" : "0.8vw",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <span style={hdStyle}>and</span>
            <span style={hdItalic}>Eliminate</span>
            <span style={hdStyle}>it with</span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "8px" : "0.8vw",
            flexWrap: isMobile ? "wrap" : "nowrap",
            justifyContent: "center",
          }}>
            <span style={{
              ...hdStyle,
              paddingLeft: isMobile ? 0 : isTablet ? "20px" : "55px",
            }}>
              systems that are
            </span>
            <span style={{
              ...hdItalic,
              width: isMobile ? "auto" : isTablet ? "38vw" : "30vw",
              display: "inline-block",
              textAlign: isMobile ? "center" : "left",
              transition: "opacity 380ms cubic-bezier(0.25,0.1,0.25,1)",
            }}>
              {rWords[rIdx]}
            </span>
          </div>
        </div>
      )}

      {/* 6 ── What we've built? ───────────────────────────────────────── */}
      {f >= R.whatWeBuilt.s && f <= R.whatWeBuilt.e && (
        <div style={{
          ...fixedCenter,
          top: isMobile ? "34vh" : "28vh",
          display: "flex",
          justifyContent: "center",
          padding: isMobile ? "0 16px" : 0,
          boxSizing: "border-box",
          ...gStyle(fOp(f, R.whatWeBuilt.s, R.whatWeBuilt.e)),
        }}>
          <div style={{
            fontFamily: FA,
            fontWeight: 800,
            fontSize: isMobile
              ? "clamp(1.8rem, 8vw, 2.8rem)"
              : isTablet
                ? "clamp(2rem, 5vw, 4rem)"
                : "clamp(2.5rem, 5vw, 6.5rem)",
            lineHeight: 1.087,
            color: "#fff",
            textShadow: TS,
            textAlign: "center",
          }}>
            What we&apos;ve built?
          </div>
        </div>
      )}

      {/* 7 ── Project Cards ───────────────────────────────────────────── */}
      {R.projects.map((range, i) => {
        const op = fOp(f, range.s, range.e, 8, 8);
        if (op === 0) return null;

        const p = PROJECTS[i];
        const isHovered = hoveredProject === p.id;

        const cardLeft = "50%";
        const cardTop = isMobile
          ? "32%"
          : isTablet
            ? "31%"
            : "30%";

        const collapsedWidth = isMobile
          ? "calc(100vw - 40px)"
          : isTablet
            ? "58vw"
            : "min(520px, 38vw)";

        const expandedWidth = isMobile
          ? "calc(100vw - 32px)"
          : isTablet
            ? "82vw"
            : "min(880px, 78vw)";

        const cardWidth = isHovered ? expandedWidth : collapsedWidth;

        const cardRadius = isMobile ? 18 : 28;

        const cardPad = isHovered
          ? isMobile
            ? "22px 22px"
            : isTablet
              ? "2.8vh 3vw"
              : "3vh 2.8vw 2.5vh"
          : isMobile
            ? "22px 24px"
            : isTablet
              ? "3vh 3vw"
              : "4vh 3vw";

        const titleFontSize = isHovered
          ? isMobile
            ? "clamp(1.8rem, 8vw, 2.8rem)"
            : isTablet
              ? "clamp(2rem, 4.2vw, 3.4rem)"
              : "clamp(2.4rem, 4vw, 4.5rem)"
          : isMobile
            ? "clamp(1.9rem, 9vw, 3rem)"
            : isTablet
              ? "clamp(2.2rem, 4.6vw, 3.5rem)"
              : "clamp(2.6rem, 4vw, 4.3rem)";

        const bodyFontSize = isMobile
          ? "clamp(0.82rem, 3.5vw, 0.95rem)"
          : isTablet
            ? "clamp(0.9rem, 1.8vw, 1.1rem)"
            : "clamp(0.9rem, 1.05vw, 1.08rem)";


        return (
          <div
            key={p.id}
            onMouseEnter={() => setHoveredProject(p.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() =>
              setHoveredProject(hoveredProject === p.id ? null : p.id)
            }
            style={{
              position: "fixed",
              left: cardLeft,
              top: cardTop,
              transform: "translate(-50%, -50%)",
              width: cardWidth,
              borderRadius: cardRadius,
              padding: 1,
              background: "rgba(160,160,160,0.06)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow:
                "0 8px 32px 0 rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.13)",
              pointerEvents: "auto",
              cursor: "pointer",
              zIndex: 20,
              transition:
                "width 0.45s ease, border-radius 0.45s ease, background 0.45s ease",
            }}
          >
            <div
              style={{
                borderRadius: cardRadius,
                background: "rgba(255,255,255,0.01)",
                padding: cardPad,
                display: "flex",
                flexDirection: "column",
                alignItems: isHovered ? "flex-start" : "center",
                justifyContent: "center",
                gap: isHovered ? (isMobile ? "14px" : "1.6vh") : 0,
                boxSizing: "border-box",
                textAlign: isHovered ? "left" : "center",
                minHeight: isHovered
                  ? "auto"
                  : isMobile
                    ? "110px"
                    : isTablet
                      ? "130px"
                      : "150px",
                transition:
                  "padding 0.45s ease, min-height 0.45s ease, align-items 0.45s ease",
                ...gStyle(op),
              }}
            >
              {/* Title always visible */}
              <div
                style={{
                  fontFamily: FA,
                  fontWeight: 800,
                  fontSize: titleFontSize,
                  lineHeight: 1.12,
                  color: "#fff",
                  whiteSpace: "pre-line",
                  textShadow: TS,
                  transition: "font-size 0.45s ease",
                }}
              >
                {p.title}
              </div>

              {/* Description only visible on hover/click */}
              <div
                style={{
                  fontFamily: FA,
                  fontWeight: 400,
                  fontSize: bodyFontSize,
                  lineHeight: isMobile ? 1.55 : 1.45,
                  color: "rgba(255,255,255,0.88)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                  maxWidth: "100%",
                  opacity: isHovered ? 1 : 0,
                  maxHeight: isHovered ? 500 : 0,
                  overflow: "hidden",
                  transform: isHovered ? "translateY(0)" : "translateY(10px)",
                  transition:
                    "opacity 0.35s ease, max-height 0.45s ease, transform 0.35s ease",
                }}
              >
                {p.description}

                {p.detailLabel && (
                  <>
                    <br />
                    <br />
                    <strong>{p.detailLabel}</strong> {p.detail}
                  </>
                )}

                {!p.detailLabel && p.detail && (
                  <>
                    <br />
                    <br />
                    {p.detail}
                  </>
                )}
              </div>

              {/* Link only visible on hover */}
              {p.linkLabel && (
                <div
                  style={{
                    fontFamily: FA,
                    fontWeight: 500,
                    fontSize: isMobile
                      ? "clamp(0.75rem, 3vw, 0.9rem)"
                      : "clamp(0.75rem, 1vw, 1rem)",
                    color: "#fff",
                    textDecoration: "underline",
                    marginTop: "0.5vh",
                    opacity: isHovered ? 1 : 0,
                    maxHeight: isHovered ? 60 : 0,
                    overflow: "hidden",
                    transition: "opacity 0.35s ease, max-height 0.35s ease",
                  }}
                >
                  {p.linkLabel}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* 8 ── Results Headline ────────────────────────────────────────── */}
      {f >= R.resultsHeadline.s && f <= R.resultsHeadline.e && (
        <div style={{ ...gStyle(fOp(f, R.resultsHeadline.s, R.resultsHeadline.e)) }}>
          {isMobile ? (
            /* Mobile: single centered column */
            <div style={{
              position: "fixed",
              left: "50%",
              top: "18vh",
              transform: "translateX(-50%)",
              width: "calc(100vw - 32px)",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: FA,
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 7vw, 2.4rem)",
                lineHeight: 1.0,
                color: "#fff",
                textShadow: TS,
                marginBottom: "4vh",
              }}>
                {["AI-Powered Solutions", "Websites & Automation"].map((t, i) => <div key={i}>{t}</div>)}
              </div>
              <div style={{
                fontFamily: FA,
                fontWeight: 400,
                fontSize: "clamp(1rem, 4.5vw, 1.5rem)",
                lineHeight: 1.35,
                color: "#fff",
                textShadow: TS,
              }}>
                {["Built from scratch.", "Delivered with ownership."].map((t, i) => <div key={i}>{t}</div>)}
              </div>
            </div>
          ) : isTablet ? (
            /* Tablet: left-aligned, tighter margins */
            <>
              <div style={{
                position: "fixed",
                left: "8vw",
                top: "18vh",
                fontFamily: FA,
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 3.8rem)",
                lineHeight: 0.95,
                color: "#fff",
                textShadow: TS,
                textAlign: "left",
              }}>
                {["AI-Powered Solutions", "Websites & Automation"].map((t, i) => <div key={i}>{t}</div>)}
              </div>
              <div style={{
                position: "fixed",
                left: "8vw",
                top: "42vh",
                fontFamily: FA,
                fontWeight: 400,
                fontSize: "clamp(1.2rem, 2.8vw, 2.8rem)",
                lineHeight: 1.087,
                color: "#fff",
                textShadow: TS,
                textAlign: "left",
              }}>
                {["Built from scratch.", "Delivered with ownership."].map((t, i) => <div key={i}>{t}</div>)}
              </div>
            </>
          ) : (
            /* Desktop: original */
            <>
              <div style={{
                position: "fixed",
                left: "12.76vw",
                top: "21.39vh",
                fontFamily: FA,
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4.4vw, 5.2rem)",
                lineHeight: 0.95,
                color: "#fff",
                textShadow: TS,
                textAlign: "left",
              }}>
                {["AI-Powered Solutions", "Websites & Automation"].map((t, i) => <div key={i}>{t}</div>)}
              </div>
              <div style={{
                position: "fixed",
                left: "12.76vw",
                top: "44vh",
                fontFamily: FA,
                fontWeight: 400,
                fontSize: "clamp(1.4rem, 3vw, 3.6rem)",
                lineHeight: 1.087,
                color: "#fff",
                textShadow: TS,
                textAlign: "left",
              }}>
                {["Built from scratch.", "Delivered with ownership."].map((t, i) => <div key={i}>{t}</div>)}
              </div>
            </>
          )}
        </div>
      )}

      {/* 9 ── Stats ───────────────────────────────────────────────────── */}
      {f >= R.stats.s && f <= R.stats.e && (() => {
        const op = fOp(f, R.stats.s, R.stats.e);

        if (isMobile) {
          return (
            <div style={gStyle(op)}>
              {/* "Numbers from…" label centered at top */}
              <div style={{
                position: "fixed",
                left: "50%",
                top: "9vh",
                transform: "translateX(-50%)",
                width: "calc(100vw - 32px)",
                textAlign: "center",
                fontFamily: FA,
                fontWeight: 800,
                fontSize: "clamp(0.9rem, 4vw, 1.4rem)",
                lineHeight: 1.3,
                color: "#fff",
                textShadow: TS,
              }}>
                {["Numbers", "from systems", <span key="b"><em>we built</em></span>, <span key="d">and <em>deployed</em></span>].map((t, i) => <div key={i}>{t}</div>)}
              </div>
              {/* Three stats stacked */}
              {STATS.map((st, i) => (
                <div key={i} style={{
                  position: "fixed",
                  left: "50%",
                  top: `${28 + i * 20}vh`,
                  transform: "translateX(-50%)",
                  width: "calc(100vw - 32px)",
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: FA,
                    fontWeight: 800,
                    fontSize: "clamp(1.5rem, 7vw, 2.4rem)",
                    lineHeight: 1.087,
                    color: "#fff",
                    textShadow: TS,
                  }}>
                    {st.title}
                  </div>
                  <div style={{
                    fontFamily: FA,
                    fontWeight: 400,
                    fontSize: "clamp(0.78rem, 3.5vw, 1.1rem)",
                    lineHeight: 1.087,
                    color: "#fff",
                    marginTop: "0.4vh",
                  }}>
                    {st.subtext}
                  </div>
                </div>
              ))}
            </div>
          );
        }

        if (isTablet) {
          const tops = ["20vh", "40vh", "60vh"];
          return (
            <div style={gStyle(op)}>
              {STATS.map((st, i) => (
                <div key={i} style={{ position: "fixed", left: "8vw", top: tops[i], width: "44vw" }}>
                  <div style={{
                    fontFamily: FA,
                    fontWeight: 800,
                    fontSize: "clamp(1.8rem, 4vw, 4rem)",
                    lineHeight: 1.087,
                    color: "#fff",
                    textShadow: TS,
                  }}>
                    {st.title}
                  </div>
                  <div style={{
                    fontFamily: FA,
                    fontWeight: 400,
                    fontSize: "clamp(0.9rem, 2vw, 2rem)",
                    lineHeight: 1.087,
                    color: "#fff",
                    marginTop: "0.5vh",
                  }}>
                    {st.subtext}
                  </div>
                </div>
              ))}
              <div style={{
                position: "fixed",
                right: "6vw",
                top: "20vh",
                width: "30vw",
                textAlign: "right",
                fontFamily: FA,
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 3vw, 3rem)",
                lineHeight: 1.087,
                color: "#fff",
                textShadow: TS,
              }}>
                {["Numbers", "from", "systems", <span key="b"><em>we</em></span>, <span key="d"><em>built</em></span>, "and", <em key="dp">deployed</em>].map((t, i) => <div key={i}>{t}</div>)}
              </div>
            </div>
          );
        }

        /* Desktop: original */
        const tops = ["22.87vh", "42.93vh", "62.98vh"];
        return (
          <div style={gStyle(op)}>
            {STATS.map((st, i) => (
              <div key={i} style={{ position: "fixed", left: "12.76vw", top: tops[i], width: "21.82vw" }}>
                <div style={{
                  fontFamily: FA,
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 4.4vw, 5.2rem)",
                  lineHeight: 1.087,
                  color: "#fff",
                  textShadow: TS,
                }}>
                  {st.title}
                </div>
                <div style={{
                  fontFamily: FA,
                  fontWeight: 400,
                  fontSize: "clamp(0.9rem, 2vw, 2.5rem)",
                  lineHeight: 1.087,
                  color: "#fff",
                  marginTop: "0.5vh",
                }}>
                  {st.subtext}
                </div>
              </div>
            ))}
            <div style={{
              position: "fixed",
              right: "10vw",
              top: "21.48vh",
              width: "22.6vw",
              textAlign: "right",
              fontFamily: FA,
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4.4vw, 5.2rem)",
              lineHeight: 1.087,
              color: "#fff",
              textShadow: TS,
            }}>
              {["Numbers", "from", "systems", <span key="b"><em>we</em></span>, <span key="d"><em>built</em></span>, "and", <em key="dp">deployed</em>].map((t, i) => <div key={i}>{t}</div>)}
            </div>
          </div>
        );
      })()}

      {/* 10 ── The People behind it all ───────────────────────────────── */}
      {f >= R.teamTitle.s && f <= R.teamTitle.e && (
        <div style={{
          ...fixedCenter,
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "0 16px" : isTablet ? "0 24px" : 0,
          boxSizing: "border-box",
          ...gStyle(fOp(f, R.teamTitle.s, R.teamTitle.e)),
        }}>
          <div style={{
            display: "flex",
            alignItems: "baseline",
            gap: isMobile ? "8px" : "1vw",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <span style={hdItalic}>The</span>
            <span style={{
              ...hdStyle,
              fontSize: isMobile
                ? "clamp(1.8rem, 8vw, 2.8rem)"
                : isTablet
                  ? "clamp(2rem, 5vw, 4rem)"
                  : "clamp(2rem, 5.5vw, 6.5rem)",
            }}>
              People
            </span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "baseline",
            gap: isMobile ? "8px" : "1vw",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <span style={{
              ...hdStyle,
              fontSize: isMobile
                ? "clamp(1.6rem, 7vw, 2.5rem)"
                : isTablet
                  ? "clamp(1.8rem, 4.5vw, 3.5rem)"
                  : "clamp(2rem, 5vw, 6rem)",
            }}>
              behind
            </span>
            <span style={hdItalic}>it all</span>
          </div>
        </div>
      )}

      {/* 11 ── Team Cards ─────────────────────────────────────────────── */}
      {[R.teamCard0, R.teamCard1].map((range, i) => {
        const op = fOp(f, range.s, range.e, 8, 8);
        if (op === 0) return null;
        const member = TEAM[i];

        /* Build outer positioning style separately from gStyle animation.
           This prevents gStyle's transform from overriding the centering transform. */
        let outerPos: React.CSSProperties;

        if (isMobile) {
          outerPos = {
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "calc(100vw - 32px)",
            borderRadius: 18,
          };
        } else if (isTablet) {
          outerPos = {
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "80vw",
            borderRadius: 24,
          };
        } else {
          const lefts = ["45.67vw", "17.76vw"];
          const widths = ["34.27vw", "32.6vw"];
          outerPos = {
            position: "fixed",
            left: lefts[i],
            top: "21.63vh",
            width: widths[i],
            height: "62.37vh",
            borderRadius: 28,
          };
        }

        const cardRadius = isMobile ? 18 : isTablet ? 24 : 28;
        const cardPad = isMobile ? "4vw 5vw" : isTablet ? "3vh 3vw" : "3vh 2.5vw";

        return (
          /* Outer div: position + decoration only */
          <div
            key={member.name}
            style={{
              ...outerPos,
              padding: 1,
              background: "rgba(180,180,180,0.05)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.27),0 0 0 1px rgba(255,255,255,0.15)",
              pointerEvents: "auto",
              zIndex: 20,
            }}
          >
            {/* Inner div: opacity/blur/scale animation — does NOT affect outer transform */}
            <div style={{
              width: "100%",
              height: isDesktop ? "100%" : "auto",
              borderRadius: cardRadius,
              background: "rgba(255,255,255,0.01)",
              padding: cardPad,
              display: "flex",
              flexDirection: "column",
              gap: "1vh",
              boxSizing: "border-box",
              ...gStyle(op),
            }}>
              <div style={{
                fontFamily: FA,
                fontWeight: 800,
                fontSize: isMobile
                  ? "clamp(1.2rem, 5.5vw, 1.8rem)"
                  : isTablet
                    ? "clamp(1.3rem, 2.5vw, 2.4rem)"
                    : "clamp(1.4rem, 2.8vw, 3.2rem)",
                lineHeight: 1.1,
                color: "#fff",
              }}>
                {member.name}
              </div>
              <div style={{
                fontFamily: FA,
                fontWeight: 800,
                fontSize: isMobile
                  ? "clamp(0.9rem, 4vw, 1.3rem)"
                  : isTablet
                    ? "clamp(1rem, 1.8vw, 1.8rem)"
                    : "clamp(1rem, 1.8vw, 2rem)",
                lineHeight: 1.1,
                color: "#fff",
              }}>
                {member.role}
              </div>
              <div style={{
                fontFamily: FA,
                fontWeight: 400,
                fontSize: isMobile
                  ? "clamp(0.78rem, 3.5vw, 1rem)"
                  : isTablet
                    ? "clamp(0.85rem, 1.4vw, 1.4rem)"
                    : "clamp(0.8rem, 1.5vw, 1.6rem)",
                lineHeight: 1.3,
                color: "#fff",
                marginTop: isMobile ? "2vw" : "3vh",
              }}>
                {member.tagline}
              </div>
              <div style={{
                display: "flex",
                flexDirection: "column",
                marginTop: isMobile ? "2vw" : "2vh",
                gap: isMobile ? "1.5vw" : "2vh",
              }}>
                {member.paragraphs.map((p, j) => (
                  <div key={j} style={{
                    fontFamily: FA,
                    fontWeight: 300,
                    fontSize: isMobile
                      ? "clamp(0.68rem, 3vw, 0.9rem)"
                      : isTablet
                        ? "clamp(0.75rem, 1.2vw, 1.1rem)"
                        : "clamp(0.7rem, 1.175vw, 1.2rem)",
                    lineHeight: isMobile ? 1.55 : 1.2,
                    color: "#fff",
                  }}>
                    {p}
                  </div>
                ))}
              </div>
              <a
                href={member.socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: isMobile ? "3vw" : "auto",
                  fontFamily: FA,
                  fontWeight: 400,
                  fontSize: isMobile
                    ? "clamp(0.7rem, 3vw, 0.9rem)"
                    : "clamp(0.75rem, 1.2vw, 1.2rem)",
                  color: "#38bdf8",
                  textDecoration: "none",
                  cursor: "pointer",
                  display: "inline-block",
                  transition: "color 0.2s ease, text-decoration 0.2s ease",
                  pointerEvents: "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0ea5e9";
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#38bdf8";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                {member.socialLabel}
              </a>
            </div>
          </div>
        );
      })}

      {/* 12 ── Booking Message ────────────────────────────────────────── */}
      {f >= R.bookingMsg.s && f <= R.bookingMsg.e && (
        <div style={{
          ...fixedCenter,
          top: isMobile ? "28vh" : "36.94vh",
          display: "flex",
          justifyContent: "center",
          padding: isMobile ? "0 16px" : isTablet ? "0 24px" : 0,
          boxSizing: "border-box",
          ...gStyle(fOp(f, R.bookingMsg.s, R.bookingMsg.e)),
        }}>
          <p style={{
            width: isMobile ? "100%" : isTablet ? "85vw" : "67.24vw",
            fontFamily: FA,
            fontWeight: 800,
            fontSize: isMobile
              ? "clamp(1.1rem, 5vw, 1.6rem)"
              : isTablet
                ? "clamp(1.3rem, 3vw, 2.5rem)"
                : "clamp(1.5rem, 3.4vw, 4rem)",
            color: "#fff",
            textAlign: "center",
            lineHeight: isMobile ? 1.45 : 1.25,
            textShadow: TS,
            margin: 0,
          }}>
            If you recognized your business<br />
            somewhere on this page,<br />
            this call is for you.
          </p>
        </div>
      )}

      {/* 13 & 14 ── Combined Final CTA ────────────────────────────────────────── */}
      {f >= R.bookingCta.s && (
        <div style={{
          ...fixedCenter,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          opacity: Math.min(1, (f - R.bookingCta.s) / 5),
          pointerEvents: "none",
          padding: isMobile ? "0 16px" : isTablet ? "0 24px" : "0",
          zIndex: 50,
        }}>
          <h2 style={{
            fontFamily: FA,
            fontWeight: 800,
            fontSize: isMobile
              ? "clamp(1.8rem, 6vw, 2.4rem)"
              : isTablet
                ? "clamp(2.5rem, 5vw, 3.5rem)"
                : "clamp(3rem, 5vw, 4.5rem)",
            color: "#fff",
            textAlign: "center",
            textShadow: TS,
            margin: 0,
            lineHeight: 1.2,
          }}>
            Eliminate 30 hours of wasted work<br />
            Book your <em style={{fontFamily: FS}}>free</em> call now
          </h2>
          <button
            type="button"
            onClick={onOpenBooking}
            style={{
              minWidth: 220,
              padding: "16px 32px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s ease, transform 0.2s ease",
              pointerEvents: "auto",
            }}
            onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
          >
            Join the community
          </button>
        </div>
      )}

      {/* 15 ── Footer ─────────────────────────────────────────────────── */}
      {f >= R.footer.s && (
        <div style={{
          ...fixedCenter,
          top: isMobile ? "88vh" : "85.83vh",
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, (f - R.footer.s) / 5),
        }}>
          <p style={{
            fontFamily: FA,
            fontWeight: 400,
            fontSize: "clamp(0.7rem, 1.46vw, 1.4rem)",
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
            margin: 0,
          }}>
            © 2026 Auto Solutions.<br />All rights reserved.
          </p>
        </div>
      )}

    </div>
  );
}
