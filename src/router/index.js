import { createRouter, createWebHistory } from "vue-router";
// import Home from '@/views/Availability.vue'
import Login from '@/views/Login.vue'
import Availability from "@/views/Availability";
import Signup from '@/views/Signup.vue'
import Availability from "@/views/Availability";

const routes = [
  {
    path:'/',
    name: 'Login',
    component: Login
  },
  {
    path:'/availability',
    name: 'Availability',
    component: Availability
  },
  {
    path:'/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path:'/availability',
    name: 'Availability',
    component: Availability
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router