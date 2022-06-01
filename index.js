class Todo {
  constructor(item) {
    this.item = item;
  }
}

class TodoManager {
  constructor() {
    this.todoList = JSON.parse(localStorage.getItem("todoList")) ?? [];
    if (this.todoList.length) {
      this.allDrawTodo();
    }

    const createTodoBtn = document.querySelector(".create-todo");
    const inputTodo = document.querySelector(".input-todo");
    const todoListEl = document.querySelector(".list-todo");
    createTodoBtn.addEventListener("click", () => {
      // todo 만들기
      const createTodo = new Todo(inputTodo.value);
      this.todoList.push(createTodo);

      // 로컬스토리지 저장
      localStorage.setItem("todoList", JSON.stringify(this.todoList));

      // todoList Element에 todo 넣기
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      const p = document.createElement("p");
      p.textContent = createTodo.item;

      li.append(input, p);
      todoListEl.append(li);
    });

    const deleteAllTodoBtn = document.querySelector(".delete-all");
    deleteAllTodoBtn.addEventListener("click", () => {
      this.deleteAll();
    });

    const deleteTodoBtn = document.querySelector(".delete");
    deleteTodoBtn.addEventListener("click", () => {
      this.delete();
    });
  }

  allDrawTodo() {
    const todoList = document.querySelector(".list-todo");
    const freg = document.createDocumentFragment();
    this.todoList.forEach((todo) => {
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      const p = document.createElement("p");
      p.textContent = todo.item;

      li.append(input, p);
      freg.append(li);
    });

    todoList.appendChild(freg);
  }

  deleteAll() {
    this.todoList = [];
    localStorage.removeItem("todoList");
    const todoList = document.querySelector(".list-todo");
    for (let i = todoList.childNodes.length - 1; i >= 0; i--) {
      todoList.removeChild(todoList.childNodes[i]);
    }
  }

  delete() {
    const checked = document.querySelectorAll(
      ".list-todo > li > input[type='checkbox']:checked"
    );

    checked.forEach((v) => {
      v.parentElement.remove();
    });
  }
}

const todoManager = new TodoManager();
