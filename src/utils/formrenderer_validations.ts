import {
  NUMBER_TYPE_SUBTYPES,
  QUESTION_TYPES,
} from "../constants/formBuilder_constants";
import {
  FormBuilderComponent,
  FormBuilderData,
} from "../types/formbuider_types";
import { emailRegex } from "./utils";

interface FormRenderValidationResult {
  isValid: boolean;
  updatedFormComponents: FormBuilderComponent[];
}

//This validation function checks individual component for errors based on their rules
//Returns the components array with added errorMessages to the individual components which
//can be shown to the user on UI

export const validateFormOnSubmission = (
  formConfig: FormBuilderData
): FormRenderValidationResult => {
  let components = structuredClone(formConfig?.components || []);
  let isValid = true;

  components = components.map((singleFormComponent: FormBuilderComponent) => {
    const value = singleFormComponent.value;
    const type = singleFormComponent.type;

    const isRequired = singleFormComponent.isRequired;
    const isHidden = singleFormComponent.isHidden;
    const numberType = singleFormComponent.numberType;
    const minValue = Number(
      singleFormComponent?.additionalProperties?.numberMin
    );
    const maxValue = Number(
      singleFormComponent?.additionalProperties?.numberMax
    );

    //IF component is hidden, no need to validate
    if (isHidden) return singleFormComponent;

    //If not hidden, proceed to check if value is according to the rules

    let errorMessage;
    if (value) {
      switch (type) {
        case QUESTION_TYPES.Email:
          if (!emailRegex.test(value as string))
            errorMessage = "Email is invalid";
          break;
        case QUESTION_TYPES.Number:
          if (
            [NUMBER_TYPE_SUBTYPES.Years, NUMBER_TYPE_SUBTYPES.Range].includes(
              numberType as string
            ) &&
            ((minValue ? Number(value) < minValue : false) ||
              (maxValue ? maxValue && Number(value) > maxValue : false))
          ) {
            errorMessage = `Value must be between ${minValue}-${maxValue}`;
          }
          break;
        case QUESTION_TYPES.PhoneNumber:
          if (String(value)?.length !== 10) {
            errorMessage = "Phone Number must be 10 digits long";
          }
          break;
      }
    } else {
      if (isRequired) errorMessage = "This field is required";
    }
    if (!errorMessage) delete singleFormComponent.errorMessage;
    if (errorMessage && isValid) isValid = false;

    return {
      ...singleFormComponent,
      ...(errorMessage && { errorMessage: errorMessage }),
    };
  });

  return {
    updatedFormComponents: components,
    isValid: isValid,
  };
  //   setFormConfig((formConfig) =>
  //     formConfig
  //       ? {
  //           ...formConfig,
  //           components: components,
  //         }
  //       : formConfig
  //   );
  //   setAllValid(
  //     isValid ? FORM_VALIDITIY_STATES.VALID : FORM_VALIDITIY_STATES.INVALID
  //   );
  // setFormConfig((formConfig) => )
};
