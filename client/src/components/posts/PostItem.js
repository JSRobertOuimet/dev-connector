import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";

class PostItem extends Component {
  onDeleteClick(id) {
    console.log(id);
  }

  render() {
    const { post, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={post.avatar} />
            </a>
          </div>
          <div className="col-md-10">
            <p className="lead">
              {post.text}
            </p>
            <p className="text-muted">
              {post.name}
            </p>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-info fas fa-thumbs-up"></i>
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            { post.user === auth.user.id ? (
              <button
                className="btn btn-danger"
                onClick={this.onDeleteClick.bind(this, post._id)}
              >
                <i className="fas fa-times" />
              </button>
            ) : null }
          </div>
        </div>
      </div>
    );
  };
};

PostItem.propTypes = {
  auth: propTypes.object.isRequired,
  post: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostItem);