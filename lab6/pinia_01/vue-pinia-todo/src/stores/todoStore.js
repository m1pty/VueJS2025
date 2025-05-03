import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    showPopup: false,
    todoToDelete: null,
  }),

  actions: {
    async loadTodos() {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      } else {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
          this.todos = response.data.map(todo => ({
            id: todo.id,
            text: todo.title,
            done: todo.completed,
          }));
        } catch (error) {
          console.error('Ошибка при загрузке задач:', error);
        }
      }
    },

    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },

    addTodo(newTodoText) {
      const trimmedTodo = newTodoText.trim();
      if (trimmedTodo) {
        const newTodo = {
          id: Date.now(),
          text: trimmedTodo,
          done: false,
        };
        this.todos.push(newTodo);
        this.saveTodos();
      }
    },

    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.done = !todo.done;
        this.saveTodos();
      }
    },

    confirmRemove(id) {
      this.todoToDelete = id;
      this.showPopup = true;
    },

    deleteConfirmed() {
      if (this.todoToDelete !== null) {
        this.todos = this.todos.filter(t => t.id !== this.todoToDelete);
        this.todoToDelete = null;
        this.showPopup = false;
        this.saveTodos();
      }
    },
  },
});
