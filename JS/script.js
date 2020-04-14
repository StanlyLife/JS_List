//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//listeners

todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);
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

function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;

  //delete todo
  if (item.classList[0] === "trash-btn") {
    //animation
    todo.classList.add("fall");
    //eventlistener
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //mark completed
  if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
  }
}
