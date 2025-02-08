import { createElement } from "../src/utils";
export default function AdvancedSearch() {
  const searchContainer = createElement(
    "div",
    { className: "search-container" },
    [
      createElement("div", { className: "search-element" }, [
        createElement(
          "h1",
          { className: "title", textContent: "Advanced Search" },
          []
        ),
        createElement("div", { className: "input-wrapper" }, [
          createElement(
            "svg",
            {
              className: "search-icon",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
            },
            [
              createElement("path", {
                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
              }),
            ]
          ),
          createElement("input", {
            type: "text",
            id: "surname",
            className: "input-search",
            placeholder: "Enter your search term...",
            "aria-label": "Search input",
          }),
        ]),
        createElement("button", {
          id: "searchButton",
          className: "button",
          textContent: "Search",
          onclick: "searchClick()",
        }),
      ]),
    ]
  );

  const filterItems = [
    { text: "All Sources", filter: "all", active: true },
    { text: "Google Books", filter: "google" },
    { text: "Wikipedia", filter: "wikipedia" },
    { text: "Anaforas", filter: "anaforas" },
  ].map((item) => {
    return createElement("li", {}, [
      createElement("a", {
        href: "#",
        className: item.active ? "active" : "",
        "data-filter": item.filter,
        textContent: item.text,
        onclick: "handleFilterClick(this)",
      }),
    ]);
  });

  const filters = createElement("aside", { className: "filters" }, [
    createElement("h3", {}, ["Data Sources"]),
    createElement(
      "ul",
      { className: "filter-list", id: "filterList" },
      filterItems
    ),
  ]);

  const results = createElement("section", { className: "results" }, [
    createElement("div", { className: "results-header" }, [
      createElement("h3", {}, ["Search Results"]),
      createElement("p", {}, [
        createElement("span", { id: "resultsCount", textContent: "0" }, []),
      ]),
    ]),
    createElement(
      "div",
      { className: "results-grid", id: "resultsContainer" },
      []
    ),
    createElement("div", { id: "anaforasContainer" }, []),
  ]);

  const resultsContainer = createElement(
    "div",
    { className: "results-container" },
    [filters, results]
  );

  const main = createElement("main", {}, [searchContainer, resultsContainer]);

  return createElement("div", {}, [main]);
}

window.handleFilterClick = function (element) {
  const filter = element.getAttribute("data-filter");
  const filterLinks = document.querySelectorAll("#filterList a");
  filterLinks.forEach((link) => link.classList.remove("active"));
  element.classList.add("active");
  const surname = document.getElementById("surname").value.trim();
  if (surname) {
    renderResults(surname, filter);
  }
};
