import styles from "./Dropdown.module.scss";
import chevronDown from "../../../assets/chevron-down.svg";
import clsx from "clsx";

//**Custom Dropdown Component
interface DropdownProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  errorMessage?: string;
}

function Dropdown({
  options, //Options to show in dropdown
  value = "", //selected option value
  onChange,
  placeholder, //Placeholder Text to show
  errorMessage = "", //Error message from form validations
}: DropdownProps) {
  return (
    <div className={styles.DropdownContainer}>
      <select
        className={clsx(styles.Dropdown, {
          [styles.DropdownError]: !!errorMessage,
          [styles.DropdownHasValue]: !!value,
        })}
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
      {!!errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}

      <img
        className={styles.Icon}
        src={chevronDown}
        alt="down"
        height={"20px"}
      />
    </div>
  );
}

export default Dropdown;
