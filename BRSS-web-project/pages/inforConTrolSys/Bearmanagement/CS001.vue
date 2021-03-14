<!--
 * @Author: ming
 * @Date: 2020-08-17
 * @LastEditTime: 2020-11-28 10:59:44
 * @LastEditors: Please set LastEditors
 * @Description: 在役轴承座综合台账  未改完
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys/Bearmanagement/CS001
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total ="total"
      :table-height="450"
      :page-size="pageSize"
      :row-class-name="setRowColor"
      :cell-class-name="setCellStyle"
      :current-page="pageIndex"
      index-type="index"
      @row-click="dbcick"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <!-- 头页面 -->
      <template slot="TableHead">
        <el-row>
          <el-col :span="21">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchquery"
              class="search-info"
              label-width="60px">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="searchquery.roll_no" />
              </el-form-item>
              <!--   <el-form-item
                label="轴承座状态"
                label-width="90"
                prop="istatus">
                <el-select
                  v-model="searchquery.istatus"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option3"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>-->
              <el-form-item
                label="轴承座号"
                label-width="80"
                prop="chock_no">
                <el-input v-model="searchquery.chock_no" />
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                label-width="80"
                prop="roll_typeid">
                <el-select
                  v-model="searchquery.roll_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option2"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="是否报废"
                label-width="100"
                prop="ifdiscard">
                <el-select
                  v-model="searchquery.ifdiscard"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <!-- <el-form-item
                label="产线"
                prop="production_line_id">
                <el-select
                  v-model="searchquery.production_line_id"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option1"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>-->
              <!-- <el-col :span="6">
                <el-form-item
                  label="轴承座状态"
                  label-width="100px"
                  prop="Bear_con">
                  <el-input
                    v-model="searchquery.Bear_con"/>
                </el-form-item>
              </el-col>-->
            </el-form>
          </el-col>
          <el-col :span="3">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="find_data()">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="dialogVisible = true">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <!-- 页面 -->
      <template slot="TableBody">
        <el-table-column
          label="轴承座号"
          align="center"
          min-width="100px"
          prop="chock_no" />
        <el-table-column
          label="辊号"
          align="center"
          min-width="100px"
          prop="roll_no" />
        <el-table-column
          label="厂家"
          align="center"
          min-width="70px"
          prop="factory_name" />
        <!-- <el-table-column
          label="轧辊类型"
          align="center"
          min-width="100px"
          prop="roll_type" />-->
        <el-table-column
          label="安装位置"
          align="center"
          min-width="80px"
          prop="install_location" />
        <!--<el-table-column
          label="机架号"
          align="center"
          min-width="80px"
          prop="frame_no" />-->
        <el-table-column
          label="上机位置"
          align="center"
          min-width="90px"
          prop="up_location" />
        <!--  <el-table-column
          label="轴承类型"
          align="center"
          min-width="100px"
          prop="bearing_type" />-->
        <!-- <el-table-column
          label="轴承承载区"
          align="center"
          min-width="100px"
          prop="workface" />
        <el-table-column
          label="轴承座状态"
          align="center"
          min-width="120px"
          prop="status" />-->
        <el-table-column
          label="第一次投用时间"
          align="center"
          min-width="140px"
          prop="usetime" />
        <!-- <el-table-column
          label="报废时间"
          align="center"
          min-width="120px"
          prop="scraptime" />-->





        <el-table-column
          width="80px"
          label="单次累计时间(d)"
          prop="single_times" />
        <el-table-column
          label="间隔时间(d)"
          prop="interval_times" />
        <el-table-column
          label="提醒处理次数"
          prop="reminder_times" />
        <el-table-column
          label="总累计时间(d)"
          prop="total_times" />
        <el-table-column
          label="报废提醒时间(d)"
          prop="discard_times" />
        <el-table-column
          label="报废时间"
          prop="discard_time" />






        <!-- <el-table-column
          label="剩余换区时间"
          align="center"
          min-width="120px"
          prop="lasttime" />
        <el-table-column
          label="检测报告"
          align="center"
          min-width="120px"
          prop="reports" />-->
        <!-- <el-table-column
          label="检测结果"
          align="center"
          min-width="120px"
          prop="results" />-->
        <el-table-column
          label="操作"
          min-width="390"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click.stop="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="warning"
              @click.stop="baofei(scope.row)">报废</el-button>
            <el-button
              size="mini"
              type="warning"
              @click.stop="baofei_off(scope.row)">取消报废</el-button>
            <el-button
              size="mini"
              type="warning"
              @click.stop="kong(scope.row)">单次提醒置空</el-button>
            <el-button
              size="mini"
              type="danger"
              @click.stop="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 添加 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="添加"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign"
          label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="轴承座号"
                prop="chock_no">
                <el-input v-model="formLabelAlign.chock_no" />
              </el-form-item>
              <!-- <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign.roll_no" />
              </el-form-item>-->
              <!--<el-form-item
                label="轧辊类型"
                prop="roll_typeid">
                <el-select
                  v-model="formLabelAlign.roll_typeid"
                  placeholder="请选择"
                  @change="roll_typeid_change">
                  <el-option
                    v-for="item in option2"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>-->
              <!--<el-form-item
                label="产线"
                prop="production_line_id">
                <el-select
                  v-model="formLabelAlign.production_line_id"
                  placeholder="请选择"
                  @change="production_line_id_change">
                  <el-option
                    v-for="item in option1"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>-->
              <!-- <el-form-item
                label="机架号"
                prop="frame_noid">
                <el-select
                  v-model="formLabelAlign.frame_noid"
                  placeholder="请选择"
                  @change="frame_noid_change">
                  <el-option
                    v-for="item in option"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>-->
              <el-form-item
                label="安装位置"
                prop="install_location">
                <el-select
                  v-model="formLabelAlign.install_location"
                  placeholder="请选择"
                  @change="install_location_id_change1_tian">
                  <el-option
                    v-for="item in option4"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="厂家"
                prop="factory_name">
                <el-select
                  v-model="formLabelAlign.factory_name"
                  placeholder="请选择"
                  @change="istatus_change">
                  <el-option
                    v-for="item in option3"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- <el-form-item
                label="轴承座状态"
                prop="istatus">
                <el-select
                  v-model="formLabelAlign.istatus"
                  placeholder="请选择"
                  @change="istatus_change">
                  <el-option
                    v-for="item in option3"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>-->
              <el-form-item
                label="上机位置"
                prop="up_location_id">
                <el-select
                  v-model="formLabelAlign.up_location_id"
                  placeholder="请选择"
                  @change="up_location_id_change">
                  <el-option
                    v-for="item in option5"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <!-- <el-form-item
                label="轴承类型"
                prop="bearing_type">
                <el-input v-model="formLabelAlign.bearing_type" />
              </el-form-item>-->
              <!-- <el-form-item
                label="轴承承载区"
                prop="workface">
                <el-input v-model="formLabelAlign.workface" />
              </el-form-item>-->
              <el-form-item
                label="第一次投用时间"
                prop="usetime">
                <el-date-picker
                  v-model="formLabelAlign.usetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="投用时间"/>
              </el-form-item>
              <el-form-item
                label="报废时间"
                prop="scraptime">
                <el-date-picker
                  v-model="formLabelAlign.scraptime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="报废时间"/>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item
                label="间隔时间(d)"
                prop="interval_times">
                <el-input v-model="formLabelAlign.interval_times" />
              </el-form-item>
              <el-form-item
                label="报废提醒时间(d)"
                prop="discard_times">
                <el-input v-model="formLabelAlign.discard_times" />
              </el-form-item>
              <!-- <el-form-item
                label="轴承类型"
                prop="bearing_type">
                <el-input v-model="formLabelAlign_left.bearing_type" />
              </el-form-item>-->
              <el-form-item
                label="备注"
                prop="snote">
                <el-input v-model="formLabelAlign.snote" />
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
    <!-- 修改窗口 -->
    <el-dialog
      :visible.sync="dialogVisible1"
      title="修改"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign1"
          label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="轴承座号"
                prop="chock_no">
                <el-input v-model="formLabelAlign1.chock_no" />
              </el-form-item>
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign1.roll_no" />
              </el-form-item>
              <!-- <el-form-item
                label="轧辊类型"
                prop="roll_type">
                <el-select
                  :disabled="true"
                  v-model="formLabelAlign1.roll_type"
                  placeholder="请选择"
                  @change="roll_typeid_change1">
                  <el-option
                    v-for="item in option2"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>-->
              <el-form-item
                label="厂家"
                prop="factory_name">
                <el-select
                  v-model="formLabelAlign1.factory_name"
                  placeholder="请选择"
                  @change="istatus_change1">
                  <el-option
                    v-for="item in option3"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <!-- <el-form-item
                label="产线"
                prop="production_line">
                <el-select
                  v-model="formLabelAlign1.production_line"
                  placeholder="请选择"
                  @change="production_line_id_change1">
                  <el-option
                    v-for="item in option1"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>-->
              <!--  <el-form-item
                label="机架号"
                prop="frame_no">
                <el-select
                  :disabled="true"
                  v-model="formLabelAlign1.frame_no"
                  placeholder="请选择"
                  @change="frame_noid_change1">
                  <el-option
                    v-for="item in option"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>-->
              <el-form-item
                label="安装位置"
                prop="install_location">
                <el-select
                  v-model="formLabelAlign1.install_location"
                  placeholder="请选择"
                  @change="install_location_id_change1">
                  <el-option
                    v-for="item in option4"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="上机位置"
                prop="up_location">
                <el-select
                  v-model="formLabelAlign1.up_location"
                  placeholder="请选择"
                  @change="up_location_id_change1">
                  <el-option
                    v-for="item in option5"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <!-- <el-form-item
                label="轴承类型"
                prop="bearing_type">
                <el-input v-model="formLabelAlign1.bearing_type" />
              </el-form-item>-->
              <!-- <el-form-item
                label="轴承承载区"
                prop="workface">
                <el-input v-model="formLabelAlign1.workface" />
              </el-form-item>-->
              <!--   <el-form-item
                label="轴承座状态"
                prop="status">
                <el-select
                  v-model="formLabelAlign1.status"
                  placeholder="请选择"
                  @change="istatus_change1">
                  <el-option
                    v-for="item in option3"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>-->
              <el-form-item
                label="第一次投用时间"
                prop="usetime">
                <el-date-picker
                  v-model="formLabelAlign1.usetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="投用时间"/>
              </el-form-item>
              <el-form-item
                label="报废时间"
                prop="scraptime">
                <el-date-picker
                  v-model="formLabelAlign1.scraptime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="报废时间"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="间隔时间(d)"
                prop="interval_times">
                <el-input v-model="formLabelAlign1.interval_times" />
              </el-form-item>
              <el-form-item
                label="报废提醒时间(d)"
                prop="discard_times">
                <el-input v-model="formLabelAlign1.discard_times" />
              </el-form-item>
              <!-- <el-form-item
                label="是否报废"
                prop="ifdiscard">
                &lt;!&ndash; <el-input v-model="formLabelAlign1.ifdiscard" />&ndash;&gt;
                <el-select
                  v-model="formLabelAlign1.ifdiscard"
                  placeholder="请选择"
                  @change="if_or_change1">
                  <el-option
                    v-for="item in option"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>-->
              <!--<el-form-item
                label="检测报告"
                prop="reports">
                <el-input v-model="formLabelAlign1.reports" />
              </el-form-item>
              <el-form-item
                label="检测结果"
                prop="results">
                <el-input v-model="formLabelAlign1.results" />
              </el-form-item>-->
              <el-form-item
                label="备注"
                prop="snote">
                <el-input v-model="formLabelAlign1.snote" />
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
          @click="dialogVisible1 = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleEdit1">确 定</el-button>
      </span>
    </el-dialog>
    <!--dan击表格-->
    <el-row :gutter="10">
      <!-- <el-col :span="12">
        <div class="main-title">承压件信息</div>
        <Table-easy
          :is-pagination-show="false"
          :table-foot="false"
          :table-head="false"
          :table-height="300"
          :table-data="tableData1"
          style="overflow-y: auto">
          &lt;!&ndash; 页面 &ndash;&gt;
          <template slot="TableBody">
            <el-table-column
              min-width="180px"
              label="部件编号"
              align="center"
              prop="number"/>
            <el-table-column
              min-width="80px"
              label="部件名称"
              align="center"
              prop="sname" />
            <el-table-column
              min-width="120px"
              label="轧辊类型"
              align="center"
              prop="roll_type" />
            <el-table-column
              label="产线"
              min-width="80px"
              align="center"
              prop="production_line" />
            <el-table-column
              label="机架号"
              align="center"
              min-width="80px"
              prop="frame_no" />
            <el-table-column
              min-width="100px"
              label="安装位置"
              align="center"
              prop="install_location" />
            <el-table-column
              label="状态"
              align="center"
              min-width="80px"
              prop="status" />
            <el-table-column
              label="投用时间"
              min-width="100px"
              align="center"
              prop="usetime" />
            <el-table-column
              min-width="150"
              label="剩余换区时间"
              align="center"
              prop="lasttime" />
          </template>
        </Table-easy>
      </el-col>-->
      <el-col :span="12">
        <div class="main-title">轴承信息
          <el-button
            style="margin-left:80% "
            size="mini"
            type="danger"
            @click="add_left()">轴承配对</el-button>
        </div>
        <Table-easy
          :is-pagination-show="false"
          :table-foot="false"
          :table-head="false"
          :table-height="300"
          :table-data="tableData1"
          style="overflow: auto">
          <!-- 页面 -->
          <template slot="TableBody">
            <el-table-column
              label="轴承座号"
              prop="chock_no" />
            <el-table-column
              label="轴承号"
              prop="bearing_no" />
            <el-table-column
              label="轴承名称"
              prop="bearing_name" />
            <el-table-column
              label="厂家"
              prop="factory_name" />
            <!-- <el-table-column
              label="开始时间"
              width="170"
              prop="usetime" />
            <el-table-column
              label="单次累计时间"
              prop="single_times" />
            <el-table-column
              label="间隔时间"
              prop="interval_times" />
            <el-table-column
              label="提醒处理次数"
              prop="reminder_times" />
            <el-table-column
              label="总累计时间"
              prop="total_times" />
            <el-table-column
              label="报废提醒时间"
              prop="discard_times" />-->
            <el-table-column
              label="操作"
              min-width="300"
              align="center">
              <template slot-scope="scope">
                <!-- <el-button
                  size="mini"
                  type="warning"
                  @click.stop="handleEdit_left(scope.row)">修改</el-button>-->
                <el-button
                  size="mini"
                  type="warning"
                  @click.stop="chaifen_left(scope.row)">拆分</el-button>
                  <!-- <el-button
                  size="mini"
                  type="warning"
                  @click.stop="kong_left(scope.row)">单次提醒置空</el-button>-->
                  <!-- <el-button
                  size="mini"
                  type="danger"
                  @click.stop="handleDelete(scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
          </template>
        </Table-easy>
      </el-col>
      <el-col :span="12">
        <div class="main-title">密封件信息
          <el-button
            style="margin-left:70% "
            size="mini"
            type="danger"
            @click="add_right()">密封件配对</el-button>
        </div>
        <Table-easy
          :is-pagination-show="false"
          :table-foot="false"
          :table-head="false"
          :table-height="300"
          :table-data="tableData2"
          style="overflow: auto">
          <!-- 页面 -->
          <template slot="TableBody">
            <el-table-column
              label="轴承座号"
              prop="chock_no" />
            <el-table-column
              label="密封件号"
              prop="bearing_no" />
            <el-table-column
              label="密封件名称"
              prop="bearing_name" />
            <el-table-column
              label="厂家"
              prop="factory_name" />
            <!--  <el-table-column
              width="170"
              label="开始时间"
              prop="usetime" />
            <el-table-column
              label="单次累计时间"
              prop="single_times" />
            <el-table-column
              label="间隔时间"
              prop="interval_times" />
            <el-table-column
              label="提醒处理次数"
              prop="reminder_times" />
            <el-table-column
              label="总累计时间"
              prop="total_times" />
            <el-table-column
              label="报废提醒时间"
              prop="discard_times" />-->
            <el-table-column
              label="操作"
              min-width="300"
              align="center">
              <template slot-scope="scope">
                <!--<el-button
                  size="mini"
                  type="warning"
                  @click.stop="handleEdit_right(scope.row)">修改</el-button>-->
                <el-button
                  size="mini"
                  type="warning"
                  @click.stop="baofei_right(scope.row)">拆分</el-button>
                  <!-- <el-button
                  size="mini"
                  type="warning"
                  @click.stop="kong_right(scope.row)">单次提醒置空</el-button>-->
                  <!-- <el-button
                size="mini"
                type="danger"
                @click.stop="handleDelete(scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
          </template>
        </Table-easy>
      </el-col>
    </el-row>
    <!-- 轴承添加修改 -->
    <el-dialog
      :visible.sync="dialogVisible_left"
      :title="title_left"
      class="layout-dialog"
      width="40%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign_left"
          label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="轴承座号"
                prop="chock_no">
                <el-input v-model="formLabelAlign_left.chock_no" />
              </el-form-item>
              <!--  <el-form-item
                label="轴承号"
                prop="bearing_no">
                <el-input v-model="formLabelAlign_left.bearing_no" />
              </el-form-item>
              <el-form-item
                label="轴承名称"
                prop="bearing_name">
                <el-input v-model="formLabelAlign_left.bearing_name" />
              </el-form-item>-->
              <el-form-item
                label="轴承选择"
                prop="bearing_no">
                <el-select
                  v-model="formLabelAlign_left.bearing_no"
                  placeholder="请选择"
                  @change="install_location_id_change">
                  <el-option
                    v-for="item in option20"
                    :key="item.indocno"
                    :label="item.bearing_no"
                    :value="item.bearing_no"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- <el-form-item
                label="上机位置"
                prop="up_location">
                <el-input v-model="formLabelAlign_left.up_location" />
              </el-form-item>-->
              <!--   <el-form-item
                label="报废提醒时间/天"
                prop="discard_times">
                <el-input v-model="formLabelAlign_left.discard_times" />
              </el-form-item>
              <el-form-item
                label="轴承类型"
                prop="bearing_type">
                <el-input v-model="formLabelAlign_left.bearing_type" />
              </el-form-item>
              <el-form-item
                label="投用时间"
                prop="usetime">
                <el-date-picker
                  v-model="formLabelAlign_left.usetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="投用时间"/>
              </el-form-item>-->
              <!-- <el-form-item
                label="报废时间"
                prop="scraptime">
                <el-date-picker
                  v-model="formLabelAlign_left.scraptime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="报废时间"/>
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
          @click="dialogVisible_left = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleSave_left">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 密封件添加修改 -->
    <el-dialog
      :visible.sync="dialogVisible_right"
      :title="title_right"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign_right"
          label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="轴承座号"
                prop="chock_no">
                <el-input v-model="formLabelAlign_right.chock_no" />
              </el-form-item>
            <!--  <el-form-item
                label="密封件号"
                prop="bearing_no">
                <el-input v-model="formLabelAlign_right.bearing_no" />
              </el-form-item>
              <el-form-item
                label="密封件名称"
                prop="bearing_name">
                <el-input v-model="formLabelAlign_right.bearing_name" />
              </el-form-item>-->
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="密封种类"
                prop="seals_name">
                <el-select
                  v-model="formLabelAlign_right.seals_name"
                  placeholder="请选择"
                  @change="mifengzhong_change">
                  <el-option
                    v-for="item in option1"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="密封件选择"
                prop="bearing_no">
                <el-select
                  v-model="formLabelAlign_right.bearing_no"
                  placeholder="请选择"
                  @change="install_location_id_change2">
                  <el-option
                    v-for="item in option21"
                    :key="item.indocno"
                    :label="item.bearing_no"
                    :value="item.bearing_no"/>
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
          @click="dialogVisible_right = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleSave_right">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import TableEasy from '@/components/TasilyTableEasy'
