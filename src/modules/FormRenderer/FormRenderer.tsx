import { useEffect, useState } from "react";
import styles from "./FormRenderer.module.scss";
import {
  FormBuilderComponent,
  FormBuilderData,
} from "../../types/formbuider_types";
import Input from "../../common/_custom/Input/Input";
import { useNavigate } from "react-router-dom";
import { fetchAllSavedForms } from "../../service/service";
import Loader from "../../common/_custom/Loader/Loader";

export default function FormRenderer() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState<FormBuilderData[]>([]);

  //   useEffect(() => {
  //     if (savedForms) setForms(savedForms);
  //   }, []);

  useEffect(() => {
    fetchAllForms();
  }, []);

  const fetchAllForms = () => {
    setIsLoading(true);
    fetchAllSavedForms()
      .then((forms) => {
        // console.log("forms", forms);
        setForms(forms);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const LoadingComponent = () => (
    <div className={styles.Loading}>
      <Loader width="50px" loadingText="Fetching Saved Forms" />
    </div>
  );

  const EmptyComponent = () => <div>No Saved Forms to show</div>;

  return (
    <div className={styles.FormRenderer}>
      <div className={styles.Title}>View Forms</div>

      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className={styles.SavedFormsContainer}>
          {forms?.length ? (
            forms?.map((formBuildData: FormBuilderData) => (
              <div
                className={styles.SavedFormCard}
                key={formBuildData.id}
                onClick={() => {
                  navigate(`/view/${formBuildData.id}`);
                }}
              >
                <div className={styles.Top}>
                  {formBuildData.metadata.name}
                  <span className={styles.FieldsCount}>
                    {formBuildData?.components?.length} fields
                  </span>
                </div>
                <div className={styles.LastUpdated}>Last updated: </div>
              </div>
            ))
          ) : (
            <EmptyComponent />
          )}
        </div>
      )}

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
