import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const TextFieldGroup = ({
  label,
  type,
  name,
  value,
  placeholder,
  disabled,
  info,
  error,
  onChange
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
      { info && <small className="form-text text-muted">{info}</small> }
      { error && (<div className="invalid-feedback">{error}</div>) }
    </div>
  );
};

TextFieldGroup.propTypes = {
  label: propTypes.string,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  placeholder: propTypes.string,
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