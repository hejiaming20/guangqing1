<template>
  <div>
    <!-- 全部辊选择 -->
    <div
      class="layout-block layout-search"
      style="height: 40px">
      <el-form
        ref="ruleForm"
        :inline="true"
        :model="jihua"
        class="GD-plan-form">
        <el-form-item style="float: right;padding-right: 10px">
          <el-button
            type="primary"
            size="mini"
            @click="java_select()">全部辊
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col
          :xl="24"
          :lg="24">
          <div class="layout-block">
            <!-- 算法备辊表格 -->
            <el-row
              :gutter="5"
              class="layout-default-margin">
              <!-- 换辊车 -->
              <el-col :span="12">
                <div>
                  <div
                    class="body_box">
                    <div class="table_box">
                      <table>
                        <tbody >
                          <tr class="t1">
                            <th>机架</th>
                            <!--  <th>轧辊类型</th>-->
                            <th>换辊车</th>
                          </tr>

                          <tr
                            v-for="(rowVal, rowIndex) in tableData"
                            :key="rowIndex">
                            <td>{{ rowVal.key }}</td>
                            <td
                              :class="rowIndex == clickrow ? 'dianji' : ''"
                              @click="huan_click(rowIndex, rowVal)"
                            >{{ rowVal.valueName }}</td>
                            <!-- <td>{{ rowVal.roll_type }}</td>-->
                            <!-- <td
                              :class="rowIndex == clickrow ? 'dianji' : ''"
                              @click="huan_click(rowIndex, rowVal)"
                            >{{ rowVal.value }}</td>-->
                          </tr>
                        </tbody>
                    </table></div>
                  </div>
                </div>
              </el-col>
              <!-- 轧辊选择 -->
              <el-col :span="12">
                <div>
                  <div
                    v-loading="loading"
                    element-loading-text="加载中,稍等"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    class="body_box layout-webkitScrollbar"
                    style="overflow:auto">
                    <div class="table_box">
                      <table>
                        <tbody >
                          <tr class="t1">
                            <th>机架
                              <el-tooltip
                                content="刷新"
                                effect="dark"
                                placement="top"
                                class="function-item">
                                <i
                                  :class=" pulse ? 'el-icon-refresh icon-rotate' : 'el-icon-refresh' "
                                  @click="java_select()"
                                />
                              </el-tooltip>

                            </th>
                            <th>辊号选择</th>
                          </tr>

                          <tr>
                            <td>机架1</td>
                            <td>
                              <div class="layout-one-input1">
                                <el-select
                                  v-model="formatte.roll_1"
                                  placeholder="请选择"
                                  clearable
                                  @change="rollTypeChange(formatte.roll_1,'F1',1)">
                                  <el-option
                                    v-for="item in option_1"
                                    :key="item.key"
                                    :label="item.valueName"
                                    :value="item.value"/>
                                </el-select>
                                &nbsp;&nbsp;&nbsp;&nbsp;数量为: {{ count_length1 }}&nbsp;对
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>机架2</td>
                            <td>
                              <div class="layout-one-input1">
                                <el-select
                                  v-model="formatte.roll_2"
                                  placeholder="请选择"
                                  clearable
                                  @change="rollTypeChange(formatte.roll_2,'F2',2)">
                                  <el-option
                                    v-for="item in option_2"
                                    :key="item.key"
                                    :label="item.valueName"
                                    :value="item.value"/>
                                </el-select>
                                &nbsp;&nbsp;&nbsp;&nbsp;数量为: {{ count_length2 }}&nbsp;对
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>机架3</td>
                            <td>
                              <div class="layout-one-input1">
                                <el-select
                                  v-model="formatte.roll_3"
                                  placeholder="请选择"
                                  clearable
                                  @change="rollTypeChange(formatte.roll_3,'F3',3)">
                                  <el-option
                                    v-for="item in option_3"
                                    :key="item.key"
                                    :label="item.valueName"
                                    :value="item.value"/>
                                </el-select>
                                &nbsp;&nbsp;&nbsp;&nbsp;数量为: {{ count_length3 }}&nbsp;对
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>机架4</td>
                            <td>
                              <div class="layout-one-input1">
                                <el-select
                                  v-model="formatte.roll_4"
                                  placeholder="请选择"
                                  clearable
                                  @change="rollTypeChange(formatte.roll_4,'F4',4)">
                                  <el-option
                                    v-for="item in option_4"
                                    :key="item.key"
                                    :label="item.valueName"
                                    :value="item.value"/>
                                </el-select>
                                &nbsp;&nbsp;&nbsp;&nbsp;数量为: {{ count_length4 }}&nbsp;对
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>机架5</td>
                            <td>
                              <div class="layout-one-input1">
                                <el-select
                                  v-model="formatte.roll_5"
                                  placeholder="请选择"
                                  clearable
                                  @change="rollTypeChange(formatte.roll_5,'F5',5)">
                                  <el-option
                                    v-for="item in option_5"
                                    :key="item.key"
                                    :label="item.valueName"
                                    :value="item.value"/>
                                </el-select>
                                &nbsp;&nbsp;&nbsp;&nbsp;数量为: {{ count_length5 }}&nbsp;对
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>机架6</td>
                            <td>
                              <div class="layout-one-input1">
                                <el-select
                                  v-model="formatte.roll_6"
                                  placeholder="请选择"
                                  clearable
                                  @change="rollTypeChange(formatte.roll_6,'F6',6)">
                                  <el-option
                                    v-for="item in option_6"
                                    :key="item.key"
                                    :label="item.valueName"
                                    :value="item.value"/>
                                </el-select>
                                &nbsp;&nbsp;&nbsp;&nbsp;数量为: {{ count_length6 }}&nbsp;对
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>机架7</td>
                            <td>
                              <div class="layout-one-input1">
                                <el-select
                                  v-model="formatte.roll_7"
                                  placeholder="请选择"
                                  clearable
                                  @change="rollTypeChange(formatte.roll_7,'F7',7)">
                                  <el-option
                                    v-for="item in option_7"
                                    :key="item.key"
                                    :label="item.valueName"
                                    :value="item.value"/>
                                </el-select>
                                &nbsp;&nbsp;&nbsp;&nbsp;数量为: {{ count_length7 }}&nbsp;对
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>机架8</td>
                            <td>
                              <div class="layout-one-input1">
                                <el-select
                                  v-model="formatte.roll_8"
                                  placeholder="请选择"
                                  clearable
                                  @change="rollTypeChange(formatte.roll_8,'F8',8)">
                                  <el-option
                                    v-for="item in option_8"
                                    :key="item.key"
                                    :label="item.valueName"
                                    :value="item.value"/>
                                </el-select>
                                &nbsp;&nbsp;&nbsp;&nbsp;数量为: {{ count_length8 }}&nbsp;对
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              <!-- <p class="backlogLists-item-title"> 选择辊号：</p>
        <div class="layout-search1">
          <el-form
            ref="ruleForm"
            :model="formatte"
            style="text-align: left"
            label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="机架1"
                  prop="roll_1">
                  <el-select
                    v-model="formatte.roll_1"
                    placeholder="请选择"
                    @change="rollTypeChange(formatte.roll_1,'F1',1)">
                    <el-option
                      v-for="item in option_1"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="机架2"
                  prop="roll_2">
                  <el-select
                    v-model="formatte.roll_2"
                    placeholder="请选择"
                    @change="rollTypeChange(formatte.roll_2,'F2',2)">
                    <el-option
                      v-for="item in option_2"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="机架3"
                  prop="roll_3">
                  <el-select
                    v-model="formatte.roll_3"
                    placeholder="请选择"
                    @change="rollTypeChange(formatte.roll_3,'F3',3)">
                    <el-option
                      v-for="item in option_3"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="机架4"
                  prop="roll_4">
                  <el-select
                    v-model="formatte.roll_4"
                    placeholder="请选择"
                    @change="rollTypeChange(formatte.roll_4,'F4',4)">
                    <el-option
                      v-for="item in option_4"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="机架5"
                  prop="roll_5">
                  <el-select
                    v-model="formatte.roll_5"
                    placeholder="请选择"
                    @change="rollTypeChange(formatte.roll_5,'F5',5)">
                    <el-option
                      v-for="item in option_5"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="机架6"
                  prop="roll_6">
                  <el-select
                    v-model="formatte.roll_6"
                    placeholder="请选择"
                    @change="rollTypeChange(formatte.roll_6,'F6',6)">
                    <el-option
                      v-for="item in option_6"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="机架7"
                  prop="roll_7">
                  <el-select
                    v-model="formatte.roll_7"
                    placeholder="请选择"
                    @change="rollTypeChange(formatte.roll_7,'F7',7)">
                    <el-option
                      v-for="item in option_7"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>

              </el-col>
            </el-row>
          </el-form>
        </div> -->
              </el-col>
            </el-row>
            <!-- 备辊表格 -->
            <div class="body_box">
              <div class="table_box layout-default-margin">
                <table>
                  <tbody >
                    <tr class="t1">
                      <th>辊号</th>
                      <th>轧辊类型</th>
                      <th>轧辊材质</th>
                      <th>上机位置</th>
                      <th>当前辊径</th>
                      <th>辊形</th>
                      <!-- <th>粗糙度</th>-->
                      <th>OS座号</th>
                      <th>DS座号</th>
                      <th>表面评级</th>
                      <th>HSS上机次数</th>
                    </tr>

                    <tr
                      v-for="(item,index ) in tableData1"
                      :key="index">
                      <td>{{ item.roll_no }}</td>
                      <td>{{ item.roll_type }}</td>
                      <td>{{ item.material }}</td>
                      <td>{{ item.roll_position }}</td>
                      <td>{{ item.currentdiameter }}</td>
                      <td>{{ item.rollshape }}</td>
                      <!--<td>{{ item.roughness }}</td>-->
                      <td>{{ item.obearing_chock }}</td>
                      <td>{{ item.dbearing_chock }}</td>
                      <td>{{ item.oxide_evaluation }}</td>
                      <td>{{ item.uplinecount }}</td>

                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="text-align: center">
                <!-- <el-button
                  type="primary"
                  size="mini"
                  @click="refresh()">备辊状况查询
                </el-button>-->
                <el-button
                  type="primary"
                  size="mini"
                  @click="findcar()">刷新换辊车
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="huangun_all()">换辊详情
                </el-button>
                <!-- <el-button
                  v-show="dialog_show"
                  type="danger"
                  size="small"
                  @click="open1_click()">确认备辊选择
                </el-button>
                <el-button
                  v-show="!dialog_show"
                  type="danger"
                  size="small"
                  @click="open3_click()">换辊清空
                </el-button>-->

                <el-button
                  v-show="button_show == '3'"
                  type="danger"
                  size="mini"
                  @click="open3_click()">换辊清空
                </el-button>
                <el-button
                  v-show="button_show == '2'"
                  type="danger"
                  size="mini"
                  @click="open1_click()">确认备辊选择
                </el-button>
                <!--<el-button
                  v-show="button_show == '1'"
                  type="danger"
                  size="small"
                  @click="send_message()">备辊请求
                </el-button>-->
                <!--<el-button
                  v-show="button_show == '1'&&quanxian==11"
                  type="danger"
                  size="mini"
                  @click="chakan()">查看
                </el-button>-->
                <el-button
                  type="danger"
                  size="mini"
                  @click="chakan()">查看
                </el-button>
              </div>
            </div>
          </div>
        </el-col>
        <!--<el-col
          :xl="4"
          :lg="24">
          <div class="">轧辊推荐...</div>
        </el-col>-->
      </el-row>

      <el-row
        :gutter="5"
        style="margin-top: 5px">
        <el-col
          :xl="6"
          :lg="24">
          <Table-easy
            :table-data="tableData_java"
            :page-size="pageSize"
            :current-page="pageIndex"
            :total ="total_aa"
            :table-height="324"
            :row-class-name="setRowColor"
            @row-click="cellClick"
            @handle-current-change="handleCurrentChange"
            @handle-size-change="handleSizeChange" >
            <template slot="TableHead">
              <el-row>
                <el-col :span="20">
                  <el-form
                    ref="ruleForm"
                    :inline="true"
                    :model="searchInfo_java"
                    label-width="80px">
                    <el-form-item
                      label="开始时间"
                      prop="dbegin">
                      <el-date-picker
                        v-model="searchInfo_java.dbegin"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="开始时间"/>
                    </el-form-item>
                    <el-form-item
                      label="结束时间"
                      prop="dend">
                      <el-date-picker
                        v-model="searchInfo_java.dend"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="结束时间"/>
                    </el-form-item>
                  <!--  <el-form-item
                      label="状态"
                      prop="istate">
                      <el-select
                        v-model="searchInfo_java.istate"
                        placeholder="请选择">
                        <el-option
                          v-for="item in optionistate"
                          :key="item.key"
                          :label="item.label"
                          :value="item.value"/>
                      </el-select>
                    </el-form-item>-->
                  </el-form>
                </el-col>
                <el-col :span="4">
                  <div class="btn">
                    <el-button
                      size="mini"
                      type="success"
                      @click="find_elec">查询
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </template>
            <template slot="TableBody">
              <el-table-column
                prop="group2"
                label="班组"/>
              <el-table-column
                prop="group1"
                label="班次"/>
              <el-table-column
                width="160px"
                prop="time_1"
                label="备辊时间"/>
              <el-table-column
                prop="istate"
                label="状态">
                <template slot-scope="scope">
                  <span>{{ scope.row.istate===0?'未确认':scope.row.istate===1?'已确认':scope.row.istate===2?'有回退辊':'' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                width="120px"
                prop="snote"
                label="备注"/>
            <!--  <el-table-column
                label="操作"
                min-width="100"
                align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="warning"
                    @click.stop="find_1(scope.row,scope.$index)">详情
                  </el-button>
                </template>
              </el-table-column>-->
            </template>
          </Table-easy>
        </el-col>
        <el-col
          :xl="18"
          :lg="24">
          <div style=" height: 28px;color:greenyellow;line-height: 28px; background-color: #253F80;  padding-right: 20px;text-align: right">班次：{{ p1 }} 班组：{{ p2 }} 时间：{{ p3 }}
            <!-- <el-button
              size="mini"
              type="primary"
              @click="pdf_last()">打印
            </el-button>-->
            <el-button
              size="mini"
              type="primary"
              @click="zhaji()">轧机确认
            </el-button>
          </div>
          <Table-easy
            :table-data="table_1"
            :table-height="470"
            :table-head="false"
            :table-foot="false"
            :span-method="spanMethod"
            :is-pagination-show="false"
            style="margin-top: 5px">
            <template slot="TableBody">
              <el-table-column
                prop="frame_no"
                label="机架"/>
              <el-table-column
                width="120px"
                prop="roll_no"
                label="辊号"/>
              <el-table-column
                width="120px"
                prop="roll_type"
                label="轧辊类型"/>
              <el-table-column
                prop="material"
                width="120px"
                label="材质"/>
              <el-table-column
                prop="roll_position"
                label="上机位置"/>
              <!--  <el-table-column
                prop="roll_position"
                label="上机位置"/>-->
              <el-table-column
                prop="currentdiameter"
                label="当前辊径"/>
              <el-table-column
                prop="roll_diameter"
                label="辊径差"/>
              <el-table-column
                prop="rollshape"
                width="150px"
                label="辊形"/>
              <el-table-column
                prop="obearing_chock"
                label="OS座号"/>
              <el-table-column
                prop="dbearing_chock"
                label="DS座号"/>
              <el-table-column
                prop="oxide_evaluation"
                label="表面评级"/>
              <el-table-column
                width="120px"
                prop="uplinecount"
                label="HSS上机次数"/>
              <el-table-column
                prop="ini_crown_max"
                label="最大凸度"/>
              <el-table-column
                prop="ini_crown_min"
                label="最小凸度"/>
            </template>
          </Table-easy>
        </el-col>
      </el-row>
    </div>

    <!--第一个弹窗  是否打开项目----已取消-->
    <el-dialog
      :visible.sync="dialogVisible"
      title="提示"
      class="layout-dialog"
      width="40%">
      <p style="font-size: large;text-align: center;width: 100%;color:red">是否打开项目</p>
      <br>
      <br>
      <br>
      <el-row :gutter="20">
        <el-col
          :span="12"
          :offset="10"><div> <span>
            <el-button
              size="mini"
              type="primary"
              @click="open1_click">确定</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="findroll_1()">查看详情</el-button>
        </span></div></el-col>
      </el-row>
    </el-dialog>
    <!-- 第2个弹窗  备辊前确认或取消 -->
    <el-dialog
      :visible.sync="dialogVisible1"
      title="提示"
      class="layout-dialog"
      width="60%">
      <div
        class="layout-search"
        style="border: 1px solid yellow;">
        <p style="text-align:left;color:white">备辊前确认:</p>
        <el-form
          :model="searchInfo1"
          label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="辊号"
                prop="frame_no">
                <el-input
                  v-model="searchInfo1.roll_no"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="机架"
                prop="frame_no">
                <el-select
                  v-model="searchInfo1.frame_no"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center"><el-button
          :disabled="dialog_sure"
          size="mini"
          type="primary"
          @click="open2_click()">确认备辊</el-button></div>
      </div>
      <br>
      <br>
      <br>
      <div
        class="layout-search"
        style="border: 1px solid yellow">
        <p style="text-align:left;color:white">取消备辊原因:</p>
        <el-form
          :model="searchInfoss"
          label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                prop="roll_no"
                label="辊号">
                <el-input
                  v-model="searchInfoss.roll_no"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="原因"
                prop="reason">
                <el-input
                  v-model="searchInfoss.reason"/>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item
                label="是否重磨"
                prop="ifcm">
                <template>
                  <el-radio
                    v-model="searchInfoss.ifcm"
                    label="1">是</el-radio>
                  <el-radio
                    v-model="searchInfoss.ifcm"
                    label="0">否</el-radio>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center"><el-button
          size="mini"
          type="primary"
          @click="open2_click_clear()">确认</el-button></div>

      </div>
    </el-dialog>
    <!--第3个弹窗  换辊车请求  换辊清空或查看详情-->
    <el-dialog
      :visible.sync="dialogVisible2"
      title="提示"
      class="layout-dialog"
      width="40%">
      <p style="font-size: large;text-align: center;width: 100%;color:red">换辊车请求</p>
      <br>
      <br>
      <br>
      <el-row :gutter="20">
        <el-col
          :span="12"
          :offset="10"><div > <span >
            <el-button
              size="mini"
              type="primary"
              @click="open3_click">换辊清空</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="findroll_2()">查看详情</el-button>
        </span></div></el-col>
      </el-row>
    </el-dialog>
    <!-- 第4个弹窗  取消换辊发给后台-->
    <el-dialog
      :visible.sync="dialogVisible3"
      title="提示"
      class="layout-dialog"
      width="80%">
      <div
        class="layout-search"
        style="border: 1px solid yellow">
        <p style="text-align:left;color:white">取消换辊原因:</p>
        <el-form
          :model="searchInfo2"
          label-width="80px">
          <el-row>
            <el-col :span="8">
              <div class="layout-one-input1">
                <el-form-item
                  prop="roll_no"
                  label="辊号">
                  <el-input
                    v-model="searchInfo2.roll_no"/>
                </el-form-item>
              </div>

            </el-col>
            <el-col :span="8">
              <el-form-item
                label="原因"
                prop="reason">
                <el-input
                  v-model="searchInfo2.reason"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="是否重磨"
                prop="ifcm">
                <template>
                  <el-radio
                    v-model="searchInfo2.ifcm"
                    label="1">是</el-radio>
                  <el-radio
                    v-model="searchInfo2.ifcm"
                    label="0">否</el-radio>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center"><el-button
          size="mini"
          type="primary"
          @click="open4_click">确认</el-button></div>
      </div>
    </el-dialog>

    <!-- 第5个弹窗  所有详情提交-->
    <el-dialog
      :visible.sync="tan"
      title="所选择辊号"
      class="layout-dialog"
      width="80%">
      <div class="gd006_1">
        <div style="color: white;margin-left: 20px;padding-bottom: 5px">  班次：{{ group1 }}   班组：{{ group2 }}     时间：{{ time_senf }}  </div>
        <div class="body_box">
          <div class="table_box layout-default-margin">
            <table id="test3">
              <tbody >
                <tr class="t1">
                  <th>机架</th>
                  <th>辊号</th>
                  <th>轧辊类型</th>
                  <th>轧辊材质</th>
                  <th>上机位置</th>
                  <th>当前辊径</th>
                  <th>辊径差</th>
                  <th>辊形</th>
                  <!-- <th>粗糙度</th>-->
                  <th>OS座号</th>
                  <th>DS座号</th>
                  <th>表面评级</th>
                  <th>HSS上机次数</th>
                  <th>最大凸度</th>
                  <th>最小凸度</th>
                </tr>

                <tr
                  v-for="(item,index ) in tableData_tan"
                  :key="index">
                  <td>{{ item. frame_no }}</td>
                  <td>{{ item.roll_no }}</td>
                  <td>{{ item.roll_type }}</td>
                  <td>{{ item.material }}</td>
                  <td>{{ item.roll_position }}</td>
                  <td>{{ item.currentdiameter }}</td>
                  <td>{{ item.roll_diameter }}</td>
                  <td>{{ item.rollshape }}</td>
                  <!--<td>{{ item.roughness }}</td>-->
                  <td>{{ item.obearing_chock }}</td>
                  <td>{{ item.dbearing_chock }}</td>
                  <td>{{ item.oxide_evaluation }}</td>
                  <td>{{ item.uplinecount }}</td>
                  <td>{{ item.ini_crown_max }}</td>
                  <td>{{ item.ini_crown_min }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="text-align: center">
          <el-button
            type="primary"
            size="small"
            @click="send_1()">发送
          </el-button>
        <!-- <el-button
          v-show="dialog_show"
          type="danger"
          size="small"
          @click="open1_click()">确认备辊选择
        </el-button>
        <el-button
          v-show="!dialog_show"
          type="danger"
          size="small"
          @click="open3_click()">换辊清空
        </el-button>-->
        </div>
      </div>

    </el-dialog>
    <!-- 第6个弹窗  换辊车所有详情-->
    <el-dialog
      :visible.sync="tan_1"
      title="所选择辊号"
      class="layout-dialog"
      width="80%">
      <!-- 备辊表格 -->
      <div class="gd006_1">
        <div
          v-show="!pddd"
          class="body_box">
          <!-- <div style="color: white;margin-left: 20px;padding-bottom: 5px">  班次：{{ group1 }}   班组：{{ group2 }}   </div>-->
          <div class="table_box layout-default-margin">
            <table id="test1">
              <tbody >
                <tr class="t1">
                  <th>机架</th>
                  <th>辊号</th>
                  <th>轧辊类型</th>
                  <th>轧辊材质</th>
                  <th>上机位置</th>
                  <th>当前辊径</th>
                  <th>辊形</th>
                  <!-- <th>粗糙度</th>-->
                  <th>OS座号</th>
                  <th>DS座号</th>
                  <th>表面评级</th>
                  <th>HSS上机次数</th>
                  <th>最大凸度</th>
                  <th>最小凸度</th>
                </tr>

                <tr
                  v-for="(item,index ) in tableData_tan_1"
                  :key="index">
                  <td>{{ item. frame_no }}</td>
                  <td>{{ item.roll_no }}</td>
                  <td>{{ item.roll_type }}</td>
                  <td>{{ item.material }}</td>
                  <td>{{ item.roll_position }}</td>
                  <td>{{ item.currentdiameter }}</td>
                  <td>{{ item.rollshape }}</td>
                  <!--<td>{{ item.roughness }}</td>-->
                  <td>{{ item.obearing_chock }}</td>
                  <td>{{ item.dbearing_chock }}</td>
                  <td>{{ item.oxide_evaluation }}</td>
                  <td>{{ item.uplinecount }}</td>
                  <td>{{ item.ini_crown_max }}</td>
                  <td>{{ item.ini_crown_min }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          v-show="pddd"
          id="pdfDom"
          class="body_box1">
          <!--      <div style="color: #040706;margin-left: 20px;padding-bottom: 5px;padding-top: 20px;font-size: 20px">  班次：{{ group1 }}   班组：{{ group2 }}   </div>-->
          <div class="table_box layout-default-margin">
            <table id="test2">
              <tbody >
                <tr
                  class="t1">
                  <th>机架</th>
                  <th>辊号</th>
                  <th>轧辊类型</th>
                  <th>轧辊材质</th>
                  <th>上机位置</th>
                  <th>当前辊径</th>
                  <th>辊形</th>
                  <!-- <th>粗糙度</th>-->
                  <th>OS座号</th>
                  <th>DS座号</th>
                  <th>表面评级</th>
                  <th>HSS上机次数</th>
                  <th>最大凸度</th>
                  <th>最小凸度</th>
                </tr>

                <tr
                  v-for="(item,index ) in tableData_tan_1"
                  :key="index">
                  <td>{{ item. frame_no }}</td>
                  <td>{{ item.roll_no }}</td>
                  <td>{{ item.roll_type }}</td>
                  <td>{{ item.material }}</td>
                  <td>{{ item.roll_position }}</td>
                  <td>{{ item.currentdiameter }}</td>
                  <td>{{ item.rollshape }}</td>
                  <!--<td>{{ item.roughness }}</td>-->
                  <td>{{ item.obearing_chock }}</td>
                  <td>{{ item.dbearing_chock }}</td>
                  <td>{{ item.oxide_evaluation }}</td>
                  <td>{{ item.uplinecount }}</td>
                  <td>{{ item.ini_crown_max }}</td>
                  <td>{{ item.ini_crown_min }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- <div style="text-align: center">
          <el-button
            size="mini"
            type="primary"
            @click="getPdfaa()">pdf</el-button>
            &lt;!&ndash; <el-button
          v-show="dialog_show"
          type="danger"
          size="small"
          @click="open1_click()">确认备辊选择
        </el-button>
        <el-button
          v-show="!dialog_show"
          type="danger"
          size="small"
          @click="open3_click()">换辊清空
        </el-button>&ndash;&gt;
        </div>-->
      </div>
    </el-dialog>
    <!-- 第7个弹窗  导出详情-->
    <el-dialog
      :visible.sync="last_1"
      title="信息"
      class="layout-dialog"
      width="90%">
      <div
        id="pdfDom"
        class="gd006_1">
        <div
          class="body_box1">
          <div style="color: #040706;margin-left: 20px;padding-bottom: 5px;padding-top: 20px;font-size: 20px">  班次：{{ p1 }}   班组：{{ p2 }}      时间：{{ p3 }}   </div>
          <div class="table_box layout-default-margin">
            <table id="test4">
              <tbody >
                <tr
                  class="t1">
                  <th>机架</th>
                  <th>辊号</th>
                  <th>轧辊类型</th>
                  <th>轧辊材质</th>
                  <th>上机位置</th>
                  <th>当前辊径</th>
                  <th>辊径差</th>
                  <th>辊形</th>
                  <!-- <th>粗糙度</th>-->
                  <th>OS座号</th>
                  <th>DS座号</th>
                  <th>表面评级</th>
                  <th>HSS上机次数</th>
                  <th>最大凸度</th>
                  <th>最小凸度</th>
                </tr>

                <tr
                  v-for="(item,index ) in table_2"
                  :key="index">
                  <td>{{ item. frame_no }}</td>
                  <td>{{ item.roll_no }}</td>
                  <td>{{ item.roll_type }}</td>
                  <td>{{ item.material }}</td>
                  <td>{{ item.roll_position }}</td>
                  <td>{{ item.currentdiameter }}</td>
                  <td>{{ item.roll_diameter }}</td>
                  <td>{{ item.rollshape }}</td>
                  <!--<td>{{ item.roughness }}</td>-->
                  <td>{{ item.obearing_chock }}</td>
                  <td>{{ item.dbearing_chock }}</td>
                  <td>{{ item.oxide_evaluation }}</td>
                  <td>{{ item.uplinecount }}</td>
                  <td>{{ item.ini_crown_max }}</td>
                  <td>{{ item.ini_crown_min }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </el-dialog>
    <!--轧机确认-->
    <el-dialog
      :visible.sync="zhaji_open"
      title="提示"
      class="layout-dialog"
      width="40%">
      <div class="layout-search">
        <el-row style="text-align: center">
          <el-col :span="8">
            <el-button
              size="mini"
              type="success"
              @click="sure_we()">确认
            </el-button>
          </el-col>
          <el-col :span="8">
            <el-button
              size="mini"
              type="danger"
              @click="bohui_1()">驳回
            </el-button>
          </el-col>
          <el-col :span="8">
            <el-button
              size="mini"
              type="primary"
              @click="pdf_last()">打印
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 驳回原因 -->
    <el-dialog
      :visible.sync="bohui_reason"
      title="提示"
      class="layout-dialog"
      width="60%">
      <div
        class="layout-search"
        style="border: 1px solid yellow;">
        <p style="text-align:left;color:white">驳回原因:</p>
        <div
          v-for="(item,key) in arry_repeat"
          :key="key">
          <span>{{ '提交' }}{{ key+1 }}</span>
          <el-form
            :model="arry_repeat[key]"
            label-width="80px">
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="机架"
                  prop="frame_no">
                  <el-select
                    v-model="arry_repeat[key].fame"
                    placeholder="请选择">
                    <el-option
                      v-for="item in option"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="原因"
                  prop="reaon">
                  <!--  <el-input
                    v-model="arry_repeat[key].reaon"/>-->

                  <el-select
                    v-model="arry_repeat[key].reaon"
                    placeholder="请选择">
                    <el-option
                      v-for="item in option_reaon"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>


                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="text-align:center"><el-button
          size="mini"
          type="danger"
          @click="add_1()">添加</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="test_1()">确认</el-button>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { get, pythonPOST, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import moment from 'moment'
export default {
  name: 'GD006',
  components: { TableEasy },
  data() {
    return {
      pulse: false,
      p1: '',
      p2: '',
      p3: '',
      table_1: [],
      table_2: [],
      pageIndex: 1,
      pageSize: 10,
      searchInfo_java: {},
      tableData_java: [],
      total_aa: 0,
      time_senf: '',
      group1: '',
      group2: '',
      last_1: false,
      pddd: false,
      htmlTitle: '换辊表导出',
      quanxian: '',
      zhans1: [],
      zhans2: [],
      tan: false,
      tan_1: false,
      tableData_tan: [],
      tableData_tan_1: [],
      all_data: [],
      loading: false,
      jihua: {},
      ming: '',
      count_length1: 0,
      count_length2: 0,
      count_length3: 0,
      count_length4: 0,
      count_length5: 0,
      count_length6: 0,
      count_length7: 0,
      count_length8: 0,
      option_1: [],
      option_2: [],
      option_3: [],
      option_4: [],
      option_5: [],
      option_6: [],
      option_7: [],
      option_8: [],
      option_100: [],
      formatte: {},
      clickrow: 100,
      aaa: 100,
      bbb: '',
      fame_no1: '',
      tableDatas: [],
      isActive: '',
      all_no: ['H001', 'H002', 'H003', 'H004'],
      all_no1: [
        {
          label: '制造厂商',
          prop: 'factory',
          checkFg: true
        },
        {
          label: '轧辊材质',
          prop: 'roll_no',
          checkFg: false
        }
      ],
      tableData: [],
      radio1: '',
      tableData1: [],
      total1: 0,
      checkboxGroup1: ['F1'],
      checked1: [],
      checked2: [],
      option: [
        { value: 'F1' },
        { value: 'F2' },
        { value: 'F3' },
        { value: 'F4' },
        { value: 'F5' },
        { value: 'F6' },
        { value: 'F7' }
      ],
      option_reaon: [],
      item: {},
      search_roll_no: {},
      valno: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialog_sure: true,
      dialog_show: true,
      button_show: '',
      beigun: '',
      huan_roll: '',
      searchInfoss: {},
      sstableData: [],
      searchInfo1: {},
      searchInfo2: {
        ifcm: '0'
        /*   //  frame_noid: 2, //机架号id
        frame_no: '', //机架号
        roll_no: '', //辊号
        dotype: 2, //操作类型（确认备辊时是1，取消备辊时是2）
        reasonid: '', //原因id（下拉框，内容暂无）
        reason: '', //原因（下拉框，内容暂无）
        if_grind: 1, //是否重磨（checkbox）
        pretime: '' //备辊时间（自动带入当前时间）*/
      },
      dialogSearchInfo2: {
        //发送给磨辊间首页
        roll_no: '',
        frame_noid: '',
        frame_no: ''
      },
      rowIndex_time: 0,
      zhaji_open: false,
      bohui_reason: false,
      optionistate: [
        {
          value: 0,
          label: '未确认'
        },
        {
          value: 1,
          label: '确认'
        },
        {
          value: 2,
          label: '驳回'
        }
      ],
      arry_repeat: [
        {
          fame: '',
          reaon: ''
        },
        {
          fame: '',
          reaon: ''
        }
      ],
      hitm_send_roll: '',
      hitm_send_roll_1: ''
    }
  },
  created() {
    this.$set(
      this.searchInfo_java,
      'dbegin',
      moment()
        .subtract(1, 'hours')
        .format('YYYY-MM-DD HH:mm:ss')
    )
    this.$set(
      this.searchInfo_java,
      'dend',
      moment().format('YYYY-MM-DD HH:mm:ss')
    )
  },
  mounted() {
    this.quanxian = JSON.parse(localStorage.getItem('storeID'))
    console.log(this.quanxian)
    // this.timer = setTimeout(this.get, 5000)
    this.findcar()
    post('/rollPrelist/findpo ').then(res => {
      this.option_100 = res //轧制计划
    })
    //this.himit_give()
    this.java_select()
    this.find_elec()
  },
  methods: {
    flitterData(arr) {
      let spanOneArr = []
      let concatOne = 0
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
        } else {
          //name 修改
          if (item.frame_no === arr[index - 1].frame_no) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1
            spanOneArr.push(0)
          } else {
            spanOneArr.push(1)
            concatOne = index
          }
        }
      })
      return {
        one: spanOneArr
      }
    },
    //element组件合并单元格
    spanMethod(row) {
      //row:当前行
      //column:当前列
      //rowIndex:当前行号
      //columnIndex：当前列号
      if (row.columnIndex === 0 || row.columnIndex === 6) {
        // this.tableData  修改
        const _row = this.flitterData(this.table_1).one[row.rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      /* if (row.columnIndex === 5) {
        if (row.rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };*/
    },
    //左下角详情
    find_1(val) {
      var find_time = val.time_1
      this.p1 = ''
      this.p2 = ''
      this.p3 = ''
      this.table_1 = []
      //点击获取数据
      post('/rollHs/findByPage', {
        pageIndex: '1',
        pageSize: '30',
        condition: {
          dbegin: find_time,
          dend: find_time
        }
      }).then(res => {
        this.table_1 = res.data
        this.p1 = res.data[0].group1
        this.p2 = res.data[0].group2
        this.p3 = res.data[0].time_1
      })
    },

    cellClick(val) {
      this.rowIndex_time = val.time_1 //时间唯一
      var find_time = val.time_1
      this.p1 = ''
      this.p2 = ''
      this.p3 = ''
      this.table_1 = []
      //点击获取数据
      post('/rollHs/findByPage', {
        pageIndex: '1',
        pageSize: '30',
        condition: {
          dbegin: find_time,
          dend: find_time
        }
      }).then(res => {
        this.table_1 = res.data
        this.p1 = res.data[0].group1
        this.p2 = res.data[0].group2
        this.p3 = res.data[0].time_1
      })
    },
    setRowColor({ row, rowIndex }) {
      if (row.time_1 == this.rowIndex_time) {
        return 'setTable-row-class-name'
      }
    },

    zhaji() {
      this.zhaji_open = true
    },
    bohui_1() {
      this.zhaji_open = false
      this.bohui_reason = true
      this.arry_repeat = [
        {
          fame: '',
          reaon: ''
        },
        {
          fame: '',
          reaon: ''
        }
      ]

      /* post('/rollHs/findByPage2', {
        pageIndex: 1,
        pageSize: 10,
        condition: {
          dbegin: this.rowIndex_time,
          dend: this.rowIndex_time
        }
      }).then(res => {
        if (res.data[0].istate == 1 || res.data[0].istate == 2) {
          this.$message({
            message: '你已经提交过',
            type: 'warning'
          })
        } else {
          post('/rollHs/changestate2', {
            rollHs: {
              istate: 2, //未确认为0；确认为1，驳回为2
              time_1: this.rowIndex_time,
              snote: ''
            }
          }).then(res => {})
        }
      })*/
    },
    add_1() {
      this.arry_repeat.push({
        fame: '',
        reaon: ''
      })
    },
    test_1() {
      this.bohui_reason = false
      var mm = ''
      for (var i = 0; this.arry_repeat.length > i; i++) {
        mm =
          '驳回机架:' +
          this.arry_repeat[i].fame +
          '原因:' +
          this.arry_repeat[i].reaon +
          mm
      }
      console.log(mm)
      post('/rollHs/findByPage2', {
        pageIndex: 1,
        pageSize: 10,
        condition: {
          dbegin: this.rowIndex_time,
          dend: this.rowIndex_time
        }
      }).then(res => {
        if (res.data[0].istate == 1 || res.data[0].istate == 2) {
          this.$message({
            message: '你已经提交过',
            type: 'warning'
          })
        } else {
          post('/rollHs/changestate2', {
            rollHs: {
              istate: 2, //未确认为0；确认为1，驳回为2
              time_1: this.rowIndex_time,
              snote: mm
            }
          }).then(res => {
            this.find_elec()
          })
        }
      })
    },
    sure_we() {
      this.zhaji_open = false

      post('/rollHs/findByPage2', {
        pageIndex: 1,
        pageSize: 10,
        condition: {
          dbegin: this.rowIndex_time,
          dend: this.rowIndex_time
        }
      }).then(res => {
        if (res.data[0].istate == 1 || res.data[0].istate == 2) {
          this.$message({
            message: '你已经提交过',
            type: 'warning'
          })
        } else {
          post('/rollHs/changestate', {
            rollHs: {
              istate: 1,
              time_1: this.rowIndex_time,
              snote: ''
            }
          }).then(res => {
            this.find_elec()
          })
        }
      })
      /*post('/rollHs/changestate', {
        rollHs: {
          istate: 1,
          time_1: this.rowIndex_time,
          snote: ''
        }
      }).then(res => {})*/
    },
    //右下角打印
    pdf_last() {
      this.zhaji_open = false
      this.table_2 = []
      this.table_2 = this.table_1
      this.last_1 = true
      setTimeout(() => {
        this.mergeCell('test4', 0, 0, 0)
        this.mergeCell('test2', 0, 0, 5)
      }, 2000)
      setTimeout(() => {
        this.getPdf('pdfDom', this.htmlTitle)
        this.last_1 = false
      }, 4500)
    },
    //分页之对应页
    handleCurrentChange(val) {
      this.pageIndex = val
      this.find_elec()
    },
    //分页之一页多少条
    handleSizeChange(val) {
      this.pageSize = val
      this.find_elec()
    },
    //查询电子滚票
    find_elec() {
      /*  post('/rollHs/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo_java
      }).then(res => {})*/

      post('/rollHs/findByPage2', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo_java
      }).then(res => {
        this.tableData_java = res.data
        this.total_aa = res.count
        this.p1 = ''
        this.p2 = ''
        this.p3 = ''
        this.table_1 = []
        if (res.data.length) {
          //this.find_1(res.data[0].time_1)
          this.cellClick(res.data[0])
        }
      })
    },

    //合并列
    mergeCell(table1, startRow, endRow, col) {
      var tb = document.getElementById(table1)
      if (!tb || !tb.rows || tb.rows.length <= 0) {
        return
      }
      if (
        col >= tb.rows[0].cells.length ||
        (startRow >= endRow && endRow != 0)
      ) {
        return
      }
      if (endRow == 0) {
        endRow = tb.rows.length - 1
      }
      for (var i = startRow; i < endRow; i++) {
        if (
          tb.rows[startRow].cells[col].innerHTML ==
          tb.rows[i + 1].cells[col].innerHTML
        ) {
          //如果相等就合并单元格,合并之后跳过下一行
          tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[col])
          tb.rows[startRow].cells[col].rowSpan =
            tb.rows[startRow].cells[col].rowSpan + 1
        } else {
          this.mergeCell(table1, i + 1, endRow, col)
          break
        }
      }
    },
    getPdfaa() {
      this.pddd = true
      this.mergeCell('test2', 0, 0, 0)

      setTimeout(() => {
        this.getPdf('pdfDom', this.htmlTitle)
        this.tan_1 = false
        this.pddd = false
      }, 2000)
    },
    huangun_all() {
      this.tableData_tan_1 = []
      post('/rcKurumaInfo/findlist', {
        condition: { mut: 0 }
      }).then(res => {
        // this.tableData = res
        this.tableData = []
        if (res) {
          this.tableData.push(
            res[0],
            res[1],
            res[2],
            res[3],
            res[4],
            res[5],
            res[6],
            res[7]
          )
        }
        //班组
        post('/sysBz/findbz').then(res => {
          this.group1 = res.bc
          this.group2 = res.bz
        })
        this.repeat_1(0, 7)

        setTimeout(() => {
          this.tan_1 = true
          console.log(this.tableData_tan_1)
          setTimeout(() => {
            this.mergeCell('test1', 0, 0, 0)
          }, 1000)
        }, 1000)
      })
    },
    repeat_1(num, length) {
      if (this.tableData[num]) {
        if (this.tableData[num].value) {
          //下面表中两条详细信息
          post('/rollInformation/findByPre', {
            condition: { roll_no: this.tableData[num].value }
          }).then(res => {
            if (res.data.length == 2) {
              if (res.data[0].roll_position == 'TOP') {
                for (let i = 0; res.data.length > i; i++) {
                  res.data[i].frame_no = this.tableData[num].key
                  this.tableData_tan_1.push(res.data[i])
                }
              } else {
                for (let i = 2; 0 < i; i--) {
                  res.data[i - 1].frame_no = this.tableData[num].key
                  this.tableData_tan_1.push(res.data[i - 1])
                }
              }
            }

            if (++num < length) {
              this.repeat_1(num, length)
            }
          })
        } else {
          if (++num < length) {
            this.repeat_1(num, length)
          }
        }
      } else {
        if (++num < length) {
          this.repeat_1(num, length)
        }
      }
    },
    himit_give() {
      this.option_1 = []
      this.option_2 = []
      this.option_3 = []
      this.option_4 = []
      this.option_5 = []
      this.option_6 = []
      this.option_7 = []
      this.option_8 = []
      this.count_length1 = 0
      this.count_length2 = 0
      this.count_length3 = 0
      this.count_length4 = 0
      this.count_length5 = 0
      this.count_length6 = 0
      this.count_length7 = 0
      //接收中间间
      post('/webservice/getHmiData', {
        msgs: [],
        tags: [{ name: 'Tmp_PlanNo', ts: '0' }]
      }).then(res => {
        this.jihua.plan = res.data.tagList[0].value
        console.log(this.jihua.plan)

        pythonPOST('/python/RollChangingCarLoad/', {
          pdiplanNo: this.jihua.plan
        }).then(res => {
          this.option_1 = res.data[2][0]
          this.option_2 = res.data[2][1]
          this.option_3 = res.data[2][2]
          this.option_4 = res.data[2][3]
          this.option_5 = res.data[2][4]
          this.option_6 = res.data[2][5]
          this.option_7 = res.data[2][6]
          this.count_length1 = this.option_1.length
          this.count_length2 = this.option_2.length
          this.count_length3 = this.option_3.length
          this.count_length4 = this.option_4.length
          this.count_length5 = this.option_5.length
          this.count_length6 = this.option_6.length
          this.count_length7 = this.option_7.length

          // this.find_select() //下拉框select 接口
          //数据1
          var t1 = res.data[0][0].length
          for (let i = 0; t1 > i; i++) {
            this.zhans1.push({
              value: res.data[0][4][i],
              value1_1: res.data[0][1][i][0],
              value1_2: res.data[0][1][i][1]
            })
          }

          //数据2
          var t2 = res.data[1][0].length
          for (let i = 0; t2 > i; i++) {
            this.zhans2.push({
              value: res.data[1][4][i],
              value1_1: res.data[1][1][i][0],
              value1_2: res.data[1][1][i][1]
            })
          }
        })
      })
    },
    //java_select备用查询
    java_select() {
      this.pulse = true
      setTimeout(() => {
        this.pulse = false
      }, 1000)
      this.option_1 = []
      this.option_2 = []
      this.option_3 = []
      this.option_4 = []
      this.option_5 = []
      this.option_6 = []
      this.option_7 = []
      this.option_8 = []
      this.zhans1 = []
      this.zhans2 = []
      this.count_length1 = 0
      this.count_length2 = 0
      this.count_length3 = 0
      this.count_length4 = 0
      this.count_length5 = 0
      this.count_length6 = 0
      this.count_length7 = 0
      this.count_length8 = 0
      post('/rollPrelist/findByPageNew', {
        null: ''
      }).then(res => {
        this.option_1 = res.data[0]
        this.option_2 = res.data[1]
        this.option_3 = res.data[2]
        this.option_4 = res.data[3]
        this.option_5 = res.data[4]
        this.option_6 = res.data[5]
        this.option_7 = res.data[6]
        this.option_8 = res.data[7]
        this.count_length1 = this.option_1.length
        this.count_length2 = this.option_2.length
        this.count_length3 = this.option_3.length
        this.count_length4 = this.option_4.length
        this.count_length5 = this.option_5.length
        this.count_length6 = this.option_6.length
        this.count_length7 = this.option_7.length
        this.count_length8 = this.option_8.length
      })
    },
    //轧制计划选择change事件
    planChange(val) {
      this.jihua.plan = val
    },
    //点击获取下拉框数据
    rollTypeChange(vId, fame_val, num) {
      this.button_show = '1'
      //下面表中两条详细信息
      this.tableData1 = []
      if (vId) {
        post('/rollInformation/findByPre', {
          condition: { roll_no: vId }
        }).then(res => {
          this.tableData1 = res.data
        })
      }

      switch (fame_val) {
        case 'F1':
          this.all_data[0] = {
            roll_no: vId,
            idotype: 1, //待审核，黄色
            sdotype: 0, //精轧
            frame_noid: 1,
            frame_no: 'F1'
          }
          break
        case 'F2':
          this.all_data[1] = {
            roll_no: vId,
            idotype: 1, //待审核，黄色
            sdotype: 0, //精轧
            frame_noid: 2,
            frame_no: 'F2'
          }
          break
        case 'F3':
          this.all_data[2] = {
            roll_no: vId,
            idotype: 1, //待审核，黄色
            sdotype: 0, //精轧
            frame_noid: 3,
            frame_no: 'F3'
          }
          break
        case 'F4':
          this.all_data[3] = {
            roll_no: vId,
            idotype: 1, //待审核，黄色
            sdotype: 0, //精轧
            frame_noid: 4,
            frame_no: 'F4'
          }
          break
        case 'F5':
          this.all_data[4] = {
            roll_no: vId,
            idotype: 1, //待审核，黄色
            sdotype: 0, //精轧
            frame_noid: 5,
            frame_no: 'F5'
          }
          break
        case 'F6':
          this.all_data[5] = {
            roll_no: vId,
            idotype: 1, //待审核，黄色
            sdotype: 0, //精轧
            frame_noid: 6,
            frame_no: 'F6'
          }
          break
        case 'F7':
          this.all_data[6] = {
            roll_no: vId,
            idotype: 1, //待审核，黄色
            sdotype: 0, //精轧
            frame_noid: 7,
            frame_no: 'F7'
          }
          break
        case 'F8':
          this.all_data[7] = {
            roll_no: vId,
            idotype: 1, //待审核，黄色
            sdotype: 0, //精轧
            frame_noid: 15,
            frame_no: 'F8'
          }
          break
      }
      console.log(this.all_data)
    },
    //弹窗需要发送信息
    chakan() {
      this.tableData_tan = []
      this.repeat(0, 8)
      //班组
      post('/sysBz/findbz').then(res => {
        this.group1 = res.bc
        this.group2 = res.bz
        this.time_senf = moment().format('YYYY-MM-DD HH:mm:ss')
      })
      setTimeout(() => {
        this.tan = true
        console.log('AAA', this.tableData_tan)
        setTimeout(() => {
          this.mergeCell('test3', 0, 0, 0)
          this.mergeCell('test3', 0, 0, 6)
        }, 1000)
      }, 1000)
    },
    repeat(num, length) {
      if (this.all_data[num]) {
        if (this.all_data[num].roll_no) {
          //下面表中两条详细信息
          post('/rollInformation/findByPre', {
            condition: { roll_no: this.all_data[num].roll_no }
          }).then(res => {
            if (res.data.length == 2) {
              var roll_diameter = Math.abs(
                res.data[0].currentdiameter - res.data[1].currentdiameter
              )
              if (res.data[0].roll_position == 'TOP') {
                for (let i = 0; res.data.length > i; i++) {
                  res.data[i].frame_no = this.all_data[num].frame_no
                  res.data[i].roll_diameter = roll_diameter.toFixed(3) //辊颈差
                  this.tableData_tan.push(res.data[i])
                }
              } else {
                for (let i = 2; 0 < i; i--) {
                  res.data[i - 1].frame_no = this.all_data[num].frame_no
                  res.data[i - 1].roll_diameter = roll_diameter.toFixed(3) //辊颈差
                  this.tableData_tan.push(res.data[i - 1])
                }
              }
            }

            if (++num < length) {
              this.repeat(num, length)
            }
          })
        } else {
          if (++num < length) {
            this.repeat(num, length)
          }
        }
      } else {
        if (++num < length) {
          this.repeat(num, length)
        }
      }
    },
    //弹窗发送
    send_1() {
      this.tan = false
      //发送中间件辊号
      this.send_him()
      //发送备辊信息
      this.send_repeat(0, 8)
      //发送Java保存
      this.send_java(0, this.tableData_tan.length)
      setTimeout(() => {
        this.findcar()
        this.java_select()
      }, 5700)
    },
    send_him() {
      this.hitm_send_roll = ''
      this.hitm_send_roll_1 = ''
      if (this.tableData_tan.length <= 12) {
        for (let i = 0; this.tableData_tan.length > i; i++) {
          this.hitm_send_roll =
            this.hitm_send_roll + this.tableData_tan[i].roll_no + '/'
        }
        console.log(this.hitm_send_roll, this.hitm_send_roll.length)
        this.hitm_send_roll = this.hitm_send_roll.slice(
          0,
          this.hitm_send_roll.length - 1
        )
        this.hitm_send_roll_1 = 'kong'
      } else {
        for (let i = 0; 12 > i; i++) {
          this.hitm_send_roll =
            this.hitm_send_roll + this.tableData_tan[i].roll_no + '/'
        }
        for (let i = 12; this.tableData_tan.length > i; i++) {
          this.hitm_send_roll_1 =
            this.hitm_send_roll_1 + this.tableData_tan[i].roll_no + '/'
        }

        console.log(
          this.hitm_send_roll,
          this.hitm_send_roll.length,
          this.hitm_send_roll_1,
          this.hitm_send_roll_1.length
        )
        this.hitm_send_roll = this.hitm_send_roll.slice(
          0,
          this.hitm_send_roll.length - 1
        )
        this.hitm_send_roll_1 = this.hitm_send_roll_1.slice(
          0,
          this.hitm_send_roll_1.length - 1
        )
      }

      console.log(
        this.hitm_send_roll,
        this.hitm_send_roll.length,
        this.hitm_send_roll_1
      )
      setTimeout(() => {
        post('webservice/sendTagNew', {
          tagList: [
            { name: 'SEND_ROLL_NO', value: this.hitm_send_roll },
            { name: 'SEND_ROLL_NO_1', value: this.hitm_send_roll_1 },
            { name: 'ROLL_PUT_INTO_RC_CAR', value: '1' }
          ]
        })
      }, 5000)
      // test.splice(test.length - 1, 2)
    },
    send_java(val, length) {
      this.tableData_tan[val].group1 = this.group1 //班次
      this.tableData_tan[val].group2 = this.group2 //班组
      this.tableData_tan[val].time_1 = this.time_senf //时间
      post('/rollHs/insert', {
        rollHs: this.tableData_tan[val]
      }).then(res => {
        if (++val < length) {
          this.send_java(val, length)
        }
      })
    },
    send_repeat(num, length) {
      //以前发送换辊车的
      /* post('/rollPrelistHistory/insert', {
        rollPrelistHistory: this.searchInfo1,
        mut: 0,
        prodct_plan_no: this.jihua.plan
      })*/

      if (this.all_data[num]) {
        if (this.all_data[num].roll_no) {
          this.all_data[num].roll_type = '精轧工作辊'
          this.all_data[num].dotype = 1
          post('/rollPrelistHistory/insert', {
            rollPrelistHistory: this.all_data[num],
            mut: 0
          }).then(res => {
            //console.log(this.all_data[num].roll_no)
            /*  post('webservice/sendTagNew', {
              tagList: [
                {
                  name: 'SEND_ROLL_NO',
                  value: this.all_data[num].roll_no
                },
                {
                  name: 'RC_CAR_ROLL_TYPE',
                  value: this.all_data[num].roll_type
                },
                {
                  name: 'RC_CAR_STANDNO',
                  value: this.all_data[num].frame_no
                },
                { name: 'ROLL_PUT_INTO_RC_CAR', value: '1' }
              ]
            }).then(res => {
              console.log('11111', res)
              if (++num < length) {
                this.send_repeat(num, length)
              }
              /!* setTimeout(() => {
                post('webservice/sendTagNew', {
                  tagList: [{ name: 'ROLL_PUT_INTO_RC_CAR', value: '0' }]
                })
              }, 400)*!/
            })*/

            var data = res.data
            if (++num < length) {
              this.send_repeat(num, length)
            }
            //  this.refresh()
          })
        } else {
          if (++num < length) {
            this.send_repeat(num, length)
          }
        }
      } else {
        if (++num < length) {
          this.send_repeat(num, length)
        }
      }
    },
    //查询换辊车
    findcar() {
      post('/rcKurumaInfo/findlist', {
        condition: { mut: 0 }
      }).then(res => {
        // this.tableData = res
        this.tableData = []
        if (res[0]) {
          this.tableData.push(
            res[0],
            res[1],
            res[2],
            res[3],
            res[4],
            res[5],
            res[6],
            res[7]
          )
        }
      })
    },
    //点击备辊表
    text_dian(val, key) {
      this.button_show = '2'
      this.beigun = val.roll_no //点击获得单元格辊号
      this.bbb = key //行
      // this.dialogVisible = true //备辊弹窗
      this.findroll_1()
      this.ming = key
      this.searchInfo1 = val
      this.searchInfoss = val
    },
    //1查看详情
    findroll_1() {
      this.dialog_sure = true
      // this.dialog_show = true
      var roll_no = this.beigun
      // this.dialogVisible = false
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.beigun }
      }).then(res => {
        this.tableData1 = res.data
        this.total = res.count

        if (
          res.data[0].currentdiameter !== null &&
          res.data[1].currentdiameter !== null &&
          res.data[0].obearing_chock !== null &&
          res.data[1].obearing_chock !== null &&
          res.data[0].dbearing_chock !== null &&
          res.data[1].dbearing_chock !== null
        ) {
          this.dialog_sure = false
        }
      })
    },
    //是否打开项目? 是
    open1_click() {
      this.dialogVisible = false
      this.dialogVisible1 = true
      /*  var no_roll = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'R1', 'R2']
      var t2 = this.bbb //行
      this.fame_no1 = no_roll[t2]
      this.searchInfoss = {} //清空
      //为确认备辊和辊号
      this.searchInfo1.frame_no = this.fame_no1
      var t1 = this.beigun //为备辊号
      this.searchInfo1.roll_no = t1
      //为取消备辊号
      this.searchInfoss.roll_no = this.beigun
      this.searchInfoss.frame_no = this.fame_no1*/
    },
    //确认备辊
    open2_click() {
      this.dialogVisible1 = false
      /* var t2 = this.bbb //行
      this.searchInfo1.pretime = moment().format('YYYY-MM-DD HH:mm:ss')*/
      this.searchInfo1.roll_type = '精轧工作辊'
      this.searchInfo1.dotype = 1
      //发给后台
      /*post('/rollPrelistHistoryR/insert', {
        ifcm: this.searchInfo1.ifcm,
        rollPrelistHistoryR: this.searchInfo1
      })*/
      if (this.jihua.plan) {
        post('/rollPrelistHistory/insert', {
          rollPrelistHistory: this.searchInfo1,
          mut: 0,
          prodct_plan_no: this.jihua.plan
        }).then(res => {
          if (res) {
            //定时器
            setTimeout(() => {
              this.findcar()
              this.ming = ''
            }, 1000)
          }
          this.tableDatan_0 = res.data
          this.total_1 = res.count
        })
        //发给中间件

        setTimeout(() => {
          post('webservice/sendTagNew', {
            tagList: [
              { name: 'ROLL_PUT_INTO_RC_CAR', value: '1' },
              { name: 'RC_CAR_ROLL_TYPE', value: this.searchInfo1.roll_type },
              { name: 'RC_CAR_STANDNO', value: this.searchInfo1.frame_no }
            ]
          }).then(res => {
            console.log('11111', res)
            post('webservice/sendTagNew', {
              tagList: [{ name: 'ROLL_PUT_INTO_RC_CAR', value: '0' }]
            })
          })
        }, 800)
      } else {
        alert('请选择轧制计划')
      }
    },
    //取消备辊
    open2_click_clear() {
      /*   this.dialogVisible1 = false
      var t1 = this.beigun //为备辊号
      var t2 = this.bbb //行*/
      //取消备辊
      this.searchInfoss.dotype = 2
      this.searchInfoss.roll_type = '精轧工作辊'
      if (this.jihua.plan) {
        post('/rollPrelistHistory/insert', {
          ifcm: this.searchInfoss.ifcm,
          rollPrelistHistory: this.searchInfoss,
          mut: 0,
          prodct_plan_no: this.jihua.plan
        }).then(res => {
          this.tableDatan_0 = res.data
          this.total_1 = res.count
        })
      } else {
        alert('请选择轧制计划')
      }
    },
    //点击换辊小车
    huan_click(va1, va12) {
      this.clickrow = va1
      this.button_show = '3'
      this.searchInfo2.roll_no = va12.value //显示取消换辊车画面上辊号
      this.searchInfo2.frame_no = va12.key //显示取消换辊车画面上辊号
      this.searchInfo2.roll_type = '精轧工作辊' //类型
      this.huan_roll = va12.value
      if (va12.value != null && va12.value != '') {
        //this.dialogVisible2 = true
        this.findroll_2()
      }

      // 换辊车列表点击改变颜色
      /* switch (va12.key) {
        case 'F1':
          this.clickrow = 0
          break
        case 'F2':
          this.clickrow = 1
          break
        case 'F3':
          this.clickrow = 2
          break
        case 'F4':
          this.clickrow = 3
          break
        case 'F5':
          this.clickrow = 4
          break
        case 'F6':
          this.clickrow = 5
          break
        case 'F7':
          this.clickrow = 6
          break
      }*/
    },
    //2查看详情
    findroll_2() {
      // this.dialog_show = false
      var roll_no = this.huan_roll
      this.dialogVisible2 = false
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.huan_roll }
      }).then(res => {
        this.tableData1 = res.data
        this.total = res.count
      })
    },
    //换辊清空
    open3_click() {
      this.dialogVisible3 = true
    },
    //换辊小车清空辊号发给后台
    open4_click() {
      this.searchInfo2.dotype = 2
      post('/rollPrelistHistory/insert', {
        mut: 0,
        ifcm: this.searchInfo2.ifcm,
        rollPrelistHistory: this.searchInfo2
      }).then(res => {
        //换辊取消清空发送推送消息
        /* post('workFlow/pushnew', {
          getUserid: 48,
          getUser: '磨床主操PAD',
          modular_no: 'gr',
          smessage: '备辊小车有辊子清空，请注意'
        }).then(res => {})*/
        setTimeout(() => {
          this.clickrow = 100
          this.findcar()
          this.java_select()
        }, 1000)
        this.tableDatan_0 = res.data
        this.total_1 = res.count
      })
      this.dialogVisible2 = false //换辊车关闭
      this.dialogVisible3 = false //换辊清页面空关闭
      this.ming = '' //关闭大小
    }
  }
}
</script>

