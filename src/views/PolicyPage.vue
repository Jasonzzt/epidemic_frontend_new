<template>

  <div class="com-page2">

    <el-page-header @back="goBack" content=" "></el-page-header>
    <el-container>
    <el-header style="font-size: 35px;font-family:新宋体">
      <dv-decoration-7 style="width:350px;height:20px;">防疫政策查询<i class="el-icon-s-order"></i></dv-decoration-7>
      </el-header>
      <dv-decoration-5  style="width:1000px;margin-left: 300px;height:30px;" dur="4" />
<!--  <dv-decoration-2 style="width:1400px;height:5px;margin-left: 90px;position: relative;color: #b1bcff " />*/-->
    <el-main style="font-size: 22px; font-family: 宋体">请选择出发地与目的地所在城市: <br>
      <div class="block">
        <span class="demonstration">出发地（城市）</span>
        <el-cascader class="test"  popper-class="pc-sel-area-cascader" style="width: 150px;"
            :popper-append-to-body='false'
            v-model="value"
            :level="2"
            :options="options"
            @change="handleChange"></el-cascader>
        <span class="demonstration" style="margin-left: 50px;">目的地（城市）</span>
        <el-cascader popper-class="pc-sel-area-cascader" style="width: 150px"
            v-model="value1"
            :options="options"
            :level="2"
            @change="handleChange"></el-cascader>
    <el-button @click="search" type="primary"  icon="el-icon-search"  style="margin-left: 50px">   搜索</el-button>
      </div>
<!--      <el-divider></el-divider>-->

      <el-row :gutter="20">
        <el-col :span="10" style="font-size: 19px;margin-left: 90px">
          <dv-border-box-1><div class="contentin bgc-size flex" >出发地
            <vue-scroll :ops="ops" style="width:550px;height:250px">
              <div>{{this.$data.in}}</div></vue-scroll></div></dv-border-box-1>
          </el-col>

        <el-col :span="10" style="font-size: 19px;margin-left: 50px" >
          <dv-border-box-1><div class="contentout bgc-size flex">目的地
          <vue-scroll :ops="ops" style="width:550px;height:250px">
          <div>{{this.$data.out}}</div></vue-scroll></div></dv-border-box-1>
        </el-col>
      </el-row>
        <dv-decoration-2 style="width:1100px;height:5px;margin-left: 200px;position: relative" />
      <div class="advice bgc-size flex" style="margin-left: 150px;width: 1200px;font-size: 20px" >
      <dv-border-box-1>出行建议
        <vue-scroll :ops="ops" style="width:1050px;height:200px">
          <div style="font-size: 19px">（示例）【湖区8.23全员核酸检测志愿者招募】
            现进行湖区8.23全员核酸检测志愿者库招募工作，以备核酸检测工作需要。
            具体服务时间为8月23日8：00～11：30、11：20～13：30（请务必提前十分钟到指定地点集合），地点体育馆、纪忠楼，具体分班情况待定
            欢迎同学们积极参与报名，先行填写问卷、加入qq群，等待后续录用排班
            【湖区8.23全员核酸检测志愿者招募】
            现进行湖区8.23全员核酸检测志愿者库招募工作，以备核酸检测工作需要。
            具体服务时间为8月23日8：00～11：30、11：20～13：30（请务必提前十分钟到指定地点集合），地点体育馆、纪忠楼，具体分班情况待定
            欢迎同学们积极参与报名，先行填写问卷、加入qq群，等待后续录用排班</div></vue-scroll></dv-border-box-1>
  </div>

    </el-main>
<!--    </dv-border-box-11>-->
  </el-container>

  </div>
</template>

<script>
export default {
  name: "PolicyPage"
}
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  border-color: #dbe0e7;
  border-style:solid;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  //background: #4299e0;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
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

.com-page2 {
  width: 100%;
  height: 120%;
  background-size: 100% 100%;
  background: #00065b url(../../public/static/img/bg1.jpg) no-repeat 0 0;
}

