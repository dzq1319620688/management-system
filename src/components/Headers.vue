<template>
  <div class="head">
    <el-breadcrumb separator="/" class="mt fl" style="margin-top:20px">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown class="fr" @command="fn" @visible-change="changeIcon">
      <div>
        <span class="el-dropdown-link" style="margin:10px">
        欢迎您！{{ name }}<i :class="iconType"></i>
        </span>
      <img src="@/assets/hand.jpg" class="user-avatar" align="middle">
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">个人中心</el-dropdown-item>
        <el-dropdown-item command="2">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <p class="fr date">
      今天是你加入的第<span class="tip">{{ days }}</span
      >天
    </p>
    <div class="clear"></div>
  </div>
</template>

<script>
import {removeAccount ,getNickname } from "@/utils/auth";
import { get } from "@/utils/http";
import bread from "@/mixins/bread.js";

export default {
  mixins: [bread],
  data() {
    return {
      name: getNickname("nickname"),
      time: "",
      iconType:"el-icon-arrow-down"
    };
  },
  created() {
    get("/in").then((res) => {
      this.time = res.time;
    });
  },
  computed: {
    days() {
      let target = new Date(this.time);
      let now = new Date();
      let m = now - target;
      return Math.floor(m / 1000 / 60 / 60 / 24);
    },
  },
  methods: {
    fn(command) {
      if (command == "2") {
        removeAccount();
        this.$router.push("/login");
      }else{
        this.$router.push("/personal/index");
      }
    },
    changeIcon(type){
      if(type){
        this.iconType="el-icon-arrow-up"
      }else{
        this.iconType="el-icon-arrow-down"
      }
    }
  },
};
</script>

<style lang="less" scoped>
.head {
  line-height: 60px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.date {
  margin-right: 50px;
  .tip {
    color: #40a9ff;
    font-size: 20px;
  }
}
</style>