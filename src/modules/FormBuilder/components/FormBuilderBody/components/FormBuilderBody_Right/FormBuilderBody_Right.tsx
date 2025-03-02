import clsx from "clsx";
import { chevron_down, green_tick } from "../../../../../../assets/assets";
import Loader from "../../../../../../common/_custom/Loader/Loader";
import { SAVE_STATES } from "../../../../formBuilder_hooks";
import styles from "./FormBuilderBody_Right.module.scss";

interface FormBuilderBody_RightProps {
  index: number;
  expandIndex: number;
  savingState: string;
  errorsExist: boolean;
  setExpandIndex: (arg: null | number) => void;
}

function FormBuilderBody_Right({
  index,
  expandIndex,
  savingState,
  errorsExist,
  setExpandIndex,
}: FormBuilderBody_RightProps) {
  return (
    <div className={styles.RightSection}>
      <div className={styles.Status}>
        {savingState === SAVE_STATES.SAVING ? (
          <Loader width="20px" />
        ) : savingState === SAVE_STATES.ERROR || errorsExist ? (
          <></>
        ) : (
          <img src={green_tick} alt="status" height={"20px"} />
        )}
      </div>
      <img
        src={chevron_down}
        className={clsx(styles.DownIcon, {
          [styles.Rotate]: index === expandIndex,
        })}
        alt="down"
        height={"20px"}
        style={{
          transform: index === expandIndex ? "rotate(180deg)" : "",
        }}
        onClick={() => {
          if (!errorsExist) setExpandIndex(null);
        }}
      />
    </div>
  );
}

export default FormBuilderBody_Right;
