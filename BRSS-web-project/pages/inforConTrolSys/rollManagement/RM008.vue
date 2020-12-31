<!--
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-11-10 11:17:45
 * @LastEditors: Please set LastEditors
 * @Description: 辅材仓库管理页面
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <!--第一个表-->
    <div class="layout-default-margin">
      <Table-easy
        :table-data="tableData"
        :page-size="pageSize"
        :table-height="400"
        :total="total"
        @handle-current-change="handleCurrentChange"
        @handle-size-change="handleSizeChange"
        @cell-dblclick="cellDblclick"
      >
        <template slot="TableHead">
          <el-row :gutter="10">
            <el-col :span="20">
              <el-form
                ref="ruleForm"
                :model="searchInfo1"
                :inline="true"
                label-width="80px">
                <el-form-item
                  label="辊号"
                  label-width="80px"
                  prop="roll_no">
                  <el-input v-model="searchInfo1.roll_no" />
                </el-form-item>
                <el-form-item
                  label="机架范围"
                  prop="framerangeid">
                  <el-select
                    v-model="searchInfo1.framerangeid"
                    placeholder="请选择">
                    <el-option
                      v-for="item in frameArray"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="轧辊类型"
                  prop="roll_typeid">
                  <el-select
                    v-model="searchInfo1.roll_typeid"
                    placeholder="请选择">
                    <el-option
                      v-for="item in options"
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
                  @click="findSearch">查询</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="resetForm('ruleForm')">重置</el-button>
                  <!-- <el-button
                  size="mini"
                  type="primary"
                  @click="new_add('ruleForm')">新增</el-button>-->
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
            label="机架范围"
            prop="framerange"/>
            <!--  <el-table-column
            prop="trackcount"
            label="跟踪次数"/>
          <el-table-column
            prop="checkcount"
            label="检测次数"/>
          &lt;!&ndash; <el-table-column
            prop="iblockade"
            min-width="100px"
            label="封锁辊标记"/> &ndash;&gt;
          <el-table-column
            prop="bearingchockno"
            min-width="110px"
            label="轴承座配对号"/>
          <el-table-column
            prop="lockreason"
            label="封锁原因"/>
          <el-table-column
            prop="locktime"
            label="封锁时间"/>
          <el-table-column
            prop="unlocktime"
            label="解锁时间"/>
          <el-table-column
            prop="operatename"
            label="操作人员"/>-->
        <!--  <el-table-column
            label="操作"
            min-width="240px"
            align="center">
            <template slot-scope="scope">
              &lt;!&ndash; <el-button
                size="mini"
                type="primary"
                @click="open_1(scope.row)">处理</el-button>
              <el-button
                size="small"
                type="warning"
                @click="qulity(scope.row)">质量异议</el-button>&ndash;&gt;
              <el-button
                size="mini"
                type="success"
                @click="handleBf(scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handleBf(scope.row)">报废</el-button>
            </template>
          </el-table-column>-->
        </template>
      </Table-easy>
    </div>
    <!--左右俩个表   磨削实绩上线实绩-->
    <!--  <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="main-title">磨削实绩</div>
          <Table-easy
            :table-data="tableData_01"
            :total="total_01"
            :page-size="leftPageSize"
            :table-head="false"
            :table-foot="false"
            @handle-current-change="handleCurrentChangeleft"
            @handle-size-change="handleSizeChangeleft">
            <template slot="TableBody">
              <el-table-column
                prop="roll_no"
                label="辊号"/>
              <el-table-column
                prop="roll_type"
                label="轧辊类型"/>
              <el-table-column
                prop="grind_starttime"
                label="磨削开始时间"/>
              <el-table-column
                prop="grind_endtime"
                label="磨削结束时间"/>
              <el-table-column
                prop="machine_no"
                label="磨床号"/>
              <el-table-column
                prop="before_diameter"
                label="磨前直径"/>
              <el-table-column
                prop="after_diameter"
                label="磨后直径"/>
              <el-table-column
                prop="deviation"
                label="辊形偏差"/>
              <el-table-column
                prop="diametermax"
                label="最大直径"/>
              <el-table-column
                prop="diametermin"
                label="最小直径"/>
              <el-table-column
                prop="taper"
                label="锥度"/>
              <el-table-column
                prop="roundness"
                label="圆度"/>
              <el-table-column
                prop="crack"
                label="裂纹"/>
              <el-table-column
                prop="hidden_flaws"
                label="暗伤"/>
              <el-table-column
                prop="qualifiednum"
                label="合格点数"/>
              <el-table-column
                prop="sclass"
                label="班"/>
              <el-table-column
                prop="sgroup"
                label="班组"/>
              <el-table-column
                prop="operat_user"
                label="操作人"/>
            </template>
          </Table-easy>
        </el-col>
        <el-col :span="12">
          <div class="main-title">上线实绩</div>
          <Table-easy
            :table-data="tableData_2"
            :total="total_2"
            :table-head="false"
            :page-size="rightPageSize"
            :table-foot="false"
            @handle-current-change="handleCurrentChangeright"
            @handle-size-change="handleSizeChangeright">
            <template slot="TableBody">
              <el-table-column
                prop="roll_no"
                label="辊号" />
              <el-table-column
                prop="roll_type"
                label="轧辊类型" />
              <el-table-column
                prop="frame_no"
                label="机架号" />
              <el-table-column
                prop="loomingposition"
                label="上机位置" />
              <el-table-column
                prop="rollshape"
                label="辊形" />
              <el-table-column
                prop="material"
                label="材质" />
              <el-table-column
                prop="ds_chock_no"
                label="DS侧座号" />
              <el-table-column
                prop="os_chock_no"
                label="OS侧座号" />
              <el-table-column
                prop="onlinetime"
                label="上机时间" />
              <el-table-column
                prop="offlinetime"
                label="下机时间" />
              <el-table-column
                prop="rollkilometer"
                label="轧制公里数" />
              <el-table-column
                prop="rolltonnage"
                label="轧制吨数" />
              <el-table-column
                prop="off_line_reason"
                label="下线原因" />
              <el-table-column
                label="操作"
                min-width="80"
                align="center">
              &lt;!&ndash;<template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)">轧制明细</el-button>
              </template>&ndash;&gt;
              </el-table-column>
            </template>
          </Table-easy>
        </el-col>
      </el-row>
    </div>-->

    <!--新增数据-->
    <el-dialog
      :visible.sync="diaInsertVisible1"
      title="新增辊数据"
      class="layout-dialog"

      width="60%">
      <div class="layout-search">
        <el-form
          ref="submitForm"
          :model="searchInfo_1"
          class="dialoy-form"
          label-width="90px">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="辊号:"
                label-width="100px"
                prop="roll_no">
                <el-input v-model="searchInfo_1.roll_no" />
              </el-form-item>
              <el-form-item
                label="供货商:"
                label-width="100px"
                prop="factory">
                <el-input v-model="searchInfo_1.factory" />
              </el-form-item>
              <el-form-item
                label="轧辊材质:"
                label-width="100px"
                prop="material">
                <el-input v-model="searchInfo_1.material" />
              </el-form-item>
              <el-form-item
                label="轧辊类型id"
                label-width="100px"
                prop="roll_typeid">
                <el-input v-model="searchInfo_1.roll_typeid" />
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                label-width="100px"
                prop="roll_type">
                <el-input v-model="searchInfo_1.roll_type" />
              </el-form-item>
              <el-form-item
                label="机架号id:"
                label-width="100px"
                prop="frame_noid">
                <el-input v-model="searchInfo_1.frame_noid" />
              </el-form-item>
              <el-form-item
                label="机架号"
                label-width="100px"
                prop="frame_no">
                <el-input v-model="searchInfo_1.frame_no" />
              </el-form-item>
              <!--   <el-form-item
                label="跟踪次数:"
                label-width="100px"
                prop="trackcount">
                <el-input v-model="searchInfo_1.trackcount" />
              </el-form-item>
              <el-form-item
                label="检测次数"
                label-width="100px"
                prop="checkcount">
                <el-input v-model="searchInfo_1.checkcount" />
              </el-form-item>
              <el-form-item
                label="封锁辊标记(0或者1)"
                label-width="100px"
                prop="iblockade">
                <el-input v-model="searchInfo_1.iblockade" />
              </el-form-item>
              <el-form-item
                label="轴承座配对号"
                label-width="100px"
                prop="bearingchockno">
                <el-input v-model="searchInfo_1.bearingchockno" />
              </el-form-item>
              <el-form-item
                label="封锁原因"
                label-width="100px"
                prop="lockreason">
                <el-input v-model="searchInfo_1.lockreason" />
              </el-form-item>
              <el-form-item
                label="封锁时间:"
                label-width="100px"
                prop="locktime">
                <el-input v-model="searchInfo_1.locktime" />
              </el-form-item>-->

            </el-col>
            <el-col :span="12">
              <!--  <el-form-item
                label="解锁时间:"
                label-width="100px"
                prop="unlocktime">
                <el-input v-model="searchInfo_1.unlocktime" />
              </el-form-item>
              <el-form-item
                label="操作人id:"
                label-width="100px"
                prop="operateid">
                <el-input v-model="searchInfo_1.operateid" />
              </el-form-item>
              <el-form-item
                label="操作人:"
                label-width="100px"
                prop="operatename">
                <el-input v-model="searchInfo_1.operatename" />
              </el-form-item>
              <el-form-item
                label="操作时间:"
                label-width="100px"
                prop="operatetime">
                <el-input v-model="searchInfo_1.operatetime" />
              </el-form-item>
              <el-form-item
                label="创建人id:"
                label-width="100px"
                prop="createid">
                <el-input v-model="searchInfo_1.createid" />
              </el-form-item>
              <el-form-item
                label="创建人名称:"
                label-width="100px"
                prop="createname">
                <el-input v-model="searchInfo_1.createname" />
              </el-form-item>
              <el-form-item
                label="创建时间:"
                label-width="100px"
                prop="createtime">
                <el-date-picker
                  v-model="searchInfo_1.createtime"
                  type="date"
                  placeholder="选择日期时间" />
              </el-form-item>
              <el-form-item
                label="修改人ID:"
                label-width="100px"
                prop="modiid">
                <el-input v-model="searchInfo_1.modiid" />
              </el-form-item>
              <el-form-item
                label="修改人:"
                label-width="100px"
                prop="modiname">
                <el-input v-model="searchInfo_1.modiname" />
              </el-form-item>
              <el-form-item
                label="修改时间:"
                label-width="100px"
                prop="moditime">
                <el-date-picker
                  v-model="searchInfo_1.moditime"
                  type="date"
                  width="300px"
                  placeholder="选择日期时间" />
              </el-form-item>
              <el-form-item
                label="删除标识"
                label-width="100px"
                prop="idel">
                <el-input v-model="searchInfo_1.idel" />
              </el-form-item>
              <el-form-item
                label="状态:"
                label-width="100px"
                prop="istate">
                <el-input v-model="searchInfo_1.istate" />
              </el-form-item>-->
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
          @click="handleInsert()">提 交</el-button>
        <el-button
          size="small"
          type="primary"
          @click="diaInsertVisible1 = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--修改数据-->
    <el-dialog
      :visible.sync="diaInsertVisible2"
      title="修改辊数据"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="submitForm"
          :model="xiugai"
          label-width="100px">
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="辊号:"
                label-width="100px"
                prop="roll_no">
                <el-input v-model="xiugai.roll_no" />
              </el-form-item>
              <el-form-item
                label="供货商:"
                label-width="100px"
                prop="factory">
                <el-input v-model="xiugai.factory" />
              </el-form-item>
              <el-form-item
                label="轧辊材质:"
                label-width="100px"
                prop="material">
                <el-input v-model="xiugai.material" />
              </el-form-item>
              <el-form-item
                label="轧辊类型id"
                label-width="100px"
                prop="roll_typeid">
                <el-input v-model="xiugai.roll_typeid" />
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                label-width="100px"
                prop="roll_type">
                <el-input v-model="xiugai.roll_type" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="机架号id:"
                label-width="100px"
                prop="frame_noid">
                <el-input v-model="xiugai.frame_noid" />
              </el-form-item>
              <el-form-item
                label="机架号"
                label-width="100px"
                prop="frame_no">
                <el-input v-model="xiugai.frame_no" />
              </el-form-item>
              <el-form-item
                label="跟踪次数:"
                label-width="100px"
                prop="trackcount">
                <el-input v-model="xiugai.trackcount" />
              </el-form-item>
              <el-form-item
                label="检测次数"
                label-width="100px"
                prop="checkcount">
                <el-input v-model="xiugai.checkcount" />
              </el-form-item>
              <el-form-item
                label="封锁辊标记(0或者1)"
                label-width="100px"
                prop="iblockade">
                <el-input v-model="xiugai.iblockade" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="轴承座配对号"
                label-width="100px"
                prop="bearingchockno">
                <el-input v-model="xiugai.bearingchockno" />
              </el-form-item>
              <el-form-item
                label="封锁原因"
                label-width="100px"
                prop="lockreason">
                <el-input v-model="xiugai.lockreason" />
              </el-form-item>
              <el-form-item
                label="封锁时间:"
                label-width="100px"
                prop="locktime">
                <el-input v-model="xiugai.locktime" />
              </el-form-item>
              <el-form-item
                label="解锁时间:"
                label-width="100px"
                prop="unlocktime">
                <el-input v-model="xiugai.unlocktime" />
              </el-form-item>
              <el-form-item
                label="操作人id:"
                label-width="100px"
                prop="operateid">
                <el-input v-model="xiugai.operateid" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="操作人:"
                label-width="100px"
                prop="operatename">
                <el-input v-model="xiugai.operatename" />
              </el-form-item>
              <el-form-item
                label="操作时间:"
                label-width="100px"
                prop="operatetime">
                <el-input v-model="xiugai.operatetime" />
              </el-form-item>
              <el-form-item
                label="修改时间:"
                prop="moditime">
                <el-date-picker
                  v-model="xiugai.moditime"
                  type="date"
                  placeholder="选择日期时间" />
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
          @click="handlechange()">确定</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handlechange_false()">取 消</el-button>
      </span>
    </el-dialog>

    <!--弹窗按钮-->
    <el-dialog
      :visible.sync="dialogs"
      title="处理方法"
      class="layout-dialog"
      width="30%">
      <div
        class="layout-search"
        style="text-align: center">
        <el-button
          size="mini"
          type="primary"
          @click="unlock(searchInfo_data)">解锁</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="flawDetection(searchInfo_data)">送外修复</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="openSeat(searchInfo_data)">开座</el-button>
        <el-button
          size="small"
          type="primary"
          @click="unOpenSeat(searchInfo_data)">不开座</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { rollInformation, rolltypelist } from '@/api/pinClipBoard' //查询接口 rollInformation,
