import Input from "../../common/_custom/Input/Input";
import styles from "./FormBuilder.module.scss";
import { FormBuilderComponent } from "../../types/formbuider_types";
import Button from "../../common/_custom/Button/Button";
import Checkbox from "../../common/_custom/Checkbox/Checkbox";
import Dropdown from "../../common/_custom/Dropdown/Dropdown";
import chevronDown from "../../assets/chevron-down.svg";
import greenTick from "../../assets/green-tick.svg";
import clsx from "clsx";
import Loader from "../../common/_custom/Loader/Loader";
import { useFormBuilder } from "./formBuilder_hooks";

const SAVE_STATES = {
  SAVING: "SAVING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

function FormBuilder() {
  const {
    savingState,
    formBuilderData,
    expandIndex,
    setExpandIndex,
    errors,
    initialiseNewQuestion,
    changeFormMetadata,
    changeFormValue,
    changeAdditionalProperties,
    validateFormValue,
  } = useFormBuilder();

  const ifAllOk = true;
  const errorsExist = !!Object.keys(errors).length;

  return (
    <div className={styles.FormBuilder}>
      <div className={styles.Title}>
        Create a new form
        <Input
          placeholder="Form Name"
          value={formBuilderData.metadata.name}
          onChange={(value) => changeFormMetadata("name", value)}
          //   errorMessage={errors["title"] || ""}
        />
      </div>
      <div>
        {formBuilderData.components.map(
          (formBuilderComponent: FormBuilderComponent, i: number) => (
            <div className={styles.FormBody} key={i}>
              {expandIndex !== i ? (
                <div className={styles.QuestionTitleRow}>
                  <div>{formBuilderComponent.title}</div>
                  <img
                    src={chevronDown}
                    className={styles.DownIcon}
                    alt="down"
                    height={"20px"}
                    onClick={() => {
                      if (!errorsExist) setExpandIndex(i);
                    }}
                  />
                </div>
              ) : (
                <>
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
                          [styles.Rotate]: i === expandIndex,
                        })}
                        alt="down"
                        height={"20px"}
                        style={{
                          transform: i === expandIndex ? "rotate(180deg)" : "",
                        }}
                        onClick={() => {
                          if (!errorsExist) setExpandIndex(null);
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.QuestionTypeRow}>
                    <Dropdown
                      options={[
                        "Text",
                        "Description",
                        "Email",
                        "Number",
                        "Phone Number",
                      ]}
                      placeholder="Question Type*"
                      value={formBuilderComponent.type}
                      onChange={(value) => changeFormValue("type", value)}
                      errorMessage={errors.type || ""}
                    />
                    <div className={styles.Checks}>
                      <Checkbox
                        label="Required"
                        checked={formBuilderComponent.isRequired}
                        onChange={(checked) =>
                          changeFormValue("isRequired", checked)
                        }
                      />
                      <Checkbox
                        label="Hidden"
                        checked={formBuilderComponent.isHidden}
                        onChange={(checked) =>
                          changeFormValue("isHidden", checked)
                        }
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
                        value={
                          formBuilderComponent?.additionalProperties
                            ?.numberType || ""
                        }
                        onChange={(value) =>
                          changeAdditionalProperties("numberType", value)
                        }
                      />
                      <div className={styles.RangeContainer}>
                        <Input
                          label="Min"
                          type="number"
                          value={
                            formBuilderComponent?.additionalProperties
                              ?.numberMin || ""
                          }
                          onChange={(value) =>
                            changeAdditionalProperties("numberMin", value)
                          }
                        />
                        <Input
                          label="Max"
                          type="number"
                          value={
                            formBuilderComponent?.additionalProperties
                              ?.numberMax || ""
                          }
                          onChange={(value) =>
                            changeAdditionalProperties("numberMax", value)
                          }
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )
        )}
      </div>

      {!errorsExist && (
        <div>
          <Button text="Add Question" onClick={initialiseNewQuestion} />
        </div>
      )}
    </div>
  );
}

export default FormBuilder;
