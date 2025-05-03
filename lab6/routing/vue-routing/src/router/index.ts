import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddTask from '../views/AddTask.vue'
import TaskDetail from '../views/TaskDetail.vue'
import About from '../views/About.vue'
import TaskDelete from '../views/TaskDelete.vue'
import TaskComplete from '../views/TaskComplete.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/add', component: AddTask },
  { path: '/task/:id', component: TaskDetail, props: true },
  { path: '/task/:id/delete', component: TaskDelete, props: true },
  { path: '/task/:id/complete', component: TaskComplete, props: true },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
