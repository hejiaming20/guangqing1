<!--
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-12-09 19:23:43
 * @LastEditors: Please set LastEditors
 * @Description: 辅材仓库管理页面
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="21">
        <Table-easy
          :page-size="pageSize"
          :current-page="pageIndex"
          :table-data="tableData"
          :total="total"
          class="rm001table"
          index-type="index"
          @handle-current-change="handleCurrentChange"
          @handle-size-change="handleSizeChange">
          <template slot="TableHead">
            <el-row>
              <el-col :span="21">
                <el-form
                  ref="ruleForm"
                  :inline="true"
                  :model="searchInfo"
                  class="search-info"
                  label-width="70px">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        label="辊号"
                        prop="roll_no">
                        <el-input v-model.trim="searchInfo.roll_no"/>
                      </el-form-item>
                      <el-form-item
                        label="制造厂商"
                        prop="factory_id">
                        <el-select
                          v-model="searchInfo.factory_id"
                          placeholder="请选择">
                          <el-option
                            v-for="item in option_1"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="轧辊类型"
                        轧辊类型
                        prop="roll_typeid">
                        <el-select
                          v-model="searchInfo.roll_typeid"
                          placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="合同号"
                        prop="contract_no">
                        <el-input v-model.trim="searchInfo.contract_no"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="轧辊材质"
                        prop="material_id">
                        <el-select
                          v-model="searchInfo.material_id"
                          placeholder="请选择">
                          <el-option
                            v-for="item in option_2"
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
                          placeholder="请选择">
                          <el-option
                            v-for="item in frameArray"
                            :key="item.key"
                            :label="item.value"
                            :value="item.value"/>
                        </el-select>
                        <!-- <el-input v-model="searchInfo.frame_no"/> -->
                      </el-form-item>
                    </el-col>

                  </el-row>



                </el-form>
              </el-col>
              <el-col :span="3">
                <div class="btn">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="findSearch">查询
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="resetForm('ruleForm')">重置
                  </el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="open_add_1()">添加</el-button>
                </div>
              </el-col>
            </el-row>
          </template>
          <template slot="TableBody">
            <el-table-column
              prop="roll_no"
              width="120px"
              label="辊号"/>
            <el-table-column
              prop="roll_type"
              width="130"
              label="轧辊类型"/>
            <el-table-column
              prop="roll_state_value"
              width="80"
              label="库存状态"/>
            <!--  <el-table-column
              prop="roll_revolve_value"
              width="80"
              label="周转状态"/>-->
            <el-table-column
              v-for="(item, index) in arr"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="item.prop == 'ifok'">{{ scope.row[item.prop]== 1 ? '合格' : (scope.row[item.prop]== 0 ?'不合格':'') }}</span>
                <span v-if="item.prop == 'zb_ifok'">{{ scope.row[item.prop]== 1 ? '合格' : (scope.row[item.prop]== 0 ?'不合格':'') }}</span>
                <span v-if="item.prop !== 'checkorderid' && item.prop !== 'ifok'&&item.prop !== 'zb_ifok'" >{{ scope.row[item.prop] }}</span>
                <el-button
                  v-if="item.prop == 'checkorderid'"
                  size="mini"
                  type="primary"
                  @click="findcheck(scope.row[item.prop])">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="190"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleEdit(scope.row)">修改
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelect(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </template>
        </Table-easy>
      </el-col>
      <el-col :span="3">
        <!-- 检索区 -->
        <div class="right-box layout-block">
          <el-checkbox
            v-model="checkAll"
            @change="handleCheckAllChange">全选
          </el-checkbox>
          <div style="height: 20px"/>
          <el-checkbox
            v-for="(columns, index) in tableColumns"
            v-model="columns.checkFg"
            :key="index"
            @change="checkboxChange(columns,'1')">{{ columns.label }}
          </el-checkbox>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="5">

      <el-col :span="12">
        <div class="echartHeader">工作层统计</div>

        <div
          id="chartLeft"
          class="Echar-bg"
          style="margin-top: 0px;padding-bottom: 5px;height: 330px"/>
      </el-col>
      <el-col :span="12">
        <div class="echartHeader">成本数据分布</div>

        <div
          id="chartRight"
          class="Echar-bg"
          style="margin-top: 0px;padding-bottom: 5px;height: 330px"/>
      </el-col>
    </el-row> -->
    <!-- 修改记录 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign"
          label-position="top">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign.roll_no" />
              </el-form-item>
              <el-form-item
                label="制造厂商"
                prop="factory_id"
                @change="handleFactoryChange">
                <el-select
                  v-model="formLabelAlign.factory_id"
                  clearable
                  placeholder="请选择">
                  <el-option
                    v-for="item in option_1"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊材质"
                prop="material_id">
                <el-select
                  v-model="formLabelAlign.material_id"
                  clearable
                  placeholder="请选择"
                  @change="handlematerialChange">
                  <el-option
                    v-for="item in option_2"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_typeid">
                <el-select
                  v-model="formLabelAlign.roll_typeid"
                  placeholder="请选择"
                  clearable
                  @change="handleRollTypeChange">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"
                    clearable/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="报废直径"
                prop="scrap_diameter">
                <el-input v-model="formLabelAlign.scrap_diameter" />
              </el-form-item>
              <el-form-item
                label="检测是否合格"
                prop="ifok">
                <!--  <el-input v-model="formLabelAlign.ifok" />-->
                <el-select
                  v-model="formLabelAlign.ifok"
                  clearable
                  placeholder="请选择检测状态">
                  <el-option
                    v-for="item in okOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="业务范围"
                prop="business_scope">
                <el-input v-model="formLabelAlign.business_scope" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="到货责任人"
                prop="arriveuser">
                <el-input v-model="formLabelAlign.arriveuser" />
              </el-form-item>
              <el-form-item
                label="到货辊身硬度最大值"
                prop="arrivebodyhardnessmax">
                <el-input v-model="formLabelAlign.arrivebodyhardnessmax" />
              </el-form-item>
              <el-form-item
                label="到货辊身硬度最小值"
                prop="arrivebodyhardnessmin">
                <el-input v-model="formLabelAlign.arrivebodyhardnessmin" />
              </el-form-item>
              <el-form-item
                label="到货辊径硬度最大值"
                prop="arrivediameterhardnessmax">
                <el-input v-model="formLabelAlign.arrivediameterhardnessmax" />
              </el-form-item>
              <el-form-item
                label="到货辊径硬度最小值"
                prop="arrivediameterhardnessmin">
                <el-input v-model="formLabelAlign.arrivediameterhardnessmin" />
              </el-form-item>
              <el-form-item
                label="到货日期"
                prop="arrivetime">
                <!-- <el-input v-model="formLabelAlign.arrivetime" /> -->
                <el-date-picker
                  v-model="formLabelAlign.arrivetime"
                  value-format="yyyy-MM-dd"
                  clearable
                  type="date"
                  placeholder="选择日期"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="机架范围"
                prop="framerangeid">
                <el-select
                  v-model="formLabelAlign.framerangeid"
                  placeholder="请选择"
                  clearable
                  @change="handleFrameChange">
                  <el-option
                    v-for="item in frameArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="订货年"
                prop="order_year">
                <el-input v-model="formLabelAlign.order_year" />
              </el-form-item>
              <el-form-item
                label="结算类型"
                prop="settlement_type">
                <el-input v-model="formLabelAlign.settlement_type" />
              </el-form-item>
              <el-form-item
                label="单价"
                prop="price">
                <el-input
                  v-model="formLabelAlign.price"
                  placeholder="请输入数字"
                  onkeyup="value=value.replace(/[^\d^\.]/g,'')" />
              </el-form-item>
              <el-form-item
                label="理论直径"
                prop="theorydiameter">
                <el-input
                  v-model="formLabelAlign.theorydiameter"
                  placeholder="请输入数字"
                  onkeyup="value=value.replace(/[^\d^\.]/g,'')" />
              </el-form-item>
              <el-form-item
                label="报废日期"
                prop="scrapdate">
                <!-- <el-input v-model="formLabelAlign.scrapdate" /> -->
                <el-date-picker
                  v-model="formLabelAlign.scrapdate"
                  clearable
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="账目情况（0或者1）"
                prop="account">
                <el-input v-model="formLabelAlign.account" />
              </el-form-item>
              <el-form-item
                label="毫米单价"
                prop="mmprice">
                <el-input
                  v-model="formLabelAlign.mmprice"
                  placeholder="请输入数字"
                  onkeyup="value=value.replace(/[^\d^\.]/g,'')" />
              </el-form-item>
              <el-form-item
                label="出厂制品号"
                prop="productno">
                <el-input v-model="formLabelAlign.productno" />
              </el-form-item>
              <!-- <el-form-item
                label="轧辊状态"
                prop="roll_state">
                <el-input v-model="formLabelAlign.roll_state" />
              </el-form-item>-->
              <el-form-item
                label="报废责任人"
                prop="scrapuser">
                <el-input v-model="formLabelAlign.scrapuser" />
              </el-form-item>
              <el-form-item
                label="报废原因"
                prop="scrapreason">
                <el-input v-model="formLabelAlign.scrapreason" />
              </el-form-item>
              <el-form-item
                label="合同号"
                prop="contract_no">
                <el-input v-model="formLabelAlign.contract_no" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 检测报告有数据 -->
    <el-dialog
      :visible.sync="dialogFindCheckHave"
      title="无钢卷数据"
      class="layout-dialog"
      width="90%"/>

  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { rollInformation, kucunlist, rolltypelist } from '@/api/pinClipBoard' //查询接口
import Echarts from 'echarts'
import { get, post, getDataConfig } from '@/lib/Util'

export default {
  components: {
    TableEasy
  },
  data() {
    return {
      formFlag: true, // true 添加 false 编辑
      dialogTitle: '',
      testCh: false,
      searchInfo: {},
      tableData: [],
      options: [],
      option_1: [],
      option_2: [],
      dialogVisible: false,
      dialogFindCheckHave: false,
      checkAll: false,
      columnsArray: [],
      arr: [],
      tableColumns: [
        {
          label: '制造厂商',
          prop: 'factory',
          checkFg: true,
          width: 80
        },
        {
          label: '机架号',
          prop: 'frame_no',
          checkFg: true,
          width: 80
        },
        {
          label: '轧辊位置',
          prop: 'roll_position',
          checkFg: true,
          width: 80
        },
        {
          label: '合同号',
          prop: 'contract_no',
          checkFg: true,
          width: '150px'
        },
        {
          label: '订货年',
          prop: 'order_year',
          checkFg: true,
          width: 80
        },
        {
          label: '结算类型',
          prop: 'settlement_type',
          checkFg: true,
          width: 80
        },
        {
          label: '单价',
          prop: 'price',
          checkFg: true,
          width: 80
        },
        {
          label: '工作层',
          prop: 'work_layer',
          checkFg: true,
          width: 80
        },
        {
          label: '账目情况',
          prop: 'account',
          checkFg: true,
          width: 80
        },
        {
          label: '毫米单价',
          prop: 'mmprice',
          checkFg: true,
          width: 80
        },
        {
          label: '出厂制品号',
          prop: 'productno',
          checkFg: true,
          width: 100
        },
        {
          label: '到货日期',
          prop: 'arrivetime',
          checkFg: false,
          width: '150px'
        },
        {
          label: '到货责任人',
          prop: 'arriveuser',
          checkFg: false,
          width: 120
        },
        {
          label: '报废直径',
          prop: 'scrap_diameter',
          checkFg: false,
          width: 80
        },
        {
          label: '投用日期',
          prop: 'fusetime',
          checkFg: false,
          width: '150px'
        },
        {
          label: '报废日期',
          prop: 'scrapdate',
          checkFg: false,
          width: '150px'
        },
        {
          label: '报废原因',
          prop: 'scrapreason',
          checkFg: false,
          width: '100px'
        },
        {
          label: '报废责任人',
          prop: 'scrapuser',
          checkFg: false,
          width: 80
        },
        {
          label: '理论直径',
          prop: 'theorydiameter',
          checkFg: false,
          width: 80
        },
        {
          label: '剩余直径',
          prop: 'scrapreason',
          checkFg: false,
          width: 80
        },
        {
          label: '业务范围',
          prop: 'business_scope',
          checkFg: false,
          width: 80
        },
        {
          label: '到货辊身硬度最大值',
          prop: 'arrivebodyhardnessmax',
          checkFg: false,
          width: 180
        },
        {
          label: '到货辊身硬度最小值',
          prop: 'arrivebodyhardnessmin',
          checkFg: false,
          width: 180
        },
        {
          label: '到货辊径硬度最大值',
          prop: 'arrivediameterhardnessmax',
          checkFg: false,
          width: 180
        },
        {
          label: '到货辊径硬度最小值',
          prop: 'arrivediameterhardnessmin',
          checkFg: false,
          width: 180
        },
        {
          label: '检测报告',
          prop: 'checkorderid',
          checkFg: false,
          width: 80
        },
        {
          label: '包装是否合格',
          prop: 'ifok',
          checkFg: false,
          width: 80
        },
        {
          label: '核对质保书是否合格',
          prop: 'zb_ifok',
          checkFg: false,
          width: '150px'
          /* <span >{{ scope.row.zb_ifok=="0" ? "不合格" :"合格" }}</span>*/
        }
      ],
      isIndeterminate: true,
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      formLabelAlign: {},
      frameArray: [],
      okOptions: [
        {
          value: 0,
          label: '不合格'
        },
        {
          value: 1,
          label: '合格'
        }
      ],
      flag: true
    }
  },
  mounted() {
    this.findAll()
    this.findOption()
    // this.echartOption()
  },
  methods: {
    // 玫瑰图
    echartOption() {
      var optionLeft = {
        // title: {
        //   text: '工作层统计',
        //   left: 'center',
        //   textStyle: {
        //     color: '#eae8c5' //字体颜色
        //   }
        // },
        tooltip: {
          trigger: 'item',
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 10,
          top: 10,
          // bottom: 500,
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          top: 'bottom',
          data: [
            '精轧工作辊',
            '精轧支撑辊',
            '精轧立辊',
            '粗轧工作辊',
            '粗轧支撑辊',
            '粗轧立辊',
            '平整支撑辊',
            '平整工作辊',
            '双辊轧机工作辊',
            '夹送辊',
            '除磷辊',
            '锤头'
          ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '面积模式',
            left: 'center',

            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 10, name: '精轧工作辊' },
              { value: 5, name: '精轧支撑辊' },
              { value: 15, name: '精轧立辊' },
              { value: 25, name: '粗轧工作辊' },
              { value: 20, name: '粗轧支撑辊' },
              { value: 35, name: '粗轧立辊' },
              { value: 30, name: '平整支撑辊' },
              { value: 40, name: '平整工作辊' },
              { value: 45, name: '双辊轧机工作辊' },
              { value: 20, name: '夹送辊' },
              { value: 10, name: '除磷辊' },
              { value: 20, name: '锤头' }
            ]
          }
        ]
      }
      var optionRight = {
        // title: {
        //   text: '成本数据分布',
        //   left: 'center',
        //   textStyle: {
        //     color: '#eae8c5' //字体颜色
        //   }
        // },
        legend: {
          top: 20,
          type: 'scroll',
          left: 'left',
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          data: [
            '精轧工作辊',
            '精轧支撑辊',
            '精轧立辊',
            '粗轧工作辊',
            '粗轧支撑辊',
            '粗轧立辊',
            '平整支撑辊',
            '平整工作辊',
            '双辊轧机工作辊',
            '夹送辊',
            '除磷辊',
            '锤头'
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          name: '单价',
          nameLocation: 'center',
          axisLine: {
            lineStyle: {
              color: '#eae8c5' //坐标线颜色
            }
          },
          type: 'value',
          boundaryGap: false
        },
        yAxis: {
          name: '毫米单价',
          nameLocation: 'center',
          axisLine: {
            lineStyle: {
              color: '#eae8c5' //坐标线颜色
            }
          },
          type: 'value'
        },
        series: [
          {
            name: '精轧工作辊',
            symbolSize: 5,
            data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [6.0, 7.24],
              [4.0, 4.26],
              [12.0, 10.84],
              [7.0, 4.82],
              [5.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '精轧支撑辊',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '精轧立辊',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '粗轧工作辊',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '粗轧支撑辊',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '粗轧立辊',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '平整支撑辊',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '平整工作辊',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '双辊轧机工作辊',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '夹送辊',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '除磷辊',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '锤头',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          }
        ]
      }
      var myChart = Echarts.init(document.getElementById('chartLeft'), 'light') //将配置注入到html中定义的容器
      var myChart1 = Echarts.init(
        document.getElementById('chartRight'),
        'light'
      ) //将配置注入到html中定义的容器
      myChart.setOption(optionLeft)
      myChart1.setOption(optionRight)
      window.onresize = function() {
        myChart.resize()
        myChart1.resize()
      }
    },
    handlematerialChange() {
      this.option_2.forEach(item => {
        if (item.key == this.formLabelAlign.material_id) {
          this.formLabelAlign.material = item.value
        }
      })
    },
    handleFactoryChange() {
      this.option_1.forEach(item => {
        if (item.key == this.formLabelAlign.factory_id) {
          this.formLabelAlign.factory = item.value
        }
      })
    },
    handleRollTypeChange() {
      this.options.forEach(item => {
        if (item.key == this.formLabelAlign.roll_typeid) {
          this.formLabelAlign.roll_type = item.value
        }
      })
    },
    handleFrameChange() {
      this.frameArray.forEach(item => {
        if (item.key == this.formLabelAlign.framerangeid) {
          this.formLabelAlign.framerange = item.value
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
    //筛选条件
    checkboxChange(item, num) {
      this.$nextTick(() => {
        this.flag = false
      })
      this.flag = true
      if (num == 1) {
        if (item.checkFg) {
          this.arr.push(item)
        } else {
          this.arr.forEach((val, index) => {
            if (val.label === item.label) {
              this.arr.splice(index, 1)
            }
          })
        }
      } else if (num == 2) {
        item.forEach((val, index, arr) => {
          if (val.checkFg) {
            this.arr.push(val)
          }
        })
      }
    },
    // 查询
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    //查询接口
    findAll() {
      post(rollInformation, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        console.log('所有参数', res)
        /* res.data.forEach((val, index, arr) => {
          val.ifok = val.ifok == 1 ? '合格' : '不合格'
          val.zb_ifok = val.zb_ifok == 1 ? '合格' : '不合格'
        })*/
        this.tableData = res.data
        this.total = res.count
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.findAll()
    },
    //全选Btn
    handleCheckAllChange() {
      if (this.checkAll == true) {
        this.checkAll = true
        for (const item of this.tableColumns) {
          item.checkFg = true
          this.arr.push(item)
        }
        console.log(this.arr)
      } else {
        this.checkAll = false
        for (const item of this.tableColumns) {
          item.checkFg = false
          this.arr.splice(item)
        }
      }
    },
    //轧辊类型-下拉框数据
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.options = res.data
      })
      post('/dictionary/findMapV1', { dicno: 'roll_factory' }).then(res => {
        this.option_1 = res.data //制造厂商
      })
      post('/dictionary/findMapV1', { dicno: 'roll_material' }).then(res => {
        this.option_2 = res.data //材质
      })
      this.checkboxChange(this.tableColumns, '2')

      getDataConfig('framefw').then(res => {
        this.frameArray = res
      })
    },
    findKucun() {
      post(kucunlist, {
        dicno: 'kcstate'
      }).then(res => {
        console.log('findOption', res)
        this.kucun = res.data
      })
    },

    findcheck(val) {
      console.log('查看', val)
      if (val == null) {
        this.$message('无钢卷信息')
      } else {
        this.dialogFindCheckHave = true
      }
    },

    //打开添加车床弹窗
    open_add_1() {
      this.dialogVisible = true
      this.dialogTitle = '新增'
      this.formLabelAlign = {}
      this.formFlag = true
    },

    /*handleEdit(data) {
      this.dialogVisible = true
      this.dialogTitle = '编辑'
      this.formLabelAlign = Object.assign({}, data)
      this.formFlag = false
    },*/

    // 编辑弹窗
    handleEdit(val) {
      this.dialogVisible = true
      this.dialogTitle = '编辑'
      this.formLabelAlign = val
      this.formFlag = false
    },

    submit() {
      if (this.formFlag) {
        // 编辑
        post('rollInformation/insert', {
          rollInformation: this.formLabelAlign
        }).then(res => {
          if (res) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.findAll()
          }
        })
        this.dialogVisible = false
      } else {
        // 编辑
        post('rollInformation/update', {
          rollInformation: this.formLabelAlign
        }).then(res => {
          if (res) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.findAll()
          }
        })
        this.dialogVisible = false
      }
    },
    handleDelect(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('rollInformation/deleteOne', { indocno: data.indocno }).then(
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
    }

    /*// 编辑确定按钮
     submit() {
      console.log(this.formLabelAlign)
      if (this.formLabelAlign) {
        // 编辑
        post('rollInformation/update', {
          rollInformation: this.formLabelAlign
        }).then(res => {
          if (res) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.findAll()
          }
        })
        this.dialogVisible = false
      } else {
        alert('请按照要求输入')
      }
    }*/
  }
}
</script>

<style>
.echartHeader {
  height: 30px;
  margin-top: 10px;
  margin-bottom: 1px;
  text-align: center;
  background-color: #253f80;
  color: #ffffff;
  font-weight: 900;
  font-size: 17px;
}
.right-box {
  height: calc(100vh - 75px);
  /* height: calc(100vh - 435px);
  max-height: calc(100vh - 435px); */
  max-height: calc(100vh - 75px);
  box-sizing: border-box;
  overflow-y: scroll;
}
.right-box::-webkit-scrollbar {
  display: block;
}
.right-box .el-checkbox {
  display: block;
}
.rm001table .el-table__body-wrapper {
  overflow: auto;
  height: 740px;
  /* height: 380px; */
}
</style>
