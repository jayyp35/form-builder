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

      if (newFormDataToSave.id) {
        console.log("Form has ID: ", newFormDataToSave.id);
        let existingFormIndex = savedForms.findIndex(
          (form: FormBuilderData) => form.id === newFormDataToSave.id
        );
        savedForms[existingFormIndex] = newFormDataToSave;
        formDataWithId = newFormDataToSave;
      } else {
        console.log("Form has no id, saving as new ");
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

export function fetchAllSavedForms(): Promise<FormBuilderData[]> {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      //   if (Math.random() < 0.3) {
      //     reject(new Error("Failed to fetch saved forms. Please try again."));
      //     return;
      //   }

      const savedForms = JSON.parse(localStorage.getItem("savedForms") || "[]");
      resolve(savedForms);
    }, delay);
  });
}

export function fetchFormDataById(id: string): Promise<FormBuilderData | null> {
  return new Promise((resolve, reject) => {
    // const delay = Math.floor(Math.random() * 2000) + 1000;
    const delay = 2000;
    setTimeout(() => {
      //   if (Math.random() < 0.3) {
      //     reject(new Error("Failed to fetch form data. Please try again."));
      //     return;
      //   }

      const savedForms = JSON.parse(localStorage.getItem("savedForms") || "[]");
      const formData =
        savedForms.find((form: FormBuilderData) => form.id === id) || null;
      resolve(formData);
    }, delay);
  });
}
