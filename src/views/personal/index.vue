<template>
    <div class="table-wrapper">
        <div style="font-size:20px;margin:20px 0 0 20px">个人中心</div>
        <div class="formItem">
            <div>账户id:{{form.id}}</div>
            <div>账户姓名:{{form.name}}</div>
            <div>账户性别:{{form.isMale}}</div>
            <div>用户类型:{{form.type==1?"管理员":"员工"}}</div>
            <div>创建时间:{{form.createTime}}</div>
            <div>电话:{{form.phone}}</div>
            <div>地址:{{form.address}}</div>
            <div>邮箱:{{form.email}}</div>
            <div>备注:{{form.remark}}</div>
            <div>所负责的订单数:{{form.num}}</div>
            <div>所负责的总金额:{{form.totalAmount}}</div>
            <div>待结算的金额:{{form.continued}}</div>
        </div>
        <div style="margin:0 0 100px 100px">
            <el-button type="primary" style="margin-right:200px"  @click="handleUpdate">修改个人信息</el-button>
            <el-button type="success" @click="upPassword">修改密码</el-button>
        </div>
    <m-form @submit="submit" ref="form" />
    <el-dialog
      title="修改密码"
      :visible="dialogVisible"
      width="30%">
      <div style="margin-bottom:20px">
        <label>旧密码：</label>
        <el-input
            placeholder="输入新密码"
            type="password"
            show-password
            clearable
            auto-complete="off"
            v-model="password.oldPassword"
        ></el-input>
      </div>
      <div style="margin-bottom:20px">
        <label>新密码：</label>
        <el-input
            placeholder="输入新密码"
            type="password"
            show-password
            clearable
            auto-complete="off"
            v-model="password.newPassword"
        ></el-input>
      </div>
      <label>再次输入新密码：</label>
        <el-input
            placeholder="输入新密码"
            type="password"
            show-password
            clearable
            auto-complete="off"
            v-model="rePassword"
        ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import {account} from "@/api/account"
import {upPasswordData} from "@/api/login"
import mForm from "./form";
import {getId,getNickname,getType} from "@/utils/auth"
    export default {
        components:{
            mForm
        },
        data(){
            return {
                data:{},
                password:{
                    newPassword:undefined,
                    oldPassword:undefined,
                    id:undefined
                },
                rePassword:undefined,
                dialogVisible:false,
                form:{
                    id:undefined,
                    name:undefined,
                    isMale:undefined,
                    type:undefined,
                    phone:undefined,
                    address:undefined,
                    email:undefined,
                    createTime:undefined,
                    remark:undefined,
                    num:undefined,
                    totalAmount:undefined,
                    continued:undefined
                }
            }
        },
        created() {
            this.data={
                id:getId(),
                name:getNickname(),
                type:getType()
            }
            this.password.id=this.data.id
            account(this.data).then(res=>{
                this.form=Object.assign({}, res.data)
            })
        },
        methods:{
            handleUpdate() {
                this.$refs.form.show(this.form);
            },
            submit(data) {
                this.form = data;
            },
            upPassword(){
                this.dialogVisible=true;
            },
            close(){
                this.dialogVisible=false;
                this.password.newPassword=null;
                this.password.oldPassword=null;
                this.rePassword=null;
            },
            confirm(){
                if(this.password.newPassword.length<=6&&this.password.oldPassword.length<=6&&
                this.password.newPassword.length>=3&&this.password.oldPassword.length>=3
                ){
                    if(this.password.newPassword==this.rePassword){
                        console.log(this.password)
                        upPasswordData(this.password).then(res=>{
                            if(res.code==200){
                                console.log(res)
                            }else{
                                this.$message.error("密码错误");
                            }
                            this.close()
                        })
                    }else{
                        this.$message.error("两次输入的新密码不一致");
                    }
                }else{
                    this.$message.error("密码要大于3个且小于6个字符");
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.formItem{
    display: flex;
    flex-wrap: wrap;
    margin: 30px;
}
.formItem div{
    width: 40%;
    margin: 20px;
}
</style>