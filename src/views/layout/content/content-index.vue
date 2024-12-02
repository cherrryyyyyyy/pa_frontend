<template>
  <!--可变内容，通过router-view重定向-->
  <div>
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  props: {
    functionData: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
    Data: this.functionData,
    }
  },
}
</script>


<style></style>