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

技术点：1.使用webpack搭建项目，线上api请求跨域，创建vue.config.js文件，在proxy中设置跨域。。2.封装axios，方便项目迭代和统一管理，实现数据动态渲染，配置拦截器实现项目的拦截。3.vue-router权限模板的实现，使用路由守卫，实现登录安全限制。4.使用vuex，实现数据的共享。5.使用element-ui高效搭建页面结构。6.使用echarts可视化工具将数据渲染成图表的样式。

