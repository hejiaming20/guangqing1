<!--
 * @Author: 曹容铭
 * @Date: 2020-07-25 15:38:42
 * @LastEditTime: 2020-07-25 16:26:42
 * @LastEditors: Please set LastEditors
 * @Description: 检修计划管理
 * @FilePath: /BRSS-web-project/pages/informationManagement/mpm.vue
--> 

<template>
  <div>
    <Table-easy :table-data="tableData">
      <template slot="TableHead">
        <el-row>
          <el-col :span="16">
            <el-form 
              ref="form" 
              label-width="100px">
              <el-row>
                <el-col 
                  :span="18" 
                  class="leftside">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="检修人">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="检修类型:">
                        <el-select 
                          placeholder="请选择">
                          <el-option 
                            label="定期检修" 
                            value="shanghai"/>
                          <el-option 
                            label="当班处理" 
                            value="beijing"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="制造厂商:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="轧辊合同号:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="工作时间:">
                        <el-date-picker
                          v-model="value1"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                        />
                      </el-form-item>
                    </el-col>
                  
                  </el-row>
                  
                  
                </el-col>
               
              </el-row>
            </el-form>
          </el-col>
          <el-col 
            :span="7" 
            :offset="1">
            <div class="btn">
              <el-button 
                size="mini" 
                @click="findAll()">查询</el-button>
              <el-button 
                size="mini" 
                @click="resetForm('ruleForm')">重置</el-button>
              <el-button 
                size="mini" 
                @click="resetForm('ruleForm')">生成检修</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column 
          label="检修名称" 
          prop="name"/>
        <el-table-column label="检修人"/>
        <el-table-column label="检测类型"/>
        <el-table-column label="是否完成"/>
        <el-table-column label="备注"/>
        <el-table-column 
          label="操作" 
          min-width="150"
          align="center"> 
          <template slot-scope="scope">
            <el-button 
              size="mini" 
              type="primary"

              @click="openDialoy(scope.row)">检修项目</el-button>
            <el-button 
              size="mini" 
              type="primary"

              @click="openDialoyJX(scope.row)">是否检修</el-button>
            <el-button 
              size="mini" 
              type="primary"

              @click="openDialoy(scope.row)">录入数据</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 是否检修 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="是否检修"
      width="50%"
      class="dlrow">
      <Table-easy :table-data="tableData">
        <template slot="TableHead">
          <el-row>
            <el-col :span="16">
              <el-form 
                ref="ruleForm"
                :model="searchInfo"
                class="search-info" 
                label-width="180px">
                <el-row>
                  <el-col :span="24">
                    <el-form-item 
                      label="今日是否安排检修：" 
                      prop="roll_mo">
                      <template>
                        <el-radio 
                          v-model="radio" 
                          label="1">是</el-radio>
                        <el-radio 
                          v-model="radio" 
                          label="2">否</el-radio>
                      </template>

                    </el-form-item>
                  </el-col>
                 
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="理由:">
                      <el-select 
                        placeholder="请选择">
                        <el-option 
                          label="定期检修" 
                          value="shanghai"/>
                        <el-option 
                          label="当班处理" 
                          value="beijing"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注:">
                      <el-input
                        :rows="2"
                        v-model="textarea"
                        type="textarea"
                        placeholder="请输入内容"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            
          </el-row>
        </template>
       
      </Table-easy>
      <span 
        slot="footer" 
        class="dialog-footer">
        <el-button 
          size="small"
          type="primary"
          @click="dialogVisible = false">取 消</el-button>
        <el-button 
          type="primary" 
          size="small"
          @click="dialogVisible = false">确认并打印模版</el-button>
      </span>
    </el-dialog>
    <!-- 设备检修工单 -->
    <el-dialog
      :visible.sync="dialogVisibleJX"
      title="设备检修工单"
      width="90%"
      class="dlrow">
      <Table-easy :table-data="tableData">
        <template slot="TableHead">
          <el-row>
            <el-col :span="16">
              <el-form 
                ref="ruleForm"
                :model="searchInfo"
                class="search-info" 
                label-width="180px">
                <el-row>
                  <el-col :span="24">
                    <el-form-item 
                      label="今日是否安排检修：" 
                      prop="roll_mo">
                      <template>
                        <el-radio 
                          v-model="radio" 
                          label="1">是</el-radio>
                        <el-radio 
                          v-model="radio" 
                          label="2">否</el-radio>
                      </template>

                    </el-form-item>
                  </el-col>
                 
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="理由:">
                      <el-select 
                        placeholder="请选择">
                        <el-option 
                          label="定期检修" 
                          value="shanghai"/>
                        <el-option 
                          label="当班处理" 
                          value="beijing"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注:">
                      <el-input
                        :rows="2"
                        v-model="textarea"
                        type="textarea"
                        placeholder="请输入内容"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            
          </el-row>
        </template>
       
      </Table-easy>
      <span 
        slot="footer" 
        class="dialog-footer">
        <el-button 
          size="small"
          type="primary"
          @click="dialogVisibleJX = false">取 消</el-button>
        <el-button 
          type="primary" 
          size="small"
          @click="dialogVisibleJX = false">确认并打印模版</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      searchInfo: {},
      tableData: [{ name: 1 }],
      dialogVisible: false,
      dialogVisibleJX: false
    }
  },
  methods: {
    findAll() {},
    resetForm() {},
    openDialoy(val) {
      console.log(val)
      this.dialogVisible = true
    },
    openDialoyJX(val) {
      console.log(val)
      this.dialogVisibleJX = true
    }
  }
}
</script>

<style>
.search-info .el-form-item {
  margin: 0;
}
.dlrow .el-row {
  margin: 10px 0;
}
</style>
