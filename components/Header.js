import { createElement } from "../src/utils";

export default function Header() {
  const logo = createElement("div", {
    className: "logo",
    textContent: "FamilyHub",
  });

  const aHome = createElement("a", { href: "/#/", textContent: "Home" });
  const aTools = createElement("a", { href: "/#/links", textContent: "Tools" });
  const aAbout = createElement("a", { href: "/#/about", textContent: "About" });

  const li = createElement("li", {}, [aHome, aTools, aAbout]);

  const ul = createElement("ul", {}, [li]);

  const nav = createElement("nav", {}, [ul]);
  const section = createElement("section", { className: "header-container" }, [
    logo,
    nav,
  ]);

  return createElement("div", { className: "" }, [section]);
}
