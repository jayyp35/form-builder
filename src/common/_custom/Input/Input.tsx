import styles from "./Input.module.scss";
import clsx from "clsx";

interface InputProps {
  placeholder?: string;
  label?: string;
  type?: string;
  value: string | number;
  onChange: (val: string) => void;
  errorMessage?: string;
  disabled?: boolean;
}

function Input({
  placeholder = "",
  label = "",
  type = "text",
  value,
  onChange,
  errorMessage = "",
  disabled = false,
}: InputProps) {
  return (
    <div className={styles.InputContainer}>
      <input
        className={clsx(styles.Input, { [styles.InputError]: !!errorMessage })}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        disabled={disabled}
      />
      {label && <label className={styles.Placeholder}>{label}</label>}
      {!!errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}

export default Input;
