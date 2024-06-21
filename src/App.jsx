import { useState, useEffect } from "react";
import "./App.css";
import gojo from "./assets/Gojo Satoru.jpg";
import aoi from "./assets/Aoi Todo.jpg";
import megumi from "./assets/Megumi Fushiguro.jpg";
import toji from "./assets/Toji Fushiguro.jpg";
import yuta from "./assets/Yuta Okkotsu.jpg";
import maki from "./assets/Maki Zenin.jpg";
import mai from "./assets/Mai Zenin.jpg";
import geto from "./assets/Suguru Geto.jpg";
import kugisaki from "./assets/Nobara Kugisaki.jpg";
import yuji from "./assets/Itadori Yuji.jpg";
import sukuna from "./assets/Ryomen Sukuna.jpg";

const characters = [
  { name:  "Gojo Satoru", url: gojo },
  { name:  "Aoi Todo", url: aoi  },
  { name:  "Itadori Yuji", url: yuji },
  { name:  "Ryomen Sukuna", url: sukuna },
  { name:  "Megumi Fushiguro", url: megumi },
  { name:  "Toji Fushigiro", url: toji },
  { name:  "Yuta Okkotsu", url: yuta },
  { name:  "Maki Zenin", url: maki },
  { name:  "Mai Zenin", url: mai },
  { name:  "Suguru Geto", url: geto },
  { name:  "Nobara Kugisaki", url: kugisaki },
];

// We will change the game display such that 
// One card will be shown to the player at a time and the player 
// will determine whether he or she has already seen the picture
// Until all the cards have been seen, the game will continue asking the player

function Card({ card, handleUpdateScore }) {
  return (
    <div
      className="card-wrapper"
      onClick={handleUpdateScore}
    >
      <img id={card.name} src={card.url} alt={card.name} />
      <div className="card-name">{card.name}</div>
    </div>
  );
}

function CardBoard({ list, score, bestScore, handleUpdateScore }) {
  return (
    <div id="main">
      <div className="header">
        <div id="game-title">Memory Card</div>
        <div id="game-description">
          The game is simple, try not to click the same card twice to get the
          increase your score.<br/> Let's see how good is your memory!
        </div>

        <div id="game-status">
          <label htmlFor="score">Score: {score}</label>
          <label htmlFor="best-score">Best Score: {bestScore}</label>
        </div>
      </div>
      <div className="board">
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
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleUpdateScore = (e) => {
    const cardName = e.target.id;
    console.log(cardName, cards);

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
        list={characters}
        score={score}
        bestScore={bestScore}
        handleUpdateScore={handleUpdateScore}
      />
    </>
  );
}

export default App;
