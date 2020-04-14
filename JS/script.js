//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//listeners

todoButton.addEventListener("click", addTodo);

//functions

function addTodo(event) {
  //stop refresh on submit
  event.preventDefault();

  //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //todo list
  const newTodo = document.createElement("li");
  //Get value
  newTodo.innerText = todoInput.value;
  //
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  //completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fa fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //apend todo list
  todoList.appendChild(todoDiv);

  todoInput.value = "";
}
