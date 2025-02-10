import Homepage from "../pages/HomePage";
import Links from "../pages/Links";
import Results from "../pages/Results";

export default function Router(mainView) {
  let currentView = null;

  function updateView(newView, params) {
    mainView.innerHTML = "";
    currentView = newView;
    mainView.appendChild(newView(params));
  }

  function handleRouteChange() {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    const filter = urlParams.get("filter") || "all";

    switch (path) {
      case "/":
        updateView(Homepage);
        break;
      case "/links":
        updateView(Links);
        break;
      case "/about":
        updateView(Links);
        break;
      case "/results":
        updateView(Results, { query, filter });
        break;
      default:
        updateView(Homepage);
    }
  }
  handleRouteChange();
  window.addEventListener("popstate", handleRouteChange);
}

//  window.addEventListener("hashchange", (evt) => {
//   console.debug(evt);
//   const newUrl = new URL(evt.newURL);
//  const hash = newUrl.hash;
//   switch (hash) {
//    case "#/":
//     updateView(Homepage());
//     break;
//  case "#/links":
//    updateView(Links());
//    break;
//   case "#/about":
//      break;
//    }
// });
//}
