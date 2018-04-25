import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const InputGroup = ({
  label,
  type,
  icon,
  name,
  value,
  placeholder,
  error,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        type={type}
        className={classnames("form-control", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      { error && (<div className="invalid-feedback">{error}</div>) }
    </div>
  );
};

InputGroup.propTypes = {
  label: propTypes.string,
  type: propTypes.string.isRequired,
  icon: propTypes.string,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  placeholder: propTypes.string,
  error: propTypes.string,
  onChange: propTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;