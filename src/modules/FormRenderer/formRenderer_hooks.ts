import { useEffect, useState } from "react";
import { FormBuilderData } from "../../types/formbuider_types";
import { fetchAllSavedForms } from "../../service/service";

export const useFetchAllForms = () => {
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
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return { isLoading, forms };
};
