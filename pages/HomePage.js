import Header from "../components/Header";
import { createElement } from "../src/utils";
import searchIconPng from "../src/assets/search-icon.png";
import Footer from "../components/Footer";
export default function Homepage() {
  const header = createElement("header", {}, [Header()]);
  const footer = createElement("footer", {}, [Footer()]);
  
  const searchIcon = createElement("img", {
    className: "search-icon",
    src: searchIconPng, 
    alt: "Search Icon",
  });

  const title = createElement("h1", {
    textContent: "GeneaHub",
    className: "title",
  });

  const input = createElement("input", {
    type: "text",
    id: "surname",
    className: "input-search",
    Placeholder: "Enter your surname...",
  });
  const inputWrapper = createElement("div", { className: "input-wrapper" }, [
    searchIcon,
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

  return createElement("div", { className: "div-parent" }, [
    header,
    main,
    footer,
  ]);
}
