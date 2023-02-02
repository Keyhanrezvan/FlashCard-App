import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [currentCard, setCurrentCard] = useState(0);
  const [front, setFront] = useState(true);

  useEffect(() => {
    async function loadDeck() {
      const currentDeck = await readDeck(deckId);
      setDeck(() => currentDeck);
    }
    loadDeck();
  }, [deckId]);


  const flipHandler = () => {
    setFront(() => !front)
};


const nextHandler = () => {
    if (currentCard === (cards.length - 1)) {
        window.confirm("Click OK to restart the deck, or CANCEL to return to the homepage.")
            ? setCurrentCard(() => 0)
            : history.push("/")

    } else {
        setCurrentCard((currentCard) => currentCard + 1)
        setFront(() => !front)
    }
};

const cards = deck.cards

  if (!Object.keys(deck).length) {
    return <p> Loading... </p>;
  } else {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <div>
          <h1>{deck.name}: Study</h1>
        </div>
        {cards.length > 2 ? (
          <div className="row p-3">
            <div className="card w-100">
              <div className="card-body">
                <h5 className="card-title">
                  Card {currentCard + 1} of {cards.length}
                </h5>
                <p className="card-text">
                  {front ? cards[currentCard].front : cards[currentCard].back}
                </p>
                <button
                  onClick={flipHandler}
                  className="btn btn-secondary mr-3">
                  Flip
                </button>
                {front ? null : (
                  <button onClick={nextHandler} className="btn btn-primary">
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="row p-3 w-100">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Not enough cards.</h5>
                <p className="card-text">
                  You need at least 3 cards to study. There are {cards.length}{" "}
                  cards in this deck.
                </p>

                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn btn-primary ml-3">
                  Add Cards
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Study;
