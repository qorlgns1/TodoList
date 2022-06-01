class TodoManager {
  constructor(todoList) {
    this.todoList = todoList ?? [];
  }

  add(todo) {
    this.todoList.push(todo);
  }

  delete(id) {
    this.todoList = this.todoList.filter((todo) =>
      todo.id !== id ? true : false
    );
  }

  deleteAll() {
    this.todoList = [];
  }
}

export default TodoManager;
