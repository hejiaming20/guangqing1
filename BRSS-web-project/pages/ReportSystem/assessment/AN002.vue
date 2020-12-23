<template>
  <div>
    <div class="layout-search anclass layout-default-margin">
      <el-row>
        <el-col :span="20">
          <el-form
            ref="ruleForm"
            :inline="true"
            :model="searchInfo"
            class="search-info"
            label-width="80px">
            <el-form-item
              label="产线"
              prop="production_line">
              <el-select
                v-model="searchInfo.production_line"
                placeholder="请选择">
                <el-option
                  v-for="item in lineArray"
                  :key="item.key"
                  :label="item.value"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item
              label="时间选择"
              prop="time">
              <el-date-picker
                v-model="searchInfo.time"
                :clearable="false"
                :default-time="['00:00:00', '23:59:59']"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <div class="btn">
            <el-button
              size="mini"
              type="primary"
              @click="findSearch()">查询
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格内容 -->
    <div class="layout-default-margin">
      <table 
        border="1" 
        class="el-table "
      >
        <colgroup>
          <col 
            span="19" 
            class="u-table-span">
        </colgroup>
        <thead>
          <tr class="u-table-head">
            <th>轧辊类型</th>
            <th>制造厂商</th>
            <th>轧辊工作层(mm)</th>
            <th>单重(kg)</th>
            <th>单价(RMB/支)</th>
            <th>毫米单价(RMB)</th>
            <th>轧制公里数(km)</th>
            <th>轧制吨位(吨)</th>
            <th>在线磨损总量(mm)</th>
            <th>磨削总量(mm)</th>
            <!-- <th>累积磨削次数(次)</th>
            <th>平均磨削量(mm)</th> -->
            <th>消耗总量(mm)</th>
            <th>消耗总重量(kg)</th>
            <th>消耗总额(RMB)</th>
            <th>毫米轧制量(t/mm)</th>
            <th>吨钢消耗量(kg/t)</th>
            <th>吨钢消耗金额(RMB/t)</th>
            <th>投用数量(支)</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(item, index) in tableData" 
            :key="index">
            <td 
              :class="index > 0 && index < rows-1 ? 'qingchu' : ''"
              :rowspan="index == 0 ? rows-1 : null">{{ item.roll_type }}</td>
            <td>{{ item.factory }}</td>
            <td>{{ item.work_layer | filterNum }}</td>
            <td>{{ item.weight | filterNum }}</td>
            <td>{{ item.price | filterNum }}</td>
            <td>{{ item.mmprice | filterNum }}</td>
            <td>{{ item.totalkilometer | filterNum }}</td>
            <td>{{ item.totaltonnage | filterNum }}</td>
            <td>{{ item.totalonwear | filterNum }}</td>
            <td>{{ item.totalgrinding | filterNum }}</td>
            <td>{{ item.totalconsume | filterNum }}</td>
            <td>{{ item.totalconsumeweight | filterNum }}</td>
            <td>{{ item.totalcost | filterNum }}</td>
            <td>{{ item.tonnagepmm | filterNum }}</td>
            <td>{{ item.rollkgptonnage | filterNum }}</td>
            <td>{{ item.costptonnage | filterNum }}</td>
            <td>{{ item.usingcount }}</td>
          </tr>
          <tr 
            v-for="(item1, index1) in tableData1" 
            :key="index1+50">
            <td 
              :class="index1 > 0 && index1 < rows1 - 1 ? 'qingchu' : ''" 
              :data="index1"
              :rowData="rows1"
              :rowspan="index1 == 0 ? rows1-1 : null">{{ item1.roll_type }}</td>
            <td>{{ item1.factory }}</td>
            <td>{{ item1.work_layer | filterNum }}</td>
            <td>{{ item1.weight | filterNum }}</td>
            <td>{{ item1.price | filterNum }}</td>
            <td>{{ item1.mmprice | filterNum }}</td>
            <td>{{ item1.totalkilometer | filterNum }}</td>
            <td>{{ item1.totaltonnage | filterNum }}</td>
            <td>{{ item1.totalonwear | filterNum }}</td>
            <td>{{ item1.totalgrinding | filterNum }}</td>
            <td>{{ item1.totalconsume | filterNum }}</td>
            <td>{{ item1.totalconsumeweight | filterNum }}</td>
            <td>{{ item1.totalcost | filterNum }}</td>
            <td>{{ item1.tonnagepmm | filterNum }}</td>
            <td>{{ item1.rollkgptonnage | filterNum }}</td>
            <td>{{ item1.costptonnage | filterNum }}</td>
            <td>{{ item1.usingcount }}</td>
          </tr>
          <tr 
            v-for="(item2, index2) in tableData2" 
            :key="index2+100">
            <td 
              :class="index2 > 0 && index2 < rows2 - 1 ? 'qingchu' : ''" 
              :data="index2"
              :rowData="rows2"
              :rowspan="index2 == 0 ? rows2 - 1 : null">{{ item2.roll_type }}</td>
            <td>{{ item2.factory }}</td>
            <td>{{ item2.work_layer | filterNum }}</td>
            <td>{{ item2.weight | filterNum }}</td>
            <td>{{ item2.price | filterNum }}</td>
            <td>{{ item2.mmprice | filterNum }}</td>
            <td>{{ item2.totalkilometer | filterNum }}</td>
            <td>{{ item2.totaltonnage | filterNum }}</td>
            <td>{{ item2.totalonwear | filterNum }}</td>
            <td>{{ item2.totalgrinding | filterNum }}</td>
            <td>{{ item2.totalconsume | filterNum }}</td>
            <td>{{ item2.totalconsumeweight | filterNum }}</td>
            <td>{{ item2.totalcost | filterNum }}</td>
            <td>{{ item2.tonnagepmm | filterNum }}</td>
            <td>{{ item2.rollkgptonnage | filterNum }}</td>
            <td>{{ item2.costptonnage | filterNum }}</td>
            <td>{{ item2.usingcount }}</td>
          </tr>
          <tr 
            v-for="(item3, index3) in tableData3" 
            :key="index3+150">
            <td 
              :class="index3 > 0 && index3 < rows3 - 1 ? 'qingchu' : ''" 
              :data="index3"
              :rowData="rows3"
              :rowspan="index3 == 0 ? rows3 - 1 : null">{{ item3.roll_type }}</td>
            <td>{{ item3.factory }}</td>
            <td>{{ item3.work_layer | filterNum }}</td>
            <td>{{ item3.weight | filterNum }}</td>
            <td>{{ item3.price | filterNum }}</td>
            <td>{{ item3.mmprice | filterNum }}</td>
            <td>{{ item3.totalkilometer | filterNum }}</td>
            <td>{{ item3.totaltonnage | filterNum }}</td>
            <td>{{ item3.totalonwear | filterNum }}</td>
            <td>{{ item3.totalgrinding | filterNum }}</td>
            <td>{{ item3.totalconsume | filterNum }}</td>
            <td>{{ item3.totalconsumeweight | filterNum }}</td>
            <td>{{ item3.totalcost | filterNum }}</td>
            <td>{{ item3.tonnagepmm | filterNum }}</td>
            <td>{{ item3.rollkgptonnage | filterNum }}</td>
            <td>{{ item3.costptonnage | filterNum }}</td>
            <td>{{ item3.usingcount }}</td>
          </tr>
          <tr 
            v-for="(item4, index4) in tableData4" 
            :key="index4+200">
            <td 
              :class="index4 > 0 && index4 < rows4 - 1 ? 'qingchu' : ''" 
              :data="index4"
              :rowData="rows4"
              :rowspan="index4 == 0 ? rows4 - 1 : null">{{ item4.roll_type }}</td>
            <td>{{ item4.factory }}</td>
            <td>{{ item4.work_layer | filterNum }}</td>
            <td>{{ item4.weight | filterNum }}</td>
            <td>{{ item4.price | filterNum }}</td>
            <td>{{ item4.mmprice | filterNum }}</td>
            <td>{{ item4.totalkilometer | filterNum }}</td>
            <td>{{ item4.totaltonnage | filterNum }}</td>
            <td>{{ item4.totalonwear | filterNum }}</td>
            <td>{{ item4.totalgrinding | filterNum }}</td>
            <td>{{ item4.totalconsume | filterNum }}</td>
            <td>{{ item4.totalconsumeweight | filterNum }}</td>
            <td>{{ item4.totalcost | filterNum }}</td>
            <td>{{ item4.tonnagepmm | filterNum }}</td>
            <td>{{ item4.rollkgptonnage | filterNum }}</td>
            <td>{{ item4.costptonnage | filterNum }}</td>
            <td>{{ item4.usingcount }}</td>
          </tr>
          <tr 
            v-for="(item5, index5) in tableData5" 
            :key="index5+250">
            <td 
              :class="index5 > 0 && index5 < rows5 - 1 ? 'qingchu' : ''" 
              :data="index5"
              :rowData="rows5"
              :rowspan="index5 == 0 ? rows5 - 1 : null">{{ item5.roll_type }}</td>
            <td>{{ item5.factory }}</td>
            <td>{{ item5.work_layer | filterNum }}</td>
            <td>{{ item5.weight | filterNum }}</td>
            <td>{{ item5.price | filterNum }}</td>
            <td>{{ item5.mmprice | filterNum }}</td>
            <td>{{ item5.totalkilometer | filterNum }}</td>
            <td>{{ item5.totaltonnage | filterNum }}</td>
            <td>{{ item5.totalonwear | filterNum }}</td>
            <td>{{ item5.totalgrinding | filterNum }}</td>
            <td>{{ item5.totalconsume | filterNum }}</td>
            <td>{{ item5.totalconsumeweight | filterNum }}</td>
            <td>{{ item5.totalcost | filterNum }}</td>
            <td>{{ item5.tonnagepmm | filterNum }}</td>
            <td>{{ item5.rollkgptonnage | filterNum }}</td>
            <td>{{ item5.costptonnage | filterNum }}</td>
            <td>{{ item5.usingcount }}</td>
          </tr>
          <tr 
            v-for="(item6, index6) in tableData6" 
            :key="index6+300">
            <td 
              :class="index6 > 0 && index6 < rows6 - 1 ? 'qingchu' : ''" 
              :data="index6"
              :rowData="rows6"
              :rowspan="index6 == 0 ? rows6 - 1 : null">{{ item6.roll_type }}</td>
            <td>{{ item6.factory }}</td>
            <td>{{ item6.work_layer | filterNum }}</td>
            <td>{{ item6.weight | filterNum }}</td>
            <td>{{ item6.price | filterNum }}</td>
            <td>{{ item6.mmprice | filterNum }}</td>
            <td>{{ item6.totalkilometer | filterNum }}</td>
            <td>{{ item6.totaltonnage | filterNum }}</td>
            <td>{{ item6.totalonwear | filterNum }}</td>
            <td>{{ item6.totalgrinding | filterNum }}</td>
            <td>{{ item6.totalconsume | filterNum }}</td>
            <td>{{ item6.totalconsumeweight | filterNum }}</td>
            <td>{{ item6.totalcost | filterNum }}</td>
            <td>{{ item6.tonnagepmm | filterNum }}</td>
            <td>{{ item6.rollkgptonnage | filterNum }}</td>
            <td>{{ item6.costptonnage | filterNum }}</td>
            <td>{{ item6.usingcount }}</td>
          </tr>
          <tr 
            v-for="(item7, index7) in tableData7" 
            :key="index7+400">
            <td 
              :class="index7 > 0 && index7 < rows7 - 1 ? 'qingchu' : ''" 
              :data="index7"
              :rowData="rows7"
              :rowspan="index7 == 0 ? rows7 - 1 : null">{{ item7.roll_type }}</td>
            <td>{{ item7.factory }}</td>
            <td>{{ item7.work_layer | filterNum }}</td>
            <td>{{ item7.weight | filterNum }}</td>
            <td>{{ item7.price | filterNum }}</td>
            <td>{{ item7.mmprice | filterNum }}</td>
            <td>{{ item7.totalkilometer | filterNum }}</td>
            <td>{{ item7.totaltonnage | filterNum }}</td>
            <td>{{ item7.totalonwear | filterNum }}</td>
            <td>{{ item7.totalgrinding | filterNum }}</td>
            <td>{{ item7.totalconsume | filterNum }}</td>
            <td>{{ item7.totalconsumeweight | filterNum }}</td>
            <td>{{ item7.totalcost | filterNum }}</td>
            <td>{{ item7.tonnagepmm | filterNum }}</td>
            <td>{{ item7.rollkgptonnage | filterNum }}</td>
            <td>{{ item7.costptonnage | filterNum }}</td>
            <td>{{ item7.usingcount }}</td>
          </tr>
          <tr 
            v-for="(item8, index8) in tableData8" 
            :key="index8+450">
            <td 
              :class="index8 > 0 && index8 < rows8 - 1 ? 'qingchu' : ''" 
              :data="index8"
              :rowData="rows8"
              :rowspan="index8 == 0 ? rows8 - 1 : null">{{ item8.roll_type }}</td>
            <td>{{ item8.factory }}</td>
            <td>{{ item8.work_layer | filterNum }}</td>
            <td>{{ item8.weight | filterNum }}</td>
            <td>{{ item8.price | filterNum }}</td>
            <td>{{ item8.mmprice | filterNum }}</td>
            <td>{{ item8.totalkilometer | filterNum }}</td>
            <td>{{ item8.totaltonnage | filterNum }}</td>
            <td>{{ item8.totalonwear | filterNum }}</td>
            <td>{{ item8.totalgrinding | filterNum }}</td>
            <td>{{ item8.totalconsume | filterNum }}</td>
            <td>{{ item8.totalconsumeweight | filterNum }}</td>
            <td>{{ item8.totalcost | filterNum }}</td>
            <td>{{ item8.tonnagepmm | filterNum }}</td>
            <td>{{ item8.rollkgptonnage | filterNum }}</td>
            <td>{{ item8.costptonnage | filterNum }}</td>
            <td>{{ item8.usingcount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
   
    <div class="layout-search layout-default-margin">
      <div class="layout-search-header">查询区</div>
      <div class="layout-search-body">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForml"
              :model="searchEcharts"
              :inline="true"
              class="search-info"
              label-width="90px">
              <el-form-item
                label="轧辊类型"
                prop="roll_type">
                <el-select
                  v-model="searchEcharts.roll_type"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="年份选择"
                prop="year">
                <el-date-picker
                  v-model="searchEcharts.year"
                  :clearable="false"
                  type="year"
                  value-format="yyyy"
                  placeholder="选择年"/>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="findE()">查询
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="layout-block">
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="p-btns">
            <div 
              v-for="(item, index) in optionsLeft"
              :key="index" 
              :class="leftIndex == item.value? 'p-btns-item quecolor' : 'p-btns-item'" 
              @click="handleClickLeft(item.value)">{{ item.label }}</div>
          </div>
          <tasily-echarts 
            :grid="leftEcharts.grid"
            :legend="leftEcharts.legend"
            :series="leftEcharts.series"
            :x-axis="leftEcharts.xaxis" 
            :toolbox="{show:false}" 
            :y-axis="leftEcharts.yaxis"
            :tooltip="leftEcharts.tooltip"
            _height="240px"/>
        </el-col>
        <el-col :span="12">
          <div class="p-btns">
            <div 
              v-for="(item, index) in optionsRight"
              :key="index" 
              :class="rightIndex == item.value? 'p-btns-item quecolor' : 'p-btns-item'" 
              @click="handleClickRight(item.value)">{{ item.label }}</div>
          </div>
          <tasily-echarts 
            :grid="rightEcharts.grid"
            :legend="rightEcharts.legend"
            :series="rightEcharts.series"
            :x-axis="rightEcharts.xaxis" 
            :toolbox="{show:false}" 
            :y-axis="rightEcharts.yaxis"
            :tooltip="rightEcharts.tooltip"
            _height="240px"/>
        </el-col>
      </el-row>
    </div>
   
  </div>
</template>

<script>
import { get, post, pythonPOST1, getDataConfig } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import tasilyEcharts from '@/components/TasilyEcharts'
import Echarts from 'echarts'
import moment from 'moment'
export default {
  components: { TableEasy, tasilyEcharts },
  filters: {
    filterNum(num) {
      if (num) {
        num = Number(num)
        let y = String(num).indexOf('.') + 1 //获取小数点的位置
        var count = String(num).length - y //获取小数点后的个数
        if (y > 0 && count > 3) {
          return Number(num.toFixed(3))
        } else {
          return num
        }
      } else {
        return num
      }
    }
  },
  data() {
    return {
      options: [
        {
          key: 1,
          value: '精轧工作辊F1-F4'
        },
        {
          key: 2,
          value: '精轧工作辊F5-F7'
        },
        {
          key: 3,
          value: '精轧支撑辊'
        },
        {
          key: 4,
          value: '粗轧工作辊'
        },
        {
          key: 5,
          value: '粗轧支撑辊'
        },
        {
          key: 6,
          value: '精轧立辊'
        },
        {
          key: 7,
          value: '粗轧立辊'
        },
        {
          key: 8,
          value: '平整支撑辊'
        },
        {
          key: 9,
          value: '平整工作辊'
        }
      ],
      optionsLeft: [
        {
          value: 'totalconsume',
          label: '轧辊消耗总量'
        },
        {
          value: 'totalgrinding',
          label: '磨削总量'
        },
        {
          value: 'totalonwear',
          label: '轧辊在线磨损总量'
        }
      ],
      optionsRight: [
        {
          value: 'costptonnage',
          label: '吨钢消耗金额'
        },
        {
          value: 'rollkgptonnage',
          label: '吨钢消耗量'
        }
      ],
      rightIndex: '',
      leftIndex: '',
      searchInfo: {
        production_line: '',
        time: null
      },
      searchEcharts: {
        roll_type: '',
        year: ''
      },
      tableData: [],
      rows: null,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      tableData7: [],
      tableData8: [],
      rows1: null,
      rows2: null,
      rows3: null,
      rows4: null,
      rows5: null,
      rows6: null,
      rows7: null,
      rows8: null,
      radioright: '',
      radioleft: '',
      rollTypes: [],
      factorys: [],
      leftEcharts: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#eae8c5'
          },
          icon: 'roundRect',
          type: 'scroll',
          pageIconColor: 'white',
          pageIconSize: 10,
          pageTextStyle: {
            color: 'white'
          }
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        series: [
          {
            name: '无',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ],
        xaxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#CCCCCC'
            }
          },
          boundaryGap: false,
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ],
          axisTick: {
            show: false
          }
        },
        yaxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#CCCCCC' // 设置纵轴颜色
              }
            },
            splitLine: { lineStyle: { color: ['#777777'] } },
            splitNumber: 3,
            axisTick: {
              show: false
            }
          }
        ]
      },
      rightEcharts: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          type: 'scroll',
          textStyle: {
            color: '#eae8c5'
          },
          icon: 'roundRect',
          pageIconColor: 'white',
          pageIconSize: 10,
          pageTextStyle: {
            color: 'white'
          }
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        series: [
          {
            name: '无',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ],
        xaxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#CCCCCC'
            }
          },
          boundaryGap: false,
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ],
          axisTick: {
            show: false
          }
        },
        yaxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#CCCCCC' // 设置纵轴颜色
              }
            },
            splitLine: { lineStyle: { color: ['#777777'] } },
            splitNumber: 3
          }
        ]
      },
      lineArray: [],
      leftArray: {},
      rightArray: {}
    }
  },
  mounted() {
    this.findOptions()
    this.searchInfo.time = [
      moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      moment().format('YYYY-MM-DD HH:mm:ss')
    ]
    this.findAll()

    this.searchEcharts.roll_type = this.options[0].value
    this.searchEcharts.year = moment().format('YYYY')
    this.findEcharts()

    // this.echart_go1()
  },
  methods: {
    findSearch() {
      this.findAll()
    },
    buttonclick(value) {
      console.log(value)
    },
    async findAll() {
      let res = await pythonPOST1('/python/RollUsingEvaluateSheet/', {
        production_line: this.searchInfo.production_line,
        search_starttime: this.searchInfo.time[0],
        search_endtime: this.searchInfo.time[1]
      })
      if (res.code == 200) {
        let data = res.data.map(item => {
          return JSON.parse(item)
        })
        this.tableData = this.getTableTotal(data[0])
        this.rows = this.tableData.length
        this.tableData1 = this.getTableTotal(data[1])
        this.rows1 = this.tableData1.length
        this.tableData2 = this.getTableTotal(data[2])
        this.rows2 = this.tableData2.length
        this.tableData3 = this.getTableTotal(data[3])
        this.rows3 = this.tableData3.length
        this.tableData4 = this.getTableTotal(data[4])
        this.rows4 = this.tableData4.length
        this.tableData5 = this.getTableTotal(data[5])
        this.rows5 = this.tableData5.length
        this.tableData6 = this.getTableTotal(data[6])
        this.rows6 = this.tableData6.length
        this.tableData7 = this.getTableTotal(data[7])
        this.rows7 = this.tableData7.length
        this.tableData8 = this.getTableTotal(data[8])
        this.rows8 = this.tableData8.length
      }
    },
    getTableTotal(data) {
      if (data.length == 0) {
        return data
      }
      let obj1 = {
        roll_type: '合计',
        totalkilometer: null, // 轧制公里数
        totaltonnage: null, // 轧制吨位
        totalonwear: null, // 在线磨损总量
        totalgrinding: null, // 磨削总量
        totalconsume: null, // 消耗总量
        totalconsumeweight: null, // 消耗总重量
        totalcost: null, // 消耗总额
        tonnagepmm: null, // 毫米轧制量(平均求和)
        rollkgptonnage: null, // 吨钢消耗量(平均求和)
        costptonnage: null, // 吨钢消耗金额(平均求和)
        usingcount: null // 投用数量
      }
      for (const item of data) {
        obj1.totalkilometer += item.totalkilometer
        obj1.totaltonnage += item.totaltonnage
        obj1.totalonwear += item.totalonwear
        obj1.totalgrinding += item.totalgrinding
        obj1.totalconsume += item.totalconsume
        obj1.totalconsumeweight += item.totalconsumeweight
        obj1.totalcost += item.totalcost
        obj1.usingcount += item.usingcount
      }
      obj1.tonnagepmm = obj1.totaltonnage / obj1.totalconsume
      obj1.rollkgptonnage = obj1.totalconsumeweight / obj1.totaltonnage
      obj1.costptonnage = obj1.totalcost / obj1.totaltonnage
      data.push(obj1)
      return data
    },
    async findEcharts() {
      let res = await pythonPOST1(
        '/python/RollUsingEvaluateGraphy/',
        this.searchEcharts
      )
      if (res.code == 200) {
        this.leftArray = JSON.parse(res.data[0])
        this.rightArray = JSON.parse(res.data[1])
      }
      this.handleClickRight(this.optionsRight[0].value)
      this.handleClickLeft(this.optionsLeft[0].value)
    },
    findOptions() {
      getDataConfig('rolltype').then(res => {
        this.rollTypes = res
      })
      getDataConfig('roll_factory').then(res => {
        this.factorys = res
      })
      getDataConfig('proline').then(res => {
        this.lineArray = res
      })
    },
    handleClickRight(val) {
      this.rightIndex = val
      if (this.rightArray[val]) {
        let data = this.rightArray[val]
        let arr = []
        for (const item of data) {
          arr.push({
            name: item.factory,
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: item.data
          })
        }
        this.rightEcharts.series = arr
      }
    },
    handleClickLeft(val) {
      this.leftIndex = val
      if (this.leftArray[val]) {
        let data = this.leftArray[val]
        let arr = []
        for (const item of data) {
          arr.push({
            name: item.factory,
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: item.data
          })
        }
        this.leftEcharts.series = arr
      }
    },
    findE() {
      this.findEcharts()
    }
  }
}
</script>

<style scoped>
.anclass {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.nssa {
  padding: 4px;
}
.u-table-span {
  text-align: center;
  font-size: 14px;
}
.u-table-head th {
  background-color: #001f6b;
  font-weight: normal;
  padding: 5px 0;
}
.qingchu {
  display: none;
}
.radio-margin {
  margin-right: 10px;
  background-color: #409eff;
}
</style>
