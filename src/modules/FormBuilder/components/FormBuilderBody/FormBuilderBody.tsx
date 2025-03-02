import clsx from "clsx";
import { SAVE_STATES } from "../../formBuilder_hooks";
import { chevron_down, green_tick } from "../../../../assets/assets";

import Input, { INPUT_TYPES } from "../../../../common/_custom/Input/Input";
import Loader from "../../../../common/_custom/Loader/Loader";
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

        <div className={styles.Right}>
          <div className={styles.Status}>
            {savingState === SAVE_STATES.SAVING ? (
              <Loader width="20px" />
            ) : savingState === SAVE_STATES.ERROR ? (
              <></>
            ) : (
              <img src={green_tick} alt="status" height={"20px"} />
            )}
          </div>
          <img
            src={chevron_down}
            className={clsx(styles.DownIcon, {
              [styles.Rotate]: index === expandIndex,
            })}
            alt="down"
            height={"20px"}
            style={{
              transform: index === expandIndex ? "rotate(180deg)" : "",
            }}
            onClick={() => {
              if (!errorsExist) setExpandIndex(null);
            }}
          />
        </div>
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
