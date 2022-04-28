<template>
  <el-select
    v-model="type"
    @change="change"
    clearable
    filterable
    size="medium" placeholder="请选择配送类型">
    <el-option
      v-for="item in deliverTypeMap"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </el-select>
</template>

<script>
import { deliverTypeMap} from '@/const/deliver-type'

export default {
  props: {
    value: {
      default: "",
    },
  },
  data() {
    return {
      type:this.value,
      deliverTypeMap
    };
  },
  watch:{
    value(){
      this.type=this.value
    }
  },
  methods: {
    change(value) {
      console.log(123, value);
      this.$emit("input", value);
    },
  },
}
</script>
