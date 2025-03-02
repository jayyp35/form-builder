import Loader from "../Loader/Loader";
import styles from "./Button.module.scss";
import clsx from "clsx";

export const BUTTON_TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

//**Custom Button Component
interface ButtonProps {
  text: string;
  type?: (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
  disabled?: boolean;
  loading?: boolean;

  onClick?: () => void;
}

function Button({
  text, //* Used to show text on the button
  type = BUTTON_TYPES.PRIMARY, //Themed primary or secondary
  onClick = () => {}, //Click handler
  disabled = false, //Disable button functionality
  loading = false,
}: ButtonProps) {
  return (
    <button
      className={clsx(styles.Button, {
        [styles.PrimaryButton]: type === BUTTON_TYPES.PRIMARY,
        [styles.SecondaryButton]: type === BUTTON_TYPES.SECONDARY,
        [styles.LoadingButton]: loading,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {loading && (
        <div className={styles.Loading}>
          <Loader width="15px" />
        </div>
      )}
    </button>
  );
}

export default Button;
