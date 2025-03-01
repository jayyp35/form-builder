import styles from "./Button.module.scss";
import clsx from "clsx";

const BUTTON_TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

interface ButtonProps {
  text: string;
  type?: (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
  onClick?: () => void;
  disabled?: boolean;
}

function Button({
  text,
  type = BUTTON_TYPES.PRIMARY,
  onClick = () => {},
  disabled = false,
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
