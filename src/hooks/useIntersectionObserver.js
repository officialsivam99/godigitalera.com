import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // When the element is intersecting the viewport
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                // Stop observing the element once it has become visible
                observer.unobserve(entry.target);
            }
        }, options);

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        // Cleanup function to unobserve the element
        return () => {
            if (elementRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(elementRef.current);
            }
        };
    }, [options]);

    return [elementRef, isIntersecting];
};