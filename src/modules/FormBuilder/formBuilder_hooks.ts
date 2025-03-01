import { useEffect, useRef, useState } from "react";
import {
  FormBuilderComponent,
  FormBuilderData,
} from "../../types/formbuider_types";
import { saveFormData } from "../../service/service";
import { validateNewFormComponent } from "../../utils/formbuilder_validations";

const SAVE_STATES = {
  SAVING: "SAVING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export const useFormBuilder = () => {
  const [savingState, setSavingData] = useState<string>("");
  const [formBuilderData, setFormBuilderData] = useState<FormBuilderData>({
    id: "",
    metadata: {
      name: "",
    },
    components: [],
  });
  const [expandIndex, setExpandIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!formBuilderData.components.length) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      saveData();
    }, 100);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [formBuilderData.components]);

  const saveData = () => {
    if (savingState === SAVE_STATES.SAVING) return;
    setErrors({});
    setSavingData(SAVE_STATES.SAVING);
    if (expandIndex !== null) {
      let { isValid, errorsObject } = validateNewFormComponent(
        formBuilderData.components?.[expandIndex]
      );

      setErrors(errorsObject);
      if (!isValid) {
        setSavingData(SAVE_STATES.ERROR);
        return;
      }
    }
    saveFormData(formBuilderData)
      .then((id) => {
        setFormBuilderData((existingData) => ({
          ...existingData,
          id: id,
        }));
        setSavingData(SAVE_STATES.SUCCESS);
      })
      .catch(() => {
        setSavingData(SAVE_STATES.ERROR);
      });
  };

  const initialiseNewQuestion = () => {
    setSavingData("");
    const newQuestionData: FormBuilderComponent = {
      title: "",
      type: "",
      isRequired: false,
      isHidden: false,
      helperText: "",
    };
    setFormBuilderData((existingData) => {
      setExpandIndex(existingData.components?.length);
      return {
        ...existingData,
        components: [...existingData.components, newQuestionData],
      };
    });
  };

  const changeFormMetadata = (keyName: string, value: string | number) => {
    setFormBuilderData((existingData) => ({
      ...existingData,
      metadata: {
        ...existingData.metadata,
        [keyName]: value,
      },
    }));
  };

  const changeFormValue = (keyName: string, value: string | boolean) => {
    if (expandIndex === null) return;

    setFormBuilderData((existingData) => ({
      ...existingData,
      components: existingData.components.map((component, index) =>
        index === expandIndex ? { ...component, [keyName]: value } : component
      ),
    }));
  };

  const changeAdditionalProperties = (
    keyName: string,
    value: string | boolean
  ) => {
    if (expandIndex === null) return;

    setFormBuilderData((existingData) => ({
      ...existingData,
      components: existingData.components.map((component, index) =>
        index === expandIndex
          ? {
              ...component,
              additionalProperties: {
                ...component.additionalProperties,
                [keyName]: value,
              },
            }
          : component
      ),
    }));
  };

  const validateFormValue = (
    index: number,
    keyName: string,
    value: string | boolean
  ) => {
    let error = "";
    if (keyName === "title" && !value) {
      error = "Title is required";
    }
    if (keyName === "type" && !value) {
      error = "Type is required";
    }

    setErrors((existingErrors) => ({
      ...existingErrors,
      [keyName]: error,
    }));
  };

  return {
    savingState,
    formBuilderData,
    expandIndex,
    setExpandIndex,
    errors,
    initialiseNewQuestion,
    changeFormMetadata,
    changeFormValue,
    changeAdditionalProperties,
    validateFormValue,
  };
};
