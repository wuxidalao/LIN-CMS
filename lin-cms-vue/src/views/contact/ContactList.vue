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
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      showEdit:true,
      editContactID: 1
    }
  },
  components: {
    ContactEdit
  },
  async created() {
    this.getContacts()
  },
  methods: {
    async getContacts() {
      try {
        const contacts = await Contact.getContacts()
        this.tableData = contacts
      } catch (error) {
        if (error.error_code === 10020) {
          error: "资源不存在"
        }
      }
    },
    async handleEdit(row) {
      this.showEdit = false
      // console.log(row)
      this.editContactID = row.id
    },
    editShow () {
      this.showEdit = true
    }
  }
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
