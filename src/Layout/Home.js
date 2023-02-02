import {Link, useHistory} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api/index.js";
import {deleteDeck} from "../utils/api/index.js"

function Home() {

  const [totalDecks, setTotalDecks] = useState([]);
const history = useHistory()

  const deleteHandler = async (e) => {
    if (window.confirm("Are you sure? You will not be able to recover it.")) {
        let id = e.target.getAttribute("value")
        await deleteDeck(id);
        history.go(0)
    }
};

  useEffect(() => {
    const abortController = new AbortController();
        listDecks(abortController.signal).then(setTotalDecks);

        return () => abortController.abort();

  }, []);

  return (
  <div>
<Link to={`/decks/new`} type="button" className="btn btn-lg btn-dark"> Create Deck</Link>

{totalDecks.map((deck, index)=>{
    return (
        <div key= {index} className="border border-primary m-3 p-3">
            <h5>{deck.name}</h5>
            <p>{deck.description}</p>
            <p className="ml-auto">{deck.cards.length} cards</p>
            <Link to={`/decks/${deck.id}/study`} type="button" className="btn btn-lg btn-primary m-1"> Study </Link>
            <Link to={`/decks/${deck.id}`} type="button" className="btn btn-lg btn-dark m-1"> View </Link>
            <button name="delete" value= {deck.id} className = "btn btn-danger ml-5" onClick={deleteHandler}>Delete</button>
        </div>
    )
})}

  </div>
  )
}

export default Home;
