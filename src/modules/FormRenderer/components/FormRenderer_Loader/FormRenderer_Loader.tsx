import Loader from "../../../../common/_custom/Loader/Loader";
import styles from "./FormRenderer_Loader.module.scss";

function FormRenderer_Loader() {
  return (
    <div className={styles.Loading}>
      <Loader width="50px" loadingText="Fetching Saved Forms" />
    </div>
  );
}

export default FormRenderer_Loader;
