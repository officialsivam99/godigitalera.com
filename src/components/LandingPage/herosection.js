import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTheme } from "../ThemeContext.js";
import FeatureCard from "./FeatureCard.js";

// --- Replace these with your actual image URLs ---
const personalBg = "./images/hero1.jpg";
const personalUi = "./images/hero1.jpg";
const businessBg = "./images/hero1.jpg";
const businessUi = "./images/hero2.jpg";
const freelanceBg = "./images/hero2.jpg";
const freelanceUi = "./images/hero1.jpg";

const cardData = [
  {
    title: "Personal",
    description:
      "The all-in-one plan for banking, saving, investing, and travel...",
    bgImage: personalBg,
    uiImage: personalUi,
  },
  {
    title: "Business",
    description:
      "For those who want an account that does more for their money.",
    bgImage: businessBg,
    uiImage: businessUi,
  },
  {
    title: "Freelance",
    description: "For those who want more freedom, there's ABC Freelance.",
    bgImage: freelanceBg,
    uiImage: freelanceUi,
  },
];

const ArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M5 12H19"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 5L19 12L12 19"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

const HeroSection = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const frameRef = useRef(null);
  const [frameW, setFrameW] = useState(1200);

  // autoplay
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((p) => (p + 1) % cardData.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // measure container
  useEffect(() => {
    const measure = () => {
      if (frameRef.current) {
        const w = frameRef.current.clientWidth;
        setFrameW(w || 1200);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (frameRef.current) ro.observe(frameRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // ===== Responsive tokens (padding, text sizes) =====
  const BP = useMemo(() => {
    const isMobile = frameW < 640;
    const isTablet = frameW >= 640 && frameW < 1024;

    const padX = isMobile ? 16 : isTablet ? 28 : 64;
    const padY = isMobile ? 20 : isTablet ? 28 : 64;

    const h1Size = isMobile ? 26 : isTablet ? 34 : 40;

    return { isMobile, isTablet, padX, padY, h1Size };
  }, [frameW]);

  // ===== Geometry scaling to prevent overlap while preserving layout =====
  // Original design constants:
  //   baseLarge = 1200, baseSmall = 220, baseGap = 20, baseHeight = 540
  //   For n cards, max spread = baseLarge + (n-1) * (baseSmall + baseGap)
  const G = useMemo(() => {
    const n = cardData.length;
    const baseLarge = 1200;
    const baseSmall = 220;
    const baseGap = 20;
    const baseHeight = 540;

    const baseSpread = baseLarge + (n - 1) * (baseSmall + baseGap);

    // available width inside the card track (white frame minus horizontal padding)
    const available = Math.max(320, frameW - 2 * BP.padX);

    // scale so the entire spread always fits
    const scale = clamp(available / baseSpread, 0.4, 1);

    const large = Math.round(baseLarge * scale);
    const small = clamp(Math.round(baseSmall * scale), 100, 340);
    const gap = clamp(Math.round(baseGap * scale), 8, 32);
    const height = clamp(Math.round(baseHeight * scale), 280, 560);

    return { large, small, gap, height };
  }, [frameW, BP.padX]);

  // ===== Positions: exactly your original layout math (scaled) =====
  const getCardStyle = (index) => {
    const isActive = index === activeIndex;
    const isPrevious = index < activeIndex;

    const base = {
      position: "absolute",
      height: `${G.height}px`,
      transition: "all 0.8s cubic-bezier(0.86, 0, 0.07, 1)",
      willChange: "transform, width",
    };

    if (isActive) {
      return {
        ...base,
        width: `${G.large}px`,
        transform: `translateX(${activeIndex * (G.small + G.gap)}px)`,
        zIndex: 10,
      };
    } else if (isPrevious) {
      return {
        ...base,
        width: `${G.small}px`,
        transform: `translateX(${index * (G.small + G.gap)}px)`,
        zIndex: 9 - (activeIndex - index),
      };
    } else {
      const rightOffset =
        activeIndex * (G.small + G.gap) + G.large + G.gap;
      return {
        ...base,
        width: `${G.small}px`,
        transform: `translateX(${rightOffset + (index - activeIndex - 1) * (G.small + G.gap)}px)`,
        zIndex: 8,
      };
    }
  };

  const styles = {
    heroContainer: {
      width: "100%",
      minHeight: "93vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#ffffffff",
      fontFamily: theme.fonts.body,
      padding: "2rem",
      boxSizing: "border-box",
    },
    heroFrame: {
      width: "100%",
      maxWidth: 1400,
      minHeight: 640,
      background: theme.colors.white,
      borderRadius: "32px",
      boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.1)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: `${BP.padY}px ${BP.padX}px`,
      boxSizing: "border-box",
      overflow: "hidden",
    },
    topSection: {
      display: "flex",
      flexDirection: BP.isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: BP.isMobile ? 12 : 24,
      width: "100%",
    },
    subtleText: {
      color: "#65CC89",
      fontWeight: 600,
      marginBottom: BP.isMobile ? "0.5rem" : "1rem",
      letterSpacing: "0.02em",
      fontSize: BP.isMobile ? 12 : 14,
    },
    heading: {
      fontSize: `${BP.h1Size}px`,
      fontWeight: 100,
      lineHeight: 1.2,
      maxWidth: BP.isMobile ? "100%" : "800px",
      color: theme.colors.text,
      margin: 0,
    },
    ctaWrapper: {
      textAlign: BP.isMobile ? "left" : "right",
      maxWidth: BP.isMobile ? "100%" : 320,
    },
    ctaText: {
      color: theme.colors.secondaryText,
      lineHeight: 1.6,
      marginBottom: "1rem",
      fontSize: BP.isMobile ? 14 : 16,
    },
    demoButton: {
      display: "inline-flex",
      alignItems: "center",
      padding: BP.isMobile ? "0.5rem 0.75rem 0.5rem 1rem" : "0.5rem 0.5rem 0.5rem 1.5rem",
      background: "#2c2c2e",
      color: "white",
      border: "none",
      borderRadius: 999,
      fontSize: BP.isMobile ? "0.95rem" : "1rem",
      fontWeight: 600,
      cursor: "pointer",
    },
    arrowCircle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: BP.isMobile ? 36 : 40,
      height: BP.isMobile ? 36 : 40,
      borderRadius: "50%",
      background: "white",
      color: "black",
      marginLeft: "1rem",
      flexShrink: 0,
    },
    cardsSectionContainer: {
      width: "100%",
      height: `${G.height}px`,
      position: "relative",
      display: "flex",
      alignItems: "center",
      marginTop: BP.isMobile ? "0.5rem" : "1.25rem",
      overflow: "hidden",
    },
    cardsWrapper: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
  };

  return (
    <main style={styles.heroContainer}>
      <div style={styles.heroFrame} ref={frameRef}>
        {/* --- TOP SECTION: Text and CTA Button --- */}
        <div style={styles.topSection}>
          <div style={{ flex: 1 }}>
            <p style={styles.subtleText}>DIGITAL BANKING</p>
            <h1 style={styles.heading}>
              We craft the <span style={{ fontWeight: 600 }}>Data Driven strategies </span>
              that turn online presence into profit
            </h1>
          </div>
          <div style={styles.ctaWrapper}>
            <p style={styles.ctaText}>
              From brand strategy to final conversion your complete digital marketing solution is right here
            </p>
            <button style={styles.demoButton}>
              Get Demo Account
              <span style={styles.arrowCircle}>
                <ArrowIcon />
              </span>
            </button>
          </div>
        </div>

        {/* --- BOTTOM SECTION: The Card Animations --- */}
        <div style={styles.cardsSectionContainer}>
          <div style={styles.cardsWrapper} aria-live="polite">
            {cardData.map((card, index) => (
              <div key={index} style={getCardStyle(index)}>
                <FeatureCard
                  data={card}
                  isActive={index === activeIndex}
                  isPrevious={index < activeIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
