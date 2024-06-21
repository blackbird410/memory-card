import { useState } from "react";
import "./App.css";

// Save the new pictures with their respective names
// so that we can use their paths without hardcoding it
// P.S: Filetype used is jpg
const characters = [
  "Gojo Satoru",
  "Gon Freecss",
  "Sasuke Uchiha",
  "Naruto Uzumaki",
  "Neji Hyuga",
];

function Card({ card, handleUpdateScore }) {
  return (
    <div
      className="card-wrapper"
      id={card.name}
      onClick={() => handleUpdateScore()}
    >
      <img src={card.url} alt={card.name} />
      <div className="card-name">{card.name}</div>
    </div>
  );
}

function CardBoard({ list = {}, score, bestScore, handleUpdateScore }) {
  return (
    <div className="main">
      <div className="header">
        <div id="game-title">Memory Card</div>
        <div id="game-description">
          The game is simple, try not to click the same card twice to get the
          increase your score. Let's see how good is your memory!
        </div>
        <div id="game-status">
          <label for="score">Score: {score}</label>
          <label for="best-score">Best Score: {bestScore}</label>
        </div>
      </div>
      <div classname="board">
        {
                    list.map((e) => (
                        <Card 
                            key={e.name} 
                            card={e} 
                            handleUpdateScore={handleUpdateScore} 
                        />
        ))}
      </div>
    </div>
  );
}

function App() {
  const cardList = characters.map((c) => {
    const parts = c.toLowerCase().split(" ");
    return { name: c, url: `${parts.join("-")}.jpg` };
  });

  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleUpdateScore = (e) => {
    const cardName = e.target.id;

    // If the card was not already seen score is incremented, otherwise becomes 0
    if (cards.includes(cardName)) {
      // You lost => Reset game
      setScore(0);
      setCards([]);
    } else {
      setScore(score + 1);
      setCards([...cards, cardName]);
      setBestScore(score > bestScore ? score : bestScore);
    }
  };

  return (
    <>
      <CardBoard
        list={cardList}
        score={score}
        bestScore={bestScore}
        handleUpdateScore={handleUpdateScore}
      />
    </>
  );
}

export default App;
