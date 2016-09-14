export class TodoListController {
  constructor() {
    this.todos = [
      {text: 'learn angular', done: true},
      {text: 'build an angular app', done: false}
    ];
  }

  addTodo() {
    this.todos.push({text: this.todoText, done: false});
    this.todoText = '';
  };

  remaining() {
    var count = 0;
    this.todos.forEach(todo =>
      count += todo.done ? 0 : 1);
    return count;
  };

  archive() {
    var oldTodos = angular.copy(this.todos);
    this.todos = [];
    oldTodos.forEach(todo => {
      if (!todo.done) this.todos.push(todo);
    });
  };
}
