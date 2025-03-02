import clsx from "clsx";
import styles from "./Loader.module.scss";

function Loader({ width = "20px", loadingText = "", secondary = false }) {
  return (
    <>
      <div
        className={clsx(styles.Loader, {
          [styles.Secondary]: secondary,
        })}
        style={{ width: width }}
      ></div>
      {loadingText && <div className={styles.LoaderText}>{loadingText}</div>}
    </>
  );
}

export default Loader;
