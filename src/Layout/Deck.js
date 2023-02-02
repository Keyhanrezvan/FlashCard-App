import { Link, useHistory, useRouteMatch, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {readDeck, deleteDeck, deleteCard} from "../utils/api/index";

function Deck() {
  const history = useHistory()
  const { deckId } = useParams()
  const { url } = useRouteMatch()

  const [deck, setDeck] = useState([]);

  async function loadDeck2() {
    const res = await readDeck(deckId);
    setDeck(() => res)
  }
  
  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
        const res = await readDeck(deckId, abortController.signal);
        setDeck(() => res)
      }
    loadDeck()
    return () => abortController.abort();
  }, [deckId])

  const { name, description, id, cards } = deck;

  const deleteHandlerDeck = async (e) => {
    if (window.confirm("Are you sure? You will not be able to recover it.")) {
      await deleteDeck(id)
      history.push("/")
    } else {history.go(0)}
  };

 if (!deck || !cards) {
        return (
            <div>
                <p>
                    Loading...
                </p>
            </div >
        )
    } else {
  return (
    <div className="deckScreen">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">{name}</li>
        </ol>
      </nav>
      <div className="card border border-bottom-1 border-dark mb-4">
        <div className="card-body">
          <div className="row px-3">
            <h4 className="card-title">{name}</h4>
          </div>
          <p className="card-description">{description}</p>
        </div>
        <div className="row px-4 mb-1">
          <Link to={`/decks/${id}/edit`} type = "button" className="btn btn-secondary">
            Edit
          </Link>
          <Link to={`/decks/${id}/study`} type = "button" className="btn btn-primary ml-3">
            Study
          </Link>
          <Link to={`/decks/${id}/cards/new`} type = "button" className="btn btn-primary ml-3">
            Add Cards
          </Link>
          <button onClick={deleteHandlerDeck} className="btn btn-danger ml-auto">
            Delete
          </button>
        </div>
      </div>
      <div className="row pb-2 pl-3">
        <h3>Cards</h3>
      </div>
      {cards.map((card,index)=>
      <div className="row" key={index}>
      <div className="col">
          <div className="card">
              <div className="row card-body">
                  <p className="col-6 card-text">
                      {card.front}
                  </p>
                  <p className="col-6 card-text">
                      {card.back}
                  </p>
              </div>
              <div className="d-flex justify-content-end p-4">
                  <Link
                      to={`${url}/cards/${card.id}/edit`}
                      className="btn btn-secondary">
                      Edit
                  </Link>
                  <button
                      onClick={async () => {
                        if (window.confirm("Are you sure you want to delete this card?")) {
                            await deleteCard(card.id)
                            await loadDeck2()
                        }      
                    }}
                      name="deleteCard"
                      value={card.id}
                      className="btn btn-danger ml-3">
                      Delete
                  </button>
              </div>
          </div>
      </div>
  </div>
      )}
    </div>
  )
      }
}

export default Deck;
