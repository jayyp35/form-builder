import styles from "./Datepick.module.scss";
import clsx from "clsx";
import calendar from "../../../assets/calendar.svg";
import { useRef } from "react";

//**Custom Datepick Component
interface DatepickProps {
  placeholder?: string;
  label?: string;
  value: string;
  errorMessage?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;

  onChange: (val: string) => void;
}

function Datepick({
  placeholder = "", //*Placeholder text
  label = "", //*Datepick Label
  value,
  onChange,
  errorMessage = "", //Error message to show for invalid inputs
  disabled = false, //Disabled state
  minDate = "", //Minimum Date value allowed
  maxDate = "", //Maximum Date value allowed
}: DatepickProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    //*Function to show calendar picker on click of the complete component.
    if (inputRef.current) {
      inputRef.current.focus();
      (
        inputRef.current as HTMLInputElement & { showPicker?: () => void }
      ).showPicker?.(); // For browsers that support showPicker()
    }
  };

  return (
    <div className={styles.DatepickContainer} onClick={handleIconClick}>
      <input
        ref={inputRef}
        className={clsx(styles.Datepick, {
          [styles.DatepickError]: !!errorMessage,
        })}
        type="date"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        min={minDate}
        max={maxDate}
      />
      {label && <label className={styles.Placeholder}>{label}</label>}
      {!!errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
      <img
        className={styles.Icon}
        src={calendar}
        alt="calendar"
        height={"18px"}
      />
    </div>
  );
}

export default Datepick;
