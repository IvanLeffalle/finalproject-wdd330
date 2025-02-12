import { createElement } from "../src/utils";
import Header from "../components/Header";
let currentSearchTerm = null;
export default function Results(props) {
  const { query, filter } = props || {};

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  async function fetchDataGoogleBooks(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Google Books API Error: ${response.status} - ${errorText}`
        );
      }
      const googleData = await response.json();
      return googleData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function fetchDataWikipedia(query) {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          query
        )}&format=json&origin=*`
      );
      if (!response.ok) {
        throw new Error("Error fetching wikipediaData");
      }
      const wikidata = await response.json();
      return wikidata;
    } catch (error) {
      console.error(error);
      return { query: { search: [] } };
    }
  }

  function searchAnaforas(query) {
    const iframeElement = document.createElement("iframe");
    iframeElement.src = `https://anaforas.fic.edu.uy/jspui/simple-search?query=${encodeURIComponent(
      query
    )}`;
    iframeElement.width = "100%";
    iframeElement.height = "600px";
    iframeElement.title = "Resultados de búsqueda";
    return iframeElement;
  }

  async function renderResults(query, filter = "all") {
    if (!query) return;

    currentSearchTerm = query;
    let googleBooksData = null;
    let wikipediaData = null;
    let anaforaData = null;

    const resultsElement = document.getElementById("resultsContainer");
    const anaforasContainer = document.getElementById("anaforasContainer");
    const resultsNumbers = document.getElementById("resultsCount");

    if (!resultsElement || !anaforasContainer || !resultsNumbers) return;
    resultsElement.innerHTML = "";
    anaforasContainer.innerHTML = "";

    resultsElement.innerHTML = "<p>Loading results...</p>";

    try {
      if (filter === "google" || filter === "all") {
        const URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
        googleBooksData = await fetchDataGoogleBooks(URL);
      }

      if (filter === "wikipedia" || filter === "all") {
        wikipediaData = await fetchDataWikipedia(query);
      }

      if (filter === "anaforas" || filter === "all") {
        anaforaData = searchAnaforas(query);
      }

      // Clear loading state
      resultsElement.innerHTML = "";

      // Render Google Books results
      if (googleBooksData?.items && (filter === "google" || filter === "all")) {
        googleBooksData.items.forEach((item) => {
          const itemLink = createElement("a", {
            href: item.volumeInfo.previewLink,
            className: "item-link",
          });

          const itemElement = createElement("div", {
            className: "result-item",
            style: {
              border: "1px solid #ddd",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
            },
          });

          itemElement.appendChild(
            createElement("h3", { textContent: item.volumeInfo.title })
          );
          itemElement.appendChild(
            createElement("p", {
              textContent: `Author: ${item.volumeInfo.authors?.join(", ") || "Unknown"}`,
            })
          );
          itemElement.appendChild(
            createElement("p", {
              innerHTML:
                item.searchInfo?.textSnippet || "No description available",
            })
          );

          itemLink.appendChild(itemElement);
          resultsElement.appendChild(itemLink);
        });
      }

      // Render Wikipedia results
      if (
        wikipediaData?.query?.search &&
        (filter === "wikipedia" || filter === "all")
      ) {
        wikipediaData.query.search.forEach((item) => {
          const itemElement = createElement("div", {
            className: "result-item",
            style: {
              border: "1px solid #ddd",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
            },
          });

          itemElement.appendChild(
            createElement("h3", { textContent: item.title })
          );
          itemElement.appendChild(
            createElement("p", { innerHTML: item.snippet })
          );

          resultsElement.appendChild(itemElement);
        });
      }

      // Render Anaforas results
      if (anaforaData && (filter === "anaforas" || filter === "all")) {
        anaforasContainer.appendChild(anaforaData);
      }

      // Update results count
      const totalResults =
        (googleBooksData?.items?.length || 0) +
        (wikipediaData?.query?.search?.length || 0);
      resultsNumbers.textContent = totalResults;

      // Show no results message if needed
      if (
        totalResults === 0 &&
        !anaforaData &&
        (filter === "all" || filter === "google" || filter === "wikipedia")
      ) {
        resultsElement.innerHTML = "No results found.";
      } else if (filter === "anaforas" && !anaforaData) {
        resultsElement.innerHTML = "No results found in Anaforas.";
      }
    } catch (error) {
      console.error("Error rendering results:", error);
      resultsElement.innerHTML = "An error occurred while fetching results.";
    }
  }

  function updateURL(query, filter) {
    const urlParams = new URLSearchParams();
    if (query) urlParams.set("query", query);
    if (filter && filter !== "all") urlParams.set("filter", filter);
    window.history.pushState(null, "", `?${urlParams.toString()}`);
  }

  function handleFilterClick(filterLink) {
    const filter = filterLink.getAttribute("data-filter");
    const surname = document.getElementById("surname")?.value.trim();
    if (surname) {
      updateURL(surname, filter);
      renderResults(surname, filter);
    }

    // Update active filter
    document
      .querySelectorAll("#filterList a")
      .forEach((link) => link.classList.remove("active"));
    filterLink.classList.add("active");
  }

  // Initialize the component
  function init() {
    const searchQuery = getQueryParam("query");
    const initialFilter = getQueryParam("filter") || "all";

    if (searchQuery) {
      const searchInput = document.getElementById("surname");
      if (searchInput) {
        searchInput.value = searchQuery;
        renderResults(searchQuery, initialFilter);
      }
    }

    // Add event listeners
    document.addEventListener("DOMContentLoaded", function () {
      const filterLinks = document.querySelectorAll("#filterList a");
      filterLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          handleFilterClick(this);
        });
      });

      // Add search button click handler
      const searchButton = document.getElementById("searchButton");
      if (searchButton) {
        searchButton.addEventListener("click", function () {
          const surname = document.getElementById("surname")?.value.trim();
          if (surname) {
            updateURL(surname, "all");
            renderResults(surname, "all");
          }
        });
      }

      // Add enter key handler for search input
      const searchInput = document.getElementById("surname");
      if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
          if (event.key === "Enter") {
            event.preventDefault();
            const surname = this.value.trim();
            if (surname) {
              updateURL(surname, "all");
              renderResults(surname, "all");
            }
          }
        });
      }
    });
  }

  const structure = createElement("div", {}, [
    createElement("header", {}, [Header()]),
    createElement("main", { className: "main-results" }, [
      // Search container
      createElement("div", { className: "search-container-results" }, [
        createElement("div", { className: "search-element-results" }, [
          createElement("h1", {
            className: "title",
            textContent: "Advanced Search",
          }),
          createElement("div", { className: "input-wrapper-results" }, [
            createElement("svg", {
              className: "search-icon",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
            }),
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
          }),
        ]),
      ]),
      // Results container
      createElement("div", { className: "results-container" }, [
        // Filters
        createElement("aside", { className: "filters" }, [
          createElement("h3", { textContent: "Data Sources" }),
          createElement(
            "ul",
            { className: "filter-list", id: "filterList" },
            [
              ["All Sources", "all"],
              ["Google Books", "google"],
              ["Wikipedia", "wikipedia"],
              ["Anaforas", "anaforas"],
            ].map(([text, filterValue]) =>
              createElement("li", {}, [
                createElement("a", {
                  href: "#",
                  className: filterValue === "all" ? "active" : "",
                  "data-filter": filterValue,
                  textContent: text,
                }),
              ])
            )
          ),
        ]),
        // Results section
        createElement("section", { className: "results" }, [
          createElement("div", { className: "results-header" }, [
            createElement("h3", { textContent: "Search Results" }),
            createElement("p", {}, [
              createElement("span", { id: "resultsCount", textContent: "0" }),
            ]),
          ]),
          createElement("div", {
            className: "results-grid",
            id: "resultsContainer",
          }),
          createElement("div", { id: "anaforasContainer" }),
        ]),
      ]),
    ]),
  ]);
  setTimeout(init, 0);

  return structure;
}
