import React from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

function Dropdown({ options, value, onChange, placeholder }: DropdownProps) {
  console.log("value", value);
  return (
    <div className={styles.DropdownContainer}>
      <select
        className={styles.Dropdown}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {!value && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {value && <label className={styles.Placeholder}>{placeholder}</label>}
    </div>
  );
}

export default Dropdown;
