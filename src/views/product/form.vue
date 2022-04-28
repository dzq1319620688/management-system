
<template>
  <div>
    <el-dialog
      :visible="dialogStatus"
      :title="title?'新增商品':'修改商品'"
      @close="close"
      width="60%"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        style="margin-left:100px"
        :rules="rules"
      >
      <div>
        <el-form-item label="商品编码" prop="id" class="itemLeft">
          <el-input
            placeholder="请输入商品编码"
            v-model="form.id"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="waresName" class="itemRight">
          <el-input
            placeholder="请输入商品名称"
            v-model="form.waresName"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="商品详情" prop="waresDetail" class="itemLeft">
          <el-input
            placeholder="请输入商品详情"
            v-model="form.waresDetail"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品尺寸" prop="waresSize" class="itemRight">
          <el-input
            placeholder="请输入商品尺寸"
            clearable
            v-model="form.waresSize"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="成本价" prop="primeCost" class="itemLeft">
          <el-input
            placeholder="请输入成本价"
            clearable
            v-model="form.primeCost"
          ></el-input>
        </el-form-item>
        <el-form-item label="市场价" prop="marketPrice" class="itemRight">
          <el-input
            placeholder="请输入市场价"
            clearable
            v-model="form.marketPrice"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="库存数量" prop="number" class="itemLeft">
          <el-input
            placeholder="请输入库存数量"
            clearable
            v-model="form.number"
          ></el-input>
        </el-form-item>
        <el-form-item label="入库时间" prop="depotDate" class="itemRight">
          <el-input
            placeholder="请输入入库时间"
            clearable
            v-model="form.depotDate"
          ></el-input>
        </el-form-item>
      </div>
        <el-form-item label="备注" prop="text" class="itemRight">
          <el-input
            placeholder="请输入商品名称"
            type="textarea"
            :rows="2"
            v-model="form.text"
          ></el-input>
        </el-form-item>
      <div>
        <el-form-item label="商品类型" prop="waresType" class="itemLeft">
          <search-Wares-Type-select v-model="form.waresType" />
        </el-form-item>
        <el-form-item label="商品标签" prop="waresTag" class="itemRight">
          <search-Wares-Tag-select v-model="form.waresTag" />
        </el-form-item>
      </div>
      <div>
        <el-form-item label="计量单位" prop="unit" class="itemLeft">
          <el-select
            v-model="form.unit"
            clearable
            filterable
            size="medium" placeholder="请选择计量单位">
            <el-option
              v-for="item in unitTypeMap"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="配送类型" prop="deliverType" class="itemRight">
          <search-Deliver-Type-select v-model="form.deliverType" />
        </el-form-item>
      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import SearchWaresTypeSelect from "@/components/SearchWaresTypeSelect";
import SearchWaresTagSelect from "@/components/SearchWaresTagSelect";
import SearchDeliverTypeSelect from "@/components/SearchDeliverTypeSelect";
import { unitTypeMap } from "@/const/unit-type";
import {waresAdd,waresUpdata} from "@/api/product"
const form = {
  id:undefined,// 商品编码
  waresName: undefined, // 商品名称
  waresType:undefined, // 商品类型
  waresDetail: undefined, // 商品详情
  primeCost: undefined, // 成本价
  marketPrice: undefined, //市场价
  number: undefined, // 库存数量
  waresTag: 0, // 商品标签
  depotDate: undefined, // 入库时间
  status:0,//新增时状态为待入库
  text: undefined, // 备注
  unit: 0, // 计量单位
  waresSize: undefined, // 商品尺寸
  deliverType: 0, // 配送类型
};
export default {
  components: {
    SearchWaresTypeSelect,
    SearchWaresTagSelect,
    SearchDeliverTypeSelect,
  },
  data() {
    return {
      dialogStatus: false,
      form: Object.assign({}, form),
      title: true,
      unitTypeMap,
      rules: {
        id: [{ required: true, message: "请输入商品编码", trigger: "blur" }],
        waresName: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        waresDetail: [{ required: false, message: "请输入商品详情", trigger: "blur" }],
        waresSize: [{ required: false, message: "请输入商品尺寸", trigger: "blur" }],
        depotDate: [{ required: true, message: "请输入入库时间", trigger: "blur" }],
        primeCost: [{ required: true, message: "请输入成本价", trigger: "blur",pattern:/^[1-9]\d*$/ }],
        marketPrice: [{ required: false, message: "请输入市场价", trigger: "blur",pattern:/^[1-9]\d*$/ }],
        number: [{ required: true, message: "请输入库存数量", trigger: "blur",pattern:/^[1-9]\d*$/ }],
        text: [{ required: false, message: "请输入备注", trigger: "blur" }],
        waresType: [{ required: true, message: "请输入商品类型", trigger: "blur" }],
        waresTag: [{ required: true, message: "请输入商品标签", trigger: "blur" }],
        unit: [{ required: true, message: "请输入计量单位", trigger: "blur" }],
        deliverType: [{ required: true, message: "请输入配送类型", trigger: "blur" }],
      },
    };
  },
  methods: {
    show(data) {
      this.dialogStatus = true;
      if (data) {
        this.form = Object.assign({}, data);
        this.title = false;
        console.log(data);
      }
    },
    close() {
      this.dialogStatus = false;
      this.title = true;
      this.reset();
    },
    reset() {
      this.form = Object.assign({}, form);
      this.$refs.form.resetFields();
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.title){
            waresAdd(this.form).then(res=>{
              this.$emit("submit",res.data)
              this.$message.success("新增成功");
            })
          }else{
            waresUpdata(this.form).then(res=>{
              this.$emit("submit",res.data)
              this.$message.success("修改成功");
            })
          }
          this.close()
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
.itemLeft{
  display: inline-block;width: 40%;margin-right: 10%;
}
.itemRight{
  display: inline-block;width: 40%;
}
</style>