import React from "react";
import Button from "../common/_custom/Button/Button";

function AppHome() {
  return (
    <div>
      React Form Builder
      <Button text={"Create Form"} />
      <Button text={"View Forms"} type="secondary" />
    </div>
  );
}

export default AppHome;
