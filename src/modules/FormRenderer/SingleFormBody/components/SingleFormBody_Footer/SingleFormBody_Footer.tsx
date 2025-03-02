import { error_icon, green_tick } from "../../../../../assets/assets";
import { FORM_VALIDITIY_STATES } from "../../../../../constants/formRenderer_constants";

import Button from "../../../../../common/_custom/Button/Button";
import styles from "./SingleFormBody_Footer.module.scss";

interface SingleFormBody_FooterProps {
  isValid: string;
  onValidateFormClick: () => void;
}

function SingleFormBody_Footer({
  isValid,
  onValidateFormClick,
}: SingleFormBody_FooterProps) {
  return (
    <div className={styles.SingleFormBody_Footer}>
      <Button text="Validate Form" onClick={onValidateFormClick} />
      {isValid === FORM_VALIDITIY_STATES.VALID ? (
        <div className={styles.ValidityText}>
          <img src={green_tick} alt="greentick" height={"18px"} />
          All inputs are valid
        </div>
      ) : isValid === FORM_VALIDITIY_STATES.INVALID ? (
        <div className={styles.ValidityText}>
          <img src={error_icon} alt="errorIcon" height={"18px"} />
          There are some errors in the form. Please rectify before proceeding.
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SingleFormBody_Footer;
