import React from 'react';
import HeroSection from './LandingPage/herosection.js';
import ServicesSection from './LandingPage/ServicesSection.js';
import CaseStudiesSection from './LandingPage/CaseStudiesSection.js';
import ProcessSection from './LandingPage/ProcessSection.js';
import ContactSection from './LandingPage/ContactSection.js';
import PostHeroSection from './LandingPage/PostHeroContent.js';


const LandingPage = () => {
    return (
        <div>
            <HeroSection />
            <PostHeroSection />
            {/* <ServicesSection /> */}
            <CaseStudiesSection />
            <ProcessSection />
            {/* <ContactSection /> */}
        </div>
    );
};

export default LandingPage;