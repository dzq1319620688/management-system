import Mock from "mockjs";
//登录接口
let password2=123456
let password3=123456
let username2='dzq'
let username3='dzq2'
let myName2='董志强管理员'
let myName3='董志强'
Mock.mock("localhost:8080/login", "post", (req) => {
    let {
        username,
        password
    } = JSON.parse(req.body);
    if (username == username2 && password == password2) {
        return {
            code: 200,
            success: true,
            data:{
                nickname: myName2,
                token: '31hgfhgf45hjghf4',
                id:"1001",
                type:1,
            }
        }
    } else if (username == username3 && password == password3) {
        console.log(12344)
        return {
            code: 200,
            success: true,
            data:{
                nickname: myName3,
                token: 'dfgdfgfhgnbcvbtj',
                id:"1002",
                type:2,
            }
        }
    }else{
        return {
            code: 100,
            success: false,
            message: '账号或者密码有误'
        }
    }
})

// 记录入职时间接口
Mock.mock('localhost:8080/in', 'get', () => {
    return {
        code: 200,
        success: true,
        message: '操作成功',
        time: '2021-10-10 00:00:00'
    }
})

//左侧菜单数据
const menuList1 = [
    {
        name: "账户管理",
        icon: "el-icon-coin",
        url: "/account",
        children: [
            {
                name: "人员管理",
                icon: "el-icon-phone-outline",
                url: "/account/manage",
                meta:{bread:['账户管理','人员管理']}
            },
        ]
    },
    {
        name: "商品管理",
        icon: "el-icon-menu",
        url: "/product",
        children: [{
                name: "商品列表",
                icon: "el-icon-notebook-2",
                url: "/product/index",
                meta:{bread:['商品管理','商品列表']}
            }
        ]
    },
    {
        name: "订单管理",
        icon: "el-icon-user",
        url: "/orderManage",
        children: [{
                name: "所有订单",
                icon: "el-icon-bank-card",
                url: "/orderManage/index",
                meta:{bread:['订单管理','所有订单']}
            },
            {
                name: "订单报表",
                icon: "el-icon-bank-card",
                url: "/orderManage/orderChart",
                meta:{bread:['订单管理','订单报表']}
            },
        ]
    },
    {
        name: "个人中心",
        icon: "el-icon-user",
        url: "/personal/index",
    }
]
const menuList2 = [
    {
        name: "商品管理",
        icon: "el-icon-menu",
        url: "/product",
        children: [{
                name: "商品列表",
                icon: "el-icon-notebook-2",
                url: "/product/index",
                meta:{bread:['商品管理','商品列表']}
            }
        ]
    },
    {
        name: "订单管理",
        icon: "el-icon-user",
        url: "/orderManage",
        children: [{
                name: "所有订单",
                icon: "el-icon-bank-card",
                url: "/orderManage/index",
                meta:{bread:['订单管理','所有订单']}
            },
            {
                name: "订单报表",
                icon: "el-icon-bank-card",
                url: "/orderManage/orderChart",
                meta:{bread:['订单管理','订单报表']}
            },
        ]
    },
    {
        name: "个人中心",
        icon: "el-icon-user",
        url: "/personal/index",
    }
]
//左侧菜单接口
Mock.mock(RegExp('localhost:8080/menu' + '.*'), 'get', (req) => {
    let paramsData=JSON.parse(req.body)
    if(paramsData.type==1){
        return {
            code: 200,
            success: true,
            message: "成功",
            data: menuList1
        }
    }else if(paramsData.type==2){
        return{
            code: 200,
            success: true,
            message: "成功",
            data: menuList2
        }
    }
});

