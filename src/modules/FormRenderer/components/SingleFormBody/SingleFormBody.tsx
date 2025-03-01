import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFormDataById } from "../../../../service/service";
import {
  FormBuilderComponent,
  FormBuilderData,
} from "../../../../types/formbuider_types";
import styles from "./SingleFormBody.module.scss";
import Input from "../../../../common/_custom/Input/Input";
import Loader from "../../../../common/_custom/Loader/Loader";
import Button from "../../../../common/_custom/Button/Button";

function SingleFormBody() {
  const params = useParams();
  const formId = params.formId;

  const [isLoading, setIsLoading] = useState(true);
  const [formConfig, setFormConfig] = useState<FormBuilderData | null>(null);
  const [errorsExist, setErrorsExist] = useState(false);

  console.log("formConfig", formConfig);

  useEffect(() => {
    if (formId) fetchFormConfig();
  }, [formId]);

  useEffect(() => {
    if (formConfig) console.log(formConfig);
  }, [formConfig]);

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

  const validateForm = () => {
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    // "Text",
    // "Description",
    // "Email",
    // "Number",
    // "Phone Number",
    let components = structuredClone(formConfig?.components || []);
    components = components.map((singleFormComponent: FormBuilderComponent) => {
      console.log(singleFormComponent);
      let errorMessage;

      if (singleFormComponent.value) {
        if (
          singleFormComponent.type === "Email" &&
          !emailRegex.test(singleFormComponent.value as string)
        ) {
          errorMessage = "Email is invalid";
        } else if (singleFormComponent.type === "Number") {
          if (
            singleFormComponent.additionalProperties?.numberMin &&
            singleFormComponent.additionalProperties?.numberMax &&
            ((singleFormComponent.value as number) <
              singleFormComponent.additionalProperties?.numberMin ||
              (singleFormComponent.value as number) >
                singleFormComponent.additionalProperties?.numberMax)
          ) {
            errorMessage = `Value must be between ${singleFormComponent.additionalProperties?.numberMin}-${singleFormComponent.additionalProperties?.numberMax}`;
          }
        } else {
          delete singleFormComponent.errorMessage;
        }
      } else {
        if (singleFormComponent.isRequired)
          errorMessage = "This field is required";
        else delete singleFormComponent.errorMessage;
      }

      return {
        ...singleFormComponent,
        ...(errorMessage && { errorMessage: errorMessage }),
      };
    });
    setFormConfig((formConfig) =>
      formConfig
        ? {
            ...formConfig,
            components: components,
          }
        : formConfig
    );
    // setFormConfig((formConfig) => )
  };

  const handleInputChange = (index: number, value: string | number) => {
    setFormConfig((prevConfig) => {
      if (!prevConfig) return prevConfig;
      const updatedComponents = [...prevConfig.components];
      updatedComponents[index] = {
        ...updatedComponents[index],
        value,
      };
      return {
        ...prevConfig,
        components: updatedComponents,
      };
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
        return (
          <Input
            key={index}
            placeholder={component.helperText}
            value={component.value || ""}
            onChange={(value) => handleInputChange(index, value)}
            errorMessage={component.errorMessage}
          />
        );
      case "Phone Number":
      case "Number":
        return (
          <Input
            key={index}
            placeholder={component.helperText}
            value={component.value || ""}
            onChange={(value) => handleInputChange(index, value)}
            type="number"
          />
        );
      default:
        return null;
    }
  };

  const LoadingComponent = () => (
    <div className={styles.Loading}>
      <Loader width="50px" loadingText="Loading Form Details" />
    </div>
  );
  return (
    <div className={styles.SingleFormBody}>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className={styles.FormBodyContainer}>
          <div className={styles.Title}>{formConfig?.metadata.name}</div>

          <div className={styles.ComponentsContainer}>
            {formConfig?.components.map(
              (component, index) =>
                !component.isHidden && (
                  <div key={index} className={styles.SingleFormComponent}>
                    <div className={styles.ComponentTitle}>
                      {component.title}
                      {component.isRequired && "*"}
                    </div>
                    <div className={styles.FormComponent}>
                      {renderFormComponent(component, index)}
                    </div>
                  </div>
                )
            )}
          </div>

          <div className={styles.Footer}>
            <Button
              text="Validate Form"
              onClick={() => {
                validateForm();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleFormBody;
