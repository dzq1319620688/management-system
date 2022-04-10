<template>
  <div>
    <el-dialog :title="title" :visible="vis" width="30%" @close="close">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="character">
          <el-select
            v-model="form.character"
            placeholder="请选择人员"
            style="width: 100%"
          >
            <el-option label="业务人员" :value="1"></el-option>
            <el-option label="管理员" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {post} from "@/utils/http"
import {mapState} from "vuex"
export default {
  props:["vis"],
  data() {
    return {
      form: {
        name:"",
        character:undefined,
        remark: "",
      },
      rules:{
        character:[{required: true, message: '请选择角色', trigger: 'change'}],
        ramark:[{required: true, message: '请输入备注', trigger: 'blur'}],
        name:[{required: true, message: '请输入用户名', trigger: 'blur'}]
      },
      title:"新建角色"
    };
  },
  computed:{
    ...mapState(['rowData'])
  },
  watch:{
    vis(){
      const {character,remark,name}=this.rowData
      if(character){
        this.title="修改角色"
      }else{
        this.title="新建角色"
      }
      this.form={character,remark,name};
    }
  },
  methods:{
    close(){
      this.$emit("shut")
    },
     submitForm() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            // post("/add",this.form).then((res)=>{
            //   if(res.code==0){
            // this.$emit("end");
            // this.close()
            //   }
            // })
            this.$emit("submit");
            console.log("添加成功")
          } else {
            this.$emit("submit");
            alert("密码错误")
            return false;
          }
        });
     },
  },
};
</script>

<style lang="less" scoped>
</style>