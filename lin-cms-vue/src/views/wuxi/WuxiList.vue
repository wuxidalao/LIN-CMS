<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="title">图书列表</div>
      </div>
      <!-- 表格 -->
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="id"
            label="序号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="title"
            label="书名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="author"
            label="作者"
            width="120">
          </el-table-column>
          <el-table-column
            prop="summary"
            label="简介"
            min-width="400">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="" size="mini">编辑</el-button>
              <el-button @click.native.prevent="handleDelete(scope.$index, tableData)" type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

  </div>
</template>

<script>
import wuxi from '@/models/wuxi.js'

export default {
  data() {
    return {
      tableData: [],
    }
  },
  async created() {
    await this.getWuxis()
  },
  methods: {
    async getWuxis() { // 获取所有图书内容
      try {
        const wuxis = await wuxi.getWuxis()
        this.tableData = wuxis
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await wuxi.delectWuxi(id)
        if (res.error_code === 0) {
          this.getWuxis()
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
        }
      })
    },
    handleClick() {
      this.$router.push('/wuxi/edit/:id')
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
