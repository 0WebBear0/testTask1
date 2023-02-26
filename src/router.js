import {createRouter, createWebHistory} from 'vue-router'
import Form from '@/views/Form.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Form,
        },
    ],
})
