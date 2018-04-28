import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({ label, icon, type, name, value, error, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
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
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

InputGroup.PropTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
