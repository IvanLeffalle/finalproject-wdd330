import { createElement } from "../src/utils";

export default function Header() {
  const logo = createElement("div", {
    className: "logo",
    textContent: "GeneaHub",
  });

  const menu = createElement("a", { id: "menuIcon", href: "#" });

  const navList = createElement(
    "ul",
    { className: "nav-list", id: "navList" },
    [
      createElement("li", {}, [
        createElement("a", { href: "/", textContent: "Home", id: "home" }),
      ]),
      createElement("li", {}, [
        createElement("a", {
          href: "/links",
          textContent: "Tools",
          id: "tools",
        }),
      ]),
      createElement("li", {}, [
        createElement("a", {
          href: "/about",
          textContent: "About",
          id: "about",
        }),
      ]),
    ]
  );

  const nav = createElement("nav", {}, [navList, menu]);

  const section = createElement("section", { className: "header-container" }, [
    logo,
    nav,
  ]);

  const header = createElement("div", {}, [section]);

  const aMenu = header.querySelector("#menuIcon");
  const aList = header.querySelector("#navList");

  if (aMenu && aList) {
    aMenu.addEventListener("click", () => {
      event.preventDefault();
      aList.classList.toggle("active");
      aMenu.classList.toggle("active");
    });
  }

  return header;
}
