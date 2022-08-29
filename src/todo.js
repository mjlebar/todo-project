function todo(title, description, dueDate, priority, completed) {
  const toggleComplete = () => {
    completed = !completed;
  };
  return { title, description, dueDate, priority, completed };
}

export { todo };
