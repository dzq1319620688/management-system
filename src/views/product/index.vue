<template>
  <div>
    <div v-show="searchStatus" class="search-wrapper">
      <el-input
        v-model="tableParams.id"
        style="width:150px"
        clearable
        size="medium"
        placeholder="商品编码"
      />
      <search-Wares-Type-select v-model="tableParams.waresType" />
      <search-Wares-Tag-select v-model="tableParams.waresTag" />
      <search-Deliver-Type-select v-model="tableParams.deliverType" />
      <el-select
        v-model="tableParams.status"
        placeholder="请选择商品状态"
        clearable
        style="width:150px"
      >
        <el-option label="待上架" :value="0"></el-option>
        <el-option label="已上架" :value="1"></el-option>
        <el-option label="已下架" :value="2"></el-option>
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
        <el-button type="primary" size="small" @click="handleAdd"
          >新建</el-button
        >
        <el-button
          type="success"
          size="small"
          @click="waresUpStatus(waresList, 1)"
          >上架</el-button
        >
        <el-button
          type="warning"
          size="small"
          @click="waresUpStatus(waresList, 2)"
          >下架</el-button
        >
        <el-button type="danger" size="small" @click="waresDelete(waresList)"
          >删除</el-button
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
              <el-select
                v-model="scope.row[v.field]"
                size="mini"
                @change="
                  (value) => {
                    waresUpStatus([scope.row.id], value);
                  }
                "
              >
                <el-option label="待上架" :value="0"></el-option>
                <el-option label="已上架" :value="1"></el-option>
                <el-option label="已下架" :value="2"></el-option>
              </el-select>
            </div>
            <span v-else>{{ scope.row[v.field] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" :disabled="scope.row.status==2" @click="handleUpdate(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" @click="waresDelete([scope.row.id])"
              >删除</el-button
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
        :page-sizes="[30, 60, 100]"
        background
        layout="total,sizes,prev,pager,next"
        style="margin-top: 40px; text-align: right"
      />
    </div>

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
import { waresDelete, waresUpStatus } from "@/api/product";

export default {
  name: "business",
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
      columns: [
        { field: "id", title: "商品编码" },
        { field: "waresName", title: "商品名称" },
        { field: "waresType", title: "商品类型" },
        { field: "waresDetail", title: "商品详情" },
        { field: "primeCost", title: "成本价" },
        { field: "marketPrice", title: "市场价" },
        { field: "number", title: "库存数量" },
        { field: "waresTag", title: "商品标签" },
        { field: "depotDate", title: "入库时间" },
        { field: "status", title: "状态", width: "110px" },
        { field: "text", title: "备注" },
        { field: "unit", title: "计量单位" },
        { field: "waresSize", title: "商品尺寸" },
        { field: "deliverType", title: "配送类型" },
      ],
      hide: ["unit", "deliverType", "waresSize"],
      waresTypeList,
      deliverTypeList,
      waresTagList,
      unitTypeList,
      waresList: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    beforeInit() {
      this.tableUrl = "/waresList/all";
      return true;
    },
    changeDate(date) {
      this.tableParams.startTime = date.startTime;
      this.tableParams.endTime = date.endTime;
    },
    handleTableSelectionChange(res) {
      this.waresList = res.map((item) => item.id);
    },
    waresDelete(id) {
      waresDelete(id).then((res) => {
        if (res.code === 200) {
          this.submit(res.data);
          this.$message.success("删除成功");
        }
      });
    },
    waresUpStatus(id, status) {
      let data = {
        id,
        status,
      };
      waresUpStatus(data).then((res) => {
        if (res.code === 200) {
          this.submit(res.data);
          this.$message.success("修改状态成功");
        }
      });
    },
    handleAdd() {
      this.$refs.form.show();
    },
    handleUpdate(row) {
      this.$refs.form.show(row);
    },
    submit(data) {
      this.pagination.total=data.total
      this.tableData = data.list;
    },
  },
};
</script>

<style lang="less" scoped>
</style>