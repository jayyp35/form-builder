import styles from "./Datepick.module.scss";
import clsx from "clsx";
import calendar from "../../../assets/calendar.svg";
import { useRef } from "react";

interface DatepickProps {
  placeholder?: string;
  label?: string;
  value: string;
  onChange: (val: string) => void;
  errorMessage?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
}

function Datepick({
  placeholder = "",
  label = "",
  value,
  onChange,
  errorMessage = "",
  disabled = false,
  minDate = "",
  maxDate = "",
}: DatepickProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.showPicker(); // For browsers that support showPicker()
    }
  };
  return (
    <div className={styles.DatepickContainer}>
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
        onClick={handleIconClick}
      />
    </div>
  );
}

export default Datepick;
