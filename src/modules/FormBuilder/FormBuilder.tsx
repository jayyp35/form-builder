import { useState } from "react";
import Input from "../../common/_custom/Input/Input";
import styles from "./FormBuilder.module.scss";
import {
  FormBuilderComponent,
  FormBuilderData,
} from "../../types/formbuider_types";
import Button from "../../common/_custom/Button/Button";
import Checkbox from "../../common/_custom/Checkbox/Checkbox";

function FormBuilder() {
  const [formBuilderData, setFormBuilderData] = useState<FormBuilderData>([]);
  const [newFormComponentData, setNewFormComponentData] =
    useState<FormBuilderComponent | null>(null);

  const initialiseNewQuestion = () => {
    const newQuestionData: FormBuilderComponent = {
      title: "",
      type: "",
      isRequired: false,
      isHidden: false,
      helperText: "",
    };
    setNewFormComponentData(newQuestionData);
  };

  const changeNewFormComponentValue = (
    keyName: string,
    value: string | boolean
  ) => {
    setNewFormComponentData((existingData) => {
      if (!existingData) return null;
      return {
        ...existingData,
        [keyName]: value,
      };
    });
  };

  return (
    <div className={styles.FormBuilder}>
      <div className={styles.Title}>Create a new form</div>
      {/* <div>
        {formBuilderData.map(
          (formBuilderComponent: FormBuilderComponent, i: number) => (
            <div>
              <Input placeholder="Question Title" />
              <div className={styles.QuestionTypeRow}>
                <Input placeholder="Question Type" />
                <Checkbox checked={} onChange={() => {}} />
              </div>
              <Input placeholder="Helper Text" />
            </div>
          )
        )}
      </div> */}
      {newFormComponentData && (
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
      )}
      <div>
        <Button text="Add Question" onClick={initialiseNewQuestion} />
      </div>
    </div>
  );
}

export default FormBuilder;
