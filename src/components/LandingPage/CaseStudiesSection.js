import React, { useState } from 'react';
import { useTheme } from '../ThemeContext.js';// Assuming useTheme is also a hook
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver.js';

const caseStudiesData = [
    { 
        title: 'Global Tech Inc.',
        description: 'How we scaled organic traffic and generated enterprise leads through a comprehensive SEO and content strategy.',
        category: 'SEO & Enterprise Content',
        image: 'https://cdn.dribbble.com/userupload/44440072/file/bbdb6c7f3a9c25b5b1194ffe2609df20.png?resize=1024x768&vertical=center',
        result: '+316% Organic Traffic'
    },
    { 
        title: 'Luxe Fashion Co.',
        description: 'Achieved a 5.2x Return On Ad Spend (ROAS) by restructuring their Google & Meta ad campaigns with a creative-first approach.',
        category: 'Paid Advertising (PPC)',
        image: 'https://cdn.dribbble.com/userupload/16658133/file/original-3bf22dfd76b188dcfc68b59b61bddf18.png?resize=1024x768&vertical=center',
        result: '5.2x Return On Ad Spend'
    },
];

// --- HELPER COMPONENT: DEFINED ONLY ONCE, BEFORE IT'S USED ---
const CaseStudyItem = ({ study, index, children }) => {
    const theme = useTheme();
    const [itemRef, isVisible] = useIntersectionObserver({ threshold: 0.3 });
    const [hovered, setHovered] = useState(false);
    
    const isEven = index % 2 === 0;

    const styles = {
        studyItem: {
            display: 'flex', alignItems: 'center', gap: '4rem',
            marginBottom: '6rem', flexWrap: 'wrap',
            flexDirection: isEven ? 'row' : 'row-reverse',
        },
        imageWrapper: {
            flex: 1.2, minWidth: '320px', height: '450px',
            borderRadius: theme.borderRadius, overflow: 'hidden', position: 'relative',
            transform: isVisible ? 'translateX(0)' : (isEven ? 'translateX(-50px)' : 'translateX(50px)'),
            opacity: isVisible ? 1 : 0,
            transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
        },
        image: {
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
        },
        overlay: {
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
        },
        imageText: {
            position: 'absolute', bottom: '2rem', left: '2rem', color: theme.colors.white,
        },
        textWrapper: {
            flex: 1, minWidth: '320px', color: theme.colors.secondary,
            transform: isVisible ? 'translateX(0)' : (isEven ? 'translateX(50px)' : 'translateX(-50px)'),
            opacity: isVisible ? 1 : 0,
            transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
            transitionDelay: '200ms',
        },
        title: {
            fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 600,
            color: theme.colors.text, marginBottom: '1.5rem', lineHeight: 1.3,
        },
        link: {
            color: theme.colors.primary, textDecoration: 'none',
            fontWeight: 600, fontSize: '1.1rem',
        },
    };
    
    return (
        <div ref={itemRef} style={styles.studyItem}>
            <div 
                style={styles.imageWrapper}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <img src={study.image} alt={study.title} style={styles.image} />
                <div style={styles.overlay}></div>
                <div style={styles.imageText}>
                    <p style={{fontWeight: 600}}>{study.category}</p>
                </div>
            </div>
            <div style={styles.textWrapper}>
                <h3 style={styles.title}>{study.title}</h3>
                <p style={{color: theme.colors.secondary, marginBottom: '2rem', lineHeight: 1.7}}>{study.description}</p>
                {children}
                <a href="#" style={{...styles.link, display: 'inline-block', marginTop: '2rem'}}>Explore the Project →</a>
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---
const CaseStudiesSection = () => {
    const theme = useTheme();
    const [testimonialRef, isVisible] = useIntersectionObserver({ threshold: 0.5 });

    const styles = {
        section: { padding: '120px 5vw', backgroundColor: theme.colors.cardBackground },
        heading: {
            textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 700, marginBottom: '4rem', color: theme.colors.text,
        },
        testimonialSection: {
            maxWidth: '900px', margin: '8rem auto 0 auto', padding: '4rem',
            textAlign: 'center', backgroundColor: theme.colors.background,
            borderRadius: theme.borderRadius, border: `1px solid ${theme.colors.border}`,
            opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
        },
        quote: {
            fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 500,
            lineHeight: 1.4, color: theme.colors.text, marginBottom: '2rem',
        },
        author: {
            fontSize: '1rem', fontWeight: 600, color: theme.colors.primary,
        },
        authorTitle: {
            fontSize: '0.9rem', color: theme.colors.secondary,
        }
    };

    return (
        <section style={styles.section}>
            <h2 style={styles.heading}>Our Impact, in Numbers</h2>
            {caseStudiesData.map((study, index) => (
                <CaseStudyItem key={index} study={study} index={index}>
                    <div style={{marginTop: '2rem'}}>
                        <div style={{fontSize: '2.5rem', fontWeight: 700, color: theme.colors.primary, lineHeight: 1}}>{study.result}</div>
                        <div style={{fontSize: '1rem', color: theme.colors.secondary}}>Key Metric</div>
                    </div>
                </CaseStudyItem>
            ))}

            <div ref={testimonialRef} style={styles.testimonialSection}>
                <p style={styles.quote}>“Working with them was a game-changer. Their strategic approach not only boosted our traffic but fundamentally improved our lead quality.”</p>
                <div>
                    <p style={styles.author}>Jane Doe</p>
                    <p style={styles.authorTitle}>CMO, Global Tech Inc.</p>
                </div>
            </div>
        </section>
    );
};

export default CaseStudiesSection;