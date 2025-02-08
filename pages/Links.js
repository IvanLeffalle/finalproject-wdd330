import Header from "../components/Header";
import { createElement } from "../src/utils";

const resources = [
  {
    title: "Family History Websites",
    links: [
      { href: "https://www.familysearch.org", text: "FamilySearch" },
      { href: "https://www.ancestry.com", text: "Ancestry.com" },
      { href: "https://www.myheritage.com", text: "MyHeritage" },
      { href: "https://www.geni.com", text: "Geni" },
    ],
  },
  {
    title: "DNA and Genetic Genealogy",
    links: [
      { href: "https://www.23andme.com", text: "23andMe" },
      { href: "https://www.ancestry.com/dna", text: "AncestryDNA" },
      { href: "https://www.myheritage.com/dna", text: "MyHeritage DNA" },
      { href: "https://www.familytreedna.com", text: "Family Tree DNA" },
    ],
  },
  {
    title: "European Genealogy",
    links: [
      { href: "https://www.findmypast.com", text: "FindMyPast" },
      {
        href: "https://www.archivesportaleurope.net",
        text: "Archives Portal Europe",
      },
      {
        href: "https://www.familysearch.org/en/wiki/European_Research",
        text: "FamilySearch Europe Guide",
      },
    ],
  },
  {
    title: "Free and Alternative Resources",
    links: [
      { href: "https://www.wikitree.com", text: "WikiTree" },
      {
        href: "https://www.familysearch.org/records",
        text: "FamilySearch Records",
      },
      { href: "https://www.findagrave.com", text: "Find A Grave" },
      { href: "https://www.openarchives.org", text: "Open Archives" },
    ],
  },
];

export default function Links() {
  const header = createElement("header", {}, [Header()]);

  const title = createElement("h2", {
    textContent: "Genealogy Websites",
    className: "title",
  });

  const resourceCards = resources.map((resource) => {
    const links = resource.links.map((link) =>
      createElement("a", {
        href: link.href,
        target: "_blank",
        textContent: link.text,
      })
    );

    const linkContainer = createElement(
      "div",
      { className: "resource-links" },
      links
    );

    const heading = createElement("h3", { textContent: resource.title });

    return createElement("div", { className: "resource-card" }, [
      heading,
      linkContainer,
    ]);
  });

  const resourcesGrid = createElement(
    "div",
    {
      className: "resources-grid",
    },
    resourceCards
  );

  /*Steps Div */
  const oList = [
    {
      strong: "Gather Family Documents:",
      content:
        " Collect birth certificates, marriage licenses, old letters, family Bibles, and photos from relatives.",
    },
    {
      strong: "Interview Relatives:",
      content:
        " Talk to older family members about family history, stories, and memories. Record or take detailed notes.",
    },
    {
      strong: "Create a Basic Family Tree:",
      content:
        " Start with what you know. Use free online tools like FamilySearch or WikiTree to organize your initial information.",
    },
    {
      strong: "Explore Free Online Resources:",
      content:
        " Begin with free websites like FamilySearch and government archives before investing in paid subscriptions.",
    },
    {
      strong: "Organize Your Research:",
      content:
        " Keep digital or physical folders for each family line. Document your sources and create a research log.",
    },
    {
      strong: "Consider DNA Testing:",
      content:
        " DNA tests can help verify family connections and discover genetic relatives across different branches of your family.",
    },
  ];
  const listItem = oList.map((item) => {
    const strongElement = createElement("strong", { textContent: item.strong });
    const contentElement = createElement("span", { textContent: item.content });
    return createElement("li", {}, [strongElement, contentElement]);
  });

  const tilteSteps = createElement("h2", {
    className: "title",
    textContent: "First Steps to Start Your Family Tree",
  });
  const ol = createElement("ol", {}, listItem);
  const stepsDiv = createElement(
    "div",
    {
      className: "first-steps",
    },
    [tilteSteps, ol]
  );

  /*Create family tree section */

  const familyTreeTitle = createElement("h2", {
    textContent: "Create Your Family Tree",
    className: "title",
  });
  const inputFields = [
    { label: "Your Name:", id: "userName" },
    { label: "Father's Name:", id: "fatherName" },
    { label: "Mother's Name:", id: "motherName" },
    { label: "Grandfather's Name (Father's Side):", id: "grandfatherName" },
    { label: "Grandmother's Name (Father's Side):", id: "grandmotherName" },
    { label: "Grandfather's Name (Mother's Side):", id: "grandfatherName2" },
    { label: "Grandmother's Name (Mother's Side):", id: "grandmotherName2" },
  ];

  const inputGroups = inputFields.map((field) => {
    const label = createElement("label", {
      htmlFor: field.id,
      textContent: field.label,
    });
    const input = createElement("input", {
      type: "text",
      id: field.id,
      required: true,
    });
    return createElement("div", { className: "input-group" }, [label, input]);
  });
  const generateButton = createElement("button", {
    type: "button",
    textContent: "Generate Family Tree",
    onclick: "generateFamilyTree()",
  });

  const familyTreeForm = createElement("form", { id: "familyTreeForm" }, [
    ...inputGroups,
    generateButton,
  ]);

  const treeVisualization = createElement("div", { id: "treeVisualization" });

  const downloadButton = createElement("button", {
    type: "button",
    textContent: "Download as PDF",
    onclick: "downloadPDF()",
  });

  const familyTreeOutput = createElement(
    "div",
    { id: "familyTreeOutput", style: { display: "none" } },
    [
      createElement("h3", { textContent: "Your Family Tree" }),
      treeVisualization,
      downloadButton,
    ]
  );

  const familyTreeDiv = createElement("div", { className: "family-tree" }, [
    familyTreeTitle,
    familyTreeForm,
    familyTreeOutput,
  ]);

  const contentContainer = createElement(
    "div",
    { className: "content-container" },
    [title, resourcesGrid, stepsDiv, familyTreeDiv]
  );

  const main = createElement("main", { className: "links-Main" }, [
    contentContainer,
  ]);

  const footer = createElement(
    "footer",
    {
      className: "footer",
      textContent: "&copy; 2024 Surname Search. All rights reserved.",
    },
    []
  );

  return createElement("div", {}, [header, main, footer]);
}
