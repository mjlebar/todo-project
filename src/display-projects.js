import { project } from "./project.js";

function displayProjects(projects, newProj = false) {
  localStorage.setItem("projects", JSON.stringify(projects)); //Stores the projects in local storage...

  const side = document.querySelector(".sidebar");
  side.innerHTML = ""; //makes sure the sidebar is cleared out before loading in the projects - that ensures that we don't duplicate projects

  const header = document.createElement("p");
  header.classList.add("head-proj");
  header.textContent = "Projects";

  side.appendChild(header);

  const projs = document.createElement("div");
  projs.classList.add("proj-list");
  side.appendChild(projs); //a container so taht we can target the first and last project specifically

  for (let i = 0; i < projects.length; i++) {
    const projRow = document.createElement("span");
    projs.appendChild(projRow);
    projRow.classList.add(`${i}`);
    projRow.classList.add("proj-row"); //creates a row in the sidebar for the project
    projRow.addEventListener("click", selectProj); //when we click the title of a project, displays corresponding todos

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
  } //Creates each project row, including event listeners for selecting and deleting rows

  const plus = document.createElement("img");
  plus.src = "../src/plus-box-outline.svg";
  plus.classList.add("plus-proj");
  plus.addEventListener("click", addProj);
  //Attaches a plus button to the sidebar - the event listener allows a project to be added using the plus button
  side.appendChild(plus);

  if (newProj) {
    projects[projects.length - 1].displayTodos();
    projs.lastChild.classList.add("selected");
  } else {
    projects[0].displayTodos();
    projs.firstChild.classList.add("selected");
  } //if we've just added a new project, that one will be selected and displayed - otherwise the first project is selected and displayed

  function deleteProj(e) {
    const targRow = e.target.parentNode.parentNode;
    const index = targRow.classList[0];
    targRow.remove();
    projects.splice(index, 1);
    displayProjects(projects);
  } //Removes the targeted project from the display, and updates the projects array to remove the corresponding project

  function addProj(e) {
    const plus = e.target;
    plus.classList.add("hidden");

    const form = document.createElement("span"); //this needs to be a span so the page doesn't think we're submitting a form & reload
    form.classList.add("proj-form");
    const titleInput = document.createElement("input");
    titleInput.classList.add("title-input");
    form.appendChild(titleInput);
    side.appendChild(form);
    form.addEventListener("keydown", submitProj);
  } //Creates form to add new project, and adds an event listener so that when the user has entered a name they can create the new project

  function submitProj(e) {
    if (e.key === "Enter") {
      const proj = project(e.target.value);
      projects.push(proj);
      displayProjects(projects, true);
    }
  } //adds the new projects to the projects array, then displays the updated array. Since displayProjects starts by clearing the sidebar, we don't have to worry about deleting the project submission form

  function selectProj(e) {
    let currProjRow;

    if (e.target.classList.contains("proj-title")) {
      currProjRow = e.target.parentNode;
    } else if (e.target.classList.contains("proj-row")) {
      currProjRow = e.target;
    } else {
      return;
    } //makes sure we have clicked the title or row, not the remove button. Then stores that row

    const projList = document.querySelector(".proj-list").children;

    for (let proj of projList) {
      proj.classList.remove("selected");
    } //makes sure only current project is selected

    const index = currProjRow.classList[0]; //tells us whether we have selected the 1st, 2nd, 3rd etc project
    projects[index].displayTodos(); //displays the todos for the appropriate project
    currProjRow.classList.add("selected");
  } //once a project row or title has been clicked on, this ensures that row and that row only is highlgihted and has its todos displayed

} //passed an array of projects, and a boolean variable to track whether a new project has been added. Displays the projects in the sidebar, and one project (the first one, or a new one if a new one has been added) has its todos displayed in the center of the page. Also attaches event listeners to allow for deleting and adding projects. Event listener functions are defined in scope so that they have access to the projects array

export { displayProjects };
