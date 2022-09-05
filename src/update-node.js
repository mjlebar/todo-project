function updateNode(node, todo) {
  let projIndex = document.querySelector(".selected").classList[0];
  let todoIndex = node.parentNode.classList[1];
  let projects = JSON.parse(localStorage.getItem("projects"));
  projects[projIndex].todos[todoIndex] = todo;
  localStorage.setItem("projects", JSON.stringify(projects));
} //Saves changes made to a specific node into local storage

export { updateNode };
