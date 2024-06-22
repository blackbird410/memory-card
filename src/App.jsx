import { useState, useEffect } from "react";
import "./App.css";

let characters = [
  { name: "Gojo Satoru" },
  { name: "Itadori Yuji" },
  { name: "Ryomen Sukuna" },
  { name: "Suguru Geto" },
  { name: "Naruto Uzumaki" },
  { name: "Sasuke Uchiha" },
  { name: "Sakura Haruno" },
  { name: "Kakashi Hatake" },
  { name: "Ichigo Kurosaki" },
  { name: "Rukia Kuchiki" },
  { name: "Monkey D. Luffy" },
  { name: "Roronoa Zoro" },
  { name: "Nami" },
  { name: "Sanji" },
  { name: "Edward Elric" },
  { name: "Alphonse Elric" },
  { name: "Goku" },
  { name: "Vegeta" },
  { name: "Bulma" },
  { name: "Gon Freecss" },
  { name: "Killua Zoldyck" },
  { name: "Hisoka" },
  { name: "Eren Yeager" },
  { name: "Mikasa Ackerman" },
  { name: "Levi Ackerman" },
  { name: "Light Yagami" },
  { name: "Tanjiro Kamado" },
  { name: "Nezuko Kamado" },
  { name: "Zenitsu Agatsuma" },
  { name: "Inosuke Hashibira" },
  { name: "Natsu Dragneel" },
  { name: "Saitama" },
  { name: "Genos" },
  { name: "Meliodas" },
  { name: "Ainz Ooal Gown" },
  { name: "Kirito" },
  { name: "Asuna Yuuki" },
  { name: "Shinra Kusakabe" },
  { name: "Nico Robin" },
  { name: "Rintarou Okabe" },
];

function Card({ card, handleUpdateScore }) {
  return (
    <div className="card-wrapper" onClick={handleUpdateScore}>
      <img id={card.name} src={(card.apiUrl) ? card.apiUrl : card.url} alt={card.name} />
      <div className="card-name">{card.name}</div>
    </div>
  );
}

function Loader() {
  return (
    <div id="loading-container">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
}

function CardBoard({ list, score, bestScore, handleUpdateScore }) {
  return (
    <div id="main">
      <div className="header">
        <div id="game-title">Memory Card</div>
        <div id="game-description">
          The game is simple, avoid clicking on the same card twice to increase your score.
          <br /> Let's see how good is your memory!
        </div>
        <div id="game-status">
          <label htmlFor="score">Score: {score}</label>
          <label htmlFor="best-score">Best Score: {bestScore}</label>
        </div>
      </div>
      <div className="board">
        {list.map((e) => (
          <Card key={e.name} card={e} handleUpdateScore={handleUpdateScore} />
        ))}
      </div>
      <a href="https://blackbird410.github.io/blackbird410/" target="_blank" rel="noopener noreferrer">
        Copyright © Neil Taison Rigaud
      </a>
    </div>
  );
}

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the images from the API
  useEffect(() => {
    async function fetchImage(searchKey) {
      try {
        let response = await fetch(
          `https://api.giphy.com/v1/gifs/translate?api_key=j7tOBnFk5xoG5Jzt7Vu11RD5pMrd5AxL&s=${searchKey}`,
          { mode: "cors" }
        );

        if (!response.ok) {
          let currentError = await response.json();
          throw new Error(currentError.error.message);
        }

        let result = await response.json();
        return result.data.images.original.url;
      } catch (error) {
        console.error(error);
        return "";
      }
    }

    async function updateCardList() {
      let updatedList = await Promise.all(
        characters.map(async (character) => {
          let apiUrl = await fetchImage(character.name);
          return { ...character, apiUrl };
        })
      );

      setCardList(updatedList);
      setIsLoading(false);
    }

    updateCardList();
  }, []);

  // Shuffle the cards and rebuild the board
  useEffect(() => {
    if (!isLoading) {
      let temp = [...cardList];
      let newList = [];

      while (temp.length) {
        const pickIndex = Math.floor(Math.random() * temp.length);
        newList = [...newList, temp.splice(pickIndex, 1)[0]];
      }
      setCardList(newList);
    }
  }, [score, isLoading]);

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
      {isLoading ? <Loader /> : <CardBoard list={cardList} score={score} bestScore={bestScore} handleUpdateScore={handleUpdateScore} />}
    </>
  );
}

export default App;
