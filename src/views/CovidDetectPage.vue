<template>
<!--  <div :style="background" class="bgBackground">-->
<!--  </div>-->
  <div class="com-page">
    <h1 style="color: #222222">hello</h1>
  </div>
<!--  <el-col :span="24">-->
<!--      <el-col :span="10">-->
<!--        <el-form-item clearable label="核酸检测点" prop="detectProvince">-->
<!--          <el-select-->
<!--              v-model="dataForm.detectProvince"-->
<!--              collapse-tags-->
<!--              filterable-->
<!--              @change="getCityList"-->
<!--              placeholder="请选择所在省">-->
<!--            <el-option-->
<!--                v-for="item in provinceList"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--      <el-col :span="7">-->
<!--        <el-form-item prop="detectCity" class="cityOffsetLeft">-->
<!--          <el-select clearable-->
<!--                     v-model="dataForm.detectCity"-->
<!--                     collapse-tags-->
<!--                     filterable-->
<!--                     @change="getCountyList"-->
<!--                     placeholder="请选择所在市">-->
<!--            <el-option-->
<!--                v-for="item in cityList"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--      <el-col :span="7">-->
<!--        <el-form-item prop="detectCounty" class="countyOffsetLeft">-->
<!--          <el-select clearable-->
<!--                     v-model="dataForm.detectCounty"-->
<!--                     collapse-tags-->
<!--                     filterable-->
<!--                     placeholder="请选择所在县">-->
<!--            <el-option-->
<!--                v-for="item in countyList"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--   </el-col>-->

</template>

<style lang="less">
.flex {
  flex: 1;
}

.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.bgc-size {
  width: 99%;
  padding: 5px 5%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  overflow: hidden;
}

.screen-page {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background: #00065b url(../../public/static/img/bg.jpg) no-repeat 0 0;
}



</style>

<script>
// import CountryTop from '@/components/CountryTop'
// export default {
//   components: {
//     'country-top': CountryTop,
//   },
// }
// export default {
//   data () {
//     return {
//       dataForm: {
//         detectProvince: '',
//         detectCity: '',
//         detectCounty: ''
//       },
//       provinceList: {},
//       cityList: {},
//       countyList: {}
//     }
//   },
//   methods: {
//     init () {
//       this.getProvince()
//     },
//     getInfo () {
//       this.getCityList(res.data.detectProvince)
//       this.getCountyList(res.data.detectCity)
//       this.dataForm.detectCity = res.data.detectCity
//       this.dataForm.detectCounty = res.data.detectCounty
//     },
//     // 绑定行政区域省
//     getProvince () {
//       this.$http.post(`/sys/region/getListByPid?pid=` + 0).then(({ data: res }) => {
//         if (res.code !== 0) {
//           return this.$message.error(res.msg)
//         }
//         this.provinceList = res.data
//       }).catch(() => {
//       })
//     },
//     // 绑定行政区域市
//     getCityList (value) {
//       this.dataForm.detectCity = ''
//       this.dataForm.detectCounty = ''
//       this.$http.post(`/sys/region/getListByPid?pid=${value}`).then(({ data: res }) => {
//         if (res.code !== 0) {
//           return this.$message.error(res.msg)
//         }
//         this.cityList = res.data
//       }).catch(() => {
//       })
//     },
//     // 绑定行政区域区
//     getCountyList (value) {
//       this.dataForm.detectCounty = ''
//       this.$http.post(`/sys/region/getListByPid?pid=${value}`).then(({ data: res }) => {
//         if (res.code !== 0) {
//           return this.$message.error(res.msg)
//         }
//         this.countyList = res.data
//       }).catch(() => {
//       })
//     }
//   }
// }
// export default {
//   data () {
//     return {
//       // 顶部导航背景图片配置
//       background: {
//         // 背景图片地址
//         backgroundImage: 'url(' + require('../../public/static/img/bg.jpg') + ')',
//         // 背景图片是否重复
//         backgroundRepeat: 'no-repeat',
//         // 背景图片大小
//         backgroundSize: 'cover',
//         // 背景颜色
//         backgroundColor: '#000',
//         // 背景图片位置
//         backgroundPosition: 'center top'
//       }
//     }
//   }
//   }

</script>
