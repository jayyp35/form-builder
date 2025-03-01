import styles from "./Loader.module.scss";

function Loader({ width = "20px", loadingText = "" }) {
  return (
    <>
      <div className={styles.Loader} style={{ width: width }}></div>
      {loadingText && <div className={styles.LoaderText}>{loadingText}</div>}
    </>
  );
}

export default Loader;
