<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="title">编辑联系人</div>
        <div @click="goBack">返回</div>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>




    </div>
  </div>
</template>

<script>
import Contact from '@/models/contact'

export default {
  props: {
    editContactID: Number
  },
  components: {

  },
  data() {
    return {
      form: {}
    }
  },
  async created() {
    // this.form = await this.Contact.editContact(this.editContactID)
    this.editContact()
  },
  methods: {
    async editContact() {
      const editContact = await Contact.editContact(this.editContactID, this.form)
      // this.form = editContact
    },
    goBack () {
      this.$emit('editHide')
    },
    async onSubmit () {
      // const res = editContact(this.editContactID, this.form)
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
