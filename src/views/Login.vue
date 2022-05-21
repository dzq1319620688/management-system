<template>
  <div class="login">
    <div class="login-weaper">
    <el-card class="wrap">
        <p class="login-tip">电商后台管理系統</p>
        <div style="margin-bottom:10px">管理员账号：dzq 员工账号：dzq1 密码：123456</div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          status-icon
          ref="ruleForm"
          label-width="0"
        >
          <el-form-item  prop="username">
            <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.username"
                      auto-complete="off"
                      clearable
                      class="myInput"
                      placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" v-model="ruleForm.password"
                      type="password"
                      show-password
                      clearable
                      auto-complete="off"
                      class="myInput"
                      placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-submit" type="primary" @click="login" :loading='load'>登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    </div>
  </div>
</template>
<script>
import('@/styles/login.less')
import {loginName} from "@/api/login"
import {setAccount} from "../utils/auth"
export default {
  data() {
    return {
      load:false,
      ruleForm: {
        username:"",
        password:"",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: "请输入密码", trigger: "blur" },
           { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' } 
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.load=true;
          loginName(this.ruleForm).then((res)=>{
            setAccount(res.data)
            this.$router.push('/')
          }).catch((error)=>{
            console.log(error)
            this.load=false;
          })
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>

</style>