import { get, post, getDataConfig } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      xiugai: [],
      tableData_01: [],
      total_01: 0,
      tableData_2: [],
      total_2: 0,
      search_roll_no: {
        roll_no: ''
      },
      searchInfo_1: {},
      searchInfo: {},
      searchInfo_data: {},
      searchInfo1: {
        //roll_state: -1
      },
      searchInfo2: {
        roll_state: 0
      },
      ro: {},
      tableData: [],
      tableDatan_0: [],
      tableDatan_click: [],
      options: [],
      dialogVisible: false,
      diaInsertVisible1: false,
      diaInsertVisible2: false,
      isIndeterminate: true,
      dialogs: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      total_1: 0,
      totalB: 0,
      leftPageIndex: 1,
      leftPageSize: 10,
      rightPageIndex: 1,
      rightPageSize: 10,
      frameArray: []
    }
  },
  mounted() {
    this.findAll()
    this.findOption()
    getDataConfig('framefw').then(res => {
      this.frameArray = res
    })
  },
  methods: {
    open_1(data) {
      this.dialogs = true
      this.searchInfo_data = data
    },
    //.送外修复
    flawDetection(data) {
      this.$confirm('要送外修复该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(data)
          // data.roll_state = 0
          data.iblockade = 1
          post('/rollAccident/repair', { rollAccident: data }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '成功!'
              })
              this.dialogs = false
              this.findAll()
              //this.findAll_1()
            }
          })
          // this.findAll1()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    //开座
    openSeat(data) {
      this.$confirm('要开座该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(data)
          // data.roll_state = 0
          data.iblockade = 1
          post('/rollAccident/pair', { rollAccident: data }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '成功!'
              })
              this.dialogs = false
              this.findAll()
              //this.findAll_1()
            }
          })
          // this.findAll1()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    //不开座
    unOpenSeat(data) {
      this.$confirm('要不开座该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(data)
          // data.roll_state = 0
          data.iblockade = 1
          post('/rollAccident/gr', { rollAccident: data }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '成功!'
              })
              this.dialogs = false
              this.findAll()
              //this.findAll_1()
            }
          })
          // this.findAll1()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    //质量异议
    qulity(data) {
      this.$confirm('要质量异议该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(data)
          // data.roll_state = 0
          data.iblockade = 1
          post('/rollAccident/mass', { rollAccident: data }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '成功!'
              })
              this.findAll()
              //this.findAll_1()
            }
          })
          // this.findAll1()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    //解锁
    async unlock(data) {
      this.$confirm('要解锁该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(data)
          data.iblockade = 1
          post('/rollAccident/unlock', { rollAccident: data }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '解锁成功!'
              })
              this.findAll()
            } else {
              this.$message('解锁失败!')
            }
            this.dialogs = false
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解锁'
          })
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
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    //查询接口
    findAll() {
      // this.searchInfo1.iblockade = 0
      /* post('rollAccident/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo1
      }).then(res => {
        this.tableData = res.data
        this.total = res.count
      })*/
      this.searchInfo1.roll_state = 7
      post('rollInformation/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo1
      }).then(res => {
        this.tableData = res.data
        this.total = res.count
      })
    },
    //报废：第1个表某行报废，放到第二个表格
    handleBf(data) {
      this.$confirm('要报废该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(data)
          // data.roll_state = 0
          data.iblockade = 1
          post('/rollAccident/scrap', { rollInformation: data }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '报废成功!'
              })
              this.findAll()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消报废'
          })
        })
    },
    formatterTableDataIndex(index) {
      var pageIndex = (this.pageIndex - 1) * this.pageSize + index + 1
      return pageIndex
    },
    //轧辊类型-下拉框数据
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.options = res.data
      })
    },
    resetForm(formName) {
      this.searchInfo1 = {}
    },
    openDialoy(val) {
      this.dialogVisible = true
    },
    // 双击表格
    cellDblclick(val) {
      this.search_roll_no.roll_no = val.roll_no

      //  this.findLeftTableData()
      // this.findRightTableData()
    },

    new_add() {
      this.diaInsertVisible1 = true
    },
    //增加
    async handleInsert() {
      console.log(this.searchInfo_1.roll_no)
      var res = await post('/rollAccident/insert', {
        rollAccident: this.searchInfo_1
      }) // 更新完成提示
      this.diaInsertVisible1 = false
      this.findAll()
    },
    //修改
    change(val) {
      console.log('nihao', val.roll_no)
      this.diaInsertVisible2 = true
      this.xiugai = val
    },
    //修改确定
    async handlechange() {
      console.log(this.xiugai.roll_no)
      var res = await post('rollAccident/update', {
        rollAccident: this.xiugai
      }) // 更新完成提示
      this.diaInsertVisible2 = false
      this.findAll()
    },
    //修改取消
    handlechange_false() {
      this.diaInsertVisible2 = false
      this.findAll()
    },

    //删除
    deel_1(data) {
      this.$confirm('要删除该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(data)
          data.indocno = 1
          post('/rollAccident/deleteOne', { indocno: data.indocno }).then(
            res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.findAll()
              }
            }
          )
          // this.findAll1()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 磨削管理
    findLeftTableData() {
      // 磨削实绩表查询
      post('rollGrinding/findByNo', {
        pageIndex: this.leftPageIndex,
        pageSize: this.pageSize,
        rollGrinding: this.search_roll_no
      }).then(res => {
        this.tableData_01 = res.data
        this.total_01 = res.count
      })
    },
    // 磨削管理页码切换
    handleCurrentChangeleft(val) {
      this.leftPageIndex = val
      this.findLeftTableData()
    },

    handleSizeChangeleft(val) {
      this.pageSize = val
      this.findLeftTableData()
    },
    /*上线实绩表查询*/
    findRightTableData() {
      /*上线实绩表查询*/
      post('/rollOnoffLine/findByPage', {
        pageIndex: this.rightPageIndex,
        pageSize: this.rightPageSize,
        condition: this.search_roll_no
      }).then(res => {
        this.tableData_2 = res.data
        this.total_2 = res.count
      })
    },
    // 上线实绩
    handleCurrentChangeright(val) {
      this.rightPageIndex = val
      this.findRightTableData()
    },
    handleSizeChangeright(val) {
      this.rightPageSize = val
      this.findRightTableData()
    }
  }
}
</script>

<style>
.main-title {
  text-align: center;
  color: #eae8c5;
  padding: 3px 0;
  background-color: #253f80;
}
</style>
