import React, { useState } from 'react';
import { useTheme } from '../../components/ThemeContext.js';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

// --- Icons for the "Why Us" section ---
import { FaUsersCog, FaFileSignature, FaTrophy } from 'react-icons/fa';

const whyData = [
    { icon: <FaUsersCog />, title: 'Dedicated Experts', description: 'You get a specialized team, not generalists. We live and breathe our respective channels to deliver unparalleled expertise.' },
    { icon: <FaFileSignature />, title: 'Transparent Reporting', description: 'No black boxes. You get clear, concise reports that show you exactly what’s working, why it’s working, and what’s next.' },
    { icon: <FaTrophy />, title: 'Proven Results', description: 'Our track record speaks for itself. We are a results-obsessed agency laser-focused on delivering a tangible return on your investment.' },
];

const ContactSection = () => {
    const theme = useTheme();
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
    const [isInputFocused, setInputFocused] = useState(false);

    const styles = {
        section: {
            padding: '120px 5vw',
            backgroundColor: theme.colors.background,
            textAlign: 'center',
        },
        // --- Styles for the "Why Partner With Us?" grid ---
        whyGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto 8rem auto', // Increased bottom margin
            textAlign: 'left',
        },
        whyItem: {
            background: 'transparent',
            padding: '2rem',
            borderRadius: theme.borderRadius,
            border: `1px solid ${theme.colors.border}`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        },
        iconWrapper: {
            width: '40px',
            height: '40px',
            marginBottom: '1.5rem',
            color: theme.colors.primary,
        },
        cardTitle: {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: theme.colors.black,
            marginBottom: '1rem',
        },
        cardDescription: {
            fontSize: '1rem',
            lineHeight: 1.6,
            color: theme.colors.secondary,
        },
        // --- Styles for the final CTA ---
        headingWrapper: {
            overflow: 'hidden', // For the reveal animation
        },
        heading: {
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            color: theme.colors.black,
            maxWidth: '900px',
            margin: '0 auto 1.5rem auto',
            lineHeight: 1.2,
            transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
        },
        subheading: {
            color: theme.colors.secondary,
            fontSize: '1.2rem',
            marginBottom: '3rem',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease-out 0.4s', // Delayed fade-in
        },
        // --- Styles for the form ---
        form: {
            display: 'flex',
            gap: '1rem',
            maxWidth: '600px',
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease-out 0.6s', // Delayed fade-in
        },
        input: {
            flex: 1,
            minWidth: '250px',
            padding: '1rem 1.25rem',
            fontSize: '1rem',
            backgroundColor: theme.colors.lightGray,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: '12px',
            color: theme.colors.text,
            outline: 'none',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        },
        inputFocused: {
            borderColor: theme.colors.primary,
            boxShadow: `0 0 0 3px ${theme.colors.cardShadow}`,
        },
        ctaButton: {
            padding: '1rem 2.5rem',
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            transition: 'transform 0.2s ease',
        },
    };

    return (
        <section ref={sectionRef} style={styles.section}>
            <h2 style={{...styles.heading, fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '4rem', transform: 'none', transition: 'none'}}>Why Partner With Us?</h2>
            <div style={styles.whyGrid}>
                {whyData.map((item, index) => (
                    <div key={index} style={{...styles.whyItem, transitionDelay: `${index * 150}ms`}}>
                        <div style={styles.iconWrapper}>{React.cloneElement(item.icon, {style: {width: '100%', height: '100%'}})}</div>
                        <h3 style={styles.cardTitle}>{item.title}</h3>
                        <p style={styles.cardDescription}>{item.description}</p>
                    </div>
                ))}
            </div>

            <div style={styles.headingWrapper}>
                <h2 style={styles.heading}>Let's Build Your Brand's Future, Together.</h2>
            </div>
            <p style={styles.subheading}>Ready to start a project? We'd love to hear from you.</p>
            
            <form style={styles.form}>
                <input 
                    type="email" 
                    placeholder="Your Email Address" 
                    style={{...styles.input, ...(isInputFocused ? styles.inputFocused : {})}}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                />
                <button type="submit" style={styles.ctaButton}>Get In Touch</button>
            </form>
        </section>
    );
};

export default ContactSection;