import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

class ProfileGitHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "17e45463861744405b5e",
      clientSecret: "86895a7274aa23cab259e5d365152890c76129bb",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { clientId, clientSecret, count, sort } = this.props;

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ repos: data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6 mb-2">
            <h3>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h3>
            {repo.description}
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <hr />
        <h3 className="mb-4">
          Latest GitHub Repos
        </h3>
        { repoItems }
      </div>
    );
  }
};

ProfileGitHub.propTypes = {
  username: propTypes.string.isRequired
};

export default ProfileGitHub;