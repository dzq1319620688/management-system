<template>
  <div>
    <div v-show="searchStatus"  class="search-wrapper">
        <el-input v-model="tableParams.searchKey" clearable size="medium" placeholder="账户或用户名" />
        <el-button @click="toQuery" type="primary" size="medium">搜索</el-button>
    </div>

    <div class="table-wrapper">
      <table-column
        @search="searchColumn"
        @refresh="toQuery"
        @change="changeColumn"
        :column="columns"
        style="padding-bottom: 10px"
      >
        <el-button type="primary" size="small" @click="add">新建角色</el-button>
      </table-column>

      <el-table
        v-loading="tableLoading"
        :data="tableData"
        @selection-change="handleTableSelectionChange"
        height="80vh"
        :header-cell-style="{ background: '#fafafa' }"
        highlight-current-row
        size="small"
        style="width: 100%"
      >
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          v-for="(v, i) in checkColumns"
          :prop="v.field"
          :label="v.title"
          :width="v.width"
          :min-width="v.minWidth"
          :key="i"
          align="center"
        >
          <template v-slot="scope">
            <span>{{ scope.row[v.field] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="upData(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :total="pagination.total"
        :current-page="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-sizes="[10, 30, 60]"
        background
        layout="total,sizes,prev,pager,next"
        style="margin-top: 40px;text-align: right;" />
    </div>
    <my-form @submit="toQuery" :vis="vis" ref="form" @shut="vis=false"></my-form>
  </div>
</template>

<script>
import initTable from "@/mixins/initTable.js";
import myForm from './form';
import TableColumn from "@/components/TableColumn";
import {mapMutations,mapState} from "vuex"

export default {
  
  mixins: [initTable],
  data() {
    return {
      columns: [
        { field: "account", title: "账户id" },
        { field: "name", title: "用户名" },
        { field: "createTime", title: "创建时间" },
        { field: "remark", title: "备注" },
        { field: "num", title: "所负责的产品数" },
        { field: "totalAmount", title: "所负责的总金额" },
        { field: "continued", title: "待结算的金额" },
      ],
      tableSelect:[],
      input3: "",
      selected: true,
      accountList: [],
      vis: false,
    };
  },
  components: {myForm,TableColumn},
  created() {
    this.init()
  },
  computed:{
    ...mapState(["rowData"])
  },
  methods:{
    beforeInit () {
      this.tableUrl = '/account/all'
      return true
    },
    handleTableSelectionChange (selection) {
      selection.forEach(item => {
        this.tableSelect.push(item.id)
      })
      console.log(this.tableSelect)
    },
    handleSelectionChange(res) {
      this.selected = res.length == 0 ? true : false;
      var arr = res.map((item) => item.account);
      this.accountList = arr;
    },
    operate(title) {
      this.$notify({
        title: "提示",
        message: JSON.stringify(this.accountList) + title + "成功",
        type: "success",
      });
    },
    add() {
      this.vis = true;
      this.saveData({})
    },
    ...mapMutations(['saveData']),
    upData(row) {
      this.saveData(row)
      this.vis = true;
      console.log(this.rowData)
    },
  },
};
</script>

<style lang="less" scoped>

</style>