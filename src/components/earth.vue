<!--<template>-->
<!--  <div class="echart" id="mychart" :style="myChartStyle"></div>-->
<!--</template>-->

<!--<script>-->
<!--import 'echarts-gl'-->
<!--import $ from 'jquery' // 引入jQuery-->
<!--import 'echarts/map/js/world.js' // 必须引入世界地图-->
<!--// import * as echarts from 'echarts'-->
<!--export default {-->
<!--name: 'login_new',-->
<!--methods: {-->
<!--// 绘制3D路径图-->
<!--draw () {-->
<!--var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'-->
<!--var myChart = this.$echarts.init(document.getElementById('main'))-->
<!--// eslint-disable-next-line no-unused-vars-->
<!--var option-->

<!--var uploadedDataURL = ROOT_PATH + '/data-gl/asset/data/flights.json'-->
<!--myChart.showLoading()-->
<!--$.getJSON(uploadedDataURL, function (data) {-->
<!--myChart.hideLoading()-->

<!--function getAirportCoord (idx) {-->
<!--return [data.airports[idx][3], data.airports[idx][4]]-->
<!--}-->

<!--var routes = data.routes.map(function (airline) {-->
<!--return [getAirportCoord(airline[1]), getAirportCoord(airline[2])]-->
<!--})-->
<!--myChart.setOption({-->
<!--geo3D: {-->
<!--map: 'world',-->
<!--shading: 'realistic',-->
<!--silent: false, // 鼠标设置为不触发事件-->
<!--environment: '#333', // 背景色-->
<!--realisticMaterial: {-->
<!--roughness: 0.8,-->
<!--metalness: 0-->
<!--},-->
<!--postEffect: {-->
<!--enable: true-->
<!--},-->
<!--groundPlane: {-->
<!--show: false-->
<!--},-->
<!--light: {-->
<!--main: {-->
<!--intensity: 1,-->
<!--alpha: 30-->
<!--},-->
<!--ambient: {-->
<!--intensity: 0-->
<!--}-->
<!--},-->
<!--viewControl: {-->
<!--distance: 70, // 地图缩放程度-->
<!--alpha: 89, // 地图翻转程度-->
<!--panMouseButton: 'left',-->
<!--rotateMouseButton: 'right',-->

<!--rotateSensitivity: false, // 地图是否能旋转-->
<!--zoomSensitivity: false // 地图是否能缩放-->
<!--},-->
<!--itemStyle: {-->
<!--color: '#000' // 地图的颜色-->
<!--},-->
<!--regionHeight: 0.5 // 地图高度-->
<!--},-->
<!--series: [-->
<!--{-->
<!--type: 'lines3D',-->
<!--coordinateSystem: 'geo3D',-->
<!--effect: { // 特效线的配置-->
<!--show: true,-->
<!--trailWidth: 1,-->
<!--trailOpacity: 0.5,-->
<!--trailLength: 0.2,-->
<!--constantSpeed: 5 // 特效固定速度-->
<!--},-->
<!--blendMode: 'lighter',-->
<!--lineStyle: { // 特效线-->
<!--width: 0.2,-->
<!--opacity: 0.05-->
<!--},-->
<!--data: routes-->
<!--}-->
<!--]-->
<!--})-->
<!--// addEventListener监听事件处理函数-->
<!--window.addEventListener('keydown', function () {-->
<!--myChart.dispatchAction({-->
<!--type: 'lines3DToggleEffect',-->
<!--seriesIndex: 0-->
<!--})-->
<!--})-->
<!--})-->
<!--}-->
<!--},-->
<!--mounted () {-->
<!--this.draw()-->
<!--}-->
<!--}</script>-->
