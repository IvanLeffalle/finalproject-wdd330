import { createElement } from "./utils";

export default function App() {
  const header = createElement("h1", {
    textContent: "GeneasssssHub",
    className: "heading",
  });

  const main = createElement("main");

  return createElement("div", {}, [header, main]);
}
