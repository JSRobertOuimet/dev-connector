import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="Mo MMMM YYYY">{edu.from}</Moment>
          &ndash;{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="Mo MMMM YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger float-right"
            onClick={this.onDeleteClick.bind(this, edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h2 className="mb-4">Education</h2>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: propTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
