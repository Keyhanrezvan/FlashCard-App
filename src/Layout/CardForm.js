import React from "react";
import { Link } from "react-router-dom";

function CardForm({ card, deckId, submit, change }) {
  return (
    <form id="cardForm" onSubmit={submit}>
      <div className="form-group">
        <label>Front</label>
        <textarea
          name="front"
          value={card.front}
          onChange={change}
          id="front"
          className="form-control"
          placeholder="Front side of card"
          rows={4}
          required
        />
      </div>
      <div className="form-group">
        <label>Back</label>
        <textarea
          name="back"
          value={card.back}
          onChange={change}
          className="form-control"
          id="back"
          placeholder="Back side of card"
          rows={4}
          required
        />
      </div>
      <Link
        to={`/decks/${deckId}`}
        name="cancel"
        className="btn btn-secondary mr-3"
      >
        Done
      </Link>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default CardForm;
