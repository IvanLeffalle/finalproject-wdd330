import { createElement } from "../src/utils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutImg from "../src/assets/about-image.webp";

export default function About() {
  const header = createElement("header", {}, [Header()]);

  const title = createElement(
    "h1",
    { textContent: "About GeneaHub", className: "title" },
    []
  );

  const image = createElement("img", {
    src: AboutImg,
    alt: "GeneaHub application interface preview",
    className: "about-img",
  });

  const introSection = createElement("div", { className: "content-section" }, [
    createElement("h2", {
      textContent: "Project Overview",
      className: "section-title",
    }),
    createElement("p", {
      className: "about-paragraph",
      textContent:
        "Welcome to GeneaHub! As a BYU-Idaho Pathway student, I developed this project as part of my WDD330 course. GeneaHub is a single-page application (SPA) designed to make family history research accessible and engaging for everyone.",
    }),
  ]);

  const featuresSection = createElement(
    "div",
    { className: "content-section" },
    [
      createElement("h2", {
        textContent: "Key Features",
        className: "section-title",
      }),
      createElement("ul", { className: "features-list" }, [
        createElement("li", {
          textContent: "Intuitive genealogy search",
        }),
        createElement("li", {
          textContent: "Family tree visualization and building capabilities",
        }),
        createElement("li", {
          textContent:
            "Integration with Google Books and Wikipedia APIs, along with an iframe embedding content from the Anaforas website.",
        }),
        createElement("li", {
          textContent: "Modern, responsive user interface",
        }),
      ]),
    ]
  );

  const techSection = createElement("div", { className: "content-section" }, [
    createElement("h2", {
      textContent: "Technical Highlights",
      className: "section-title",
    }),
    createElement("p", {
      className: "about-paragraph",
      textContent:
        "This project showcases modern web development practices including asynchronous JavaScript, API integration, and responsive design. Built using HTML5, CSS3, and JavaScript, with Parcel as the bundler for optimal performance.",
    }),
  ]);

  const futureSection = createElement("div", { className: "content-section" }, [
    createElement("h2", {
      textContent: "Future Development",
      className: "section-title",
    }),
    createElement("p", {
      className: "about-paragraph",
      textContent:
        "Looking ahead, GeneaHub will continue to evolve with planned features including additional genealogy API integrations, enhanced user interface components, and new collaboration tools to connect family historians. My vision is to create a comprehensive platform that makes heritage discovery accessible to everyone.",
    }),
  ]);

  const contentContainer = createElement(
    "div",
    { className: "content-container" },
    [introSection, featuresSection, techSection, futureSection]
  );

  const imageContainer = createElement("div", { className: "img-container" }, [
    image,
    contentContainer,
  ]);

  const section1 = createElement("section", { className: "section1" }, [
    title,
    imageContainer,
  ]);

  const main = createElement("main", { className: "mainAbout" }, [section1]);
  const footer = createElement("footer", {}, [Footer()]);

  return createElement("div", { className: "div-parent" }, [
    header,
    main,
    footer,
  ]);
}
