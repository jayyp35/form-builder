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
    <div className={styles.RadioGroup}>
      {(options || "").split(",").map((option, idx) => (
        <label key={idx} className={styles.RadioLabel}>
          <input
            type="radio"
            name={`single-select`}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
          />
          {option?.trim?.()}
        </label>
      ))}
      {errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}

export default SingleSelect;
