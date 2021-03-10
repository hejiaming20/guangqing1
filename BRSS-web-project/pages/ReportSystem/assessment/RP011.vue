<!--安全库存导出-->
<template>
  <div>
    <div style="color:greenyellow;margin-top: 5px;margin-bottom: 5px; padding-top: 4px;padding-bottom: 4px ; padding-left: 25px;width: 100%;background-color: #253F80;font-size: 14px;height:40px;overflow-y: auto ">
      <el-col :span="12">
        说明1：理论值=结存 - 季度消耗 - 安全库存+140
      </el-col>
      <el-col :span="12">
        说明2：可用月=理论值*3/季度消耗
      </el-col>

    </div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="400"
      :page-size="pageSize"
      :current-page="pageIndex"
      :is-pagination-show="false"
      index-type="index"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              :inline="true"
              label-width="100px">
              <el-form-item
                label="轧辊材质"
                prop="material_id">
                <el-select
                  v-model="searchInfo.material_id"
                  clearable
                  placeholder="轧辊材质">
                  <el-option
                    v-for="item in materialArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_typeid">
                <el-select
                  v-model="searchInfo.roll_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in typeoptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="机架范围"
                prop="framerangeid">
                <el-select
                  v-model="searchInfo.framerangeid"
                  clearable
                  placeholder="请选择">
                  <el-option
                    v-for="item in frameFwArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="时间"
                prop="dbegin">
                <el-date-picker
                  ref="userTime"
                  v-model="searchInfo.dbegin"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="开始时间"/>
              </el-form-item>
              <!--<el-form-item
                label="磨床号"
                prop="inventory_stateid">
                <el-select
                  v-model="searchInfo.inventory_stateid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in kcoptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>-->
            </el-form>
          </el-col>
          <el-col :span="4">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="findAll()">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="hand_exe">导出全部
              </el-button>
              <!-- <el-button
            size="mini"
            type="primary"
            @click="open_add_1(true)">添加(磨床)</el-button>-->
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          prop="material"
          label="材质"/>
        <el-table-column
          prop="framerange"
          label="机架范围"/>
        <el-table-column
          prop="d_inventory"
          label="季度消耗(mm)"/>
        <el-table-column
          prop="safe_inventory"
          label="安全库存(mm)"/>
        <el-table-column
          prop="s_inventory"
          label="结存(mm)"/>
        <el-table-column
          prop="purchasing_cycle"
          label="采购周期(月)"/>
        <el-table-column
          prop="effective_value"
          label="理论值mm"/>
      </template>
    </Table-easy>

    <div style="height: 300px; border: 3px solid #105b8d;margin-top: 10px;padding: 10px">
      <el-col :span="24">
        <div
          id="app2"
          style="width:100%;height: 280px;"/>
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

  </div>
</template>

