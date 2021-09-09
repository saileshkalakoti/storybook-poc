import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

import styles from "./Input.module.css";

const Input = ({
  inputGroupStyle,
  id,
  disabled,
  placeholder,
  min,
  max,
  asterik,
  autocomplete,
  title,
  maxlength,
  inputStyle,
  label,
  type,
  value,
  defaultValue,
  onEnter,
  onFocus,
  onFocusChange,
  onChange
}) => {
  function handleChange(e) {
    onChange(e);
  }
  return (
    <div className={classNames(styles.inputGroup, inputGroupStyle)}>
      <label
        className={classNames(
          styles.inputLabel,
          disabled ? styles.disabledLabelTop : null
        )}
      >
        {label}
        {asterik ? <span className={styles.mandatoryField}>*</span> : null}
      </label>
      <input
        className={classNames(styles.inputElement, inputStyle)}
        type={type}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        required
        value={value}
        defaultValue={defaultValue}
        onChange={e => handleChange(e)}
        onKeyUp={onEnter}
        onBlur={onFocusChange}
        onFocus={onFocus}
        min={min}
        max={max}
        autoComplete={autocomplete || "new-password"}
        //  autocomplete off was not working in some chrome version, hence using new-password as default.
        title={title}
        maxLength={maxlength}
      />
    </div>
  );
}

Input.propTypes = {
  /**
   * Type defines, what type of input it will be, date, number or text
   */
  type: PropTypes.oneOf(['file', 'date', 'text', 'number']).isRequired,
  /**
   * placeholder is used to show dummy string to let user know what to enter
   */
  placeholder: PropTypes.string.isRequired,
  /**
   * Label defines what should be the label, appear before the input box
   */
  label: PropTypes.string,
  /**
   * onChange is the function that will be executed everytime there is a change in input
   */
  onChange: PropTypes.func
  /**
   * min: min denotes minimum value an input can have
   */
  /**
   * max: max denotes maximum value an input can have
   */
  /**
   * onBlur is the function that will execute when focus get shifted from the input
   */
}

Input.defaultProps = {
  type: "text",
  placeholder: "",
  min: "",
  max: "",
  onBlur: () => {}
}

export default Input;
