import { loadList } from "./load-list.js";

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
  loadList();
}

export { loadPage };
