import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { itemsCount, pageSize, onPageChange, currentPage } = this.props;

    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
      <nav>
        <ul className="pagination">
          {pages.map((p) => (
            <li
              key={p}
              className={p === currentPage ? "page-item active" : "page-item"}
            >
              <a className="page-link clickable" onClick={() => onPageChange(p)}>
                {p}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
