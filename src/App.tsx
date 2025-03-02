import "./App.css";
import RootRoutes from "./routes/RootRoutes";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <div className={"App"}>
      <RootRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
