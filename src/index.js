import Todo from "./component/Todo.js";
import TodoManager from "./component/TodoManager.js";

// Selectors
const createTodoBtn = document.querySelector(".create-todo");
const deleteTodoBtn = document.querySelector(".delete");
const deleteAllTodoBtn = document.querySelector(".delete-all");
const writeTodo = document.querySelector(".input-todo");
const todoListEl = document.querySelector(".list-todo");

// Create TodoManager Instance
let todoManager;

// IIFE
(function init() {
  const todoList = JSON.parse(localStorage.getItem("todoList"));
  todoManager = new TodoManager(todoList);

  const fragment = new DocumentFragment();
  todoManager.todoList.forEach((todo) => {
    const li = makeTodoEl(todo);
    fragment.appendChild(li);
  });

  todoListEl.append(fragment);

  console.log(todoManager);
})();

// Events
createTodoBtn.addEventListener("click", handleCreateTodo);
deleteTodoBtn.addEventListener("click", handleDeleteTodo);
deleteAllTodoBtn.addEventListener("click", handleDeleteAllTodo);

// Functions
function handleDeleteTodo(event) {
  event.preventDefault();

  const checked = todoListEl.querySelectorAll("input[type='checkbox']:checked");
  checked.forEach((todo) => {
    const deleteTodo = todo.parentElement;
    const deleteTodoId = deleteTodo.querySelector(".unique-secret").innerHTML;
    todoManager.delete(deleteTodoId);

    deleteTodo.remove();
  });

  localStorageSave(todoManager.todoList);
}

function handleDeleteAllTodo(event) {
  event.preventDefault();

  todoManager.deleteAll(); //todolist 삭제
  localStorage.removeItem("todoList");
  const liArr = todoListEl.querySelectorAll("li");
  liArr.forEach((li) => todoListEl.removeChild(li)); //todolist 자식노드 삭제
}

function handleCreateTodo(event) {
  event.preventDefault();

  // todo 만들기
  const todo = new Todo(writeTodo.value);
  todoManager.add(todo);

  // 로컬스토리지 저장
  localStorageSave(todoManager.todoList);

  // todoList Element에 todo 넣기
  const li = makeTodoEl(todo);
  todoListEl.append(li);

  writeTodo.value = "";
}

function localStorageSave(todoList) {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function makeTodoEl(todo) {
  // todoList Element에 todo 넣기
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  const p = document.createElement("p");
  p.textContent = `${todo.content} - ${todo.date}`;
  const uniqueP = document.createElement("p");
  uniqueP.textContent = `${todo.id}`;
  uniqueP.classList.add("unique-secret");
  uniqueP.style.display = "none";
  li.append(input, p, uniqueP);
  return li;
}
