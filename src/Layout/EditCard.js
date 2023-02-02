import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../utils/api/index.js";
import CardForm from "./CardForm"

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();

  const [deck, setDeck] = useState([]);
  const [card, setEditCard] = useState({ front: "", back: "", deckId: "" });

  useEffect(() => {
    const abortController = new AbortController();
    const loadCard = async () => {
      const res = await readCard(cardId, abortController.signal);
      setEditCard(() => res);
    };
    loadCard();
    return () => abortController.abort();
  }, [cardId]);

  useEffect(() => {
    const abortController = new AbortController();
    const deckData = async () => {
      const res = await readDeck(deckId, abortController.signal);
      setDeck(() => res);
    };
    deckData();
    return () => abortController.abort();
  }, [deckId]);

  const formChanger = (e) => {
    setEditCard({ ...card, [e.target.name]: e.target.value });
  };

  const formSubmitter = async (e) => {
    e.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deck.id}`);
  };

  return (
    <div className="col-9 mx-auto">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item">Edit Card {cardId}</li>
        </ol>
      </nav>
      <div className="row pl-3 pb-2">
        <h1>Edit Card</h1>
      </div>
      <div className="row p-3">
        <CardForm
          submit={formSubmitter}
          change={formChanger}
          card={card}
          deck={deck}
        />
      </div>
    </div>
  );
}
export default EditCard;
