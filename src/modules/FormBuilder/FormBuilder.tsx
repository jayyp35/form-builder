import { useNavigate } from "react-router-dom";
import { FormBuilderComponent } from "../../types/formbuider_types";
import { SAVE_STATES, useFormBuilder } from "./formBuilder_hooks";

import Input from "../../common/_custom/Input/Input";
import Button, { BUTTON_TYPES } from "../../common/_custom/Button/Button";
import FormBuilderBody from "./components/FormBuilderBody/FormBuilderBody";
import CollapsedFormBody from "./components/CollapsedFormBody/CollapsedFormBody";
import styles from "./FormBuilder.module.scss";
import clsx from "clsx";

function FormBuilder() {
  const navigate = useNavigate();

  const {
    //State variables and handlers
    saveSuccess,
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

    deletingIndex,
    handleDeleteFormComponent,
  } = useFormBuilder();

  const errorsExist = !!Object.keys(errors).length; //Errors exist of errors object has any key value pair.
  const showAddOption =
    !savingState ||
    [SAVE_STATES.SUCCESS, SAVE_STATES.SAVING].includes(savingState);

  const handleFormBodyClick = (index: number) => {
    if (expandIndex !== index) setExpandIndex(index);
  };

  return (
    <div className={styles.FormBuilder}>
      <div className={styles.Title}>
        <Button
          type={BUTTON_TYPES.SECONDARY}
          text="Home"
          onClick={() => navigate("/")}
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
            <div
              className={clsx(styles.FormBody, {
                [styles.Collapsed]: expandIndex !== i,
              })}
              key={i}
              onClick={() => handleFormBodyClick(i)}
            >
              {expandIndex !== i ? (
                <CollapsedFormBody
                  key={i}
                  index={i}
                  setExpandIndex={setExpandIndex}
                  formBuilderComponent={formBuilderComponent}
                  errorsExist={
                    i === formBuilderData.components.length - 1
                      ? errorsExist
                      : false
                  }
                  formId={formBuilderData.id as string}
                  deletingIndex={deletingIndex as number}
                  handleDeleteFormComponent={handleDeleteFormComponent}
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
                  errors={
                    i === formBuilderData.components.length - 1 ? errors : {}
                  }
                  errorsExist={errorsExist}
                  changeAdditionalProperties={changeAdditionalProperties}
                />
              )}
            </div>
          )
        )}
      </div>

      <div className={styles.Buttons}>
        <div>
          {showAddOption && (
            <Button
              text="Add Question"
              onClick={initialiseNewQuestion}
              loading={savingState === SAVE_STATES.SAVING}
              disabled={savingState === SAVE_STATES.SAVING}
            />
          )}
        </div>
        <div>
          {saveSuccess && (
            <Button
              type={BUTTON_TYPES.SECONDARY}
              text="Preview Autosaved Form"
              onClick={() => {
                localStorage.setItem(
                  "form_progress",
                  JSON.stringify(formBuilderData)
                );
                navigate(`/view/${formBuilderData.id}`);
              }}
              loading={savingState === SAVE_STATES.SAVING}
              disabled={savingState === SAVE_STATES.SAVING}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FormBuilder;
