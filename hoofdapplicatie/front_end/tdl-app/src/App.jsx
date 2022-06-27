import "./style/App.scss";
import "react-toastify/dist/ReactToastify.css";
import RouterHeader from "./modules/RouterHeader";
import Routing from "./modules/Routing";

export default function App() {
  return (
    <>
      <RouterHeader />
      <Routing />
    </>
  );
}
