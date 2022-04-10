<template>
  <div class="layout">
    <el-container>
      <el-aside>
        <nav-left></nav-left>
      </el-aside>
      <el-container>
        <el-header>
          <headers />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
import Headers from "../components/Headers";
import NavLeft from "../components/NavLeft";
export default {
  components: {
    Headers,
    NavLeft
  },
};
</script>
<style scoped lang='less'>
.el-aside {
  background-color: rgb(63 63 63);
  width: 15vw !important;
  color: #333;
  height: 100vh;
  overflow:hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 70vh;
  overflow-y: auto;
}
</style>