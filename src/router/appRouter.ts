import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import About from '@/components/About.vue'
import { CLIENT_PATHS, ROUTE_NAMES } from '@/utilities/constants'

const ROUTES: RouteRecordRaw[] = [
    {
        path: CLIENT_PATHS.index,
        redirect: CLIENT_PATHS.dashboard,
        name: ROUTE_NAMES.index
    }, 
    {
        path: CLIENT_PATHS.dashboard,
        component: Dashboard,
        name: ROUTE_NAMES.dashboard
    },
    {
        path: CLIENT_PATHS.about,
        component: About,
        name: ROUTE_NAMES.about
    }
]

const ROUTER = createRouter({
    history: createWebHistory(),
    routes: ROUTES
})

export { ROUTER }