<template>

  <div class="com-page1">
    <el-page-header @back="goBack" content=" "></el-page-header>

    <el-container>
<!--      头部标题-->
      <el-header style="font-size: 35px;height:40px;font-family:新宋体">
        <dv-decoration-7 style="width:350px;height:20px;">核酸检测点查询
          <i class="el-icon-coordinate"></i></dv-decoration-7>
      </el-header>
      <dv-decoration-5 style="width:1000px;margin-left: 300px;height:30px;" dur=4 />
<!--        主体内容-->
      <el-container>
        <el-main style="font-size: 22px;font-family:新宋体">请选择想要查询核酸检测点所在的城市 :
          <div class="block">
            <div class="select_btn">
              <span class="demonstration">省份 （城市）</span>
              <el-cascader popper-class="pc-sel-area-cascader" style="width: 150px;margin-left: 20px "
                           v-model="value"
                           :options="options"
                           @change="handleChange"></el-cascader>
              <el-button @click="search" type="primary" icon="el-icon-search" style="margin-left: 50px">搜索</el-button>
            </div>
            <el-row :gutter="22">
              <el-col :span="10" style="font-size: 19px;margin-left: 0px">
                <template>
                  <dv-border-box-1 style="margin-left: 30px">
                    <baidu-map class="map"
                               :center="center"
                               :zoom="zoom"
                               @click="pointSetClick"
                               :scroll-wheel-zoom="true"
                               @ready="handler"
                               :map-style="style"
                               style="padding: 20px;mwidth: 700px"
                    >

                      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
                      <bm-local-search :keyword="keyword"
                                       :zoom="20"
                                       v-bind:auto-viewport="true" :pageCapacity="1" v-show="false"></bm-local-search>
                      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                      <bm-marker v-for="(item,index) in mapObj"
                                 :key="index"
                                 :position="item"
                                 :animation="draggingList[index]?'BMAP_ANIMATION_BOUNCE':''"
                                 @click="showItem(index)">
                        <bm-label :content="item.title"
                                  :labelStyle="{color: 'red', fontSize : '20px'}"
                                  :offset="{width: -35, height: 30}"/>
                      </bm-marker>
                      <bm-info-window :position="position"
                                      :show="show">
                        <div>地点： {{ position.title }}</div>
                      </bm-info-window>
                    </baidu-map>
                  </dv-border-box-1>
                </template>
              </el-col>

              <el-col :span="12" style="font-size: 19px;margin-left: 00px">

                <template>
                  <dv-border-box-1 style="margin-left: 50px">
                    <div style="display: flex;font-family:新宋体;width: 100%;padding: 7px;padding-left: 10px">
                      <el-table
                          :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                          style=";font-size: 20px;margin-top: 10px"
                          :header-cell-style="{ backgroundColor:'#3d488c',textAlign: 'center' ,color:'#ffffff' }"
                          :cell-style="{ textAlign: 'center' ,color:'#2d1818'}"
                          :row-class-name="tableRowClassName"
                          @row-click="openDetails">
                        >
                        <!--              :row-style="{backgroundColor:'#939fbb',textAlign: 'center',color:'#041215'}"-->
                        <el-table-column
                            prop="city"
                            label="城市"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="检测点"
                            width="280">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="地址"
                            width="360">
                        </el-table-column>
                      </el-table>
                    </div>

                    <div class="tabListPage">
                      <el-pagination @size-change="handleSizeChange"
                                     @current-change="handleCurrentChange"
                                     :current-page="currentPage"
                                     :page-size="PageSize" layout="total, prev, pager, next, jumper"
                                     :total="totalCount">
                      </el-pagination>
                    </div>


                  </dv-border-box-1>
                </template>
              </el-col>
            </el-row>

          </div>


        </el-main>
      </el-container>
    </el-container>

  </div>

</template>

<script>
import router from "@/router";

