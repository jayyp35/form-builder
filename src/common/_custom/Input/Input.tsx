import styles from "./Input.module.scss";
import clsx from "clsx";

export const INPUT_TYPES = {
  NUMBER: "number",
  TEXT: "text",
};

//* Custom Input Component
interface InputProps {
  placeholder?: string;
  label?: string;
  type?: (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES];
  value: string | number;
  errorMessage?: string;
  disabled?: boolean;

  style?: React.CSSProperties;
  onChange: (val: string) => void;
}

function Input({
  type = INPUT_TYPES.TEXT,
  placeholder = "",
  label = "",
  value,
  onChange,
  disabled = false,
  errorMessage = "",
  style = {},
}: InputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === INPUT_TYPES.NUMBER) {
      //*If input is number, then it is checked against regex pattern [0-9]*
      if (e.target.validity.valid) onChange?.(e.target.value);
    } else {
      onChange?.(e.target.value);
    }
  };

  return (
    <div className={styles.InputContainer} style={style}>
      <input
        className={clsx(styles.Input, { [styles.InputError]: !!errorMessage })}
        type={INPUT_TYPES.TEXT}
        pattern={type === INPUT_TYPES.NUMBER ? "[0-9]*" : ""}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
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
