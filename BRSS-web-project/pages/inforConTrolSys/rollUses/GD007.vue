<template>
  <div>
    <el-row>
      <el-col
        :xl="24"
        :lg="24">
        <div class="layout-block">
          <el-row
            :gutter="5"
            class="layout-default-margin">
            <!--换辊车-->
            <el-col :span="8">
              <div>
                <div
                  class="body_box"
                  style="overflow:auto">
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
                          :key="rowIndex"
                          @click="huan_click(rowIndex, rowVal)">
                          <td>{{ rowVal.key }}</td>
                          <!-- <td>{{ rowVal.roll_type }}</td>-->
                          <td
                            :class="rowIndex === clickrow ? 'dianji' : ''"
                          >{{ rowVal.value }}</td>
                        </tr>
                      </tbody>
                  </table></div>
                </div>
              </div>
            </el-col>
            <!--备辊1-->
            <!-- <el-col :span="5">
              <div>
                <div
                  class="body_box"
                  style="overflow:auto;height: 100%;width: 100%;float: left">
                  <div class="table_box">
                    <table>
                      <tbody >
                        <tr class="t1">
                          <th>机架</th>
                          <th>备辊1</th>
                          &lt;!&ndash; <th>备辊2</th>&ndash;&gt;
                        </tr>
                        <tr
                          v-for="(rowVal, rowIndex) in tableDatas"
                          :key="rowIndex">
                          <td >{{ rowIndex===0?'F1精轧支撑辊':rowIndex===1?'F2精轧支撑辊':rowIndex===2?'F3精轧支撑辊':rowIndex===3?'F4精轧支撑辊':rowIndex===4?'F5精轧支撑辊':rowIndex===5?'F6精轧支撑辊':rowIndex===6?'F7精轧支撑辊':rowIndex===7?'R1粗轧工作辊':rowIndex===8?'R2粗轧工作辊':rowIndex===9?'R1粗轧支撑辊':rowIndex===10?'R2粗轧支撑辊':rowIndex===11?'F1E精轧立辊':rowIndex===12?'R1E粗轧立辊':rowIndex===13?'R2E粗轧立辊':rowIndex===14?'SSP锤头':'' }}</td>
                          <td
                            v-if="rowVal.idotype!=-1"
                            :class="rowIndex === ming ? 'dianji' :rowVal.idotype===1? 'dianji1':rowVal.idotype===2?'dianji2':rowVal.idotype===3?'dianji3':''"
                            @click="text_dian(rowVal, rowIndex)">{{ rowVal.roll_no }}</td>
                        </tr>
                      </tbody>
                  </table></div>
                </div>
              &lt;!&ndash; <div
                class="body_box"
                style="overflow:auto;height: 100%;width: 50%;float: left;left:-108px;position: relative">
                <div class="table_box">
                  <table>
                    <tbody >
                      <tr class="t1">
                        <th>机架</th>
                        <th>备辊1</th>
                        <th>备辊2</th>
                      </tr>
                      <tr
                        v-for="(rowVal, rowIndex) in tableDatas"
                        :key="rowIndex">
                        <td >{{ rowIndex===0?'F1精轧支撑辊':rowIndex===1?'F2精轧支撑辊':rowIndex===2?'F3精轧支撑辊':rowIndex===3?'F4精轧支撑辊':rowIndex===4?'F5精轧支撑辊':rowIndex===5?'F6精轧支撑辊':rowIndex===6?'F7精轧支撑辊':rowIndex===7?'R1粗轧工作辊':rowIndex===8?'R2粗轧工作辊':rowIndex===9?'R1粗轧支撑辊':rowIndex===10?'R2粗轧支撑辊':rowIndex===11?'F1E精轧立辊':rowIndex===12?'R1E粗轧立辊':rowIndex===13?'R2E粗轧立辊':rowIndex===14?'SSP锤头':'' }}</td>
                        <td
                          v-for="(columnVal, columnIndexs) in rowVal"
                          :key="columnIndexs"
                          :class="columnIndexs === aaa && rowIndex === bbb ? 'dianji' : ''"
                          @click="we_click(columnVal,columnIndexs,rowIndex, rowVal)">{{ columnVal }}</td>
                      </tr>
                    </tbody>
                </table></div>
              </div>&ndash;&gt;
              </div>
            </el-col>-->
            <!--选择辊号-->
            <el-col :span="16">
              <div
                class="body_box"
                style="overflow:auto">
                <div class="table_box">
                  <table>
                    <tbody >
                      <tr class="t1">
                        <th>
                          <!-- 刷新-->
                          <el-tooltip
                            content="刷新"
                            effect="dark"
                            placement="top"
                            class="function-item">
                            <i
                              :class=" pulse ? 'el-icon-refresh icon-rotate' : 'el-icon-refresh' "
                              @click="find_select()"
                            />
                          </el-tooltip>
                        </th>
                        <!--  <th>轧辊类型</th>-->
                        <th>TOP</th>
                        <th>BOT</th>
                        <th>操作</th>

                      </tr>
                      <!--F1精轧支撑辊-->
                      <tr>
                        <td>
                          F1精轧支撑辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_1"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange1(formatte.option_1,'F1',1)">
                              <el-option
                                v-for="item in option_1"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_1"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange1(formatte1.option_1,'F1',1)">
                              <el-option
                                v-for="item in aoption_1"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun1()">详情
                          </el-button>
                          <!--<el-button
                            type="primary"
                            size="mini"
                            @click="send_message1()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>
                      <!--F2精轧支撑辊-->
                      <tr>
                        <td>
                          F2精轧支撑辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_2"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange2(formatte.roll_2,'F2',2)">
                              <el-option
                                v-for="item in option_2"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_2"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange2(formatte1.roll_2,'F2',2)">
                              <el-option
                                v-for="item in aoption_2"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun2()">详情
                          </el-button>
                        <!--  <el-button
                            type="primary"
                            size="mini"
                            @click="send_message2()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>
                      <!--F3精轧支撑辊-->
                      <tr>
                        <td>
                          F3精轧支撑辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_3"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange3(formatte.roll_3,'F3',3)">
                              <el-option
                                v-for="item in option_3"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_3"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange3(formatte1.roll_3,'F3',3)">
                              <el-option
                                v-for="item in aoption_3"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun3()">详情
                          </el-button>
                          <!--<el-button
                            type="primary"
                            size="mini"
                            @click="send_message3()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>
                      <!--F4精轧支撑辊-->
                      <tr>
                        <td>
                          F4精轧支撑辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_4"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange4(formatte.roll_4,'F4',4)">
                              <el-option
                                v-for="item in option_4"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_4"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange4(formatte1.roll_4,'F3',3)">
                              <el-option
                                v-for="item in aoption_4"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun4()">详情
                          </el-button>
                        <!--  <el-button
                            type="primary"
                            size="mini"
                            @click="send_message4()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>
                      <!--F5精轧支撑辊-->
                      <tr>
                        <td>
                          F5精轧支撑辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_5"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange5(formatte.roll_5,'F4',4)">
                              <el-option
                                v-for="item in option_5"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_5"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange5(formatte1.roll_5,'F3',3)">
                              <el-option
                                v-for="item in aoption_5"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun5()">详情
                          </el-button>
                        <!--  <el-button
                            type="primary"
                            size="mini"
                            @click="send_message5()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>
                      <!--F6精轧支撑辊-->
                      <tr>
                        <td>
                          F6精轧支撑辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_6"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange6(formatte.roll_6,'F4',4)">
                              <el-option
                                v-for="item in option_6"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_6"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange6(formatte1.roll_6,'F3',3)">
                              <el-option
                                v-for="item in aoption_6"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun6()">详情
                          </el-button>
                          <!-- <el-button
                            type="primary"
                            size="mini"
                            @click="send_message6()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>
                      <!--F7精轧支撑辊-->
                      <tr>
                        <td>
                          F7精轧支撑辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_7"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange7(formatte.roll_7,'F4',4)">
                              <el-option
                                v-for="item in option_7"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_7"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange7(formatte1.roll_7,'F3',3)">
                              <el-option
                                v-for="item in aoption_7"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun7()">详情
                          </el-button>
                          <!-- <el-button
                            type="primary"
                            size="mini"
                            @click="send_message7()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>
                      <!-- F8精轧支撑辊-->
                      <tr>
                        <td>
                          F8精轧支撑辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_8"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange8(formatte.roll_8,'F4',4)">
                              <el-option
                                v-for="item in option_8"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_8"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange8(formatte1.roll_8,'F3',3)">
                              <el-option
                                v-for="item in aoption_8"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun8()">详情
                          </el-button>
                          <!-- <el-button
                            type="primary"
                            size="mini"
                            @click="send_message8()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>
                      <!--R1粗轧工作辊-->
                      <tr>
                        <td>
                          R1粗轧工作辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_9"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange9(formatte.roll_9,'F4',4)">
                              <el-option
                                v-for="item in option_9"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_9"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange9(formatte1.roll_9,'F3',3)">
                              <el-option
                                v-for="item in aoption_9"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun9()">详情
                          </el-button>
                          <!-- <el-button
                            type="primary"
                            size="mini"
                            @click="send_message9()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>
                      <!--R1粗轧支撑辊-->
                      <tr>
                        <td>
                          R1粗轧支撑辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_10"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange10(formatte.roll_10,'F4',4)">
                              <el-option
                                v-for="item in option_10"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_10"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange10(formatte1.roll_10,'F3',3)">
                              <el-option
                                v-for="item in aoption_10"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun10()">详情
                          </el-button>
                        <!--  <el-button
                            type="primary"
                            size="mini"
                            @click="send_message10()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>
                      <!--F1E精轧立辊-->
                      <tr>
                        <td>
                          FE精轧立辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_11"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange11(formatte.roll_11,'F4',4)">
                              <el-option
                                v-for="item in option_11"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_11"
                              placeholder="请选择"
                              clearable
                              @change="rollTypeChange11(formatte1.roll_11,'F3',3)">
                              <el-option
                                v-for="item in aoption_11"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun11()">详情
                          </el-button>
                          <!-- <el-button
                            type="primary"
                            size="mini"
                            @click="send_message12()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>
                      <!--E1粗轧立辊-->
                      <tr>
                        <td>
                          E1粗轧立辊
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte.roll_12"
                              placeholder="请选择"
                              @change="rollTypeChange12(formatte.roll_12,'F4',4)">
                              <el-option
                                v-for="item in option_12"
                                :key="item.value1"
                                :label="item.value1"
                                :value="item.value1"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <div class="layout-one-input">
                            <el-select
                              v-model="formatte1.roll_12"
                              placeholder="请选择"
                              @change="rollTypeChange12(formatte1.roll_12,'F3',3)">
                              <el-option
                                v-for="item in aoption_12"
                                :key="item.value2"
                                :label="item.value2"
                                :value="item.value2"/>
                            </el-select>
                          </div>
                        </td>
                        <td>
                          <el-button
                            type="success"
                            size="mini"
                            @click="chaxun12()">详情
                          </el-button>
                          <!-- <el-button
                            type="primary"
                            size="mini"
                            @click="send_message13()">备辊请求
                          </el-button>-->
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

              <!-- <p class="backlogLists-item-title"> 选择辊号：TOP &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  BOT</p>
              <div class="layout-search1">
                <el-form
                  ref="ruleForm"
                  :model="formatte"
                  label-width="100px">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="F1精轧支撑辊"
                        prop="roll_1">
                        <el-select
                          v-model="formatte.roll_1"
                          placeholder="请选择"
                          @change="rollTypeChange1(formatte.option_1,'F1',1)">
                          <el-option
                            v-for="item in option_1"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F2精轧支撑辊"
                        prop="roll_2">
                        <el-select
                          v-model="formatte.roll_2"
                          placeholder="请选择"
                          @change="rollTypeChange2(formatte.roll_2,'F2',2)">
                          <el-option
                            v-for="item in option_2"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F3精轧支撑辊"
                        prop="roll_3">
                        <el-select
                          v-model="formatte.roll_3"
                          placeholder="请选择"
                          @change="rollTypeChange3(formatte.roll_3,'F3',3)">
                          <el-option
                            v-for="item in option_3"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F4精轧支撑辊"
                        prop="roll_4">
                        <el-select
                          v-model="formatte.roll_4"
                          placeholder="请选择"
                          @change="rollTypeChange4(formatte.roll_4,'F4',4)">
                          <el-option
                            v-for="item in option_4"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F5精轧支撑辊"
                        prop="roll_5">
                        <el-select
                          v-model="formatte.roll_5"
                          placeholder="请选择"
                          @change="rollTypeChange5(formatte.roll_5,'F5',5)">
                          <el-option
                            v-for="item in option_5"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F6精轧支撑辊"
                        prop="roll_6">
                        <el-select
                          v-model="formatte.roll_6"
                          placeholder="请选择"
                          @change="rollTypeChange6(formatte.roll_6,'F6',6)">
                          <el-option
                            v-for="item in option_6"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F7精轧支撑辊"
                        prop="roll_7">
                        <el-select
                          v-model="formatte.roll_7"
                          placeholder="请选择"
                          @change="rollTypeChange7(formatte.roll_7,'F7',7)">
                          <el-option
                            v-for="item in option_7"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R1粗轧工作辊"
                        prop="roll_8">
                        <el-select
                          v-model="formatte.roll_8"
                          placeholder="请选择"
                          @change="rollTypeChange8(formatte.roll_8,'F1',1)">
                          <el-option
                            v-for="item in option_8"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R2粗轧工作辊"
                        prop="roll_9">
                        <el-select
                          v-model="formatte.roll_9"
                          placeholder="请选择"
                          @change="rollTypeChange9(formatte.roll_9,'F2',2)">
                          <el-option
                            v-for="item in option_9"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R1粗轧支撑辊"
                        prop="roll_3">
                        <el-select
                          v-model="formatte.roll_10"
                          placeholder="请选择"
                          @change="rollTypeChange10(formatte.roll_10,'F3',3)">
                          <el-option
                            v-for="item in option_10"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R2粗轧支撑辊"
                        prop="roll_11">
                        <el-select
                          v-model="formatte.roll_11"
                          placeholder="请选择"
                          @change="rollTypeChange11(formatte.roll_11,'F4',4)">
                          <el-option
                            v-for="item in option_11"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F1E精轧立辊"
                        prop="roll_12">
                        <el-select
                          v-model="formatte.roll_12"
                          placeholder="请选择"
                          @change="rollTypeChange12(formatte.roll_12,'F5',5)">
                          <el-option
                            v-for="item in option_12"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R1E粗轧立辊"
                        prop="roll_13">
                        <el-select
                          v-model="formatte.roll_13"
                          placeholder="请选择"
                          @change="rollTypeChange13(formatte.roll_13,'F6',6)">
                          <el-option
                            v-for="item in option_13"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R2E粗轧立辊"
                        prop="roll_14">
                        <el-select
                          v-model="formatte.roll_14"
                          placeholder="请选择"
                          @change="rollTypeChange14(formatte.roll_14,'F7',7)">
                          <el-option
                            v-for="item in option_14"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="SSP锤头"
                        prop="roll_15">
                        <el-select
                          v-model="formatte.roll_15"
                          placeholder="请选择"
                          @change="rollTypeChange15(formatte.roll_15,'F7',7)">
                          <el-option
                            v-for="item in option_15"
                            :key="item.value1"
                            :label="item.value1"
                            :value="item.value1"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="F1精轧支撑辊"
                        prop="roll_1">
                        <el-select
                          v-model="formatte1.roll_1"
                          placeholder="请选择"
                          @change="rollTypeChange1(formatte1.option_1,'F1',1)">
                          <el-option
                            v-for="item in option_1"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F2精轧支撑辊"
                        prop="roll_2">
                        <el-select
                          v-model="formatte1.roll_2"
                          placeholder="请选择"
                          @change="rollTypeChange2(formatte1.roll_2,'F2',2)">
                          <el-option
                            v-for="item in option_2"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F3精轧支撑辊"
                        prop="roll_3">
                        <el-select
                          v-model="formatte1.roll_3"
                          placeholder="请选择"
                          @change="rollTypeChange3(formatte1.roll_3,'F3',3)">
                          <el-option
                            v-for="item in option_3"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F4精轧支撑辊"
                        prop="roll_4">
                        <el-select
                          v-model="formatte1.roll_4"
                          placeholder="请选择"
                          @change="rollTypeChange4(formatte1.roll_4,'F4',4)">
                          <el-option
                            v-for="item in option_4"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F5精轧支撑辊"
                        prop="roll_5">
                        <el-select
                          v-model="formatte1.roll_5"
                          placeholder="请选择"
                          @change="rollTypeChange5(formatte1.roll_5,'F5',5)">
                          <el-option
                            v-for="item in option_5"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F6精轧支撑辊"
                        prop="roll_6">
                        <el-select
                          v-model="formatte1.roll_6"
                          placeholder="请选择"
                          @change="rollTypeChange6(formatte1.roll_6,'F6',6)">
                          <el-option
                            v-for="item in option_6"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F7精轧支撑辊"
                        prop="roll_7">
                        <el-select
                          v-model="formatte1.roll_7"
                          placeholder="请选择"
                          @change="rollTypeChange7(formatte1.roll_7,'F7',7)">
                          <el-option
                            v-for="item in option_7"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R1粗轧工作辊"
                        prop="roll_8">
                        <el-select
                          v-model="formatte1.roll_8"
                          placeholder="请选择"
                          @change="rollTypeChange8(formatte1.roll_8,'F1',1)">
                          <el-option
                            v-for="item in option_8"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R2粗轧工作辊"
                        prop="roll_9">
                        <el-select
                          v-model="formatte1.roll_9"
                          placeholder="请选择"
                          @change="rollTypeChange9(formatte1.roll_9,'F2',2)">
                          <el-option
                            v-for="item in option_9"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R1粗轧支撑辊"
                        prop="roll_3">
                        <el-select
                          v-model="formatte1.roll_10"
                          placeholder="请选择"
                          @change="rollTypeChange10(formatte1.roll_10,'F3',3)">
                          <el-option
                            v-for="item in option_10"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R2粗轧支撑辊"
                        prop="roll_11">
                        <el-select
                          v-model="formatte1.roll_11"
                          placeholder="请选择"
                          @change="rollTypeChange11(formatte1.roll_11,'F4',4)">
                          <el-option
                            v-for="item in option_11"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="F1E精轧立辊"
                        prop="roll_12">
                        <el-select
                          v-model="formatte1.roll_12"
                          placeholder="请选择"
                          @change="rollTypeChange12(formatte1.roll_12,'F5',5)">
                          <el-option
                            v-for="item in option_12"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R1E粗轧立辊"
                        prop="roll_13">
                        <el-select
                          v-model="formatte1.roll_13"
                          placeholder="请选择"
                          @change="rollTypeChange13(formatte1.roll_13,'F6',6)">
                          <el-option
                            v-for="item in option_13"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="R2E粗轧立辊"
                        prop="roll_14">
                        <el-select
                          v-model="formatte1.roll_14"
                          placeholder="请选择"
                          @change="rollTypeChange14(formatte1.roll_14,'F7',7)">
                          <el-option
                            v-for="item in option_14"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="SSP锤头"
                        prop="roll_15">
                        <el-select
                          v-model="formatte1.roll_15"
                          placeholder="请选择"
                          @change="rollTypeChange15(formatte1.roll_15,'F7',7)">
                          <el-option
                            v-for="item in option_15"
                            :key="item.value2"
                            :label="item.value2"
                            :value="item.value2"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>-->

            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- <el-col
        :xl="4"
        :lg="24">
        <div class="">轧辊推荐...</div>
      </el-col>-->
      <el-col
        :xl="24"
        :lg="24">
        <div
          class="body_box"
          style="margin-top: 9px" >
          <div class="table_box">
            <table>
              <tbody >
                <tr class="t1">
                  <th>辊号</th>
                  <th>轧辊类型</th>
                  <th>上机位置</th>
                  <th>当前辊径</th>
                  <th>辊形</th>
                  <!--  <th>粗糙度</th>-->
                  <th>OS座号</th>
                  <th>DS座号</th>
                <!--<th>表面评级</th>
                <th>HSS上机次数</th>-->
                </tr>

                <tr
                  v-for="(item,index ) in tableData1"
                  :key="index">
                  <td>{{ item.roll_no }}</td>
                  <td>{{ item.roll_type }}</td>
                  <td>{{ item.roll_position }}</td>
                  <td>{{ item.currentdiameter }}</td>
                  <td>{{ item.rollshape }}</td>
                  <!-- <td>{{ item.roughness }}</td>-->
                  <td>{{ item.obearing_chock }}</td>
                  <td>{{ item.dbearing_chock }}</td>
                <!--<td/>
                <td>{{ item.loomingcount }}</td>-->

                </tr>
              </tbody>
          </table></div>
          <div style="text-align: center;margin-top: 20px">
            <el-button
              type="success"
              size="mini"
              @click="refresh()">备辊车查询
            </el-button>
            <el-button
              type="success"
              size="mini"
              @click="chakan()">查看
            </el-button>
            <!--<el-button
              v-show="dialog_show"
              type="primary"
              size="mini"
              @click="open1_click()">确认备辊
            </el-button>-->
            <el-button
              v-show="!dialog_show"
              type="danger"
              size="mini"
              @click="open3_click()">换辊清空
            </el-button>
            <!-- <el-button
              type="danger"
              size="small"
              @click="send_message()">send磨辊间
            </el-button>-->
          </div>
        </div>


      </el-col>
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
          :table-height="205"
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
                </el-form>
              </el-col>
              <el-col :span="4">
                <div class="btn">
                  <el-button
                    size="mini"
                    type="primary"
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
              prop="time_1"
              width="160px"
              label="备辊时间"/>
            <el-table-column
              prop="istate"
              label="状态">
              <template slot-scope="scope">
                <span>{{ scope.row.istate===0?'未确认':scope.row.istate===1?'已确认':scope.row.istate===2?'有回退辊':'' }}</span>
              </template>

            </el-table-column>
          <!--  <el-table-column
              label="操作"
              min-width="100"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click.stop="find_1(scope.row)">详情
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
          :table-height="350"
          :span-method="spanMethod"
          :table-head="false"
          :table-foot="false"
          :is-pagination-show="false"
          style="margin-top: 5px">
          <template slot="TableBody">
            <el-table-column
              width="120px"
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
            <el-table-column
              prop="currentdiameter"
              label="当前辊径"/>
            <el-table-column
              prop="rollshape"
              width="160px"
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
    <!--第一个弹窗  是否打开项目-->
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
          :offset="10"><div > <span >
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
                label="辊号">
                <el-input
                  v-model="searchInfoss.roll_no"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="原因"
                prop="chock_no">
                <el-input
                  v-model="searchInfoss.chock_no1"/>
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
      width="70%">
      <div
        class="layout-search"
        style="border: 1px solid yellow">
        <p style="text-align:left;color:white">取消换辊原因:</p>
        <el-form
          :model="searchInfo2"
          label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="辊号">
                <el-input
                  v-model="searchInfo2.roll_no"/>
              </el-form-item>
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
      width="90%">
      <div class="gd006_1">
        <div class="body_box">
          <div class="table_box layout-default-margin">
            <table >
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
                  v-for="(item,index ) in tableData_tan"
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
        <div style="text-align: center">
          <el-button
            type="primary"
            size="small"
            @click="send_1()">发送
          </el-button>
        </div>
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
                  <el-input
                    v-model="arry_repeat[key].reaon"/>
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
import { get, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import moment from 'moment'
export default {
  name: 'GD006',
  components: { TableEasy },
  data() {
    return {
      pulse: false,
      ming: '',
      gun_1: '',
      gun_2: '',
      option_1: [],
      option_2: [],
      option_3: [],
      option_4: [],
      option_5: [],
      option_6: [],
      option_7: [],
      option_8: [],
      option_9: [],
      option_10: [],
      option_11: [],
      option_12: [],
      option_13: [],
      option_14: [],
      option_15: [],
      aoption_1: [],
      aoption_2: [],
      aoption_3: [],
      aoption_4: [],
      aoption_5: [],
      aoption_6: [],
      aoption_7: [],
      aoption_8: [],
      aoption_9: [],
      aoption_10: [],
      aoption_11: [],
      aoption_12: [],
      aoption_13: [],
      aoption_14: [],
      aoption_15: [],
      formatte: {},
      formatte1: {},
      clickrow: '',
      radio: '0',
      aaa: 100,
      bbb: 0,
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
      option: [
        { value: 'F1精轧支撑辊' },
        { value: 'F2精轧支撑辊' },
        { value: 'F3精轧支撑辊' },
        { value: 'F4精轧支撑辊' },
        { value: 'F5精轧支撑辊' },
        { value: 'F6精轧支撑辊' },
        { value: 'F7精轧支撑辊' },
        { value: 'R1粗轧工作辊' },
        { value: 'R2粗轧工作辊' },
        { value: 'R1粗轧支撑辊' },
        { value: 'R2粗轧支撑辊' },
        { value: 'F1E精轧立辊' },
        { value: 'R1E粗轧立辊' },
        { value: 'R2E粗轧立辊' },
        { value: 'SSP锤头' }
      ],
      roll_type_s: [
        '精轧支撑辊',
        '精轧支撑辊',
        '精轧支撑辊',
        '精轧支撑辊',
        '精轧支撑辊',
        '精轧支撑辊',
        '精轧支撑辊',
        '精轧支撑辊',
        '粗轧工作辊',
        '粗轧支撑辊',
        '精轧立辊',
        '粗轧立辊'
      ],
      total: 0,
      radio1: '',
      tableData1: [],
      total1: 0,
      checkboxGroup1: ['F1'],
      checked1: [],
      checked2: [],
      item: {},
      search_roll_no: {},
      valno: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialog_sure: true,
      dialog_show: true,
      beigun: '',
      huan_roll: '',
      searchInfoss: {},
      sstableData: [],
      searchInfo1: {
        // frame_noid: 2, //机架号id
        frame_no: '', //机架号
        roll_no: '', //辊号
        dotype: 1, //操作类型（确认备辊时是1，取消备辊时是2）
        reasonid: '', //原因id（下拉框，内容暂无）
        reason: '', //原因（下拉框，内容暂无）
        if_grind: 1, //是否重磨（checkbox）
        pretime: '' //备辊时间（自动带入当前时间）
      },
      searchInfo2: {
        //  frame_noid: 2, //机架号id
        frame_no: '', //机架号
        roll_no: '', //辊号
        dotype: 2, //操作类型（确认备辊时是1，取消备辊时是2）
        reasonid: '', //原因id（下拉框，内容暂无）
        reason: '', //原因（下拉框，内容暂无）
        ifcm: '0', //是否重磨不为1时会放入select中
        pretime: '' //备辊时间（自动带入当前时间）
      },
      xuyao1: '',
      xuyao2: '',
      xuyao3: '',
      xuyao4: '',
      xuyao5: '',
      xuyao6: '',
      xuyao7: '',
      xuyao8: '',
      xuyao9: '',
      xuyao10: '',
      xuyao11: '',
      xuyao12: '',
      xuyao13: '',
      xuyao14: '',
      xuyao15: '',
      arry_all: [
        {
          frame_noid: 1,
          frame_no: 'F1精轧支撑辊',
          roll_type: '精轧支撑辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        },
        {
          frame_noid: 2,
          frame_no: 'F2精轧支撑辊',
          roll_type: '精轧支撑辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        },
        {
          frame_noid: 3,
          frame_no: 'F3精轧支撑辊',
          roll_type: '精轧支撑辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        },
        {
          frame_noid: 4,
          frame_no: 'F4精轧支撑辊',
          roll_type: '精轧支撑辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        },
        {
          frame_noid: 5,
          frame_no: 'F5精轧支撑辊',
          roll_type: '精轧支撑辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        },
        {
          frame_noid: 6,
          frame_no: 'F6精轧支撑辊',
          roll_type: '精轧支撑辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        },
        {
          frame_noid: 7,
          frame_no: 'F7精轧支撑辊',
          roll_type: '精轧支撑辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        },
        {
          frame_noid: 15,
          frame_no: 'F8精轧支撑辊',
          roll_type: '精轧支撑辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        },
        {
          frame_noid: 8,
          frame_no: 'R1粗轧工作辊',
          roll_type: '粗轧工作辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        },
        {
          frame_noid: 10,
          frame_no: 'R1粗轧支撑辊',
          roll_type: '粗轧支撑辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        },
        {
          frame_noid: 11,
          frame_no: 'FE精轧立辊',
          roll_type: '精轧立辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        },
        {
          frame_noid: 12,
          frame_no: 'E1粗轧立辊',
          roll_type: '粗轧立辊',
          roll_no: '', //组合辊号
          sdotype: 1,
          dotype: 1,
          idotype: 1
        }
      ],
      tableData_tan: [],
      tableData_tan_1: [],
      tan: false,
      time_senf: '',
      group1: '',
      group2: '',
      table_1: [],
      table_2: [],
      pageIndex: 1,
      pageSize: 10,
      searchInfo_java: {},
      tableData_java: [],
      total_aa: 0,
      p1: '',
      p2: '',
      p3: '',
      htmlTitle: '装备工备辊导出',
      last_1: false,
      rowIndex_time: 0,
      zhaji_open: false,
      bohui_reason: false,
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
    /* this.searchInfo_java.dend = moment().format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo_java.dbegin = moment()
      .subtract(1, 'hours')
      .format('YYYY-MM-DD HH:mm:ss')*/
    // this.timer = setTimeout(this.get, 5000)
    // this.findAll()
    this.findcar()
    // this.beigunre() //备辊车刷新
    this.find_select()
    this.find_elec()
    //选择框
    //备辊表
    /* post('/rollPrelistHistoryR/findNew', {
      condition: {
        frame_noid: 1,
        sdotype: 1 //粗轧为1
      }
    }).then(res => {})*/
    //this.findroll()
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
      if (row.columnIndex === 0) {
        // this.tableData  修改
        const _row = this.flitterData(this.table_1).one[row.rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },

    //原生合并列
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

      /* post('/rollHsR/findByPage2', {
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
          post('/rollHsR/changestate2', {
            rollHsR: {
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
      post('/rollHsR/findByPage2', {
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
          post('/rollHsR/changestate2', {
            rollHsR: {
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

      post('/rollHsR/findByPage2', {
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
          post('/rollHsR/changestate', {
            rollHsR: {
              istate: 1,
              time_1: this.rowIndex_time,
              snote: ''
            }
          }).then(res => {
            this.find_elec()
          })
        }
      })

      /*  post('/rollHsR/changestate', {
        rollHsR: {
          istate: 1,
          time_1: this.rowIndex_time,
          snote: ''
        }
      }).then(res => {})*/
    },
    //右下角打印
    pdf_last() {
      this.table_2 = []
      this.table_2 = this.table_1
      this.last_1 = true
      setTimeout(() => {
        this.mergeCell('test4', 0, 0, 0)
      }, 2000)
      setTimeout(() => {
        this.getPdf('pdfDom', this.htmlTitle)
        this.last_1 = false
      }, 2500)
    },
    //左下角详情
    find_1(val) {
      var find_time = val.time_1
      this.p1 = ''
      this.p2 = ''
      this.p3 = ''
      this.table_1 = []
      //点击获取数据
      post('/rollHsR/findByPage', {
        pageIndex: '1',
        pageSize: '40',
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
      this.rowIndex_time = val.time_1
      var find_time = val.time_1
      this.p1 = ''
      this.p2 = ''
      this.p3 = ''
      this.table_1 = []
      //点击获取数据
      post('/rollHsR/findByPage', {
        pageIndex: '1',
        pageSize: '40',
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

    //查询电子滚票
    find_elec() {
      post('/rollHsR/findByPage2', {
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
          this.cellClick(res.data[0])
          //this.find_1(res.data[0].time_1)
        }
      })
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.find_elec()
    },
    //分页之一页多少条
    handleSizeChange(val) {
      this.pageSize = val
      this.find_elec()
    },
    //下拉框
    find_select() {
      this.pulse = true
      setTimeout(() => {
        this.pulse = false
      }, 1000)
      this.formatte = {}
      this.formatte1 = {}
      this.option_1 = []
      this.option_2 = []
      this.option_3 = []
      this.option_4 = []
      this.option_5 = []
      this.option_6 = []
      this.option_7 = []
      this.option_8 = []
      this.option_9 = []
      this.option_10 = []
      this.option_11 = []
      this.option_12 = []
      this.option_13 = []
      this.option_14 = []
      this.option_15 = []
      //第二
      this.aoption_1 = []
      this.aoption_2 = []
      this.aoption_3 = []
      this.aoption_4 = []
      this.aoption_5 = []
      this.aoption_6 = []
      this.aoption_7 = []
      this.aoption_8 = []
      this.aoption_9 = []
      this.aoption_10 = []
      this.aoption_11 = []
      this.aoption_12 = []
      this.aoption_13 = []
      this.aoption_14 = []
      this.aoption_15 = []

      post('/rollPrelistR/findByPage', {}).then(res => {
        for (let i = 0; res.data.length > i; i++) {
          if (
            res.data[i].frame_no == 'F1支撑辊' &&
            res.data[i].value1 != null
          ) {
            this.option_1.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F2支撑辊' &&
            res.data[i].value1 != null
          ) {
            this.option_2.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F3支撑辊' &&
            res.data[i].value1 != null
          ) {
            this.option_3.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F4支撑辊' &&
            res.data[i].value1 != null
          ) {
            this.option_4.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F5支撑辊' &&
            res.data[i].value1 != null
          ) {
            this.option_5.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F6支撑辊' &&
            res.data[i].value1 != null
          ) {
            this.option_6.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F7支撑辊' &&
            res.data[i].value1 != null
          ) {
            this.option_7.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F8支撑辊' &&
            res.data[i].value1 != null
          ) {
            this.option_8.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'R1工作辊' &&
            res.data[i].value1 != null
          ) {
            this.option_9.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'R1支撑辊' &&
            res.data[i].value1 != null
          ) {
            this.option_10.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'FE立辊辊' &&
            res.data[i].value1 != null
          ) {
            this.option_11.push(res.data[i])
          }
          if (res.data[i].frame_no == 'E1立辊' && res.data[i].value1 != null) {
            this.option_12.push(res.data[i])
          }
        }
        for (let i = 0; res.data.length > i; i++) {
          if (
            res.data[i].frame_no == 'F1支撑辊' &&
            res.data[i].value2 != null
          ) {
            this.aoption_1.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F2支撑辊' &&
            res.data[i].value2 != null
          ) {
            this.aoption_2.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F3支撑辊' &&
            res.data[i].value2 != null
          ) {
            this.aoption_3.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F4支撑辊' &&
            res.data[i].value2 != null
          ) {
            this.aoption_4.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F5支撑辊' &&
            res.data[i].value2 != null
          ) {
            this.aoption_5.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F6支撑辊' &&
            res.data[i].value2 != null
          ) {
            this.aoption_6.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F7支撑辊' &&
            res.data[i].value2 != null
          ) {
            this.aoption_7.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'F8支撑辊' &&
            res.data[i].value2 != null
          ) {
            this.aoption_8.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'R1工作辊' &&
            res.data[i].value2 != null
          ) {
            this.aoption_9.push(res.data[i])
          }
          if (
            res.data[i].frame_no == 'R1支撑辊' &&
            res.data[i].value2 != null
          ) {
            this.aoption_10.push(res.data[i])
          }
          if (res.data[i].frame_no == 'FE立辊' && res.data[i].value2 != null) {
            this.aoption_11.push(res.data[i])
          }
          if (res.data[i].frame_no == 'E1立辊' && res.data[i].value2 != null) {
            this.aoption_12.push(res.data[i])
          }
        }
        console.log(this.option_1, '你', this.option_2)
        // this.option_2 = res.data
      })
    },
    //select选择
    rollTypeChange1(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_1 && this.formatte1.roll_1) {
        nex = this.formatte.roll_1 + '/' + this.formatte1.roll_1
      }
      if (this.formatte.roll_1 && this.formatte1.roll_1 == undefined) {
        nex = this.formatte.roll_1 + '/null'
      }
      if (this.formatte.roll_1 == undefined && this.formatte1.roll_1) {
        nex = 'null/' + this.formatte1.roll_1
      }
      if (this.formatte.roll_1 == '' && this.formatte1.roll_1) {
        nex = 'null/' + this.formatte1.roll_1
      }
      if (this.formatte.roll_1 && this.formatte1.roll_1 == '') {
        nex = this.formatte.roll_1 + '/null'
      }

      this.arry_all[0].roll_no = nex
      this.chaxun1()
      // this.xuyao1 = nex
    },
    rollTypeChange2(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_2 && this.formatte1.roll_2) {
        nex = this.formatte.roll_2 + '/' + this.formatte1.roll_2
      }
      if (this.formatte.roll_2 && this.formatte1.roll_2 == undefined) {
        nex = this.formatte.roll_2 + '/null'
      }
      if (this.formatte.roll_2 == undefined && this.formatte1.roll_2) {
        nex = 'null/' + this.formatte1.roll_2
      }
      if (this.formatte.roll_2 && this.formatte1.roll_2 == '') {
        nex = this.formatte.roll_2 + '/null'
      }
      if (this.formatte.roll_2 == '' && this.formatte1.roll_2) {
        nex = 'null/' + this.formatte1.roll_2
      }
      this.arry_all[1].roll_no = nex
      this.chaxun2()
      // this.xuyao2 = nex
    },
    rollTypeChange3(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_3 && this.formatte1.roll_3) {
        nex = this.formatte.roll_3 + '/' + this.formatte1.roll_3
      }
      if (this.formatte.roll_3 && this.formatte1.roll_3 == undefined) {
        nex = this.formatte.roll_3 + '/null'
      }
      if (this.formatte.roll_3 == undefined && this.formatte1.roll_3) {
        nex = 'null/' + this.formatte1.roll_3
      }
      if (this.formatte.roll_3 && this.formatte1.roll_3 == '') {
        nex = this.formatte.roll_3 + '/null'
      }
      if (this.formatte.roll_3 == '' && this.formatte1.roll_3) {
        nex = 'null/' + this.formatte1.roll_3
      }
      this.arry_all[2].roll_no = nex
      this.chaxun3()
      //this.xuyao3 = nex
    },
    rollTypeChange4(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_4 && this.formatte1.roll_4) {
        nex = this.formatte.roll_4 + '/' + this.formatte1.roll_4
      }
      if (this.formatte.roll_4 && this.formatte1.roll_4 == undefined) {
        nex = this.formatte.roll_4 + '/null'
      }
      if (this.formatte.roll_4 == undefined && this.formatte1.roll_4) {
        nex = 'null/' + this.formatte1.roll_4
      }
      if (this.formatte.roll_4 && this.formatte1.roll_4 == '') {
        nex = this.formatte.roll_4 + '/null'
      }
      if (this.formatte.roll_4 == '' && this.formatte1.roll_4) {
        nex = 'null/' + this.formatte1.roll_4
      }
      this.arry_all[3].roll_no = nex
      this.chaxun4()
      // this.xuyao4 = nex
    },
    rollTypeChange5(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_5 && this.formatte1.roll_5) {
        nex = this.formatte.roll_5 + '/' + this.formatte1.roll_5
      }
      if (this.formatte.roll_5 && this.formatte1.roll_5 == undefined) {
        nex = this.formatte.roll_5 + '/null'
      }
      if (this.formatte.roll_5 == undefined && this.formatte1.roll_5) {
        nex = 'null/' + this.formatte1.roll_5
      }
      if (this.formatte.roll_5 && this.formatte1.roll_5 == '') {
        nex = this.formatte.roll_5 + '/null'
      }
      if (this.formatte.roll_5 == '' && this.formatte1.roll_5) {
        nex = 'null/' + this.formatte1.roll_5
      }
      this.arry_all[4].roll_no = nex
      this.chaxun5()
      // this.xuyao5 = nex
    },
    rollTypeChange6(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_6 && this.formatte1.roll_6) {
        nex = this.formatte.roll_6 + '/' + this.formatte1.roll_6
      }
      if (this.formatte.roll_6 && this.formatte1.roll_6 == undefined) {
        nex = this.formatte.roll_6 + '/null'
      }
      if (this.formatte.roll_6 == undefined && this.formatte1.roll_6) {
        nex = 'null/' + this.formatte1.roll_6
      }
      if (this.formatte.roll_6 && this.formatte1.roll_6 == '') {
        nex = this.formatte.roll_6 + '/null'
      }
      if (this.formatte.roll_6 == '' && this.formatte1.roll_6) {
        nex = 'null/' + this.formatte1.roll_6
      }
      this.arry_all[5].roll_no = nex
      this.chaxun6()
      // this.xuyao6 = nex
    },
    rollTypeChange7(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_7 && this.formatte1.roll_7) {
        nex = this.formatte.roll_7 + '/' + this.formatte1.roll_7
      }
      if (this.formatte.roll_7 && this.formatte1.roll_7 == undefined) {
        nex = this.formatte.roll_7 + '/null'
      }
      if (this.formatte.roll_7 == undefined && this.formatte1.roll_7) {
        nex = 'null/' + this.formatte1.roll_7
      }
      if (this.formatte.roll_7 && this.formatte1.roll_7 == '') {
        nex = this.formatte.roll_7 + '/null'
      }
      if (this.formatte.roll_7 == '' && this.formatte1.roll_7) {
        nex = 'null/' + this.formatte1.roll_7
      }
      this.arry_all[6].roll_no = nex
      this.chaxun7()
      //this.xuyao7 = nex
    },
    rollTypeChange8(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_8 && this.formatte1.roll_8) {
        nex = this.formatte.roll_8 + '/' + this.formatte1.roll_8
      }
      if (this.formatte.roll_8 && this.formatte1.roll_8 == undefined) {
        nex = this.formatte.roll_8 + '/null'
      }
      if (this.formatte.roll_8 == undefined && this.formatte1.roll_8) {
        nex = 'null/' + this.formatte1.roll_8
      }
      if (this.formatte.roll_8 && this.formatte1.roll_8 == '') {
        nex = this.formatte.roll_8 + '/null'
      }
      if (this.formatte.roll_8 == '' && this.formatte1.roll_8) {
        nex = 'null/' + this.formatte1.roll_8
      }
      this.arry_all[7].roll_no = nex
      this.chaxun8()
      // this.xuyao8 = nex
    },
    rollTypeChange9(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_9 && this.formatte1.roll_9) {
        nex = this.formatte.roll_9 + '/' + this.formatte1.roll_9
      }
      if (this.formatte.roll_9 && this.formatte1.roll_9 == undefined) {
        nex = this.formatte.roll_9 + '/null'
      }
      if (this.formatte.roll_9 == undefined && this.formatte1.roll_9) {
        nex = 'null/' + this.formatte1.roll_9
      }
      if (this.formatte.roll_9 && this.formatte1.roll_9 == '') {
        nex = this.formatte.roll_9 + '/null'
      }
      if (this.formatte.roll_9 == '' && this.formatte1.roll_9) {
        nex = 'null/' + this.formatte1.roll_9
      }
      this.arry_all[8].roll_no = nex
      this.chaxun9()
      // this.xuyao9 = nex
    },
    rollTypeChange10(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_10 && this.formatte1.roll_10) {
        nex = this.formatte.roll_10 + '/' + this.formatte1.roll_10
      }
      if (this.formatte.roll_10 && this.formatte1.roll_10 == undefined) {
        nex = this.formatte.roll_10 + '/null'
      }
      if (this.formatte.roll_10 == undefined && this.formatte1.roll_10) {
        nex = 'null/' + this.formatte1.roll_10
      }
      if (this.formatte.roll_10 && this.formatte1.roll_10 == '') {
        nex = this.formatte.roll_10 + '/null'
      }
      if (this.formatte.roll_10 == '' && this.formatte1.roll_10) {
        nex = 'null/' + this.formatte1.roll_10
      }
      this.arry_all[9].roll_no = nex
      this.xuyao10 = nex
      this.chaxun10()
    },
    rollTypeChange11(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_11 && this.formatte1.roll_11) {
        nex = this.formatte.roll_11 + '/' + this.formatte1.roll_11
      }
      if (this.formatte.roll_11 && this.formatte1.roll_11 == undefined) {
        nex = this.formatte.roll_11 + '/null'
      }
      if (this.formatte.roll_11 == undefined && this.formatte1.roll_11) {
        nex = 'null/' + this.formatte1.roll_11
      }
      if (this.formatte.roll_11 && this.formatte1.roll_11 == '') {
        nex = this.formatte.roll_11 + '/null'
      }
      if (this.formatte.roll_11 == '' && this.formatte1.roll_11) {
        nex = 'null/' + this.formatte1.roll_11
      }
      this.arry_all[10].roll_no = nex
      this.chaxun11()
      // this.xuyao11 = nex
    },
    rollTypeChange12(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_12 && this.formatte1.roll_12) {
        nex = this.formatte.roll_12 + '/' + this.formatte1.roll_12
      }
      if (this.formatte.roll_12 && this.formatte1.roll_12 == undefined) {
        nex = this.formatte.roll_12 + '/null'
      }
      if (this.formatte.roll_12 == undefined && this.formatte1.roll_12) {
        nex = 'null/' + this.formatte1.roll12
      }
      if (this.formatte.roll_12 && this.formatte1.roll_12 == '') {
        nex = this.formatte.roll_12 + '/null'
      }
      if (this.formatte.roll_12 == '' && this.formatte1.roll_12) {
        nex = 'null/' + this.formatte1.roll12
      }
      this.arry_all[11].roll_no = nex
      this.chaxun12()
      //this.xuyao12 = nex
    },
    rollTypeChange13(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_13 && this.formatte1.roll_13) {
        nex = this.formatte.roll_13 + '/' + this.formatte1.roll_13
      }
      if (this.formatte.roll_13 && this.formatte1.roll_13 == undefined) {
        nex = this.formatte.roll_13 + '/null'
      }
      if (this.formatte.roll_13 == undefined && this.formatte1.roll_13) {
        nex = 'null/' + this.formatte1.roll_13
      }
      if (this.formatte.roll_13 && this.formatte1.roll_13 == '') {
        nex = this.formatte.roll_13 + '/null'
      }
      if (this.formatte.roll_13 == '' && this.formatte1.roll_13) {
        nex = 'null/' + this.formatte1.roll_13
      }
      this.arry_all[12].roll_no = nex
      // this.xuyao13 = nex
    },
    rollTypeChange14(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_14 && this.formatte1.roll_14) {
        nex = this.formatte.roll_14 + '/' + this.formatte1.roll_14
      }
      if (this.formatte.roll_14 && this.formatte1.roll_14 == undefined) {
        nex = this.formatte.roll_14 + '/null'
      }
      if (this.formatte.roll_14 == undefined && this.formatte1.roll_14) {
        nex = 'null/' + this.formatte1.roll_14
      }
      if (this.formatte.roll_14 && this.formatte1.roll_14 == '') {
        nex = this.formatte.roll_14 + '/null'
      }
      if (this.formatte.roll_14 == '' && this.formatte1.roll_14) {
        nex = 'null/' + this.formatte1.roll_14
      }
      this.arry_all[13].roll_no = nex
      // this.xuyao14 = nex
    },
    rollTypeChange15(vId, val, num) {
      var nex = ''
      if (this.formatte.roll_15 && this.formatte1.roll_15) {
        nex = this.formatte.roll_15 + '/' + this.formatte1.roll_15
      }
      if (this.formatte.roll_15 && this.formatte1.roll_15 == undefined) {
        nex = this.formatte.roll_15 + '/null'
      }
      if (this.formatte.roll_15 == undefined && this.formatte1.roll_15) {
        nex = 'null/' + this.formatte1.roll_15
      }
      if (this.formatte.roll_15 && this.formatte1.roll_15 == '') {
        nex = this.formatte.roll_15 + '/null'
      }
      if (this.formatte.roll_15 == '' && this.formatte1.roll_15) {
        nex = 'null/' + this.formatte1.roll_15
      }
      this.arry_all[14].roll_no = nex
      // this.xuyao15 = nex
    },
    chaxun1() {
      console.log(this.xuyao1)
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[0].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun2() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[1].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun3() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[2].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun4() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[3].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun5() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[4].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun6() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[5].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun7() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[6].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun8() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[7].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun9() {
      this.tableData1 = []
      //R1粗轧工作辊把top和bot矫正
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[8].roll_no }
      }).then(res => {
        if (res.data.length == 2) {
          if (res.data[0].roll_position == 'TOP') {
            this.tableData1 = res.data
          } else {
            for (let i = 2; 0 < i; i--) {
              this.tableData1.push(res.data[i - 1])
              console.log(this.tableData1)
            }
          }
        } else if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun10() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[9].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun11() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[10].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun12() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[11].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun13() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[12].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun14() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[13].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chaxun15() {
      this.tableData1 = []
      //下面表中两条详细信息
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.arry_all[14].roll_no }
      }).then(res => {
        if (res.data[0].roll_no) {
          this.tableData1 = res.data
        }
      })
    },
    chakan() {
      this.tableData_tan = []
      //班组
      post('/sysBz/findbz').then(res => {
        this.group1 = res.bc
        this.group2 = res.bz
        this.time_senf = moment().format('YYYY-MM-DD HH:mm:ss')
      })
      this.repeat(0, 12)
      setTimeout(() => {
        this.tan = true
      }, 1500)
    },
    repeat(num, length) {
      if (this.arry_all[num].roll_no) {
        //对R1粗轧工作辊top和bot矫正
        if (num == 8) {
          //下面表中两条详细信息
          post('/rollInformation/findByPre', {
            condition: { roll_no: this.arry_all[num].roll_no }
          }).then(res => {
            debugger
            if (res.data.length == 2) {
              if (res.data[0].roll_position == 'TOP') {
                for (let i = 0; res.data.length > i; i++) {
                  res.data[i].frame_no = this.arry_all[num].frame_no
                  this.tableData_tan.push(res.data[i])
                }
              } else {
                for (let i = 2; 0 < i; i--) {
                  res.data[i - 1].frame_no = this.arry_all[num].frame_no
                  this.tableData_tan.push(res.data[i - 1])
                }
              }
              if (++num < length) {
                this.repeat(num, length)
              }
            } else {
              for (let i = 0; res.data.length > i; i++) {
                res.data[i].frame_no = this.arry_all[num].frame_no
                this.tableData_tan.push(res.data[i])
              }
              if (++num < length) {
                this.repeat(num, length)
              }
            }
          })
        } else {
          //下面表中两条详细信息
          post('/rollInformation/findByPre', {
            condition: { roll_no: this.arry_all[num].roll_no }
          }).then(res => {
            for (let i = 0; res.data.length > i; i++) {
              res.data[i].frame_no = this.arry_all[num].frame_no
              this.tableData_tan.push(res.data[i])
            }
            if (++num < length) {
              this.repeat(num, length)
            }
          })
        }
      } else {
        if (++num < length) {
          this.repeat(num, length)
        }
      }
    },
    send_1() {
      //发送中间件辊号
      this.send_him()
      //发送备辊信息
      this.send_repeat(0, 12)
      //发送Java保存
      this.send_java(0, this.tableData_tan.length)
      setTimeout(() => {
        this.findcar()
      }, 4700)
      this.tan = false
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
      post('/rollHsR/insert', {
        rollHsR: this.tableData_tan[val]
      }).then(res => {
        if (++val < length) {
          this.send_java(val, length)
        }
      })
    },
    send_repeat(num, length) {
      if (this.arry_all[num].roll_no) {
        post('/rollPrelistHistory/insert', {
          rollPrelistHistory: this.arry_all[num],
          mut: 1
        }).then(res => {
          /* setTimeout(() => {
            post('webservice/sendTagNew', {
              tagList: [
                {
                  name: 'SEND_ROLL_NO',
                  value: this.arry_all[num].roll_no
                }
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
            })
          }, 400)*/

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
    },
    //查询换辊车
    findcar() {
      post('/rcKurumaInfo/findlist', {
        condition: { mut: 1 }
      }).then(res => {
        this.tableData = res
      })
    },
    //点击备辊表
    text_dian(val, key) {
      this.beigun = val.roll_no //点击获得单元格辊号
      this.bbb = key //行
      // this.dialogVisible = true //备辊弹窗
      this.findroll_1()
      this.ming = key
      this.searchInfo1 = val
      this.searchInfoss = val
    },
    refresh() {
      //this.beigunre() //备辊查询
      this.ming = '' //关闭大小
      // this.findAll()
      this.tableData1 = [] //最下面表两条数据
    },
    //刷新获得备辊车信息
    beigunre() {
      this.tableDatas = []
      this.resect(0, 12)
      console.log(this.tableDatas)
    },
    //15个备辊表
    /*  resect(num, length) {
      post('/rollPrelistHistoryR/findNew', {
        condition: {
          frame_noid: num + 1,
          sdotype: 1 //粗轧为1
        }
      }).then(res => {
        var a1 = res.data
        if (res.data) {
          this.tableDatas.push(res.data)
        } else {
          this.tableDatas.push({})
        }
        if (++num < length) {
          this.resect(num, length)
        } else {
        }
      })
    },*/
    //1查看详情
    findroll_1() {
      this.dialog_sure = true
      this.dialog_show = true
      var roll_no = this.beigun
      this.dialogVisible = false
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.beigun }
      }).then(res => {
        if (res.data[0].loomingposition == null) {
          res.data[0].loomingposition = '上辊'
          res.data[1].loomingposition = '下辊'
        }
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
      /*  var no_roll = [
        'F1精轧支撑辊',
        'F2精轧支撑辊',
        'F3精轧支撑辊',
        'F4精轧支撑辊',
        'F5精轧支撑辊',
        'F6精轧支撑辊',
        'F7精轧支撑辊',
        'R1粗轧工作辊',
        'R2粗轧工作辊',
        'R1粗轧支撑辊',
        'R2粗轧支撑辊',
        'F1E精轧立辊',
        'R1E粗轧立辊',
        'R2E粗轧立辊',
        'SSP锤头'
      ]
      var t2 = this.bbb //行
      this.fame_no1 = no_roll[t2]
      this.searchInfoss = {} //清空
      //为确认备辊和辊号
      this.searchInfo1.frame_no = this.fame_no1*/

      //机架范围确定
      if (
        this.searchInfo1.frame_no == 'F1精轧支撑辊' ||
        this.searchInfo1.frame_no == 'F2精轧支撑辊' ||
        this.searchInfo1.frame_no == 'F3精轧支撑辊' ||
        this.searchInfo1.frame_no == 'F4精轧支撑辊' ||
        this.searchInfo1.frame_no == 'F5精轧支撑辊' ||
        this.searchInfo1.frame_no == 'F6精轧支撑辊' ||
        this.searchInfo1.frame_no == 'F7精轧支撑辊'
      ) {
        this.option = [
          { value: 'F1精轧支撑辊' },
          { value: 'F2精轧支撑辊' },
          { value: 'F3精轧支撑辊' },
          { value: 'F4精轧支撑辊' },
          { value: 'F5精轧支撑辊' },
          { value: 'F6精轧支撑辊' },
          { value: 'F7精轧支撑辊' }
        ]
      } else if (
        this.searchInfo1.frame_no == 'R1粗轧工作辊' ||
        this.searchInfo1.frame_no == 'R2粗轧工作辊'
      ) {
        this.option = [{ value: 'R1粗轧工作辊' }, { value: 'R2粗轧工作辊' }]
      } else if (
        this.searchInfo1.frame_no == 'R1粗轧支撑辊' ||
        this.searchInfo1.frame_no == 'R2粗轧支撑辊'
      ) {
        this.option = [{ value: 'R1粗轧支撑辊' }, { value: 'R2粗轧支撑辊' }]
      } else if (this.searchInfo1.frame_no == 'F1E精轧立辊') {
        this.option = [{ value: 'F1E精轧立辊' }]
      } else if (
        this.searchInfo1.frame_no == 'R1E粗轧立辊' ||
        this.searchInfo1.frame_no == 'R2E粗轧立辊'
      ) {
        this.option = [{ value: 'R1E粗轧立辊' }, { value: 'R2E粗轧立辊' }]
      } else if (this.searchInfo1.frame_no == 'SSP锤头') {
        this.option = [{ value: 'SSP锤头' }]
      }
      this.searchInfoss.roll_type = this.roll_type_s[this.bbb]
    },
    //确认备辊
    open2_click() {
      this.dialogVisible1 = false
      this.searchInfo1.roll_type = this.roll_type_s[this.bbb]
      this.searchInfo1.dotype = 1
      this.searchInfo1.pretime = moment().format('YYYY-MM-DD HH:mm:ss')
      //发给后台
      post('/rollPrelistHistory/insert', {
        rollPrelistHistory: this.searchInfo1,
        mut: 1
      }).then(res => {
        if (res) {
          //定时器
          this.refresh()
          setTimeout(() => {
            this.findcar()
            this.refresh()
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
            /* {
              name: 'RC_CAR_STANDNO',
              value: this.searchInfo1.frame_no.replace(/[^0-9&&^a-z]/gi, '')
            }*/
            {
              name: 'RC_CAR_STANDNO',
              value: this.searchInfo1.frame_no
            }
          ]
        }).then(res => {
          console.log('11111', res)
          post('webservice/sendTagNew', {
            tagList: [{ name: 'ROLL_PUT_INTO_RC_CAR', value: '0' }]
          })
        })
      }, 800)
    },
    //取消备辊
    open2_click_clear() {
      this.dialogVisible1 = false
      //取消备辊
      this.searchInfoss.dotype = 2
      post('/rollPrelistHistory/insert', {
        rollPrelistHistory: this.searchInfoss,
        mut: 1
      }).then(res => {
        this.tableDatan_0 = res.data
        this.total_1 = res.count
      })
    },
    //点击换辊小车
    huan_click(va1, va12) {
      this.searchInfo2.roll_no = va12.value //显示取消换辊车画面上辊号
      this.searchInfo2.frame_no = va12.key //显示取消换辊车画面上机架
      this.searchInfo2.roll_type = this.roll_type_s[va1] //显示取消换辊车画面上类型
      this.huan_roll = va12.value
      if (va12.value != null && va12.value != '') {
        //this.dialogVisible2 = true
        this.findroll_2()
      }
      // console.log(va12.key)
      // 换辊车表格点击改变颜色
      switch (va12.key) {
        case 'F1精轧支撑辊':
          this.clickrow = 0
          break
        case 'F2精轧支撑辊':
          this.clickrow = 1
          break
        case 'F3精轧支撑辊':
          this.clickrow = 2
          break
        case 'F4精轧支撑辊':
          this.clickrow = 3
          break
        case 'F5精轧支撑辊':
          this.clickrow = 4
          break
        case 'F6精轧支撑辊':
          this.clickrow = 5
          break
        case 'F7精轧支撑辊':
          this.clickrow = 6
          break
        case 'F8精轧支撑辊':
          this.clickrow = 7
          break
        case 'R1粗轧工作辊':
          this.clickrow = 8
          break
        case 'R1粗轧支撑辊':
          this.clickrow = 9
          break
        case 'FE精轧立辊':
          this.clickrow = 10
          break
        case 'E1粗轧立辊':
          this.clickrow = 11
          break
        /* case 'R1E粗轧立辊':
          this.clickrow = 12
          break
        case 'R2E粗轧立辊':
          this.clickrow = 13
          break
        case 'SSP锤头':
          this.clickrow = 14
          break*/
      }
    },
    //2查看详情
    findroll_2() {
      this.dialog_show = false
      var roll_no = this.huan_roll
      this.dialogVisible2 = false
      post('/rollInformation/findByPre', {
        condition: { roll_no: this.huan_roll }
      }).then(res => {
        this.tableData1 = res.data
      })
    },
    //换辊清空
    open3_click() {
      this.dialogVisible3 = true
    },
    //换辊小车清空辊号发给后台
    open4_click() {
      post('/rollPrelistHistory/insert', {
        rollPrelistHistory: this.searchInfo2,
        ifcm: this.searchInfo2.ifcm,
        mut: 1
      }).then(res => {
        this.refresh()
        setTimeout(() => {
          this.findcar()
          this.find_select()
          this.refresh()
        }, 1000)
        this.tableDatan_0 = res.data
        this.total_1 = res.count
      })
      this.dialogVisible2 = false //换辊车关闭
      this.dialogVisible3 = false //换辊清页面空关闭
      this.aaa = '' //关闭颜色
    }
  }
}
</script>

<style scoped>
.GD-btns /deep/.el-button + .el-button {
  margin-left: 0;
}
.form1 {
  margin-left: 30px;
  margin-top: 50px;
  border: 1px solid red;
  width: 6%;
  padding: 10px;
  float: left;
  background: #7f828b;
}
.form3 {
  border: 1px solid #a5158b;
  width: 100px;
  float: left;
  margin-left: 100px;
  margin-top: 100px;
  padding-left: 20px;
  padding-bottom: 20px;
  background: #52ccba;
}
.twos {
  height: 50px;
  width: 50px;
  border: 1px solid green;
  margin-bottom: 10px;
}
.form2 {
  border: 1px solid red;
  width: 1300px;
  height: 400px;
  float: left;
  margin-left: 50px;
  margin-top: 50px;
  padding-left: 20px;
  /* background: white;*/
  /*background: #98f5ff;*/
}
/*.el-radio-button {*/
/*  margin-left: 50px;*/
/*}*/
.active {
  background: #971229;
}
.dianji {
  /* background: red;*/
  /* font-size: 25px;*/
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
  padding: 3px 5px 3px 5px;
  border-radius: 8px;
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
  /* white-space: normal;*/
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
</style>
