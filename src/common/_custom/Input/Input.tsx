import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  placeholder: string;
}

function Input({ placeholder }: InputProps) {
  return (
    <div className={styles.InputContainer}>
      <input className={styles.Input} type="text" placeholder=" " />
      <label className={styles.Placeholder}>{placeholder}</label>
    </div>
  );
}

export default Input;
