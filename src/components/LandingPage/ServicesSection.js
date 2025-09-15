import React, { useState } from 'react';
import { useTheme } from '../ThemeContext.js';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { FaChartLine, FaBullhorn, FaUsers, FaPenNib, FaCode, FaChartPie } from 'react-icons/fa';


const servicesData = [
    { icon: <FaChartLine />, title: 'SEO & Organic Growth', description: 'Dominate search rankings and drive consistent, high-quality organic traffic with our comprehensive SEO strategies.' },
    { icon: <FaBullhorn />, title: 'Paid Advertising (PPC)', description: 'Achieve immediate impact and measurable ROI with expert-managed campaigns across Google, Meta, and LinkedIn.' },
    { icon: <FaUsers />, title: 'Social Media Marketing', description: 'Build and nurture a loyal community by creating engaging content that elevates your brand and connects with your audience.' },
    { icon: <FaPenNib />, title: 'Content & Brand Strategy', description: 'Your story, powerfully told. We develop content that not only ranks but also resonates, establishing your authority.' },
    { icon: <FaCode />, title: 'Web Design & Development', description: 'We design and build fast, beautiful, and conversion-optimized websites that deliver exceptional user experiences.' },
    { icon: <FaChartPie />, title: 'Data & Analytics', description: 'Turn data into decisions. We provide clear, actionable insights through advanced analytics and transparent reporting.' },
];

const ServicesSection = () => {
    const theme = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    const styles = {
        section: {
            padding: '120px 5vw',
            backgroundColor: theme.colors.background, // Dark background
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
        },
        gridBackground: {
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `linear-gradient(${theme.colors.border} 1px, transparent 1px), linear-gradient(to right, ${theme.colors.border} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.1,
            zIndex: 0,
        },
        content: {
            position: 'relative',
            zIndex: 1,
        },
        heading: {
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: theme.colors.black, // --- FIX: Use white text for high contrast
            marginBottom: '1rem',
        },
        subheading: {
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: theme.colors.secondary, // --- FIX: Use secondary light grey text
            maxWidth: '700px',
            margin: '0 auto 5rem auto',
            lineHeight: 1.7,
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        card: {
            background: theme.colors.lightGray,
            padding: '2.5rem',
            borderRadius: theme.borderRadius,
            textAlign: 'left',
            position: 'relative',
            border: `1px solid ${theme.colors.border}`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            overflow: 'hidden',
        },
        cardHoverEffect: {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: theme.borderRadius,
            padding: '1px',
            background: `linear-gradient(135deg, ${theme.colors.primary}, transparent)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: hoveredIndex !== null ? 1 : 0,
            transition: 'opacity 0.3s ease',
        },
        iconWrapper: {
            width: '40px',
            height: '40px',
            marginBottom: '1.5rem',
            color: theme.colors.primary, // --- FIX: Use primary theme color for icons
        },
        cardTitle: {
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: "black" // --- FIX: Use white text for card titles
        },
        cardDescription: {
            fontSize: '1rem',
            lineHeight: 1.6,
            color: theme.colors.secondary, // --- FIX: Use secondary light grey text
        },
    };

    return (
        <section ref={sectionRef} style={styles.section}>
            <div style={styles.gridBackground}></div>
            <div style={styles.content}>
                <h2 style={styles.heading}>Our Capabilities</h2>
                <p style={styles.subheading}>We are a full-service agency, which means we’ve got you covered from strategy to execution. Here’s how we drive growth.</p>
                <div style={styles.grid}>
                    {servicesData.map((service, index) => (
                        <div 
                            key={index} 
                            style={{
                                ...styles.card, 
                                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div style={{...styles.cardHoverEffect, opacity: hoveredIndex === index ? 1 : 0 }}></div>
                            <div style={{position: 'relative', zIndex: 2}}>
                                <div style={styles.iconWrapper}>{React.cloneElement(service.icon, {style: {width: '100%', height: '100%'}})}</div>
                                <h3 style={styles.cardTitle}>{service.title}</h3>
                                <p style={styles.cardDescription}>{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
