import { createElement } from "../src/utils";

export default function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();
  const footer = createElement("div", {
    className: "footer",
    textContent: `© ${currentYear} Ivan Leffalle. All rights reserved.`,
  });
  return createElement("footer", { className: "" }, [footer]);
}
