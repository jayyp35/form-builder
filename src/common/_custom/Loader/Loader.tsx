import styles from "./Loader.module.scss";

function Loader({ width = "20px" }) {
  return <div className={styles.Loader} style={{ width: width }}></div>;
}

export default Loader;
