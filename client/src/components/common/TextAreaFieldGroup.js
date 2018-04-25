import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const TextAreaFieldGroupd = ({
  label,
  name,
  value,
  placeholder,
  info,
  error,
  onChange
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      { info && <small className="form-text text-muted">{info}</small> }
      { error && (<div className="invalid-feedback">{error}</div>) }
    </div>
  );
};

TextAreaFieldGroupd.propTypes = {
  label: propTypes.string,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  placeholder: propTypes.string,
  error: propTypes.string,
  info: propTypes.string,
  onChange: propTypes.func.isRequired
};

export default TextAreaFieldGroupd;