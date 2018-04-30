import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props;
    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h3>{exp.company}</h3>
        <p>
          <Moment format="Mo MMMM YYYY">{exp.from}</Moment>
          {" "}&ndash;{" "}
          { exp.to === null ? ( "Now") : (<Moment format="Mo MMMM YYYY">{exp.to}</Moment>) }
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        {exp.location === "" ? null : (
          <p>
            <strong> Location:</strong> {exp.location}
          </p>
        )}
        {exp.description === "" ? null : (
          <p>
            <strong>Description:</strong> {exp.description}
          </p>
        )}
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h3>{edu.school}</h3>
        <p>
          <Moment format="Mo MMMM YYYY">{edu.from}</Moment>
          {" "}&ndash;{" "}
          { edu.to === null ? (" Now") : (<Moment format="Mo MMMM YYYY">{edu.to}</Moment>) }
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field of Study:</strong> {edu.fieldOfStudy}
        </p>
        {edu.description === "" ? null : (
          <p>
            <strong>Description:</strong> {edu.description}
          </p>
        )}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          { expItems.length === 0 ?
            null :
            (<div>
              <h2 className="text-center text-info">
                Experience
              </h2>
              <ul className="list-group mb-3">
                {expItems}
              </ul>
            </div>)
          }
        </div>
        <div className="col-md-6">
          { eduItems.length === 0 ?
            null :
            (<div>
              <h2 className="text-center text-info">
                Education
              </h2>
              <ul className="list-group mb-3">
                {eduItems}
              </ul>
            </div>)
          }
        </div>
      </div>
    );
  }
};

export default ProfileCreds;