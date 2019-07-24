<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="title">测试</div>
      </div>
      <!-- 测试内容 -->
      
    </div>
  </div>
</template>

<script>
import book from '@/models/book'

export default {
  components: {
  },
  data() {
    return {
    }
  },
  async created() {

  },
  methods: {
 
  
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
