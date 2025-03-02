import { FormBuilderComponent } from "../types/formbuider_types";

interface ValidationResult {
  isValid: boolean;
  errorsObject: { [key: string]: string };
}

export const validateNewFormComponent = (
  formBuilderData: FormBuilderComponent
): ValidationResult => {
  let errors: any = {};

  if (!formBuilderData.title) {
    errors.title = "Title is required";
  }
  if (!formBuilderData.type) {
    errors.type = "Type is required";
  }

  return {
    isValid: !Object.keys(errors).length,
    errorsObject: errors,
  };
};
