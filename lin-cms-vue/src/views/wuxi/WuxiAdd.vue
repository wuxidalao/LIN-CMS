<template>
  <div>
    <div class="container">
      <!-- 标题 -->
      <div class="header">
        <div class="title">吴习添加</div>
      </div>
      <!-- 表格 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="书名">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.summary"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: '',
        author: '',
        summary: '',
      },
    }
  },
  methods: {
    async onSubmit(formName) {
      try {
        const res = await wuxi.addWuxi(this.form)
      } catch (error) {
        this.$message.success(`${res.msg}`)
        this.resetForm(formName)
      }
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