//图表
Mock.mock('localhost:8080/load', 'post', () => {
    let data=[]
    let list2=[]
    let proportionData=[
        {
            num:Mock.Random.integer(150,250),
            ratio:Mock.Random.integer(1,50)
        },
        {
            num:Mock.Random.integer(10000,20000),
            ratio:Mock.Random.integer(1,50)
        },
        {
            num:Mock.Random.integer(10000,20000),
            ratio:Mock.Random.integer(1,30)
        },
        {
            num:Mock.Random.integer(1000000,2000000),
            ratio:Mock.Random.integer(1,30)
        },
    ]
    for(let i=0;i<7;i++){
        let list=Mock.Random.integer(1000,2000)
        data.push(list)
    }
    for(let i=0;i<4;i++){
        let list=Mock.Random.integer(50,200)
        list2.push(list)
    }
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:{
                xdata: ['22.01', '22.02', '22.03', '22.04', '22.05', '22.06', '22.07'],
                ydata: data
            },
            proportionData,
            list2
        }
    }
});


var dataList = [];
var totalNum=100
//所有人员
Mock.mock(RegExp('localhost:8080/account/all' + '.*'), 'get', options => {
    let paramsData= options.url.split("?")[1].split("&")
    console.log(paramsData,options)
    let params={}
    for(let i=0;i<paramsData.length;i++){
        let arr = paramsData[i].split("=")
        params[arr[0]]=arr[1]
    }
    let moreList = []
    if(params.id){
        params.pageSize=1
    }
    for (let i = 0; i < params.pageSize; i++) {
        let newObject =Mock.mock({
                    'name': "@cname",
                    'character|1': [1,2],
                    'remark|5-20': '@cword',
                    'createTime': Mock.Random.integer(params.startTime,params.endTime),
                    'num': Mock.Random.integer(30,200),
                    "type|1":[0,1],
                    "phone":/^1[34578]\d{9}$/,
                    "address":'@county(true)',//随机地址
                    "email":'@email',//随机邮箱
                    "isMale|1":["男","女"],//随机性别
                    "totalAmount":Mock.Random.integer(10000000,500000000),
                    "continued":Mock.Random.integer(10000000,500000000),
            })
        newObject.id=params.id?params.id:100+i
        if(params.type){
            newObject.type=params.type
        }
        if(newObject.type){
            newObject.num=undefined
            newObject.totalAmount=undefined
            newObject.continued=undefined
        }
        moreList.push(newObject)
      }
    dataList=moreList
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:moreList,
            total:params.pageSize==1?1:totalNum=100,
        }
    }
})
// 数据的删除操作
let list = function (options) {
    let rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
    let id
    switch (rtype) {
        case 'get':
            break;
        case 'post':
            id = JSON.parse(options.body); // 获取请求的id，将options.body转换为JSON对象
            console.log(123,id)
            for(let i=0;i<id.length;i++){
                dataList = dataList.filter(function (val) {
                    return val.id != id[i]; // 过滤掉前台传过来的id对应的相应数据，并重新返回
                });
            }
            break;
        default:
            break;
    }
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:dataList,
            total:--totalNum,
        }
    }
}
Mock.mock('localhost:8080/account/delete', /get|post/i, list);
// 数据的添加操作
let listAdd = function (options) {
    let obj = JSON.parse(options.body);
    obj.id=obj.id?obj.id:Mock.Random.integer(100,300)
    dataList.unshift(obj); // 将前台返回来的数据，拼接到数组中。
    dataList.pop(); //删除最后一条数据
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:dataList,
            total:++totalNum,
        }
    }
}
Mock.mock('localhost:8080/account/add', /get|post/i, listAdd);

// 数据的修改操作
let listUpdate = function (options) {
    let obj = JSON.parse(options.body);
    dataList = dataList.map(val => { // 将需要替换的数据替换掉
        // console.log(val)
        return val.id == obj.id ? obj : val;
    });
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:dataList,
            total:dataList.length,
        }
    }
}
Mock.mock('localhost:8080/account/updata', /get|post/i, listUpdate);

