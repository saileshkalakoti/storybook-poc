import React from "react";
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

export default Input;