<style scoped>
/* 屏幕最大分辨率1200的样式 */
@media screen and (max-width: 1200px) {
  .gd006_1 {
    overflow-y: auto;
    overflow-x: auto;
  }
}
.GD-plan-form .el-form-item {
  margin-bottom: 0px;
}
.active {
  background: #971229;
}
.dianji {
  /* background: red;*/
  /* font-size: 25px; */
  color: #208d3a;
  background: #971229;
}
.dianji1 {
  background: #9dab40;
}
.dianji2 {
  background: green;
}
.dianji3 {
  background: #8d4038;
}
.t1 {
  border: 1px solid white;
  color: #eae8c5;
}

.body_box {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  /* margin: 15px;*/
  background-color: #1a367a;
  /* padding: 20px 20px 10px 20px; */
  /* border-radius: 8px; */
}

.body_box .table_box table {
  width: 100%;
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
  background: #1a367a;
  white-space: nowrap;
}

.body_box .table_box table tbody tr {
  cursor: pointer;
}

/*.body_box .table_box table tbody tr:hover {
  background-color: #1a367a !important;
}*/

.body_box .table_box table tbody tr:nth-child(2n) {
  background-color: #253f80;
}

.body_box .table_box table tbody tr td {
  padding: 3px 5px;
  white-space: normal;
  word-break: break-all;
  border: 1px solid gray;
  text-align: center;
  color: #eae8c5;
  height: 35px;
  /*强制不换行*/
  white-space: nowrap;
}
.body_box .table_box table tbody tr td a:hover {
  color: #d3ca1b;
}
.head_1 {
  color: #eae8c5 !important;
  text-align: right;
  margin-right: 40px;
}

