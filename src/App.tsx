import React, { useState, useEffect } from 'react';
import ImageFallingContainer from './ImageFallingContainer';
import ImageCatcher from './ImageCatcher';
import './App.css';

const App: React.FC = () => {
    const [score, setScore] = useState(0);
    const [missed, setMissed] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        console.log(`missed ${missed}`);
        if (missed >= 9) {
            // Game over, show the number of caught images
            setGameOver(true);
        }
    }, [missed]);

    const handleCatch = () => {
        setScore((prevScore) => prevScore + 1);
    };

    const handleMiss = () => {
        const maxMisses = 9;
        const remainingMisses = maxMisses - (missed + 1);

        if (remainingMisses <= 0) {
            setGameOver(true);
        } else {
            setMissed((prevMissed) => prevMissed + 1);
        }
    };


    const resetGame = () => {
        setScore(0);
        setMissed(0);
        setGameOver(false);
    };
    const imageUrls = ["png-clipart-butter-butter.png", "churros-with-sugar.png", "hostess.webp"]; // Add all the image URLs here



    return (
        <div className="container hide-cursor">
            {gameOver ? (
                <div className="overlay">
                    <div>
                        <p>Game Over!</p>
                        <p>You Caught {score} Snacks!.</p>
                        <div  onClick={resetGame} className="play-again-button">
                            Play Again
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="counter-container">
                        <div
                            className={`snacks-caught ${score >= 10 ? 'high-score' : ''} ${
                                score >= 25 ? 'high-score-25' : ''
                            } ${score >= 50 ? 'high-score-50' : ''} ${score >= 75 ? 'high-score-75' : ''} ${
                                score >= 100 ? 'high-score-100' : ''
                            } ${score >= 125 ? 'high-score-125' : ''} ${
                                score >= 150 ? 'high-score-150' : ''
                            } ${score >= 175 ? 'high-score-175' : ''} ${
                                score >= 200 ? 'high-score-200' : ''
                            } ${score >= 225 ? 'high-score-225' : ''} ${
                                score >= 250 ? 'high-score-250' : ''
                            }`}
                        >
                            Snacks Caught: {score}
                        </div>
                        <div
                            className={`missed-snacks ${missed >= 5 ? 'high-missed' : ''} ${
                                missed >= 8 ? 'game-over' : ''
                            }`}
                        >
                            Missed Snacks: {9 - missed} left
                        </div>
                    </div>
                    <ImageFallingContainer imageUrls={imageUrls} onCaught={handleCatch} onMiss={handleMiss} />
                    <ImageCatcher />
                </>
            )}
        </div>
    );
};

export default App;
