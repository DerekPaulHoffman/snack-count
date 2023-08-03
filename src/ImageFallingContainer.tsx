import React, { useState, useEffect } from 'react';
import random from 'random';
import ImageFalling from './ImageFalling';

interface ImageFallingContainerProps {
    imageUrls: string[]; // Array of image URLs
    onCaught: () => void;
    onMiss: () => void;
}

const ImageFallingContainer: React.FC<ImageFallingContainerProps> = ({ imageUrls, onCaught, onMiss }) => {
    const [images, setImages] = useState<JSX.Element[]>([]);
    const [intervalDuration, setIntervalDuration] = useState(2000); // Initial interval duration

    useEffect(() => {
        const spawnImage = () => {
            // Choose a random image URL from the array
            const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

            setImages((prevImages) => [
                ...prevImages,
                <ImageFalling
                    key={prevImages.length}
                    imageUrl={randomImageUrl}
                    onCaught={onCaught}
                    onMiss={onMiss}
                />,
            ]);

            // Decrease the interval duration slightly every second
            setIntervalDuration((prevDuration) => Math.max(prevDuration - 100, 500));
        };

        const interval = setInterval(spawnImage, intervalDuration);

        return () => clearInterval(interval);
    }, [imageUrls, onCaught, onMiss, intervalDuration]);

    return <>{images}</>;
};

export default ImageFallingContainer;
