import { useCallback, useEffect, useRef, useState } from "react";
import Input from "../../common/_custom/Input/Input";
import styles from "./FormBuilder.module.scss";
import {
  FormBuilderComponent,
  FormBuilderData,
} from "../../types/formbuider_types";
import Button from "../../common/_custom/Button/Button";
import Checkbox from "../../common/_custom/Checkbox/Checkbox";
import Dropdown from "../../common/_custom/Dropdown/Dropdown";
import chevronDown from "../../assets/chevron-down.svg";
import greenTick from "../../assets/green-tick.svg";
import clsx from "clsx";
import Loader from "../../common/_custom/Loader/Loader";
import { saveFormData } from "../../service/service";
import { validateNewFormComponent } from "./validations";

const SAVE_STATES = {
  SAVING: "SAVING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

function FormBuilder() {
  const [savingState, setSavingData] = useState<string>("");
  const [formBuilderData, setFormBuilderData] = useState<FormBuilderData>({
    id: "",
    metadata: {
      name: "",
    },
    components: [],
  });
  const [expandIndex, setExpandIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const ifAllOk = true;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorsExist = !!Object.keys(errors).length;

  console.log("savingState", savingState);

  useEffect(() => {
    if (!formBuilderData.components.length) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      saveData();
    }, 100);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [formBuilderData.components]);

  const saveData = () => {
    console.log("saving");
    setErrors({});
    setSavingData(SAVE_STATES.SAVING);
    if (expandIndex !== null) {
      let { isValid, errorsObject } = validateNewFormComponent(
        formBuilderData.components?.[expandIndex]
      );

      console.log("isvaliud", isValid);
      console.log("errorsobj", errorsObject);
      setErrors(errorsObject);
      if (!isValid) {
        setSavingData(SAVE_STATES.ERROR);
        return;
      }
    }
    saveFormData(formBuilderData)
      .then((id) => {
        setFormBuilderData((existingData) => ({
          ...existingData,
          id: id,
        }));
        setSavingData(SAVE_STATES.SUCCESS);
      })
      .catch(() => {
        setSavingData(SAVE_STATES.ERROR);
        console.log("error in form save");
      });
  };
  const initialiseNewQuestion = () => {
    setSavingData("");
    const newQuestionData: FormBuilderComponent = {
      title: "",
      type: "",
      isRequired: false,
      isHidden: false,
      helperText: "",
    };
    setFormBuilderData((existingData) => {
      setExpandIndex(existingData.components?.length);
      return {
        ...existingData,
        components: [...existingData.components, newQuestionData],
      };
    });
  };

  const changeFormMetadata = (keyName: string, value: string | number) => {
    setFormBuilderData((existingData) => ({
      ...existingData,
      metadata: {
        [keyName]: value,
      },
    }));
  };

  const changeFormValue = (keyName: string, value: string | boolean) => {
    if (expandIndex === null) return;

    setFormBuilderData((existingData) => ({
      ...existingData,
      components: existingData.components.map((component, index) =>
        index === expandIndex ? { ...component, [keyName]: value } : component
      ),
    }));
  };

  const changeAdditionalProperties = (
    keyName: string,
    value: string | boolean
  ) => {
    if (expandIndex === null) return;

    setFormBuilderData((existingData) => ({
      ...existingData,
      components: existingData.components.map((component, index) =>
        index === expandIndex
          ? {
              ...component,
              additionalProperties: {
                ...component.additionalProperties,
                [keyName]: value,
              },
            }
          : component
      ),
    }));
  };

  const validateFormValue = (
    index: number,
    keyName: string,
    value: string | boolean
  ) => {
    let error = "";
    if (keyName === "title" && !value) {
      error = "Title is required";
    }
    if (keyName === "type" && !value) {
      error = "Type is required";
    }

    setErrors((existingErrors) => ({
      ...existingErrors,
      [keyName]: error,
    }));
  };

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
      {/* {newFormComponentData && (
        <div className={styles.FormBody}>
          <div className={styles.QuestionTitleRow}>
            <Input placeholder="Question Title" />
            <div>ok</div>
          </div>
          <div className={styles.QuestionTypeRow}>
            <Input placeholder="Question Type" />
            <div className={styles.Checks}>
              <Checkbox
                label="Required"
                checked={newFormComponentData.isRequired}
                onChange={(checked) =>
                  changeNewFormComponentValue("isRequired", checked)
                }
              />
              <Checkbox
                label="Hidden"
                checked={newFormComponentData.isHidden}
                onChange={(checked) =>
                  changeNewFormComponentValue("isHidden", checked)
                }
              />
            </div>
          </div>
          <Input placeholder="Helper Text" />
        </div>
      )} */}
      {ifAllOk && (
        <div>
          <Button text="Add Question" onClick={initialiseNewQuestion} />
        </div>
      )}
      {/* {ifAllOk && (
        <div>
          <Button
            type="secondary"
            text="Save"
            onClick={() => {
              localStorage.setItem(
                "_formdata",
                JSON.stringify(formBuilderData)
              );
            }}
          />
        </div>
      )} */}
    </div>
  );
}

export default FormBuilder;
