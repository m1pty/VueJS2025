<template>
  <li class="todo-item">
    <label>
      <input type="checkbox" :checked="todo.done" @change="$emit('toggle', todo.id)" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </label>
    <button @click="$emit('remove', todo.id)">Удалить</button>
  </li>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
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
