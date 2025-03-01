import { useEffect, useState } from "react";
import styles from "./FormRenderer.module.scss";
import {
  FormBuilderComponent,
  FormBuilderData,
} from "../../types/formbuider_types";
import Input from "../../common/_custom/Input/Input";

export default function FormRenderer() {
  const [forms, setForms] = useState<FormBuilderComponent[]>([]);
  const savedForms = JSON.parse(localStorage.getItem("savedForms") || "");

  useEffect(() => {
    if (savedForms) setForms(savedForms);
  }, []);

  const changeValueForField = (fieldIndex: number, value: string | number) => {
    setForms((existingData) =>
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
      <div className={styles.Title}>View Forms</div>

      <div className={styles.SavedFormsContainer}>
        {savedForms?.map((formBuildData: FormBuilderData) => (
          <div className={styles.SavedFormCard} key={formBuildData.id}>
            <div className={styles.Top}>
              {formBuildData.metadata.name}
              <span className={styles.FieldsCount}>
                {formBuildData?.components?.length} fields
              </span>
            </div>
            <div className={styles.LastUpdated}>Last updated: </div>
          </div>
        ))}
      </div>

      {/* {formData.length && (
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
      )} */}
    </div>
  );
}
