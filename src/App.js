import { createElement } from "./utils";
import Homepage from "../pages/HomePage";
import Router from "../components/Router";

export default function App() {
  const main = Homepage();

  Router(main);

  return createElement("div", { className: "div-parent" }, [main]);
}
