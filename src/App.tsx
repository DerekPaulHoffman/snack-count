import React, { useState } from 'react';
import ImageFallingContainer from './ImageFallingContainer';
import ImageCatcher from './ImageCatcher';

const App: React.FC = () => {
    const [score, setScore] = useState(0);
    const [missed, setMissed] = useState(0);

    const handleCatch = () => {
        setScore((prevScore) => prevScore + 1);
    };

    const handleMiss = () => {
        setMissed((prevMissed) => prevMissed + 1);
        if (missed >= 9) {
            // Game over, show the number of caught images
            console.log(`Game Over!\nYou caught ${score} images.`);
        }
    };

    return (
        <div>
            <p>Images Caught: {score}</p>
            <ImageFallingContainer imageUrl="churro.png" onCaught={handleCatch} onMiss={handleMiss} />
            <ImageCatcher />
        </div>
    );
};

export default App;
