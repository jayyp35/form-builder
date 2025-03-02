import { useState } from "react";
import Input from "../../../../../../../../common/_custom/Input/Input";
import styles from "./AdditionalInfoSelect.module.scss";
import Button from "../../../../../../../../common/_custom/Button/Button";
import { cross } from "../../../../../../../../assets/assets";
import { toast } from "react-toastify";

function AdditionalInfoSelect({
  errors,
  value,
  onChange,
}: {
  errors: any;
  value: string;
  onChange: (newVal: string) => void;
}) {
  const [optionInput, setOptionInput] = useState("");

  const handleAddOption = () => {
    if (optionInput.trim() === "") return;
    const optionsArray = value.split(",").map((option) => option.trim());
    if (optionsArray.includes(optionInput.trim())) {
      toast.error("You have already added this option.");
      return;
    }
    const newValue = value
      ? `${value},${optionInput.trim()}`
      : optionInput.trim();
    onChange(newValue);
    setOptionInput("");
  };

  const handleDeleteOption = (optionToDelete: string) => {
    const newValue = value
      .split(",")
      .filter((option) => option.trim() !== optionToDelete.trim())
      .join(",");
    onChange(newValue);
  };

  return (
    <div className={styles.AdditionalInfoSelect}>
      <div className={styles.AddRow}>
        <Input
          label="Add Option"
          value={optionInput}
          onChange={(value) => setOptionInput(value)}
          errorMessage={errors?.select}
        />
        <Button text="Add" onClick={handleAddOption} disabled={!optionInput} />
      </div>

      <div className={styles.OptionsList}>
        {value ? (
          (value || "")?.split(",")?.map((option: string, idx: number) => (
            <div key={idx} className={styles.Option}>
              {option.trim()}

              <div className={styles.Cross}>
                <img
                  src={cross}
                  alt="cross"
                  onClick={() => handleDeleteOption(option)}
                  height={"18px"}
                />
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AdditionalInfoSelect;
