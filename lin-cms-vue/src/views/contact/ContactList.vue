<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="showEdit">
      <div class="header">
        <div class="title">联系人列表</div>
      </div>
      <!-- 表格 -->
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="电话"
            min-width="180">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 编辑页面 -->
    <contact-edit v-else @editHide="editShow" :editContactID="editContactID"></contact-edit>
  </div>
</template>

<script>
import Contact from '@/models/contact'
import ContactEdit from './ContachEdit'

export default {
  data() {
    return {
      tableData: [],
      showEdit: true,
      editContactID: 1,
    }
  },
  components: {
    ContactEdit,
  },
  async created() {
    this.getContacts()
    this.handleEdit()
  },
  methods: {
    async getContacts() {
      try {
        const contacts = await Contact.getContacts()
        this.tableData = contacts
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
    async handleEdit(index, row) {
      this.showEdit = true
      this.editContactID = await row.id
      // console.log(index)
      // console.log(row)
    },
    async handleDelete(val) {
      this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await Contact.deleteContact(val.row.id)
        if (res.error_code === 0) {
          this.getContacts()
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
        }
      })
    },
    editShow() {
      this.showEdit = true
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
