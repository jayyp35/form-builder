import { useNavigate } from "react-router-dom";
import Button from "../common/_custom/Button/Button";
import styles from "../scss/AppHome.module.scss";

function AppHome() {
  const navigate = useNavigate();

  return (
    <div className={styles.AppHome}>
      React Form Builder
      <div className={styles.Buttons}>
        <Button text={"Create Form"} onClick={() => navigate("/builder")} />
        <Button
          text={"View Forms"}
          type="secondary"
          onClick={() => navigate("/view")}
        />
      </div>
    </div>
  );
}

export default AppHome;
