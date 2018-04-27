import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const SelectListGroup = ({ label, options, name, value, info, error, onChange }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
      </label>
      <select
        className={classnames("form-control", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      { info && <small className="form-text text-muted">{info}</small> }
      { error && <div className="invalid-feedback">{error}</div> }
    </div>
  );
};

SelectListGroup.propTypes = {
  label: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  options: propTypes.array.isRequired,
  info: propTypes.string,
  error: propTypes.string,
};

export default SelectListGroup;