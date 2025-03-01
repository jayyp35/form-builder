import Input from "../../../../common/_custom/Input/Input";
import styles from "./FormBuilderBody.module.scss";
import { SAVE_STATES } from "../../formBuilder_hooks";
import chevronDown from "../../../../assets/chevron-down.svg";
import greenTick from "../../../../assets/green-tick.svg";
import Loader from "../../../../common/_custom/Loader/Loader";
import clsx from "clsx";
import Dropdown from "../../../../common/_custom/Dropdown/Dropdown";
import Checkbox from "../../../../common/_custom/Checkbox/Checkbox";

function FormBuilderBody({
  index,
  formBuilderComponent,
  changeFormValue,
  savingState,
  expandIndex,
  setExpandIndex,
  errors,
  errorsExist,
  changeAdditionalProperties,
}: any) {
  return (
    <div className={styles.FormBuilderBody} key={index}>
      <div className={styles.QuestionTitleRow}>
        <Input
          label="Question Title*"
          value={formBuilderComponent.title}
          onChange={(value) => changeFormValue("title", value)}
          errorMessage={errors.title || ""}
        />

        <div className={styles.Right}>
          <div className={styles.Status}>
            {savingState === SAVE_STATES.SAVING ? (
              <Loader width="20px" />
            ) : savingState === SAVE_STATES.ERROR ? (
              <></>
            ) : (
              <img src={greenTick} alt="status" height={"20px"} />
            )}
          </div>
          <img
            src={chevronDown}
            className={clsx(styles.DownIcon, {
              [styles.Rotate]: index === expandIndex,
            })}
            alt="down"
            height={"20px"}
            style={{
              transform: index === expandIndex ? "rotate(180deg)" : "",
            }}
            onClick={() => {
              if (!errorsExist) setExpandIndex(null);
            }}
          />
        </div>
      </div>

      <div className={styles.QuestionTypeRow}>
        <Dropdown
          options={["Text", "Description", "Email", "Number", "Phone Number"]}
          placeholder="Question Type*"
          value={formBuilderComponent.type}
          onChange={(value) => changeFormValue("type", value)}
          errorMessage={errors.type || ""}
        />
        <div className={styles.Checks}>
          <Checkbox
            label="Required"
            checked={formBuilderComponent.isRequired}
            onChange={(checked) => changeFormValue("isRequired", checked)}
          />
          <Checkbox
            label="Hidden"
            checked={formBuilderComponent.isHidden}
            onChange={(checked) => changeFormValue("isHidden", checked)}
          />
        </div>
      </div>
      <Input
        label="Helper Text"
        value={formBuilderComponent.helperText}
        onChange={(value) => changeFormValue("helperText", value)}
      />

      {formBuilderComponent.type === "Number" && (
        <div className={styles.AdditionalInfoRow}>
          <Dropdown
            options={["Default", "Years", "Range", "Percentage"]}
            placeholder="Number Type*"
            value={formBuilderComponent?.additionalProperties?.numberType || ""}
            onChange={(value) =>
              changeAdditionalProperties("numberType", value)
            }
          />
          <div className={styles.RangeContainer}>
            <Input
              label="Min"
              type="number"
              value={
                formBuilderComponent?.additionalProperties?.numberMin || ""
              }
              onChange={(value) =>
                changeAdditionalProperties("numberMin", value)
              }
            />
            <Input
              label="Max"
              type="number"
              value={
                formBuilderComponent?.additionalProperties?.numberMax || ""
              }
              onChange={(value) =>
                changeAdditionalProperties("numberMax", value)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FormBuilderBody;
