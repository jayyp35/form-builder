import { FormBuilderData } from "../../types/formbuider_types";
import { useNavigate } from "react-router-dom";
import { useFetchAllForms } from "./formRenderer_hooks";

import Button from "../../common/_custom/Button/Button";
import FormRenderer_Loader from "./components/FormRenderer_Loader/FormRenderer_Loader";
import FormRenderer_EmptyScreen from "./components/FormRenderer_EmptyScreen/FormRenderer_EmptyScreen";
import styles from "./FormRenderer.module.scss";
import SavedFormCard from "./components/SavedFormCard/SavedFormCard";

export default function FormRenderer() {
  const navigate = useNavigate();
  const { isLoading, forms } = useFetchAllForms();

  return (
    <div className={styles.FormRenderer}>
      <div className={styles.Title}>
        <Button type="secondary" text="Back" onClick={() => navigate(-1)} />
        View Forms
      </div>

      {isLoading ? (
        <FormRenderer_Loader />
      ) : (
        <div className={styles.SavedFormsContainer}>
          {forms?.length ? (
            forms?.map((formBuilderData: FormBuilderData) => (
              <SavedFormCard
                key={formBuilderData.id}
                formBuilderData={formBuilderData}
              />
            ))
          ) : (
            <FormRenderer_EmptyScreen />
          )}
        </div>
      )}
    </div>
  );
}
