import { format } from "date-fns";
import { updateNode } from "./update-node.js";
import { readDate } from "./read-date.js";
import trashIcon from "./delete-empty.svg";

function todo(title, description, dueDate, priority, completed) {
  const toggleComplete = (e) => {
    completed = !completed; //switches the value of the variable itself

    updateNode(
      e.target,
      new todo(title, description, dueDate, priority, completed)
    ); //and makes sure that change is tracked in local storage
  };

  const submitContent = (e) => {
    if (e.key === "Enter") {
      //we only want to submit content if the user presses return!
      const input = e.target;
      const newNode = document.createElement("p");

      const property = input.classList[1]; //tells us which property has been modified, ie title, description, date, or priority

      newNode.classList.add(property);

      switch (property) {
        case "title":
          title = input.value;
          newNode.textContent = title;
          break;
        case "description":
          description = input.value;
          newNode.textContent = description;
          break;
        case "due-date":
          dueDate = input.value;
          const date = readDate(dueDate);
          newNode.textContent = format(date, "MM/dd/yyyy");
          break;
        case "priority":
          priority = input.value;
          newNode.textContent = priority;
          break;
      } //makes sure the appropriate property is replaced in the underlying todo structure, and makes sure that is reflected in the new node DOM object

      input.parentNode.replaceChild(newNode, input); //replaces the input with the newly made node
      newNode.addEventListener("dblclick", editContent); //and allows us to edit the new node!
      updateNode(
        newNode,
        new todo(title, description, dueDate, priority, completed)
      ); //makes sure updates are stored in local storage
    }
  }; //Submits the new content for a todo section when appropriate

  const editContent = (e) => {
    const node = e.target;
    const input = document.createElement("input");
    input.classList.add("edit");
    input.classList.add(node.classList.value); //makes sure the input tracks which feature is being edited - ie description or title

    if (e.target.classList.contains("due-date")) {
      input.type = "date";
    } //dates have a special kind of input

    input.value = node.textContent; //makes sure that anything already entered in that section is still present - that way you don't accidentally clear it out by double clicking on it!
    node.parentNode.replaceChild(input, node);
    input.addEventListener("keypress", submitContent);
  }; //Allows sections of todos to be edited, by replacing whatever section is double clicked on with a textbox where that section can be edited. the submitContent function allows those changes to be submitted

  const display = (index, arr) => {
    //displays the todo - the function looks big but most of it is just html creation

    const todoRow = document.createElement("div");
    todoRow.classList.add("todo");
    //creates the row

    const todoTitle = document.createElement("p");
    todoTitle.textContent = title;
    todoTitle.classList.add("title");
    todoRow.appendChild(todoTitle);
    //creates the title

    const todoDescription = document.createElement("p");
    todoDescription.textContent = description;
    todoDescription.classList.add("description");
    todoRow.appendChild(todoDescription);
    //creates the description

    const todoDate = document.createElement("p");
    todoDate.classList.add("due-date");
    todoRow.appendChild(todoDate); //this needs to be set differently for the header row, so the text content will be set inside the conditional further on

    const todoPriority = document.createElement("p");
    todoPriority.textContent = priority;
    todoPriority.classList.add("priority");
    todoRow.appendChild(todoPriority);
    //creates the priority

    if (dueDate === "Due") {
      todoRow.classList.add("head-row");
      const completeHeader = document.createElement("p");
      completeHeader.textContent = "Done";
      completeHeader.classList.add("done");
      todoRow.appendChild(completeHeader);
      todoDate.textContent = dueDate;
    } //checks if we're looking at head row... otherwise dueDate should be in date format, not the word 'due'. If we are, makes sure that's reflected in the classLists and appropriately constructs the row. Arr and index are not used, so we can call display on the headRow project with no arguments
    else {
      todoRow.classList.add(`${index}`);
      const date = readDate(dueDate);
      todoDate.textContent = format(date, "MM/dd/yyyy"); //fills in the date

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
      //create checkbox and add event listener to track completed property correctly - we have this in the else block because it is not in the header row

      const todoRemove = document.createElement("div");
      todoRemove.classList.add("remove");
      const todoRemoveIcon = document.createElement("img");
      todoRemoveIcon.src = trashIcon;
      todoRemoveIcon.addEventListener("click", (e) => {
        arr.splice(index, 1);
        e.target.parentNode.parentNode.remove();
      }); //Create a button to remove todos - we have this in the else block because it is not in the header row. This is the only time arr is used
      todoRemove.appendChild(todoRemoveIcon);
      todoRow.appendChild(todoRemove);
      //Create delete icon and add deletion event listener
    }

    const main = document.querySelector("main");
    main.appendChild(todoRow);
  };

  return { title, description, dueDate, priority, completed, display };
}

export { todo };
