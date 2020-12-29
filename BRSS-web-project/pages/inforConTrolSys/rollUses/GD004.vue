<template>
  <div id="pdfDom">
    <div class="layout-default-margin" >
      <Table-easy
        :table-data="tableData"
        :total="total"
        :page-size="pageSize"
        :current-page="pageIndex"
        :row-class-name="setRowColor"
        index-type="index"
        @cell-click="cellClick"
        @handle-current-change="handleCurrentChange"
        @handle-size-change="handleSizeChange">
        <template slot="TableHead">
          <div :style="searchFlag ? 'height: auto;' : 'height: 35px;overflow: hidden' ">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchInfo"
              class="search-info">
              <div class="space-layout">
                <el-form-item
                  label="辊号"
                  prop="roll_no">
                  <el-input v-model="searchInfo.roll_no" />
                </el-form-item>
                <el-form-item
                  label="磨床号"
                  prop="machine_no">
                  <el-input v-model="searchInfo.machine_no" />
                </el-form-item>
                <el-form-item
                  label="轧辊类型"
                  prop="roll_typeid">
                  <el-select
                    v-model="searchInfo.roll_typeid"
                    placeholder="请选择">
                    <el-option
                      v-for="item in option"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                </el-form-item>
                <div class="btn">
                  <div class="search-ipad">
                    <i
                      :class="searchFlag ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
                      @click="searchChange"/>
                  </div>
                  <el-button
                    size="mini"
                    class="gd4-btn"
                    type="primary"
                    @click="findSearch()">查询</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    class="gd4-btn"
                    @click="resetForm('ruleForm')">重置</el-button>
                </div>
              </div>
              <div class="space-layout">
                <el-form-item
                  label="磨削开始时间"
                  label-width="97px"
                  prop="dbegin">
                  <el-date-picker
                    v-model="searchInfo.dbegin"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="开始时间"
                    @focus="resetKeyboard"/>
                </el-form-item>
                <el-form-item
                  label="磨削结束时间"
                  label-width="97px"
                  prop="dend">
                  <el-date-picker
                    v-model="searchInfo.dend"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="结束时间"
                    @focus="resetKeyboard"/>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </template>
        <template
          slot="TableBody">
          <el-table-column
            prop="roll_no"
            width="120px"
            align="center"
            label="辊号"/>
          <!-- <el-table-column
            prop="roll_type"
            label="轧辊类型"/>-->
          <el-table-column
            width="160px"
            prop="grind_starttime"
            label="磨削开始时间"/>
          <el-table-column
            width="160px"
            prop="grind_endtime"
            label="磨削结束时间"/>
          <el-table-column
            prop="machineno"
            width="70px"
            label="磨床号"/>
          <el-table-column
            prop="before_diameter"
            label="磨前直径"/>
          <el-table-column
            prop="after_diameter"
            label="磨后直径"/>
          <el-table-column
            prop=""
            label="磨削量">
            <template slot-scope="scope">
              <span>{{ scope.row.before_diameter==0||scope.row.after_diameter==0?0: (scope.row.before_diameter-scope.row.after_diameter).toFixed(3) }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="deviation"
            label="辊形偏差就是曲线误差"/>-->
          <el-table-column
            prop="curvetolerance"
            width="70px"
            label="曲线误差"/>
          <!-- <el-table-column
            prop="diametermax"
            label="最大直径"/>
          <el-table-column
            prop="diametermin"
            label="最小直径"/>
          <el-table-column
            prop="taper"
            label="锥度"/>-->
          <el-table-column
            prop="roundness"
            label="圆度"/>
          <!-- 辊形就是曲线类型-->
          <el-table-column
            prop="curvetype"
            width="160px"
            label="曲线类型（辊形）"/>
          <el-table-column
            prop="standno"
            width="170px"
            label="磨床名"/>
          <el-table-column
            prop="coaxality"
            width="120px"
            label="同心度"/>
          <el-table-column
            prop="wheelno"
            label="砂轮编码"/>
          <el-table-column
            prop="wheel_dia_start"
            label="砂轮开始直径"/>
          <el-table-column
            prop="wheel_dia_end"
            label="砂轮结束直径"/>
          <!-- <el-table-column
            prop="crack"
            width="60px"
            label="裂纹"/>
          <el-table-column
            prop="hidden_flaws"
            width="60px"
            label="暗伤"/>
          <el-table-column
            prop="qualifiednum"
            label="合格点数"/>-->
          <el-table-column
            prop="sclass"
            width="60px"
            label="班"/>
          <el-table-column
            prop="sgroup"
            width="60px"
            label="班组"/>
          <el-table-column
            prop="operator"
            label="操作人"/>


            <!-- <el-table-column
          fixed="right"
          label="操作"
          min-width="300"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDelect(scope.row)">删除</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column> -->
        </template>
      </Table-easy>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col
          :xl="12"
          :lg="24"
          class="layout-default-margin">
          <div
            id="app"
            class="left"/>
          <div style="color: #208d3a;position: absolute;left: 617px;top: 17px;float: left">
            磨前辊形差为：{{ we_xs2 }}
          </div>
        </el-col>
        <el-col
          :xl="12"
          :lg="24">
          <div
            id="app1"
            class="left"/>
            <!-- <div>
            <el-row :gutter="10">
              <el-col :span="8">
                <div
                  id="app1"
                  class="right"/>
              </el-col>
              <el-col :span="8">
                <div
                  id="app2"
                  class="right"/>
              </el-col>
              <el-col :span="8">
                <div
                  id="app3"
                  class="right"/>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row :gutter="10">
              <el-col :span="8">
                <div
                  id="app4"
                  class="right"/>
              </el-col>
              <el-col :span="8">
                <div
                  id="app5"
                  class="right"/>
              </el-col>
              <el-col :span="8">
                <div
                  id="app6"
                  class="right"/>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row :gutter="10">
              <el-col :span="8">
                <div
                  id="app7"
                  class="right"/>
              </el-col>
              <el-col :span="8">
                <div
                  id="app8"
                  class="right"/>
              </el-col>
              <el-col :span="8">
                <div
                  id="app9"
                  class="right"/>
              </el-col>
            </el-row>
          </div>-->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { get, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import Echarts from 'echarts'
import moment from 'moment'
import { formatDate, lastDayFormat } from '@/lib/FormatTime'
export default {
  components: { TableEasy },
  data() {
    return {
      htmlTitle: '页面导出PDF文件名',
      searchFlag: false,
      searchInfo: {
        dbegin: '',
        dend: ''
      },
      searchin: {
        //grinder: 1,
        roll_no: '',
        initial_date_time: ''
      },
      rules: {
        indocno: [{ required: true, message: '请输入主键', trigger: 'blur' }],
        roll_no: [{ required: true, message: '请输入辊号', trigger: 'blur' }],
        factory: [
          { required: true, message: '请输入生产厂家', trigger: 'blur' }
        ],
        material: [{ required: true, message: '请输入材质', trigger: 'blur' }],
        roll_typeid: [
          { required: true, message: '请输入轧辊类型id', trigger: 'blur' }
        ],
        roll_type: [
          { required: true, message: '请输入轧辊类型', trigger: 'blur' }
        ],
        grind_starttime: [
          { required: true, message: '请输入磨削开始时间', trigger: 'blur' }
        ],
        grind_endtime: [
          { required: true, message: '请输入磨削结束时间', trigger: 'blur' }
        ],
        machine_no: [
          { required: true, message: '请输入磨床号', trigger: 'blur' }
        ],
        before_diameter: [
          { required: true, message: '请输入磨前直径', trigger: 'blur' }
        ],
        after_diameter: [
          { required: true, message: '请输入磨后直径', trigger: 'blur' }
        ],
        deviation: [
          { required: true, message: '请输入辊形偏差', trigger: 'blur' }
        ],
        diametermax: [
          { required: true, message: '请输入最大直径', trigger: 'blur' }
        ],
        diametermin: [
          { required: true, message: '请输入最小直径', trigger: 'blur' }
        ],
        taper: [{ required: true, message: '请输入锥度', trigger: 'blur' }],
        roundness: [{ required: true, message: '请输入圆度', trigger: 'blur' }],
        crack: [{ required: true, message: '请输入裂纹', trigger: 'blur' }],
        hidden_flaws: [
          { required: true, message: '请输入暗伤', trigger: 'blur' }
        ],
        qualifiednum: [
          { required: true, message: '请输入合格点数', trigger: 'blur' }
        ],
        sclass: [{ required: true, message: '请输入班', trigger: 'blur' }],
        sgroup: [{ required: true, message: '请输入班组', trigger: 'blur' }],
        operat_user: [
          { required: true, message: '请输入操作人姓名', trigger: 'blur' }
        ],
        operat_userid: [
          { required: true, message: '请输入操作人id', trigger: 'blur' }
        ],
        createid: [
          { required: true, message: '请输入创建人id', trigger: 'blur' }
        ],
        createname: [
          { required: true, message: '请输入创建人姓名', trigger: 'blur' }
        ],
        createtime: [
          { required: true, message: '请输入创建时间', trigger: 'blur' }
        ],
        modiid: [
          { required: true, message: '请输入修改人id', trigger: 'blur' }
        ],
        modiname: [
          { required: true, message: '请输入修改人姓名', trigger: 'blur' }
        ],
        moditime: [
          { required: true, message: '请输入修改时间', trigger: 'blur' }
        ],
        idel: [{ required: true, message: '请输入删除标识', trigger: 'blur' }],
        istate: [{ required: true, message: '请输入状态', trigger: 'blur' }],
        snote: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      },
      formLabelAlign: {},
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      dialogVisible: false,
      option: [],
      rowIndex: null,
      we_xs2: ''
    }
  },
  mounted() {
    post('/dictionary/findMapV1', { dicno: 'rolltype' }).then(res => {
      this.option = res.data //轧辊类型（直接使用）
    })
    this.searchInfo.dbegin = moment()
      .subtract(50, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo.dend = moment().format('YYYY-MM-DD HH:mm:ss')
    this.findAll()
  },
  methods: {
    // 点击行信息，添加颜色标识
    setRowColor({ row, rowIndex }) {
      if (row.indocno == this.rowIndex) {
        return 'setTable-row-class-name'
      }
    },
    getPdfaa() {
      this.getPdf('pdfDom', this.htmlTitle)
    },
    // 用于控制收缩查询条件
    searchChange() {
      this.searchFlag = !this.searchFlag
    },
    // 移除移动端软键盘事件（日期时间选择器）
    resetKeyboard() {
      document.activeElement.blur()
    },
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    findAll() {
      post('rollGrindingBF/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
        this.total = res.count
        this.first_ech(res)
      })
    },
    async first_ech(data1) {
      var searchinss = {
        roll_no: data1.data[0].roll_no,
        initial_date_time: ''
      }
      if (data1.data.length) {
        this.rowIndex = data1.data[0].indocno
        // searchinss.grinder = data1.data[0].machine_no
        searchinss.initial_date_time = data1.data[0].grind_starttime

        let res1 = await post('rollDataFiles/findecharts', {
          condition: searchinss
        })

        if (res1.data == null) {
          this.we_xs2 = ''
          this.$message({
            message: '第一行查询数据为空',
            type: 'warning'
          })
          this.dr_echart1()
          //alert('无数据')
        } else {
          this.dr_echart(res1.data)
        }
      } else {
        // alert('无数据')
        this.$message({
          message: '第一行不满足查询条件，无法显示数据',
          type: 'warning'
        })
        this.dr_echart1()
      }
    },
    async cellClick(val) {
      this.rowIndex = val.indocno
      //this.searchin.grinder = val.machine_no
      this.searchin.roll_no = val.roll_no
      this.searchin.initial_date_time = val.grind_starttime

      let res1 = await post('rollDataFiles/findecharts', {
        condition: this.searchin
      })
      if (res1.data == null) {
        this.we_xs2 = ''
        this.$message({
          message: val.roll_no + '  查询数据为空',
          type: 'warning',
          duration: 2000
        })
        this.dr_echart1()
        // alert('空')
      } else {
        this.dr_echart(res1.data)
      }
    },

    /**
     * description: 删除一行数据
     */
    handleDelect(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('rollGrinding/deleteOne', { indocno: data.indocno }).then(
            res => {
              console.log('删除', res)
              if (res) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.findAll()
              }
            }
          )
          this.findAll()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /**
     * description: 修改数据按钮
     */
    handleEdit(data) {
      this.dialogVisible = true
      this.formLabelAlign = data
    },
    /**
     * description: 弹窗确定按钮
     */
    handleSave() {
      var forms = 'addForm'
      if (this.formLabelAlign.indocno) {
        this.edit(forms)
      } else {
        this.formLabelAlign.roll_state = 1
        this.save(forms)
      }
    },
    /**
     * description: 重置按钮
     */
    resetForm(formName) {
      this.searchInfo = {}
      this.findAll()
    },
    /**
     * description: 添加数据函数
     */
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('rollGrinding/insert', {
            rollGrinding: this.formLabelAlign
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.$refs[formName].resetFields()
              this.findAll()
            }
          })
          this.dialogVisible = false
        } else {
          alert('请按照要求输入')
        }
      })
    },
    /**
     * description: 编辑数据函数
     */
    edit(formName) {
      // 编辑
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 编辑
          post('rollGrinding/update', {
            rollGrinding: this.formLabelAlign
          }).then(res => {
            if (res) {
              this.findAll()
            }
          })
          this.dialogVisible = false
        } else {
          alert('请按照要求输入')
        }
      })
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    dr_echart1() {
      var myChart = Echarts.init(document.getElementById('app'), 'light') //将配置注入到html中定义的容器
      myChart.clear()
      //图2 极坐标
      var appid = ['app1']
      for (var i = 0; appid.length > i; i++) {
        var myChart = Echarts.init(document.getElementById(appid[i]), 'light') //将配置注入到html中定义的容器
        myChart.clear()
        window.onresize = function() {
          myChart.resize()
        }
      }
    },
    dr_echart(datas) {
      //图1
      var Map1 = []
      var Map2 = []
      var Map3 = []
      var Map4 = []
      var test_cha = []
      var Profile_1 = [] //由于无法保证数据有几条因此Profile_1在(磨前标准曲线图和磨后标准曲线图，横坐标相同）中都加入了，
      var Profile_2 = []
      var x_arry1 = [] //分配x轴
      var x_arry2 = []
      for (var i = 0; datas.length > i; i++) {
        if (datas[i].title == '磨前标准曲线图') {
          //不需要
          Map1 = datas[i].Map.split(',')
          //  Profile_1 = datas[i].Profile.split(',')
        }
        if (datas[i].title == '磨前辊形曲线图') {
          Map2 = datas[i].Map.split(',')
          test_cha = datas[i].Map.split(',')
          //console.log(Map2)
          // Profile_2 = datas[i].Profile.split(',')
        }
        if (datas[i].title == '磨后标准曲线图') {
          Map3 = datas[i].Map.split(',')
          //Profile_1 = datas[i].Profile.split(',')
        }
        if (datas[i].title == '磨后辊形曲线图') {
          Map4 = datas[i].Map.split(',')
          // Profile_2 = datas[i].Profile.split(',')
        }
        if (datas[i].title == '位置') {
          x_arry1 = datas[i].pos.split(',')
          // Profile_2 = datas[i].Profile.split(',')
        }
      }
      var Profile_1_max = 0
      var Profile_2_max = 0
      var x_max = 0 //获取x轴最大值
      /*  if (Profile_1) {
        Profile_1_max = Profile_1[2]
        var x1 = (Profile_1[2] - Profile_1[1]) / Profile_1[0]
        for (var i = 0; Profile_1[0] >= i; i++) {
          x_arry1.push(i * x1 + Number(Profile_1[1]))
        }
      }
      if (Profile_2) {
        Profile_2_max = Profile_2[2]
        var x2 = (Profile_2[2] - Profile_2[1]) / Profile_2[0]
        for (var i = 0; Profile_2[0] >= i; i++) {
          x_arry2.push(i * x2 + Number(Profile_2[1]))
        }
      }*/

      /* if (Profile_1_max < Profile_2_max) {
        x_max = Number(Profile_2_max)
      } else {
        x_max = Number(Profile_1_max)
      }*/
      var our_data1 = []
      this.we_xs2 = ''
      function ReverseRankingDate(data) {
        for (var i = 0; i < data.length - 1; i++) {
          for (var j = 0; j < data.length - 1 - i; j++) {
            //  console.log(Date.parse(data[j][0]))
            if (Number(data[j]) > Number(data[j + 1])) {
              var temp = data[j]
              data[j] = data[j + 1]
              data[j + 1] = temp
            }
          }
        }
        return data
      }
      our_data1 = ReverseRankingDate(test_cha)
      this.we_xs2 = (
        Number(our_data1[our_data1.length - 1]) - Number(our_data1[0])
      ).toFixed(4)
      /* console.log(
          typeof Map2[100],
          Map2[100],
          our_data1[0],
          our_data1[our_data1.length - 1]
        )*/
      //修改
      var data_line1 = [] //磨前标准曲线图
      var data_line2 = [] //磨前辊形曲线图
      var data_line3 = [] //磨后标准曲线图
      var data_line4 = [] //磨后辊形曲线图
      // console.log(Map3.length, Map2.length, Map4.length, x_arry1.length)
      for (var i = 0; Map3.length > i; i++) {
        //data_line1.push([x_arry1[i], Number(Map1[i])])
        data_line3.push([x_arry1[i], Number(Map3[i])])
      }
      for (var i = 0; Map4.length > i; i++) {
        // data_line2.push([x_arry2[i], Number(Map2[i])])
        data_line4.push([x_arry1[i], Number(Map4[i])])
      }
      // 磨前辊型的数据
      for (var i = 0; Map2.length > i; i++) {
        data_line2.push([x_arry1[i], Number(Map2[i])])
      }
      for (var i = 0; Map1.length > i; i++) {
        data_line1.push([Number(x_arry1[i]), Number(Map1[i])])
      }
      var myChart = Echarts.init(document.getElementById('app'), 'light') //将配置注入到html中定义的容器
      var option = {
        textStyle: {
          color: '#ffffff' //字体颜色
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: 'axis'
        }, //联动
        title: {
          textStyle: {
            color: '#ffffff' //字体颜色
          },
          text: '轧辊曲线(mm)',
          x: '36%'
        },
        legend: {
          textStyle: {
            color: '#87858d' //字体颜色
          },
          icon: 'circle',
          data: [
            /* '磨前标准曲线图',*/
            '磨后标准曲线图',
            '磨前辊形曲线图',
            '磨后辊形曲线图'
          ],
          top: 25
        },
        /*  dataZoom: [
          {
            type: 'inside' //鼠标缩放 详细配置可见echarts官网
          }
        ],*/
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0]
          },
          {
            type: 'inside',
            yAxisIndex: [0]
          }
        ],
        xAxis: {
          axisLine: {
            lineStyle: {
              color: '#ffffff' //坐标线颜色
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff' //坐标轴字体颜色
            }
          },
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: '#6b6464',
              width: 1,
              type: 'solid'
            }
          },
          type: 'value'
          // min: 0,
          // max: x_max
        },

        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#ffffff' //坐标线颜色
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff' //坐标轴字体颜色
            }
          },
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: '#6b6464',
              width: 1,
              type: 'solid'
            }
          }
          // type: 'value'
        },
        series: [
          /* {
            xAxisIndex: 0,
            name: '磨前标准曲线图',
            data: data_line1,
            type: 'line'
          },*/
          {
            xAxisIndex: 0,
            name: '磨后标准曲线图',
            data: data_line3,
            type: 'line',
            color: '#8d0912',
            symbol: 'none'
          },
          {
            xAxisIndex: 0,
            name: '磨前辊形曲线图',
            data: data_line2,
            color: '#d3ca1b',
            type: 'line',
            symbol: 'none'
          },
          {
            xAxisIndex: 0,
            name: '磨后辊形曲线图',
            color: '#208d3a',
            data: data_line4,
            type: 'line',
            symbol: 'none'
          }
        ]
      }

      myChart.setOption(option)
      //图2 极坐标
      var UpperArm0 = []
      var UpperArm1 = []
      var UpperArm2 = []
      var BothArms0 = []
      var BothArms1 = []
      var BothArms2 = []
      var LowerArm0 = []
      var LowerArm1 = []
      var LowerArm2 = []
      var title = ['postion0', 'postion1', 'postion2']
      var appid = ['app1']
      var names = [['上测量臂'], ['下测量臂'], ['both测量臂']]
      for (i = 0; datas.length > i; i++) {
        if (datas[i].title == '圆度曲线图') {
          UpperArm0 = datas[i].roundness.split(',')
          /* UpperArm1 = datas[i].UpperArm1.split(',')
          UpperArm2 = datas[i].UpperArm2.split(',')
          BothArms0 = datas[i].BothArms0.split(',')
          BothArms1 = datas[i].BothArms1.split(',')
          BothArms2 = datas[i].BothArms2.split(',')
          LowerArm0 = datas[i].LowerArm0.split(',')
          LowerArm1 = datas[i].LowerArm1.split(',')
          LowerArm2 = datas[i].LowerArm2.split(',')*/
        }
      }

      var UpperArm0_1 = []
      var UpperArm1_1 = []
      var UpperArm2_1 = []
      var BothArms0_1 = []
      var BothArms1_1 = []
      var BothArms2_1 = []
      var LowerArm0_1 = []
      var LowerArm1_1 = []
      var LowerArm2_1 = []
      for (i = 0; UpperArm0.length > i; i++) {
        UpperArm0_1.push(Number(UpperArm0[i]) * 1000)
      }
      /*for (i = 0; UpperArm1.length > i; i++) {
        UpperArm1_1.push(Number(UpperArm1[i]) * 1000)
      }
      for (i = 0; UpperArm2.length > i; i++) {
        UpperArm2_1.push(Number(UpperArm2[i]) * 1000)
      }
      for (i = 0; BothArms0.length > i; i++) {
        BothArms0_1.push(Number(BothArms0[i]) * 1000)
      }
      for (i = 0; BothArms1.length > i; i++) {
        BothArms1_1.push(Number(BothArms1[i]) * 1000)
      }
      for (i = 0; BothArms2.length > i; i++) {
        BothArms2_1.push(Number(BothArms2[i]) * 1000)
      }
      for (i = 0; LowerArm0.length > i; i++) {
        LowerArm0_1.push(Number(LowerArm0[i]) * 1000)
      }
      for (i = 0; LowerArm1.length > i; i++) {
        LowerArm1_1.push(Number(LowerArm1[i]) * 1000)
      }
      for (i = 0; LowerArm2.length > i; i++) {
        LowerArm2_1.push(Number(LowerArm2[i]) * 1000)
      }*/
      data_nine(UpperArm0_1, title[0], names[0], appid[0])
      /*data_nine(UpperArm0_1, title[0], names[0], appid[0])
      data_nine(LowerArm0_1, title[0], names[1], appid[1])
      data_nine(BothArms0_1, title[0], names[2], appid[2])
      data_nine(UpperArm1_1, title[1], names[0], appid[3])
      data_nine(LowerArm1_1, title[1], names[1], appid[4])
      data_nine(BothArms1_1, title[1], names[2], appid[5])
      data_nine(UpperArm2_1, title[2], names[0], appid[6])
      data_nine(LowerArm2_1, title[2], names[1], appid[7])
      data_nine(BothArms2_1, title[2], names[2], appid[8])*/

      function data_nine(data, title, name_s, app) {
        //极坐标圆度
        var values60 = []
        for (var i = 0; i < 360; i = i + 10) {
          values60.push(i)
        }
        var x_small = 0
        var x_large = 0
        for (var i = 0; data.length > i; i++) {
          if (x_small > data[i]) {
            x_small = data[i]
          }
          if (x_large < data[i]) {
            x_large = data[i]
          }
        }
        var x_largess = Number(x_large).toFixed(3)
        x_small = Number(x_small) - 5
        x_large = Number(x_large) + 5
        var myChart1 = Echarts.init(document.getElementById(app), 'light') //将配置注入到html中定义的容器
        var option1 = {
          textStyle: {
            color: '#ffffff' //字体颜色
          },
          /* title: {
            text: title + '\n 最大值:' + x_largess,
            x: '0%',
            y: '1%',
            textStyle: {
              color: '#ffffff', //字体颜色
              fontSize: 14
            }
          },*/

          legend: { show: false },
          polar: {
            center: ['60%', '50%'], //位置
            radius: ['5%', '80%'] //大小第一个内半径，第二个外半径
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          angleAxis: {
            textStyle: {
              color: '#ffffff' //字体颜色
            },
            // type: 'value',
            type: 'category',
            data: values60,
            // min: 0,
            // max: 36,
            /* minInterval: 1,
            maxInterval: '',
            splitNumber: '5',
            startAngle: 90,*/
            splitArea: {
              show: true
            }
          },
          radiusAxis: {
            textStyle: {
              color: '#ffffff' //字体颜色
            },
            min: x_small,
            max: x_large
          },
          series: [
            {
              lineStyle: {
                color: 'yellow'
              },
              coordinateSystem: 'polar',
              name: name_s,
              type: 'line',
              symbol: 'none',
              data: data,
              radius: ['30%', '50%'],
              itemStyle: {
                normal: {
                  color: '#d3ca1b',
                  lineStyle: {
                    color: '#8d0912'
                  }
                }
              }
            }
          ]
        }
        myChart1.setOption(option1)
      }
      window.onresize = function() {
        myChart.resize()
      }
    }
  }
}
</script>

<style>
.left {
  background: #1a367a;
  height: 500px;
  padding: 10px;
}
.right {
  background: #1a367a;
  height: 160px;
  margin-bottom: 10px;
}

.echart {
  height: 500px;
  width: 100%;
}
.gd4-btn {
  width: 54px;
  height: 30px;
}
</style>
