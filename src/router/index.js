import Vue from 'vue'
import VueRouter from 'vue-router'
import MapPage from '../views/MapPage'
import ScreenPage from '../views/ScreenPage'
import MonthPage from '../views/MonthPage'
import CountryTopPage from '../views/CountryTopPage'
import CovidDetectPage from "../views/CovidDetectPage";
import PolicyPage from "@/views/PolicyPage";
import PopulationPage from "@/views/PopulationPage";
import PredictionPage from "@/views/PredictionPage";
import FrontPage from "@/views/frontPage";
Vue.use(VueRouter)

const routes = [
    {
    path: '/',
    component: FrontPage,
      meta:{index:0}
  },
  {
    path: '/mappage',
    component: MapPage,
    meta:{index:1}
  },
  {
    path: '/screenpage',
    component: ScreenPage,
    meta:{index:0}
  },
  {
    path: '/monthpage',
    component: MonthPage,

  },
  {
    path: '/countrytop',
    component: CountryTopPage,

  },{
    path: '/coviddetect',
    component: CovidDetectPage,
    meta:{index:1}
  },{
    path: '/policy',
    component: PolicyPage,
    meta:{index:1}
  },{
    path: '/population',
    component: PopulationPage,
    meta:{index:1}
  },{
    path: '/prediction',
    component: PredictionPage,
    meta:{index:1}
  },


]

const router = new VueRouter({
  routes
})

export default router
