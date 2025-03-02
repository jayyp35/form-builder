import Loader from "../../../../../common/_custom/Loader/Loader";
import styles from "./SingleFormBody_Loader.module.scss";

function SingleFormBody_Loader() {
  return (
    <div className={styles.Loading}>
      <Loader width="50px" loadingText="Loading Form Details" />
    </div>
  );
}

export default SingleFormBody_Loader;
