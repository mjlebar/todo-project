import { project } from "./project.js";
import { todo } from "./todo.js";

function displayProjects(projects, newProj = false) {
  localStorage.setItem("projects", JSON.stringify(projects)); //Stores the projects in local storage...

  const side = document.querySelector(".sidebar");
  side.innerHTML = ""; //makes sure the sidebar is cleared out before loading in the projects - makes sure we don't duplicate

  const header = document.createElement("p");
  header.classList.add("head-proj");
  header.textContent = "Projects";

  side.appendChild(header);

  const projs = document.createElement("div");
  side.appendChild(projs); //a container so taht we can target the first and last project specifically

  for (let i = 0; i < projects.length; i++) {
    const projRow = document.createElement("div");
    projs.appendChild(projRow);
    projRow.classList.add(`${i}`);
    projRow.classList.add("proj-row");

    const projTitle = document.createElement("p");
    projTitle.textContent = projects[i].title;
    projRow.appendChild(projTitle);
    projTitle.classList.add("proj-title"); //Sets up title of the project

    const projRemove = document.createElement("div");
    projRemove.classList.add("proj-remove");
    const projRemoveIcon = document.createElement("img");
    projRemoveIcon.src = "../src/delete-empty.svg";
    projRemove.addEventListener("click", deleteProj);
    projRemove.appendChild(projRemoveIcon);
    projRow.append(projRemove); //attaches delete button for project

    projRow.addEventListener("click", selectProj); //when we click the title of a project, displays corresponding todos
  } //Creates each project row

  const plus = document.createElement("img");
  plus.src = "../src/plus-box-outline.svg";
  plus.classList.add("plus-proj");
  plus.addEventListener("click", addProj);
  //Attaches plus to the sidebar
  side.appendChild(plus);

  if (newProj) {
    projects[projects.length - 1].displayTodos();
    projs.lastChild.classList.add("selected");
    console.log(side.lastChild);
  } else {
    projects[0].displayTodos();
    projs.firstChild.classList.add("selected");
  }

  //displays a new project if we've just added one, the default otherwise

  function deleteProj(e) {
    const targRow = e.target.parentNode.parentNode;
    const index = targRow.classList[0];
    targRow.remove();
    projects.splice(index, 1);
    displayProjects(projects);
  } //needs to be defined in-scope so it has access to the projects array

  function addProj(e) {
    const plus = e.target;
    plus.classList.add("hidden");

    const form = document.createElement("div"); //this needs to be a div so the page doesn't think we're submitting a form & reload
    form.classList.add("proj-form");
    const titleInput = document.createElement("input");
    titleInput.classList.add("title-input");
    form.appendChild(titleInput);
    side.appendChild(form);
    form.addEventListener("keydown", submitProj);
  } //Creates form to add new project

  function submitProj(e) {
    if (e.key === "Enter") {
      const proj = project(e.target.value);
      projects.push(proj);
      displayProjects(projects, true);
    }
  } //Also needs access to projects array- actually creates new projects based on form

  function selectProj(e) {
    let currProj;

    if (e.target.classList.contains("proj-title")) {
      currProj = e.target.parentNode;
    } else if (e.target.classList.contains("proj-row")) {
      currProj = e.target;
    } else {
      return;
    } //makes sure we have clicked the title or row, not the remove button
    const projList = currProj.parentNode.children;

    for (let proj of projList) {
      proj.classList.remove("selected");
    } //makes sure only current project is selected
    const index = currProj.classList[0];
    projects[index].displayTodos();
    currProj.classList.add("selected");
  } //Also needs project array - we need to have this function rather than just calling display to-dos so that we can add a visual indicator of which project is selected
}

export { displayProjects };
