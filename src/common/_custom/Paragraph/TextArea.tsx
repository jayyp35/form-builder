import styles from "./TextArea.module.scss";
import clsx from "clsx";

//*Custom Textbox Component
interface TextAreaProps {
  placeholder?: string;
  label?: string;
  type?: string;
  value: string | number;
  errorMessage?: string;
  disabled?: boolean;
  onChange: (val: string) => void;
  style?: React.CSSProperties;
}

function TextArea({
  placeholder = "",
  label = "",
  value,
  onChange,
  errorMessage = "",
  disabled = false,
  style = {},
}: TextAreaProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };
  return (
    <div className={styles.TextContainer} style={style}>
      <textarea
        className={clsx(styles.TextInput, {
          [styles.InputError]: !!errorMessage,
        })}
        placeholder={placeholder}
        value={value}
        onChange={handleTextChange}
        disabled={disabled}
      />
      {label && <label className={styles.Placeholder}>{label}</label>}
      {!!errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}

export default TextArea;
