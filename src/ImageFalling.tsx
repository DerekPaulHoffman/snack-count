import React, { useState, useEffect } from 'react';
import random from 'random';

interface ImageFallingProps {
    imageUrl: string;
    onCaught: () => void;
    onMiss: () => void;
}

const ImageFalling: React.FC<ImageFallingProps> = ({ imageUrl, onCaught, onMiss }) => {
    const [top, setTop] = useState(-50);
    const [left, setLeft] = useState(random.int(0, window.innerWidth - 50));
    const [catcherX, setCatcherX] = useState(window.innerWidth / 2 - 25);
    const catcherY = window.innerHeight - 50; // The catcher is fixed to the bottom of the screen
    const catcherWidth = 50; // Width of the catcher image

    useEffect(() => {
        const moveAndCheckCollision = () => {
            setTop((prevTop) => prevTop + 5);

            // Calculate the positions of the catcher and the falling image
            const catcherLeft = catcherX;
            const catcherRight = catcherX + catcherWidth;
            const catcherTop = catcherY;
            const catcherBottom = catcherY + 50;
            const imageRight = left + 50;
            const imageBottom = top + 50;

            // Check for collision
            if (
                left <= catcherRight &&
                imageRight >= catcherLeft &&
                top <= catcherBottom &&
                imageBottom >= catcherTop
            ) {
                // Collision occurred, increase the score
                onCaught();
                setTop(-50);
                setLeft(random.int(0, window.innerWidth - 50));
            }

            if (top >= window.innerHeight) {
                onMiss();
                setTop(-50);
                setLeft(random.int(0, window.innerWidth - 50));
            }
        };

        const interval = setInterval(moveAndCheckCollision, 50);
        return () => clearInterval(interval);
    }, [left, onCaught, onMiss, top]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCatcherX(e.clientX - 25);
        };

        // Attach mousemove event listener to the document
        document.addEventListener('mousemove', handleMouseMove);

        // Clean up the event listener when the component unmounts
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <img
                src={imageUrl}
                alt="Falling Image"
                style={{ position: 'absolute', top: `${top}px`, left: `${left}px`, width: '50px' }}
            />
        </>
    );
};

export default ImageFalling;
