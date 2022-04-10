<template>
  <div>
    <div v-show="searchStatus" class="search-wrapper">
      <el-input
        v-model="tableParams.searchKey"
        clearable
        size="medium"
        placeholder="产品编号或名称"
      />
      <el-select v-model="tableParams.type" placeholder="产品类型" clearable size="medium">
        <el-option value="0">汽车消费</el-option>
        <el-option value="1">房产消费</el-option>
        <el-option value="2">抵押贷款</el-option>
      </el-select>
      <el-input
        v-model="tableParams.companyName"
        clearable
        size="medium"
        placeholder="产品公司名称"
      />
      <el-select v-model="tableParams.name" placeholder="对接人员" filterable clearable size="medium">
        <el-option value="0">人员1</el-option>
        <el-option value="1">人员2</el-option>
        <el-option value="2">人员3</el-option>
      </el-select>
      <el-date-picker
        v-model="tableParams.createdate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      ></el-date-picker>
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
        <el-button @click="add"  type="primary">新增</el-button>
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
        <el-table-column type="selection"> </el-table-column>
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
            <div v-if="v.field === 'type'">
              {{typelist[scope.row[v.field]]}}
            </div>
            <span v-else>{{ scope.row[v.field] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="update(scope.row)">编辑</el-button>
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
        style="margin-top: 40px; text-align: right"
      />
    </div>
    <my-form @submit="toQuery" ref="form"></my-form>
  </div>
</template>

<script>
import initTable from "@/mixins/initTable.js";
import myForm from './form';
import TableColumn from "@/components/TableColumn";

export default {
  
  mixins: [initTable],
  data() {
    return {
      columns: [
        { field: "id", title: "产品编号" },
        { field: "productName", title: "名称" },
        { field: "type", title: "类型" },
        { field: "companyName", title: "归属公司" },
        { field: "name", title: "业务人员" },
        { field: "productDetail", title: "产品详情" },
        { field: "money", title: "金额" },
        { field: "number", title: "数量" },
        { field: "rate", title: "比率" },    
        { field: "date", title: "放贷时间" },
        { field: "profit", title: "预计利润" },
        { field: "createdate", title: "创建时间" },
      ],
      tableSelect:[],
      typelist:["汽车消费","房产消费","抵押贷款"],
      input3: "",
      selected: true,
      accountList: [],
    };
  },
  components: {myForm,TableColumn},
  created() {
    this.init()
  },
  methods:{
    beforeInit () {
      this.tableUrl = '/productList'
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
    add () {
      this.$refs.form.show()
    },
    update (row) {
      this.$refs.form.show(row)
    },
  },
};
</script>

<style lang="less" scoped>
</style>