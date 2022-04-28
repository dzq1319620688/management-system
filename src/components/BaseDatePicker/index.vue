<template>
    <el-date-picker
      v-model="date"
      @change="changeDate"
      type="daterange"
      unlink-panels
      style="width:270px;margin-right: 15px;"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :shortcuts="shortcuts"
    />
</template>

<script>
import { formatDate, PURE_DATE_PATTERN } from '@/utils/format'

export default {
  props: ["defaultDate"],//默认时间
  emits: ['changeDate'],
  data () {
    return {
      shortcuts: [{
        text: '今天',
        value: (() => {
          const end = new Date()
          const start = new Date()
          return [start, end]
        })()
      }, {
        text: '昨天',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24)
          end.setTime(end.getTime() - 3600 * 1000 * 24)
          return [start, end]
        })()
      }, {
        text: '最近一周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
          return [start, end]
        })()
      }, {
        text: '最近一个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        })()
      }, {
        text: '最近二个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 60)
          return [start, end]
        })()
      },{
        text: '本月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setDate(1)
          return [start, end]
        })()
      },{
        text: '上月',
        value: (() => {
          const end = new Date()
          end.setDate(0)
          const start = new Date()
          console.log(start.getMonth())
          let a=start.getMonth()-1
          start.setMonth(a)
          start.setDate(1)
          return [start, end]
        })()
      }],
      date: undefined
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if(this.defaultDate){
        this.date =this.defaultDate
      }else{
        this.date = [new Date(), new Date()]
      }
      this.changeDate()
    },
    changeDate () {
      let date = this.date
      if(!(date[0] instanceof Date)){
        date[0]=date[0].$d
        date[1]=date[1].$d
      }
      this.$emit('changeDate',
        {
          startTime: date[0] ? formatDate(date[0], PURE_DATE_PATTERN) : date[0],
          endTime: date[1] ? formatDate(date[1], PURE_DATE_PATTERN) : date[1]
        }
      )
    }
  }

}
</script>

<style scoped>
/* .block {
  display: inline-block;
  position: relative;
  line-height: 40px;
  margin: 0 30px 10px 0;
} */
</style>
