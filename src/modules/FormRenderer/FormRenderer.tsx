import { useEffect, useState } from "react";
import styles from "./FormRenderer.module.scss";
import { FormBuilderComponent } from "../../types/formbuider_types";
import Input from "../../common/_custom/Input/Input";

export default function FormRenderer() {
  const [formData, setFormData] = useState<FormBuilderComponent[]>([]);
  const formdataLocal = JSON.parse(localStorage.getItem("_formdata") || "");

  useEffect(() => {
    if (formdataLocal) setFormData(formdataLocal);
  }, []);

  const changeValueForField = (fieldIndex: number, value: string | number) => {
    setFormData((existingData) =>
      existingData.map((component, index) =>
        index === fieldIndex
          ? {
              ...component,
              value: value,
            }
          : component
      )
    );
  };

  const renderInputElement = (
    formDataComponent: FormBuilderComponent,
    index: number
  ) => {
    switch (formDataComponent.type) {
      default:
        return (
          <Input
            placeholder={formDataComponent.helperText}
            value={formDataComponent?.value || ""}
            onChange={(val) => {
              changeValueForField(index, val);
            }}
          />
        );
    }
  };
  return (
    <div className={styles.FormRenderer}>
      <div className={styles.Title}>View Form</div>

      {formData.length && (
        <div className={styles.FormContainer}>
          {formData?.map(
            (formDataComponent: FormBuilderComponent, i: number) => (
              <div className={styles.SingleFormField}>
                <div>{formDataComponent.title}</div>
                <div>{renderInputElement(formDataComponent, i)}</div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
