import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index.js";

function EditDeck() {
  const [deck, setEditDeck] = useState({ name: "", description: "" });

  const history = useHistory();

  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      const res = await readDeck(deckId, abortController.signal);
      setEditDeck(() => res);
    }
    loadDecks();
    return () => abortController.abort()
  }, [deckId])

  const submitHandler = async (e) => {
    e.preventDefault()
    let result = await updateDeck(deck)
    history.push(`/decks/${result.id}`)
 
   };
 
   const changeHandler = ({target}) => {
     setEditDeck({...deck, [target.name]:target.value})
   };

  if (!deck) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item">Edit Deck</li>
          </ol>
        </nav>
        <div className="row pl-3 pb-2">
          <h2>Edit Deck</h2>
        </div>
        <form onSubmit={submitHandler}>
          <div className="formGroup">
            <label>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={deck.name}
              onChange={changeHandler}
              placeholder="Deck Name"
            />
          </div>
          <div className="formGroup">
            <label>Description</label>
            <textarea
              name="description"
              id="description"
              value={deck.description}
              onChange={changeHandler}
              placeholder="Brief description of the deck"
              rows={4}
            />
          </div>
          <Link to="/" name="cancel" className="btn btn-secondary mr-3">
            Cancel
          </Link>
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditDeck;
