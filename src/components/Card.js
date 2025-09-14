import React from 'react';
import { useTheme } from './ThemeContext.js';

const Card = ({ data, isActive, isPrevious }) => {
    const theme = useTheme();

    const styles = {
        card: {
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            padding: '2rem',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            color: theme.colors.text,
            background: data.gradient,
            position: 'relative',
            overflow: 'hidden',
        },
        activeContent: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.4s ease 0.4s',
        },
        cardTitle: { 
            fontSize: '2rem', 
            fontWeight: '600', 
            marginBottom: '1rem' 
        },
        cardDescription: { 
            fontSize: '1.1rem', 
            maxWidth: '250px', 
            lineHeight: 1.5 
        },
        previousTabTitle: {
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: '1.8rem',
            fontWeight: '600',
            opacity: 0.6,
            margin: '0 auto',
            padding: '1rem 0',
            transition: 'opacity 0.4s ease',
        },
    };

    return (
        <div style={styles.card}>
            {isPrevious ? (
                <span style={styles.previousTabTitle}>{data.title}</span>
            ) : (
                <div style={styles.activeContent}>
                    <div>
                        <h2 style={styles.cardTitle}>{data.title}</h2>
                        <p style={styles.cardDescription}>{data.description}</p>
                    </div>
                    {/* Unique UI elements for the card would be animated here */}
                </div>
            )}
        </div>
    );
};

export default Card;