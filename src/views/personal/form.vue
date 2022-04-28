<template>
  <div>
    <el-dialog :title="title" :visible="dialogStatus" width="30%" @close="close">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="性别" prop="isMale">
          <el-radio-group v-model="form.isMale">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.number="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {oneUpdata} from "@/api/account"

const form = {
  id:undefined,
  account:undefined,
  name: "",
  type:0,
  isMale: "男",
  phone: undefined,
  address: undefined,
  email: undefined,
  remark: "",
  num:undefined,
  continued:undefined,
  totalAmount:undefined,
  createTime:undefined,
};
export default {
  data() {
    return {
      dialogStatus:false,
      form: Object.assign({}, form),
      rules: {
        isMale: [{ required: true, message: "请选择性别", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur",pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/}],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur",pattern:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ }],
        ramark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      title: "修改个人信息",
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
            oneUpdata(this.form).then(res=>{
              this.$emit("submit",res.data)
              this.$message.success("修改成功");
            })
          this.close()
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>