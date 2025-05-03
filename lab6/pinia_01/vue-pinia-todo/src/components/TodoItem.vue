<template>
  <li class="todo-item">
    <label>
      <input type="checkbox" :checked="todo.done" @change="toggleTodo" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </label>
    <button @click="removeTodo">Удалить</button>
  </li>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['toggle', 'remove']);

function toggleTodo() {
  emit('toggle', todo.id);
}

function removeTodo() {
  emit('remove', todo.id);
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
}
.done {
  text-decoration: line-through;
  color: gray;
}
button {
  margin-left: 1rem;
}
</style>