/*pdf样式*/
.body_box1 {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  /* margin: 15px;*/
  background-color: #d9dce5;
  /* padding: 20px 20px 10px 20px; */
  /* border-radius: 8px; */
}

.body_box1 .table_box table {
  width: 100%;
  font-size: 20px;
}

.body_box1 .table_box table thead {
  background-color: #d9dce5;
  letter-spacing: 1px;
}

.body_box1 .table_box table thead tr {
  height: 10px;
}

.body_box1 .table_box table tr th {
  padding: 3px 5px;
  /*  white-space: normal;*/
  word-break: break-all;
  text-align: center;
  color: #040706;
  height: 10px;
  background: #d9dce5;
  white-space: nowrap;
}

.body_box1 .table_box table tbody tr {
  cursor: pointer;
}

/*.body_box .table_box table tbody tr:hover {
  background-color: #1a367a !important;
}*/
.body_box1 .table_box table tbody tr td {
  padding: 3px 5px;
  white-space: normal;
  background: #d9dce5;
  word-break: break-all;
  border: 1px solid gray;
  text-align: center;
  color: #322820;
  height: 35px;
  /*强制不换行*/
  white-space: nowrap;
}

/*.layout-one-input .last-one.el-input .el-input__inner {
  background-color: #1a367a;
  min-width: 170px;
  max-width: 200px;
  height: 28px;
  font-size: 14px;
  color: #eae8c5;
}*/

/*// 单独选择框、单独输入框*/
.layout-one-input1 /deep/.el-select .el-input__inner {
  background-color: #1a367a;
  width: 140px;
  height: 28px;
  font-size: 14px;
  color: #eae8c5;
}
.layout-one-input1 /deep/.el-input .el-input__inner {
  background-color: #1a367a;
  min-width: 290px;
  max-width: 310px;
  height: 28px;
  font-size: 14px;
  color: #eae8c5;
}
</style>
