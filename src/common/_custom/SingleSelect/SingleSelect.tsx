import Checkbox from "../Checkbox/Checkbox";
import styles from "./SingleSelect.module.scss";

function SingleSelect({
  options,
  value,
  onChange,
  errorMessage = "",
}: {
  options: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage: string;
}) {
  return (
    <>
      <div className={styles.RadioGroup}>
        {(options || "").split(",").map((option, idx) => (
          <label key={idx} className={styles.RadioLabel}>
            <Checkbox
              label={option.trim()}
              checked={value === option}
              onChange={() => onChange(option)}
              // type="radio"
              // name={`single-select`}
            />
            {/* {option?.trim?.()} */}
          </label>
        ))}
      </div>
      {errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
    </>
  );
}

export default SingleSelect;
