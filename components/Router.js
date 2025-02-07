import Homepage from "../pages/HomePage";
import Links from "../pages/Links";
import Counter from "./Counter";

export default function Router(mainView) {
  function updateView(newView) {
    mainView.innerHTML = "";
    mainView.appendChild(newView);
  }

  window.addEventListener("hashchange", (evt) => {
    console.debug(evt);
    const newUrl = new URL(evt.newURL);
    const hash = newUrl.hash;
    switch (hash) {
      case "#/":
        updateView(Homepage());
        break;
      case "#/links":
        updateView(Links());
        break;
      case "#/about":
        break;
    }
  });
}