export default {
  name: 'pointSetMap',

  props: {
    mapObj: Array,//结构[{ lng: '', lat: '',title:''}]
    showMap: Boolean,
  },

  watch: {
    // 监控showMap
    showMap() {
      this.center = ''
      this.initMaker()
    },
  },

  data() {
    return {
      keyword: "故宫",
      style: {
        styleJson: [],
      },
      draggingList: [],
      position: {lng: '', lat: '', title: ''},
      center: {lng: '116.404', lat: '39.915'},
      zoom: 16,
      show: true,
      geoc: {},
      map: {},
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 50,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 3, 4],
      // 默认每页显示的条数（可修改）
      PageSize: 6,
      location: {
        lng: 118.796877,
        lat: 32.060255,
      }, // 指定地点的经纬度
      tableData: [],
      value: [],
      options: [{'value': 110000, 'label': '北京市', 'children': [{'value': 110000, 'label': '北京市'}]}, {
        'value': 120000,
        'label': '天津市',
        'children': [{'value': 120000, 'label': '天津市'}]
      }, {
        'value': 130000,
        'label': '河北省',
        'children': [{'value': 130100, 'label': '石家庄市'}, {'value': 130200, 'label': '唐山市'}, {
          'value': 130300,
          'label': '秦皇岛市'
        }, {'value': 130400, 'label': '邯郸市'}, {'value': 130500, 'label': '邢台市'}, {
          'value': 130600,
          'label': '保定市'
        }, {'value': 130700, 'label': '张家口市'}, {'value': 130800, 'label': '承德市'}, {
          'value': 130900,
          'label': '沧州市'
        }, {'value': 131000, 'label': '廊坊市'}, {'value': 131100, 'label': '衡水市'}]
      }, {
        'value': 140000,
        'label': '山西省',
        'children': [{'value': 140100, 'label': '太原市'}, {'value': 140200, 'label': '大同市'}, {
          'value': 140300,
          'label': '阳泉市'
        }, {'value': 140400, 'label': '长治市'}, {'value': 140500, 'label': '晋城市'}, {
          'value': 140600,
          'label': '朔州市'
        }, {'value': 140700, 'label': '晋中市'}, {'value': 140800, 'label': '运城市'}, {
          'value': 140900,
          'label': '忻州市'
        }, {'value': 141000, 'label': '临汾市'}, {'value': 141100, 'label': '吕梁市'}]
      }, {
        'value': 150000,
        'label': '内蒙古自治区',
        'children': [{'value': 150100, 'label': '呼和浩特市'}, {'value': 150200, 'label': '包头市'}, {
          'value': 150300,
          'label': '乌海市'
        }, {'value': 150400, 'label': '赤峰市'}, {'value': 150500, 'label': '通辽市'}, {
          'value': 150600,
          'label': '鄂尔多斯市'
        }, {'value': 150700, 'label': '呼伦贝尔市'}, {'value': 150800, 'label': '巴彦淖尔市'}, {
          'value': 150900,
          'label': '乌兰察布市'
        }, {'value': 152200, 'label': '兴安盟'}, {'value': 152500, 'label': '锡林郭勒盟'}, {'value': 152900, 'label': '阿拉善盟'}]
      }, {
        'value': 210000,
        'label': '辽宁省',
        'children': [{'value': 210100, 'label': '沈阳市'}, {'value': 210200, 'label': '大连市'}, {
          'value': 210300,
          'label': '鞍山市'
        }, {'value': 210400, 'label': '抚顺市'}, {'value': 210500, 'label': '本溪市'}, {
          'value': 210600,
          'label': '丹东市'
        }, {'value': 210700, 'label': '锦州市'}, {'value': 210800, 'label': '营口市'}, {
          'value': 210900,
          'label': '阜新市'
        }, {'value': 211000, 'label': '辽阳市'}, {'value': 211100, 'label': '盘锦市'}, {
          'value': 211200,
          'label': '铁岭市'
        }, {'value': 211300, 'label': '朝阳市'}, {'value': 211400, 'label': '葫芦岛市'}]
      }, {
        'value': 220000,
        'label': '吉林省',
        'children': [{'value': 220100, 'label': '长春市'}, {'value': 220200, 'label': '吉林市'}, {
          'value': 220300,
          'label': '四平市'
        }, {'value': 220400, 'label': '辽源市'}, {'value': 220500, 'label': '通化市'}, {
          'value': 220600,
          'label': '白山市'
        }, {'value': 220700, 'label': '松原市'}, {'value': 220800, 'label': '白城市'}, {'value': 222400, 'label': '延边朝鲜族自治州'}]
      }, {
        'value': 230000,
        'label': '黑龙江省',
        'children': [{'value': 230100, 'label': '哈尔滨市'}, {'value': 230200, 'label': '齐齐哈尔市'}, {
          'value': 230300,
          'label': '鸡西市'
        }, {'value': 230400, 'label': '鹤岗市'}, {'value': 230500, 'label': '双鸭山市'}, {
          'value': 230600,
          'label': '大庆市'
        }, {'value': 230700, 'label': '伊春市'}, {'value': 230800, 'label': '佳木斯市'}, {
          'value': 230900,
          'label': '七台河市'
        }, {'value': 231000, 'label': '牡丹江市'}, {'value': 231100, 'label': '黑河市'}, {
          'value': 231200,
          'label': '绥化市'
        }, {'value': 232700, 'label': '大兴安岭地区'}]
      }, {'value': 310000, 'label': '上海市', 'children': [{'value': 310000, 'label': '上海市'}]}, {
        'value': 320000,
        'label': '江苏省',
        'children': [{'value': 320100, 'label': '南京市'}, {'value': 320200, 'label': '无锡市'}, {
          'value': 320300,
          'label': '徐州市'
        }, {'value': 320400, 'label': '常州市'}, {'value': 320500, 'label': '苏州市'}, {
          'value': 320600,
          'label': '南通市'
        }, {'value': 320700, 'label': '连云港市'}, {'value': 320800, 'label': '淮安市'}, {
          'value': 320900,
          'label': '盐城市'
        }, {'value': 321000, 'label': '扬州市'}, {'value': 321100, 'label': '镇江市'}, {
          'value': 321200,
          'label': '泰州市'
        }, {'value': 321300, 'label': '宿迁市'}]
      }, {
        'value': 330000,
        'label': '浙江省',
        'children': [{'value': 330100, 'label': '杭州市'}, {'value': 330200, 'label': '宁波市'}, {
          'value': 330300,
          'label': '温州市'
        }, {'value': 330400, 'label': '嘉兴市'}, {'value': 330500, 'label': '湖州市'}, {
          'value': 330600,
          'label': '绍兴市'
        }, {'value': 330700, 'label': '金华市'}, {'value': 330800, 'label': '衢州市'}, {
          'value': 330900,
          'label': '舟山市'
        }, {'value': 331000, 'label': '台州市'}, {'value': 331100, 'label': '丽水市'}]
      }, {
        'value': 340000,
        'label': '安徽省',
        'children': [{'value': 340100, 'label': '合肥市'}, {'value': 340200, 'label': '芜湖市'}, {
          'value': 340300,
          'label': '蚌埠市'
        }, {'value': 340400, 'label': '淮南市'}, {'value': 340500, 'label': '马鞍山市'}, {
          'value': 340600,
          'label': '淮北市'
        }, {'value': 340700, 'label': '铜陵市'}, {'value': 340800, 'label': '安庆市'}, {
          'value': 341000,
          'label': '黄山市'
        }, {'value': 341100, 'label': '滁州市'}, {'value': 341200, 'label': '阜阳市'}, {
          'value': 341300,
          'label': '宿州市'
        }, {'value': 341500, 'label': '六安市'}, {'value': 341600, 'label': '亳州市'}, {
          'value': 341700,
          'label': '池州市'
        }, {'value': 341800, 'label': '宣城市'}]
      }, {
        'value': 350000,
        'label': '福建省',
        'children': [{'value': 350100, 'label': '福州市'}, {'value': 350200, 'label': '厦门市'}, {
          'value': 350300,
          'label': '莆田市'
        }, {'value': 350400, 'label': '三明市'}, {'value': 350500, 'label': '泉州市'}, {
          'value': 350600,
          'label': '漳州市'
        }, {'value': 350700, 'label': '南平市'}, {'value': 350800, 'label': '龙岩市'}, {'value': 350900, 'label': '宁德市'}]
      }, {
        'value': 360000,
        'label': '江西省',
        'children': [{'value': 360100, 'label': '南昌市'}, {'value': 360200, 'label': '景德镇市'}, {
          'value': 360300,
          'label': '萍乡市'
        }, {'value': 360400, 'label': '九江市'}, {'value': 360500, 'label': '新余市'}, {
          'value': 360600,
          'label': '鹰潭市'
        }, {'value': 360700, 'label': '赣州市'}, {'value': 360800, 'label': '吉安市'}, {
          'value': 360900,
          'label': '宜春市'
        }, {'value': 361000, 'label': '抚州市'}, {'value': 361100, 'label': '上饶市'}]
      }, {
        'value': 370000,
        'label': '山东省',
        'children': [{'value': 370100, 'label': '济南市'}, {'value': 370200, 'label': '青岛市'}, {
          'value': 370300,
          'label': '淄博市'
        }, {'value': 370400, 'label': '枣庄市'}, {'value': 370500, 'label': '东营市'}, {
          'value': 370600,
          'label': '烟台市'
        }, {'value': 370700, 'label': '潍坊市'}, {'value': 370800, 'label': '济宁市'}, {
          'value': 370900,
          'label': '泰安市'
        }, {'value': 371000, 'label': '威海市'}, {'value': 371100, 'label': '日照市'}, {
          'value': 371300,
          'label': '临沂市'
        }, {'value': 371400, 'label': '德州市'}, {'value': 371500, 'label': '聊城市'}, {
          'value': 371600,
          'label': '滨州市'
        }, {'value': 371700, 'label': '菏泽市'}]
      }, {
        'value': 410000,
        'label': '河南省',
        'children': [{'value': 410100, 'label': '郑州市'}, {'value': 410200, 'label': '开封市'}, {
          'value': 410300,
          'label': '洛阳市'
        }, {'value': 410400, 'label': '平顶山市'}, {'value': 410500, 'label': '安阳市'}, {
          'value': 410600,
          'label': '鹤壁市'
        }, {'value': 410700, 'label': '新乡市'}, {'value': 410800, 'label': '焦作市'}, {
          'value': 410900,
          'label': '濮阳市'
        }, {'value': 411000, 'label': '许昌市'}, {'value': 411100, 'label': '漯河市'}, {
          'value': 411200,
          'label': '三门峡市'
        }, {'value': 411300, 'label': '南阳市'}, {'value': 411400, 'label': '商丘市'}, {
          'value': 411500,
          'label': '信阳市'
        }, {'value': 411600, 'label': '周口市'}, {'value': 411700, 'label': '驻马店市'}, {'value': 419001, 'label': '济源市'}]
      }, {
        'value': 420000,
        'label': '湖北省',
        'children': [{'value': 420100, 'label': '武汉市'}, {'value': 420200, 'label': '黄石市'}, {
          'value': 420300,
          'label': '十堰市'
        }, {'value': 420500, 'label': '宜昌市'}, {'value': 420600, 'label': '襄阳市'}, {
          'value': 420700,
          'label': '鄂州市'
        }, {'value': 420800, 'label': '荆门市'}, {'value': 420900, 'label': '孝感市'}, {
          'value': 421000,
          'label': '荆州市'
        }, {'value': 421100, 'label': '黄冈市'}, {'value': 421200, 'label': '咸宁市'}, {
          'value': 421300,
          'label': '随州市'
        }, {'value': 422800, 'label': '恩施土家族苗族自治州'}, {'value': 429004, 'label': '仙桃市'}, {
          'value': 429005,
          'label': '潜江市'
        }, {'value': 429006, 'label': '天门市'}, {'value': 429021, 'label': '神农架林区'}]
      }, {
        'value': 430000,
        'label': '湖南省',
        'children': [{'value': 430100, 'label': '长沙市'}, {'value': 430200, 'label': '株洲市'}, {
          'value': 430300,
          'label': '湘潭市'
        }, {'value': 430400, 'label': '衡阳市'}, {'value': 430500, 'label': '邵阳市'}, {
          'value': 430600,
          'label': '岳阳市'
        }, {'value': 430700, 'label': '常德市'}, {'value': 430800, 'label': '张家界市'}, {
          'value': 430900,
          'label': '益阳市'
        }, {'value': 431000, 'label': '郴州市'}, {'value': 431100, 'label': '永州市'}, {
          'value': 431200,
          'label': '怀化市'
        }, {'value': 431300, 'label': '娄底市'}, {'value': 433100, 'label': '湘西土家族苗族自治州'}]
      }, {
        'value': 440000,
        'label': '广东省',
        'children': [{'value': 440100, 'label': '广州市'}, {'value': 440200, 'label': '韶关市'}, {
          'value': 440300,
          'label': '深圳市'
        }, {'value': 440400, 'label': '珠海市'}, {'value': 440500, 'label': '汕头市'}, {
          'value': 440600,
          'label': '佛山市'
        }, {'value': 440700, 'label': '江门市'}, {'value': 440800, 'label': '湛江市'}, {
          'value': 440900,
          'label': '茂名市'
        }, {'value': 441200, 'label': '肇庆市'}, {'value': 441300, 'label': '惠州市'}, {
          'value': 441400,
          'label': '梅州市'
        }, {'value': 441500, 'label': '汕尾市'}, {'value': 441600, 'label': '河源市'}, {
          'value': 441700,
          'label': '阳江市'
        }, {'value': 441800, 'label': '清远市'}, {'value': 441900, 'label': '东莞市'}, {
          'value': 442000,
          'label': '中山市'
        }, {'value': 445100, 'label': '潮州市'}, {'value': 445200, 'label': '揭阳市'}, {'value': 445300, 'label': '云浮市'}]
      }, {
        'value': 450000,
        'label': '广西自治区',
        'children': [{'value': 450100, 'label': '南宁市'}, {'value': 450200, 'label': '柳州市'}, {
          'value': 450300,
          'label': '桂林市'
        }, {'value': 450400, 'label': '梧州市'}, {'value': 450500, 'label': '北海市'}, {
          'value': 450600,
          'label': '防城港市'
        }, {'value': 450700, 'label': '钦州市'}, {'value': 450800, 'label': '贵港市'}, {
          'value': 450900,
          'label': '玉林市'
        }, {'value': 451000, 'label': '百色市'}, {'value': 451100, 'label': '贺州市'}, {
          'value': 451200,
          'label': '河池市'
        }, {'value': 451300, 'label': '来宾市'}, {'value': 451400, 'label': '崇左市'}]
      }, {
        'value': 460000,
        'label': '海南省',
        'children': [{'value': 460100, 'label': '海口市'}, {'value': 460200, 'label': '三亚市'}, {
          'value': 460300,
          'label': '三沙市'
        }, {'value': 460400, 'label': '儋州市'}, {'value': 469001, 'label': '五指山市'}, {
          'value': 469002,
          'label': '琼海市'
        }, {'value': 469005, 'label': '文昌市'}, {'value': 469006, 'label': '万宁市'}, {
          'value': 469007,
          'label': '东方市'
        }, {'value': 469021, 'label': '定安县'}, {'value': 469022, 'label': '屯昌县'}, {
          'value': 469023,
          'label': '澄迈县'
        }, {'value': 469024, 'label': '临高县'}, {'value': 469025, 'label': '白沙黎族自治县'}, {
          'value': 469026,
          'label': '昌江黎族自治县'
        }, {'value': 469027, 'label': '乐东黎族自治县'}, {'value': 469028, 'label': '陵水黎族自治县'}, {
          'value': 469029,
          'label': '保亭黎族苗族自治县'
        }, {'value': 469030, 'label': '琼中黎族苗族自治县'}]
      }, {'value': 500000, 'label': '重庆市', 'children': [{'value': 500000, 'label': '重庆市'}]}, {
        'value': 510000,
        'label': '四川省',
        'children': [{'value': 510100, 'label': '成都市'}, {'value': 510300, 'label': '自贡市'}, {
          'value': 510400,
          'label': '攀枝花市'
        }, {'value': 510500, 'label': '泸州市'}, {'value': 510600, 'label': '德阳市'}, {
          'value': 510700,
          'label': '绵阳市'
        }, {'value': 510800, 'label': '广元市'}, {'value': 510900, 'label': '遂宁市'}, {
          'value': 511000,
          'label': '内江市'
        }, {'value': 511100, 'label': '乐山市'}, {'value': 511300, 'label': '南充市'}, {
          'value': 511400,
          'label': '眉山市'
        }, {'value': 511500, 'label': '宜宾市'}, {'value': 511600, 'label': '广安市'}, {
          'value': 511700,
          'label': '达州市'
        }, {'value': 511800, 'label': '雅安市'}, {'value': 511900, 'label': '巴中市'}, {
          'value': 512000,
          'label': '资阳市'
        }, {'value': 513200, 'label': '阿坝藏族羌族自治州'}, {'value': 513300, 'label': '甘孜藏族自治州'}, {
          'value': 513400,
          'label': '凉山彝族自治州'
        }]
      }, {
        'value': 520000,
        'label': '贵州省',
        'children': [{'value': 520100, 'label': '贵阳市'}, {'value': 520200, 'label': '六盘水市'}, {
          'value': 520300,
          'label': '遵义市'
        }, {'value': 520400, 'label': '安顺市'}, {'value': 520500, 'label': '毕节市'}, {
          'value': 520600,
          'label': '铜仁市'
        }, {'value': 522300, 'label': '黔西南布依族苗族自治州'}, {'value': 522600, 'label': '黔东南苗族侗族自治州'}, {
          'value': 522700,
          'label': '黔南布依族苗族自治州'
        }]
      }, {
        'value': 530000,
        'label': '云南省',
        'children': [{'value': 530100, 'label': '昆明市'}, {'value': 530300, 'label': '曲靖市'}, {
          'value': 530400,
          'label': '玉溪市'
        }, {'value': 530500, 'label': '保山市'}, {'value': 530600, 'label': '昭通市'}, {
          'value': 530700,
          'label': '丽江市'
        }, {'value': 530800, 'label': '普洱市'}, {'value': 530900, 'label': '临沧市'}, {
          'value': 532300,
          'label': '楚雄彝族自治州'
        }, {'value': 532500, 'label': '红河哈尼族彝族自治州'}, {'value': 532600, 'label': '文山壮族苗族自治州'}, {
          'value': 532800,
          'label': '西双版纳傣族自治州'
        }, {'value': 532900, 'label': '大理白族自治州'}, {'value': 533100, 'label': '德宏傣族景颇族自治州'}, {
          'value': 533300,
          'label': '怒江傈僳族自治州'
        }, {'value': 533400, 'label': '迪庆藏族自治州'}]
      }, {
        'value': 540000,
        'label': '西藏自治区',
        'children': [{'value': 540100, 'label': '拉萨市'}, {'value': 540200, 'label': '日喀则市'}, {
          'value': 540300,
          'label': '昌都市'
        }, {'value': 540400, 'label': '林芝市'}, {'value': 540500, 'label': '山南市'}, {
          'value': 540600,
          'label': '那曲市'
        }, {'value': 542500, 'label': '阿里地区'}]
      }, {
        'value': 610000,
        'label': '陕西省',
        'children': [{'value': 610100, 'label': '西安市'}, {'value': 610200, 'label': '铜川市'}, {
          'value': 610300,
          'label': '宝鸡市'
        }, {'value': 610400, 'label': '咸阳市'}, {'value': 610500, 'label': '渭南市'}, {
          'value': 610600,
          'label': '延安市'
        }, {'value': 610700, 'label': '汉中市'}, {'value': 610800, 'label': '榆林市'}, {
          'value': 610900,
          'label': '安康市'
        }, {'value': 611000, 'label': '商洛市'}]
      }, {
        'value': 620000,
        'label': '甘肃省',
        'children': [{'value': 620100, 'label': '兰州市'}, {'value': 620200, 'label': '嘉峪关市'}, {
          'value': 620300,
          'label': '金昌市'
        }, {'value': 620400, 'label': '白银市'}, {'value': 620500, 'label': '天水市'}, {
          'value': 620600,
          'label': '武威市'
        }, {'value': 620700, 'label': '张掖市'}, {'value': 620800, 'label': '平凉市'}, {
          'value': 620900,
          'label': '酒泉市'
        }, {'value': 621000, 'label': '庆阳市'}, {'value': 621100, 'label': '定西市'}, {
          'value': 621200,
          'label': '陇南市'
        }, {'value': 622900, 'label': '临夏回族自治州'}, {'value': 623000, 'label': '甘南藏族自治州'}]
      }, {
        'value': 630000,
        'label': '青海省',
        'children': [{'value': 630100, 'label': '西宁市'}, {'value': 630200, 'label': '海东市'}, {
          'value': 632200,
          'label': '海北藏族自治州'
        }, {'value': 632300, 'label': '黄南藏族自治州'}, {'value': 632500, 'label': '海南藏族自治州'}, {
          'value': 632600,
          'label': '果洛藏族自治州'
        }, {'value': 632700, 'label': '玉树藏族自治州'}, {'value': 632800, 'label': '海西蒙古族藏族自治州'}]
      }, {
        'value': 640000,
        'label': '宁夏自治区',
        'children': [{'value': 640100, 'label': '银川市'}, {'value': 640200, 'label': '石嘴山市'}, {
          'value': 640300,
          'label': '吴忠市'
        }, {'value': 640400, 'label': '固原市'}, {'value': 640500, 'label': '中卫市'}]
      }, {
        'value': 650000,
        'label': '新疆自治区',
        'children': [{'value': 650100, 'label': '乌鲁木齐市'}, {'value': 650200, 'label': '克拉玛依市'}, {
          'value': 650400,
          'label': '吐鲁番市'
        }, {'value': 650500, 'label': '哈密市'}, {'value': 652300, 'label': '昌吉回族自治州'}, {
          'value': 652700,
          'label': '博尔塔拉蒙古自治州'
        }, {'value': 652800, 'label': '巴音郭楞蒙古自治州'}, {'value': 652900, 'label': '阿克苏地区'}, {
          'value': 653000,
          'label': '克孜勒苏柯尔克孜自治州'
        }, {'value': 653100, 'label': '喀什地区'}, {'value': 653200, 'label': '和田地区'}, {
          'value': 654000,
          'label': '伊犁哈萨克自治州'
        }, {'value': 654200, 'label': '塔城地区'}, {'value': 654300, 'label': '阿勒泰地区'}, {
          'value': 659001,
          'label': '石河子市'
        }, {'value': 659002, 'label': '阿拉尔市'}, {'value': 659003, 'label': '图木舒克市'}, {
          'value': 659004,
          'label': '五家渠市'
        }, {'value': 659005, 'label': '北屯市'}, {'value': 659006, 'label': '铁门关市'}, {
          'value': 659007,
          'label': '双河市'
        }, {'value': 659008, 'label': '可克达拉市'}, {'value': 659009, 'label': '昆玉市'}]
      }, {'value': 710000, 'label': '台湾省', 'children': [{'value': 710000, 'label': '台湾省'}]}, {
        'value': 810000,
        'label': '香港特别行政区',
        'children': [{'value': 810000, 'label': '香港特别行政区'}]
      }, {'value': 820000, 'label': '澳门特别行政区', 'children': [{'value': 820000, 'label': '澳门特别行政区'}]}]
    };
  },

  mounted() {
    // 定位在北京市
    this.value = [110000, 110000]
    this.search()
  },

  methods: {
    // 获取点击的行的信息
    openDetails(row) {
      this.keyword = row.name
    },

    goBack() {
      router.push('/')
    },

    load() {
      this.count += 2
    },

    // 分页
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },

    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
    },

    // 更改表格样式
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 1)  //=>这里可以改成 rowIndex%2=== 1，后面直接else即可达到隔行变色效果。
      {
        return 'warning-row';
      } else {
        return 'success-row ';
      }
    },

    // 获取核酸检测点信息
    search() {
      this.currentPage = 1
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$axios.post('http://116.62.153.183/getDetectionPoint', {"cityId": this.value[1]}, config).then(res => {
        let msg = res.data.msg;
        this.tableData = msg
        this.totalCount = msg.length
      })
    },

    // 定位到具体位置
    showItem(item) {
      this.draggingList = []
      this.draggingList[item] = true
      this.position = this.mapObj[item]
      this.show = true
    },

    handler({BMap, map}) {
      var geoc = new BMap.Geocoder()
      this.geoc = geoc
      map = new BMap.Map('dituContent')
      this.map = map
    },

    //初始化，每次定位到第一个点的位置
    initMaker() {
      if (this.mapObj.length) {
        this.draggingList[0] = true
        this.center = this.mapObj[0]
      }
      this.zoom = 16
    },
    pointSetClick(e) {
      this.geoc.getLocation(e.point, function (rs) {
        var addComp = rs.addressComponents
        console.log(rs)
        console.log(
            addComp.province +
            '-' +
            addComp.city +
            '-' +
            addComp.district +
            '-' +
            addComp.street +
            '-' +
            addComp.streetNumber
        )
      })
    },
  },
};

