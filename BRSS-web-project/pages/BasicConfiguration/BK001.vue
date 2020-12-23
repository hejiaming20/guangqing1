<!--
 * @Author: crm 人员
 * @Date: 2020-09-27 14:15:22
 * @LastEditTime: 2020-12-08 09:48:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys\Bearmanagement\CS002.vue
-->
<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6" >
        <el-tree
          ref="vueTree"
          :data="treeData"
          :props="defaultProps"
          :default-expanded-keys="[light_1]"
          class="bk001tree"
          highlight-current
          node-key="indocno"
          @node-click="handleNodeClick">

          <div
            slot-scope="{ node, data }"
            class="custom-tree-node">
            <div>{{ node.label }}</div>
            <div>
              <el-button
                v-show="data.ilevel != 3"
                style="margin-left: 36px"
                type="text"
                size="mini"
                @click.stop="() => append(data)">
                添加下级目录
              </el-button>
              <el-button
                v-show="data.indocno != 1"
                class="bk001Del"
                type="text"
                size="mini"
                @click.stop="() => remove(node, data)">
                删除
              </el-button>
            </div>
          </div>
        </el-tree>
      </el-col>
      <el-col :span="18">
        <div class="layout-search bk001Form">
          <el-form
            ref="ruleForm"
            :model="searchInfo"
            label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="编码"
                  prop="dicno">
                  <el-input v-model="searchInfo.dicno" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="名称"
                  prop="production_line">
                  <el-input v-model="searchInfo.sname" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="父节点名称"
                  prop="roll_type">
                  <el-input
                    v-model="searchInfo.sparent"
                    :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="值1"
                  prop="frame_no">
                  <el-input v-model="searchInfo.v1" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="值2"
                  prop="frame_no">
                  <el-input v-model="searchInfo.v2" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="等级"
                  prop="frame_no">
                  <el-input
                    v-model="searchInfo.ilevel"
                    :disabled="true"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div>
            <el-button
              style="margin-left:50%;transform: translateX(-50%);"
              size="mini"
              type="primary"
              @click="handleAdd">保存</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { get, post } from '@/lib/Util'
export default {
  name: 'BK001',
  components: {
    TableEasy
  },
  data() {
    return {
      light_1: 1,
      searchInfo: {},
      treeData: [],
      defaultProps: {
        children: 'detail',
        label: 'sname'
      }
    }
  },
  mounted() {
    this.findAll()
  },
  methods: {
    // 增加删除
    append(data) {
      if (data.ilevel == 3) {
        this.$message({
          message: '警告:三级目录无法增加子节点',
          type: 'warning'
        })
      } else {
        this.light_1 = data.indocno
        console.log('ada', data)
        // 创建一行数据
        const newChild = {
          ilevel: data.ilevel + 1,
          sname: '请填写',
          children: [],
          dicon: '',
          v1: '',
          v2: '',
          sparent: data.sname,
          iparent: data.indocno
        }
        console.log('newChild', newChild)
        console.log('data.detail', data.detail)
        // 推进去
        if (!data.detail) {
          this.$set(data, 'detail', [])
        }
        data.detail.push(newChild)
        console.log('searchInfo', this.searchInfo)
      }
    },
    //  const newChild = { id: id++, label: 'testtest', children: [] };
    //   if (!data.children) {
    //     this.$set(data, 'children', []);
    //   }
    //   data.children.push(newChild);

    remove(node, data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // const parent = node.parent
          // const children = parent.data.children || parent.data
          // const index = children.findIndex(d => d.id === data.id)
          // children.splice(index, 1)
          console.log('删除', data.indocno)
          post('/dictionary/deleteOne', { indocno: data.indocno }).then(res => {
            this.findAll()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    handleNodeClick(data) {
      console.log('data', data)
      this.searchInfo = data
      // console.log('加', data.ilevel++)
      // this.searchInfo.ilevel = data.ilevel++
    },
    /* handleAddClick() {
      this.findAll()
    },*/
    // 查询全部
    async findAll() {
      let res = await post('/dictionary/findAll', {})
      console.log('res', res)
      this.treeData = res.data

      this.$nextTick(() => {
        this.$refs.vueTree.setCurrentKey(this.light_1)
      })
      // this.
      console.log('Data', this.treeData)
      this.total = res.count
    },
    //插入
    async handleAdd() {
      console.log('即将提交', this.searchInfo)
      let res = await post('/dictionary/insert', {
        dictionary: this.searchInfo
      }).then(res => {
        this.findAll()
      })
    }
  }
}
</script>

<style>
.bk001tree {
  height: calc(100vh - 70px);
  overflow: auto;
  padding: 20px 10px;
  box-sizing: border-box;
}

.bk001tree::-webkit-scrollbar {
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
.bk001tree::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 15px #1a367a;
  background: #66b1ff;
}
.bk001tree::-webkit-scrollbar-track {
  box-shadow: inset 0 0 15px #1a367a;
  border-radius: 20px;
  background: #1a367a;
}
.bk001tree .custom-tree-node {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 30px;
}
.bk001Form {
  padding: 10px;
}
.bk001Del {
  color: #f56c6c;
}
</style>
