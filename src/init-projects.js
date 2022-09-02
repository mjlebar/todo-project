import { project } from "./project.js";
import { todo } from "./todo.js";

function initProjects() {
  const projects = [];
  const mainProject = project("Main");
  const move = project("Move");
  const guitar = project("Guitar");
  projects.push(mainProject);
  projects.push(move);
  projects.push(guitar);

  const clean = todo(
    "Clean apartment",
    `Take out trash, do dishes, sweep`,
    new Date("9 / 5 / 2022"),
    "Low",
    false
  );
  const feed = todo(
    "Feed the cat",
    `1/4 cup dry food & 1 can wet food/day`,
    new Date("9/2/2022"),
    "High",
    true
  );
  const shop = todo(
    "Buy groceries",
    `Need milk, cheese, snacks, cat food`,
    new Date("9/9/2022"),
    "Low",
    false
  );
  mainProject.addTodo(clean);
  mainProject.addTodo(feed);
  mainProject.addTodo(shop);

  const hire = todo(
    "Hire movers",
    "Get estimate from movers and confirm a date",
    new Date("9/9/2022"),
    "Medium",
    true
  );
  const moveStuff = todo(
    "Move small stuff",
    `Move stuff I don't need movers for, eg book boxes`,
    new Date("9/15/2022"),
    "Medium",
    false
  );
  const newAdd = todo(
    "Change addresses",
    "Register address change with USPS, Illinois BMV, etc.",
    new Date("10/1/2022"),
    "Low",
    false
  );

  move.addTodo(hire);
  move.addTodo(moveStuff);
  move.addTodo(newAdd);

  const stairway = todo(
    "Learn to play Stairway to Heaven",
    "By Led Zeppelin",
    new Date("10/1/2022"),
    "High",
    true
  );
  const pull = todo(
    "Learn to play Pull Me Under",
    "By Dream Theater",
    new Date("10/1/2022"),
    "High",
    true
  );
  const tornado = todo(
    "Learn to play Tornado of Souls",
    "By Megadeth",
    new Date("10/1/2022"),
    "High",
    true
  );

  guitar.addTodo(stairway);
  guitar.addTodo(pull);
  guitar.addTodo(tornado);

  return projects;
} //Just loads up the page with some projects

export { initProjects };
