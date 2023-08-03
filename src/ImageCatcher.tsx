import React, { useRef, useEffect } from 'react';

const ImageCatcher: React.FC = () => {
    const catcherRef = useRef<HTMLImageElement>(null);
    const catcherY = window.innerHeight - 50; // The catcher is fixed to the bottom of the screen

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (catcherRef.current) {
                const catcherWidth = 50; // Assuming the catcher image has a width of 50px
                catcherRef.current.style.left = `${e.clientX - catcherWidth / 2}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <img
            ref={catcherRef}
            src="jason.jpeg"
            alt="Catcher Image"
            style={{ position: 'fixed', bottom: '0', left: '0', width: '50px' }}
        />
    );
};

export default ImageCatcher;
