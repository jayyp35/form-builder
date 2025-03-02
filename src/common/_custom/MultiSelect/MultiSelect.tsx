import styles from "./MultiSelect.module.scss";
import Checkbox from "../Checkbox/Checkbox";

function MultiSelect({
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
  const handleCheckboxChange = (option: string, checked: boolean) => {
    const selectedValues = value?.split(",").map((val) => val.trim());
    const newSelectedValues = checked
      ? [...selectedValues, option]
      : selectedValues.filter((val) => val !== option);
    onChange(newSelectedValues.join(", "));
  };

  return (
    <div className={styles.CheckboxGroup}>
      {(options || "")?.split(",").map((option, idx) => (
        <label key={idx} className={styles.CheckboxLabel}>
          <Checkbox
            label={option.trim()}
            checked={value
              ?.split(",")
              .map((val) => val.trim())
              .includes(option)}
            onChange={(checked) => handleCheckboxChange(option, checked)}
          />
        </label>
      ))}
      {errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}

export default MultiSelect;
