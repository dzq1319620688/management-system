<template>
  <div class="table-column-wrapper">
    <slot></slot>
    <ul>
      <!-- 可以显示隐藏搜索组件 -->
      <li @click="search" class="el-icon-search"></li>

      <!-- 可以刷新表格数据 -->
      <li @click="refresh" class="el-icon-refresh"></li>

      <!-- 可以选择表格中出现的列 -->
      <li>
        <el-popover
          placement="bottom-end"
          :width="140"
          trigger="click">
          <template #reference>
            <div class="el-icon-s-operation"></div>
          </template>
          <el-checkbox-group v-model="checkList" @change="change">
            <el-checkbox
              v-for="item in column"
              :label="item.field"
              :key="item.field"
              style="width: 100%;margin-right: 0;">
              {{ item.title }}
            </el-checkbox>
          </el-checkbox-group>
        </el-popover>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    //所有的列
    column: {
      type: Array,
      default () {
        return []
      }
    },
    
    //开始就隐藏的列
    hide: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: ['change', 'refresh', 'search'],
  data () {
    return {
      checkList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    //得到初始选择的列
    getList () {
      this.column.forEach(item => {
        if (this.hide.indexOf(item.field) < 0) {
          this.checkList.push(item.field)
        }
      })
      this.change()
    },
    search () {
      this.$emit('search')
    },
    refresh () {
      this.$emit('refresh')
    },
    change () {
      this.$emit('change', this.getCheckColumn())
    },

    //返回选择的列
    getCheckColumn () {
      const arr = []
      for (let i = 0; i < this.column.length; i++) {
        if (this.checkList.indexOf(this.column[i].field) > -1) {
          arr.push(this.column[i])
        }
      }
      return arr
    }
  }
}
</script>

<style lang="less" scoped>
.table-column-wrapper{
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 40px;
}
ul,li{
  margin: 0;
  padding: 0;
  list-style: none;
}
ul{
  position: absolute;
  right: 0;
  border: 1px solid #ddd;
  border-right: none;
}
li{
  display: inline-block;
  width: 40px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #333;
  border-right: 1px solid #ddd;
  cursor: pointer;
}
</style>
