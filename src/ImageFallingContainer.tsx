import React, { useState, useEffect } from 'react';
import random from 'random';
import ImageFalling from './ImageFalling';

interface ImageFallingContainerProps {
    imageUrl: string;
    onCaught: () => void;
    onMiss: () => void;
}

const ImageFallingContainer: React.FC<ImageFallingContainerProps> = ({ imageUrl, onCaught, onMiss }) => {
    const [images, setImages] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const spawnImage = () => {
            setImages((prevImages) => [
                ...prevImages,
                <ImageFalling
                    key={prevImages.length}
                    imageUrl={imageUrl}
                    onCaught={onCaught}
                    onMiss={onMiss}
                />,
            ]);
        };

        const interval = setInterval(spawnImage, random.int(1000, 5000));

        return () => clearInterval(interval);
    }, [imageUrl, onCaught, onMiss]);

    return <>{images}</>;
};

export default ImageFallingContainer;
