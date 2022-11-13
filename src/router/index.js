import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import EmployeeCalendar from "@/views/EmployeeCalendar.vue";
import Signup from '@/views/Signup.vue'
// import ForgotPassword from '@/views/ForgotPassword.vue'
// import Availability from "@/views/Availability";
import EmployeeDatabase from "@/views/EmployeeDatabase";
import EmployerDashboard from "@/views/EmployerDashboard.vue"

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/signup",
		name: "Signup",
		component: Signup,
	},
	{
		path: "/employeecalendar",
		name: "EmployeeCalendar",
		component: EmployeeCalendar,
	},
	{
		path: "/employerdashboard",
		name: "EmployerDashboard",
		component: EmployerDashboard,
	},
	{
		path: "/employees",
		name: "EmployeeDatabase",
		component: EmployeeDatabase,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
