import Homepage from "../pages/HomePage";
import Links from "../pages/Links";
import Results from "../pages/Results";
import About from "../pages/About";

export default function Router(mainView) {
  let currentView = null;

  // Function to get navigation elements
  function getNavElements() {
    return {
      homeNav: document.getElementById("home"),
      toolsNav: document.getElementById("tools"),
      aboutNav: document.getElementById("about"),
    };
  }

  // Function to add the 'active' class to the correct navigation element
  function addActiveClass(item) {
    const elements = getNavElements();
    Object.values(elements).forEach((el) => {
      el?.classList?.remove("active");
    });
    elements[item]?.classList?.add("active");
  }

  // Function to update the view
  function updateView(newView, params) {
    mainView.innerHTML = "";
    currentView = newView;
    mainView.appendChild(newView(params));
  }

  // Function to update the page title
  function updateTitle(newTitle) {
    document.title = newTitle;
  }

  // Function to handle route changes
  function handleRouteChange() {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    const filter = urlParams.get("filter") || "all";

    switch (path) {
      case "/":
        updateView(Homepage);
        updateTitle("Home");
        document.addEventListener("DOMContentLoaded", () =>
          addActiveClass("homeNav")
        );
        break;
      case "/links":
        updateView(Links);
        updateTitle("Tools");
        document.addEventListener("DOMContentLoaded", () =>
          addActiveClass("toolsNav")
        );
        break;
      case "/about":
        updateView(About);
        updateTitle("About");
        document.addEventListener("DOMContentLoaded", () =>
          addActiveClass("aboutNav")
        );
        break;
      case "/results":
        updateView(Results, { query, filter });
        updateTitle("Results");
        break;
      default:
        updateView(Homepage);
    }
  }

  // Initialize the router
  handleRouteChange();
  window.addEventListener("popstate", handleRouteChange);
}
