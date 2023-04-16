import { createRouter, createWebHistory} from 'vue-router'
import PoliticsNewsVue from '@/views/Politics/PoliticsNews.vue'
import BodyContainerVue from '@/components/centralBody/BodyContainer.vue'
import BusinessNewsVue from '@/views/Business/BusinessNews.vue'
import LifeStyleNewsVue from '@/views/LifeStyle/LifeStyleNews.vue'
import OpinionNewsVue from '@/views/Opinion/OpinionNews.vue'
import SportsNewsVue from '@/views/Sports/SportsNews.vue'
import GamesNews from '@/views/Games/GamesNews.vue'
import WeatherNews from '@/views/Weather/WeatherNews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: BodyContainerVue
    },
    {
      path: '/',
      name: 'Home',
      props: true,
      component: BodyContainerVue
    },
    {
      path: '/Politics',
      name: 'Politics',
      props: true,
      component: PoliticsNewsVue
    },
    {
      path: '/Business',
      name: 'Business',
      props: true,
      component: BusinessNewsVue
    },
    {
      path: '/Sport',
      name: 'Sport',
      props: true,
      component: SportsNewsVue
    },
    {
      path: '/Weather',
      name: 'Weather',
      props: true,
      component: WeatherNews
    },
    {
      path: '/Opinion',
      name: 'Opinion',
      props: true,
      component: OpinionNewsVue
    },
    {
      path: '/LifeStyle',
      name: 'LifeStyle',
      props: true,
      component: LifeStyleNewsVue
    },
    {
      path: '/Games',
      name: 'Games',
      props: true,
      component: GamesNews
    },
    {
      path: '/Politics/:id',
      name: 'PoliticsArts',
      props: true,
      component:() => import("@/views/Politics/Articles/PoliticsArts.vue")
    },
    {
      path: '/Opinion/:id',
      name: 'OpinionArts',
      props: true,
      component:() => import("@/views/Opinion/Articles/OpinionArts.vue")
    },
    {
      path: '/LifeStyle/:id',
      name: 'LifeStyleArts',
      props: true,
      component:() => import("@/views/LifeStyle/Articles/LifeStyleArts.vue")
    },
    
    {
      path: '/Business/:id',
      name: 'BusinessArts',
      props: true,
      component:() => import("@/views/Business/Articles/BusinessArts.vue")
    },
    {
      path: '/Games/:id',
      name: 'GamesArts',
      props: true,
      component:() => import("@/views/Games/Articles/GamesArts.vue")
    },
    {
      path: '/Sport/:id',
      name: 'SportsArts',
      props: true,
      component:() => import("@/views/Sports/Articles/SportsArts.vue")
    },
    {
      path: '/Weather/:id',
      name: 'WeatherArts',
      props: true,
      component:() => import("@/views/Weather/Articles/WeatherArts.vue")
    },
    {
      path: '/account',
      name: 'UserPage',
      props: true,
      component:() => import("@/components/UserPageAccount/UserPage.vue")
    },
    
  ]
})
export default router
