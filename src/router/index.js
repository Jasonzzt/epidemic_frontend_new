import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenPage from '../views/ScreenPage'
import CovidDetectPage from "../views/CovidDetectPage";
import PolicyPage from "@/views/PolicyPage";
import PopulationPage from "@/views/PopulationPage";
import PredictionPage from "@/views/PredictionPage";
import FrontPage from "@/views/frontPage";
import population from "../views/population";
import advicePage from "../views/advicePage";
Vue.use(VueRouter)

const routes = [
    {
    path: '/',
    component: FrontPage,
      meta:{index:1}
  },
  {
    path: "/population1",
    component: population,
  },

  {
    path: '/screenpage',
    component: ScreenPage,
    meta:{index:0}
  },
{
    path: '/coviddetect',
    component: CovidDetectPage,
    meta:{index:2}
  },{
    path: '/policy',
    component: PolicyPage,
    meta:{index:2}
  },{
    path: '/population',
    component: PopulationPage,
    meta:{index:0}
  },{
    path: '/prediction',
    component: PredictionPage,
    meta:{index:0}
  },{
    path: '/advicepage',
    component: advicePage,
    meta: {
      index:2
    }
  }


]

const router = new VueRouter({
  routes
})

export default router
