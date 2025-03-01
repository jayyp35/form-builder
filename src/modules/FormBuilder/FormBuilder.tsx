import Input from "../../common/_custom/Input/Input";
import styles from "./FormBuilder.module.scss";
import { FormBuilderComponent } from "../../types/formbuider_types";
import Button from "../../common/_custom/Button/Button";
import { SAVE_STATES, useFormBuilder } from "./formBuilder_hooks";
import FormBuilderBody from "./components/FormBuilderBody/FormBuilderBody";
import chevronDown from "../../assets/chevron-down.svg";

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
  } = useFormBuilder();

  const errorsExist = !!Object.keys(errors).length;
  const showAddOption =
    !savingState ||
    [SAVE_STATES.SUCCESS, SAVE_STATES.SAVING].includes(savingState);

  return (
    <div className={styles.FormBuilder}>
      <div className={styles.Title}>
        Create a new form
        <Input
          placeholder="Form Name"
          value={formBuilderData.metadata.name}
          onChange={(value) => changeFormMetadata("name", value)}
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
                <FormBuilderBody
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
          <Button text="Add Question" onClick={initialiseNewQuestion} />
        </div>
      )}
    </div>
  );
}

export default FormBuilder;
