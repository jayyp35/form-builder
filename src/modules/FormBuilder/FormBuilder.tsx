import { useNavigate } from "react-router-dom";
import { FormBuilderComponent } from "../../types/formbuider_types";
import { SAVE_STATES, useFormBuilder } from "./formBuilder_hooks";

import Input from "../../common/_custom/Input/Input";
import Button, { BUTTON_TYPES } from "../../common/_custom/Button/Button";
import FormBuilderBody from "./components/FormBuilderBody/FormBuilderBody";
import CollapsedFormBody from "./components/CollapsedFormBody/CollapsedFormBody";
import styles from "./FormBuilder.module.scss";

function FormBuilder() {
  const navigate = useNavigate();

  const {
    //State variables and handlers
    savingState,
    formBuilderData,
    expandIndex,
    setExpandIndex,
    errors,

    //Functions
    initialiseNewQuestion,
    changeFormMetadata,
    changeFormValue,
    changeAdditionalProperties,
  } = useFormBuilder();

  const errorsExist = !!Object.keys(errors).length; //Errors exist of errors object has any key value pair.
  const showAddOption =
    !savingState ||
    [SAVE_STATES.SUCCESS, SAVE_STATES.SAVING].includes(savingState);

  return (
    <div className={styles.FormBuilder}>
      <div className={styles.Title}>
        <Button
          type={BUTTON_TYPES.SECONDARY}
          text="Back"
          onClick={() => navigate(-1)}
        />
        Create a new form
      </div>
      <div>
        <Input
          placeholder="Form Name"
          value={formBuilderData.metadata.name}
          onChange={(value) => changeFormMetadata("name", value)}
          style={{ marginBottom: "20px" }}
        />
        {formBuilderData.components.map(
          (formBuilderComponent: FormBuilderComponent, i: number) => (
            <div className={styles.FormBody} key={i}>
              {expandIndex !== i ? (
                <CollapsedFormBody
                  key={i}
                  index={i}
                  setExpandIndex={setExpandIndex}
                  formBuilderComponent={formBuilderComponent}
                  errorsExist={errorsExist}
                />
              ) : (
                <FormBuilderBody
                  key={i}
                  index={i}
                  formBuilderComponent={formBuilderComponent}
                  changeFormValue={changeFormValue}
                  savingState={savingState}
                  expandIndex={expandIndex}
                  setExpandIndex={setExpandIndex}
                  errors={errors}
                  errorsExist={errorsExist}
                  changeAdditionalProperties={changeAdditionalProperties}
                />
              )}
            </div>
          )
        )}
      </div>

      {showAddOption && (
        <div>
          <Button
            text="Add Question"
            onClick={initialiseNewQuestion}
            disabled={savingState === SAVE_STATES.SAVING}
          />
        </div>
      )}
    </div>
  );
}

export default FormBuilder;
