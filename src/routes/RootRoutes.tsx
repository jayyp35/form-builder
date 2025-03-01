import { Routes, Route } from "react-router-dom";
import InvalidRoute from "./404";
import AppHome from "./AppHome";

function RootRoutes() {
  return (
    <Routes>
      <Route path="*" element={<InvalidRoute />} />
      <Route path="/" element={<AppHome />} />
      <Route path="/builder" element={<>Builder</>} />
      <Route path="/render" element={<>Render</>} />
    </Routes>
  );
}

export default RootRoutes;
