<template>
  <el-select
    v-model="type"
    @change="change"
    clearable
    filterable
    size="medium"
    placeholder="人员类型"
  >
    <el-option :value="0" label="管理员"></el-option>
    <el-option :value="1" label="普通人员"></el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    value: {
      default: "",
    },
  },
  data() {
    return {
      type: this.value,
    };
  },
  watch:{
    value(){
      this.type=this.value
    }
  },
  methods: {
    change(type) {
      this.$emit("input", type);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>