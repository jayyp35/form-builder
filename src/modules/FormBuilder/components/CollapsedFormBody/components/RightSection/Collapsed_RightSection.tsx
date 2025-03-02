import { chevron_down, trash_icon } from "../../../../../../assets/assets";
import styles from "./Collapsed_RightSection.module.scss";

interface RightSectionProps {
  index: number;
  errorsExist: boolean;
  setExpandIndex: Function;
}

function Collapsed_RightSection({
  index,
  errorsExist,
  setExpandIndex,
}: RightSectionProps) {
  return (
    <div className={styles.RightSection}>
      <img
        src={trash_icon}
        className={styles.DeleteIcon}
        alt="down"
        height={"20px"}
        onClick={() => {
          if (!errorsExist) setExpandIndex(index);
        }}
      />
      <img
        src={chevron_down}
        className={styles.DownIcon}
        alt="down"
        height={"20px"}
        onClick={() => {
          if (!errorsExist) setExpandIndex(index);
        }}
      />
    </div>
  );
}

export default Collapsed_RightSection;
