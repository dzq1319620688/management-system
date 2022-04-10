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
      <el-select v-model="tableParams.status" placeholder="产品的状态" filterable size="medium">
                <el-option label="未提交" :value="0"></el-option>
                <el-option label="未审核" :value="1"></el-option>
                <el-option label="不通过" :value="2"></el-option>
                <el-option label="已结算" :value="3"></el-option>
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
        :hide="hide"
        style="padding-bottom: 10px"
      >
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
            <div v-else-if="v.field === 'status'">
              {{statusList[scope.row[v.field]]}}
            </div>
            <span v-else>{{ scope.row[v.field] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="submit(scope.row)" :disabled="scope.row.status==3">提交</el-button>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <div style="margin: 20px 0 5px;">备注:</div>
      <el-input
        v-model="form.text"
        type="textarea"
        clearable
        size="medium"
        :rows="2"
        placeholder="不通过原因或备注"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import initTable from "@/mixins/initTable.js";
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
        { field: "rate", title: "利率" },    
        { field: "date", title: "放贷时间" },
        { field: "status", title: "产品状态",width:"110px" },
        { field: "profit", title: "预计利润" },
        { field: "realityProfit", title: "实际利润" },
        { field: "createdate", title: "创建时间" },
        { field: "text", title: "备注" },
        { field: "endDate", title: "回款时间" },
      ],
      hide:["createdate","endDate","profit"],
      tableSelect:[],
      typelist:["汽车消费","房产消费","抵押贷款"],
      statusList:["未提交","未审核","不通过","已结算"],
      input3: "",
      selected: true,
      dialogVisible:false,
      form:{
        status:undefined,
        text:undefined
      },
      accountList: [],
    };
  },
  components: {TableColumn},
  created() {
    this.init()
  },
  methods:{
    beforeInit () {
      this.tableUrl = '/balanceList'
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
    submit(data){
      this.dialogVisible=true
      this.form.text=data.text
    },
    close(){
      this.dialogVisible=false
      this.init()
    }
  },
};
</script>

<style lang="less" scoped>
</style>