<template>
    <div>
      <h1>Todo List</h1>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <router-link :to="`/task/${task.id}`">{{ task.name }}</router-link>
        </li>
      </ul>
      <router-link to="/add">Add Task</router-link>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  
  interface Task {
    id: number
    name: string
    completed: boolean
  }
  
  export default defineComponent({
    setup() {
      const tasks = ref<Task[]>([])
  
      onMounted(() => {
        const storedTasks = localStorage.getItem('tasks')
        if (storedTasks) {
          tasks.value = JSON.parse(storedTasks)
        }
      })
  
      return { tasks }
    },
  })
  </script>
  