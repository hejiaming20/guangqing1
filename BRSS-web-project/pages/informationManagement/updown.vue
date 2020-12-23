<template>
  <div>
    <el-container>
      <el-main>
        <div>
          <el-card class="fristcard">
            <el-form 
              ref="form" 
              label-width="80px">
              <el-row>
                <el-col 
                  :span="18" 
                  class="leftside">
                  
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="辊号:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="材质:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="供货商:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="类型:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="状态:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col 
                  :span="6" 
                  class="rightside">
                  <el-button 
                    type="primary" 
                    size="mini"
                    icon="el-icon-search">查询</el-button>
                  <el-button 
                    type="primary" 
                    size="mini"
                    icon="el-icon-refresh-right">重置</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
          <el-card class="secondcard">
            <el-table 
              :data="tableData" 
              style="width: 100%" 
              height="250">
              <el-table-column 
                fixed 
                prop="index" 
                label="供货商"/>
              <el-table-column 
                prop="ROLLNO" 
                label="材质"/>
              <el-table-column 
                prop="MANU" 
                label="辊号"/>
              <el-table-column 
                prop="ROLLTYPE" 
                label="类型"/>
              <el-table-column 
                prop="MATERIAL" 
                label="状态"/>
              <el-table-column 
                prop="ARRDATE" 
                label="上机次数"/>
              <el-table-column 
                prop="ROLLSTATUS" 
                label="原始直径"/>
              <el-table-column 
                prop="MATCHMARK" 
                label="操作"/>
              
            </el-table>
          </el-card>
          <el-card class="fristcard">
            <el-form 
              ref="form" 
              label-width="80px">
              <el-row>
                <el-col 
                  :span="18" 
                  class="leftside">
                  
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="辊号:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="材质:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="供货商:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="类型:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="状态:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col 
                  :span="6" 
                  class="rightside">
                  <el-button 
                    type="primary" 
                    size="mini"
                    icon="el-icon-search">查询</el-button>
                  <el-button 
                    type="primary" 
                    size="mini"
                    icon="el-icon-refresh-right">重置</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
          <el-card class="thirdcard">
            <el-form 
              ref="form" 
              label-width="120px">
              <el-row gutter="10">
                <el-col :span="4">
                  <el-form-item label="轧辊厂内编号:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="到货日期:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="制造商:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="启用日期:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="原始直径(mm):">
                    <el-input/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row gutter="10">
                <el-col :span="4">
                  <el-form-item label="轧辊材质:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="重量(kg):">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="辊身长度(mm):">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="可用直径(mm):">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="当前直径(mm):">
                    <el-input/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter="10">
                <el-col :span="4">
                  <el-form-item label="类型:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="探伤结果:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="原始硬度:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="合同号:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="配对辊号:">
                    <el-input/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter="10">
                <el-col :span="4">
                  <el-form-item label="领料编号:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="制造编号:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="机架号:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="结合辊厚度(mm):">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="报废直径(mm):">
                    <el-input/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-form-item label="轧辊状态:">
                    <el-input/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="轧辊状态修改:">
                    <el-select 
                      v-model="formInline.region" 
                      placeholder="请选择">
                      <el-option 
                        label="区域一" 
                        value="shanghai"/>
                      <el-option 
                        label="区域二" 
                        value="beijing"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="封锁原因:">
                    <el-select 
                      v-model="formInline.region" 
                      placeholder="请选择">
                      <el-option 
                        label="区域一" 
                        value="shanghai"/>
                      <el-option 
                        label="区域二" 
                        value="beijing"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row 
                type="flex" 
                class="row-bg" 
                justify="space-around">
                <el-col :span="6">
                  <div class="grid-content">
                    <el-button 
                      type="primary" 
                      size="mini"
                      icon="el-icon-plus">添加</el-button>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-button 
                      type="warning" 
                      size="mini"
                      icon="el-icon-check">修改</el-button>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-button 
                      type="danger" 
                      size="mini"
                      icon="el-icon-close">删除</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template><script>
export default {
  name: 'Updown',
  data() {
    return {
      formInline: {
        user: '',
        name: '',
        region: ''
      },
      tableData: [
        {
          index: '1',
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ]
    }
  },
  methods: {}
}
</script>
<style>
.el-form--inline .el-form-item__label {
  float: none;
  display: inline-block;
}
.leftside {
  border-right: 1px dashed #ccc;
}
.el-form-item__content {
  text-align: left;
}
.fristcard .el-input__inner {
  width: 265px;
}
.fristcard .rightside button {
  width: 150px;
  margin: 0 27px;
  letter-spacing: 8px;
}
.fristcard .rightside {
  line-height: 63px;
  overflow: hidden;
  text-align: center;
}
.el-form-item {
  margin-bottom: 22px;
  text-align: center;
  position: relative;
  left: 48px;
  top: 10px;
}
.fristcard .leftside .el-form-item__label {
  width: 100px !important;
}
.fristcard .leftside .el-form-item__content {
  margin-left: 100px !important;
}
body {
  background: #dcdcdc;
}
.secondcard {
  margin-top: 20px;
}
.thirdcard {
  margin-top: 20px;
}
.el-table td,
.el-table th.is-leaf {
  text-align: center;
}

.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg button {
  width: 194px;
  margin-top: 19px;
}
</style>
