<!--
 * @Author: your name
 * @Date: 2020-11-04 08:59:20
 * @LastEditTime: 2020-12-15 16:40:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \BRSS-web-project\pages\Board\index.vue
-->
<template>
  <div class="board-main">
    <full-screen v-show="false"/>
    <div class="board-header">
      <div class="header-time">
        <span>{{ nowTime.time }}</span>
        <span style="margin: 0 10px">{{ nowTime.day }}</span>
        <span>{{ nowTime.date }}</span>
      </div>
      <div class="board-title">
        <div class="board-titleLeft">
          <div class="left-xie"/>
        </div>
        <div class="board-titleMiddle">
          <div class="logo-title">
            <img
              :src="logoImg"
              style="width: 50px;height: 50px"
              alt="logo">
            <p>广青压延轧辊车间</p>
            <img
              :src="logoImg1"
              style="width: 50px;height: 50px"
              alt="logo">
          </div>
        </div>
        <div class="board-titleRight">
          <div class="right-xie"/>
        </div>
      </div>
    </div>
    <div class="styleLine"/>
    <!-- 内容模块 -->
    <div class="board-box">
      <!-- 下一层模块 -->
      <div class="board-info">
        <el-row>
          <el-col :span="14">
            <div class="best-classTitle">
              班组绩效
            </div>
            <div style="height: 400px; border: 3px solid #105b8d;margin-top: 10px;padding: 0px">
              <div style="width: 100%;height: 240px;border: 1px solid ;padding-top: 10px">
                <div
                  id="app3"
                  style="height: 220px;width: 20%;float: left;background: #1a367a"/>
                <div
                  id="app4"
                  style="height: 220px;width: 20%;float: left;background: #252541"/>
                <div
                  id="app5"
                  style="height: 220px;width: 20%;float: left;background: #1a367a"/>
                <div
                  id="app6"
                  style="height: 220px;width: 20%;float: left;background: #252541"/>
                <div
                  id="app7"
                  style="height: 220px;width: 20%;float: left;background: #1a367a"/>
              </div>
              <div style="width: 100%;height: 140px;border: 1px solid ;padding-top: 10px">
                <div
                  id="app3_1"
                  style="height: 140px;width: 20%;float: left;background: #1a367a"/>
                <div
                  id="app4_1"
                  style="height: 140px;width: 20%;float: left;background: #252541"/>
                <div
                  id="app5_1"
                  style="height: 140px;width: 20%;float: left;background: #1a367a"/>
                <div
                  id="app6_1"
                  style="height: 140px;width: 20%;float: left;background: #252541"/>
                <div
                  id="app7_1"
                  style="height: 140px;width: 20%;float: left;background: #1a367a"/>
              </div>
              <!-- <div
                class="body_box">
                &lt;!&ndash; <div style="color: white;margin-left: 20px;padding-bottom: 5px">  班次：{{ group1 }}   班组：{{ group2 }}   </div>&ndash;&gt;
                <div
                  class="table_box"
                  style="height: 140px;overflow:hidden">
                  <table >
                    <tbody >
                      <tr class="t1">
                        <th>序号</th>
                        <th>班</th>
                        <th>总数</th>
                        <th>磨削时长合计</th>
                        <th>辊径减少</th>
                        <th>砂径减少</th>
                        <th>平均磨削时长</th>
                      </tr>
                      <tr
                        v-for="(item,index ) in tableData_4"
                        :key="index">
                        <td>{{ index+1 }}</td>
                        <td>{{ item.sclass }}</td>
                        <td>{{ item.totalnum }}</td>
                        <td>{{ item.grinding_timetotalnum }}</td>
                        <td>{{ item.rolldiameter_reduce }}</td>
                        <td>{{ item.sanddiameter_reduce }}</td>
                        <td>{{ item.grinding_timeavgnum }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>-->
            </div>
          </el-col>
          <!--  原来为损耗毫米数
          <el-col :span="10">
            <div class="best-classTitle">
              查看
            </div>
            <div style="height: 400px; border: 3px solid #105b8d;margin-top: 10px;padding: 10px">
              <div
                id="app2"
                style="height: 380px;width: 100%;float: left;background: #1a367a"/>
            </div>
          </el-col>-->
          <el-col :span="10">
            <div class="best-classTitle">
              吨钢消耗/成本
            </div>
            <div style="height: 400px; border: 3px solid #105b8d;margin-top: 10px;padding: 10px">
              <el-col :span="24">
                <div
                  id="app2_1"
                  style="width:100%;height: 380px;"/>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="best-classTitle">
              上月消耗毫米数
            </div>
            <div style="height: 400px; border: 3px solid #105b8d;margin-top: 10px;padding: 10px">
              <el-col :span="24">
                <div
                  id="app2"
                  style="width:100%;height: 380px;"/>
              </el-col>
              <!-- <el-col :span="11">
                <div
                  class="body_box">
                  &lt;!&ndash; <div style="color: white;margin-left: 20px;padding-bottom: 5px">  班次：{{ group1 }}   班组：{{ group2 }}   </div>&ndash;&gt;
                  <div
                    class="table_box"
                    style="height: 380px;overflow:hidden">
                    <table >
                      <tbody >
                        <tr class="t1">
                          <th>序号</th>
                          <th>轧辊类型</th>
                          <th>轧辊材质</th>
                          <th>机架范围</th>
                          <th>当前直径</th>
                          <th>结存</th>
                        </tr>
                        <tr
                          v-for="(item,index ) in tableData_3"
                          :key="index">
                          <td>{{ index+1 }}</td>
                          <td>{{ item.roll_type }}</td>
                          <td>{{ item.material }}</td>
                          <td>{{ item.framerange }}</td>
                          <td>{{ item.currentdiameter }}</td>
                          <td>{{ item.body_diameter }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </el-col>-->
            </div>
          </el-col>
          <el-col :span="8">
            <div class="best-classTitle">
              目前结存
            </div>
            <div style="height: 400px; border: 3px solid #105b8d;margin-top: 10px;padding: 10px">
              <div
                id="app1_1"
                style="height: 380px;width: 100%;float: left"/>
            </div>
          </el-col>
          <!-- <el-col :span="8">
            <div class="best-classTitle">
              吨钢
            </div>
            <div style="height: 400px; border: 3px solid #105b8d;margin-top: 10px;padding: 10px">
              <el-col :span="24">
                <div
                  id="app2_1"
                  style="width:100%;height: 380px;"/>
              </el-col>
            </div>
          </el-col>-->
          <el-col :span="8">
            <div class="best-classTitle">
              KPI
            </div>
            <div style="height: 400px; border: 3px solid #105b8d;margin-top: 10px;padding: 10px">
              <el-col :span="24">
                <div
                  id="app2_2"
                  style="width:100%;height: 380px;"/>
                <div style="color: #999B9C;position: absolute;right: 407px;top: 240px;float: right">
                  实际/期望:{{ show_1 }}
                </div>
                <div style="color: #999B9C;position: absolute;right: 209px;top: 240px;float: right">
                  实际/期望:{{ show_2 }}
                </div>
                <div style="color: #999B9C;position: absolute;right: 542px;top: 404px;float: right">
                  c:{{ show_3 }}
                </div>
                <div style="color: #999B9C;position: absolute;right: 442px;top: 404px;float: right">
                  d:{{ show_4 }}
                </div>
                <div style="color: #999B9C;position: absolute;right: 314px;top: 404px;float: right">
                  e:{{ show_5 }}
                </div>
                <div style="color: #999B9C;position: absolute;right: 209px;top: 404px;float: right">
                  f:{{ show_6 }}
                </div>
                <div style="color: #999B9C;position: absolute;right: 88px;top: 404px;float: right">
                  g:{{ show_7 }}
                </div>
              </el-col>
            </div>
          </el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
import fullScreen from '@/components/Fullscreen'
import Echarts from 'echarts'
import 'echarts-liquidfill'
//import 'echarts-liquidfill/src/liquidFill.js' //在这里引入
import { vRollStock } from '@/api/pinClipBoard' //查询接口
import TableEasy from '@/components/TasilyTableEasy'
import moment from 'moment'
import { get, post, pythonPOST1 } from '@/lib/Util'
export default {
  layout: 'staticPage',
  components: {
    fullScreen,
    TableEasy
  },
  head() {
    return {
      title: '广青压延轧辊车间',
      meta: [
        {
          name: 'keywords',
          content: '磨辊间'
        }
      ]
    }
  },
  data() {
    return {
      baseImg: require('@/assets/img/base.png'),
      slide1: require('@/assets/img/slide1.png'),
      slide2: require('@/assets/img/slide2.png'),
      roll: require('@/assets/img/roll.png'),
      part: require('@/assets/img/part.png'),
      tableData: [
        { roll_no: 'F1-F4工作辊' },
        { roll_no: 'F1-F4支撑辊' },
        { roll_no: 'F5-F7工作辊' },
        { roll_no: 'F5-F7支撑辊' },
        { roll_no: 'R1工作辊' },
        { roll_no: 'R1支撑辊' },
        { roll_no: 'R2工作辊' },
        { roll_no: 'R2支撑辊' },
        { roll_no: '平整工作辊' },
        { roll_no: '平整支撑辊' },
        { roll_no: '大立辊' },
        { roll_no: '小立辊' },
        { roll_no: 'R锤头' },
        { roll_no: '花纹辊' }
      ],
      /*  logoImg: require('../../assets/boardImage/logo.png'),*/
      logoImg: require('../../assets/img/GQMTv2.1.png'),
      logoImg1: require('../../assets/img/nercar_v1.png'),
      nowTime: {
        time: '00:00:00',
        day: '1997年01月01日',
        date: '星期一'
      },
      mochuang3: {},
      mochuang4: {},
      mochuang5: {},
      mochuang6: {},
      mochuangDate: '1997年1月',
      mobed1: {
        left: 111,
        roll_no: null,
        mwidth1: 0, // 第二个滑块
        speed1: 4
      },
      mobed2: {
        left: 111,
        roll_no: null,
        speed: 4, // sudu
        mwidth: 0,
        flag: true
      },
      mobed3: {
        left: 111,
        roll_no: null,
        speed: 1, // sudu
        mwidth: 0,
        flag: true
      },
      mobed4: {
        left: 111,
        roll_no: null,
        speed: 3, // sudu
        mwidth: 0,
        flag: true
      },
      mobed5: {
        left: 111,
        roll_no: null,
        speed: 5, // sudu
        mwidth: 0,
        flag: true
      },
      mobed6: {
        left: 111,
        roll_no: null,
        speed: 6, // sudu
        mwidth: 0,
        flag: true
      },
      speed: 2, // sudu
      mwidth: 0,
      flag: true,
      tableData_1: [],
      tableData_2: [{}],
      tableData_3: [],
      tableData_4: [],
      tableData_5: [],
      mon_need: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
      ],
      find_two_1: [
        {
          label: '1月',
          consumption: 0,
          cost: 0
        },
        {
          label: '2月',
          consumption: 0,
          cost: 0
        },
        {
          label: '3月',
          consumption: 0,
          cost: 0
        },
        {
          label: '4月',
          consumption: 0,
          cost: 0
        },
        {
          label: '5月',
          consumption: 0,
          cost: 0
        },
        {
          label: '6月',
          consumption: 0,
          cost: 0
        },
        {
          label: '7月',
          consumption: 0,
          cost: 0
        },
        {
          label: '8月',
          consumption: 0,
          cost: 0
        },
        {
          label: '9月',
          consumption: 0,
          cost: 0
        },
        {
          label: '10月',
          consumption: 0,
          cost: 0
        },
        {
          label: '11月',
          consumption: 0,
          cost: 0
        },
        {
          label: '12月',
          consumption: 0,
          cost: 0
        }
      ],
      show_1: '',
      show_2: '',
      show_3: '',
      show_4: '',
      show_5: '',
      show_6: '',
      show_7: ''
    }
  },
  created() {
    //this.findRollStock()
    this.getNowTime()
    this.play()
  },
  mounted() {
    const timer = setInterval(() => {
      this.getNowTime()
      // this.setmoleft()
    }, 2000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
    this.vagetable()
    this.guang_find_2()
  },
  methods: {
    //吨钢消耗/成本
    echart_go_er(datas) {
      var need_x1 = []
      var need_y2 = [] //吨钢
      var need_y3 = [] //毫米轧制量
      for (var i = 0; datas.length > i; i++) {
        need_x1.push(datas[i].label)
        need_y2.push(datas[i].consumption.toFixed(1))
        need_y3.push(datas[i].cost.toFixed(1))
      }
      //吨钢消耗/成本
      var option_1 = {
        //backgroundColor: '#031245',
        textStyle: {
          color: '#c0c3cd',
          fontSize: 14
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {
              backgroundColor: '#031245'
            },
            restore: {}
          },
          iconStyle: {
            borderColor: '#c0c3cd'
          }
        },
        legend: {
          top: 10,
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          left: 'center',
          padding: 0,
          color: ['#208d3a', 'red'],
          data: ['吨钢消耗', '毫米轧制量'],
          textStyle: {
            color: ['#105b8d', '#208d3a'],
            fontSize: 14,
            padding: [2, 0, 0, 0]
          }
        },
        color: [
          '#63caff',
          '#49beff',
          '#03387a',
          '#03387a',
          '#03387a',
          '#6c93ee',
          '#a9abff',
          '#f7a23f',
          '#27bae7',
          '#ff6d9d',
          '#cb79ff',
          '#f95b5a',
          '#ccaf27',
          '#38b99c',
          '#93d0ff',
          '#bd74e0',
          '#fd77da',
          '#dea700'
        ],
        grid: {
          containLabel: true,
          left: 20,
          right: 20,
          bottom: 10,
          top: 40
        },
        xAxis: {
          nameTextStyle: {
            color: '#c0c3cd',
            padding: [0, 0, -10, 0],
            fontSize: 14
          },
          axisLabel: {
            rotate: 0,
            interval: 0, //横轴信息全部显示,
            color: '#c0c3cd',
            fontSize: 14,
            interval: 0
          },
          axisTick: {
            lineStyle: {
              color: '#384267',
              width: 1
            },
            show: true
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#384267',
              width: 1,
              type: 'dashed'
            },
            show: true
          },
          /*data: [
            '0点~2点',
            '3点~5点',
            '6点~8点',
            '0点~2点',
            '3点~5点',
            '6点~8点',
            '0点~2点',
            '3点~5点'
          ],*/
          data: need_x1,
          type: 'category'
        },
        yAxis: [
          {
            name: '吨钢消耗(kg)',
            nameTextStyle: {
              color: '#c0c3cd',
              padding: [0, 0, -10, 0],
              fontSize: 14
            },
            axisLabel: {
              color: '#63caff',
              fontSize: 14
            },
            axisTick: {
              lineStyle: {
                color: '#384267',
                width: 1
              },
              show: true
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#384267',
                type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#384267',
                width: 1,
                type: 'dashed'
              },
              show: true
            }
          },
          {
            type: 'value',
            name: '吨钢成本(元)',
            color: '#d3ca1b',
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 14,
              color: '#d3ca1b'
            }
          }
        ],
        series: [
          {
            //data: [200, 85, 112, 275, 305, 415, 741, 405],
            name: '吨钢消耗',
            data: need_y2,
            yAxisIndex: 0,
            type: 'bar',
            barMaxWidth: 'auto',
            barWidth: 30,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0b9eff'
                  },
                  {
                    offset: 1,
                    color: '#63caff'
                  }
                ]
              }
            },
            label: {
              show: true,
              position: 'top',
              distance: 0,
              color: '#63caff'
            }
          },
          {
            name: '吨钢消耗',
            yAxisIndex: 0,
            data: [1, 1, 1, 1, 1, 1, 1, 1],
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [30, 15]
          },
          {
            name: '吨钢消耗',
            yAxisIndex: 0,
            // data: [200, 85, 112, 275, 305, 415, 741, 405],
            data: need_y2,
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [30, 12],
            zlevel: 2
          },
          {
            name: '吨钢消耗',
            yAxisIndex: 0,
            data: [1, 1, 1, 1, 1, 1, 1, 1],
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [30, 15],
            zlevel: -2
          },
          {
            name: '毫米轧制量',
            type: 'line',
            yAxisIndex: 1,
            data: need_y3,
            label: {
              show: true,
              position: 'top',
              distance: 20,
              color: '#d3ca1b'
            },
            /* itemStyle: { normal: { label: { show: true } } }*/
            itemStyle: {
              normal: {
                color: '#d3ca1b', //折线点的颜色
                lineStyle: {
                  color: '#d3ca1b' //折线的颜色
                }
              }
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          show: false
        }
      }
      var myChart2_1 = Echarts.init(
        document.getElementById('app2_1'),
        'default'
      ) //将配置注入到html中定义的容器
      myChart2_1.setOption(option_1)
    },
    //毫米数
    echart_go_1(datas) {
      console.log(datas, typeof datas)
      var need_x1 = []
      var need_y1 = [] //毫米数
      var need_y2 = [] //吨钢
      var need_y3 = [] //毫米轧制量
      for (var i = 0; datas.length > i; i++) {
        need_x1.push(datas[i].x)
        need_y1.push(datas[i].y1.toFixed(1))
        need_y2.push(datas[i].y2.toFixed(1))
        need_y3.push(datas[i].y3.toFixed(1))
      }
      console.log(need_x1, need_y1)
      //毫米数
      var myChart2 = Echarts.init(document.getElementById('app2'), 'default') //将配置注入到html中定义的容器
      var option = {
        //backgroundColor: '#031245',
        textStyle: {
          color: '#c0c3cd',
          fontSize: 14
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {
              backgroundColor: '#031245'
            },
            restore: {}
          },
          iconStyle: {
            borderColor: '#c0c3cd'
          }
        },
        legend: {
          top: 10,
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          left: 'center',
          padding: 0,
          textStyle: {
            color: '#c0c3cd',
            fontSize: 14,
            padding: [2, 0, 0, 0]
          }
        },
        color: [
          '#63caff',
          '#49beff',
          '#03387a',
          '#03387a',
          '#03387a',
          '#6c93ee',
          '#a9abff',
          '#f7a23f',
          '#27bae7',
          '#ff6d9d',
          '#cb79ff',
          '#f95b5a',
          '#ccaf27',
          '#38b99c',
          '#93d0ff',
          '#bd74e0',
          '#fd77da',
          '#dea700'
        ],
        grid: {
          containLabel: true,
          left: 20,
          right: 20,
          bottom: 10,
          top: 40
        },
        xAxis: {
          nameTextStyle: {
            color: '#c0c3cd',
            padding: [0, 0, -10, 0],
            fontSize: 14
          },
          axisLabel: {
            rotate: 0,
            interval: 0, //横轴信息全部显示,
            color: '#c0c3cd',
            fontSize: 14,
            interval: 0
          },
          axisTick: {
            lineStyle: {
              color: '#384267',
              width: 1
            },
            show: true
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#384267',
              width: 1,
              type: 'dashed'
            },
            show: true
          },
          /*data: [
            '0点~2点',
            '3点~5点',
            '6点~8点',
            '0点~2点',
            '3点~5点',
            '6点~8点',
            '0点~2点',
            '3点~5点'
          ],*/
          data: need_x1,
          type: 'category'
        },
        yAxis: {
          nameTextStyle: {
            color: '#c0c3cd',
            padding: [0, 0, -10, 0],
            fontSize: 14
          },
          axisLabel: {
            color: '#c0c3cd',
            fontSize: 14
          },
          axisTick: {
            lineStyle: {
              color: '#384267',
              width: 1
            },
            show: true
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#384267',
              type: 'dashed'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#384267',
              width: 1,
              type: 'dashed'
            },
            show: true
          },
          name: ''
        },
        series: [
          {
            //data: [200, 85, 112, 275, 305, 415, 741, 405],
            data: need_y1,
            type: 'bar',
            barMaxWidth: 'auto',
            barWidth: 30,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0b9eff'
                  },
                  {
                    offset: 1,
                    color: '#63caff'
                  }
                ]
              }
            },
            label: {
              show: true,
              position: 'top',
              distance: 10,
              color: '#fff'
            }
          },
          {
            data: [1, 1, 1, 1, 1, 1, 1, 1],
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [30, 15]
          },
          {
            // data: [200, 85, 112, 275, 305, 415, 741, 405],
            data: need_y1,
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [30, 12],
            zlevel: 2
          },
          /* {
            // data: [741, 741, 741, 741, 741, 741, 741, 741],
            data: [300, 300, 300, 300, 300, 300, 300, 300],
            type: 'bar',
            barMaxWidth: 'auto',
            barWidth: 30,
            barGap: '-100%',
            zlevel: -1
          },*/
          {
            data: [1, 1, 1, 1, 1, 1, 1, 1],
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [30, 15],
            zlevel: -2
          }
          /* {
            //data: [741, 741, 741, 741, 741, 741, 741, 741],
            data: [300, 300, 300, 300, 300, 300, 300, 300],
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [30, 12],
            zlevel: -1
          }*/
        ],
        tooltip: {
          trigger: 'axis',
          show: false
        }
      }
      myChart2.setOption(option)
    },
    //结存
    echart_go_b(datas) {
      //结存
      console.log(datas, typeof datas)
      var need_x1 = []
      var need_y1 = []
      var need_y2 = []
      for (var i = 0; datas.length > i; i++) {
        need_x1.push(datas[i].x)
        need_y1.push(datas[i].y1.toFixed(1))
        need_y2.push(datas[i].y2.toFixed(1))
      }
      var myChart1 = Echarts.init(document.getElementById('app1_1'), 'default') //将配置注入到html中定义的容器
      var xData = need_x1
      var line = need_y2
      var option_1 = {
        grid: {
          left: '10%',
          top: '15%',
          right: '5%',
          bottom: '10%'
        },
        legend: {
          x: '100px',
          align: 'left', //水平方向位置
          verticalAlign: 'top', //垂直方向位置
          show: true,
          icon: 'circle',
          orient: 'horizontal',
          top: '1.5%',
          right: 'center',
          itemWidth: 16.5,
          itemHeight: 6,
          // itemGap: 30,
          textStyle: {
            // color: '#FFFFFF'
            color: '#d3ca1b',
            fontSize: 14
          }
        },
        xAxis: [
          {
            data: xData,
            /*  axisLabel: {
              textStyle: {
                color: '#aaaaaa',
                fontSize: 14
              },
              margin: 30 //刻度标签与轴线之间的距离。
            },*/
            axisLabel: {
              rotate: 0,
              interval: 0, //横轴信息全部显示,
              color: '#c0c3cd',
              fontSize: 14,
              interval: 0,
              margin: 15 //刻度标签与轴线之间的距离。
            },

            axisLine: {
              show: false //不显示x轴
            },
            axisTick: {
              show: false //不显示刻度
            },
            boundaryGap: true,
            splitLine: {
              show: false,
              width: 0.08,
              lineStyle: {
                type: 'solid',
                color: '#03202E'
              }
            }
          }
        ],
        yAxis: [
          {
            splitLine: {
              show: false,
              lineStyle: {
                color: '#eee',
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#888'
              }
            }
          }
        ],
        series: [
          {
            //柱底圆片
            name: '',
            yAxisIndex: 0,
            itemStyle: {
              //上方显示数值
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: '#d3ca1b',
                    fontSize: 16
                  }
                }
              }
            },
            type: 'pictorialBar',
            symbolSize: [30, 20], //调整截面形状
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: '#d3ca1b',
                    fontSize: 16
                  }
                },
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(89,211,255,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(23,237,194,1)'
                  }
                ])
              }
            },
            data: line
          },
          //柱体
          {
            name: '',
            type: 'bar',
            yAxisIndex: 0,
            barWidth: 30,
            barGap: '0%',
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: 'linear',
                  global: false,
                  colorStops: [
                    {
                      //第一节下面
                      offset: 0,
                      color: 'rgba(0,255,245,0.5)'
                    },
                    {
                      offset: 1,
                      color: '#43bafe'
                    }
                  ]
                }
              }
            },

            data: line
          },
          //柱顶圆片
          {
            name: '',
            type: 'pictorialBar',
            yAxisIndex: 0,
            symbolSize: [30, 20], //调整截面形状
            symbolOffset: [0, -10],
            z: 12,
            symbolPosition: 'end',
            itemStyle: {
              normal: {
                color: new Echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(89,211,255,1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(23,237,194,1)'
                    }
                  ],
                  false
                )
              }
            },
            data: line
          }
        ]
      }

      myChart1.setOption(option_1)
    },
    //班组绩效
    echart_go_a(datas) {
      var need_x1 = []
      var need_y1 = [] //总数
      var need_y2 = [] //磨削时长
      var need_y3 = [] //辊颈减少
      var need_y4 = [] // 砂轮减少
      var need_y5 = [] //平均磨削时长
      for (var i = 0; datas.length > i; i++) {
        need_x1.push(datas[i].x)
        need_y1.push(datas[i].y1)
        need_y2.push(datas[i].y2)
        need_y3.push(datas[i].y3)
        need_y4.push(datas[i].y4)
        need_y5.push(datas[i].y5)
      }
      var y_name = ['次数', 'min', 'mm', 'mm', 'min']
      var need_s = [need_y1, need_y2, need_y3, need_y4, need_y5]
      var app = ['app3', 'app4', 'app5', 'app6', 'app7']
      var title_1 = ['总数', '磨削时长', '辊径减少', '砂轮减少', '平均磨削时长']
      var app1 = ['app3_1', 'app4_1', 'app5_1', 'app6_1', 'app7_1']
      for (var i = 0; 5 > i; i++) {
        var myChart1 = Echarts.init(document.getElementById(app[i]), 'default') //将配置注入到html中定义的容器
        var option2 = {
          //backgroundColor: '#38445E',
          title: {
            left: '48%',
            text: title_1[i],
            textStyle: {
              color: '#d3ca1b', //字体颜色
              fontSize: 12
            }
          },
          grid: {
            left: '28%',
            top: '10%',
            bottom: '22%',
            right: '8%'
          },
          xAxis: {
            data: need_x1,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#8d4038',
                width: 1 //这里是为了突出显示加上的
              }
            },
            axisLabel: {
              // rotate: 90,
              interval: 0, //横轴信息全部显示,
              textStyle: {
                color: '#999',
                fontSize: 12
              }
            }
          },
          yAxis: [
            {
              name: y_name[i],
              //坐标标签位置
              nameTextStyle: {
                padding: [0, 0, -20, 20]
              },
              splitNumber: 2,
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#8d4038',
                  width: 1 //这里是为了突出显示加上的
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#999'
                }
              },
              splitArea: {
                areaStyle: {
                  color: 'rgba(255,255,255,.5)'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(255, 129, 109, 0.1)',
                  width: 0.5,
                  type: 'dashed'
                }
              }
            }
          ],
          series: [
            {
              name: 'hill',
              type: 'pictorialBar',
              barCategoryGap: '0%',
              symbol:
                'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
              label: {
                show: true,
                position: 'center',
                distance: 15,
                color: '#DB5E6A',
                fontWeight: 'bolder',
                fontSize: 10
              },
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(232, 94, 106, .8)' //  0%  处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(232, 94, 106, .1)' //  100%  处的颜色
                      }
                    ],
                    global: false //  缺省为  false
                  }
                },
                emphasis: {
                  opacity: 1
                }
              },
              //data: [123, 60, 25, 18, 12, 9, 2, 1],
              data: need_s[i],
              z: 10
            }
          ]
        }
        myChart1.setOption(option2)
      }

      for (var n = 0; 5 > n; n++) {
        var myChart = Echarts.init(document.getElementById(app1[n]), 'default') //将配置注入到html中定义的容器
        //
        console.log(need_s[n][0])
        var scaleData = [
          {
            name: need_x1[0],
            value: need_s[n][0]
          },
          {
            name: need_x1[1],
            value: need_s[n][1]
          },
          {
            name: need_x1[2],
            value: need_s[n][2]
          }
        ]
        var rich = {
          white: {
            color: '#fff',
            align: 'center',
            fontWeight: 'bold',
            fontSize: 8,
            padding: [3, 0]
          }
        }
        var placeHolderStyle = {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0
          }
        }
        var data = []
        var color1 = [
          'rgb(255, 153, 153)',
          'rgb(255, 176, 63)',
          'rgb(43, 166, 254)',
          'rgb(61, 186, 45)', // 'rgb(61, 186, 45)',绿色
          'rgb(255,222,0)',
          'rgb(255,0,0)'
        ]
        for (var i = 0; i < scaleData.length; i++) {
          data.push(
            {
              value: scaleData[i].value,
              name: scaleData[i].name,
              itemStyle: {
                normal: {
                  borderWidth: 4,
                  shadowBlur: 30,
                  borderColor: color1[i],
                  shadowColor: color1[i],
                  color: color1[i],
                  opacity: 0.75
                }
              }
            },
            {
              value: 2,
              name: '',
              itemStyle: placeHolderStyle
            }
          )
        }
        var seriesObj = [
          {
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [30, 60],
            center: ['50%', '49%'],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inner',
                  fontWeight: 'bold',
                  formatter: function(params) {
                    var percent = 0
                    var total = 0
                    for (var i = 0; i < scaleData.length; i++) {
                      total += scaleData[i].value
                    }
                    percent = ((params.value / total) * 100).toFixed(0)
                    if (params.name !== '') {
                      return params.name + '\n{white|' + '占比' + percent + '%}'
                    } else {
                      return ''
                    }
                  },
                  rich: rich
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: data
          }
        ]
        var option = {
          title: {
            text: title_1[n],
            //subtext: '纯属虚构',
            textStyle: {
              fontSize: 10,
              color: '#d3ca1b'
            },
            left: 'left'
          },
          //backgroundColor: '#04243E',
          tooltip: {
            show: false
          },
          legend: {
            show: false
          },
          textStyle: {
            fontSize: 10
          },
          toolbox: {
            show: false
          },
          series: seriesObj
        }
        myChart.setOption(option)
      }
    },
    echart_go_kpi(datas) {
      var kpidata_1 = ''
      var kpidata_2 = ''
      var kpidata_3 = ''
      var kpidata_4 = ''
      var kpidata_5 = ''
      var kpidata_6 = ''
      var kpidata_7 = ''
      this.show_1 = ''
      this.show_2 = ''
      this.show_3 = ''
      this.show_4 = ''
      this.show_5 = ''
      this.show_6 = ''
      this.show_7 = ''

      for (var i = 0; datas.length > i; i++) {
        if (datas[i].kpiname == '安全') {
          kpidata_1 = datas[i].proportion / 100
          this.show_1 = datas[i].actual_value + '/' + datas[i].expect_value //  期望/实际
          console.log(this.show_1)
        }
        if (datas[i].kpiname == '停机') {
          kpidata_2 = datas[i].proportion / 100
          this.show_2 = datas[i].actual_value + '/' + datas[i].expect_value //  期望/实际
        }
        if (datas[i].kpiname == '轧辊单耗') {
          kpidata_3 = datas[i].proportion / 100
          this.show_3 = datas[i].actual_value + '/' + datas[i].expect_value //  期望/实际
        }
        if (datas[i].kpiname == '复合锂基脂') {
          kpidata_4 = datas[i].proportion / 100
          this.show_4 = datas[i].actual_value + '/' + datas[i].expect_value //  期望/实际
        }
        if (datas[i].kpiname == '磨削液') {
          kpidata_5 = datas[i].proportion / 100
          this.show_5 = datas[i].actual_value + '/' + datas[i].expect_value //  期望/实际
        }
        if (datas[i].kpiname == '导轨油') {
          kpidata_6 = datas[i].proportion / 100
          this.show_6 = datas[i].actual_value + '/' + datas[i].expect_value //  期望/实际
        }
        if (datas[i].kpiname == '砂轮') {
          kpidata_7 = datas[i].proportion / 100
          this.show_7 = datas[i].actual_value + '/' + datas[i].expect_value //  期望/实际
        }
      }

      //（后期kpi）
      var option2_2 = {
        //backgroundColor: '#000E1A',
        title: [
          {
            text: '安全',
            left: '30%',
            top: '42.5%',
            textAlign: 'center',
            textStyle: {
              color: '#999B9C',
              fontSize: 16
            }
          },
          {
            text: '停机',
            left: '60%',
            top: '42.5%',
            textAlign: 'center',
            textStyle: {
              color: '#999B9C',
              fontSize: 16
            }
          },
          {
            text: '轧辊单耗',
            left: '16.6%',
            top: '85.5%',
            textAlign: 'center',
            textStyle: {
              color: '#999B9C',
              fontSize: 12
            }
          },
          {
            text: '复合锂基脂',
            left: '33.3%',
            top: '85.5%',
            textAlign: 'center',
            textStyle: {
              color: '#999B9C',

              fontSize: 12
            }
          },
          {
            text: '磨削液',
            left: '50%',
            top: '85.5%',
            textAlign: 'center',
            textStyle: {
              color: '#999B9C',

              fontSize: 12
            }
          },
          {
            text: '导轨油',
            left: '66.6%',
            top: '85.5%',
            textAlign: 'center',
            textStyle: {
              color: '#999B9C',

              fontSize: 12
            }
          },
          {
            text: '砂轮',
            left: '83.3%',
            top: '85.5%',
            textAlign: 'center',
            textStyle: {
              color: '#999B9C',

              fontSize: 12
            }
          }
        ],

        series: [
          {
            type: 'liquidFill',

            radius: '40%',
            // 水球颜色
            color: ['#8d4038'],
            center: ['30%', '21.8%'],
            label: {
              normal: {
                textStyle: {
                  color: '#8d4038',
                  insideColor: '#8d4038',
                  fontSize: 20
                }
              }
            },
            backgroundStyle: {
              color: 'transparent', //图表的背景颜色

              itemStyle: {
                shadowBlur: 20, //设置无用
                shadowColor: '#072F3A', //设置无用
                opacity: 1 //设置无用
              }
            },
            itemStyle: {
              opacity: 0.5, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: '#1C303D' //阴影颜色
            },
            outline: {
              show: true, //是否显示轮廓 布尔值
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                borderColor: '#8ab8c3', //边框的颜色
                borderWidth: 1 //边框的宽度
              }
            },
            emphasis: {
              itemStyle: {
                opacity: 1 //鼠标经过波浪颜色的透明度
              }
            },

            //data: [0.32, 0.3044, 0.3004, 0.3004, 0.3014],
            data: [kpidata_1, kpidata_1, kpidata_1, kpidata_1, kpidata_1],
            amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: '50%', //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            backgroundStyle: {
              borderWidth: 2,
              borderColor: '#8ab8c3',
              color: '#000f1c' //9EBB29
            },
            direction: 'left', //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: 'linear', //初始动画
            animationEasingUpdate: 'quarticInOut', //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300 //数据更新动画的时长
          },
          {
            type: 'liquidFill',

            radius: '40%',
            // 水球颜色
            color: ['#28b2b6'],
            center: ['60%', '21.8%'],
            label: {
              normal: {
                textStyle: {
                  color: '#28b2b6',
                  insideColor: '#28b2b6',
                  fontSize: 20
                }
              }
            },
            backgroundStyle: {
              color: 'transparent', //图表的背景颜色

              itemStyle: {
                shadowBlur: 20, //设置无用
                shadowColor: '#072F3A', //设置无用
                opacity: 1 //设置无用
              }
            },
            itemStyle: {
              opacity: 0.5, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: '#1C303D' //阴影颜色
            },
            outline: {
              show: true, //是否显示轮廓 布尔值
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                borderColor: '#28b2b6', //边框的颜色
                borderWidth: 1 //边框的宽度
              }
            },
            emphasis: {
              itemStyle: {
                opacity: 1 //鼠标经过波浪颜色的透明度
              }
            },

            // data: [0.32, 0.3044, 0.3004, 0.3004, 0.3014],
            data: [kpidata_2, kpidata_2, kpidata_2, kpidata_2, kpidata_2],
            amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: '50%', //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            backgroundStyle: {
              borderWidth: 2,
              borderColor: '#28b2b6',
              color: '#000f1c' //9EBB29
            },
            direction: 'left', //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: 'linear', //初始动画
            animationEasingUpdate: 'quarticInOut', //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300 //数据更新动画的时长
          },
          //后

          {
            type: 'liquidFill',

            radius: '25%',
            // 水球颜色
            color: ['#28b2b6'],
            center: ['16.6%', '72%'],
            label: {
              normal: {
                textStyle: {
                  color: '#28b2b6',
                  insideColor: '#28b2b6',
                  fontSize: 20
                }
              }
            },
            backgroundStyle: {
              color: 'transparent', //图表的背景颜色
              //borderWidth: '10',//图表的边框宽度
              //borderColor: '#000',//图表的边框颜色
              itemStyle: {
                shadowBlur: 20, //设置无用
                shadowColor: '#072F3A', //设置无用
                opacity: 1 //设置无用
              }
            },
            itemStyle: {
              opacity: 0.5, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: '#072F3A' //阴影颜色
            },
            outline: {
              show: true, //是否显示轮廓 布尔值
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                borderColor: '#28b2b6', //边框的颜色
                borderWidth: 1 //边框的宽度
                //shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
                //shadowColor: '#000' //外部轮廓的阴影颜色
              }
            },
            emphasis: {
              itemStyle: {
                opacity: 1 //鼠标经过波浪颜色的透明度
              }
            },

            //data: [0.6, 0.6244, 0.5804, 0.5604, 0.5514],
            data: [kpidata_3, kpidata_3, kpidata_3, kpidata_3, kpidata_3],
            amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: '50%', //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            backgroundStyle: {
              borderWidth: 2,
              borderColor: '#28b2b6',
              color: '#000f1c' //9EBB29
            },
            direction: 'left', //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: 'linear', //初始动画
            animationEasingUpdate: 'quarticInOut', //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300 //数据更新动画的时长
          },

          {
            type: 'liquidFill',

            radius: '25%',
            // 水球颜色
            color: ['#198bdb'],
            center: ['33.3%', '72%'],
            label: {
              normal: {
                textStyle: {
                  color: '#198bdb',
                  insideColor: '#198bdb',
                  fontSize: 20
                }
              }
            },
            backgroundStyle: {
              color: 'transparent', //图表的背景颜色

              itemStyle: {
                shadowBlur: 20, //设置无用
                shadowColor: '#072F3A', //设置无用
                opacity: 1 //设置无用
              }
            },
            itemStyle: {
              opacity: 0.5, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: '#072F3A' //阴影颜色
            },
            outline: {
              show: true, //是否显示轮廓 布尔值
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                borderColor: '#198bdb', //边框的颜色
                borderWidth: 1 //边框的宽度
              }
            },
            emphasis: {
              itemStyle: {
                opacity: 1 //鼠标经过波浪颜色的透明度
              }
            },

            //data: [0.3, 0.3444, 0.3404, 0.3904, 0.3014],
            data: [kpidata_4, kpidata_4, kpidata_4, kpidata_4, kpidata_4],
            amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: '50%', //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            backgroundStyle: {
              borderWidth: 2,
              borderColor: '#198bdb',
              color: '#000f1c' //9EBB29
            },
            direction: 'left', //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: 'linear', //初始动画
            animationEasingUpdate: 'quarticInOut', //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300 //数据更新动画的时长
          },

          {
            type: 'liquidFill',

            radius: '25%',
            // 水球颜色
            color: ['#26d08b'],
            center: ['50%', '72%'],
            label: {
              normal: {
                textStyle: {
                  color: '#26d08b',
                  insideColor: '#26d08b',
                  fontSize: 20
                }
              }
            },
            backgroundStyle: {
              color: 'transparent', //图表的背景颜色

              itemStyle: {
                shadowBlur: 20, //设置无用
                shadowColor: '#072F3A', //设置无用
                opacity: 1 //设置无用
              }
            },
            itemStyle: {
              opacity: 0.5, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: '#072F3A' //阴影颜色
            },
            outline: {
              show: true, //是否显示轮廓 布尔值
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                borderColor: '#26d08b', //边框的颜色
                borderWidth: 1 //边框的宽度
              }
            },
            emphasis: {
              itemStyle: {
                opacity: 1 //鼠标经过波浪颜色的透明度
              }
            },

            //data: [0.28, 0.2544, 0.2504, 0.2804, 0.3014],
            data: [kpidata_5, kpidata_5, kpidata_5, kpidata_5, kpidata_5],
            amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: '50%', //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            backgroundStyle: {
              borderWidth: 2,
              borderColor: '#26d08b',
              color: '#000f1c' //9EBB29
            },
            direction: 'left', //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: 'linear', //初始动画
            animationEasingUpdate: 'quarticInOut', //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300 //数据更新动画的时长
          },
          {
            type: 'liquidFill',
            radius: '25%',
            // 水球颜色
            color: ['#F9E341'],
            center: ['66.6%', '72%'],
            label: {
              normal: {
                textStyle: {
                  color: '#F9E341',
                  insideColor: '#F9E341',
                  fontSize: 20
                }
              }
            },
            backgroundStyle: {
              color: 'transparent', //图表的背景颜色

              itemStyle: {
                shadowBlur: 20, //设置无用
                shadowColor: '#F9E341', //设置无用
                opacity: 1 //设置无用
              }
            },
            itemStyle: {
              opacity: 0.5, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: '#323923' //阴影颜色
            },
            outline: {
              show: true, //是否显示轮廓 布尔值
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                borderColor: '#28b2b6', //边框的颜色
                borderWidth: 1 //边框的宽度
              }
            },
            emphasis: {
              itemStyle: {
                opacity: 1 //鼠标经过波浪颜色的透明度
              }
            },

            // data: [0.45, 0.4144, 0.4004, 0.4104, 0.4014],
            data: [kpidata_6, kpidata_6, kpidata_6, kpidata_6, kpidata_6],
            amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: '50%', //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            backgroundStyle: {
              borderWidth: 2,
              borderColor: '#F9E341',
              color: '#000f1c' //9EBB29
            },
            direction: 'left', //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: 'linear', //初始动画
            animationEasingUpdate: 'quarticInOut', //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300 //数据更新动画的时长
          },

          {
            type: 'liquidFill',
            radius: '25%',
            // 水球颜色
            color: ['#f3daa9'],
            center: ['83.3%', '72%'],
            label: {
              normal: {
                textStyle: {
                  color: '#f3daa9',
                  insideColor: '#f3daa9',
                  fontSize: 20
                }
              }
            },
            backgroundStyle: {
              color: 'transparent', //图表的背景颜色

              itemStyle: {
                shadowBlur: 20, //设置无用
                shadowColor: '#072F3A', //设置无用
                opacity: 1 //设置无用
              }
            },
            itemStyle: {
              opacity: 0.5, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: '#313737' //阴影颜色
            },
            outline: {
              show: true, //是否显示轮廓 布尔值
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                borderColor: '#28b2b6', //边框的颜色
                borderWidth: 1 //边框的宽度
              }
            },
            emphasis: {
              itemStyle: {
                opacity: 1 //鼠标经过波浪颜色的透明度
              }
            },

            //data: [0.32, 0.3544, 0.3304, 0.3404, 0.3514],
            data: [kpidata_7, kpidata_7, kpidata_7, kpidata_7, kpidata_7],
            amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: '50%', //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            backgroundStyle: {
              borderWidth: 2,
              borderColor: '#f3daa9',
              color: '#000f1c' //9EBB29
            },
            direction: 'left', //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: 'linear', //初始动画
            animationEasingUpdate: 'quarticInOut', //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300 //数据更新动画的时长
          }
        ]
      }

      var myChart2_2 = Echarts.init(
        document.getElementById('app2_2'),
        'default'
      ) //将配置注入到html中定义的容器
      myChart2_2.setOption(option2_2)
    },
    vagetable() {
      //表  损耗
      post('baseCostAccountingMain/findBaseCostAccountingABigScreen', {
        condition: {}
      }).then(res => {
        this.tableData_1 = res.data
        this.echart_go_1(res.map)
        this.change()
      })
      //结存
      post('rollInformation/findRollDiameterABigScreenByPage', {
        condition: { ifabnormal: 0 } //正常
      }).then(res => {
        this.tableData_3 = res.data
        this.echart_go_b(res.map)
      })
      //3  班组绩效
      post('rollGrindingBF/findGrindingRateABigScreenByPage', {
        condition: {}
      }).then(res => {
        this.tableData_4 = res.data
        this.echart_go_a(res.map)
      })

      //4  kpi
      post('baseKpi/findByPage', {
        pageIndex: 1,
        pageSize: 100
      }).then(res => {
        debugger
        this.tableData_4 = res.data
        this.echart_go_kpi(res.data)
      })
    },
    change() {
      if (this.tableData_1.length > 10) {
        this.tableData_1.push(
          this.tableData_1[0],
          this.tableData_1[1],
          this.tableData_1[2],
          this.tableData_1[3],
          this.tableData_1[4],
          this.tableData_1[5],
          this.tableData_1[6],
          this.tableData_1[7],
          this.tableData_1[8],
          this.tableData_1[9]
        )
        this.tableData_1.splice(0, 10)
      }
    },
    play() {
      // setInterval(this.change(), 2000) //每两秒执行一次插入删除操作
      const timer = setInterval(() => {
        this.change()
      }, 5000)
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    },

    //二合一 吨钢消耗和毫米轧制量
    guang_find_2() {
      this.repeat_1(0, 12)
      //this.find_two_1 = []
      find_two_1: [
        {
          label: '1月',
          consumption: 0,
          cost: 0
        },
        {
          label: '2月',
          consumption: 0,
          cost: 0
        },
        {
          label: '3月',
          consumption: 0,
          cost: 0
        },
        {
          label: '4月',
          consumption: 0,
          cost: 0
        },
        {
          label: '5月',
          consumption: 0,
          cost: 0
        },
        {
          label: '6月',
          consumption: 0,
          cost: 0
        },
        {
          label: '7月',
          consumption: 0,
          cost: 0
        },
        {
          label: '8月',
          consumption: 0,
          cost: 0
        },
        {
          label: '9月',
          consumption: 0,
          cost: 0
        },
        {
          label: '10月',
          consumption: 0,
          cost: 0
        },
        {
          label: '11月',
          consumption: 0,
          cost: 0
        },
        {
          label: '12月',
          consumption: 0,
          cost: 0
        }
      ]
    },
    repeat_1(num, length) {
      post('baseCostAccountingMain/findBaseCostAccountingABigScreen', {
        condition: { dbegin: this.mon_need[num] }
      }).then(res => {
        console.log(res.bean.cost)
        this.find_two_1[num].cost = res.bean.cost
        this.find_two_1[num].consumption = res.bean.consumption
        //debugger
        if (++num < length) {
          this.repeat_1(num, length)
        } else {
          this.echart_go_er(this.find_two_1)
        }
      })
      console.log(this.find_two_1)
    },
    // 工作/支撑辊定时器
    getTime() {
      const timer = setInterval(() => {
        this.findOnLineRollF1()
      }, 5000)
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    },
    getNowTime() {
      let time = {
        1: '周一',
        2: '周二',
        3: '周三',
        4: '周四',
        5: '周五',
        6: '周六',
        7: '周日'
      }
      this.nowTime.time = moment().format('HH:mm:ss')
      this.nowTime.day = moment().format('YYYY年MM月DD日')
      this.nowTime.date = time[moment().weekday()]
    }
  }
}
</script>

