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

function FormBuilder() {
  const [formBuilderData, setFormBuilderData] = useState<FormBuilderData>([]);
  const [expandIndex, setExpandIndex] = useState<number | null>(null);
  //   const [newFormComponentData, setNewFormComponentData] =
  //     useState<FormBuilderComponent | null>(null);

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
                  <div className={styles.QuestionTitleRow}>
                    <Input
                      placeholder="Question Title"
                      value={formBuilderComponent.title}
                      onChange={(value) => changeFormValue("title", value)}
                    />
                    <div>ok</div>
                  </div>
                  <div className={styles.QuestionTypeRow}>
                    <Input
                      placeholder="Question Type"
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
                    onChange={(value) => changeFormValue("helperText", value)}
                  />
                  <Dropdown
                    options={["hi", "bye"]}
                    placeholder="hiiii"
                    value={formBuilderComponent.type}
                    onChange={(value) => changeFormValue("type", value)}
                  />
                </>
              ) : (
                <div>Collapse</div>
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
      <div>
        <Button text="Add Question" onClick={initialiseNewQuestion} />
      </div>
    </div>
  );
}

export default FormBuilder;
