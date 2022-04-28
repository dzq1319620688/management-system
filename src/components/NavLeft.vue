<template>
  <div>
      <h4 class="title">金融后台管理系统</h4>
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      background-color="rgb(63 63 63)"
      unique-opened
      router
      text-color="rgb(228 228 228)"
      active-text-color="rgb(122 169 228)"
    >
      <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <menus v-for="(item, index) in menuData" :menu="item" :key="index" />
      <menus />
    </el-menu>
  </div>
</template>

<script>
// import { get } from "@/utils/http.js";
import {menuList} from "@/api/login"
import {getType} from "@/utils/auth"
import Menus from "./Menus.vue";

export default {
  data() {
    return {
      menuData: [],
    };
  },
  created() {
    menuList({"type":getType()}).then((res) => {
      this.menuData = res.data;
      console.log(res);
    });
  },
  components: {
    Menus,
  },
  computed:{
    activeMenu () {
      const route = this.$route
      const {path} = route
      return path
    }
  }
};
</script>

<style lang="less" scoped>
.title{
    text-align: center;
    line-height: 60px;
    color:rgb(246 246 246);
}
/deep/ .is-active .el-submenu__title {
   color: #fff !important;
}
/deep/ .el-menu {
 border: none;
}
 /deep/.el-menu-item:hover{
    background:rgb(114, 114, 114) !important;
}
</style>