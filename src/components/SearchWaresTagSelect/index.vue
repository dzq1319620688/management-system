<template>
  <el-select
    v-model="type"
    @change="change"
    clearable
    filterable
    size="medium" placeholder="请选择商品标签">
    <el-option
      v-for="item in waresTagMap"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </el-select>
</template>

<script>
import { waresTagMap} from '@/const/wares-tag'

export default {
  props: {
    value: {
      default: "",
    },
  },
  data() {
    return {
      type: this.value,
      waresTagMap
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
