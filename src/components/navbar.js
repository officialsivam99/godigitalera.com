// src/components/navbar.js

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext.js'; // Import the useTheme hook

// --- SVG Icons (Self-contained) ---
const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// --- Navbar Component ---
const Navbar = () => {
    const theme = useTheme(); // Access the theme object

    // State for mobile menu visibility and responsiveness
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [hoveredLink, setHoveredLink] = useState(null);

    // Effect to handle window resizing
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { name: 'Services', href: '/services' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Blog', href: '/blog' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' }
    ];

    // --- Styles using the theme object ---
    const styles = {
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: theme.colors.background,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            zIndex: 1000,
        },
        logo: {
            fontSize: theme.fontSizes.large,
            fontWeight: 'bold',
            color: theme.colors.text,
            textDecoration: 'none',
            fontFamily: theme.fonts.heading,
        },
        navLinksContainer: {
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            gap: theme.spacing.large,
        },
        navLink: {
            textDecoration: 'none',
            color: theme.colors.text,
            fontSize: theme.fontSizes.medium,
            fontWeight: '500',
            fontFamily: theme.fonts.body,
            transition: 'color 0.3s ease',
        },
        ctaButton: {
            padding: '0.75rem 1.5rem',
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
            border: 'none',
            borderRadius: theme.borderRadius,
            cursor: 'pointer',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: theme.fontSizes.medium,
            fontFamily: theme.fonts.heading,
            transition: 'background-color 0.3s ease, transform 0.2s ease',
        },
        hamburger: {
            display: isMobile ? 'block' : 'none',
            cursor: 'pointer',
            zIndex: 1001,
        },
        mobileMenu: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.large,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(5px)',
            transition: 'transform 0.3s ease-in-out',
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            zIndex: 1000,
        },
        mobileNavLink: {
            fontSize: theme.fontSizes.large,
            color: theme.colors.text,
            textDecoration: 'none',
            fontWeight: 'bold',
            fontFamily: theme.fonts.heading,
        }
    };

    return (
        <nav style={styles.navbar}>
            <a href="/" style={styles.logo}>Growth Co.</a>

            {/* Desktop Navigation */}
            <div style={styles.navLinksContainer}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        style={{
                            ...styles.navLink,
                            color: hoveredLink === link.name ? theme.colors.primary : theme.colors.text
                        }}
                        onMouseEnter={() => setHoveredLink(link.name)}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        {link.name}
                    </a>
                ))}
                <a
                    href="/get-quote"
                    style={styles.ctaButton}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Get a Free Quote
                </a>
            </div>

            {/* Hamburger Icon */}
            <div style={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </div>

            {/* Mobile Menu */}
            {isMobile && (
                <div style={styles.mobileMenu}>
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}
                    <a href="/get-quote" style={{ ...styles.ctaButton, fontSize: theme.fontSizes.large }}>
                        Get a Free Quote
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;