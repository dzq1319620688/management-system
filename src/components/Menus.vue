<template>
    <div v-if="menu">
        <el-submenu v-if="menu.children" :index="menu.url" >
            <template slot="title">
                <i :class="menu.icon"></i>
                <span slot="title">{{menu.name}}</span>
            </template>
            <nav-menu v-for="(item,index) in menu.children" :menu="item" :key="index"/>
        </el-submenu>
        <el-menu-item v-else :index="menu.url">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
        </el-menu-item>
    </div> 
</template>

<script>
    export default {
        name:"NavMenu",
        props:{
            menu:{
                type:Object
            }
        },
    }
</script>

<style lang="less" scoped>
 /deep/.el-menu-item{
    background:rgb(63 63 63) !important;
}
 /deep/  .el-submenu .el-menu-item{
    background:rgb(81 81 81) !important;
}
 /deep/.el-menu-item:hover{
    background:rgb(114, 114, 114) !important;
}
 /deep/ .el-submenu__title:hover{
    background: #6f6f6f !important;
}
</style>