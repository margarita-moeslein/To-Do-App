const newToDoInput = document.querySelector("#todo-description");
const addToDoButton = document.querySelector("#add-btn");
const removeToDoButton = document.querySelector("#btn-delete-all");
const toDoList = document.querySelector("#todo-list");
const toDoFilters = document.querySelector("#filter");

let toDos = JSON.parse(localStorage.getItem("todos")) || []; // Todos aus dem Local Storage ziehen ODER wenn nichts im Local Storage: leeres Array

//*************************
addToDoButton.addEventListener("click", addToDo);
//removeToDoButton.addEventListener()

//*************************
function addToDo() {
  if (newToDoInput.value === "") {
    return;
  }

  // neues Todo in toDos-Array hinzufügen
  toDos.push({
    description: newToDoInput.value,
    done: false,
    id: createId(newToDoInput.value),
  });

  // Input-Feld leeren
  newToDoInput.value = "";
  // Input-Feld fokussieren
  newToDoInput.focus();

  // aktualisiertes toDos-Array in localStorage speichern
  localStorage.setItem("todos", JSON.stringify(toDos));

  // alle Todos rendern/anzeigen aus toDos-Array
  renderToDo(toDos);
}

/*if (newToDoInput.value.length < 5) {
  alert("Please insert at least 5 characters.");
} else {
  toDos.push(newToDo);
*/

//**************************

function renderToDo(todos) {
  // Liste einmal leeren, damit alte Todos verschwinden
  toDoList.innerText = "";

  // alle Elemente aus toDos-Array als HTML-Elemente erstellen:
  /*
  <li>
    <input type="checkbox" id="todo.id">
    <label for="todo.id">todo.description</label>
  </li>
  */
  for (let todo of todos) {
    const listEl = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = todo.id;
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", updateTodo);
    const label = document.createElement("label");
    label.innerText = todo.description;
    label.setAttribute("for", checkbox.id);
    listEl.append(checkbox, label);
    toDoList.append(listEl);
  }
}

function updateTodo(event) {
  const checkboxId = event.target.id;
  console.log(event.target)
  console.log("buttonId: " + checkboxId);
  const index = toDos.findIndex((todo) => todo.id === checkboxId);
  console.log(index);

  toDos[index].done = !toDos[index].done;
}

toDoFilters.addEventListener("change", filterTodos)

function filterTodos(event) {
  const filter = event.target.value // all, done, open

  if (filter === "all") {
    renderToDo(toDos)
  } else if (filter === "done") {
    const doneTodos = toDos.filter(todo => todo.done === true) // {done: true}
    renderToDo(doneTodos)
  } else if (filter === "open") {
    const openTodos = toDos.filter(todo => todo.done === false) // {done: false}
    renderToDo(openTodos)
  }
}

removeToDoButton.addEventListener("click", removeDoneTodos)

function removeDoneTodos() {
  // toDos-Array wird überschrieben mit nur den toDos, bei den {done: false} ist
  toDos = toDos.filter(todo => todo.done === false); // {done: false}
  localStorage.setItem("todos", JSON.stringify(toDos));
  renderToDo(toDos)
}

function createId(text) {
  return (
    text.replaceAll(" ", "").toLowerCase() + Math.floor(Math.random() * 99999999)
  );
}

// createId("Hallo Welt")
// => hallowelt2615645

//******************

/*btnDeleteAll.addEventListener("click", (e) => {
  toDos = toDos.filter((toDo) => !toDo.done);
  localStorage.setItem("todos", JSON.stringify(toDos));
  renderToDo();
});
*/
/*function changeDoneStyle(e) {
  if (e.target.checked === true) {
    e.target.nextElementSibling.style.textDecoration = "line-through";
  } else {
    e.target.nextElementSibling.style.textDecoration = "none";
  }
}
*/
renderToDo(toDos);
