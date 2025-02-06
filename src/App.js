import { createElement } from "./utils";
import Homepage from "../pages/HomePage";

export default function App() {
  return createElement("div", {}, [Homepage()]);
}
