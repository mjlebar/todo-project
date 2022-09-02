function displayProjects(projects) {
  const side = document.querySelector(".sidebar");
  side.innerHTML = ""; //makes sure the sidebar is cleared out before loading in the projects - makes sure we don't duplicate

  const header = document.createElement("p");
  header.classList.add("head-proj");
  header.textContent = "Projects";

  side.appendChild(header);

  for (let i = 0; i < projects.length; i++) {
    const projRow = document.createElement("div");
    side.appendChild(projRow);
    projRow.classList.add(`${i}`);
    projRow.classList.add(".proj-row");

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

    projTitle.addEventListener("click", projects[i].displayTodos); //when we click the title of a project, displays corresponding todos
  } //Creates each project row

  const plus = document.createElement("img");
  plus.src = "../src/plus-box-outline.svg";
  plus.classList.add("plus-proj");
  //Attaches plus to the sidebar
  side.appendChild(plus);

  projects[0].displayTodos(); //displays default project

  function deleteProj(e) {
    const targRow = e.target.parentNode.parentNode;
    const index = targRow.className[0];
    // console.log(index);
    targRow.remove();
    projects.splice(index, 1);
    displayProjects(projects);
  } //needs to be defined in-scope so it has access to the projects array
}

export { displayProjects };
