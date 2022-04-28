<template>
  <el-select
    v-model="type"
    @change="change"
    clearable
    filterable
    size="medium" placeholder="请选择商品类型">
    <el-option
      v-for="item in waresTypeMap"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </el-select>
</template>

<script>
import { waresTypeMap} from '@/const/wares-type'

export default {
  props: {
    value: {
      default: "",
    },
  },
  watch:{
    value(){
      this.type=this.value
    }
  },
  data() {
    return {
      type: this.value,
      waresTypeMap
    };
  },
  methods: {
    change(value) {
      console.log(123, value);
      this.$emit("input", value);
    },
  },
}
</script>
