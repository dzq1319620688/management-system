<template>
  <div>
    <div v-show="searchStatus" class="search-wrapper">
      <el-input
        v-model="tableParams.id"
        style="width:150px"
        clearable
        size="medium"
        placeholder="订单编号"
      />
      <el-input
        v-model="tableParams.id"
        style="width:150px"
        clearable
        size="medium"
        placeholder="商品编号"
      />
      <el-input
        v-model="tableParams.accountId"
        style="width:150px"
        clearable
        size="medium"
        placeholder="负责人账户id"
      />
      <el-input
        v-model="tableParams.waresId"
        style="width:150px"
        clearable
        size="medium"
        placeholder="订单编号"
      />
      <el-input
        v-model="tableParams.phone"
        style="width:150px"
        clearable
        size="medium"
        placeholder="收货人电话"
      />
      <search-Wares-Type-select v-model="tableParams.waresType" />
      <search-Wares-Tag-select v-model="tableParams.waresTag" />
      <search-Deliver-Type-select v-model="tableParams.deliverType" />
      <el-select
        v-model="tableParams.status"
        placeholder="请选择订单状态"
        clearable
      >
        <el-option
          v-for="item in orderTypeMap"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <base-date-picker @changeDate="changeDate" />
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
        <el-button
          type="success"
          size="small"
          @click="orderUpStatus(orderList, 2)"
          >批量发货</el-button
        >
        <el-button
          type="danger"
          size="small"
          @click="cancel"
          >批量取消</el-button
        >
      </table-column>

      <el-table
        v-loading="tableLoading"
        :data="showTableData"
        @select-all="handleTableSelectionChange"
        @select="oneChange"
        height="80vh"
        :header-cell-style="{ background: '#fafafa' }"
        highlight-current-row
        :row-style="{height:'80px'}"
        size="small"
        ref="table"
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
            <div v-if="v.field === 'waresType'">
              {{ waresTypeList[scope.row[v.field]] }}
            </div>
            <div v-else-if="v.field === 'deliverType'">
              {{ deliverTypeList[scope.row[v.field]] }}
            </div>
            <div v-else-if="v.field === 'waresTag'">
              <el-tag size="mini">{{
                waresTagList[scope.row[v.field]]
              }}</el-tag>
            </div>
            <div v-else-if="v.field === 'unit'">
              {{unitTypeList[scope.row[v.field]]}}
            </div>
            <div v-else-if="v.field === 'status'">
              <el-tag size="small" :type="orderTypeMap[scope.row[v.field]].type">{{
                orderTypeMap[scope.row[v.field]].label
              }}</el-tag>
            </div>
            <span v-else>{{ scope.row[v.field] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button size="mini" :disabled="scope.row.status>=3" @click="handleUpdate(scope.row)"
              >修改</el-button
            >
            <el-button size="mini" :disabled="scope.row.status!=1" @click="orderUpStatus([scope.row.id],2)"
              >发货</el-button
            >
            <el-button size="mini" :disabled="scope.row.status>2" @click="cancel(scope.row)"
              >取消</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :total="pagination.total"
        :current-page="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-sizes="[30,60,100,1000,2000]"
        background
        layout="total,sizes,prev,pager,next"
        style="margin-top: 40px; text-align: right"
      />
    </div>

    <el-dialog
      title="取消提示"
      :visible="dialogVisible"
      width="30%">
      <span style="color:#ef3c3c">取消后不可更改，确定取消吗？</span>
      <el-input
          placeholder="可输入取消理由"
          type="textarea"
          :rows="2"
          style="margin-top:20px"
          v-model="cancelText"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <m-form @submit="submit" ref="form" />
  </div>
</template>

<script>
import initTable from "@/mixins/initTable.js";
import TableColumn from "@/components/TableColumn";
import mForm from "./form";
import BaseDatePicker from "@/components/BaseDatePicker";
import SearchWaresTypeSelect from "@/components/SearchWaresTypeSelect";
import SearchWaresTagSelect from "@/components/SearchWaresTagSelect";
import SearchDeliverTypeSelect from "@/components/SearchDeliverTypeSelect";
import { waresTypeList } from "@/const/wares-type";
import { deliverTypeList } from "@/const/deliver-type";
import { waresTagList } from "@/const/wares-tag";
import { unitTypeList } from "@/const/unit-type";
import { orderTypeMap} from "@/const/order-type";
import { orderUpStatus } from "@/api/order";

export default {
  name: "order",
  components: {
    TableColumn,
    mForm,
    BaseDatePicker,
    SearchWaresTypeSelect,
    SearchWaresTagSelect,
    SearchDeliverTypeSelect,
  },
  mixins: [initTable],
  data() {
    return {
      showTableData: [],
      tableSelect: [],
      columns: [
        { field: "id", title: "订单编号" },
        { field: "waresId", title: "商品编码" },
        { field: "waresName", title: "商品名称" },
        { field: "unitPrice", title: "单价" },
        { field: "unitNumber", title: "数量" },
        { field: "orderTime", title: "下单时间" },
        { field: "consignee", title: "收货人" },
        { field: "phone", title: "电话",width: "110px" },
        { field: "address", title: "地址",width: "150px" },
        { field: "status", title: "订单状态",width: "110px"},
        { field: "text", title: "订单备注" },
        { field: "cancelText", title: "取消理由" },
        { field: "accountId", title: "负责人" },
        { field: "unit", title: "计量单位" },
        { field: "waresType", title: "商品类型" },
        { field: "waresTag", title: "商品标签" },
        { field: "waresSize", title: "商品尺寸" },
        { field: "deliverType", title: "配送类型" },
      ],
      hide: ["unit","waresType","waresTag", "deliverType","cancelText", "waresSize","accountId"],
      waresTypeList,
      deliverTypeList,
      waresTagList,
      unitTypeList,
      orderTypeMap,
      orderList: [],
      dialogVisible:false,
      cancelData:undefined,
      cancelText:"",
      num:0
    };
  },
  created() {
  },
  mounted() {
    this.tableDom();
    this.$nextTick(()=>{
      this.init();
    })
  },
  methods: {
    beforeInit() {
      this.tableUrl = "/orderList/all";
      return true;
    },
    afterInit(res) {
      this.tableData = res.data.list;
      this.tableSelect = [];//清空选择的项
      document.querySelector(".el-table__body-wrapper").scrollTop=0//使下拉条回到顶部
      document.querySelector('.el-table__body').style.transform = "translateY(0px)"//使表格回到顶部
      console.log(12324)
      //使固定的列回到顶部
      let vheight=document.querySelector('#vheight')
      console.log(12324,vheight)
      if (this.pagination.pageSize <= 60) {
        vheight.style.height ='0px';
        this.showTableData = this.tableData.slice(0,this.tableData.length);
        this.timer = true;
      } else {
        //使插入的元素高度变高，撑开表格，数字是每行高度，如果高度不确定，可取平均值以下
        vheight.style.height = this.tableData.length * 83 + 'px'
        // 截断的前50条数据放入tableData，交给table组件渲染
        this.$nextTick(()=>{this.showTableData = this.tableData.slice(0,50)})
        this.timer = null;
      }
    },
    tableDom(){
      let i = document.createElement('i')
      i.id = 'vheight'
      i.style.width = '0'
      i.style.float = 'right'
      let dom = document.querySelector(".el-table__body-wrapper");
      dom.append(i)//插入元素撑开表格
      document.querySelector('.el-table__body').style.float = 'left'//将表格主体浮动

      dom.addEventListener("scroll", () => {
          let s = dom.scrollTop, h = 85,c
          //c做为判断拉动的距离有没有达到30条，我们每次取50条，留20条缓冲
          c = Math.floor(s / h)>=this.num&&Math.floor(s / h)<=this.num+30
          if(!this.timer&&!c){
          this.num = Math.floor(s / h)
              if(this.num<=this.pagination.total-50){
                console.log(this.num)
                document.querySelector('.el-table__body').style.transform = `translateY(${s}px)`
                this.showTableData = this.tableData.slice(this.num,this.num+50);
                this.showTableData.forEach((item) => {
                  if (this.tableSelect.indexOf(item) !== -1) {
                    this.$nextTick(() => {
                      this.$refs.table.toggleRowSelection(item);
                    });
                  }
                });
              }else{
                this.num=this.pagination.total-30
                console.log(this.num)
                this.showTableData = this.tableData.slice(this.pagination.total-50,this.pagination.total);
                this.showTableData.forEach((item) => {
                  if (this.tableSelect.indexOf(item) !== -1) {
                    this.$nextTick(() => {
                      this.$refs.table.toggleRowSelection(item);
                    });
                  }
                });
              }
          }
      });
    },
    changeDate(date) {
      this.tableParams.startTime = date.startTime;
      this.tableParams.endTime = date.endTime;
    },
    handleTableSelectionChange(res) {
      if (res[0]) {
        this.tableSelect = this.tableData;
        this.orderList = this.tableData.res.map((item) => item.id);
      } else {
        this.tableSelect = [];
        this.orderList=[]
      }
    },
    oneChange(selection, row) {
      this.orderList = selection.map((item) => item.id);
      if (this.tableSelect.indexOf(row) !== -1) {
        let data = [];
        this.tableSelect.forEach((item) => {
          if (item !== row) {
            data.push(item);
          }
        });
        this.tableSelect = data;
      } else {
        this.tableSelect.push(row);
      }
    },
    orderUpStatus(id, status,cancelText) {
      console.log(234,id)
      let data = {
        id,
        status,
        cancelText
      };
      orderUpStatus(data).then((res) => {
        if (res.code === 200) {
          this.submit(res.data);
          this.$message.success("修改订单状态成功");
        }
      });
    },
    handleUpdate(row) {
      this.$refs.form.show(row);
    },
    cancel(data){
      this.dialogVisible=true;
      if(data.id){
        this.cancelData=data
        this.cancelText=data.cancelText
      }
    },
    close(){
      this.dialogVisible=false;
      this.cancelData=undefined
      this.cancelText=""
    },
    confirm(){
      console.log(456, this.cancelData,this.orderList)
      if(this.cancelData){
        this.orderUpStatus([this.cancelData.id],4,this.cancelText)
      }else{
        this.orderUpStatus(this.orderList,4,this.cancelText)
      }
      this.close()
    },
    submit(data) {
      this.tableData = data.list;
      this.showTableData = this.tableData.slice(this.num,this.tableData.length)
      console.log(this.showTableData)
      this.pagination.total=data.total
    },
  },
};
</script>

<style lang="less" scoped>
</style>