<template>
</template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  export default defineComponent({
    setup() {
      const route = useRoute()
      const router = useRouter()
  
      onMounted(() => {
        const taskId = Number(route.params.id)
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
        const updatedTasks = tasks.filter((task: { id: number }) => task.id !== taskId)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        alert('Task deleted')
        router.push('/')
      })
  
      return {}
    },
  })
  </script>
  