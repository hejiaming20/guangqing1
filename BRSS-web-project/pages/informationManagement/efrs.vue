<template>
  <div>
    <Table-easy :table-data="tableData">
      <template slot="TableHead">
        <el-row>
          <el-col :span="16">
            <el-form 
              ref="form" 
              label-width="80px">
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
                size="small" 
                type="primary"
                @click="findAll()">查询</el-button>
              <el-button 
                type="primary"
                size="small" 
                @click="resetForm('ruleForm')">重置</el-button>
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
              type="primary"
              size="mini" 
              @click="openDialoy(scope.row)">查看工单</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 库存变动记录查看 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="库存历史记录"
      width="90%">
      <Table-easy :table-data="tableData">
        <template slot="TableHead">
          <el-row>
            <el-col :span="16">
              <el-form 
                ref="ruleForm"
                :model="searchInfo"
                class="search-info" 
                label-width="80px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item 
                      label="磨辊间" 
                      prop="roll_mo">
                      <el-input v-model="searchInfo.roll_mo" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item 
                      label="物资名称" 
                      prop="roll_mo">
                      <el-input v-model="searchInfo.roll_mo" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item 
                      label="物料编码" 
                      prop="roll_mo">
                      <el-input v-model="searchInfo.roll_mo" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item 
                      label="使用方向" 
                      prop="roll_mo">
                      <el-input v-model="searchInfo.roll_mo" />
                    </el-form-item>
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
              </div>
            </el-col>
          </el-row>
        </template>
        <template slot="TableBody">
          <el-table-column 
            label="磨辊间" 
            prop="name"/>
          <el-table-column label="物资编码"/>
          <el-table-column label="物资名称"/>
          <el-table-column label="规格型号"/>
          <el-table-column label="物料编码"/>
          <el-table-column label="材质"/>
          <el-table-column label="使用方向"/>
          <el-table-column label="库存变动单位"/>
          <el-table-column label="变动数量"/>
          <el-table-column label="备注"/>
        </template>
      </Table-easy>
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
          @click="dialogVisible = false">确 定</el-button>
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
      dialogVisible: false
    }
  },
  methods: {
    findAll() {},
    resetForm() {},
    openDialoy(val) {
      console.log(val)
      this.dialogVisible = true
    }
  }
}
</script>

<style>
.search-info .el-form-item {
  margin: 0;
}
</style>