<script>
import { get, post, getDataConfig, exportMethod } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import moment from 'moment'
import Echarts from 'echarts'
export default {
  components: { TableEasy },
  data() {
    return {
      searchInfo: {
        framerangeid: '',
        material_id: '',
        roll_typeid: '',
        dbegin: ''
      },
      rules: {
        roll_no: [{ required: true, message: '请输入辊号', trigger: 'blur' }],
        production_line: [
          { required: true, message: '请输入产线', trigger: 'change' }
        ],
        roll_type: [
          { required: true, message: '请输入轧辊类型', trigger: 'change' }
        ],
        grind_starttime: [
          {
            required: true,
            message: '车削开始时间',
            trigger: 'change'
          }
        ],
        grind_endtime: [
          { required: true, message: '车削结束时间', trigger: 'change' }
        ],
        before_diameter: [
          { required: true, message: '请输入车前直径（数字)', trigger: 'blur' }
        ],
        after_diameter: [
          { required: true, message: '请输入车后直径（数字)', trigger: 'blur' }
        ],
        /* sgroup: [{ required: true, message: '班组', trigger: 'blur' }],*/
        sclass: [{ required: true, message: '班', trigger: 'blur' }]
      },
      typeoptions: [],
      kcoptions: [],
      formLabelAlign: {},
      tableData: [{}],
      total: 0,
      dialogVisible: false,
      formFlag: true, // true 添加 false 编辑
      pageIndex: 1,
      pageSize: 100,
      dialogTitle: '',
      materialArray: [],
      factoryArray: [],
      frameFwArray: [],
      rowIndex: null,
      tableData_1: []
    }
  },
  mounted() {
    /*this.searchInfo.dbegin = moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD HH:mm:ss')*/
    this.searchInfo.dbegin = moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.findAll()
    getDataConfig('framefw').then(res => {
      this.frameFwArray = res
    })
    post('/dictionary/findMapV1', { dicno: 'rolltype', level: 3 }).then(res => {
      this.typeoptions = res.data
    })
    post('/dictionary/findMapV1', { dicno: 'rollstate', level: 3 }).then(
      res => {
        this.kcoptions = res.data
      }
    )
    getDataConfig('roll_material').then(res => {
      this.materialArray = res
    })
    post('/dictionary/findMapV1', { dicno: 'roll_factory' }).then(res => {
      this.factoryArray = res.data //制造厂商
    })
  },
  methods: {
    async hand_exe() {
      let data = {
        method: 'get',
        url:
          // 'http://192.168.43.57:8778/api/rollStiffness/excel?dbegin=' +
          location.origin +
          '/api/baseRollSafetyReminder/excelBaseRollSafetyReminder?dbegin=' +
          this.searchInfo.dbegin +
          '&roll_typeid=' +
          this.searchInfo.roll_typeid +
          '&material_id=' +
          this.searchInfo.material_id +
          '&framerangeid=' +
          this.searchInfo.framerangeid
      }
      await exportMethod(data)
      // get(
      //   'rollStiffness/excel?dbegin=' +
      //     this.searchInfo.dbegin +
      //     '&dend=' +
      //     this.searchInfo.dend +
      //     '&production_line_id=' +
      //     this.searchInfo.production_line_id
      // ).then(res => {
      //   exportMethod(res)
      // })
    },
    handleFrameScopeChange() {
      this.frameFwArray.forEach(item => {
        if (item.key == this.formLabelAlign.framerangeid) {
          this.formLabelAlign.framerange = item.value
        }
      })
    },
    handleMaterChange() {
      this.materialArray.forEach(item => {
        if (item.key == this.formLabelAlign.material_id) {
          this.formLabelAlign.material = item.value
        }
      })
    },
    production_line_id_change(vId) {
      let obj = {}
      obj = this.option1.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.production_line = item.value
          this.formLabelAlign.production_line_id = item.key
        }
      })
    },
    handleroll_typeChange() {
      this.typeoptions.forEach(item => {
        if (item.value == this.formLabelAlign.roll_type) {
          this.formLabelAlign.roll_typeid = item.key
        }
      })
    },

    handleinventory_stateChange() {
      this.kcoptions.forEach(item => {
        if (item.value == this.formLabelAlign.inventory_state) {
          this.formLabelAlign.inventory_stateid = item.key
        }
      })
    },
    handleFactoryChange() {
      this.factoryArray.forEach(item => {
        if (item.key == this.formLabelAlign.factory_id) {
          this.formLabelAlign.factory = item.value
        }
      })
    },
    //分页之对应页
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    //分页之一页多少条
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    echart_go_1(datas) {
      debugger
      console.log(datas, typeof datas)
      var need_x1 = []
      var need_y1 = [] //
      for (var i = 0; datas.length > i; i++) {
        need_x1.push(datas[i].x)
        need_y1.push(datas[i].y1.toFixed(0))
      }
      console.log(need_x1, need_y1)
      //毫米数
      var myChart2 = Echarts.init(document.getElementById('app2'), 'default') //将配置注入到html中定义的容器
      /* var option = {
        title: {
          text: '可用月份预测',
          subtext: '数据来自'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011年', '2012年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          // boundaryGap: [0, 0.01]
          min: 0,
          max: 12
        },
        yAxis: {
          type: 'category',
          //data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
          data: need_x1
        },
        series: [
          {
            name: '2012年',
            type: 'bar',
            // data: [19325, 23438, 31000, 121594, 134141, 681807]
            data: need_y1
          }
        ]
      }*/

      /* var salvProName = [
        '安徽省',
        '河南省',
        '浙江省',
        '湖北省',
        '贵州省',
        '江西省',
        '江苏省',
        '四川省',
        '云南省',
        '湖南省'
      ]
      var salvProValue = [239, 181, 154, 144, 135, 117, 74, 72, 67, 55]*/
      var salvProName = need_x1
      var salvProValue = need_y1
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      var option = {
        backgroundColor: '#003366',
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          top: '2%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function(params) {
            return params[0].name + ' : ' + params[0].value + ' 个月 '
          }
        },
        xAxis: {
          // show: false,
          name: '单位/月',
          nameTextStyle: {
            color: '#c0c3cd',
            padding: [0, -30, 30, -50],
            fontSize: 14
          },
          label: {
            show: true,
            position: 'right',
            distance: 50,
            color: '#d3ca1b'
          },
          type: 'value',
          min: 0,
          max: 12,
          textStyle: {
            color: '#fff'
          },
          axisLabel: {
            //坐标值得具体的颜色
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true
          },
          axisLine: {
            show: true, //坐标线的颜色
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: salvProName
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '12'
              }
            }
            // data: salvProValue
          }
        ],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,

            /* itemStyle: {
              normal: {
                barBorderRadius: 40,
                color: new Echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgb(57,89,255,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(46,200,207,1)'
                  }
                ]),
                label: {
                  formatter: function(params) {
                    debugger
                    return params[0].value + ' 个月 '
                  }
                }
              }
            },*/
            itemStyle: {
              normal: {
                label: {
                  show: true, //是否显示
                  position: 'right', //显示位置
                  padding: [10, 10, 45, -70],
                  color: '#d9dce5',
                  formatter: function(params) {
                    //核心部分 formatter 可以为字符串也可以是回调
                    if (params.value) {
                      //如果当前值存在则拼接
                      return '可使用:' + params.value + '个月'
                    } else {
                      //否则返回个空
                      return ''
                    }
                  }
                },
                color: '#ee8b3f' //折线颜色设置
              }
            },
            barWidth: 25,
            data: salvProValue
          } /*,
          {
            name: '背景',
            type: 'bar',
            barWidth: 20,
            barGap: '-100%',
            // data: salvProMax,
            data: 12,
            itemStyle: {
              normal: {
                color: 'rgba(24,31,68,1)',
                barBorderRadius: 30
              }
            }
          }*/
        ]
      }

      myChart2.setOption(option)
    },
    findAll() {
      post('/baseRollSafetyReminder/findBaseRollSafetyReminder', {
        pageIndex: 1,
        pageSize: 100,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
        this.echart_go_1(res.map)
        this.total = res.count
      })
    },
    resetDialogForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    },

    /**
     * description: 重置按钮
     */
    resetForm(formName) {
      this.searchInfo = {}
      this.findAll()
    }
  }
}
</script>

<style>
</style>
