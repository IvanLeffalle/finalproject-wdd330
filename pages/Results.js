import { createElement } from "../src/utils";
import Header from "../components/Header";
import searchIconPng from "../src/assets/search-icon.png";

export default function Results(props) {
  const { query, filter } = props || {};
  let currentSearchTerm = null;
  let currentFilter = "all";
  let currentPage = 1;
  const RESULTS_PER_PAGE = 10;

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  async function fetchDataGoogleBooks(url, page) {
    try {
      const startIndex = (page - 1) * RESULTS_PER_PAGE;
      const paginatedUrl = `${url}&startIndex=${startIndex}&maxResults=${RESULTS_PER_PAGE}`;
      const response = await fetch(paginatedUrl);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Google Books API Error: ${response.status} - ${errorText}`
        );
      }
      const googleData = await response.json();
      return {
        items: googleData.items || [],
        totalItems: googleData.totalItems || 0,
      };
    } catch (error) {
      console.error(error);
      return { items: [], totalItems: 0 };
    }
  }

  async function fetchDataWikipedia(query, page) {
    try {
      const offset = (page - 1) * RESULTS_PER_PAGE;
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          query
        )}&format=json&origin=*&srlimit=${RESULTS_PER_PAGE}&sroffset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Error fetching wikipediaData");
      }
      const wikidata = await response.json();
      console.log(wikidata);
      return {
        results: wikidata.query.search,
        totalHits: wikidata.query.searchinfo.totalhits,
      };
    } catch (error) {
      console.error(error);
      return { results: [], totalHits: 0 };
    }
  }

  function searchAnaforas(query) {
    const iframeElement = document.createElement("iframe");
    iframeElement.src = `https://anaforas.fic.edu.uy/jspui/simple-search?query=${encodeURIComponent(query)}`;
    iframeElement.width = "100%";
    iframeElement.height = "600px";
    iframeElement.title = "Resultados de búsqueda";
    return iframeElement;
  }

  function createPaginationControls(totalResults, currentPage, filter) {
    const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

    const paginationContainer = createElement("div", {
      className: "pagination",
      style: {
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        margin: "2rem 0",
      },
    });

    // Previous button
    const prevButton = createElement("button", {
      className: `pagination-button ${currentPage <= 1 ? "disabled" : ""}`,
      textContent: "Previous",
      disabled: currentPage <= 1,
      style: {
        padding: "0.5rem 1rem",
        border: "1px solid #ddd",
        borderRadius: "4px",
        background: currentPage <= 1 ? "#f5f5f5" : "#fff",
        cursor: currentPage <= 1 ? "not-allowed" : "pointer",
      },
    });

    // Next button
    const nextButton = createElement("button", {
      className: `pagination-button ${currentPage >= totalPages ? "disabled" : ""}`,
      textContent: "Next",
      disabled: currentPage >= totalPages,
      style: {
        padding: "0.5rem 1rem",
        border: "1px solid #ddd",
        borderRadius: "4px",
        background: currentPage >= totalPages ? "#f5f5f5" : "#fff",
        cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
      },
    });

    // Page info
    const pageInfo = createElement("span", {
      textContent: `Page ${currentPage} of ${totalPages}`,
      style: {
        alignSelf: "center",
      },
    });

    // Add event listeners
    if (currentPage > 1) {
      prevButton.addEventListener("click", () => {
        handlePageChange(currentPage - 1);
      });
    }

    if (currentPage < totalPages) {
      nextButton.addEventListener("click", () => {
        handlePageChange(currentPage + 1);
      });
    }

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(pageInfo);
    paginationContainer.appendChild(nextButton);

    return paginationContainer;
  }

  async function handlePageChange(newPage) {
    currentPage = newPage;
    updateURL(currentSearchTerm, currentFilter, currentPage);
    await renderResults(currentSearchTerm, currentFilter, currentPage);
  }

  async function renderResults(query, filter = "all", page = 1) {
    if (!query) return;

    currentSearchTerm = query;
    currentFilter = filter;
    currentPage = page;

    let googleBooksData = null;
    let wikipediaData = null;
    let anaforaData = null;

    const resultsElement = document.getElementById("resultsContainer");
    const anaforasContainer = document.getElementById("anaforasContainer");
    const resultsNumbers = document.getElementById("resultsCount");
    const paginationElement = document.getElementById("paginationContainer");

    if (
      !resultsElement ||
      !anaforasContainer ||
      !resultsNumbers ||
      !paginationElement
    )
      return;

    // Clear previous results
    resultsElement.innerHTML = "";
    anaforasContainer.innerHTML = "";
    paginationElement.innerHTML = "";
    resultsElement.innerHTML = "<p>Loading results...</p>";

    try {
      // Only fetch data for the selected filter or all
      if (filter === "google" || filter === "all") {
        const URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
        googleBooksData = await fetchDataGoogleBooks(URL, page);
      }

      if (filter === "wikipedia" || filter === "all") {
        wikipediaData = await fetchDataWikipedia(query, page);
      }

      if (filter === "anaforas") {
        anaforaData = searchAnaforas(query);
      }

      // Clear loading state
      resultsElement.innerHTML = "";

      // Update filter UI
      updateActiveFilter(filter);

      // Render results based on the current filter
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
              padding: "1rem",
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

      if (
        wikipediaData?.results &&
        (filter === "wikipedia" || filter === "all")
      ) {
        wikipediaData.results.forEach((item) => {
          const itemLink = createElement("a", {
            href: `https://es.wikipedia.org/w/index.php?search=${query}&title=Especial%3ABuscar&ns0=1&ns100=1&ns104=1`,
            className: "item-link",
          });
          const itemElement = createElement("div", {
            className: "result-item",
            style: {
              border: "1px solid #ddd",
              margin: "10px",
              padding: "1rem",
              borderRadius: "5px",
            },
          });

          itemElement.appendChild(
            createElement("h3", { textContent: item.title })
          );
          itemElement.appendChild(
            createElement("p", { innerHTML: item.snippet })
          );
          itemLink.appendChild(itemElement);
          resultsElement.appendChild(itemLink);
        });
      }

      if (anaforaData && (filter === "anaforas" || filter === "all")) {
        anaforasContainer.appendChild(anaforaData);
      }

      // Calculate total results and update count
      const totalResults =
        filter === "google"
          ? googleBooksData?.totalItems
          : filter === "wikipedia"
            ? wikipediaData?.totalHits
            : (googleBooksData?.totalItems || 0) +
              (wikipediaData?.totalHits || 0);

      resultsNumbers.textContent = totalResults;

      // Add pagination controls
      if (totalResults > RESULTS_PER_PAGE) {
        const paginationControls = createPaginationControls(
          totalResults,
          page,
          filter
        );
        paginationElement.appendChild(paginationControls);
      }

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

  function updateActiveFilter(filter) {
    const filterLinks = document.querySelectorAll("#filterList a");
    filterLinks.forEach((link) => {
      if (link.getAttribute("data-filter") === filter) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  function updateURL(query, filter, page) {
    const urlParams = new URLSearchParams();
    if (query) urlParams.set("query", query);
    if (filter && filter !== "all") urlParams.set("filter", filter);
    if (page && page > 1) urlParams.set("page", page.toString());
    window.history.pushState(null, "", `?${urlParams.toString()}`);
  }

  function handleFilterClick(event) {
    event.preventDefault();
    const filterLink = event.currentTarget;
    const filter = filterLink.getAttribute("data-filter");
    const searchInput = document.getElementById("surname");
    const query = searchInput?.value.trim();

    if (query) {
      currentPage = 1;
      updateURL(query, filter, currentPage);
      renderResults(query, filter, currentPage);
    }
  }

  function init() {
    const searchQuery = getQueryParam("query");
    const filterParam = getQueryParam("filter") || "all";
    const pageParam = parseInt(getQueryParam("page")) || 1;
    const searchInput = document.getElementById("surname");

    if (searchInput) {
      searchInput.value = searchQuery || "";
    }

    // Initialize with the current query and filter
    if (searchQuery) {
      renderResults(searchQuery, filterParam, pageParam);
    }

    // Add filter click handlers
    const filterLinks = document.querySelectorAll("#filterList a");
    filterLinks.forEach((link) => {
      link.addEventListener("click", handleFilterClick);
    });

    // Add search button handler
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
      searchButton.addEventListener("click", () => {
        const query = searchInput?.value.trim();
        if (query) {
          currentPage = 1;
          updateURL(query, currentFilter, currentPage);
          renderResults(query, currentFilter, currentPage);
        }
      });
    }

    // Add enter key handler
    if (searchInput) {
      searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const query = searchInput.value.trim();
          if (query) {
            currentPage = 1;
            updateURL(query, currentFilter, currentPage);
            renderResults(query, currentFilter, currentPage);
          }
        }
      });
    }
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
            createElement("img", {
              className: "search-icon",
              src: searchIconPng,
              alt: "Search Icon",
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
              createElement("span", { textContent: " results found" }),
            ]),
          ]),
          createElement("div", {
            className: "results-grid",
            id: "resultsContainer",
          }),
          createElement("div", { id: "anaforasContainer" }),
          createElement("div", {
            id: "paginationContainer",
            className: "pagination-container",
          }),
        ]),
      ]),
    ]),
  ]);

  // Initialize after the component is mounted
  setTimeout(init, 0);

  return structure;
}
