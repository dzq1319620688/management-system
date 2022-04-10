import { getTableList } from '@/api/common'
export default {
  data () {
    return {
      tableLoading: false,//是否在请求中
      tableData: [],//请求返回的数据
      tableUrl: '',//请求的路径
      tableParams: {},//搜索的参数
      //请求页数和条数
      pagination: {
        pageNum: 1,
        pageSize: 30,
        total: 0
      },
      searchStatus: true,//搜索组件是否显示
      checkColumns: [],//表格的列
      cancelAjax:null//用作存储请求中断的方法
    }
  },
  methods: {
    async init () {
      //先执行发送请求前的函数
      if (!await this.beforeInit()) {
        return
      }
      this.tableLoading = true
      const params = Object.assign({}, this.pagination, this.tableParams)
      delete params.total
      //判断this.cancelAjax是不是函数，是函数的话说明当前有请求在进行中，那么我们就中断请求
      if (typeof this.cancelAjax === 'function') {
        this.cancelAjax()
      }
      //将this传入请求的方法中去获取到中断请求的方法
      getTableList(this.tableUrl,params,this).then(res => {
        if (res.code === 200) {
          this.pagination.total = res.data.total
      console.log(this.pagination)
          this.afterInit(res)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @desc 获取列表数据前的钩子函数
     * @return { Boolean } 是否继续请求数据
     */
    beforeInit () {
      return true
    },

    /* 获取列表数据后的钩子函数 */
    afterInit (res) {
      this.tableData = res.data.list
      console.log(res)
    },

    // 显示隐藏搜索组件
    searchColumn () {
      this.searchStatus = !this.searchStatus
    },

    //选择表格中出现的列后将那些选择的列传入表格中要渲染的列
    changeColumn (value) {
      this.checkColumns = value
      console.log(123,value)
    },

    /* 页面只有一条数据时，做删除操作跳转到上一页 */
    delBackPage () {
      if (this.pagination.pageNum <= 1) {
        return
      }
      if (this.data.length <= 1) {
        this.pagination.pageNum -= 1
      }
    },
    /**
     * @desc 查询条件修改后调用该方法
     * @param {*} flag 是否页面初始化调用
     */
    toQuery () {
      this.init()
    },
    //改变页显示数后调用该方法
    sizeChange (pageSize) {
      this.pagination.pageNum = 1
      this.pagination.pageSize = pageSize
      this.init()
    },
    //改变页数后调用该方法
    currentChange (currentSize) {
      this.pagination.pageNum = currentSize
      this.init()
    }
  }
}