// 个人中心数据
let oneAccount={}
Mock.mock('localhost:8080/account/one', 'get', options => {
    let params=JSON.parse(options.body)
    let newObject =Mock.mock({
        'character|1': [1,2],
        'remark|5-20': '@cword',
        'createTime': Mock.Random.integer(params.startTime,params.endTime),
        'num': Mock.Random.integer(30,200),
        "phone":/^1[34578]\d{9}$/,
        "address":'@county(true)',//随机地址
        "email":'@email',//随机邮箱
        "isMale":"男",//性别
        "totalAmount":Mock.Random.integer(10000000,500000000),
        "continued":Mock.Random.integer(10000000,500000000),
    })
    newObject.id=params.id
    newObject.name=params.name
    newObject.type=params.type
    oneAccount=newObject
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            ...newObject,
        }
    }
})
// 个人数据的修改操作
let oneUpdate = function (options) {
    let obj = JSON.parse(options.body);
    oneAccount = obj
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            ...oneAccount,
        }
    }
}
let upPassword = function (options) {
    let obj = JSON.parse(options.body);
    if(obj.id==1001){
        if(obj.oldPassword==password2){
            password2=obj.newPassword
            console.log(password2)
        }else{
            return {
                code: 304,
                success: false,
                message: "密码错误",
            }
        }
    }else{
        if(obj.oldPassword==password3){
            password3=obj.newPassword
            console.log(password3)
        }else{
            return {
                code: 302,
                success: false,
                message: "密码错误",
            }
        }
    }
    
    return {
        code: 200,
        success: true,
        message: "成功",
    }
}
Mock.mock('localhost:8080/account/one/updata', /get|post/i, oneUpdate);
Mock.mock('localhost:8080/account/upPassword', /get|post/i, upPassword);


//产品管理--全部产品   
Mock.mock(RegExp('localhost:8080/waresList/all' + '.*'), "get", (options) => {
    let paramsData= options.url.split("?")[1].split("&")
    let params={}
    for(let i=0;i<paramsData.length;i++){
        let arr = paramsData[i].split("=")
        params[arr[0]]=arr[1]
    }
    let moreList = []
    if(params.id){
        params.pageSize=1
    }
    for (let i = 0; i < params.pageSize; i++) {
        let newObject =Mock.mock({
                'waresName|1':["面包","灯具","外套","54消毒液","电池","电脑"],
                'waresType|1':[0,1,2,3],
                'deliverType|1':[0,1,2,3,4],
                'waresDetail': Mock.mock('@ctitle'),
                'primeCost':Mock.Random.integer(50,100),
                'marketPrice':Mock.Random.integer(130,250),
                'number':Mock.Random.integer(100,2000),
                'text':Mock.mock('@ctitle'),
                'unit|1': [0,1,2,3],
                'waresTag|1': [0,1,2],
                'waresSize|1': ["150*200","230*300","450*350","500*500"],
                'status|1':[0,1,2],
                'depotDate': Mock.Random.integer(params.startTime,params.endTime),
            })
        newObject.id=params.id?params.id:Mock.Random.integer(1057544356,2546565650)
        if(params.waresType){
            newObject.waresType=params.waresType
        }
        if(params.deliverType){
            newObject.deliverType=params.deliverType
        }
        if(params.waresTag){
            newObject.waresTag=params.waresTag
        }
        if(params.status){
            newObject.status=parseInt(params.status)
        }
        moreList.push(newObject)
    }
    dataList=moreList
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:moreList,
            total:params.pageSize==1?1:totalNum,
        }
    }
})
let upStatus = function (options) {
    let obj = JSON.parse(options.body);
    console.log(123,obj)
    for(let i=0;i<dataList.length;i++){
        for(let j=0;j<obj.id.length;j++){
            if(dataList[i].id==obj.id[j]){
                dataList[i].status=obj.status
            }
        }
    }
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:dataList,
        }
    }
}
Mock.mock('localhost:8080/waresList/delete', /get|post/i, list);
Mock.mock('localhost:8080/waresList/add', /get|post/i, listAdd);
Mock.mock('localhost:8080/waresList/updata', /get|post/i, listUpdate);
Mock.mock('localhost:8080/waresList/upStatus', /get|post/i, upStatus);

