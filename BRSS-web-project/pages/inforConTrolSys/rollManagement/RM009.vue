<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 600px)'"
      :page-size="10"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <!-- :table-height="'calc(100vh - 200px)'" -->
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              :inline="true"
              label-width="100px">
              <el-form-item
                label="产线"
                prop="production_line_id">
                <el-select
                  v-model="searchInfo.production_line_id"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="searchInfo.roll_no" />
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
                label="轧辊库存状态"
                prop="roll_state">
                <el-select
                  v-model="searchInfo.roll_state"
                  placeholder="请选择">
                  <el-option
                    v-for="item in roll_stateOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
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
                size="mini"
                type="primary"
                @click="open_tianjia">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="roll_no"
          label="辊号"/>
        <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          prop="material"
          label="轧辊材质"/>
        <el-table-column
          prop="factory"
          label="制造厂商"/>
        <!-- <el-table-column
          prop="frame_no"
          label="机架号"/> -->
        <!-- <el-table-column
          prop="production_line"
          label="产线"/> -->
        <el-table-column
          prop="roll_state_value"
          label="库存状态"/>
        <!--<el-table-column
          prop="roll_state"
          label="库存状态"/>-->
        <!-- <el-table-column
          show-overflow-tooltip
          prop="contract_no"
          label="合同号"/> -->
        <!--<el-table-column
          label="检测工单"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="sizeChick(scope.row)">尺寸表面工单</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="voiceChick(scope.row)">超声硬度检测工单</el-button>
          </template>
        </el-table-column>-->
        <el-table-column
          label="操作"
          min-width="300"
          align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.roll_state_value === '待使用新辊'? true:false"
              size="mini"
              type="primary"
              @click="handleOnline(scope.row)">投用</el-button>
            <el-button
              v-if="scope.row.roll_state_value === '未拆轧辊'? true:false"
              size="mini"
              type="primary"
              @click="handleQy(scope.row)">启用</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelect(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- <el-row :gutter="5">

      <el-col :span="12">
        <div class="echartHeader">各类轧辊库存</div>

        <div
          id="chartLeft"
          class="Echar-bg"
          style="margin-top: 0px;padding-bottom: 5px;height: 360px"/>
      </el-col>
      <el-col :span="12">
        <div class="echartHeader">轧辊库存综合分析</div>

        <div
          id="chartRight"
          class="Echar-bg"
          style="margin-top: 0px;padding-bottom: 5px;height: 360px"/>
      </el-col>
    </el-row>-->
    <!-- 尺寸检测工单弹窗 -->
    <el-dialog
      :visible.sync="sizeDialogVisible"
      :title="dialogTitle"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="sizeTable"
          label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label-width="180px"
                label="辊号"
                prop="roll_no">
                <el-input
                  :disabled="true"

                  v-model="sizeTable.roll_no" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="辊径直径验收最大值"
                prop="roll_typeid">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field1" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="辊身工作层最小厚度"
                prop="obearing_chock">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field14" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="辊肩硬度"
                prop="obearing_chock">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field13" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="辊径硬度最小值"
                prop="obearing_chock">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field12" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="辊径硬度最大值"
                prop="dbearing_chock">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field11" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="最小辊径辊身硬度"
                prop="roll_positionid">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field10" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="初始辊身硬度均匀性"
                prop="roll_positionid">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field9" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="初始辊身硬度最小值"
                prop="roll_positionid">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field8" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="初始辊身硬度最大值"
                prop="roll_positionid">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field7" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="扁头尺寸验收最小值"
                prop="roll_positionid">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field6" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="扁头尺寸验收最大值"
                prop="roll_positionid">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field5" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="辊肩直径最小值"
                prop="roll_positionid">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field4" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="辊肩直径最大值"
                prop="roll_positionid">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field3" />
              </el-form-item>
              <el-form-item
                label-width="180px"
                label="辊径直径验收最小值"
                prop="roll_positionid">
                <el-input
                  :disabled="true"
                  v-model="sizeTable.field2" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="sizeDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 超声硬度检测工单 -->
    <el-dialog
      :visible.sync="voiceDialogVisible"
      :title="dialogTitle"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="voiceTable"
          label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label-width="210px"
                label="辊号"
                prop="roll_no">
                <el-input
                  :disabled="true"
                  v-model="voiceTable.roll_no" />
              </el-form-item>
              <el-form-item
                label-width="210px"
                label="辊身结合层超声波缺陷最大当量"
                prop="roll_typeid">
                <el-input
                  :disabled="true"
                  v-model="voiceTable.field2" />
              </el-form-item>
              <el-form-item
                label-width="210px"
                label="辊身工作层超声波缺陷最大当量"
                prop="obearing_chock">
                <el-input
                  :disabled="true"
                  v-model="voiceTable.field1" />
              </el-form-item>
              <el-form-item
                label-width="210px"
                label="辊身芯部超声波缺陷最大当量"
                prop="obearing_chock">
                <el-input
                  :disabled="true"
                  v-model="voiceTable.field3" />
              </el-form-item>
              <el-form-item
                label-width="210px"
                label="辊径超声波缺陷最大当量"
                prop="obearing_chock">
                <el-input
                  :disabled="true"
                  v-model="voiceTable.field4" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="voiceDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 投用弹窗 -->
    <el-dialog
      :visible.sync="dialogVisibleOnline"
      :title="dialogTitle"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="formLabelAlign"
          label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="机架号"
                prop="frame_noid">
                <el-select
                  v-model="formLabelAlign.frame_noid"
                  clearable
                  placeholder="请选择"
                  @change="handleFrameNoChange">
                  <el-option
                    v-for="item in frameNoArray"
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
                  @change="handleRollTypeChange">
                  <el-option
                    v-for="item in rollTypeArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="OS座号"
                prop="obearing_chock">
                <el-input v-model="formLabelAlign.obearing_chock" />
              </el-form-item>
              <el-form-item
                label="DS座号"
                prop="dbearing_chock">
                <el-input v-model="formLabelAlign.dbearing_chock" />
              </el-form-item>
              <el-form-item
                label="上机位置"
                prop="roll_positionid">
                <el-select
                  v-model="formLabelAlign.roll_positionid"
                  clearable
                  placeholder="请选择轧辊位置"
                  @change="handleRollPositionChange">
                  <el-option
                    v-for="item in rollPositionArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="dialogVisibleOnline = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="online">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="formLabelAlign"
          label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign.roll_no" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="轧辊材质"
                prop="material_id">
                <el-select
                  v-model="formLabelAlign.material_id"
                  placeholder="请选择"
                  @change="handleMaterChange">
                  <el-option
                    v-for="item in materialArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="轧辊类型"
                prop="roll_type">
                <el-select
                  v-model="formLabelAlign.roll_type"
                  placeholder="请选择"
                  @change="handleroll_typeChange">
                  <el-option
                    v-for="item in typeoptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item
                label="制造厂商"
                prop="factory_id" >
                <el-select
                  v-model="formLabelAlign.factory_id"
                  placeholder="请选择"
                  @change="handleFactoryChange">
                  <el-option
                    v-for="item in factoryArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="库存状态"
                prop="inventory_state">
                <el-select
                  v-model="formLabelAlign.inventory_state"
                  placeholder="请选择"
                  @change="handleinventory_stateChange">
                  <el-option
                    v-for="item in kcoptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
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
          size="small"
          type="primary"
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, getDataConfig } from '@/lib/Util'
import Echarts from 'echarts'
import { rollInformation, kucunlist, rolltypelist } from '@/api/pinClipBoard' //查询接口
import TableEasy from '@/components/TasilyTableEasy'
export default {
  components: { TableEasy },
  data() {
    return {
      productionid: '',
      sizeDialogVisible: false,
      voiceDialogVisible: false,
      sizeTable: {
        roll_no: '',
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: '',
        field7: '',
        field8: '',
        field9: '',
        field10: '',
        field11: '',
        field12: '',
        field13: '',
        field14: '',
        field15: '',
        field16: ''
      }, //尺寸检测工单
      voiceTable: {
        roll_no: '',
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: '',
        field7: '',
        field8: '',
        field9: '',
        field10: '',
        field11: '',
        field12: '',
        field13: '',
        field14: '',
        field15: '',
        field16: ''
      },
      rollPositionArray: [],
      formFlag: true, // true 添加 false 编辑
      rollTypeArray: [], // 轧辊类型
      frameNoArray: [], // 机架号
      option: [],
      formInsert: {
        roll_no: '',
        roll_typeid: '',
        frame_noid: '',
        os_no: '',
        ds_no: '',
        up_location_id: ''
      },
      searchInfo: {
        production_line_id: '',
        indocno: '',
        roll_no: '',
        factory: '',
        material: '',
        roll_typeid: '',
        roll_type: '',
        frame_noid: '',
        frame_no: '',
        roll_positionid: '',
        roll_position: '',
        roll_state: '1',
        roll_state_value: '',
        contract_no: '',
        arrivetime: '',
        body_length: '',
        body_diameter: '',
        shoulder_diameter: '',
        neck_diameter: '',
        flathead_length: '',
        scrap_diameter: '',
        fchecktime: '',
        fusetime: '',
        business_scope: '',
        assetsid: '',
        assets: '',
        assetsno: '',
        assetsnote: '',
        original: '',
        networth: '',
        inventory_stateid: '',
        inventory_state: '',
        lastgrindingtime: '',
        lastuplinetime: '',
        lastlowlinetime: '',
        lastgrindingdepth: '',
        grindingcount: '',
        grindingavg: '',
        uplinecount: '',
        rollkilometer: '',
        rolltonnagetotle: '',
        rolltonnagemm: '',
        currentdiameter: '',
        scrapdiameter: '',
        scrapreason: '',
        iaccident: '',
        operateid: '',
        operatename: '',
        operatetime: '',
        confirmationid: '',
        confirmationname: '',
        confirmationtime: '',
        residualdiameter: '',
        rollshapeid: '',
        rollshape: '',
        roundness: '',
        roughness: '',
        bodyhardness: '',
        neckhardness: '',
        shoulderhardness: '',
        inspectionresults: '',
        hssuplinecount: '',
        workoilcount: '',
        framerangeid: '',
        framerange: '',
        loomingposition: '',
        loomingcount: '',
        qualityid: '',
        quality: '',
        qualityreason: '',
        createid: '',
        createname: '',
        createtime: '',
        modiid: '',
        modiname: '',
        moditime: '',
        idel: '',
        istate: ''
      },
      rules: {
        roll_no: [{ required: true, message: '请输入辊号', trigger: 'blur' }],
        factory: [
          { required: true, message: '请输入制造厂商', trigger: 'blur' }
        ],
        roll_type: [
          { required: true, message: '请输入轧辊类型', trigger: 'blur' }
        ],
        material: [{ required: true, message: '请输入材质', trigger: 'blur' }],
        roll_state: [
          { required: true, message: '请输入库存状态', trigger: 'blur' }
        ],
        contract_no: [
          { required: true, message: '请输入合同号', trigger: 'blur' }
        ]
      },
      typeoptions: [],
      roll_stateOptions: [
        {
          key: '1',
          value: '未拆轧辊'
        },
        {
          key: '2',
          value: '待使用新辊'
        }
      ],
      kcoptions: [],
      formLabelAlign: {},
      formBearing: {},
      formPush: {
        production_line_id: '',
        roll_typeid: ''
      },
      tableData: [],
      total: 0,
      dialogVisibleOnline: false,
      dialogVisible: false,
      pageIndex: 1,
      pageSize: 10,
      dialogTitle: '',
      materialArray: [],
      factoryArray: [],
      stateData: [
        { state1: '0' },
        { state2: '0' },
        { state3: '0' },
        { state4: '0' },
        { state5: '0' },
        { state6: '0' },
        { state7: '0' },
        { state8: '0' }
      ],
      optionLeft: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['2250', '1580'],
          textStyle: {
            color: '#eae8c5' //字体颜色
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            axisLabel: {
              rotate: 20,
              interval: 0 //横轴信息全部显示,
            },
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            type: 'category',
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
          }
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '2250',
            type: 'bar',
            data: [],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          },
          {
            name: '1580',
            type: 'bar',
            data: [],
            markPoint: {
              data: [
                { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                { name: '年最低', value: 0, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          }
        ]
      },
      optionRight: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          type: 'scroll',
          orient: 'vertical',
          left: 10,
          data: [
            'AKERS',
            'DAVY',
            'ESW',
            'IREL',
            'VILLARES',
            'WHAMCO',
            '共昌',
            '太钢',
            '日立',
            '江苏永昌',
            '江苏润耐特',
            '江阴润源',
            '邢台',
            '陕压',
            '鞍钢',
            '马钢联合电钢',
            '周转轧辊',
            '未拆轧辊',
            '待使用新辊',
            '送外修复',
            '待报废轧辊',
            '质量异议'
          ]
        },
        series: [
          {
            top: 55,
            name: '库存状态',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '40%'],
            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: '', name: '周转轧辊' },
              { value: '', name: '未拆轧辊' },
              { value: '', name: '待使用新辊' },
              { value: '', name: '送外修复' },
              { value: '', name: '待报废轧辊' },
              { value: '', name: '质量异议' }
            ]
          },
          {
            top: 55,
            name: '制造厂商',
            type: 'pie',
            radius: ['50%', '75%'],
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#333333',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: [
              { value: '', name: 'AKERS' },
              { value: '', name: 'DAVY' },
              { value: '', name: 'ESW' },
              { value: '', name: 'IREL' },
              { value: '', name: 'VILLARES' },
              { value: '', name: 'WHAMCO' },
              { value: '', name: '共昌' },
              { value: '', name: '太钢' },
              { value: '', name: '日立' },
              { value: '', name: '江苏永昌' },
              { value: '', name: '江苏润耐特' },
              { value: '', name: '江阴润源' },
              { value: '', name: '邢台' },
              { value: '', name: '陕压' },
              { value: '', name: '鞍钢' },
              { value: '', name: '马钢联合电钢' }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    getDataConfig('rolltype').then(res => {
      this.rollTypeArray = res
    }) // 轧辊类型
    getDataConfig('uplocation').then(res => {
      this.rollPositionArray = res // 上机位置
    })
    getDataConfig('frameteam').then(res => {
      this.frameNoArray = res
    })
    this.findAll()
    post('/dictionary/findMapV1', { dicno: 'rolltype', level: 3 }).then(res => {
      this.typeoptions = res.data
    })
    post('/dictionary/findMapV1', { dicno: 'rollstate', level: 3 }).then(
      res => {
        this.kcoptions = res.data
      }
    )
    post('/dictionary/findMapV1', { dicno: 'proline' }).then(res => {
      this.option = res.data
    })
    getDataConfig('roll_material').then(res => {
      this.materialArray = res
    })
    post('/dictionary/findMapV1', { dicno: 'roll_factory' }).then(res => {
      // console.log('轧辊材质', res)
      this.factoryArray = res.data //制造厂商
    })
    // this.findLeftEchart()
    //this.findRightEchart()
    // this.findData()
  },
  methods: {
    // 投用弹窗确认按钮
    online(data) {
      this.updateInfomation()
      this.updateState()
      this.workFlow(data)
      this.updateBearmanger()
      formFlag: true // true 添加 false 编辑
    },
    updateInfomation() {
      if (this.formLabelAlign) {
        // 编辑
        this.formLabelAlign.bearingchock_no =
          this.formLabelAlign.obearing_chock +
          '-' +
          this.formLabelAlign.dbearing_chock
        post('rollInformation/update', {
          rollInformation: this.formLabelAlign
        }).then(res => {
          if (res.status == 2000) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.findAll()
          } else {
            this.$message({
              message: '编辑失败',
              type: 'error'
            })
          }
          this.dialogVisibleOnline = false
        })
      } else {
        alert('请按照要求输入')
      }
    },
    updateBearmanger() {
      if (this.formFlag) {
        let res = post('/chockDismounting/insert', {
          chockDismounting: {
            ds_no: this.formLabelAlign.dbearing_chock,
            frame_noid: this.formLabelAlign.frame_noid,
            os_no: this.formLabelAlign.obearing_chock,
            roll_no: this.formLabelAlign.roll_no,
            roll_typeid: this.formLabelAlign.roll_typeid,
            up_location: this.formLabelAlign.roll_position,
            up_location_id: this.formLabelAlign.roll_positionid,
            snote: this.formLabelAlign.snote,
            roll_type: this.formLabelAlign.roll_type,
            production_line_id: this.formLabelAlign.production_line_id,
            production_line: this.formLabelAlign.production_line,
            frame_no: this.formLabelAlign.frame_no
            // install_location_id: this.formLabelAlign.install_location_id,
            // install_location: this.formLabelAlign.roll_positionid,
          }
        })
        if (res) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }
        this.dialogVisibleOnline = false
      }
    },
    workFlow(data) {
      let res = post('/workFlow/pushTy', {
        production_line_id: this.formPush.production_line_id,
        roll_typeid: this.formPush.roll_typeid
      })
    },

    updateState() {
      this.formLabelAlign.roll_state = 3
      this.formLabelAlign.roll_revolve = 6
      // console.log(this.formLabelAlign)
      post('/rollInformation/update', {
        rollInformation: this.formLabelAlign
      })
    },
    findLeftEchart() {
      post('rollInformation/echartsnew', {}).then(res => {
        this.optionLeft.series[0].data[0] = res.data[2250].精轧工作辊
        this.optionLeft.series[0].data[1] = res.data[2250].精轧支撑辊
        this.optionLeft.series[0].data[2] = res.data[2250].精轧立辊
        this.optionLeft.series[0].data[3] = res.data[2250].粗轧工作辊
        this.optionLeft.series[0].data[4] = res.data[2250].粗轧支撑辊
        this.optionLeft.series[0].data[5] = res.data[2250].粗轧立辊
        this.optionLeft.series[0].data[6] = res.data[2250].平整支撑辊
        this.optionLeft.series[0].data[7] = res.data[2250].平整工作辊
        this.optionLeft.series[0].data[8] = res.data[2250].双辊轧机工作辊
        this.optionLeft.series[0].data[9] = res.data[2250].夹送辊
        this.optionLeft.series[0].data[10] = res.data[2250].除磷辊
        this.optionLeft.series[0].data[11] = res.data[2250].锤头

        this.optionLeft.series[1].data[0] = res.data[1580].精轧工作辊
        this.optionLeft.series[1].data[1] = res.data[1580].精轧支撑辊
        this.optionLeft.series[1].data[2] = res.data[1580].精轧立辊
        this.optionLeft.series[1].data[3] = res.data[1580].粗轧工作辊
        this.optionLeft.series[1].data[4] = res.data[1580].粗轧支撑辊
        this.optionLeft.series[1].data[5] = res.data[1580].粗轧立辊
        this.optionLeft.series[1].data[6] = res.data[1580].平整支撑辊
        this.optionLeft.series[1].data[7] = res.data[1580].平整工作辊
        this.optionLeft.series[1].data[8] = res.data[1580].双辊轧机工作辊
        this.optionLeft.series[1].data[9] = res.data[1580].夹送辊
        this.optionLeft.series[1].data[10] = res.data[1580].除磷辊
        this.optionLeft.series[1].data[11] = res.data[1580].锤头
        // console.log(this.optionLeft.series[0].data[0])
        this.echartOption()
      })
    },
    findRightEchart() {
      post('rollInformation/echartsnew2', {}).then(res => {
        this.optionRight.series[0].data[0].value = res.data.轧辊状态.周转轧辊
        this.optionRight.series[0].data[1].value = res.data.轧辊状态.未拆轧辊
        this.optionRight.series[0].data[2].value = res.data.轧辊状态.待使用新辊
        this.optionRight.series[0].data[3].value = res.data.轧辊状态.送外修复
        this.optionRight.series[0].data[4].value = res.data.轧辊状态.待报废轧辊
        this.optionRight.series[0].data[5].value = res.data.轧辊状态.质量异议

        this.optionRight.series[1].data[0].value = res.data.制造厂商.AKERS
        this.optionRight.series[1].data[1].value = res.data.制造厂商.DAVY
        this.optionRight.series[1].data[2].value = res.data.制造厂商.ESW
        this.optionRight.series[1].data[3].value = res.data.制造厂商.IREL
        this.optionRight.series[1].data[4].value = res.data.制造厂商.VILLARES
        this.optionRight.series[1].data[5].value = res.data.制造厂商.WHAMCO
        this.optionRight.series[1].data[6].value = res.data.制造厂商.共昌
        this.optionRight.series[1].data[7].value = res.data.制造厂商.太钢
        this.optionRight.series[1].data[8].value = res.data.制造厂商.日立
        this.optionRight.series[1].data[9].value = res.data.制造厂商.江苏永昌
        this.optionRight.series[1].data[10].value = res.data.制造厂商.江苏润耐特
        this.optionRight.series[1].data[11].value = res.data.制造厂商.江阴润源
        this.optionRight.series[1].data[12].value = res.data.制造厂商.邢台
        this.optionRight.series[1].data[13].value = res.data.制造厂商.陕压
        this.optionRight.series[1].data[14].value = res.data.制造厂商.鞍钢
        this.optionRight.series[1].data[15].value =
          res.data.制造厂商.马钢联合电钢
        this.echartOption()
      })
    },
    // 图
    echartOption() {
      var myChart = Echarts.init(document.getElementById('chartLeft'), 'light') //将配置注入到html中定义的容器
      var myChart1 = Echarts.init(
        document.getElementById('chartRight'),
        'light'
      ) //将配置注入到html中定义的容器
      myChart.setOption(this.optionLeft)
      myChart1.setOption(this.optionRight)
      window.onresize = function() {
        myChart.resize()
        myChart1.resize()
      }
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
    handleMaterChange() {
      this.materialArray.forEach(item => {
        if (item.key == this.formLabelAlign.material_id) {
          this.formLabelAlign.material = item.value
        }
      })
    },
    handleFrameNoChange() {
      this.frameNoArray.forEach(item => {
        if (item.key == this.formLabelAlign.frame_noid) {
          this.formLabelAlign.frame_no = item.value
        }
      })
    },
    handleRollPositionChange() {
      this.rollPositionArray.forEach(item => {
        if (item.key == this.formLabelAlign.roll_positionid) {
          this.formLabelAlign.roll_position = item.value
        }
      })
    },
    handleRollTypeChange() {
      this.rollTypeArray.forEach(item => {
        if (item.key == this.formInsert.roll_typeid) {
          this.formInsert.roll_type = item.value
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
    async findAll() {
      let res = await post('rollInformation/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
    },
    /**
     * description: 启用事件
     */
    handleQy(data) {
      this.$confirm('启用后将无法修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('workFlow/startFlow', {
            flow_no: '202010101359579744',
            type: 'xg',
            list: [
              {
                roll_no: data.roll_no,
                production_line_id: data.production_line_id,
                roll_typeid: data.roll_typeid,
                frame_noid: data.frame_noid,
                material_id: data.material_id,
                factory_id: data.factory_id
              }
            ]
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '发起成功'
              })
            } else {
              this.$message('发起失败')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          })
        })
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
    },
    /**
     * description: 修改数据按钮
     */
    handleEdit(data) {
      this.dialogVisible = true
      this.dialogTitle = '编辑'
      this.formLabelAlign = data
      console.log(data.roll_typeid)
    },
    handleOnline(data) {
      this.dialogVisibleOnline = true
      this.formPush.roll_typeid = data.roll_typeid
      this.formPush.production_line_id = data.production_line_id
      this.formLabelAlign = data
      // console.log(data.roll_typeid)
    },
    // 尺寸表面工单
    sizeChick(val, data) {
      post('rollDetectionorder/findByNew', {
        roll_no: val.roll_no
      }).then(res => {
        if (res.data == '') {
          this.$message({
            type: 'info',
            message: '该辊未检测！'
          })
        } else {
          console.log(res.data.field1)
          this.sizeTable.field1 = res.data.field1
          this.sizeTable.field2 = res.data.field2
          this.sizeTable.field3 = res.data.field3
          this.sizeTable.field4 = res.data.field4
          this.sizeTable.field5 = res.data.field5
          this.sizeTable.field6 = res.data.field6
          this.sizeTable.field7 = res.data.field7
          this.sizeTable.field8 = res.data.field8
          this.sizeTable.field9 = res.data.field9
          this.sizeTable.field10 = res.data.field10
          this.sizeTable.field11 = res.data.field11
          this.sizeTable.field12 = res.data.field12
          this.sizeTable.field13 = res.data.field13
          this.sizeTable.field14 = res.data.field14
          this.sizeTable.field15 = res.data.field15
          this.sizeTable.roll_no = res.data.roll_no
          this.sizeDialogVisible = true
        }
      })
    },
    // 超声硬度检测工单
    voiceChick(val) {
      post('rollDimensionorder/findByNew', {
        roll_no: val.roll_no
      }).then(res => {
        if (res.data == '') {
          this.$message({
            type: 'info',
            message: '该辊未检测！'
          })
        } else {
          console.log(res.data.field1)
          this.voiceTable.field1 = res.data.field1
          this.voiceTable.field2 = res.data.field2
          this.voiceTable.field3 = res.data.field3
          this.voiceTable.field4 = res.data.field4
          this.voiceTable.field5 = res.data.field5
          this.voiceTable.field6 = res.data.field6
          this.voiceTable.field7 = res.data.field7
          this.voiceTable.field8 = res.data.field8
          this.voiceTable.field9 = res.data.field9
          this.voiceTable.field10 = res.data.field10
          this.voiceTable.field11 = res.data.field11
          this.voiceTable.field12 = res.data.field12
          this.voiceTable.field13 = res.data.field13
          this.voiceTable.field14 = res.data.field14
          this.voiceTable.field15 = res.data.field15
          this.voiceTable.roll_no = res.data.roll_no
          this.voiceDialogVisible = true
        }
      })
    },
    //打开添加弹窗
    open_tianjia() {
      this.dialogVisible = true
      this.dialogTitle = '新增'
      this.formLabelAlign = {}
    },

    /**
     * description: 弹窗确定按钮
     */
    handleSave() {
      var forms = 'addForm'
      if (this.formLabelAlign.indocno) {
        this.edit(forms)
      } else {
        // this.formLabelAlign.roll_state = 1
        this.save(forms)
      }
    },
    /**
     * description: 重置按钮
     */
    resetForm(formName) {
      this.searchInfo = {}
      this.findAll()
      console.log('重置', formName)
      this.$refs[formName].resetFields()
      console.log('重置', this.$refs[formName])
    },
    /**
     * description: 添加数据函数
     */
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('rollInformation/insert', {
            rollInformation: this.formLabelAlign
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 编辑
          post('rollInformation/update', {
            rollInformation: this.formLabelAlign
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '修改成功!'
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
    }
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
</style>
