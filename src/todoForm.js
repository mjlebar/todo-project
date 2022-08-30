import { todo } from "./todo.js";

function todoForm() {
  return todo(
    "Kick ass",
    `Kick someone's ass, Kick someone's ass, Kick someone's ass, Kick someone's ass, Kick someone's ass, Kick someone's ass`,
    "12/15/2022",
    "High",
    true
  );
}

export { todoForm };
