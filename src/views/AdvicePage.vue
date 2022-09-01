<template>

  <div class="com-page2">

    <el-page-header @back="goBack" content=" ">
    </el-page-header>

    <el-container>
      <el-header style="font-size: 35px;font-family:新宋体">
        <dv-decoration-7 style="width:350px;height:20px;">出行建议查询<i class="el-icon-s-order"></i></dv-decoration-7>
      </el-header>

      <dv-decoration-5 style="width:1000px;margin-left: 300px;height:30px;"/>

      <el-main style="font-size: 22px; font-family: 宋体">请完善相关信息: <br>
        <div class="block">
          <div class="select_btn">
            <span class="demonstration">出发地（城市）</span>
            <el-cascader popper-class="pc-sel-area-cascader" style="width: 150px;"
                         :popper-append-to-body='false'
                         v-model="value"
                         :level="2"
                         :options="options"
            ></el-cascader>

            <span class="demonstration" style="margin-left: 50px;">目的地（城市）</span>
            <el-cascader popper-class="pc-sel-area-cascader" style="width: 150px"
                         v-model="value1"
                         :options="options"
                         :level="2"
            ></el-cascader>

            <el-button @click="search" type="primary" icon="el-icon-search" style="margin-left: 50px"> 搜索</el-button>
          </div>

        </div>
        <el-row style="display: flex;justify-content: center">
          <CenterTop style="width: 70%"></CenterTop>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px;margin-top: 100px">

          <el-col :span="10" style="font-size: 19px;margin-left: 90px">
            <dv-border-box-1>
              <div class="contentin bgc-size flex">目的地迁入排名
                <vue-scroll :ops="ops" style="width:570px;height:400px">
                  <div>
                    <el-table
                        :data="tableData"
                        :header-cell-style="{ backgroundColor:'#3d488c',textAlign: 'center' ,color:'#ffffff' }"
                        :cell-style="{ textAlign: 'center' ,color:'#2d1818'}"
                        :row-class-name="tableRowClassName"
                        style="width: 100%;margin-top: 10px;width: 560px">
                      <el-table-column
                          prop="province"
                          label="省份"
                          width="180">
                      </el-table-column>
                      <el-table-column
                          prop="city"
                          label="城市"
                          width="180">
                      </el-table-column>
                      <el-table-column
                          prop="prop"
                          label="占比">
                      </el-table-column>
                    </el-table>
                  </div>
                </vue-scroll>
              </div>
            </dv-border-box-1>
          </el-col>

          <el-col :span="10" style="font-size: 19px;margin-left: 50px">
            <dv-border-box-1>
              <div class="contentout bgc-size flex">出行建议
                <vue-scroll :ops="ops" style="width:550px;height:400px">
                  <div v-html="this.out"></div>
                </vue-scroll>
              </div>
            </dv-border-box-1>
          </el-col>

        </el-row>
        <dv-decoration-2 style="width:1100px;height:5px;margin-left: 200px;position: relative"/>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import router from "@/router";
import CenterTop from "../components/CenterSuggestion";
import {CitiesCode} from "../assets/common/constant"

