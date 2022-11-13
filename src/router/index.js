import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import EmployeeCalendar from "@/views/EmployeeCalendar.vue";
import Signup from '@/views/Signup.vue'
import Temporary from "@/views/Temporary"
import ForgotPassword from '@/views/ForgotPassword.vue'
import Availability from "@/views/Availability";
import EmployeeDatabase from "@/views/EmployeeDatabase";
import EmployerShift from "@/views/EmployerShift";
import EmployerDashboard from "@/views/EmployerDashboard.vue";

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
  {
      path: "/employeecalendar",
      name: "EmployeeCalendar",
      component: EmployeeCalendar,
  },
  {
    path:'/temporary',
    name: 'Temporary',
    component: Temporary
  },
	{
		path: "/shifts",
		name: "EmployerShift",
		component: EmployerShift
	},
	{
		path: "/employerdashboard",
		name: "EmployerDashboard",
		component: EmployerDashboard,
	},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router