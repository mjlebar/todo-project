import { displayProjects } from "./display-projects.js";
import { initProjects } from "./init-projects.js";
import { convertJSON } from "./convertJSON.js";

function loadPage() {
  const content = document.querySelector("#content");

  const header = document.createElement("div");
  header.classList.add("header");
  const headerText = document.createElement("p");
  headerText.textContent = "A Simple To-Do List";
  headerText.classList.add("headerText");

  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");

  const main = document.createElement("div");
  main.classList.add("main");

  content.appendChild(header);
  header.appendChild(headerText);
  content.appendChild(sidebar);
  content.appendChild(main); //Sets up basic structure of page

  let projects;

  if (localStorage.getItem("projects")) {
    projects = convertJSON(JSON.parse(localStorage.getItem("projects")));
  } else {
    projects = initProjects(); //just something to initialize the page...
  }

  displayProjects(projects);
}

export { loadPage };
