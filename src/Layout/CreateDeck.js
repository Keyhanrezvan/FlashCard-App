import { Link, useHistory} from "react-router-dom";
import React, { useState } from "react";
import {createDeck} from "../utils/api/index.js"

function CreateDeck() {
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });

  const history = useHistory()

  const submitHandler = async (e) => {
   e.preventDefault()
   let result = await createDeck(newDeck)
   history.push(`/decks/${result.id}`)

  };

  const changeHandler = ({target}) => {
    setNewDeck({...newDeck, [target.name]:target.value})
  };


  return (
    
    <div>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">
                    Home
                </Link>
            </li>
            <li className="breadcrumb-item">
                Create Deck
            </li>
        </ol>
        </nav>
      <form onSubmit={submitHandler}>
        <div className="formGroup">
          <label>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newDeck.name}
            onChange={changeHandler}
            placeholder="Deck Name"
          />
        </div>
        <div className="formGroup">
          <label>Description</label>
          <textarea
            name="description"
            id="description"
            value={newDeck.description}
            onChange={changeHandler}
            placeholder="Brief description of the deck"
            rows={4}
          />
        </div>
      <Link to="/" name="cancel" className="btn btn-secondary mr-3">
        Cancel
      </Link>
      <button type="submit" className="btn btn-secondary">Submit</button>
      </form>
    </div>
  );
}

export default CreateDeck;