export default {
  name: "advicePage",

  components: {
    CenterTop
  },

  data() {
    return {
      textIncrease: '',
      textIncrease1: '',
      textComfirm: '',
      textArea: '',
      textArea1: '',
      count: 0,
      count1: 0,
      split1: 0.5,
      value: [],
      value1: [],
      out: '',
      in: '',
      analysis: '',
      tableData: [],
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          background: '#7a82b0',
          opacity: 0,
          size: '10px',
          specifyBorderRadius: false,
          gutterOfEnds: null,    //轨道距 x 和 y 轴两端的距离
          gutterOfSide: '0',   //距离容器的距离
          keepShow: false,   //是否即使 bar 不存在的情况下也保持显示
          border: 'none',  //边框
          padding: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: '#4a58a9',   //颜色
        }
      },
      options: CitiesCode
    };
  },

  methods: {

    goBack() {
      router.push('/')
      this.$store.commit("clear", {})
    },

    // 生成出行建议
    search() {
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$axios.post('http://116.62.153.183/geteEpidemicDataByIdAndDate', {
        "cityId": this.value[1],
        "date": "2022-08-30"
      }, config).then(res => {
        let msg = res.data.msg
        if (msg.confirmIncrease > 0 || msg.asymptomaticIncrease > 0) {
          this.textIncrease1 = "1.始发地有新增确诊（无症状）病例，"
          this.count1++
        }
        if (msg.riskAreaNumber > 0) {
          if (this.count1 > 0) {
            this.textArea1 = "存在风险区域，有疫情外溢风险。<br>"
            this.count1++
          } else {
            this.textArea1 = "1.始发地存在风险区域，有一定的疫情外溢风险。<br>"
          }
        } else {
          if (this.count1 == 0) {
            this.textArea1 = "1.始发地疫情风险低，可外出。<br>"
          } else {
            this.textArea1 = "存在一定的疫情外溢风险。<br>"
          }
        }
        this.$axios.post('http://116.62.153.183/getPopulationAnalysis', {"cityId": this.value1[1]}, config).then(res => {
          let msg = res.data.msg

          console.log(msg)
          this.analysis = msg
          if (msg.endsWith("风险。")) {
            this.count++
          }
          this.$axios.post('http://116.62.153.183/geteEpidemicDataByIdAndDate', {
            "cityId": this.value1[1],
            "date": "2022-08-30"
          }, config).then(res => {
            let msg = res.data.msg
            if (msg.confirmIncrease > 0 || msg.asymptomaticIncrease > 0) {
              this.textIncrease = "2.目的地有新增确诊（无症状）病例，"
              this.count++
            } else {
              this.textIncrease = "2.目的地无新增确诊（无症状）病例，"
            }
            if (msg.nowConfirm > 0) {
              if (this.count == 0)
                this.textComfirm = "但现存确诊病例，有一定疫情风险,"
              else {
                this.textComfirm = "现存确诊病例，有一定疫情风险,"
              }
            } else {
              this.textComfirm = "无现存确诊病例，"
            }
            if (msg.riskAreaNumber == 0) {
              this.textArea = "无风险区域，"
            } else {
              this.textArea = "存在风险区域，"
              this.count++
            }
            this.out = this.textIncrease + this.textComfirm + this.textArea + this.analysis
            if (this.count == 0) {
              this.out = this.out + "<br>3.综上所述，该地区疫情风险低，可放心前往，旅途中注意疫情防控。"
            } else {
              this.out = this.out + "<br>3.综上所述，该地区疫情风险高，非必要不建议前往。"
            }
            this.$axios.post('http://116.62.153.183/getPolicy', {"cityId": this.value1[1]}, config).then(res => {
              let msg = res.data.msg
              this.in = this.textIncrease1 + this.textArea1
              this.out = this.in + this.out + "<br>4.防疫政策：" + msg.policyIn
            })

          })
        })
      })


      this.$axios.post('http://116.62.153.183/geteEpidemicDataByIdAndDate', {
        "cityId": this.value1[1],
        "date": "2022-08-30"
      }, config).then(res => {
        let msg = res.data.msg
        console.log(msg)
        this.$store.commit("setSugData", {
          'increase': msg.confirmIncrease,
          'confirm': msg.confirm,
          'cured': msg.cured,
          'dead': msg.death,
          'asymptomaticIncrease': msg.asymptomaticIncrease,
          'asymptomatic': msg.asymptomatic,
          'riskAreaNumber': msg.riskAreaNumber
        })
      })

      this.$axios.post('http://116.62.153.183/getPopulationInByCityId', {"cityId": this.value1[1]}, config).then(res => {
        let msg = res.data.msg
        let arr = []
        for (let i = 0; i < msg.length; i++) {
          arr.push({'province': msg[i].fromProvince, 'city': msg[i].fromCity, 'prop': msg[i].populationIn})
        }
        this.tableData = arr
      })


    },

    // 表格样式
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 1)  //=>这里可以改成 rowIndex%2=== 1，后面直接else即可达到隔行变色效果。
      {
        return 'warning-row';
      } else {
        return 'success-row ';
      }
    },
  }
}
</script>

<style lang="less">

.com-page2 {
  width: 100%;
  height: 120%;
  background-size: 100% 100%;
  background: #00065b url(../../public/static/img/bg1.jpg) no-repeat 0 0;
}

.block1 {
  .el-input__inner {
    color: #f5f2f2;
    border-color: #00fff6;
    background-color: rgba(1, 28, 82, 0.8);
  }

  .el-select .el-input.is-focus .el-input__inner {
    border-color: #0B61AA;
    background-color: rgba(1, 28, 82, 0.8);
    color: #00D3E9;
  }

  //下拉框选中
  .el-select-dropdown__item {
    color: #170606;
  }

  .el-select-dropdown__item:hover {
    background-color: rgba(0, 225, 219, 0.690196078431373);
  }

  //鼠标经过下拉框
  .el-cascader-node.hover,
  .el-cascader-node:hover {
    color: #00D3E9;
    background-color: #0F3360;
  }

  /deep/ .el-select-dropdown__item.hover {
    background-color: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.80) !important;
    z-index: 9999;
  }

  // 下拉框垂直滚动条宽度
  /deep/ .el-scrollbar__bar.is-vertical {
    width: 10px;
    top: 2px;
  }

  // 下拉框最大高度
  /deep/ .el-select-dropdown__wrap {
    max-height: 200px;
  }

  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    color: #00D3E9;
    background-color: #0F3360;
  }
}

.el-table .warning-row {
  background: #8d98d9;
}

.el-table .success-row {
  background: #8d98d9;
}
</style>