import find_data from '@/api/warehouse.js'
import { get, post } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      checkPartList: [],
      checkTypeModels: [],
      tableData: [],
      total: 0,
      tableData1: [], //弹窗表左
      tableData2: [], //弹窗表右
      total1: 0,
      pageIndex: 1,
      pageSize: 20,
      searchchock_no: {},
      searchquery: {
        // chock_no: '', //轴承座号
        roll_no: '' //辊号
        /*   roll_typeid: '1', //轧辊类型id
        production_line_id: '1', //产线id 2250
        frame_noid: '1', //机架号id  F1
        frame_no: '', //机架号
        istatus: '1' //轴承座状态id  在使用*/
      },
      formLabelAlign: {
        /* roll_typeid: 1, //轧辊类型id  默认为1
        production_line_id: 1, //产线id
        frame_noid: 1, //机架号id
        install_location_id: 1, //安装位置id
        up_location_id: 1, //上机位置id*/
        // istatus: 1 //轴承座状态id
      },
      formLabelAlign1: {},
      checkRollType: [
        {
          label: '支撑辊',
          value: 'BUR'
        },
        {
          label: '中间辊',
          value: 'IMR'
        }
      ],
      option: [],
      option1: [],
      option2: [],
      option3: [],
      option4: [],
      option5: [],
      option20: [],
      option21: [],
      dialogVisible: false,
      dialogVisible1: false,
      disUpdateVisible: false,
      dialogVisible_left: false,
      dialogVisible_right: false,
      formLabelAlign_left: {},
      formLabelAlign_right: {},
      disable: false,
      rowIndex: null,
      title_left: '',
      chioce_left: true,
      title_right: '',
      chioce_right: true,
      chock_no_1: '',
      crea_sname_id: '', //操作人id
      crea_sname: '' //操作人名字
    }
  },
  mounted() {
    post('/dictionary/findMapV1', { dicno: 'if_or' }).then(res => {
      this.option = res.data //机架（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'mifeng_all' }).then(res => {
      this.option1 = res.data //密封件种类（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'rolltype' }).then(res => {
      this.option2 = res.data //轧辊类型（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'bearingPe' }).then(res => {
      this.option3 = res.data //轴承座状态（直接使用）
    })

    post('/dictionary/findMapV1', { dicno: 'installlocation' }).then(res => {
      this.option4 = res.data //安装位置（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'uplocation' }).then(res => {
      this.option5 = res.data //上机位置座状态（直接使用）
    })
    this.crea_sname_id = JSON.parse(localStorage.getItem('storeID'))
    this.crea_sname = JSON.parse(localStorage.getItem('storename'))

    this.findAll()
  },
  methods: {
    //单元格变红
    setCellStyle({ row, column }) {
      if (
        row.single_times > row.interval_times &&
        column.label == '单次累计时间(d)'
      ) {
        return 'setClassname'
      }

      /* if (
        row.total_times > row.discard_times &&
        column.label == '总累计时间(d)'
      ) {
        return 'setClassname'
      }*/
    },
    // 点击行信息，添加颜色标识
    setRowColor({ row, rowIndex }) {
      if (row.indocno == this.rowIndex) {
        return 'setTable-row-class-name'
      }
    },
    install_location_id_change(vId) {
      let obj = {}
      obj = this.option20.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.bearing_no == vId) {
          this.formLabelAlign_left.bearing_no = item.bearing_no
          this.formLabelAlign_left.indocno = item.indocno
        }
      })
    },
    install_location_id_change2(vId) {
      let obj = {}
      obj = this.option21.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.bearing_no == vId) {
          this.formLabelAlign_right.bearing_no = item.bearing_no
          this.formLabelAlign_right.indocno = item.indocno
        }
      })
    },
    mifengzhong_change(vId) {
      let obj = {}
      obj = this.option1.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign_right.seals_name = item.value
          this.formLabelAlign_right.seals_type = item.key
          //密封件号查找
          post('baseBearing/findListByBearingType', {
            BaseBearing: {
              chock_no: this.chock_no_1,
              seals_type: item.key,
              bearing_type: 2 //2为密封件1为轴承，
            }
          }).then(res => {
            this.option21 = res.data
          })
        }
      })
    },

    istatus_change(vId) {
      let obj = {}
      obj = this.option3.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.factory_name = item.value
          this.formLabelAlign.factory_id = item.key
        }
      })
    },

    frame_noid_change(vId) {
      let obj = {}
      obj = this.option.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.formLabelAlign.frame_no = item.value
          this.formLabelAlign.frame_noid = item.key
        }
      })
    },
    roll_typeid_change(vId) {
      let obj = {}
      obj = this.option2.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.formLabelAlign.roll_type = item.value
          this.formLabelAlign.roll_typeid = item.key
        }
      })
    },
    up_location_id_change(vId) {
      let obj = {}
      obj = this.option5.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.formLabelAlign.up_location = item.value
          this.formLabelAlign.up_location_id = item.key
        }
      })
    },

    //第二波
    istatus_change1(vId) {
      let obj = {}
      obj = this.option3.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.factory_name = item.value
          this.formLabelAlign1.factory_id = item.key
        }
      })
    },

    if_or_change1(vId) {
      let obj = {}
      obj = this.option.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.frame_no = item.value
          this.formLabelAlign1.frame_noid = item.key
        }
      })
    },
    production_line_id_change1(vId) {
      let obj = {}
      obj = this.option1.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.production_line = item.value
          console.log(this.formLabelAlign1.production_line)
          this.formLabelAlign1.production_line_id = item.key
        }
      })
    },
    roll_typeid_change1(vId) {
      let obj = {}
      obj = this.option2.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.roll_type = item.value
          this.formLabelAlign1.roll_typeid = item.key
        }
      })
    },
    install_location_id_change1_tian(vId) {
      let obj = {}
      obj = this.option4.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.install_location = item.value
          this.formLabelAlign.install_location_id = item.key
        }
      })
    },
    install_location_id_change1(vId) {
      let obj = {}
      obj = this.option4.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.install_location = item.value
          this.formLabelAlign1.install_location_id = item.key
        }
      })
    },
    up_location_id_change1(vId) {
      let obj = {}
      obj = this.option5.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.up_location = item.value
          this.formLabelAlign1.up_location_id = item.key
        }
      })
    },
    find_data() {
      this.pageIndex = 1
      this.findAll()
    },
    findAll() {
      post('/baseChock/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchquery
      }).then(res => {
        console.log('查询全部', res)
        this.tableData = res.data
        this.total = res.count
        console.log(this.total)
        this.tableData1 = []
        this.tableData2 = []
        if (res.data[0]) {
          this.dbcick(res.data[0])
        }
      })
    },
    //添加
    async handleSave() {
      // this.formLabelAlign
      //  this.dialogVisible = false
      let res = await post('/baseChock/insert', {
        baseChock: this.formLabelAlign
      })
      this.dialogVisible = false
      this.findAll()
    },

    baofei(data) {
      this.$confirm('此操作将报废该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/baseChock/updateDiscardTime', {
            indocno: data.indocno
          }).then(res => {
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
    baofei_off(data) {
      this.$confirm('此操作将取消报废该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('baseChock/updateDiscardTimeCancel', {
            indocno: data.indocno
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '取消报废成功!'
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
    kong(data) {
      this.$confirm('此操作将置空单次提醒该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/baseChock/updateSingleTimes', {
            indocno: data.indocno
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '置空成功!'
              })
              this.findAll()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消置空单次提醒'
          })
        })
    },

    //子项左边
    add_left() {
      //测试 选择所有轴承
      post('baseBearing/findListByBearingType', {
        BaseBearing: {
          chock_no: this.chock_no_1,
          bearing_type: 1 //2为密封件1为轴承，
        }
      }).then(res => {
        this.option20 = res.data
      })

      this.formLabelAlign_left = {}
      this.formLabelAlign_left.chock_no = this.chock_no_1
      this.dialogVisible_left = true
      this.chioce_left = true
      this.title_left = '添加'
    },
    handleEdit_left(data) {
      this.formLabelAlign_left = data
      this.dialogVisible_left = true
      this.chioce_left = false
      this.title_left = '修改'
    },
    handleSave_left() {
      this.dialogVisible_left = false
      this.formLabelAlign_left.bearing_type = 1
      if (this.chioce_left) {
        //轴承拆分和组合
        post('baseBearing/updateByChockNo', {
          BaseBearing: this.formLabelAlign_left
        }).then(res => {
          // this.tableData1 = res
          this.find_left()
        })
      } else {
        post('baseBearing/update', {
          BaseBearing: this.formLabelAlign_left
        }).then(res => {
          this.find_left()
          // this.tableData1 = res
        })
      }
    },
    find_left() {
      post('baseBearing/findByPage', {
        pageIndex: 1,
        pageSize: 20,
        condition: {
          chock_no: this.chock_no_1,
          bearing_type: 1, //2为密封件1为轴承，
          ifdiscard: 0 //是否报废 0为正常1为报废
        }
      }).then(res => {
        this.tableData1 = res.data
      })
    },
    chaifen_left(data) {
      this.$confirm('此操作将拆分该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('baseBearing/updateByChockNo', {
            BaseBearing: {
              indocno: data.indocno,
              chock_no: ''
            }
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '拆分成功!'
              })
              this.find_left()
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
    //子项右边
    add_right() {
      //测试 选择所有密封件
      /*  post('baseBearing/findListByBearingType', {
        BaseBearing: {
          chock_no: this.chock_no_1,
          bearing_type: 2 //2为密封件1为轴承，
        }
      }).then(res => {
        this.option21 = res.data
      })*/

      this.formLabelAlign_right = {}
      this.formLabelAlign_right.chock_no = this.chock_no_1
      this.dialogVisible_right = true
      this.chioce_right = true
      this.title_right = '添加'
    },
    handleEdit_right(data) {
      this.formLabelAlign_right = data
      this.dialogVisible_right = true
      this.chioce_right = false
      this.title_right = '修改'
    },
    handleSave_right() {
      this.dialogVisible_right = false
      this.formLabelAlign_right.bearing_type = 2
      if (this.chioce_right) {
        post('baseBearing/updateByChockNo', {
          BaseBearing: this.formLabelAlign_right
        }).then(res => {
          // this.tableData1 = res
          this.find_right()
        })
      } else {
        post('baseBearing/update', {
          BaseBearing: this.formLabelAlign_right
        }).then(res => {
          this.find_right()
          // this.tableData1 = res
        })
      }
    },
    find_right() {
      post('baseBearing/findByPage', {
        pageIndex: 1,
        pageSize: 20,
        condition: {
          chock_no: this.chock_no_1,
          bearing_type: 2, //2为密封件1为轴承
          ifdiscard: 0
        }
      }).then(res => {
        this.tableData2 = res.data
      })
    },
    baofei_right(data) {
      this.$confirm('此操作将拆分该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('baseBearing/updateByChockNo', {
            BaseBearing: {
              indocno: data.indocno,
              chock_no: ''
            }
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '报废成功!'
              })
              this.find_right()
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
    kong_right(data) {
      this.$confirm('此操作将置空单次提醒该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/baseBearing/updateSingleTimes', {
            indocno: data.indocno
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '报废成功!'
              })
              this.find_right()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消置空单次提醒'
          })
        })
    },
    // 修改数据按钮
    handleEdit(data) {
      this.formLabelAlign1 = data
      this.dialogVisible1 = true
    },
    async handleEdit1(data) {
      console.log(this.formLabelAlign1)
      let res = await post('/baseChock/update', {
        baseChock: this.formLabelAlign1
      })
      this.dialogVisible1 = false
      this.findAll()
    },
    handleDelete(data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/baseChock/deleteOne', { indocno: data.indocno }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.findAll()
            }
          })
          this.findAll()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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
    /*dan击*/
    //主表关联查询子表承压件信息接口
    dbcick(val) {
      this.chock_no_1 = val.chock_no
      this.rowIndex = val.indocno //点击变色需要
      this.searchchock_no.chock_no = val.chock_no
      var searchchock_no1 = {
        main_code: val.chock_no
      }
      this.find_left()
      this.find_right()
      /*上线实绩表查询*/
      /* post('/basePressureParts/findByChock', {
        condition: this.searchchock_no
      }).then(res => {
        this.tableData1 = res
      })
      this.tableData2 = [{}]*/
      /* post('/rollPartsDetail/findByChock', {
        condition: searchchock_no1
      }).then(res => {
        this.tableData2 = res.data
      })*/
    },
    resetForm(formName) {
      this.searchquery = {}
      this.findAll()
      // this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.main-title {
  margin-top: 10px;
  text-align: center;
  color: #eae8c5;
  padding: 3px 0;
  background-color: #253f80;
}
.setClassname {
  color: #d3ca1b !important;
  background-color: #8d0912 !important;
}
</style>
