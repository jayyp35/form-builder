import { FormBuilderData } from "../types/formbuider_types";

export function saveFormData(
  newFormDataToSave: FormBuilderData
): Promise<string> {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      //   if (Math.random() < 0.3) {
      //     reject(new Error("Failed to save form data. Please try again."));
      //     return;
      //   }

      const savedForms = JSON.parse(localStorage.getItem("savedForms") || "[]");
      let formDataWithId;
      let existingFormIndex = savedForms.findIndex(
        (form: FormBuilderData) => form.id === newFormDataToSave.id
      );

      if (newFormDataToSave.id && existingFormIndex !== -1) {
        console.log("hi");
        savedForms[existingFormIndex] = newFormDataToSave;
        formDataWithId = newFormDataToSave;
      } else {
        console.log("bi");
        // Save with a new ID
        const formId = `form_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 9)}`;
        formDataWithId = { ...newFormDataToSave, id: formId };
        savedForms.push(formDataWithId);
      }
      console.log("savedForms", savedForms);

      localStorage.setItem("savedForms", JSON.stringify(savedForms));
      resolve(formDataWithId.id as string);
    }, delay);
  });
}
