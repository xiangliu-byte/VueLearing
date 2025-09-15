import {createRouter,createWebHistory}from 'vue-router'

import ColorTheme from "../pages/ColorTheme.vue";
import HomeView from "../pages/HomeView.vue";
import MockView from '@/pages/MockView.vue';
import PetQuery from '@/pages/PetQuery.vue';
import Translate from '@/pages/Translate.vue';

const routes = [
    {name:'theme',path:'/theme',component:ColorTheme},
    {name:'home',path:'/',component:HomeView},
    {name:'mock',path:'/mock',component:MockView},
    {name:'pet-query',path:'/pet-query',component:PetQuery},
    {name:'translate',path:'/translate',component:Translate}
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router