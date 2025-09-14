import React from 'react';
import { useTheme } from './ThemeContext.js';

// ArrowIcon is no longer needed as the button is removed
// const ArrowIcon = () => ( ... );

const FeatureCard = ({ data, isActive, isPrevious }) => { // REMOVED: onNext prop
    const theme = useTheme();

    const styles = {
        card: {
            width: '100%',
            height: '80%',
            borderRadius: '24px',
            padding: '2rem',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
            // REMOVED: cursor: 'pointer' is not needed
        },
        overlay: {
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)',
            zIndex: 1,
        },
        contentContainer: {
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        activeContent: {
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s',
        },
        cardDescription: { fontSize: '1.1rem', maxWidth: '300px', lineHeight: 1.5, marginBottom: '2rem' },
        uiMockup: {
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        },
        tabTitle: {
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: '2rem',
            fontWeight: '600',
            textAlign: 'center',
            margin: '0 auto',
            opacity: isActive ? 0 : 1,
            transition: 'opacity 0.5s ease',
        },
    };

    return (
        // --- KEY CHANGE: onClick handler is REMOVED from this div ---
        <div style={{ ...styles.card, backgroundImage: `url(${data.bgImage})` }}>
            <div style={styles.overlay}></div>
            <div style={styles.contentContainer}>
                {!isActive ? (
                    <h2 style={styles.tabTitle}>{data.title}</h2>
                ) : (
                    <>
                        <div style={styles.activeContent}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>{data.title}</h2>
                            <p style={styles.cardDescription}>{data.description}</p>
                        </div>
                        <img src={data.uiImage} alt={`${data.title} UI`} style={{...styles.uiMockup, ...styles.activeContent}}/>
                        {/* The button is completely removed */}
                    </>
                )}
            </div>
        </div>
    );
};

export default FeatureCard;