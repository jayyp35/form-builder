import { useState } from "react";
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

function FormBuilder() {
  const [formBuilderData, setFormBuilderData] = useState<FormBuilderData>([]);
  const [expandIndex, setExpandIndex] = useState<number | null>(null);
  //   const [newFormComponentData, setNewFormComponentData] =
  //     useState<FormBuilderComponent | null>(null);

  const ifAllOk = true;
  const initialiseNewQuestion = () => {
    const newQuestionData: FormBuilderComponent = {
      title: "",
      type: "",
      isRequired: false,
      isHidden: false,
      helperText: "",
    };
    setFormBuilderData((existingData) => {
      setExpandIndex(existingData.length);
      return [...existingData, newQuestionData];
    });
  };

  const changeFormValue = (keyName: string, value: string | boolean) => {
    if (expandIndex === null) return;

    setFormBuilderData((existingData) =>
      existingData.map((component, index) =>
        index === expandIndex ? { ...component, [keyName]: value } : component
      )
    );
  };

  console.log("expandIndex", expandIndex);
  console.log("formBuilderData", formBuilderData);
  return (
    <div className={styles.FormBuilder}>
      <div className={styles.Title}>Create a new form</div>
      <div>
        {formBuilderData.map(
          (formBuilderComponent: FormBuilderComponent, i: number) => (
            <div className={styles.FormBody} key={i}>
              {expandIndex !== null && formBuilderData?.[expandIndex] ? (
                <>
                  <div
                    className={styles.QuestionTitleRow}
                    onClick={() => setExpandIndex(i)}
                  >
                    {expandIndex === i ? (
                      <Input
                        placeholder="Question Title*"
                        value={formBuilderComponent.title}
                        onChange={(value) => changeFormValue("title", value)}
                      />
                    ) : (
                      <div>{formBuilderComponent.title}</div>
                    )}
                    <div className={styles.Right}>
                      <div className={styles.Status}>
                        <img src={greenTick} alt="status" height={"20px"} />
                      </div>
                      <img
                        src={chevronDown}
                        className={clsx(styles.DownIcon, {
                          [styles.Rotate]: i === expandIndex,
                        })}
                        alt="down"
                        height={"20px"}
                      />
                    </div>
                  </div>

                  {i === expandIndex && (
                    <>
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
                        placeholder="Helper Text"
                        value={formBuilderComponent.helperText}
                        onChange={(value) =>
                          changeFormValue("helperText", value)
                        }
                      />
                    </>
                  )}
                </>
              ) : (
                <div
                  className={styles.FormBodyCollapsed}
                  onClick={() => {
                    setExpandIndex(i);
                  }}
                >
                  {formBuilderComponent.title}
                  <img
                    src={chevronDown}
                    className={styles.DownIcon}
                    alt="down"
                    height={"20px"}
                  />
                </div>
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
    </div>
  );
}

export default FormBuilder;