.demo-split{
  height: 400px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
.el-button--primary { //需要更改的按钮类型
  background: #4a58a9 !important;
  border-color: #b1bcff !important;
}
.el-button--primary:hover {
  background: #b1bcff !important;
  border-color: #ecbd87 !important;
  color: #FFF !important;
}
.contentout {
  margin: 5px 0;
  cursor: pointer;
  background-image: url(../../public/static/img/aleftboxtmidd.png);
}
.contentin {
  margin: 5px 0;
  cursor: pointer;
  background-image: url(../../public/static/img/aleftboxtmidd.png);
}
.advice {
  margin: 5px 0;
  cursor: pointer;
  background-image: url(../../public/static/img/aleftboxtmidd.png);
}
.test{
  background-color: #0A41C8;
}
.pc-sel-area-cascader {
  // 选择面板样式
  .el-calendar__body{
    color: #0A41C8;
  }
  .el-cascader-menu{
    color: #0A41C8;
  }
  .el-cascader-panel {
    width: 360px;
    background-color: rgba(177, 188, 255, 0.57);
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
    color: #3f498d;
  }
  .el-cascader-node__label {
    // 设置文字样式
    padding: 0 7px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;

    //color-adjust: exact;
  }
  // 文字选中样式及span背景颜色
  .el-cascader-node.in-active-path,
  .el-cascader-node.is-active,
  .el-cascader-node.is-selectable.in-checked-path {
    color: #2d1818;
  }
  .el-icon-check {
    // 去掉选中小对勾
    display:grid;
  }
  .el-icon-arrow-right {
    // 选项去掉右侧小图标
    display: grid;
  }
  // 选择器面板边框及圆角设置
  border-radius: 12px !important;
  border: 3px solid #5e768d !important;
  box-shadow: 0px 10px 40px 0px rgba(66, 46, 46, 0.29) !important;
  background-color: #0A41C8;
   /deep/ .el-input__inner {
    height: 44px;
    border: none;
    margin-top: 24.5px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #2e5afb;
  }
  //对小标的设置和样式自定义
   /deep/ .el-input__suffix {
    top: 11px;
    .el-select__caret {
      font-size: 24px;
      color: #333333;
    }
  }

}
.pc-sel-area-cascader[x-placement^='bottom'] {
  // 选择器面板与输入框的距离
  margin-top: 5px !important;
}
.pc-sel-area-cascader[x-placement^='bottom'] .popper__arrow {
  // 输入框下面小三角形
  display: flex;
}
.pc-sel-area-cascader[x-placement^='bottom'] .el-input__inner{
  background-color: #0A41C8;
}
//对整个容器进行设置
.el-select /deep/ .el-input__inner {
  height: 44px;
  border: none;
  margin-top: 24.5px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #2e5afb;
}
//对小标的设置和样式自定义
.el-select /deep/ .el-input__suffix {
  top: 11px;
  .el-select__caret {
    font-size: 24px;
    color: #333333;
  }
}


</style>

<script>
import router from "@/router";

export default {
  data() {
    return {
      split1: 0.5,
      value: [],
      value1:[],
      in:'',
      out:'',
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          background: '#b1bcff',
          opacity: 0,
          size: '10px',
          specifyBorderRadius: false,
          gutterOfEnds: null,    //轨道距 x 和 y 轴两端的距离
          gutterOfSide: '0',   //距离容器的距离
          keepShow: false,   //是否即使 bar 不存在的情况下也保持显示
          border:'none' ,  //边框
          padding: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: '#b1bcff',   //颜色
        }
      },

      options: [{'value': 110000, 'label': '北京市', 'children': [{'value': 110000, 'label': '北京市'}]}, {'value': 120000, 'label': '天津市', 'children': [{'value': 120000, 'label': '天津市'}]}, {'value': 130000, 'label': '河北省', 'children': [{'value': 130100, 'label': '石家庄市'}, {'value': 130200, 'label': '唐山市'}, {'value': 130300, 'label': '秦皇岛市'}, {'value': 130400, 'label': '邯郸市'}, {'value': 130500, 'label': '邢台市'}, {'value': 130600, 'label': '保定市'}, {'value': 130700, 'label': '张家口市'}, {'value': 130800, 'label': '承德市'}, {'value': 130900, 'label': '沧州市'}, {'value': 131000, 'label': '廊坊市'}, {'value': 131100, 'label': '衡水市'}]}, {'value': 140000, 'label': '山西省', 'children': [{'value': 140100, 'label': '太原市'}, {'value': 140200, 'label': '大同市'}, {'value': 140300, 'label': '阳泉市'}, {'value': 140400, 'label': '长治市'}, {'value': 140500, 'label': '晋城市'}, {'value': 140600, 'label': '朔州市'}, {'value': 140700, 'label': '晋中市'}, {'value': 140800, 'label': '运城市'}, {'value': 140900, 'label': '忻州市'}, {'value': 141000, 'label': '临汾市'}, {'value': 141100, 'label': '吕梁市'}]}, {'value': 150000, 'label': '内蒙古自治区', 'children': [{'value': 150100, 'label': '呼和浩特市'}, {'value': 150200, 'label': '包头市'}, {'value': 150300, 'label': '乌海市'}, {'value': 150400, 'label': '赤峰市'}, {'value': 150500, 'label': '通辽市'}, {'value': 150600, 'label': '鄂尔多斯市'}, {'value': 150700, 'label': '呼伦贝尔市'}, {'value': 150800, 'label': '巴彦淖尔市'}, {'value': 150900, 'label': '乌兰察布市'}, {'value': 152200, 'label': '兴安盟'}, {'value': 152500, 'label': '锡林郭勒盟'}, {'value': 152900, 'label': '阿拉善盟'}]}, {'value': 210000, 'label': '辽宁省', 'children': [{'value': 210100, 'label': '沈阳市'}, {'value': 210200, 'label': '大连市'}, {'value': 210300, 'label': '鞍山市'}, {'value': 210400, 'label': '抚顺市'}, {'value': 210500, 'label': '本溪市'}, {'value': 210600, 'label': '丹东市'}, {'value': 210700, 'label': '锦州市'}, {'value': 210800, 'label': '营口市'}, {'value': 210900, 'label': '阜新市'}, {'value': 211000, 'label': '辽阳市'}, {'value': 211100, 'label': '盘锦市'}, {'value': 211200, 'label': '铁岭市'}, {'value': 211300, 'label': '朝阳市'}, {'value': 211400, 'label': '葫芦岛市'}]}, {'value': 220000, 'label': '吉林省', 'children': [{'value': 220100, 'label': '长春市'}, {'value': 220200, 'label': '吉林市'}, {'value': 220300, 'label': '四平市'}, {'value': 220400, 'label': '辽源市'}, {'value': 220500, 'label': '通化市'}, {'value': 220600, 'label': '白山市'}, {'value': 220700, 'label': '松原市'}, {'value': 220800, 'label': '白城市'}, {'value': 222400, 'label': '延边朝鲜族自治州'}]}, {'value': 230000, 'label': '黑龙江省', 'children': [{'value': 230100, 'label': '哈尔滨市'}, {'value': 230200, 'label': '齐齐哈尔市'}, {'value': 230300, 'label': '鸡西市'}, {'value': 230400, 'label': '鹤岗市'}, {'value': 230500, 'label': '双鸭山市'}, {'value': 230600, 'label': '大庆市'}, {'value': 230700, 'label': '伊春市'}, {'value': 230800, 'label': '佳木斯市'}, {'value': 230900, 'label': '七台河市'}, {'value': 231000, 'label': '牡丹江市'}, {'value': 231100, 'label': '黑河市'}, {'value': 231200, 'label': '绥化市'}, {'value': 232700, 'label': '大兴安岭地区'}]}, {'value': 310000, 'label': '上海市', 'children': [{'value': 310000, 'label': '上海市'}]}, {'value': 320000, 'label': '江苏省', 'children': [{'value': 320100, 'label': '南京市'}, {'value': 320200, 'label': '无锡市'}, {'value': 320300, 'label': '徐州市'}, {'value': 320400, 'label': '常州市'}, {'value': 320500, 'label': '苏州市'}, {'value': 320600, 'label': '南通市'}, {'value': 320700, 'label': '连云港市'}, {'value': 320800, 'label': '淮安市'}, {'value': 320900, 'label': '盐城市'}, {'value': 321000, 'label': '扬州市'}, {'value': 321100, 'label': '镇江市'}, {'value': 321200, 'label': '泰州市'}, {'value': 321300, 'label': '宿迁市'}]}, {'value': 330000, 'label': '浙江省', 'children': [{'value': 330100, 'label': '杭州市'}, {'value': 330200, 'label': '宁波市'}, {'value': 330300, 'label': '温州市'}, {'value': 330400, 'label': '嘉兴市'}, {'value': 330500, 'label': '湖州市'}, {'value': 330600, 'label': '绍兴市'}, {'value': 330700, 'label': '金华市'}, {'value': 330800, 'label': '衢州市'}, {'value': 330900, 'label': '舟山市'}, {'value': 331000, 'label': '台州市'}, {'value': 331100, 'label': '丽水市'}]}, {'value': 340000, 'label': '安徽省', 'children': [{'value': 340100, 'label': '合肥市'}, {'value': 340200, 'label': '芜湖市'}, {'value': 340300, 'label': '蚌埠市'}, {'value': 340400, 'label': '淮南市'}, {'value': 340500, 'label': '马鞍山市'}, {'value': 340600, 'label': '淮北市'}, {'value': 340700, 'label': '铜陵市'}, {'value': 340800, 'label': '安庆市'}, {'value': 341000, 'label': '黄山市'}, {'value': 341100, 'label': '滁州市'}, {'value': 341200, 'label': '阜阳市'}, {'value': 341300, 'label': '宿州市'}, {'value': 341500, 'label': '六安市'}, {'value': 341600, 'label': '亳州市'}, {'value': 341700, 'label': '池州市'}, {'value': 341800, 'label': '宣城市'}]}, {'value': 350000, 'label': '福建省', 'children': [{'value': 350100, 'label': '福州市'}, {'value': 350200, 'label': '厦门市'}, {'value': 350300, 'label': '莆田市'}, {'value': 350400, 'label': '三明市'}, {'value': 350500, 'label': '泉州市'}, {'value': 350600, 'label': '漳州市'}, {'value': 350700, 'label': '南平市'}, {'value': 350800, 'label': '龙岩市'}, {'value': 350900, 'label': '宁德市'}]}, {'value': 360000, 'label': '江西省', 'children': [{'value': 360100, 'label': '南昌市'}, {'value': 360200, 'label': '景德镇市'}, {'value': 360300, 'label': '萍乡市'}, {'value': 360400, 'label': '九江市'}, {'value': 360500, 'label': '新余市'}, {'value': 360600, 'label': '鹰潭市'}, {'value': 360700, 'label': '赣州市'}, {'value': 360800, 'label': '吉安市'}, {'value': 360900, 'label': '宜春市'}, {'value': 361000, 'label': '抚州市'}, {'value': 361100, 'label': '上饶市'}]}, {'value': 370000, 'label': '山东省', 'children': [{'value': 370100, 'label': '济南市'}, {'value': 370200, 'label': '青岛市'}, {'value': 370300, 'label': '淄博市'}, {'value': 370400, 'label': '枣庄市'}, {'value': 370500, 'label': '东营市'}, {'value': 370600, 'label': '烟台市'}, {'value': 370700, 'label': '潍坊市'}, {'value': 370800, 'label': '济宁市'}, {'value': 370900, 'label': '泰安市'}, {'value': 371000, 'label': '威海市'}, {'value': 371100, 'label': '日照市'}, {'value': 371300, 'label': '临沂市'}, {'value': 371400, 'label': '德州市'}, {'value': 371500, 'label': '聊城市'}, {'value': 371600, 'label': '滨州市'}, {'value': 371700, 'label': '菏泽市'}]}, {'value': 410000, 'label': '河南省', 'children': [{'value': 410100, 'label': '郑州市'}, {'value': 410200, 'label': '开封市'}, {'value': 410300, 'label': '洛阳市'}, {'value': 410400, 'label': '平顶山市'}, {'value': 410500, 'label': '安阳市'}, {'value': 410600, 'label': '鹤壁市'}, {'value': 410700, 'label': '新乡市'}, {'value': 410800, 'label': '焦作市'}, {'value': 410900, 'label': '濮阳市'}, {'value': 411000, 'label': '许昌市'}, {'value': 411100, 'label': '漯河市'}, {'value': 411200, 'label': '三门峡市'}, {'value': 411300, 'label': '南阳市'}, {'value': 411400, 'label': '商丘市'}, {'value': 411500, 'label': '信阳市'}, {'value': 411600, 'label': '周口市'}, {'value': 411700, 'label': '驻马店市'}, {'value': 419001, 'label': '济源市'}]}, {'value': 420000, 'label': '湖北省', 'children': [{'value': 420100, 'label': '武汉市'}, {'value': 420200, 'label': '黄石市'}, {'value': 420300, 'label': '十堰市'}, {'value': 420500, 'label': '宜昌市'}, {'value': 420600, 'label': '襄阳市'}, {'value': 420700, 'label': '鄂州市'}, {'value': 420800, 'label': '荆门市'}, {'value': 420900, 'label': '孝感市'}, {'value': 421000, 'label': '荆州市'}, {'value': 421100, 'label': '黄冈市'}, {'value': 421200, 'label': '咸宁市'}, {'value': 421300, 'label': '随州市'}, {'value': 422800, 'label': '恩施土家族苗族自治州'}, {'value': 429004, 'label': '仙桃市'}, {'value': 429005, 'label': '潜江市'}, {'value': 429006, 'label': '天门市'}, {'value': 429021, 'label': '神农架林区'}]}, {'value': 430000, 'label': '湖南省', 'children': [{'value': 430100, 'label': '长沙市'}, {'value': 430200, 'label': '株洲市'}, {'value': 430300, 'label': '湘潭市'}, {'value': 430400, 'label': '衡阳市'}, {'value': 430500, 'label': '邵阳市'}, {'value': 430600, 'label': '岳阳市'}, {'value': 430700, 'label': '常德市'}, {'value': 430800, 'label': '张家界市'}, {'value': 430900, 'label': '益阳市'}, {'value': 431000, 'label': '郴州市'}, {'value': 431100, 'label': '永州市'}, {'value': 431200, 'label': '怀化市'}, {'value': 431300, 'label': '娄底市'}, {'value': 433100, 'label': '湘西土家族苗族自治州'}]}, {'value': 440000, 'label': '广东省', 'children': [{'value': 440100, 'label': '广州市'}, {'value': 440200, 'label': '韶关市'}, {'value': 440300, 'label': '深圳市'}, {'value': 440400, 'label': '珠海市'}, {'value': 440500, 'label': '汕头市'}, {'value': 440600, 'label': '佛山市'}, {'value': 440700, 'label': '江门市'}, {'value': 440800, 'label': '湛江市'}, {'value': 440900, 'label': '茂名市'}, {'value': 441200, 'label': '肇庆市'}, {'value': 441300, 'label': '惠州市'}, {'value': 441400, 'label': '梅州市'}, {'value': 441500, 'label': '汕尾市'}, {'value': 441600, 'label': '河源市'}, {'value': 441700, 'label': '阳江市'}, {'value': 441800, 'label': '清远市'}, {'value': 441900, 'label': '东莞市'}, {'value': 442000, 'label': '中山市'}, {'value': 445100, 'label': '潮州市'}, {'value': 445200, 'label': '揭阳市'}, {'value': 445300, 'label': '云浮市'}]}, {'value': 450000, 'label': '广西自治区', 'children': [{'value': 450100, 'label': '南宁市'}, {'value': 450200, 'label': '柳州市'}, {'value': 450300, 'label': '桂林市'}, {'value': 450400, 'label': '梧州市'}, {'value': 450500, 'label': '北海市'}, {'value': 450600, 'label': '防城港市'}, {'value': 450700, 'label': '钦州市'}, {'value': 450800, 'label': '贵港市'}, {'value': 450900, 'label': '玉林市'}, {'value': 451000, 'label': '百色市'}, {'value': 451100, 'label': '贺州市'}, {'value': 451200, 'label': '河池市'}, {'value': 451300, 'label': '来宾市'}, {'value': 451400, 'label': '崇左市'}]}, {'value': 460000, 'label': '海南省', 'children': [{'value': 460100, 'label': '海口市'}, {'value': 460200, 'label': '三亚市'}, {'value': 460300, 'label': '三沙市'}, {'value': 460400, 'label': '儋州市'}, {'value': 469001, 'label': '五指山市'}, {'value': 469002, 'label': '琼海市'}, {'value': 469005, 'label': '文昌市'}, {'value': 469006, 'label': '万宁市'}, {'value': 469007, 'label': '东方市'}, {'value': 469021, 'label': '定安县'}, {'value': 469022, 'label': '屯昌县'}, {'value': 469023, 'label': '澄迈县'}, {'value': 469024, 'label': '临高县'}, {'value': 469025, 'label': '白沙黎族自治县'}, {'value': 469026, 'label': '昌江黎族自治县'}, {'value': 469027, 'label': '乐东黎族自治县'}, {'value': 469028, 'label': '陵水黎族自治县'}, {'value': 469029, 'label': '保亭黎族苗族自治县'}, {'value': 469030, 'label': '琼中黎族苗族自治县'}]}, {'value': 500000, 'label': '重庆市', 'children': [{'value': 500000, 'label': '重庆市'}]}, {'value': 510000, 'label': '四川省', 'children': [{'value': 510100, 'label': '成都市'}, {'value': 510300, 'label': '自贡市'}, {'value': 510400, 'label': '攀枝花市'}, {'value': 510500, 'label': '泸州市'}, {'value': 510600, 'label': '德阳市'}, {'value': 510700, 'label': '绵阳市'}, {'value': 510800, 'label': '广元市'}, {'value': 510900, 'label': '遂宁市'}, {'value': 511000, 'label': '内江市'}, {'value': 511100, 'label': '乐山市'}, {'value': 511300, 'label': '南充市'}, {'value': 511400, 'label': '眉山市'}, {'value': 511500, 'label': '宜宾市'}, {'value': 511600, 'label': '广安市'}, {'value': 511700, 'label': '达州市'}, {'value': 511800, 'label': '雅安市'}, {'value': 511900, 'label': '巴中市'}, {'value': 512000, 'label': '资阳市'}, {'value': 513200, 'label': '阿坝藏族羌族自治州'}, {'value': 513300, 'label': '甘孜藏族自治州'}, {'value': 513400, 'label': '凉山彝族自治州'}]}, {'value': 520000, 'label': '贵州省', 'children': [{'value': 520100, 'label': '贵阳市'}, {'value': 520200, 'label': '六盘水市'}, {'value': 520300, 'label': '遵义市'}, {'value': 520400, 'label': '安顺市'}, {'value': 520500, 'label': '毕节市'}, {'value': 520600, 'label': '铜仁市'}, {'value': 522300, 'label': '黔西南布依族苗族自治州'}, {'value': 522600, 'label': '黔东南苗族侗族自治州'}, {'value': 522700, 'label': '黔南布依族苗族自治州'}]}, {'value': 530000, 'label': '云南省', 'children': [{'value': 530100, 'label': '昆明市'}, {'value': 530300, 'label': '曲靖市'}, {'value': 530400, 'label': '玉溪市'}, {'value': 530500, 'label': '保山市'}, {'value': 530600, 'label': '昭通市'}, {'value': 530700, 'label': '丽江市'}, {'value': 530800, 'label': '普洱市'}, {'value': 530900, 'label': '临沧市'}, {'value': 532300, 'label': '楚雄彝族自治州'}, {'value': 532500, 'label': '红河哈尼族彝族自治州'}, {'value': 532600, 'label': '文山壮族苗族自治州'}, {'value': 532800, 'label': '西双版纳傣族自治州'}, {'value': 532900, 'label': '大理白族自治州'}, {'value': 533100, 'label': '德宏傣族景颇族自治州'}, {'value': 533300, 'label': '怒江傈僳族自治州'}, {'value': 533400, 'label': '迪庆藏族自治州'}]}, {'value': 540000, 'label': '西藏自治区', 'children': [{'value': 540100, 'label': '拉萨市'}, {'value': 540200, 'label': '日喀则市'}, {'value': 540300, 'label': '昌都市'}, {'value': 540400, 'label': '林芝市'}, {'value': 540500, 'label': '山南市'}, {'value': 540600, 'label': '那曲市'}, {'value': 542500, 'label': '阿里地区'}]}, {'value': 610000, 'label': '陕西省', 'children': [{'value': 610100, 'label': '西安市'}, {'value': 610200, 'label': '铜川市'}, {'value': 610300, 'label': '宝鸡市'}, {'value': 610400, 'label': '咸阳市'}, {'value': 610500, 'label': '渭南市'}, {'value': 610600, 'label': '延安市'}, {'value': 610700, 'label': '汉中市'}, {'value': 610800, 'label': '榆林市'}, {'value': 610900, 'label': '安康市'}, {'value': 611000, 'label': '商洛市'}]}, {'value': 620000, 'label': '甘肃省', 'children': [{'value': 620100, 'label': '兰州市'}, {'value': 620200, 'label': '嘉峪关市'}, {'value': 620300, 'label': '金昌市'}, {'value': 620400, 'label': '白银市'}, {'value': 620500, 'label': '天水市'}, {'value': 620600, 'label': '武威市'}, {'value': 620700, 'label': '张掖市'}, {'value': 620800, 'label': '平凉市'}, {'value': 620900, 'label': '酒泉市'}, {'value': 621000, 'label': '庆阳市'}, {'value': 621100, 'label': '定西市'}, {'value': 621200, 'label': '陇南市'}, {'value': 622900, 'label': '临夏回族自治州'}, {'value': 623000, 'label': '甘南藏族自治州'}]}, {'value': 630000, 'label': '青海省', 'children': [{'value': 630100, 'label': '西宁市'}, {'value': 630200, 'label': '海东市'}, {'value': 632200, 'label': '海北藏族自治州'}, {'value': 632300, 'label': '黄南藏族自治州'}, {'value': 632500, 'label': '海南藏族自治州'}, {'value': 632600, 'label': '果洛藏族自治州'}, {'value': 632700, 'label': '玉树藏族自治州'}, {'value': 632800, 'label': '海西蒙古族藏族自治州'}]}, {'value': 640000, 'label': '宁夏自治区', 'children': [{'value': 640100, 'label': '银川市'}, {'value': 640200, 'label': '石嘴山市'}, {'value': 640300, 'label': '吴忠市'}, {'value': 640400, 'label': '固原市'}, {'value': 640500, 'label': '中卫市'}]}, {'value': 650000, 'label': '新疆自治区', 'children': [{'value': 650100, 'label': '乌鲁木齐市'}, {'value': 650200, 'label': '克拉玛依市'}, {'value': 650400, 'label': '吐鲁番市'}, {'value': 650500, 'label': '哈密市'}, {'value': 652300, 'label': '昌吉回族自治州'}, {'value': 652700, 'label': '博尔塔拉蒙古自治州'}, {'value': 652800, 'label': '巴音郭楞蒙古自治州'}, {'value': 652900, 'label': '阿克苏地区'}, {'value': 653000, 'label': '克孜勒苏柯尔克孜自治州'}, {'value': 653100, 'label': '喀什地区'}, {'value': 653200, 'label': '和田地区'}, {'value': 654000, 'label': '伊犁哈萨克自治州'}, {'value': 654200, 'label': '塔城地区'}, {'value': 654300, 'label': '阿勒泰地区'}, {'value': 659001, 'label': '石河子市'}, {'value': 659002, 'label': '阿拉尔市'}, {'value': 659003, 'label': '图木舒克市'}, {'value': 659004, 'label': '五家渠市'}, {'value': 659005, 'label': '北屯市'}, {'value': 659006, 'label': '铁门关市'}, {'value': 659007, 'label': '双河市'}, {'value': 659008, 'label': '可克达拉市'}, {'value': 659009, 'label': '昆玉市'}]}, {'value': 710000, 'label': '台湾省', 'children': [{'value': 710000, 'label': '台湾省'}]}, {'value': 810000, 'label': '香港特别行政区', 'children': [{'value': 810000, 'label': '香港特别行政区'}]}, {'value': 820000, 'label': '澳门特别行政区', 'children': [{'value': 820000, 'label': '澳门特别行政区'}]}]

    };
  },
  name: "car",

  methods: {
    search(){
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$axios.post('http://116.62.153.183/getPolicy', {"cityId":this.value[1]},config).then(res => {
        let msg = res.data.msg;
        this.in=msg.policyOut
      })
      this.$axios.post('http://116.62.153.183/getPolicy', {"cityId":this.value1[1]},config).then(res => {
        let msg = res.data.msg;
        this.out=msg.policyIn
      })
    },
    handleChange(value) {
      console.log(value);
    },
    goBack() {
      router.push('/')
    },
  }
};
</script>