</script>

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

.com-page1 {
  width: 100%;
  height: 140%;
  background-size: 100% 100%;
  background: #b1bcff url(../../public/static/img/bg1.jpg) no-repeat 0 0;
}

.el-header {
  color: oldlace;
  text-align: center;
  line-height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.el-main {

  text-align: center;
  line-height: 40px;
}

.el-table .warning-row {
  background: #8d98d9; //这里可以修改颜色
}

.el-table .success-row {
  background: #8d98d9; //这里可以修改颜色
}

.map {
  width: 600px;
  height: 500px;
}

// 移除左下角百度地图版权
div.BMap_cpyCtrl.BMap_noprint.anchorBL {
  display: none;
}

// 移除左下角百度地图logo
div.anchorBL {
  display: none;
}

// 悬浮地图时不展示小手
.BMap_mask {
  cursor: default;
}

.pc-sel-area-cascader {
  // 选择面板样式
  .el-calendar__body {
    color: #ffffff;
  }

  .el-cascader-menu {
    color: #ffffff;
  }

  .el-cascader-panel {
    width: 360px;
    background-color: rgb(6, 20, 83);
  }

  .el-cascader-menu__wrap {
    // 设置选择器省市区分块面板高度
    height: 305px;
  }

  .el-cascader-menu {
    // 省市区分块右边框
    border: none;
  }

  .el-scrollbar__thumb {
    // 上下滚动条
    display: none;
  }

  .el-cascader-node {
    height: 40px;
  }

  .el-cascader-node:hover {
    // 设置鼠标滑过时文字颜色
    color: #170606;
  }

  // 文字选中样式及span背景颜色
  .el-cascader-node.in-active-path,
  .el-cascader-node.is-active,
  .el-cascader-node.is-selectable.in-checked-path {
    font-style: unset;
    color: #4cc7d8;
  }

  .el-cascader-node__label {
    // 设置文字样式
    padding: 0 7px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    //color:white;
  }


  .el-icon-check {
    // 去掉选中小对勾
    display: grid;
  }

  .el-icon-arrow-right {
    // 选项去掉右侧小图标
    display: grid;
  }

  // 选择器面板边框及圆角设置
  border-radius: 12px !important;
  border: 3px solid #5e768d !important;
  box-shadow: 0px 10px 40px 0px rgba(66, 46, 46, 0.29) !important;


}

.pc-sel-area-cascader[x-placement^='bottom'] {
  // 选择器面板与输入框的距离
  margin-top: 5px !important;
}

.pc-sel-area-cascader[x-placement^='bottom'] .popper__arrow {
  // 输入框下面小三角形
  display: flex;
}

.select_btn {
  // position: absolute;
  top: 5px;
  right: 60px;
  //下拉框
  .el-select-dropdown {
    border: none;
    background-color: rgba(1, 28, 82, 0.8);
  }

  //输入框
  .el-input__inner {
    color: #eee;
    border-color: #00fff6;
    background-color: rgba(1, 28, 82, 0.8);
  }

  //聚焦时的样式
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #0B61AA;
    background-color: rgba(1, 28, 82, 0.8);
    color: #00D3E9;
  }

  //下拉框选中
  .el-select-dropdown__item {
    color: #eee;
  }

  //鼠标经过下拉框
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    color: #00D3E9;
    background-color: #0F3360;
  }
}
</style>


