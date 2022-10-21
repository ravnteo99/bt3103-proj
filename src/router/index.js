import { createRouter, createWebHistory } from "vue-router";
// import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'

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
    path:'/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router