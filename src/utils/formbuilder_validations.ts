import { FormBuilderComponent } from "../types/formbuider_types";

export const validateNewFormComponent = (
  formBuilderData: FormBuilderComponent
) => {
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
