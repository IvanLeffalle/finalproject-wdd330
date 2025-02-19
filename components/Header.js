import { createElement } from "../src/utils";

export default function Header() {
  const logo = createElement("div", {
    className: "logo",
    textContent: "GeneaHub",
  });

  const aHome = createElement("a", {
    href: "/",
    textContent: "Home",
    id: "home",
  });
  const aTools = createElement("a", {
    href: "/links",
    textContent: "Tools",
    id: "tools",
  });
  const aAbout = createElement("a", {
    href: "/about",
    textContent: "About",
    id: "about",
  });

  const li = createElement("li", {}, [aHome, aTools, aAbout]);

  const ul = createElement("ul", { className: "nav-list", id: "navList" }, [
    li,
  ]);

  const nav = createElement("nav", {}, [ul]);
  const section = createElement("section", { className: "header-container" }, [
    logo,
    nav,
  ]);

  return createElement("div", { className: "" }, [section]);
}
