<template>
    <div>
      <h1>{{ task?.name }}</h1>
      <p>Status: {{ task?.completed ? 'Completed' : 'Pending' }}</p>
      <button @click="toggleCompletion">Toggle Completion</button>
      <button @click="deleteTask">Delete</button>
      <router-link :to="'/'">Back</router-link>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  interface Task {
    id: number
    name: string
    completed: boolean
  }
  
  export default defineComponent({
    setup() {
      const route = useRoute()
      const router = useRouter()
      const task = ref<Task | null>(null)
  
      onMounted(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
        task.value = tasks.find((t: Task) => t.id === Number(route.params.id)) || null
      })
  
      const toggleCompletion = () => {
        if (task.value) {
          task.value.completed = !task.value.completed
          updateTask()
          alert('Task status has been changed')
        }
      }
  
      const deleteTask = () => {
        if (task.value) {
          const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
          const updatedTasks = tasks.filter((t: Task) => t.id !== task.value.id)
          localStorage.setItem('tasks', JSON.stringify(updatedTasks))
          alert('Task deleted')
          router.push('/')
        }
      }
  
      const updateTask = () => {
        if (task.value) {
          const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
          const index = tasks.findIndex((t: Task) => t.id === task.value.id)
          if (index !== -1) {
            tasks[index] = task.value
            localStorage.setItem('tasks', JSON.stringify(tasks))
          }
        }
      }
  
      return { task, toggleCompletion, deleteTask }
    },
  })
  </script>
  