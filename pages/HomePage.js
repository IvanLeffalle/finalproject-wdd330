import Header from "../components/Header";
import { createElement } from "../src/utils";
export default function Homepage() {
  const header = createElement("header", {}, [Header()]);

  const title = createElement("h1", {
    textContent: "FamilyHub",
    className: "title",
  });
  const path = createElement("path", {
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  });
  const svg = createElement(
    "svg",
    {
      className: "search-icon",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
    },
    [path]
  );
  const input = createElement("input", {
    type: "text",
    id: "surname",
    className: "input-search",
    Placeholder: "Enter your surname...",
  });
  const inputWrapper = createElement("div", { className: "input-wrapper" }, [
    svg,
    input,
  ]);

  const searchButton = createElement("button", {
    className: "button",
    onclick: "search()",
    textContent: "Search",
  });
  const searchElement = createElement("div", { className: "search-element" }, [
    title,
    inputWrapper,
    searchButton,
  ]);
  const searchContainer = createElement(
    "div",
    { className: "search-container" },
    [searchElement]
  );

  const main = createElement("main", { className: "main-index" }, [
    searchContainer,
  ]);

  const footer = createElement(
    "footer",
    {
      className: "footer",
      textContent: "&copy; 2024 Surname Search. All rights reserved.",
    },
    []
  );

  function search() {
    const surname = document.getElementById("surname").value.trim();
    if (surname) {
      window.location.href = `results?query=${encodeURIComponent(surname)}`;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".button");
    const surnameInput = document.getElementById("surname");

    searchButton.addEventListener("click", search);

    surnameInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        search();
      }
    });
  });

  return createElement("div", {}, [header, main, footer]);
}
