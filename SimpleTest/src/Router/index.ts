import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';


const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})