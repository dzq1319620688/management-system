<template>
  <div>
    <el-dialog :title="title" :visible="vis" width="30%" @close="close">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="type">
          <el-select
            v-model="form.type"
            placeholder="请选择人员"
            style="width: 100%"
          >
            <el-option label="员工" :value="0"></el-option>
            <el-option label="管理员" :value="1"></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="form.createTime"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm()" :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {accountAdd} from "@/api/account"
import {accountUpdata} from "@/api/account"

const form = {
  account:undefined,
  name: "",
  type:0,
  isMale: "男",
  phone: undefined,
  address: undefined,
  email: undefined,
  remark: "",
  createTime:undefined,
};
export default {
  props: ["vis"],
  data() {
    return {
      form: Object.assign({}, form),
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        isMale: [{ required: true, message: "请选择性别", trigger: "blur" }],
        type: [{ required: true, message: "请选择角色", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur",pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/}],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur",pattern:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ }],
        ramark: [{ required: true, message: "请输入备注", trigger: "blur" }],
        createTime: [{ required: true, message: "请输入创建时间", trigger: "blur" }],
      },
      title: "新建角色",
      submitLoading:false
    };
  },
  computed: {
    ...mapState(["rowData"]),
  },
  watch: {
    vis() {
      this.form = Object.assign({},this.rowData);
      if (this.form.account) {
        this.title = "修改角色";
      } else {
        this.title = "新建角色";
      }
    },
  },
  methods: {
    close() {
      this.$emit("shut");
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          if(!this.form.account){
            accountAdd(this.form).then(res=>{
              this.$emit("submit",res.data)
              this.$message.success("新增成功");
            })
          }else{
            accountUpdata(this.form).then(res=>{
              this.$emit("submit",res.data)
              this.$message.success("修改成功");
            })
          }
          this.submitLoading = false
          this.$emit("shut");
        } else {
          this.$emit("shut");
          alert("错误");
          return false;
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
</style>