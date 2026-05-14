// Router import
import { Routes, Route, Link } from "react-router-dom";

// Hook import
import { useState } from "react";

// Module import
import words from "./christmas_words";

function Nav() {
    return (
        <div className="nav">

            {/* Routes */}
            <Link to="/">Home</Link> |{" "}
            <Link to="/game">Game</Link> |{" "}
            <Link to="/results">Results</Link>

        </div>
    );
}

// Component
function Home() {
    return (
        <div className="page">

            {/* JSX */}
            <h1>🎄 Christmas Scramble 🎄</h1>

            <p>Guess the scrambled Christmas words!</p>

            <Nav />

        </div>
    );
}

// Component
function Game() {

    // Hooks
    const [index, setIndex] = useState(0);
    const [guess, setGuess] = useState("");
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");

    // Array access
    const current = words[index];

    // Event handler
    function checkAnswer() {

        let newScore = score;

        if (guess.toUpperCase() === current.answer) {

            newScore = score + 1;

            setScore(newScore);

            setMessage("Correct!");

        } else {

            setMessage("Wrong!");
        }

        setGuess("");

        if (index + 1 < words.length) {

            setIndex(index + 1);

        } else {

            // Local storage
            localStorage.setItem("score", newScore);

            // Route change
            window.location.href = "/results";
        }
    }

    return (
        <div className="page">

            <h2>Score: {score}</h2>

            {/* JSX loop */}
            <div className="tiles">

                {current.scrambled.split("").map((letter, i) => (

                    <div key={i} className="tile">
                        {letter}
                    </div>

                ))}

            </div>

            <p>{current.clue}</p>

            {/* Form input */}
            <input
                value={guess}

                onChange={(e) => setGuess(e.target.value)}

                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        checkAnswer();
                    }
                }}
            />

            <br />

            {/* Click event */}
            <button onClick={checkAnswer}>
                Submit
            </button>

            <p>{message}</p>

            <Nav />

        </div>
    );
}

// Component
function Results() {

    // Storage access
    const score = localStorage.getItem("score");

    return (
        <div className="page">

            <h1>🎉 Results 🎉</h1>

            <h2>Your Score: {score !== null ? score : 0}</h2>

            {/* Reset score */}
            <button
                onClick={() => {
                    localStorage.setItem("score", 0);
                    window.location.href = "/game";
                }}
            >
                Play Again
            </button>

            <Nav />

        </div>
    );
}

// Main component
function App() {

    return (

        // React Routes
        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/game" element={<Game />} />

            <Route path="/results" element={<Results />} />

        </Routes>
    );
}

export default App;