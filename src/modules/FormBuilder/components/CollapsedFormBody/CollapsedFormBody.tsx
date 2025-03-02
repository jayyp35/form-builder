import { FormBuilderComponent } from "../../../../types/formbuider_types";
import styles from "./CollapsedFromBody.module.scss";
import Collapsed_RightSection from "./components/RightSection/Collapsed_RightSection";

interface CollapsedFormBodyProps {
  index: number;
  errorsExist: boolean;
  formBuilderComponent: FormBuilderComponent;
  setExpandIndex: Function;
  formId: string;
  deletingIndex: number;
  handleDeleteFormComponent: (formId: string, componentIndex: number) => void;
}

function CollapsedFormBody({
  index,
  errorsExist,
  setExpandIndex,
  formBuilderComponent,
  formId,
  deletingIndex,
  handleDeleteFormComponent,
}: CollapsedFormBodyProps) {
  return (
    <div className={styles.CollapsedFormBody}>
      <div className={styles.QuestionTitleRow}>
        {errorsExist ? (
          <div className={styles.Incomplete}>Form component incomplete</div>
        ) : (
          <div>{formBuilderComponent.title}</div>
        )}
        <Collapsed_RightSection
          index={index}
          errorsExist={errorsExist}
          setExpandIndex={setExpandIndex}
          formId={formId}
          deletingIndex={deletingIndex}
          handleDeleteFormComponent={handleDeleteFormComponent}
        />
      </div>
    </div>
  );
}

export default CollapsedFormBody;
