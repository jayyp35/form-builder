import styles from "./FormRenderer.module.scss";
import { FormBuilderData } from "../../types/formbuider_types";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/_custom/Loader/Loader";
import { formatDate } from "../../utils/date_utils";
import { useFetchAllForms } from "./formRenderer_hooks";
import Button from "../../common/_custom/Button/Button";

export default function FormRenderer() {
  const navigate = useNavigate();
  const { isLoading, forms } = useFetchAllForms();

  const LoadingComponent = () => (
    <div className={styles.Loading}>
      <Loader width="50px" loadingText="Fetching Saved Forms" />
    </div>
  );

  const EmptyComponent = () => <div>No Saved Forms to show</div>;

  return (
    <div className={styles.FormRenderer}>
      <div className={styles.Title}>
        <Button type="secondary" text="Back" onClick={() => navigate(-1)} />
        View Forms
      </div>

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
                <div className={styles.LastUpdated}>
                  Last updated:{" "}
                  {formatDate(formBuildData.lastUpdated as string)}
                </div>
              </div>
            ))
          ) : (
            <EmptyComponent />
          )}
        </div>
      )}
    </div>
  );
}
