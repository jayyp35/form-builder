import { useEffect, useState } from "react";
import {
  FormBuilderComponent,
  FormBuilderData,
} from "../../types/formbuider_types";
import {
  deleteFormComponentByIndex,
  saveFormData,
} from "../../service/service";
import { validateNewFormComponent } from "../../utils/formbuilder_validations";
import { useDebouncedValue } from "../../utils/hooks";
import { getFormId } from "../../utils/utils";

export const SAVE_STATES = {
  SAVING: "SAVING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export const useFormBuilder = () => {
  const [deletingIndex, setDeletingIndex] = useState<null | number>(null);

  const [savingState, setSavingData] = useState<string>(""); //To show saving state loaders

  const [formBuilderData, setFormBuilderData] = useState<FormBuilderData>({
    id: getFormId(),
    metadata: {
      name: "",
    },
    components: [],
  }); // Initialised From Builder Date
  const [expandIndex, setExpandIndex] = useState<number | null>(null); //Index of Form component currently expanded
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); //Errors object

  const formBuilderDataDebounced = useDebouncedValue(formBuilderData); //Debounced Form Builder State Data to save to DB

  useEffect(() => {
    //* Whenever debounced form data is updated, save function is triggered.
    formBuilderDataDebounced.components.length &&
      saveData(formBuilderDataDebounced);
  }, [formBuilderDataDebounced]);

  const saveData = (formBuilderData: FormBuilderData) => {
    setErrors({});
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
    setSavingData(SAVE_STATES.SAVING);
    saveFormData(formBuilderData)
      .then(() => {
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

  const handleDeleteFormComponent = (
    formId: string,
    componentIndex: number
  ) => {
    setDeletingIndex(componentIndex);
    deleteFormComponentByIndex(formId, componentIndex)
      .then((updatedComponents: FormBuilderComponent[] | null) => {
        if (updatedComponents) {
          console.log("updated compnents are", updatedComponents);
          setFormBuilderData((existingData) => ({
            ...existingData,
            components: updatedComponents,
          }));
        }
      })
      .catch((err) => {
        window.alert("Could not delete");
      })
      .finally(() => setDeletingIndex(null));
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

    deletingIndex,
    handleDeleteFormComponent,
  };
};

// const useDeleteFormComponent = (formId: string, componentIndex: number) => {
//   const handleDeleteFormComponent = () => {
//     deleteFormComponentByIndex(formId, componentIndex)
//       .then((updatedComponents) => {})
//       .catch((err) => {});
//   };

//   return {
//     deleting,
//     handleDeleteFormComponent,
//   };
// };
