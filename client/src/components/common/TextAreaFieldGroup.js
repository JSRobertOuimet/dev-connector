import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const TextAreaFieldGroupd = ({
  label,
  id,
  name,
  value,
  info,
  error,
  onChange
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        className={classnames("form-control", {
          "is-invalid": error
        })}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaFieldGroupd.propTypes = {
  label: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  error: propTypes.string,
  info: propTypes.string,
  onChange: propTypes.func.isRequired
};

export default TextAreaFieldGroupd;
