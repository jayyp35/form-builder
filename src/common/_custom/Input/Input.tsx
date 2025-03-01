import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}

function Input({ placeholder, value, onChange }: InputProps) {
  return (
    <div className={styles.InputContainer}>
      <input
        className={styles.Input}
        type="text"
        placeholder=" "
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
      <label className={styles.Placeholder}>{placeholder}</label>
    </div>
  );
}

export default Input;
