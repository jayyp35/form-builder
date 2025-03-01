import { Routes, Route } from "react-router-dom";
import InvalidRoute from "./404";
import AppHome from "./AppHome";
import FormBuilder from "../modules/FormBuilder/FormBuilder";
import FormRenderer from "../modules/FormRenderer/FormRenderer";

function RootRoutes() {
  return (
    <Routes>
      <Route path="*" element={<InvalidRoute />} />
      <Route path="/" element={<AppHome />} />
      <Route path="/builder" element={<FormBuilder />} />
      <Route path="/view" element={<FormRenderer />} />
    </Routes>
  );
}

export default RootRoutes;
