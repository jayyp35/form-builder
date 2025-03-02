import { FormBuilderData } from "../types/formbuider_types";

export function saveFormData(
  newFormDataToSave: FormBuilderData
): Promise<void> {
  return new Promise((resolve) => {
    console.log("newFormDataToSave", newFormDataToSave);
    const delay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      //   if (Math.random() < 0.3) {
      //     reject(new Error("Failed to save form data. Please try again."));
      //     return;
      //   }

      let savedForms = JSON.parse(localStorage.getItem("savedForms") || "[]");
      const currentDateTime = new Date().toISOString();
      let updatedFormData = {
        ...newFormDataToSave,
        lastUpdated: currentDateTime,
      };

      if (newFormDataToSave.id) {
        let existingFormIndex = savedForms.findIndex(
          (form: FormBuilderData) => form.id === newFormDataToSave.id
        );
        if (existingFormIndex > -1) {
          savedForms[existingFormIndex] = updatedFormData;
        } else {
          savedForms.push(updatedFormData);
        }
      }

      localStorage.setItem("savedForms", JSON.stringify(savedForms));
      resolve();
    }, delay);
  });
}

export function fetchAllSavedForms(): Promise<FormBuilderData[]> {
  return new Promise((resolve) => {
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
  return new Promise((resolve) => {
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

export function deleteFormComponentByIndex(
  formId: string,
  componentIndex: number
): Promise<number | null> {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error("Failed to delete form component. Please try again."));
        return;
      }

      const savedForms = JSON.parse(localStorage.getItem("savedForms") || "[]");
      const formIndex = savedForms.findIndex(
        (form: FormBuilderData) => form.id === formId
      );

      if (formIndex > -1) {
        const formData: FormBuilderData = savedForms[formIndex];
        if (
          componentIndex >= 0 &&
          componentIndex < formData.components.length
        ) {
          formData.components.splice(componentIndex, 1);
          savedForms[formIndex] = formData;
          localStorage.setItem("savedForms", JSON.stringify(savedForms));
          resolve(componentIndex || null);
        } else {
          reject(new Error("Invalid component index."));
        }
      } else {
        reject(new Error("Form not found."));
      }
    }, delay);
  });
}
