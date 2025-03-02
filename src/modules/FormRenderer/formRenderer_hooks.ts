import { useEffect, useState } from "react";
import { FormBuilderData } from "../../types/formbuider_types";
import { fetchAllSavedForms, fetchFormDataById } from "../../service/service";
import { useParams } from "react-router-dom";
import { validateFormOnSubmission } from "../../utils/formrenderer_validations";
import { FORM_VALIDITIY_STATES } from "../../constants/formRenderer_constants";

export const useFetchAllForms = () => {
  //** Custom hook to handle logic of fetching all forms */
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState<FormBuilderData[]>([]);

  useEffect(() => {
    fetchAllForms();
  }, []);

  const fetchAllForms = () => {
    setIsLoading(true);
    fetchAllSavedForms()
      .then((forms) => {
        setForms(forms);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, forms };
};

export const useFetchSingleForm = () => {
  //** Custom hook to handle logic of fetching single form data */
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

  return { isLoading, setIsLoading, formConfig, setFormConfig };
};

export const useSingleFormValidityCheck = (
  formConfig: FormBuilderData | null,
  setFormConfig: Function
) => {
  //** Custom hook to handle logic of validity checks of a  single form data */
  const [isValid, setAllValid] = useState("");
  const onValidateFormClick = () => {
    if (!formConfig) return;
    const { isValid, updatedFormComponents } =
      validateFormOnSubmission(formConfig);

    setFormConfig((formConfig: FormBuilderData) =>
      formConfig
        ? {
            ...formConfig,
            components: updatedFormComponents,
          }
        : formConfig
    );
    setAllValid(
      isValid ? FORM_VALIDITIY_STATES.VALID : FORM_VALIDITIY_STATES.INVALID
    );
  };

  return { isValid, onValidateFormClick };
};
