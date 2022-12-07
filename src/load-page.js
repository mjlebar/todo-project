import { displayProjects } from "./display-projects.js";
import { initProjects } from "./init-projects.js";
import { convertJSON } from "./convertJSON.js";

function loadPage() {
  const content = document.querySelector("#content");

  const header = document.createElement("header");
  const headerText = document.createElement("p");
  headerText.textContent = "A Simple To-Do List";
  headerText.classList.add("headerText");

  const sidebar = document.createElement("nav");
  sidebar.classList.add("sidebar");

  const main = document.createElement("main");

  content.appendChild(header);
  header.appendChild(headerText);
  content.appendChild(sidebar);
  content.appendChild(main); //Sets up basic structure of page

  let projects; // the projects to be displayed

  if (localStorage.getItem("projects")) {
    projects = convertJSON(JSON.parse(localStorage.getItem("projects"))); //need to convert because the stored json items lose their attached functions. this remakes them with the functions
  } else {
    projects = initProjects();
  } //If there are already projects in local storage, load those - otherwise loads a few hypothetical projects I made

  displayProjects(projects);
} //sets up the page HTML structure and adds in project

export { loadPage };
