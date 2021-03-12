import Vue from "vue";
import VueRouter from "vue-router";

import home from "../components/home.vue";
import history from "../components/history.vue";

Vue.use(VueRouter);

const routes = [
	{
		path:"/",
		component: home
	},
	{
		path: "/history",
		component: history
	},
	{
		path: "*",
		redirect: '/'
	}
]

var router =  new VueRouter({
	routes
})
export default router;