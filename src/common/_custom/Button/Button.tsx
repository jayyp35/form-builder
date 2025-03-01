import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

const BUTTON_TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

interface ButtonProps {
  text: string;
  type?: (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
}

function Button({ text, type = BUTTON_TYPES.PRIMARY }: ButtonProps) {
  return (
    <button
      className={clsx(styles.Button, {
        [styles.PrimaryButton]: type === BUTTON_TYPES.PRIMARY,
        [styles.SecondaryButton]: type === BUTTON_TYPES.SECONDARY,
      })}
    >
      {text}
    </button>
  );
}

export default Button;
