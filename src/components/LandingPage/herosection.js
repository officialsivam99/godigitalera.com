import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext.js';
import FeatureCard from './FeatureCard.js';

// --- Replace these with your actual image URLs ---
const personalBg = './images/hero1.jpg';
const personalUi = 'https://i.imgur.com/example-ui-1.png';
const businessBg = 'https://i.imgur.com/example-bg-2.jpg';
const businessUi = 'https://i.imgur.com/example-ui-2.png';
const freelanceBg = 'https://i.imgur.com/example-bg-3.jpg';
const freelanceUi = 'https://i.imgur.com/example-ui-3.png';

const cardData = [
    { title: 'Personal', description: 'The all-in-one plan for banking, saving, investing, and travel...', bgImage: personalBg, uiImage: personalUi },
    { title: 'Business', description: 'For those who want an account that does more for their money.', bgImage: businessBg, uiImage: businessUi },
    { title: 'Freelance', description: 'For those who want more freedom, there\'s ABC Freelance.', bgImage: freelanceBg, uiImage: freelanceUi },
];

const ArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const HeroSection = () => {
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex + 1) % cardData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getCardStyle = (index) => {
        // ... (This function remains the same as your approved version)
        const isActive = index === activeIndex;
        const isPrevious = index < activeIndex;
        const largeCardWidth = 1200;
        const smallCardWidth = 220;
        const gap = 20;
        const baseStyle = {
            position: 'absolute',
            height: '540px',
            transition: 'all 0.8s cubic-bezier(0.86, 0, 0.07, 1)',
        };
        if (isActive) {
            return {
                ...baseStyle,
                width: `${largeCardWidth}px`,
                transform: `translateX(${activeIndex * (smallCardWidth + gap)}px)`,
                zIndex: 10,
            };
        } else if (isPrevious) {
            return {
                ...baseStyle,
                width: `${smallCardWidth}px`,
                transform: `translateX(${(index) * (smallCardWidth + gap)}px)`,
                zIndex: 9 - (activeIndex - index),
            };
        } else {
            const rightOffset = (activeIndex * (smallCardWidth + gap)) + largeCardWidth + gap;
            return {
                ...baseStyle,
                width: `${smallCardWidth}px`,
                transform: `translateX(${rightOffset + (index - activeIndex - 1) * (smallCardWidth + gap)}px)`,
                zIndex: 8,
            };
        }
    };

    const styles = {
        heroContainer: {
            width: '100%',
            height: '93vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffffff', // Light grey background for the page
            fontFamily: theme.fonts.body,
            padding: '2rem',
            boxSizing: 'border-box',
        },
        // This is the main white container from the screenshot
        heroFrame: {
            width: '100%',
            height: '100%',
            background: theme.colors.white,
            borderRadius: '32px',
            boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column', // Stack text and cards vertically
            justifyContent: 'space-around', // Distribute space
            padding: '4rem 5rem',
            boxSizing: 'border-box',
        },
        topSection: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
        },
        textWrapper: {},
        subtleText: {
            color: '#65CC89', // Greenish text from screenshot
            fontWeight: '600',
            marginBottom: '1rem',
        },
        heading: {
            fontSize: '2.5rem',
            fontWeight: '100',
            lineHeight: 1.2,
            maxWidth: '800px',
            color: theme.colors.text,
        },
        ctaWrapper: {
            textAlign: 'right',
            maxWidth: '280px',
        },
        ctaText: {
            color: theme.colors.secondaryText,
            lineHeight: 1.6,
            marginBottom: '1.5rem',
        },
        demoButton: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem',
            paddingLeft: '1.5rem',
            background: '#2c2c2e',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
        },
        arrowCircle: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'white',
            color: 'black',
            marginLeft: '1rem',
        },
        cardsSectionContainer: {
            width: '100%',
            height: '500px', // Fixed height for the card area
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            marginTop: '2rem',
        },
        cardsWrapper: {
            position: 'relative',
            width: '100%',
            height: '100%',
        },
    };

    return (
        <main style={styles.heroContainer}>
            <div style={styles.heroFrame}>
                {/* --- TOP SECTION: Text and CTA Button --- */}
                <div style={styles.topSection}>
                    <div style={styles.textWrapper}>
                        <p style={styles.subtleText}>DIGITAL BANKING</p>
                        <h1 style={styles.heading}>
  We craft the <span style={{ fontWeight: 600 }}>Data Driven strategies </span> that turn online presence into profit
</h1>
                    </div>
                    <div style={styles.ctaWrapper}>
                        <p style={styles.ctaText}>From brand strategy to final conversion your complete digital marketing solution is right here</p>
                        <button style={styles.demoButton}>
                            Get Demo Account
                            <span style={styles.arrowCircle}><ArrowIcon /></span>
                        </button>
                    </div>
                </div>

                {/* --- BOTTOM SECTION: The Card Animations --- */}
                <div style={styles.cardsSectionContainer}>
                    <div style={styles.cardsWrapper}>
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