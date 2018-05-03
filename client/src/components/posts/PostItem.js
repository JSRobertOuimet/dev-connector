import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { deletePost } from "../../actions/postActions";
import { addLike } from "../../actions/postActions";
import { removeLike } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onRemoveLikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;

    if(likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

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
            { showActions ? (
              <span>
                <button type="button" className="btn btn-light mr-1" onClick={this.onLikeClick.bind(this, post._id) }>
                  <i className={
                    classNames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button type="button" className="btn btn-light mr-1" onClick={this.onRemoveLikeClick.bind(this, post._id) }>
                  <i className="text-secondary fas fa-thumbs-down" />
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
              </span>
            ) : null }
          </div>
        </div>
      </div>
    );
  };
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: propTypes.func.isRequired,
  addLike: propTypes.func.isRequired,
  removeLike: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  post: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);