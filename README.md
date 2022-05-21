# mysystem

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
本项目运用前端开发框架 Vue.js、element-ui框架、eCharts数据可视化工具、axios网络请求库、Webpack 构建技术等开发企业级管理平台系统的前端部分。
后端采取Mock模拟数据生成器来产生数据，并对其增加增删改查功能。
系统主要包括登录模块,首页和个人中心模块，账户管理模块，商品管理模块，订单管理模块;

技术点：
封装功能组件，可以控制搜索区域的显示隐藏和数据的刷新还有动态控制表格中列的数量。
封装搜索组件，使其提高代码复用性。在搜索区域和表单中都可使用。
封装混入函数，提取页面共有函数，
使用虚拟滚动方法，解决table表格显示大数据量卡顿的现象并支持数据批量处理。

