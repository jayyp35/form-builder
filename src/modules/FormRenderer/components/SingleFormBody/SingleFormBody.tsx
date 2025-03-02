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
import Datepick from "../../../../common/_custom/Datepick/Datepick";
import TextArea from "../../../../common/_custom/Paragraph/TextArea";
import greentick from "../../../../assets/green-tick.svg";
import erroricon from "../../../../assets/error.svg";

const FORM_VALIDITIY_STATES = {
  VALID: "VALID",
  INVALID: "INVALID",
};

function SingleFormBody() {
  const params = useParams();
  const formId = params.formId;

  const [isLoading, setIsLoading] = useState(true);
  const [formConfig, setFormConfig] = useState<FormBuilderData | null>(null);
  const [isValid, setAllValid] = useState("");

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
    let isValid = true;
    components = components.map((singleFormComponent: FormBuilderComponent) => {
      const value = singleFormComponent.value;
      const type = singleFormComponent.type;
      if (type === "Phone Number") console.log(String(value)?.length !== 10);

      const minValue = Number(
        singleFormComponent?.additionalProperties?.numberMin
      );
      const maxValue = Number(
        singleFormComponent?.additionalProperties?.numberMax
      );

      let errorMessage;

      if (singleFormComponent.value) {
        if (type === "Email" && !emailRegex.test(value as string)) {
          errorMessage = "Email is invalid";
        } else if (
          ["Number", "Years", "Range"].includes(type) &&
          ((minValue ? Number(value) < minValue : false) ||
            (maxValue ? maxValue && Number(value) > maxValue : false))
        ) {
          errorMessage = `Value must be between ${minValue}-${maxValue}`;
        } else if (type === "Phone Number" && String(value)?.length !== 10) {
          errorMessage = "Phone Number must be 10 digits long";
        } else {
          delete singleFormComponent.errorMessage;
        }
      } else {
        if (singleFormComponent.isRequired)
          errorMessage = "This field is required";
        else delete singleFormComponent.errorMessage;
      }

      if (errorMessage && isValid) isValid = false;

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
    setAllValid(
      isValid ? FORM_VALIDITIY_STATES.VALID : FORM_VALIDITIY_STATES.INVALID
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
            errorMessage={component.errorMessage}
          />
        );
      case "Description":
        return (
          <TextArea
            key={index}
            placeholder={component.helperText}
            value={component.value || ""}
            onChange={(value) => handleInputChange(index, value)}
            errorMessage={component.errorMessage}
          />
        );
      case "Date":
        return (
          <Datepick
            value={component.value as string}
            onChange={(value) => handleInputChange(index, value)}
            errorMessage={component.errorMessage}
            minDate={component?.additionalProperties?.dateMin || ""}
            maxDate={component?.additionalProperties?.dateMax || ""}
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
            {isValid === FORM_VALIDITIY_STATES.VALID ? (
              <div className={styles.ValidityText}>
                <img src={greentick} alt="greentick" height={"18px"} />
                All inputs are valid
              </div>
            ) : isValid === FORM_VALIDITIY_STATES.INVALID ? (
              <div className={styles.ValidityText}>
                <img src={erroricon} alt="errorIcon" height={"18px"} />
                There are some errors in the form. Please rectify before
                proceeding.
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleFormBody;
