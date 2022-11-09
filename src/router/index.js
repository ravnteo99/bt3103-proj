import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import EmployeeCalendar from "@/views/EmployeeCalendar.vue";
import Signup from '@/views/Signup.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import Availability from "@/views/Availability";
import EmployeeDatabase from "@/views/EmployeeDatabase";
import EmployerShift from "@/views/EmployerShift";

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
		path: "/shifts",
		name: "EmployerShift",
		component: EmployerShift
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
