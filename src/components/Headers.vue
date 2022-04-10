<template>
  <div class="head">
    <el-breadcrumb separator="/" class="mt fl" style="margin-top:20px">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown class="fr" @command="fn">
      <span class="el-dropdown-link">
        欢迎您！{{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
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
import { removeToken,removeNickname,getNickname } from "@/utils/auth";
import { get } from "@/utils/http";
import bread from "@/mixins/bread.js";

export default {
  mixins: [bread],
  data() {
    return {
      name: getNickname("nickname"),
      time: "",
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
        removeToken();
        removeNickname();
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  line-height: 60px;
}
.date {
  margin-right: 50px;
  .tip {
    color: #40a9ff;
    font-size: 20px;
  }
}
</style>