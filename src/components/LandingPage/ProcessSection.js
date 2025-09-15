import React from 'react';
import { useTheme } from '../ThemeContext.js';

const processData = [
    { number: '01', title: 'Discovery & Strategy', description: 'We start by understanding your brand, audience, and goals to create a tailored strategy.' },
    { number: '02', title: 'Implementation', description: 'Our experts execute the plan, from technical SEO to creating compelling ad campaigns.' },
    { number: '03', title: 'Optimization & Growth', description: 'We continuously monitor performance, analyze data, and optimize for even better results.' },
     { number: '03', title: 'Optimization & Growth', description: 'We continuously monitor performance, analyze data, and optimize for even better results.' },
];

const ProcessSection = () => {
    const theme = useTheme();

    const styles = {
        section: {
            padding: '120px 5vw',
            backgroundColor: theme.colors.background,
        },
        heading: {
            textAlign: 'center',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 700,
            marginBottom: '4rem',
            color: theme.colors.text,
        },
        timeline: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            backgroundColor: theme.colors.border,
            maxWidth: '1200px', 
            margin: '5rem auto 0 auto',
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius,
            overflow: 'hidden',
        },
        timelineItem: {
            backgroundColor: theme.colors.background,
            padding: '3rem 2rem',
        },
        number: {
            fontSize: '3rem', 
            fontWeight: 700, 
            color: theme.colors.primary,
            marginBottom: '1.5rem',
        },
        title: {
            fontSize: '1.8rem', 
            fontWeight: 600, 
            color: theme.colors.text,
            marginBottom: '1rem',
        },
        description: {
            fontSize: '1rem',
            lineHeight: 1.6,
            color: theme.colors.secondary,
        },
    };

    return (
        <section style={styles.section}>
            <h2 style={styles.heading}>Our Blueprint for Success</h2>
            <div style={styles.timeline}>
                {processData.map((item, index) => (
                    <div key={index} style={styles.timelineItem}>
                        <p style={styles.number}>{item.number}</p>
                        <h3 style={styles.title}>{item.title}</h3>
                        <p style={styles.description}>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProcessSection;