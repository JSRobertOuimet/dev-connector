import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const TextFieldGroup = ({
  label,
  type,
  id,
  name,
  value,
  disabled,
  info,
  error,
  onChange
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={classnames("form-control", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      { info && <small className="form-text text-muted">{info}</small> }
      { error && (<div className="invalid-feedback">{error}</div>) }
    </div>
  );
};

TextFieldGroup.propTypes = {
  label: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  error: propTypes.string,
  info: propTypes.string,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;