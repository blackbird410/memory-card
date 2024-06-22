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
import choso from "./assets/Choso.jpg";
import kenjaku from "./assets/Kenjaku.jpg";
import mahito from "./assets/Mahito.jpg";
import manami from "./assets/Manami Suda.jpg"
import uraume from "./assets/Uraume.jpg";
import yuki from "./assets/Yuki Tsukumo.jpg";
import nanami from "./assets/Kento Nanami.jpg";
import panda from "./assets/Panda.jpg";
import toge from "./assets/Toge Inumaki.jpg";

const getName = (c) => {
  let a = c.split("/");
  a = a[a.length - 1].split(".")[0].split("%20").join(" ");
  return a;
}; 

const characters = [ 
  nanami, panda, toge, gojo, 
  aoi, yuji, sukuna, megumi, 
  toji, yuta, maki, mai, geto, 
  kugisaki, choso, kenjaku, 
  mahito, manami, uraume, yuki,
];

function Card({ character, handleUpdateScore }) {
  const name = getName(character);
  return (
    <div
      className="card-wrapper"
      onClick={handleUpdateScore}
    >
      <img id={name} src={character} alt={name} />
      <div className="card-name">{name}</div>
    </div>
  );
}

function CardBoard({ list, score, bestScore, handleUpdateScore }) {
  return (
    <div id="main">
      <div className="header">
        <div id="game-title">Memory Card</div>
        <div id="game-description">
          The game is simple, avoid clicking on the same card twice to 
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
                            key={getName(e)} 
                            character={e} 
                            handleUpdateScore={handleUpdateScore} 
                        />
        ))}
      </div>
      <a href="https://blackbird410.github.io/blackbird410/" target="_blank">Copyright © Neil Taison Rigaud</a>
    </div>
  );
}

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cardList, setCardList] = useState(characters);


  // Shuffle the cards and rebuild the board 
  useEffect(() => {
    let temp = [...characters];
    let newList = [];

    while(temp.length) {
      const pickIndex = Math.floor(Math.random() * temp.length);
      
      newList = [...newList, temp.splice(pickIndex, 1)[0]];
    }
    setCardList(newList);

  }, [score]);

  const handleUpdateScore = (e) => {
    const cardName = e.target.id;
    setBestScore(score > bestScore ? score : bestScore);

    if (cards.includes(cardName)) {
      // You lost => Reset game
      setScore(0);
      setCards([]);
    } else {
      setScore(score + 1);
      setCards([...cards, cardName]);
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
