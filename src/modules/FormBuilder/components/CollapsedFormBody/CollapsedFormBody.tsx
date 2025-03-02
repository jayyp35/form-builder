import { FormBuilderComponent } from "../../../../types/formbuider_types";
import styles from "./CollapsedFromBody.module.scss";
import Collapsed_RightSection from "./components/RightSection/Collapsed_RightSection";

interface CollapsedFormBodyProps {
  index: number;
  errorsExist: boolean;
  formBuilderComponent: FormBuilderComponent;
  setExpandIndex: Function;
}

function CollapsedFormBody({
  index,
  errorsExist,
  setExpandIndex,
  formBuilderComponent,
}: CollapsedFormBodyProps) {
  return (
    <div className={styles.CollapsedFormBody}>
      <div className={styles.QuestionTitleRow}>
        <div>{formBuilderComponent.title}</div>
        <Collapsed_RightSection
          index={index}
          errorsExist={errorsExist}
          setExpandIndex={setExpandIndex}
        />
      </div>
    </div>
  );
}

export default CollapsedFormBody;
