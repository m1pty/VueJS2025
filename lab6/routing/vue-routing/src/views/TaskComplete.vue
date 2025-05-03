<template>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue'
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
  
      onMounted(() => {
        const taskId = Number(route.params.id)
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
        const task = tasks.find((t: Task) => t.id === taskId)
  
        if (task) {
          task.completed = true
          localStorage.setItem('tasks', JSON.stringify(tasks))
          alert('Task status has been changed')
        } else {
          alert('Task not found')
        }
  
        router.push('/')
      })
  
      return {}
    },
  })
  </script>
  