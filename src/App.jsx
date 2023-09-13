/* eslint-disable no-unused-vars */

//External imports
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

//Local imports
import CatGrid from "./components/CatGrid";
import "./App.css";

function App() {
  let [catImages, setCatImages] = useState([]);
  let [difficulty, setDifficulty] = useState("");
  let [score, setScore] = useState(0);
  let [selectedCats, setSelectedCats] = useState([]);
  let [winFlag, setWinFlag] = useState(false);
  let time = new Date();
  let [catAmount, setCatAmount] = useState(0);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  function fetchCats() {
    if (difficulty == "easy") {
      setCatAmount(4);
    } else if (difficulty == "medium") {
      setCatAmount(8);
    } else {
      setCatAmount(12);
    }
    axios
      .get(
        `https://api.thecatapi.com/v1/images/search?limit=${catAmount}&api_key=` +
          import.meta.env.VITE_API_KEY
      )
      .then((res) => {
        setCatImages((prevState) => res.data);
      });
  }

  function shuffle(array, card) {
    let setZero = false;
    selectedCats.forEach((cat) => {
      if (cat == card) {
        setScore(0);
        setZero = true;
        alert("You selected a duplicate! Try again!");
      }
    });
    setSelectedCats((prevState) => [...prevState, card]);
    let currentIndex = array.length,
      randomIndex;
    let clone = array;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [clone[currentIndex], clone[randomIndex]] = [
        clone[randomIndex],
        clone[currentIndex],
      ];
    }

    setCatImages((prevState) => [...clone]);
    if (!setZero) {
      setScore((prevState) => prevState + 1);
    } else {
      setScore(0);
      setSelectedCats([]);
    }

    if (score == catImages.length - 1) {
      setWinFlag(true);
      setDifficulty("");
      addHighScore();
    }
  }

  function addHighScore() {
    let name = prompt("Input your username to compete on the leaderboards!");
    axios.post("http://localhost:3000", {
      data: { username: name, userScore: score + 1, date: formatDate(time) },
    });
  }

  function reset() {
    setScore(0);
    setDifficulty("");
    setCatImages([]);
    setWinFlag(false);
  }

  useEffect(() => {
    if (difficulty) {
      fetchCats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  return (
    <>
      {!difficulty && (
        <>
          <div className="introContainer">
            <h1 className="title">CaaS Memory Game!</h1>

            <div className="difficulties">
              <Button
                variant="success"
                onClick={() => {
                  setDifficulty("easy");
                  setWinFlag(false);
                  setScore(0);
                }}
              >
                Easy
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  setDifficulty("medium");
                  setWinFlag(false);
                  setScore(0);
                }}
              >
                Medium
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setDifficulty("hard");
                  setWinFlag(false);
                  setScore(0);
                }}
              >
                Hard
              </Button>
              <Link to="/leaderboard">
                <Button variant="light" className="leaderboardButton">
                  Leaderboard
                </Button>
              </Link>
            </div>
            <div></div>
          </div>
        </>
      )}
      {winFlag && (
        <>
          <h1 className="winFlag">You won!</h1>
        </>
      )}

      {difficulty && (
        <div className="game">
          <Container>
            <Row>
              <Col>
                <h1 className="score">
                  Score: {score} / {catAmount}
                </h1>
              </Col>
            </Row>
            <CatGrid
              catImages={catImages}
              difficulty={difficulty}
              shuffle={(card) => {
                shuffle(catImages, card);
              }}
            ></CatGrid>
          </Container>
          <Button onClick={reset} className="home">
            Home
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
