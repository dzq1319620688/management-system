<template>
    <div class="table-wrapper">
        <div>个人中心</div>
        <div>账户id:{{form.id}}</div>
        <div>账户姓名:{{form.name}}</div>
        <div>创建时间:{{form.createTime}}</div>
        <div>复制产品数:{{form.num}}</div>
        <div>负责的总金额:{{form.totalAmount}}</div>
        <div>待结算的金额:{{form.continued}}</div>
        <el-button>修改密码</el-button>
    </div>
</template>

<script>
import {account} from "@/api/account"
import {getId} from "@/utils/auth"
    export default {
        data(){
            return {
                id:undefined,
                form:{
                    id:undefined,
                    name:undefined,
                    createTime:undefined,
                    remark:undefined,
                    num:undefined,
                    totalAmount:undefined,
                    continued:undefined
                }
            }
        },
        created() {
            this.id=getId()
            account({"id":this.id}).then(res=>{
                console.log(this.id,res)
                this.form=Object.assign({}, res.data)
                console.log(123,this.form)
            })
        },
        methods:{
            
        }
    }
</script>

<style lang="scss" scoped>

</style>