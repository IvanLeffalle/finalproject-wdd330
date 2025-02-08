import Homepage from "../pages/HomePage";
import Links from "../pages/Links";
import AdvancedSearch from "../pages/Results";

export default function Router(mainView) {
  function updateView(newView) {
    mainView.innerHTML = "";
    mainView.appendChild(newView);
  }

  function handleRouteChange() {
    const path = window.location.pathname;
    switch (path) {
      case "/":
        updateView(Homepage());
        break;
      case "/links":
        updateView(Links());
        break;
      case "/about":
        updateView(Links());
        break;
      case "/results":
        updateView(AdvancedSearch());
        break;
      default:
        updateView(Homepage());
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
