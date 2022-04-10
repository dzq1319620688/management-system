
<template>
  <div>
    <el-dialog
      :visible="dialogStatus"
      :title="title?'新增产品':'修改产品'"
      @close="close"
      width="50%"
      append-to-body
    >
      <el-form
        ref="form"
        :model="ruleForm"
        label-width="80px"
        :rules="rules"
      >
      <div v-if="title">
        <el-form-item label="公司名称" prop="companyName">
          <el-input
            placeholder="请输入公司的名称"
            v-model="ruleForm.companyName"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input
            placeholder="请输入产品名称"
            v-model="ruleForm.productName"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务人员" prop="name">
          <el-select v-model="ruleForm.name" placeholder="对接人员" style="width:100%" filterable clearable size="medium">
            <el-option value="0">人员1</el-option>
            <el-option value="1">人员2</el-option>
            <el-option value="2">人员3</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="利率" prop="rate">
          <el-input placeholder="利率" v-model="ruleForm.rate"></el-input>
        </el-form-item>
      </div>
        <el-form-item label="产品详情" prop="productDetail">
          <el-input
            placeholder="产品详情"
            v-model="ruleForm.productDetail"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input placeholder="数量" v-model="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input placeholder="金额" v-model="ruleForm.money"></el-input>
        </el-form-item>
        <el-form-item label="放贷时间" prop="date">
          <el-input placeholder="放贷时间" v-model="ruleForm.date"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const ruleForm = {
  companyName: "", // 公司名称
  productName: "", // 产品名称
  name: "", // 联系人
  rate: "", // 比率
  productDetail:"",//产品详情
  number: "", // 数量
  money: "", // 金额
  date: "", // 放贷时间
};
export default {
  data() {
    return {
      dialogStatus: false,
      ruleForm: Object.assign({}, ruleForm),
      title: true,
      rules: {
        companyName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
        ],
        productDetail: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入业务人员姓名", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入数量", trigger: "blur" },
        ],
        money: [
          { required: true, message: "请输入金额", trigger: "blur" },
        ],
        rate: [
          { required: true, message: "请输入利率", trigger: "blur" },
        ],
        date: [
          { required: true, message: "请输入放贷时间", trigger: "blur" },
        ],
      }
    };
  },
  methods: {
    show(data) {
      this.dialogStatus = true;
      if (data) {
        //以id去获取详情
        this.ruleForm =  {
          productDetail:"",//产品详情
          number: "", // 数量
          money: "", // 金额
          date: "", // 放贷时间
        };
        this.ruleForm = Object.assign(this.ruleForm, data);
        this.title=false;
        console.log(data)
      }
    },
    close() {
      this.dialogStatus = false;
      this.title=true;
      this.reset();
    },
    reset() {
      this.ruleForm = Object.assign({}, ruleForm);
      this.$refs.form.resetFields();
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, "提交的表单");
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
</style>