
<template>
  <div>
    <el-dialog
      :visible="dialogStatus"
      title="修改订单信息"
      @close="close"
      width="60%"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        style="margin-left:100px"
        :rules="rules"
      >
      <div style="margin-bottom:20px">
        <el-tag effect="plain" :type="orderTypeMap[form.status].type">{{
          orderTypeMap[form.status].label
        }}</el-tag>
        <span style="margin:20px;font-size:20px">订单编号{{form.id}}</span>
      </div>
      <div>
        <el-form-item label="收货人" prop="consignee" class="itemLeft">
          <el-input
            placeholder="请输入收货人姓名"
            v-model="form.consignee"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人电话" prop="phone" class="itemRight">
          <el-input
            placeholder="请输入收货人电话"
            clearable
            v-model="form.phone"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="地址" prop="address" class="itemLeft">
          <el-input
            placeholder="请输入地址"
            clearable
            v-model="form.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单备注" prop="text" class="itemRight">
          <el-input
            placeholder="请输入订单备注"
            clearable
            v-model="form.text"
          ></el-input>
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
import { orderTypeMap} from "@/const/order-type";
import {orderUpdata} from "@/api/order"

const form = {
  id:undefined,// 订单编号
  waresId:undefined,// 商品编码
  waresName: undefined, // 商品名称
  waresType:undefined, // 商品类型
  unitNumber: undefined, // 数量
  unitPrice: undefined, // 单价
  consignee: undefined, // 收货人
  phone: undefined, // 电话
  address: undefined, // 地址
  waresTag: undefined, // 商品标签
  orderTime: undefined, // 入库时间
  status:0,//状态
  text: undefined, // 备注
  unit: undefined, // 计量单位
  waresSize: undefined, // 商品尺寸
  deliverType: undefined, // 配送类型
};
export default {
  data() {
    return {
      dialogStatus: false,
      form: Object.assign({}, form),
      orderTypeMap,
      rules: {
        consignee: [{ required: true, message: "请输入收货人名称", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur",pattern:/^[1-9]\d*$/ }],
        text: [{ required: false, message: "请输入备注", trigger: "blur" }],
      },
    };
  },
  methods: {
    show(data) {
      this.dialogStatus = true;
      if (data) {
        this.form = Object.assign({}, data);
        console.log(data);
      }
    },
    close() {
      this.dialogStatus = false;
      this.reset();
    },
    reset() {
      this.form = Object.assign({}, form);
      this.$refs.form.resetFields();
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.form.id){
            orderUpdata(this.form).then(res=>{
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