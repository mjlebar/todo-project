import { project } from "./project.js";

function todo(title, description, dueDate, priority, completed) {
  const toggleComplete = () => {
    completed = !completed;
  };

  const submitContent = (e) => {
    if (e.key === "Enter") {
      const input = e.target;
      const newNode = document.createElement("p");

      newNode.classList.add(input.classList[1]);
      newNode.textContent = input.value;
      input.parentNode.replaceChild(newNode, input);
      newNode.addEventListener("dblclick", editContent);
    }
  }; //Submits the new content for a todo section when appropriate

  const editContent = (e) => {
    const node = e.target;
    const input = document.createElement("input");
    input.classList.add("edit");
    input.classList.add(node.classList.value);
    input.value = node.textContent;
    node.parentNode.replaceChild(input, node);
    input.addEventListener("keypress", submitContent);
  }; //Allows sections of todos to be edited

  const display = (index, arr) => {
    const todoRow = document.createElement("div");
    todoRow.classList.add("todo");
    todoRow.classList.add(`${index}`);

    const todoTitle = document.createElement("p");
    todoTitle.textContent = title;
    todoTitle.classList.add("title");
    todoRow.append(todoTitle);
    todoTitle.addEventListener("dblclick", editContent); //Makes it so the entry can be edited by double clicking

    const todoDescription = document.createElement("p");
    todoDescription.textContent = description;
    todoDescription.classList.add("description");
    todoRow.appendChild(todoDescription);
    todoDescription.addEventListener("dblclick", editContent);

    const todoDate = document.createElement("p");
    todoDate.textContent = dueDate;
    todoDate.classList.add("due-date");
    todoRow.appendChild(todoDate);
    todoDate.addEventListener("dblclick", editContent);

    const todoPriority = document.createElement("p");
    todoPriority.textContent = priority;
    todoPriority.classList.add("priority");
    todoRow.appendChild(todoPriority);
    todoPriority.addEventListener("dblclick", editContent);

    if (dueDate === "Due") {
      todoRow.classList.add("head-row");
      const completeHeader = document.createElement("p");
      completeHeader.textContent = "Done";
      completeHeader.classList.add("done");
      todoRow.appendChild(completeHeader);
    } //checks if we're looking at head row... otherwise dueDate should be in date format, not the word 'due'
    else {
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
