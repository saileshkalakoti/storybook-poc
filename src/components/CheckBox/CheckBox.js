import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import styles from "./CheckBox.module.css";

const CheckBox = ({disabled, isChecked}) => {
  const [stateIsChecked, setChecked] = useState(isChecked || false);
  useEffect( () => {
    setChecked(isChecked);
  }, [isChecked])
  return (
    <div className={styles.coloured}>
      <div
        className={classNames(
          styles.checkbox,
          disabled && styles.disabledClass
        )}
      >
        <label>
          <input
            type="checkbox"
            checked={stateIsChecked}
            onClick={event => setChecked(!stateIsChecked)}
            disabled={disabled}
          />
          <span className={styles.checkboxMaterial}>
            <span className={styles.check} />
          </span>
        </label>
      </div>
    </div>
  );
}
CheckBox.propTypes = {
    /**
   * is the checkbox enabled to check or disabled.
   */
  disabled: PropTypes.bool,
    /**
   * Is the checkbox checked or not
   */
  isChecked: PropTypes.bool,
};

CheckBox.defaultProps = {
  isChecked: true,
  disabled: false,
};
export default CheckBox;
