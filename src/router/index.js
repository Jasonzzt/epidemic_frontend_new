import Vue from 'vue'
import VueRouter from 'vue-router'
import MapPage from '../views/MapPage'
import ScreenPage from '../views/ScreenPage'
import MonthPage from '../views/MonthPage'
import CountryTopPage from '../views/CountryTopPage'
import CovidDetectPage from "../views/CovidDetectPage";
import PolicyPage from "@/views/PolicyPage";

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: ScreenPage
  },
  {
    path: '/mappage',
    component: MapPage
  },
  {
    path: '/screenpage',
    component: ScreenPage
  },
  {
    path: '/monthpage',
    component: MonthPage
  },
  {
    path: '/countrytop',
    component: CountryTopPage
  },{
    path: '/coviddetect',
    component: CovidDetectPage
  },{
    path: '/policy',
    component: PolicyPage
  }


]

const router = new VueRouter({
  routes
})

export default router
