import { createRouter, createWebHistory } from "vue-router";
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Availability from "@/views/Availability";
import EmployeeDatabase from "@/views/EmployeeDatabase";

const routes = [
  {
    path:'/',
    name: 'Login',
    component: Login
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
  },
  {
    path:'/employee',
    name: 'EmployeeDatabase',
    component: EmployeeDatabase
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router