<template>
  <div class="container">
    <h1>📝 Мой список дел</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Добавить новую задачу" />
      <button type="submit">Добавить</button>
    </form>
    <ul>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo(todo.id)"
        @remove="removeTodo(todo.id)"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import TodoItem from './components/TodoItem.vue';

const newTodo = ref('');
const todos = ref([]);

// Загрузка задач из localStorage или API при монтировании компонента
onMounted(async () => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  } else {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
      todos.value = response.data.map(todo => ({
        id: todo.id,
        text: todo.title,
        done: todo.completed
      }));
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
    }
  }
});

// Слежение за изменениями в списке задач и сохранение в localStorage
watch(
  todos,
  (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  },
  { deep: true }
);

// Добавление новой задачи
async function addTodo() {
  const trimmedTodo = newTodo.value.trim();
  if (trimmedTodo) {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: trimmedTodo,
        completed: false
      });
      const newTask = {
        id: response.data.id,
        text: trimmedTodo,
        done: false
      };
      todos.value.push(newTask);
      newTodo.value = '';
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  }
}

// Переключение состояния выполнения задачи
async function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id);
  if (todo) {
    try {
      await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: !todo.done
      });
      todo.done = !todo.done;
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  }
}

// Удаление задачи
async function removeTodo(id) {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    todos.value.splice(id, 1);
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error);
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}
form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
input[type="text"] {
  flex: 1;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
</style>
