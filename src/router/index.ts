import { createRouter, createWebHistory} from 'vue-router'
import { createServer} from 'vite';
import Main from '@/Main.vue'
import PoliticsNewsVue from '@/views/Politics/PoliticsNews.vue'
import BodyContainerVue from '@/components/centralBody/BodyContainer.vue'
import BusinessNewsVueVue from '@/views/Business/BusinessNews.vue'
import LifeStyleNewsVue from '@/views/LifeStyle/LifeStyleNews.vue'
import OpinionNewsVue from '@/views/Opinion/OpinionNews.vue'
import SportsNewsVue from '@/views/Sports/SportsNews.vue'
import GamesNews from '@/views/Games/GamesNews.vue'
import WeatherNews from '@/views/Weather/WeatherNews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: BusinessNewsVueVue
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
    }
  ]
})
export default router
