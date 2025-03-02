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

  onClick?: () => void;
}

function Button({
  text, //* Used to show text on the button
  type = BUTTON_TYPES.PRIMARY, //Themed primary or secondary
  onClick = () => {}, //Click handler
  disabled = false, //Disable button functionality
}: ButtonProps) {
  return (
    <button
      className={clsx(styles.Button, {
        [styles.PrimaryButton]: type === BUTTON_TYPES.PRIMARY,
        [styles.SecondaryButton]: type === BUTTON_TYPES.SECONDARY,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
