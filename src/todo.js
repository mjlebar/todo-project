import { format } from "date-fns";
import { readDate } from "./read-date.js";

function todo(title, description, dueDate, priority, completed) {
  const toggleComplete = () => {
    let projIndex = document.querySelector(".selected").classList[0];
    let todoIndex = input.parentNode.classList[1];

    let projects = JSON.parse(localStorage.getItem("projects"));
    let thisTodo = projects[projIndex].todos[todoIndex];

    localStorage.setItem("projects", JSON.stringify(projects));

    completed = !completed;
    thisTodo.completed = completed;
  };

  const submitContent = (e) => {
    if (e.key === "Enter") {
      const input = e.target;
      const newNode = document.createElement("p");

      let projIndex = document.querySelector(".selected").classList[0];
      let todoIndex = input.parentNode.classList[1];
      let projects = JSON.parse(localStorage.getItem("projects"));
      let thisTodo = projects[projIndex].todos[todoIndex];

      newNode.classList.add(input.classList[1]);

      switch (input.classList[1]) {
        case "title":
          title = input.value;
          thisTodo.title = title;
          newNode.textContent = title;
          break;
        case "description":
          description = input.value;
          thisTodo.description = description;
          newNode.textContent = description;
          break;
        case "due-date":
          dueDate = input.value;
          thisTodo.dueDate = dueDate;
          const date = readDate(dueDate);
          newNode.textContent = format(date, "MM/dd/yyyy");
          break;
        case "priority":
          priority = input.value;
          thisTodo.priority = priority;
          newNode.textContent = priority;
          break;
      } //makes sure the appropriate property is replaced in the underlyig todo structure

      localStorage.setItem("projects", JSON.stringify(projects));

      input.parentNode.replaceChild(newNode, input);
      newNode.addEventListener("dblclick", editContent);
    }
  }; //Submits the new content for a todo section when appropriate

  const editContent = (e) => {
    const node = e.target;
    const input = document.createElement("input");
    input.classList.add("edit");
    input.classList.add(node.classList.value);
    if (e.target.classList.contains("due-date")) {
      input.type = "date";
    }
    input.value = node.textContent;
    node.parentNode.replaceChild(input, node);
    input.addEventListener("keypress", submitContent);
  }; //Allows sections of todos to be edited

  const display = (index, arr) => {
    const todoRow = document.createElement("div");
    todoRow.classList.add("todo");

    const todoTitle = document.createElement("p");
    todoTitle.textContent = title;
    todoTitle.classList.add("title");
    todoRow.append(todoTitle);

    const todoDescription = document.createElement("p");
    todoDescription.textContent = description;
    todoDescription.classList.add("description");
    todoRow.appendChild(todoDescription);

    const todoDate = document.createElement("p");
    todoDate.classList.add("due-date");
    todoRow.appendChild(todoDate); //this needs to be set differently for the header row, so it will be set inside the conditional further on

    const todoPriority = document.createElement("p");
    todoPriority.textContent = priority;
    todoPriority.classList.add("priority");
    todoRow.appendChild(todoPriority);

    if (dueDate === "Due") {
      todoRow.classList.add("head-row");
      const completeHeader = document.createElement("p");
      completeHeader.textContent = "Done";
      completeHeader.classList.add("done");
      todoRow.appendChild(completeHeader);
      todoDate.textContent = dueDate;
    } //checks if we're looking at head row... otherwise dueDate should be in date format, not the word 'due'
    else {
      todoRow.classList.add(`${index}`);
      const date = new Date(dueDate);
      todoDate.textContent = format(date, "MM/dd/yyyy");

      todoTitle.addEventListener("dblclick", editContent);
      todoDescription.addEventListener("dblclick", editContent);
      todoDate.addEventListener("dblclick", editContent);
      todoPriority.addEventListener("dblclick", editContent);
      //Makes it so the entry can be edited by double clicking

      const todoCompleted = document.createElement("input");
      todoCompleted.type = "checkbox";
      todoCompleted.checked = completed;
      todoCompleted.addEventListener("click", toggleComplete);
      todoCompleted.classList.add("completed");
      todoRow.appendChild(todoCompleted);
      //create checkbox and add event listener to track completed property correctly

      const todoRemove = document.createElement("div");
      todoRemove.classList.add("remove");
      const todoRemoveIcon = document.createElement("img");
      todoRemoveIcon.src = "../src/delete-empty.svg";
      todoRemoveIcon.addEventListener("click", (e) => {
        arr.splice(index, 1);
        e.target.parentNode.parentNode.remove();
      }); //Function is defined here rather than separately so it has access to arr and index variables
      todoRemove.appendChild(todoRemoveIcon);
      todoRow.append(todoRemove);
      //Create delete icon and add deletion event listener
    }

    const main = document.querySelector(".main");
    main.appendChild(todoRow);
  };

  return { title, description, dueDate, priority, completed, display };
}

export { todo };
