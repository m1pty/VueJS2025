<template>
    <div>
      <h1>Add Task</h1>
      <form @submit.prevent="addTask">
        <input v-model="taskName" placeholder="Task name" required />
        <button type="submit">Add</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    setup() {
      const taskName = ref('')
  
      const addTask = () => {
        const newTask = {
          id: Date.now(),
          name: taskName.value,
          completed: false,
        }
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
        tasks.push(newTask)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        taskName.value = ''
      }
  
      return { taskName, addTask }
    },
  })
  </script>
  