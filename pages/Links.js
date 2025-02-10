import Header from "../components/Header";
import { createElement } from "../src/utils";

export default function Links() {
  // Properly load jsPDF
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  document.head.appendChild(script);

  function generateFamilyTree() {
    const fields = {
      userName: document.getElementById("userName")?.value || "",
      fatherName: document.getElementById("fatherName")?.value || "",
      motherName: document.getElementById("motherName")?.value || "",
      grandfatherName: document.getElementById("grandfatherName")?.value || "",
      grandmotherName: document.getElementById("grandmotherName")?.value || "",
      grandfatherName2:
        document.getElementById("grandfatherName2")?.value || "",
      grandmotherName2:
        document.getElementById("grandmotherName2")?.value || "",
    };

    const treeVisualization = document.getElementById("treeVisualization");
    if (!treeVisualization) return;

    treeVisualization.innerHTML = `
      <div style="text-align: center;">
        <h4>${fields.grandfatherName} + ${fields.grandmotherName}</h4>
        <p>|</p>
        <h3>${fields.fatherName}</h3>
        <p>|</p>
        <h2>${fields.userName}</h2>
        <p>|</p>
        <h3>${fields.motherName}</h3>
        <p>|</p>
        <h4>${fields.grandfatherName2} + ${fields.grandmotherName2}</h4>
      </div>
    `;

    const familyTreeOutput = document.getElementById("familyTreeOutput");
    if (familyTreeOutput) {
      familyTreeOutput.style.display = "block";
    }
  }

  function downloadPDF() {
    // Check if jsPDF is loaded
    if (typeof window.jspdf === "undefined") {
      console.error("jsPDF is not loaded yet");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const treeVisualization = document.getElementById("treeVisualization");

    if (!treeVisualization) return;

    const treeContent = treeVisualization.innerText;

    doc.setFontSize(12);
    doc.text("Family Tree", 10, 10);
    doc.text(treeContent.split("\n"), 10, 20);

    doc.save("family-tree.pdf");
  }

  function initializeEventListeners() {
    // Generate button click handler
    const generateButton = document.querySelector('button[type="button"]');
    if (generateButton) {
      generateButton.addEventListener("click", generateFamilyTree);
    }

    // Download button click handler
    const downloadButton = document.getElementById("downloadButton");
    if (downloadButton) {
      downloadButton.addEventListener("click", downloadPDF);
    }
  }

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
  // Create the DOM structure
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

    return createElement("div", { className: "resource-card" }, [
      createElement("h3", { textContent: resource.title }),
      createElement("div", { className: "resource-links" }, links),
    ]);
  });

  const resourcesGrid = createElement(
    "div",
    { className: "resources-grid" },
    resourceCards
  );

  const listItems = oList.map((item) =>
    createElement("li", {}, [
      createElement("strong", { textContent: item.strong }),
      createElement("span", { textContent: item.content }),
    ])
  );

  const stepsDiv = createElement("div", { className: "first-steps" }, [
    createElement("h2", {
      className: "title",
      textContent: "First Steps to Start Your Family Tree",
    }),
    createElement("ol", {}, listItems),
  ]);

  // family tree form
  const inputFields = [
    { label: "Your Name:", id: "userName" },
    { label: "Father's Name:", id: "fatherName" },
    { label: "Mother's Name:", id: "motherName" },
    { label: "Grandfather's Name (Father's Side):", id: "grandfatherName" },
    { label: "Grandmother's Name (Father's Side):", id: "grandmotherName" },
    { label: "Grandfather's Name (Mother's Side):", id: "grandfatherName2" },
    { label: "Grandmother's Name (Mother's Side):", id: "grandmotherName2" },
  ];

  const familyTreeForm = createElement("form", { id: "familyTreeForm" }, [
    ...inputFields.map((field) =>
      createElement("div", { className: "input-group" }, [
        createElement("label", {
          htmlFor: field.id,
          textContent: field.label,
        }),
        createElement("input", {
          type: "text",
          id: field.id,
          required: true,
        }),
      ])
    ),
    createElement("button", {
      type: "button",
      textContent: "Generate Family Tree",
      id: "generateButton",
    }),
  ]);

  const familyTreeOutput = createElement(
    "div",
    { id: "familyTreeOutput", style: { display: "none" } },
    [
      createElement("h3", { textContent: "Your Family Tree" }),
      createElement("div", { id: "treeVisualization" }),
      createElement("button", {
        type: "button",
        textContent: "Download as PDF",
        id: "downloadButton",
      }),
    ]
  );

  const familyTreeDiv = createElement("div", { className: "family-tree" }, [
    createElement("h2", {
      textContent: "Create Your Family Tree",
      className: "title",
    }),
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

  const footer = createElement("footer", {
    className: "footer",
    innerHTML: "&copy; 2024 Surname Search. All rights reserved.",
  });

  setTimeout(initializeEventListeners, 0);

  return createElement("div", {}, [header, main, footer]);
}
