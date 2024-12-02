<template>
  <div>
    <!--
        左侧导航栏设计，使用element-ui组件
      -->
    <template>
      <el-table :data="functionlist" style="width: 100%" height="900" @current-change="handleCurrentChange">
        <el-table-column fixed prop="address" label="函数" width="200">
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
export default {
  props: {
    functionlist: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
    list: this.functionlist,
    }
  },
  methods:{
    handleCurrentChange(val){
      console.log('fadsfasf',val);
      let id = val.id
      this.$parent.SetID(id);
    }
  },
  created() {
    console.log(this.list);
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 0;

  .is-active {
    background: #5D90F7 !important;
    color: #fff !important;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>