//订单管理--所有订单
Mock.mock(RegExp('localhost:8080/orderList/all' + '.*'), 'get', (options) => {
    let paramsData= options.url.split("?")[1].split("&")
    let params={}
    for(let i=0;i<paramsData.length;i++){
        let arr = paramsData[i].split("=")
        params[arr[0]]=arr[1]
    }
    let moreList = []
    if(params.id||params.consignee||params.phone){
        params.pageSize=1
    }
    for (let i = 0; i < params.pageSize; i++) {
        let newObject =Mock.mock({
                'waresId':Mock.Random.integer(1057544356,2546565650),
                'waresName|1':["面包","灯具","外套","54消毒液","电池","电脑"],
                'waresType|1':[0,1,2,3],
                'deliverType|1':[0,1,2,3,4],
                'unitPrice':Mock.Random.integer(130,250),
                'unitNumber':Mock.Random.integer(100,2000),
                'consignee': "@cname",
                "phone":/^1[34578]\d{9}$/,
                "address":'@county(true)',//随机地址
                'text':Mock.mock('@ctitle'),
                'cancelText':Mock.mock('@ctitle'),
                'unit|1': [0,1,2,3],
                'waresTag|1': [0,1,2],
                'waresSize|1': ["150*200","230*300","450*350","500*500"],
                'status|1':[0,1,2,3,4],
                'orderTime': Mock.Random.integer(params.startTime-10,params.endTime-3),
            })
        newObject.id=params.id?params.id:Mock.Random.integer(10575,25465)
        newObject.accountId=params.accountId?params.accountId:Mock.Random.integer(100,200)
        if(newObject.status!=4){
            newObject.cancelText=undefined;
        }
        if(params.waresType){
            newObject.waresType=params.waresType
        }
        if(params.waresId){
            newObject.waresId=params.waresId
        }
        if(params.phone){
            newObject.phone=params.phone
        }
        if(params.deliverType){
            newObject.deliverType=params.deliverType
        }
        if(params.waresTag){
            newObject.waresTag=params.waresTag
        }
        if(params.status){
            newObject.status=parseInt(params.status)
        }
        moreList.push(newObject)
      }
    dataList=moreList
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:moreList,
            total:params.pageSize==1?1:(2*moreList.length),
        }
    }
})
let orderUpStatus = function (options) {
    let obj = JSON.parse(options.body);
    console.log(123,obj)
    for(let i=0;i<dataList.length;i++){
        for(let j=0;j<obj.id.length;j++){
            if(dataList[i].id==obj.id[j]){
                if(dataList[i].status==3||dataList[i].status==4){
                    return {
                        code: 200,
                        success: false,
                        message: "已完成或已取消的订单不能更改",
                        data: {
                            list:dataList,
                            total:totalNum,
                        }
                    }
                }else if(obj.status==2&&dataList[i].status==2){
                    return {
                        code: 200,
                        success: false,
                        message: "不可以重复提交发货",
                        data: {
                            list:dataList,
                            total:totalNum,
                        }
                    }
                }else if(obj.status==2&&dataList[i].status<=2){
                    dataList[i].status=obj.status
                }else if(obj.status==4){
                    dataList[i].status=obj.status;
                    dataList[i].cancelText=obj.cancelText
                }
            }
        }
    }
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:dataList,
            total:dataList.length==1?1:(2*dataList.length),
        }
    }
}
Mock.mock('localhost:8080/orderList/updata', /get|post/i, listUpdate);
Mock.mock('localhost:8080/orderList/upStatus', /get|post/i, orderUpStatus);

//订单图表数据
Mock.mock('localhost:8080/orderList/orderData', /get|post/i,()=>{
    let rateList=[]
    let rateList2=[]
    let sumList=[[],[],[]]
    let sumList2=[[],[],[]]
    for(let i=0;i<5;i++){
        let data=Mock.Random.integer(50,300)
        let data2=Mock.Random.integer(50,300)
        rateList.push(data)
        rateList2.push(data2)
    }
    for(let j=0;j<3;j++){
        for(let i=0;i<7;i++){
            let data=Mock.Random.integer(50,200)
            let data2=Mock.Random.integer(10000,20000)
            sumList[j].push(data)
            sumList2[j].push(data2)
        }
    }
    
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            sumList,
            sumList2,
            rateList,
            rateList2,
        }
    }
});