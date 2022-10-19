import { createRouter, createWebHistory } from "vue-router";
// import Home from '@/views/Home.vue'
import Login from "@/views/Login.vue";
import EmployeeCalendar from "@/views/EmployeeCalendar.vue";

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/employeecalendar",
		name: "EmployeeCalendar",
		component: EmployeeCalendar,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
