<template>
  <div>
    <div>
      <el-row :gutter="10">
        <el-col
          :xl="12"
          :lg="10">
          <!-- 快捷方式 -->
          <div class="shortcut layout-default-margin">
            <p class="backlog-title"><i
              class="el-icon-star-on"
              style="color: #E6A23C"/> 快捷方式</p>
            <el-row>
              <el-col :span="24">
                <div class="convenient">
                  <div
                    v-for="(item, index) in convenientMenuList"
                    :key="index"
                    class="convenient-item"
                    @click="goPage(item)">
                    <div class="item-img">{{ item.menu_name }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- <el-col
          :xl="12"
          :lg="14">
          <div class="backlog layout-default-margin">
            <div class="backlog-title"><i
              class="el-icon-price-tag"
              style="color: #E6A23C"/> <span>待办事项</span>
              &lt;!&ndash; 刷新&ndash;&gt;
              <el-tooltip
                content="刷新"
                effect="dark"
                placement="top"
                class="function-item">
                <i
                  :class=" pulse ? 'el-icon-refresh icon-rotate' : 'el-icon-refresh' "
                  @click="findOrderS()" />
              </el-tooltip>
            </div>
            <el-radio-group
              v-model="radio1"
              size="mini"
              @change="chioces(radio1)">
              <el-badge
                :is-dot="doto_1"
                style="margin-right: -10px"
                class="item">
                <el-radio-button
                  label="待办新辊">待办新辊</el-radio-button >
              </el-badge>
              <el-badge
                :is-dot="doto_2"
                style="margin-right: -10px"
                class="item">
                <el-radio-button

                  label="冷却">冷却</el-radio-button >
              </el-badge>
              <el-badge
                :is-dot="doto_4"
                style="margin-right: -10px"
                class="item">
                <el-radio-button label="磨削检测工单">磨削检测工单</el-radio-button >
              </el-badge>
              <el-badge
                :is-dot="doto_3"
                style="margin-right: -10px"
                class="item">
                <el-radio-button label="磨削完成工单">磨削完成工单</el-radio-button >
              </el-badge>
              <el-badge
                :is-dot="doto_5"
                style="margin-right: -10px"
                class="item">
                <el-radio-button label="其他">其他</el-radio-button >
              </el-badge>
              <el-badge
                :is-dot="doto_6"
                style="margin-right: -10px"
                class="item">
                <el-radio-button label="备辊确认">备辊确认</el-radio-button >
              </el-badge>
              <el-badge
                :is-dot="doto_7"
                style="margin-right: -10px"
                class="item">
                <el-radio-button label="万能磨削检测工单">万能磨削检测工单</el-radio-button >
              </el-badge>
              <el-badge
                :is-dot="doto_8"
                style="margin-right: -10px"
                class="item">
                <el-radio-button label="万能磨削完成工单">万能磨削完成工单</el-radio-button >
              </el-badge>
              <el-badge
                :is-dot="doto_9"
                style="margin-right: -10px"
                class="item">
                <el-radio-button label="轴承座换区">轴承座换区</el-radio-button >
              </el-badge>
              <el-badge
                :is-dot="doto_10"
                style="margin-right: -10px"
                class="item">
                <el-radio-button label="轴承座拆装">轴承座拆装</el-radio-button >
              </el-badge>
            </el-radio-group>
            &lt;!&ndash; 内容区 &ndash;&gt;
            <div class="backlogLists">
              <div
                v-show="aaaa"
                class="backlogLists-item">
                &lt;!&ndash; <p class="backlogLists-item-title"><i class="el-icon-arrow-down"/> 待办新辊</p>&ndash;&gt;
                <div class="backlogLists-item-box layout-webkitScrollbar">
                  <div
                    v-for="item of newRoll"
                    :key="item.id"
                    class="backlogLists-item-box-item"
                    @click="clickthis(item.order_detailList, item)">{{ item.new_note }}</div>
                  <span v-show="newRoll.length == 0">暂无数据</span>
                </div>
              </div>
              <div
                v-show="aaaa1"
                class="backlogLists-item">
                &lt;!&ndash;  <p class="backlogLists-item-title"><i class="el-icon-arrow-down"/> 冷却</p>&ndash;&gt;
                <div class="backlogLists-item-box layout-webkitScrollbar">
                  <div
                    v-for="item of lengque"
                    :key="item.id"
                    class="backlogLists-item-box-item">
                    <span @click="clickthis(item.order_detailList, item)">
                      {{ item.new_note }}
                    </span>
                  </div>
                  <span v-show="lengque.length == 0">暂无数据</span>
                </div>
              </div>
              <div
                v-show="aaaa2"
                class="backlogLists-item">
                &lt;!&ndash; <p class="backlogLists-item-title"><i class="el-icon-arrow-down"/> 磨削完成工单</p>&ndash;&gt;
                <div class="backlogLists-item-box layout-webkitScrollbar">
                  <div
                    v-for="item of moxue"
                    :key="item.id"
                    class="backlogLists-item-box-item"
                    @click="clickthis(item.order_detailList, item)">{{ item.new_note }}</div>
                  <span v-show="moxue.length == 0">暂无数据</span>
                </div>
              </div>
              <div
                v-show="aaaa4"
                class="backlogLists-item">
                &lt;!&ndash;  <p class="backlogLists-item-title"><i class="el-icon-arrow-down"/> 其他</p>&ndash;&gt;
                <div class="backlogLists-item-box layout-webkitScrollbar">
                  <div
                    v-for="item of others"
                    :key="item.id"
                    class="backlogLists-item-box-item"
                    @click="clickthis(item.order_detailList, item)">{{ item.new_note }}</div>
                  <span v-show="others.length == 0">暂无数据</span>
                </div>
              </div>
              <div
                v-show="aaaa3"
                class="backlogLists-item">
                &lt;!&ndash; <p class="backlogLists-item-title"><i class="el-icon-arrow-down"/> 磨削检测工单</p>&ndash;&gt;
                <div class="backlogLists-item-box layout-webkitScrollbar">
                  <div
                    v-for="item of mx_order"
                    :key="item.id"
                    class="backlogLists-item-box-item"
                    @click="clickthis(item.order_detailList, item)">{{ item.new_note }}</div>
                  <span v-show="mx_order.length == 0">暂无数据</span>
                </div>
              </div>
              <div
                v-show="aaaa5"
                class="backlogLists-item">
                &lt;!&ndash; <p class="backlogLists-item-title"><i class="el-icon-arrow-down"/> 备辊工单</p>&ndash;&gt;
                <div class="backlogLists-item-box layout-webkitScrollbar">
                  <div
                    v-for="item of gr_bg"
                    :key="item.id"
                    class="backlogLists-item-box-item"
                    @click="clickthis(item.order_detailList, item)">{{ item.new_note }}</div>
                  <span v-show="gr_bg.length == 0">暂无数据</span>
                </div>
              </div>
              <div
                v-show="aaaa6"
                class="backlogLists-item">
                &lt;!&ndash; <p class="backlogLists-item-title"><i class="el-icon-arrow-down"/> 万能磨削检测工单</p>&ndash;&gt;
                <div class="backlogLists-item-box layout-webkitScrollbar">
                  <div
                    v-for="item of moxueOrders"
                    :key="item.id"
                    class="backlogLists-item-box-item"
                    @click="clickthis(item.order_detailList, item)">{{ item.new_note }}</div>
                  <span v-show="moxueOrders.length == 0">暂无数据</span>
                </div>
              </div>
              <div
                v-show="aaaa7"
                class="backlogLists-item">
                &lt;!&ndash; <p class="backlogLists-item-title"><i class="el-icon-arrow-down"/> 万能磨削完成工单</p>&ndash;&gt;
                <div class="backlogLists-item-box layout-webkitScrollbar">
                  <div
                    v-for="item of moxueWOrders"
                    :key="item.id"
                    class="backlogLists-item-box-item"
                    @click="clickthis(item.order_detailList, item)">{{ item.new_note }}</div>
                  <span v-show="moxueWOrders.length == 0">暂无数据</span>
                </div>
              </div>
              <div
                v-show="aaaa8"
                class="backlogLists-item">
                &lt;!&ndash; <p class="backlogLists-item-title"><i class="el-icon-arrow-down"/> 轴承座换区</p>&ndash;&gt;
                <div class="backlogLists-item-box layout-webkitScrollbar">
                  <div
                    v-for="item of moxueWOrders"
                    :key="item.id"
                    class="backlogLists-item-box-item"
                    @click="clickthis(item.order_detailList, item)">{{ item.new_note }}</div>
                  <span v-show="moxueWOrders.length == 0">暂无数据</span>
                </div>
              </div>
              <div
                v-show="aaaa9"
                class="backlogLists-item">
                &lt;!&ndash; <p class="backlogLists-item-title"><i class="el-icon-arrow-down"/> 轴承座拆装</p>&ndash;&gt;
                <div class="backlogLists-item-box layout-webkitScrollbar">
                  <div
                    v-for="item of moxueWOrders"
                    :key="item.id"
                    class="backlogLists-item-box-item"
                    @click="clickthis(item.order_detailList, item)">{{ item.new_note }}</div>
                  <span v-show="moxueWOrders.length == 0">暂无数据</span>
                </div>
              </div>
            </div>
          </div>
          <div class="finish">
            <div class="backlog-title"><i
              class="el-icon-price-tag"
              style="color: #E6A23C"/> 已办事项</div>
            <div class="finishLists layout-webkitScrollbar">
              <p
                v-for="item of ifinishs"
                :key="item.id"
                class="finishList-item">{{ item.new_note }}</p>
              <span v-show="ifinishs.length == 0">暂无数据</span>
            </div>
          </div>
        </el-col>-->
      </el-row>
    </div>

    <!-- 禁用功能 -->
    <!-- <el-row>
      <div
        v-for="item in tableData"
        :key="item.id"
        :span="24"
        class="list"
        @click="clickthis(item.order_detailList, item)">
        <div class="grid-content bg-purple-dark">{{ item.new_note }}</div>
      </div>
    </el-row> -->

    <!-- 工单order_no有值 -->
    <el-dialog
      :visible.sync="dialogVisible"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          :inline="true"
          :model="testObj"
          label-width="140px">
          <el-form-item
            v-for="item in defaultArray"
            :key="item.id"
            :label="item.field_name"
            :prop="item.field_id">
            <el-input
              v-if="item.field_type === 2"
              v-model="testObj[item.field_id]"/>
            <el-select
              v-if="item.field_type === 1"
              v-model="testObj[item.field_id]"
              clearable
              placeholder="请选择轧辊类型"
              @change="handleRollChange">
              <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="制造厂商"
            prop="factory_id">
            <el-select
              v-model="testObj.factory_id"
              placeholder="请选择">
              <el-option
                v-for="item in factoryArray"
                :key="item.key"
                :label="item.value"
                :value="Number(item.key)"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="轧辊材质"
            prop="material_id">
            <el-select
              v-model="testObj.material_id"
              placeholder="请选择">
              <el-option
                v-for="item in materialArray"
                :key="item.key"
                :label="item.value"
                :value="Number(item.key)"/>
            </el-select>
          </el-form-item>

          <el-form-item
            label="机架号"
            prop="frame_no">
            <el-select
              v-model="testObj.frame_noid"
              clearable
              placeholder="请选择机架号"
              @change="handleFrameChange">
              <el-option
                v-for="item in frameArray"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>

          <el-form-item
            label="产线"
            prop="production_line">
            <el-select
              v-model="testObj.production_line_id"
              clearable
              placeholder="请选择产线"
              @change="handleProductionChange">
              <el-option
                v-for="item in productionArray"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>

          <el-form-item
            v-for="(item,index) in formLabelAlign"
            :key="index"
            :prop="item.field_id"
            :label="item.field_name">
            <!--  <el-input
              v-show="!order_select"
              v-if="item.field_type=== '1'"
              v-model="testObj[item.field_id]"/>
            <el-select
              v-show="order_select"
              v-if="item.field_type=== '1'"
              v-model="testObj[item.field_id]"
              placeholder="请选择">
              <el-option
                v-for="item in option_or"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>-->
            <el-input
              v-if="item.field_type=== '1'&& item.dic_no== null"
              v-model="testObj[item.field_id]"/>
            <el-select
              v-if="item.field_type=== '1'&& item.dic_no!= null"
              v-model="testObj[item.field_id]"
              placeholder="请选择">
              <el-option
                v-for="item in option_test[index][0]"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
            <el-input
              v-else-if=" item.field_type === '2'"
              v-model="testObj[item.field_id]"/>
            <div
              v-else-if=" item.field_type === '3'"
              class="btntab"
              @click="newtable(formLabelAlign[index].line,formLabelAlign[index].columns)">点我显示表格
            </div>
            <el-date-picker
              v-else-if=" item.field_type === '4'"
              v-model="testObj[item.field_id]"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期"
              @focus="resetKeyboard"/>
          </el-form-item>

          <el-row class="tabSide">
            <el-col :span="24">
              <table cellpadding="10">
                <tr
                  v-for="(itemrow, indexs) in testData2"
                  :key="indexs">
                  <td
                    v-for="(itemcol, index) in itemrow"
                    :key="index">
                    <el-input v-model="itemcol['item'+ indexs + index]"/>
                  </td>
                </tr>
              </table>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- modular_no -->
      <div v-show="orderInfo.modular_no == 'lq'">
        <el-checkbox
          :true-label="1"
          :false-label="0"
          v-model="hourslq"
          @change="hoursChangelq"
        >空冷24小时</el-checkbox>
        <el-checkbox
          v-model="onup"
          :true-label="1"
          :false-label="0"
        >待上机</el-checkbox>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 磨削工单 -->
    <el-dialog
      :visible.sync="dialogMXVisible"
      class="layout-dialog"
      title="磨削工单配置"
      width="90%">
      <div class="layout-search">
        <el-form
          ref="form"
          :inline="true"
          :model="mxform"
          label-width="160px">
          <el-form-item label="辊号">
            <el-input
              v-model="mxform.roll_no"
              disabled/>
          </el-form-item>
          <el-form-item label="生产厂家">
            <el-input
              v-model="mxform.factory"
              disabled/>
          </el-form-item>
          <el-form-item label="材质">
            <el-input
              v-model="mxform.material"
              disabled/>
          </el-form-item>
          <el-form-item label="轧辊类型">
            <el-input
              v-model="mxform.roll_type"
              disabled/>
          </el-form-item>
          <el-form-item label="机架号">
            <el-input
              v-model="mxform.frame_no"
              disabled/>
          </el-form-item>
          <el-form-item label="磨削开始时间">
            <el-date-picker
              v-model="mxform.grind_starttime"
              :editable="false"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="开始时间"
            />
          </el-form-item>
          <el-form-item label="磨削结束时间">
            <el-date-picker
              v-model="mxform.grind_endtime"
              :editable="false"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="结束时间"
              @focus="resetKeyboard"/>
          </el-form-item>
          <el-form-item label="磨床号">
            <el-input
              v-model="mxform.machine_no"
            />
          </el-form-item>
          <el-form-item label="磨前直径">
            <el-input
              v-model="mxform.before_diameter"
            />
          </el-form-item>
          <el-form-item label="磨后直径">
            <el-input
              v-model="mxform.after_diameter"
            />
          </el-form-item>
          <el-form-item label="辊形偏差">
            <el-input
              v-model="mxform.deviation"
            />
          </el-form-item>
          <el-form-item label="最大直径">
            <el-input
              v-model="mxform.diametermax"
            />
          </el-form-item>
          <el-form-item label="最小直径">
            <el-input
              v-model="mxform.diametermin"
            />
          </el-form-item>
          <el-form-item label="锥度">
            <el-input
              v-model="mxform.taper"
            />
          </el-form-item>
          <el-form-item label="圆度">
            <el-input
              v-model="mxform.roundness"
            />
          </el-form-item>
          <el-form-item label="裂纹">
            <el-input
              v-model="mxform.crack"
            />
          </el-form-item>
          <el-form-item label="暗伤">
            <el-input
              v-model="mxform.hidden_flaws"
            />
          </el-form-item>
          <el-form-item label="合格点数">
            <el-input
              v-model="mxform.qualifiednum"
            />
          </el-form-item>
          <el-form-item label="产线(1-2250,2-1580)">
            <el-input
              v-model="mxform.production_line"
              disabled/>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-checkbox
          :true-label="1"
          :false-label="0"
          v-model="mxform.if_hardness"
        >硬度结合层检测</el-checkbox>
        <el-checkbox
          v-model="mxform.if_wave"
          :true-label="1"
          :false-label="0"
        >超声波检测</el-checkbox>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          @click="dialogMXVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleMXSave">确 定</el-button>
      </span>
    </el-dialog>
    <!--备辊工单-->
    <!-- <el-dialog
      :visible.sync="open_beigun"
      class="layout-dialog"
      width="70%">
      <div
        class="layout-search"
        style="border: 1px solid yellow">
        <p style="text-align:left;color:white">确认备辊:</p>
        <el-form
          :model="formLabel"
          label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="辊号">
                <el-input
                  v-model="formLabel.roll_no"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="机架"
                prop="frame_no">
                <el-input
                  v-model="formLabel.frame_no"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div
          class="body_box"
          style="margin-top: 3px">
          <div class="table_box">
            <table>
              <tbody >
                <tr class="t1">
                  <th>辊号</th>
                  <th>轧辊类型</th>
                  <th>轧辊材质</th>
                  <th>上机位置</th>
                  <th>当前辊径</th>
                  <th>辊形</th>
                  <th>粗糙度</th>
                  <th>OS座号</th>
                  <th>DS座号</th>
                  &lt;!&ndash; <th>表面评级</th>
                  <th>HSS上机次数</th>&ndash;&gt;
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
                  &lt;!&ndash; <td>{{ item.roughness }}</td>&ndash;&gt;
                  <td>{{ item.obearing_chock }}</td>
                  <td>{{ item.dbearing_chock }}</td>
                  &lt;!&ndash; <td/>
                  <td>{{ item.loomingcount }}</td>
&ndash;&gt;
                </tr>
              </tbody>
            </table>
          </div>
          <div style="text-align: center;margin-top: 30px">
            <el-button
              type="danger"
              size="small"
              @click="open1_click()">确认备辊选择
            </el-button>
          </div>
        </div>
      </div>

      <div
        class="layout-search"
        style="border: 1px solid yellow">
        <p style="text-align:left;color:white">驳回原因:</p>
        <el-form
          :model="formLabel"
          label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="辊号">
                <el-input
                  v-model="formLabel.roll_no"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="原因"
                prop="reason">
                <el-input
                  v-model="formLabel.reason"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="是否重磨"
                prop="chock_no">
                <template>
                  <el-radio
                    v-model="formLabel.ifcm"
                    label="1">是</el-radio>
                  <el-radio
                    v-model="formLabel.ifcm"
                    label="0">否</el-radio>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center"><el-button
          size="mini"
          type="danger"
          @click="open2_click">驳回</el-button></div>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          @click="open_beigun = false">取 消</el-button>
      </span>
    </el-dialog>-->
    <el-dialog
      :visible.sync="open_beigun"
      class="layout-dialog"
      width="70%">
      <el-row :gutter="5">
        <el-col :span="12">
          <div class="layout-search-header">规则1</div>
          <div style="color:greenyellow;margin-top: 5px;margin-bottom: 5px; padding-top: 4px;padding-bottom: 4px ; padding-left: 25px;width: 100%;background-color: #253F80;font-size: 14px;">
            <div
              v-for="(rowVal, rowIndex) in area_name[0]"
              :key="rowIndex"> {{ '备辊:'+rowVal.value+'的范围为:  '+rowVal.value1_1+'--'+rowVal.value1_2 }}
            </div>
            <!-- <div v-show="area_name[0].length == 0">暂无数据</div>-->
          </div>

        </el-col>
        <el-col :span="12">
          <div class="layout-search-header">规则2</div>
          <div style="color:greenyellow;margin-top: 5px;margin-bottom: 5px; padding-top: 4px; ;padding-bottom: 4px ; padding-left: 25px;width: 100%;background-color: #253F80;font-size: 14px;">
            <div
              v-for="(rowVal, rowIndex) in area_name[1]"
              :key="rowIndex"> {{ '备辊:  '+rowVal.value+'的范围为:  '+rowVal.value1_1+'--'+rowVal.value1_2 }}     </div>
              <!--<div v-show="area_name[1].length == 0">暂无数据</div>-->
          </div>
        </el-col>
      </el-row>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="mini"
          type="danger"
          @click="open2_click">确认</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="open_beigun = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, getDataConfig } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import { rolltypelist } from '@/api/pinClipBoard' //查询接口
import moment from 'moment'
export default {
  components: { TableEasy },
  data() {
    return {
      area_name: [],
      hourslq: 0,
      onup: 0,
      dell: '',
      tableData1: [],
      formLabel: {},
      open_beigun: false,
      option_test: [],
      convenientMenuList: [],
      order_select: false,
      option_or: [
        {
          value: '合格',
          key: '1'
        },
        {
          value: '不合格',
          key: '0'
        }
      ],
      aaaa: true,
      aaaa1: false,
      aaaa2: false,
      aaaa3: false,
      aaaa4: false,
      aaaa5: false, //点击备辊
      aaaa6: false,
      aaaa7: false,
      aaaa8: false,
      aaaa9: false,
      doto_1: false,
      doto_2: false,
      doto_3: false,
      doto_4: false,
      doto_5: false,
      doto_6: false,
      doto_7: false,
      doto_8: false,
      doto_9: false, //轴承座换区
      doto_10: false, //轴承座拆装
      radio1: '待办新辊',
      testObj: {
        production_line_id: null,
        frame_noid: null,
        roll_no: null,
        material: null,
        factory: null,
        roll_typeid: null
      },
      searchInfo: {
        roll_mo: '',
        jjd: '',
        rzt: ''
      },
      tablenum: 0,
      i: 1,
      options: [], // 轧辊类型下拉框
      frameArray: [], // 机架号下拉框
      productionArray: [], // 产线下拉框
      tabrow: '', //生成的表格行
      tabcol: '', //生成的表格列
      formLabelAlign: [], // 生成表单信息
      deleteFormLabelAlign: '',
      testData2: [],
      tableData: [],
      total: 0,
      dialogVisible: false,
      defaultArray: [
        {
          field_name: '辊号',
          field_id: 'roll_no',
          id: 'a',
          field_type: 2
        },
        {
          field_name: '轧辊类型',
          field_id: 'roll_typeid',
          field_type: 1,
          id: 'd'
        }
      ], // 默认前四个表单
      urlInfo: {},
      param: {},
      dialogMXVisible: false,
      mxtableData: [], // 存放磨削工单值
      mxform: {}, // 存放磨削工单值
      materialArray: [],
      factoryArray: [],
      workParams: {
        if_hardness: '',
        if_wave: ''
      },
      orderInfo: {}, // 工单信息
      newRoll: [], // 新辊
      lengque: [], //冷却
      moxue: [], // 磨削
      mx_order: [], // 磨削超声波
      others: [], // 其他
      gr_bg: [], //备辊
      ifinishs: [], // 已办
      mc_no: '', // 磨床号
      ilinkno: '', // 主键
      pulse: false, // 控制刷新
      lqObj: {}, // 设置冷却默认值(产线, 冷却开始时间, 冷却结束时间)
      moxueOrders: [],
      moxueWOrders: []
    }
  },
  mounted() {
    this.findOption()
    // 查询已办和待办事项
    this.findOrderS()
    this.getConvenientMenu()
  },
  methods: {
    // 冷却工单默认24小时
    hoursChangelq() {
      if (this.hourslq) {
        this.testObj.field1 = moment().format('YYYY-MM-DD HH:mm:ss')

        this.testObj.field2 = moment()
          .add(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')
      }
    },
    // 移除移动端软键盘事件（日期时间选择器）
    resetKeyboard() {
      document.activeElement.blur()
    },
    open1_click() {
      this.open_beigun = false
      //删除
      post('rollPushnew/updatefinish', {
        indocno: this.dell
      }).then(res => {
        // 待办事项——备辊确认
        this.gr_bg = []
        let gr_1 = post('/intellect/gr').then(gr_1 => {
          if (gr_1.status != 2000) {
            this.gr_bg = []
          } else {
            this.gr_bg = gr_1.data
          }
        })
      })
    },
    open2_click() {
      this.open_beigun = false
      //删除
      post('rollPushnew/updatefinish', {
        indocno: this.dell
      }).then(res => {
        // 待办事项——备辊确认
        this.gr_bg = []
        let gr_1 = post('/intellect/gr').then(gr_1 => {
          if (gr_1.status != 2000) {
            this.gr_bg = []
          } else {
            this.gr_bg = gr_1.data
          }
        })
      })
    },
    goPage(item) {
      this.$router.push({ path: item.menu_url })
    },
    getConvenientMenu() {
      post('/sysMenu/always').then(res => {
        if (res.status == 2000) {
          this.convenientMenuList = res.data
        }
      })
    },
    async chioces(val) {
      if (val == '待办新辊') {
        this.aaaa = true
        this.aaaa1 = false
        this.aaaa2 = false
        this.aaaa3 = false
        this.aaaa4 = false
        this.aaaa5 = false
        this.aaaa6 = false
        this.aaaa7 = false
        this.aaaa8 = false
        this.aaaa9 = false
        //待办事项——新辊
        let newRoll = post('/intellect/xg').then(newRoll => {
          this.doto_1 = false
          if (newRoll.status != 2000) {
            this.newRoll = []
          } else {
            this.newRoll = newRoll.data
          }
        })
      }
      if (val == '冷却') {
        this.aaaa = false
        this.aaaa1 = true
        this.aaaa2 = false
        this.aaaa3 = false
        this.aaaa4 = false
        this.aaaa6 = false
        this.aaaa7 = false
        this.aaaa8 = false
        this.aaaa9 = false
        // 待办事项——冷却
        let lengque = post('/intellect/lq').then(lengque => {
          this.doto_2 = false
          if (lengque.status != 2000) {
            this.lengque = []
          } else {
            this.lengque = lengque.data
          }
        })
      }
      if (val == '磨削完成工单') {
        this.aaaa = false
        this.aaaa1 = false
        this.aaaa2 = true
        this.aaaa3 = false
        this.aaaa4 = false
        this.aaaa5 = false
        this.aaaa6 = false
        this.aaaa7 = false
        this.aaaa8 = false
        this.aaaa9 = false
        // 待办事项——磨削完成工单
        let moxue = post('/intellect/mx', {
          role_ids: JSON.parse(localStorage.getItem('storeID'))
        }).then(moxue => {
          this.doto_3 = false
          if (moxue.status != 2000) {
            this.moxue = []
          } else {
            this.moxue = moxue.data
          }
        })
      }
      if (val == '磨削检测工单') {
        this.aaaa = false
        this.aaaa1 = false
        this.aaaa2 = false
        this.aaaa3 = true
        this.aaaa4 = false
        this.aaaa5 = false
        this.aaaa6 = false
        this.aaaa7 = false
        this.aaaa8 = false
        this.aaaa9 = false
        // 待办事项——磨削
        let mx_order = post('/intellect/mx_order', {
          role_ids: JSON.parse(localStorage.getItem('storeID'))
        }).then(mx_order => {
          this.doto_4 = false
          if (mx_order.status != 2000) {
            this.mx_order = []
          } else {
            this.mx_order = mx_order.data
          }
        })
      }
      if (val == '其他') {
        this.aaaa = false
        this.aaaa1 = false
        this.aaaa2 = false
        this.aaaa3 = false
        this.aaaa4 = true
        this.aaaa5 = false
        this.aaaa6 = false
        this.aaaa7 = false
        this.aaaa8 = false
        this.aaaa9 = false
        // 待办事项——其他（无参数）
        let others = await post('/intellect/other')
        this.doto_5 = false
        if (others.status != 2000) {
          this.others = []
        } else {
          this.others = others.data
        }
      }
      if (val == '备辊确认') {
        this.aaaa = false
        this.aaaa1 = false
        this.aaaa2 = false
        this.aaaa3 = false
        this.aaaa4 = false
        this.aaaa5 = true
        this.aaaa6 = false
        this.aaaa7 = false
        this.aaaa8 = false
        this.aaaa9 = false
        // 待办事项——备辊确认
        let gr_1 = post('/intellect/gr').then(gr_1 => {
          this.doto_6 = false
          if (gr_1.status != 2000) {
            this.gr_bg = []
          } else {
            this.gr_bg = gr_1.data
          }
        })
      }
      if (val == '万能磨削检测工单') {
        this.aaaa = false
        this.aaaa1 = false
        this.aaaa2 = false
        this.aaaa3 = false
        this.aaaa4 = false
        this.aaaa5 = false
        this.aaaa6 = true
        this.aaaa7 = false
        this.aaaa8 = false
        this.aaaa9 = false
        // 待办事项——万能磨削检测工单
        post('intellect/wn_order', {
          role_ids: JSON.parse(localStorage.getItem('storeID'))
        }).then(res => {
          this.doto_7 = false
          if (res.status == 2000) {
            this.moxueOrders = res.data
          } else {
            this.moxueOrders = []
          }
        })
      }
      if (val == '万能磨削完成工单') {
        this.aaaa = false
        this.aaaa1 = false
        this.aaaa2 = false
        this.aaaa3 = false
        this.aaaa4 = false
        this.aaaa5 = false
        this.aaaa6 = false
        this.aaaa7 = true
        this.aaaa8 = false
        this.aaaa9 = false
        // 待办事项——万能磨削完成工单
        post('intellect/wn', {
          role_ids: JSON.parse(localStorage.getItem('storeID'))
        }).then(res => {
          this.doto_8 = false
          if (res.status == 2000) {
            this.moxueWOrders = res.data
          } else {
            this.moxueWOrders = []
          }
        })
      }
      if (val == '轴承座换区') {
        this.aaaa = false
        this.aaaa1 = false
        this.aaaa2 = false
        this.aaaa3 = false
        this.aaaa4 = false
        this.aaaa5 = false
        this.aaaa6 = false
        this.aaaa7 = false
        this.aaaa8 = true
        this.aaaa9 = false
        // 轴承座换区
        post('intellect/chockhq', {
          role_ids: JSON.parse(localStorage.getItem('storeID'))
        }).then(res => {
          this.doto_9 = false
          if (res.status == 2000) {
            this.moxueWOrders = res.data
          } else {
            this.moxueWOrders = []
          }
        })
      }
      if (val == '轴承座拆装') {
        this.aaaa = false
        this.aaaa1 = false
        this.aaaa2 = false
        this.aaaa3 = false
        this.aaaa4 = false
        this.aaaa5 = false
        this.aaaa6 = false
        this.aaaa7 = false
        this.aaaa8 = false
        this.aaaa9 = true
        // 待办事项——轴承座拆装
        post('intellect/chockcz', {
          role_ids: JSON.parse(localStorage.getItem('storeID'))
        }).then(res => {
          this.doto_10 = false
          if (res.status == 2000) {
            this.moxueWOrders = res.data
          } else {
            this.moxueWOrders = []
          }
        })
      }
    },
    // 查询已办和待办事项
    async findOrderS() {
      this.pulse = true
      setTimeout(() => {
        this.pulse = false
      }, 1000)
      //待办事项——新辊
      let newRoll = await post('/intellect/xg')
      if (newRoll.status != 2000) {
        this.newRoll = []
      } else {
        this.newRoll = newRoll.data
        if (this.newRoll.length) {
          this.doto_1 = true
        } else {
          this.doto_1 = false
        }
      }
      // 待办事项——冷却
      let lengque = await post('/intellect/lq')
      if (lengque.status != 2000) {
        this.lengque = []
      } else {
        this.lengque = lengque.data
        if (this.lengque.length) {
          this.doto_2 = true
        } else {
          this.doto_2 = false
        }
      }

      // 待办事项——磨削完成
      let moxue = await post('/intellect/mx', {
        role_ids: JSON.parse(localStorage.getItem('storeID'))
      })
      if (moxue.status != 2000) {
        this.moxue = []
      } else {
        this.moxue = moxue.data
        if (this.moxue.length) {
          this.doto_3 = true
        } else {
          this.doto_3 = false
        }
      }

      // 待办事项——磨削检测
      let mx_order = await post('/intellect/mx_order', {
        role_ids: JSON.parse(localStorage.getItem('storeID'))
      })
      if (mx_order.status != 2000) {
        this.mx_order = []
      } else {
        this.mx_order = mx_order.data
        if (this.mx_order.length) {
          this.doto_4 = true
        } else {
          this.doto_4 = false
        }
      }

      // 待办事项——其他（无参数）
      let others = await post('/intellect/other')
      if (others.status != 2000) {
        this.others = []
      } else {
        this.others = others.data
        if (this.others.length) {
          this.doto_5 = true
        } else {
          this.doto_5 = false
        }
      }
      // 待办事项——备辊确认
      let beigun = await post('/intellect/gr')
      if (beigun.status != 2000) {
        this.gr_bg = []
      } else {
        this.gr_bg = beigun.data
        if (this.gr_bg.length) {
          this.doto_6 = true
        } else {
          this.doto_6 = false
        }
      }

      // 已办事项（无参数）
      let ifinishs = await post('/intellect/ifinish', {
        role_ids: JSON.parse(localStorage.getItem('storeID'))
      })

      if (ifinishs.status != 2000) {
        this.ifinishs = []
      } else {
        this.ifinishs = ifinishs.data
      }

      // 万能磨削检测工单
      let mxorder = await post('intellect/wn_order', {
        role_ids: JSON.parse(localStorage.getItem('storeID'))
      })
      if (mxorder.status == 2000 && mxorder.data.length != 0) {
        this.moxueOrders = mxorder.data
        this.doto_7 = true
      } else {
        this.moxueOrders = []
        this.doto_7 = false
      }

      // 万能磨削完成工单
      let mxWorder = await post('intellect/wn', {
        role_ids: JSON.parse(localStorage.getItem('storeID'))
      })
      if (mxWorder.status == 2000 && mxWorder.data.length != 0) {
        this.moxueWOrders = mxWorder.data
        this.doto_8 = true
      } else {
        this.moxueWOrders = []
        this.doto_8 = false
      }
    },
    /**
     * description: 查询消息列表
     */
    async findAll() {
      let res = await post('/intellect/find', {
        pageIndex: 1,
        pageSize: 10,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
    },
    /**
     * description: 点击工单列表
     */
    clickthis(scope, entity) {
      localStorage.setItem('key', entity.indocno)
      this.hourslq = 0
      this.onup = 0

      this.order_select = false
      this.mc_no = ''
      this.formLabelAlign = []
      if (entity.order_no) {
        this.findSonForm(entity.order_no) // 获取子表数据，formLabelAlign存放字表所需要的值
      }
      this.testObj = {
        roll_no: '',
        frame_noid: '',
        material_id: '',
        factory_id: '',
        production_line_id: '',
        roll_typeid: ''
      }
      this.orderInfo = {}
      this.urlInfo.urlParam = entity.order_entity
      this.urlInfo.method_url = entity.method_url
      // 带入默认数据
      this.testObj.roll_no = entity.roll_no
      this.testObj.frame_noid = entity.frame_noid
      this.testObj.material_id = entity.material_id
      this.testObj.factory_id = entity.factory_id
      this.testObj.production_line_id = entity.production_line_id
      this.testObj.roll_typeid = entity.roll_typeid

      this.testObj.frame_no = entity.frame_no
      this.testObj.material = entity.material
      this.testObj.factory = entity.factory
      this.testObj.production_line = entity.production_line
      this.testObj.roll_type = entity.roll_type

      this.param.order_no = entity.order_no
      this.param.perform_no = entity.perform_no
      this.param.nodeid = entity.nodeid
      this.param.flowid = entity.flowid
      this.param[this.urlInfo.urlParam] = this.testObj

      // 工单信息
      this.orderInfo = entity

      // 磨削工单需要的参数
      if (entity.machine_no) {
        this.mc_no = entity.machine_no // 找到磨床号
      }

      console.log('工作参数map找到order_info', entity)

      if (entity.workparam_map) {
        this.workParams = entity.workparam_map
      } else {
        this.workParams = {}
      }
      // 判断是否是磨削
      if (entity.modular_no == 'mx') {
        this.showMx(entity)
      } else if (entity.modular_no == 'gr') {
        if (entity.new_note == '备辊小车有消息，请注意') {
          this.dell = entity.indocno //提交后删除该条数据
          this.area_name = []
          this.area_name = JSON.parse(entity.area_name)
          this.open_beigun = true
        }
      } else {
        if (entity.modular_no == 'lq') {
          this.$router.push({
            name: 'Lqs',
            params: {
              roll_no: entity.roll_no
            }
          })
        } else {
          this.isOrderNo(entity) // 新辊工单
        }
      }
      if (entity.modular_no == 'mx_order' && entity.order_no == 'mx_wave01') {
        this.order_select = true
      }
    },
    // 获得字表数据
    async findSonForm(val) {
      let res = await post('intellect/orderfind', { modular: val })

      if (res.status == 2000) {
        let data = res.data
        data.splice(0, 6)
        this.formLabelAlign = data // 查询所需要的字段
        // 用于每个冷却工单设置默认值(仅设置时间开始和结束)
        if (this.orderInfo.modular_no == 'lq') {
          for (const item of data) {
            if (item.field_id == 'field1' || item.field_id == 'field2') {
              if (this.lqObj[item.field_id]) {
                // this.testObj[item.field_id] = this.lqObj[item.field_id]
                this.$set(
                  this.testObj,
                  item.field_id,
                  this.lqObj[item.field_id]
                )
              }
            }
          }
        }
        this.option_test = []
        for (let i = 0; this.formLabelAlign.length > i; i++) {
          this.option_test.push([])
        }
        // this.option_test = [[], [], [], [], [], [], [], [], [], []]

        if (this.formLabelAlign.length) {
          this.resect(0, this.formLabelAlign.length)
        }
        /* for (let i = 0; this.formLabelAlign.length > i; i++) {
          if (
            this.formLabelAlign[i].field_type == '1' &&
            this.formLabelAlign[i].dic_no != null
          ) {
            getDataConfig(this.formLabelAlign[i].dic_no).then(res => {
              this.option_test[i].push(res)
            })
          }
        }*/
      }
    },
    resect(num, length) {
      if (
        this.formLabelAlign[num].field_type == '1' &&
        this.formLabelAlign[num].dic_no != null
      ) {
        getDataConfig(this.formLabelAlign[num].dic_no).then(res => {
          this.option_test[num].push(res)
          if (++num < length) {
            this.resect(num, length)
          } else {
          }
        })
      } else {
        if (++num < length) {
          this.resect(num, length)
        }
      }
    },
    // 新辊工单
    isOrderNo(entity) {
      // 判断order_no是否为null
      if (entity.order_no != null) {
        this.dialogVisible = true
        this.testData2 = []
        this.tablenum = 0
      } else {
        this.$confirm('确认完成吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        })
          .then(() => {
            post('rollPushnew/updatefinish', { indocno: entity.indocno }).then(
              res => {
                if (res.status == 2000) {
                  this.$message({
                    type: 'success',
                    message: res.msg
                  })
                }
                // this.findAll()
                this.findOrderS()
              }
            )
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
      }
    },

    // 磨削工单
    async showMx(entity) {
      if (entity.entity_id == null) {
        this.$message('entity_id为空')
        return
      } else {
        this.ilinkno = entity.entity_id
      }
      let res = await post('rollGrindingAnnex/findByIndocno', {
        indocno: entity.entity_id
      })
      this.dialogMXVisible = true
      if (res.status == 2000) {
        this.mxform = res.data
      } else {
        this.$message('查询失败')
      }
    },

    //表格生成
    newtable(row, col) {
      let data = []
      for (let i = 1; i <= row; i++) {
        for (let i = 1; i <= col; i++) {
          data.push({})
        }
        this.testData2.push(data)
      }
    },

    // 工单配置确认按钮
    async handleSave() {
      // 确定数据是否填写正确, 如果正确将进行下一步
      this.$confirm('确定数据是否填写正确?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post(this.urlInfo.method_url, this.param).then(res => {
            //磨削检测工单中超声波检测
            if (this.urlInfo.method_url == 'rollMxWave/insert') {
              this.formLabelAlign.forEach(item => {
                //这里的userList就是上面遍历的数据源
                if (item.field_name == '是否合格') {
                  if (this.testObj.field1 == 1) {
                    console.log(this.testObj.roll_no)
                    post('rollInformation/updaterevoleve', {
                      roll_no: this.testObj.roll_no,
                      roll_revolve: 4
                    }).then(res => {})
                  } else if (this.testObj.field1 == 2) {
                    post('rollInformation/updaterevoleve', {
                      roll_no: this.testObj.roll_no,
                      roll_revolve: 6
                    }).then(res => {})
                  }
                }
              })
            }

            if (res.status == 2000) {
              if (this.orderInfo.modular_no != 'lq') {
                // 判断是否是冷却工单
                let data = res.data
                for (const v in data) {
                  if (this.testObj[v]) {
                    data[v] = this.testObj[v]
                  }
                }
                let paramer = {
                  indocno: this.orderInfo.indocno,
                  nodeid: this.param.nodeid,
                  flow_id: this.param.flowid,
                  perform_no: this.param.perform_no,
                  list: data ? [data] : null
                }
                this.dialogVisible = false
                this.nuxtFlow(paramer)
              } else {
                // 用于保存冷却默认值
                this.lqObj = Object.assign({}, this.testObj)
                // 结束冷却工单
                post('rollPushnew/updatefinish', {
                  indocno: this.orderInfo.indocno
                }).then(res => {
                  if (res.status == 2000) {
                    this.$message({
                      type: 'success',
                      message: '填写成功'
                    })
                  }
                  this.dialogVisible = false
                  this.findOrderS()
                })
                if (this.onup == 1) {
                  post('rollInformation/updaterevoleve', {
                    roll_no: this.testObj.roll_no,
                    roll_revolve: '4'
                  })
                }
              }
            } else {
              this.$message('提交失败')
            }
            this.testObj = {}
            this.dialogVisible = false
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    // 磨削工单配置确认按钮
    handleMXSave() {
      if (this.mxform.grind_starttime) {
        let paramer = {
          indocno: this.orderInfo.indocno,
          nodeid: this.param.nodeid,
          flow_id: this.param.flowid,
          perform_no: this.param.perform_no
        }

        for (const item in this.workParams) {
          this.workParams[item] = this.mxform[item]
        }

        this.workParams.machine_no = this.mc_no
        this.workParams.ilinkno = this.ilinkno

        paramer.type = 'mxyd'

        if (!this.mxform.if_hardness && !this.mxform.if_wave) {
          this.workParams.mx_num =
            Number(this.mxform.before_diameter) -
            Number(this.mxform.after_diameter)
        }

        this.workParams.if_hardness = this.mxform.if_hardness || ''
        this.workParams['if_wave'] = this.mxform.if_wave || ''

        paramer.list = [this.workParams]
        //保留三位
        paramer.list[0].mx_num = Number(paramer.list[0].mx_num).toFixed(3)

        console.log('查看', paramer)

        this.nuxtFlow(paramer)
        console.log('船体参数', this.mxform)
        this.mxUpdate(this.mxform)

        this.dialogMXVisible = false
        this.mxform = {}
      } else {
        alert('时间未填')
      }
    },
    /**
     * @param val: 接收磨削工单所需要的值
     * @description: 磨削工单定制化
     */
    async mxUpdate(val) {
      let res = await post('rollGrindingAnnex/update', {
        rollGrindingAnnex: val
      })
      console.log('磨削返回值', res)
      if (res.status == 2000) {
        this.$message({
          type: 'success',
          message: res.msg
        })
      } else {
        this.$message(res.msg)
      }
    },
    // 下一步数据接口
    /**
     * @param: 接收传参对象
     * @description: 下一步数据接口
     */
    nuxtFlow(param) {
      post('workFlow/nextFlow', param).then(res => {
        if (res.status === 2000) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.findOrderS()
        } else {
          this.$message('下一步失败')
        }
        // this.findAll()
        this.findOrderS()
      })
    },
    // 轧辊选择
    handleRollChange() {
      this.options.map(v => {
        if (v.key === this.testObj.roll_typeid) {
          this.testObj.roll_type = v.value
        }
      })
    },
    // 产线选择
    handleProductionChange() {
      this.productionArray.map(v => {
        if (v.key === this.testObj.production_line_id) {
          this.testObj.production_line = v.value
        }
      })
    },
    // 机架号选择
    handleFrameChange() {
      this.frameArray.map(v => {
        if (v.key === this.testObj.frame_noid) {
          this.testObj.frame_no = v.value
        }
      })
    },
    // 下拉框数据
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.options = res.data
        this.options.forEach(item => {
          item.key = Number(item.key)
        })
      })
      post(rolltypelist, {
        dicno: 'proline'
      }).then(res => {
        this.productionArray = res.data
        this.productionArray.forEach(item => {
          item.key = Number(item.key)
        })
      }) // 产线下拉
      post(rolltypelist, {
        dicno: 'frameteam'
      }).then(res => {
        this.frameArray = res.data
        this.frameArray.forEach(item => {
          item.key = Number(item.key)
        })
      }) // 机架号下拉
      getDataConfig('roll_material').then(res => {
        this.materialArray = res
      })
      getDataConfig('roll_factory').then(res => {
        this.factoryArray = res
      })
    }
  }
}
</script>

<style lang="less">
@import './../assets/css/baseStyle.less';
.convenient {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-around;
  .convenient-item {
    width: 165px;
    height: 145px;
    background: url('../assets/img/homeTest.png') no-repeat;
    background-size: 100% 75%;
    text-align: center;
    padding-top: 115px;
    cursor: pointer;
    margin-bottom: 5px;
    color: #fcce1f;
    letter-spacing: 1px;
  }
}
.backlogLists {
  height: calc(100% - 65px);
  padding: 10px;
  box-sizing: border-box;
  .backlogLists-item {
    height: 100%;
    width: 100%;
    float: left;
    .backlogLists-item-title {
      font-size: 14px;
      line-height: 24px;
      height: 24px;
    }
    .backlogLists-item-box {
      height: 100%;
      padding: 4px;
      overflow-y: auto;
      .backlogLists-item-box-item {
        cursor: pointer;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        margin-bottom: 10px;
      }
      .backlogLists-item-box-item:hover {
        color: @layout-hover-text-color;
      }
    }
  }
}
.backlog-title {
  background-color: @layout-t-background-color;
  color: #ffffff;
  font-size: 16px;
  padding-left: 10px;
  box-sizing: border-box;
  height: 30px;
  line-height: 30px;
}
.shortcut {
  background-color: @layout-s-background-color;
  /*height: 250px;*/
  border-radius: 5px;
  overflow: hidden;
}
.el-tabs__item {
  color: white;
}
.item {
  margin-top: 10px;
  margin-right: 0px;
}
.el-badge__content.is-fixed.is-dot {
  right: 28px; //气泡位置
}
.el-radio-group {
  //按钮位置
  font-size: 0;
  margin-left: 10px;
  margin-top: 5px;
}
.el-badge__content.is-dot {
  //气泡大小
  height: 12px;
  width: 12px;
  padding: 0;
  right: 0;
  border-radius: 50%;
}

@media screen and (min-width: 1200px) {
  .backlog {
    height: calc(100vh - 80px - 250px);
    border-radius: 5px;
    overflow: hidden;
    background: @layout-s-background-color;
  }
  .finish {
    height: 250px;
    border-radius: 5px;
    overflow: hidden;
    background: @layout-s-background-color;
  }
  .finishLists {
    padding: 10px;
    box-sizing: border-box;
    height: 200px;
    overflow-y: auto;
  }
  .finishList-item {
    cursor: pointer;
    margin-bottom: 10px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
  }
}
@media screen and (max-width: 1200px) {
  .backlog {
    height: 600px;
    border-radius: 5px;
    overflow: hidden;
    background: @layout-s-background-color;
  }
  .finish {
    height: 400px;
    border-radius: 5px;
    overflow: hidden;
    background: @layout-s-background-color;
  }
  .finishLists {
    padding: 10px;
    box-sizing: border-box;
    height: 350px;
    overflow-y: auto;
  }
  .finishList-item {
    cursor: pointer;
    margin-bottom: 10px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
  }
}
</style>
