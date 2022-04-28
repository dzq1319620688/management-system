<template>
  <div>
    <div v-show="searchStatus"  class="search-wrapper">
        <search-Manage-Type-select  v-model="tableParams.type" />
        <el-input v-model="tableParams.id" clearable size="medium" placeholder="账户id" />
        <base-date-picker @changeDate="changeDate" />
        <el-button @click="toQuery" type="primary" size="medium">搜索</el-button>
    </div>

    <div class="table-wrapper">
      <table-column
        @search="searchColumn"
        @refresh="toQuery"
        @change="changeColumn"
        :hide="hide"
        :column="columns"
        style="padding-bottom: 10px"
      >
        <el-button type="primary" size="small" @click="add">新建用户</el-button>
        <el-button size="small" type="danger" @click="accountDelete(accountList)">批量删除</el-button>
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
            <div v-if="v.field=='type'">
              {{scope.row[v.field]?"管理员":"员工"}}
            </div>
            <span v-else>{{ scope.row[v.field] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="upData(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="accountDelete([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :total="pagination.total"
        :current-page="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-sizes="[30, 60, 100]"
        background
        layout="total,sizes,prev,pager,next"
        style="margin-top: 40px;text-align: right;" />
    </div>
    <my-form @submit="submit" :vis="vis" ref="form" @shut="vis=false"></my-form>
  </div>
</template>

<script>
import SearchManageTypeSelect from '@/components/SearchManageTypeSelect'
import BaseDatePicker from '@/components/BaseDatePicker'
import initTable from "@/mixins/initTable.js";
import myForm from './form';
import TableColumn from "@/components/TableColumn";
import {mapMutations,mapState} from "vuex"
import {accountDelete} from "@/api/account"

export default {
  name:"account/manage",
  components: {
    myForm,
    TableColumn,
    SearchManageTypeSelect,
    BaseDatePicker
  },
  mixins: [initTable],
  data() {
    return {
      columns: [
        { field: "id", title: "账户id" },
        { field: "name", title: "用户名" },
        { field: "isMale", title: "性别" },
        { field: "type", title: "用户类型" },
        { field: "createTime", title: "创建时间" },
        { field: "phone", title: "电话",width:'100px' },
        { field: "address", title: "地址" },
        { field: "email", title: "邮箱" },
        { field: "remark", title: "备注" },
        { field: "num", title: "所负责的订单数" },
        { field: "totalAmount", title: "所负责的总金额" },
        { field: "continued", title: "待结算的金额" },
      ],
      hide:["num","totalAmount","continued"],
      accountList: [],
      vis: false,
    };
  },
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
    changeDate (date) {
      this.tableParams.startTime = date.startTime
      this.tableParams.endTime = date.endTime
    },
    handleTableSelectionChange (res) {
      this.accountList = res.map((item) => item.id);
    },
    accountDelete(id){
      accountDelete(id).then((res)=>{
        if (res.code === 200) {
          this.submit(res.data)
          this.$message.success('删除成功')
        }
      })
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
    submit(data){
      this.pagination.total=data.total
      this.tableData=data.list
    }
  },
};
</script>

<style lang="less" scoped>

</style>