<style>
.body_box {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  /* margin: 15px;*/
  background-color: #252541;
  /* padding: 20px 20px 10px 20px; */
  /* border-radius: 8px; */
}

.body_box .table_box table {
  width: 100%;
  height: 20px;
  font-size: 14px;
}

.body_box .table_box table thead {
  background-color: #1a367a;
  letter-spacing: 1px;
}

.body_box .table_box table thead tr {
  height: 10px;
}

.body_box .table_box table tr th {
  padding: 3px 5px;
  /*  white-space: normal;*/
  word-break: break-all;
  text-align: center;
  color: #eae8c5;
  height: 10px;
  background: #208d3a;
  white-space: nowrap;
}

.body_box .table_box table tbody tr {
  cursor: pointer;
}

/*.body_box .table_box table tbody tr:hover {
    background-color: #1a367a !important;
  }*/

.body_box .table_box table tbody tr:nth-child(2n) {
  background-color: #252541;
}

.body_box .table_box table tbody tr td {
  padding: 3px 5px;
  white-space: normal;
  word-break: break-all;
  border: 1px solid gray;
  text-align: center;
  color: #d3ca1b;
  height: 35px;
  /*强制不换行*/
  white-space: nowrap;
}
.body_box .table_box table tbody tr td a:hover {
  color: #d3ca1b;
}
</style>
