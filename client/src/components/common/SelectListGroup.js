import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const SelectListGroup = ({
  label,
  options,
  name,
  value,
  info,
  error,
  onChange
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select className="custom-select">
        {selectOptions}
        className={classnames("form-control", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      </select>
      { info && <small className="form-text text-muted">{info}</small> }
      { error && (<div className="invalid-feedback">{error}</div>) }
    </div>
  );
};

SelectListGroup.propTypes = {
  label: propTypes.string,
  options: propTypes.array.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  error: propTypes.string,
  info: propTypes.string,
  onChange: propTypes.func.isRequired
};

export default SelectListGroup;