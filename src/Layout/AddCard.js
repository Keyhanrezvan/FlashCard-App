import {Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {createCard, readDeck} from "../utils/api/index"
import CardForm from "./CardForm"

function AddCard(){

const {deckId} = useParams()
const [deck, setDeck]=useState([])
const [card, setCard] = useState({front:"", back:""})

useEffect(()=>{
const abortController = new AbortController()
async function loadDeck(){
    const res = await readDeck(deckId, abortController.signal);
    setDeck(() => res)
}
loadDeck()
return () => abortController.abort()
},[deckId])

const formChanger = (e) =>{
setCard({...card, [e.target.name]: e.target.value})
}

const formSubmitter= async (e) =>{
    e.preventDefault()
    await createCard(deckId, card)
    setCard({ front: "", back: ""})
}

return (
<div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>
            {deck.name}
            </Link>
            </li>
            <li className ="breadcrumb-item">
                Add Card
            </li>
        </ol>
      </nav>
      <div className="row p-3">
      <CardForm submit={formSubmitter} change={formChanger} card= {card} deck={deck}/>
      </div>
</div>
)
}
export default AddCard;