import Input, { INPUT_TYPES } from "../../../../common/_custom/Input/Input";
import Dropdown from "../../../../common/_custom/Dropdown/Dropdown";
import Checkbox from "../../../../common/_custom/Checkbox/Checkbox";
import Datepick from "../../../../common/_custom/Datepick/Datepick";

import {
  ADDITIONAL_DATA,
  FORM_BUILDER_FIEDS,
  NUMBER_TYPE_SUBTYPES,
  numberTypeSubtypesDropdownOptions,
  QUESTION_TYPES,
  questionTypesDropdownOptions,
} from "../../../../constants/formBuilder_constants";
import { YMDdateFormat } from "../../../../utils/date_utils";
import styles from "./FormBuilderBody.module.scss";
import FormBuilderBody_Right from "./components/FormBuilderBody_Right/FormBuilderBody_Right";

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

      {formBuilderComponent.type === QUESTION_TYPES.Number && (
        <div className={styles.AdditionalInfoRow}>
          <Dropdown
            options={numberTypeSubtypesDropdownOptions}
            placeholder="Number Type*"
            value={formBuilderComponent?.additionalProperties?.numberType || ""}
            onChange={(value) =>
              changeAdditionalProperties(QUESTION_TYPES.NumberType, value)
            }
          />
          {[
            NUMBER_TYPE_SUBTYPES.Years,
            NUMBER_TYPE_SUBTYPES.Range,
            NUMBER_TYPE_SUBTYPES.Percentage,
          ].includes(
            formBuilderComponent?.additionalProperties?.numberType
          ) && (
            <div className={styles.RangeContainer}>
              <Input
                label="Min"
                type={INPUT_TYPES.NUMBER}
                value={
                  formBuilderComponent?.additionalProperties?.numberMin || ""
                }
                onChange={(value) =>
                  changeAdditionalProperties(ADDITIONAL_DATA.NumberMin, value)
                }
              />
              <Input
                label="Max"
                type={INPUT_TYPES.NUMBER}
                value={
                  formBuilderComponent?.additionalProperties?.numberMax || ""
                }
                onChange={(value) =>
                  changeAdditionalProperties(ADDITIONAL_DATA.NumberMax, value)
                }
              />
            </div>
          )}
        </div>
      )}
      {formBuilderComponent.type === QUESTION_TYPES.Date && (
        <div className={styles.AdditionalInfoRow}>
          <div>Select Date Range(optional)</div>
          <div className={styles.RangeContainer}>
            <Datepick
              label="Select Date"
              value={formBuilderComponent?.additionalProperties?.dateMin || ""}
              onChange={(value) =>
                changeAdditionalProperties(ADDITIONAL_DATA.DateMin, value)
              }
              placeholder={YMDdateFormat}
            />
            <Datepick
              label="Select Date"
              value={formBuilderComponent?.additionalProperties?.dateMax || ""}
              onChange={(value) =>
                changeAdditionalProperties(ADDITIONAL_DATA.DateMax, value)
              }
              placeholder={YMDdateFormat}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FormBuilderBody;
