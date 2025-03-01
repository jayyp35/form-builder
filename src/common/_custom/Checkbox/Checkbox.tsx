import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Checkbox({ label = "", checked, onChange }: CheckboxProps) {
  return (
    <label className={styles.CheckboxContainer}>
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.Checkmark}></span>
    </label>
  );
}

export default Checkbox;
