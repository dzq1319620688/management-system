
<template>
  <div>
    <el-dialog
      :visible="dialogStatus"
      title="表单"
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
        <el-form-item label="产品详情" prop="productDetail">
          <el-input
            placeholder="产品详情"
            v-model="ruleForm.productDetail"
          ></el-input>
        </el-form-item>
        <el-form-item label="对接人" prop="dockingName">
          <el-input
            placeholder="请输入对接人姓名"
            v-model="ruleForm.dockingName"
          ></el-input>
        </el-form-item>
        <el-form-item label="政策" prop="makeWay">
          <el-input placeholder="政策" v-model="ruleForm.makeWay"></el-input>
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
  productDetail:"",//产品详情
  dockingName: "", // 联系人
  makeWay: "", // 政策
};
export default {
  data() {
    return {
      dialogStatus: false,
      ruleForm: Object.assign({}, ruleForm),
      editStatus: 1,
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
        dockingName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
        ],
        makeWay: [
          { required: true, message: "请输入计提条件", trigger: "blur" },
        ],
      }
    };
  },
  methods: {
    show(id) {
      this.dialogStatus = true;
      if (id) {
        //以id去获取详情
        // this.ruleForm = Object.assign({}, data);
      }
    },
    close() {
      this.dialogStatus = false;
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