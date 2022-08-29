function todo(title, description, dueDate, priority, completed) {
  const toggleComplete = () => {
    completed = !completed;
  };
  const display = () => {
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
    todoDate.textContent = dueDate;
    todoDate.classList.add("due-date");
    todoRow.appendChild(todoDate);

    const todoPriority = document.createElement("p");
    todoPriority.textContent = priority;
    todoPriority.classList.add("priority");
    todoRow.appendChild(todoPriority);

    const todoCompleted = document.createElement("input");
    todoCompleted.type = "checkbox";
    todoCompleted.checked = completed;
    todoCompleted.classList.add("completed");
    todoRow.appendChild(todoCompleted);

    const main = document.querySelector(".main");
    main.appendChild(todoRow);
  };
  return { title, description, dueDate, priority, completed, display };
}

export { todo };
