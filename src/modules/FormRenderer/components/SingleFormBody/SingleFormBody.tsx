import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFormDataById } from "../../../../service/service";
import {
  FormBuilderComponent,
  FormBuilderData,
} from "../../../../types/formbuider_types";
import styles from "./SingleFormBody.module.scss";
import Input from "../../../../common/_custom/Input/Input";

function SingleFormBody() {
  const params = useParams();
  const formId = params.formId;

  const [isLoading, setIsLoading] = useState(true);
  const [formConfig, setFormConfig] = useState<FormBuilderData | null>(null);

  useEffect(() => {
    if (formId) fetchFormConfig();
  }, [formId]);

  const fetchFormConfig = () => {
    fetchFormDataById(formId as string)
      .then((fetchedFormConfig: FormBuilderData | null) => {
        if (fetchedFormConfig) {
          setFormConfig(fetchedFormConfig);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderFormComponent = (
    component: FormBuilderComponent,
    index: number
  ) => {
    switch (component.type) {
      case "Text":
      case "Description":
      case "Email":
      case "Phone Number":
        return (
          <Input
            key={index}
            placeholder={component.helperText}
            value={component.value as string}
            onChange={() => {}}
          />
        );
      case "Number":
        return (
          <Input
            key={index}
            placeholder={component.helperText}
            value={component.value as number}
            onChange={() => {}}
            type="number"
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className={styles.SingleFormBody}>
      <div className={styles.Title}>{formConfig?.metadata.name}</div>

      <div className={styles.ComponentsContainer}>
        {formConfig?.components.map((component, index) => (
          <div key={index} className={styles.SingleFormComponent}>
            <div className={styles.ComponentTitle}>{component.title}</div>
            {renderFormComponent(component, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleFormBody;
