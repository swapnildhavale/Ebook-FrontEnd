import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { allGenres, onGenreSelect, selectedGenre } = this.props;
    return (
      <ul className="list-group">
        {allGenres.map((g) => (
          <li
            key={g._id}
            className={
              g.name === selectedGenre
                ? "list-group-item active clickable"
                : "list-group-item clickable"
            }
          
            onClick={() => onGenreSelect(g.name)}
          >
            {g.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
