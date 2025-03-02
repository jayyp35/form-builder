import { chevron_down, trash_icon } from "../../../../../../assets/assets";
import Loader from "../../../../../../common/_custom/Loader/Loader";
import styles from "./Collapsed_RightSection.module.scss";

interface RightSectionProps {
  index: number;
  errorsExist: boolean;
  setExpandIndex: Function;

  formId: string;
  deletingIndex: number;
  handleDeleteFormComponent: (id: string, index: number) => void;
}

function Collapsed_RightSection({
  index,
  formId,
  deletingIndex,
  handleDeleteFormComponent,
}: RightSectionProps) {
  return (
    <div className={styles.RightSection}>
      {deletingIndex === index ? (
        <div className={styles.DeleteIcon}>
          <Loader secondary />
        </div>
      ) : (
        <img
          src={trash_icon}
          className={styles.DeleteIcon}
          alt="down"
          height={"20px"}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDeleteFormComponent(formId, index);
          }}
        />
      )}
      <img
        src={chevron_down}
        className={styles.DownIcon}
        alt="down"
        height={"20px"}
      />
    </div>
  );
}

export default Collapsed_RightSection;
