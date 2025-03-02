import Datepick from "../../../../../../common/_custom/Datepick/Datepick";
import Dropdown from "../../../../../../common/_custom/Dropdown/Dropdown";
import Input, {
  INPUT_TYPES,
} from "../../../../../../common/_custom/Input/Input";
import {
  ADDITIONAL_DATA,
  NUMBER_TYPE_SUBTYPES,
  numberTypeSubtypesDropdownOptions,
  QUESTION_TYPES,
} from "../../../../../../constants/formBuilder_constants";
import { YMDdateFormat } from "../../../../../../utils/date_utils";
import styles from "./AdditionalInfoRow.module.scss";

function AdditionalInfoRow({
  formBuilderComponent,
  changeAdditionalProperties,
}: //   type,
any) {
  const AdditionlInfoNumber = () => (
    <>
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
      ].includes(formBuilderComponent?.additionalProperties?.numberType) && (
        <div className={styles.RangeContainer}>
          <Input
            label="Min"
            type={INPUT_TYPES.NUMBER}
            value={formBuilderComponent?.additionalProperties?.numberMin || ""}
            onChange={(value) =>
              changeAdditionalProperties(ADDITIONAL_DATA.NumberMin, value)
            }
          />
          <Input
            label="Max"
            type={INPUT_TYPES.NUMBER}
            value={formBuilderComponent?.additionalProperties?.numberMax || ""}
            onChange={(value) =>
              changeAdditionalProperties(ADDITIONAL_DATA.NumberMax, value)
            }
          />
        </div>
      )}
    </>
  );

  const AdditionalInfoDate = () => (
    <>
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
    </>
  );

  const renderAdditionInfoContent = () => {
    switch (formBuilderComponent.type) {
      case QUESTION_TYPES.Number:
        return <>{AdditionlInfoNumber()}</>;
      case QUESTION_TYPES.Date:
        return <>{AdditionalInfoDate()}</>;
    }
  };
  return (
    <div className={styles.AdditionalInfoRow}>
      {renderAdditionInfoContent()}
    </div>
  );
}

export default AdditionalInfoRow;
