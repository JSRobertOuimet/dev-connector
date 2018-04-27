import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const InputGroup = ({
  label,
  icon,
  type,
  name,
  value,
  error,
  onChange
}) => {
  return (
    <div>
      <label htmlFor={name}>
        {label}
      </label>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon} />
          </span>
        </div>
        <input
          type={type}
          id={name}
          className={classnames("form-control", {
            "is-invalid": error
          })}
          name={name}
          value={value}
          onChange={onChange}
        />
        { error && (<div className="invalid-feedback">{error}</div>) }
      </div>
    </div>
  );
};

InputGroup.propTypes = {
  label: propTypes.string.isRequired,
  icon: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string,
  error: propTypes.string,
  onChange: propTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;