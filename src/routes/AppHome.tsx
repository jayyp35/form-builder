import Button from "../common/_custom/Button/Button";
import styles from "../scss/AppHome.module.scss";

function AppHome() {
  return (
    <div className={styles.AppHome}>
      React Form Builder
      <div className={styles.Buttons}>
        <Button text={"Create Form"} />
        <Button text={"View Forms"} type="secondary" />
      </div>
    </div>
  );
}

export default AppHome;
