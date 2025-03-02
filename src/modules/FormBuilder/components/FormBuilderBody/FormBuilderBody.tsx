import Input from "../../../../common/_custom/Input/Input";
import Dropdown from "../../../../common/_custom/Dropdown/Dropdown";
import Checkbox from "../../../../common/_custom/Checkbox/Checkbox";

import {
  FORM_BUILDER_FIEDS,
  QUESTION_TYPES,
  questionTypesDropdownOptions,
} from "../../../../constants/formBuilder_constants";
import styles from "./FormBuilderBody.module.scss";
import FormBuilderBody_Right from "./components/FormBuilderBody_Right/FormBuilderBody_Right";
import AdditionalInfoRow from "./components/AdditionalInfoRow/AdditionalInfoRow";

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
          onChange={(value) => changeFormValue(FORM_BUILDER_FIEDS.title, value)}
          errorMessage={errors.title || ""}
        />

        <FormBuilderBody_Right
          index={index}
          expandIndex={expandIndex}
          errorsExist={errorsExist}
          savingState={savingState}
          setExpandIndex={setExpandIndex}
        />
      </div>

      <div className={styles.QuestionTypeRow}>
        <Dropdown
          options={questionTypesDropdownOptions}
          placeholder="Question Type*"
          value={formBuilderComponent.type}
          onChange={(value) => changeFormValue(FORM_BUILDER_FIEDS.type, value)}
          errorMessage={errors.type || ""}
        />
        <div className={styles.Checks}>
          <Checkbox
            label="Required"
            checked={formBuilderComponent.isRequired}
            onChange={(checked) =>
              changeFormValue(FORM_BUILDER_FIEDS.isRequired, checked)
            }
          />
          <Checkbox
            label="Hidden"
            checked={formBuilderComponent.isHidden}
            onChange={(checked) =>
              changeFormValue(FORM_BUILDER_FIEDS.isHidden, checked)
            }
          />
        </div>
      </div>
      <Input
        label="Helper Text"
        value={formBuilderComponent.helperText}
        onChange={(value) =>
          changeFormValue(FORM_BUILDER_FIEDS.helperText, value)
        }
      />
      {![
        QUESTION_TYPES.Date,
        QUESTION_TYPES.SingleSelect,
        QUESTION_TYPES.MultiSelect,
      ].includes(formBuilderComponent.type) && (
        <Input
          label="Default Value"
          value={formBuilderComponent.value}
          onChange={(value) => changeFormValue(FORM_BUILDER_FIEDS.value, value)}
        />
      )}

      <AdditionalInfoRow
        errors={errors}
        formBuilderComponent={formBuilderComponent}
        changeAdditionalProperties={changeAdditionalProperties}
      />
    </div>
  );
}

export default FormBuilderBody;
