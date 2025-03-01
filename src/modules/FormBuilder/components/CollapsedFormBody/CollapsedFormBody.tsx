import styles from "./CollapsedFromBody.module.scss";
import chevronDown from "../../../../assets/chevron-down.svg";

function CollapsedFormBody({
  index,
  errorsExist,
  setExpandIndex,
  formBuilderComponent,
}: any) {
  return (
    <div className={styles.CollapsedFormBody}>
      <div className={styles.QuestionTitleRow}>
        <div>{formBuilderComponent.title}</div>
        <img
          src={chevronDown}
          className={styles.DownIcon}
          alt="down"
          height={"20px"}
          onClick={() => {
            if (!errorsExist) setExpandIndex(index);
          }}
        />
      </div>
    </div>
  );
}

export default CollapsedFormBody;
