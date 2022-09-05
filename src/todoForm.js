function todoForm(e) {
  const main = document.querySelector(".main");
  const plus = e.target;
  plus.classList.add("hidden");

  const form = document.createElement("form");
  const titleInput = document.createElement("input");
  titleInput.classList.add("title-input");
  form.appendChild(titleInput);

  const descriptionInput = document.createElement("input");
  descriptionInput.classList.add("description-input");
  form.appendChild(descriptionInput);

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.classList.add("date-input");
  form.appendChild(dateInput);

  const priorityInput = document.createElement("input");
  priorityInput.classList.add("priority-input");
  form.appendChild(priorityInput);

  const doneInput = document.createElement("input");
  doneInput.type = "checkbox";
  doneInput.classList.add("done-input");
  form.appendChild(doneInput);

  const submit = document.createElement("div");
  submit.classList.add("submit");
  const submitIcon = document.createElement("img");
  submitIcon.src = "../src/arrow-right-box.svg";
  submit.appendChild(submitIcon);
  form.appendChild(submit);

  main.appendChild(form);

  //   let todoTitle, todoDescription, todoDate, todoPriority, todoCompleted;

  //   if (todoTitle) {
  //     return todo(
  //       todoTitle,
  //       todoDescription,
  //       todoDate,
  //       todoPriority,
  //       todoCompleted
  //     );
  //   }
}

export { todoForm };
