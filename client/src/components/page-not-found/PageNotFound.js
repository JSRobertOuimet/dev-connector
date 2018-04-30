import React, { Component } from "react";
import { Link } from "react-router-dom";

class PageNotFound extends Component {
  render() {
    return (
      <div>
        <h1 className="display-4">
          Page not found...
        </h1>
        <p>
          Sorry, this page does not exists.
        </p>
        <Link to="/profiles" className="btn btn-info">
          Go back to browsing
        </Link>
      </div>
    );
  }
};

export default PageNotFound;