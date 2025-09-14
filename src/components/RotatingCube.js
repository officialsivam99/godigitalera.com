// src/components/RotatingCube.js

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext.js';

const RotatingCube = () => {
    const theme = useTheme();
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // This effect adds/removes a global mousemove listener
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Map mouse X position (0 to window.innerWidth) to a 360-degree rotation
            const rotateY = (e.clientX / window.innerWidth - 0.5) * 360; // -0.5 to center it
            // Map mouse Y position (0 to window.innerHeight) to a 180-degree rotation
            const rotateX = -(e.clientY / window.innerHeight - 0.5) * 180; // Invert for intuitive rotation

            setRotation({ x: rotateX, y: rotateY });
        };

        if (isHovered) {
            window.addEventListener('mousemove', handleMouseMove);
        } else {
            // Smoothly reset rotation when not hovered
            setRotation({ x: 0, y: 0 });
        }

        // Cleanup function to remove the listener when the component unmounts or hover ends
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHovered]); // Rerun this effect whenever isHovered changes

    // --- All styles and portfolio data below remain the same ---
    const cubeSize = 360;
    const halfSize = cubeSize / 2;

    const portfolioItems = [
        { id: 'face1', title: 'SEO Strategy', image: `https://via.placeholder.com/120x120/28a745/FFFFFF?text=SEO` },
        { id: 'face2', title: 'PPC Ads', image: `https://via.placeholder.com/120x120/007bff/FFFFFF?text=PPC` },
        { id: 'face3', title: 'Social Media', image: `https://via.placeholder.com/120x120/dc3545/FFFFFF?text=SM` },
        { id: 'face4', title: 'Content Marketing', image: `https://via.placeholder.com/120x120/ffc107/000000?text=CM` },
        { id: 'face5', title: 'Email Marketing', image: `https://via.placeholder.com/120x120/6f42c1/FFFFFF?text=EM` },
        { id: 'face6', title: 'Analytics', image: `https://via.placeholder.com/120x120/17a2b8/FFFFFF?text=AR` },
    ];

    const styles = {
        cubeContainer: {
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            perspective: '1000px',
            position: 'relative',
        },
        cube: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s ease-out', // For smooth reset
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        },
        face: {
            position: 'absolute',
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            border: `2px solid ${theme.colors.darkGradientEnd}`,
            background: 'rgba(255, 255, 255, 0.05)',
            boxShadow: `inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 15px rgba(0, 0, 0, 0.5)`,
            backdropFilter: 'blur(3px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: theme.colors.white,
            textAlign: 'center',
            padding: theme.spacing.small,
            boxSizing: 'border-box',
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0))`,
        },
        faceContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing.xsmall,
        },
        faceImage: {
            width: '120px',
            height: '120px',
            borderRadius: '10px',
            objectFit: 'cover',
            marginBottom: theme.spacing.small,
            border: `2px solid rgba(255, 255, 255, 0.1)`,
        },
        faceTitle: {
            fontSize: theme.fontSizes.large,
            fontWeight: 700,
            marginBottom: theme.spacing.small,
        },
        faceDescription: {
            fontSize: theme.fontSizes.small,
            color: theme.colors.secondary,
            lineHeight: 1.4,
            maxWidth: '240px',
        },
        front: { transform: `rotateY(0deg) translateZ(${halfSize}px)` },
        back: { transform: `rotateY(180deg) translateZ(${halfSize}px)` },
        right: { transform: `rotateY(90deg) translateZ(${halfSize}px)` },
        left: { transform: `rotateY(-90deg) translateZ(${halfSize}px)` },
        top: { transform: `rotateX(90deg) translateZ(${halfSize}px)` },
        bottom: { transform: `rotateX(-90deg) translateZ(${halfSize}px)` },
    };

    const faceTransforms = [
        styles.front, styles.back, styles.right, styles.left, styles.top, styles.bottom
    ];

    return (
        <div 
            style={styles.cubeContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={styles.cube}>
                {portfolioItems.map((item, index) => (
                    <div 
                        key={item.id} 
                        style={{ ...styles.face, ...faceTransforms[index] }}
                    >
                        <div style={styles.faceContent}>
                            <img src={item.image} alt={item.title} style={styles.faceImage} />
                            <div style={styles.faceTitle}>{item.title}</div>
                            <div style={styles.faceDescription}>{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RotatingCube;