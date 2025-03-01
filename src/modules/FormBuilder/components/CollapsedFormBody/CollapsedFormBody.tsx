import styles from "./CollapsedFromBody.module.scss";
import trash from "../../../../assets/trash.svg";
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
        <div className={styles.Right}>
          <img
            src={trash}
            className={styles.DeleteIcon}
            alt="down"
            height={"20px"}
            onClick={() => {
              if (!errorsExist) setExpandIndex(index);
            }}
          />
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
    </div>
  );
}

export default CollapsedFormBody;
