// import { of } from "core-js/core/array";
import Mock from "mockjs";
//登录接口
Mock.mock("localhost:8080/login", "post", (req) => {
    const {
        username,
        password
    } = JSON.parse(req.body);
    if (username == 'dzq' && password == 123456) {
        return {
            code: 200,
            success: true,
            data:{
                nickname: '董志强',
                token: '31hgfhgf45hjghf4',
                id:"1001",
                message: '登录成功'
            }
        }
    } else {
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
                name: "业务人员",
                icon: "el-icon-phone-outline",
                url: "/account/all",
                meta:{bread:['账户管理','业务人员']}
            },
            {
                name: "管理员",
                icon: "el-icon-s-custom",
                url: "/account/manage",
                meta:{bread:['账户管理','管理员']}
            }
        ]
    },
    {
        name: "产品管理",
        icon: "el-icon-menu",
        url: "/product",
        children: [{
                name: "产品运营",
                icon: "el-icon-notebook-2",
                url: "/product/all",
                meta:{bread:['产品管理','产品运营']}
            },
            {
                name: "结算数据",
                icon: "el-icon-money",
                url: "/product/balance",
                meta:{bread:['产品管理','结算数据']}
            },
        ]
    },
    {
        name: "业务管理",
        icon: "el-icon-user",
        url: "/business",
        children: [{
                name: "业务信息",
                icon: "el-icon-bank-card",
                url: "/business/index",
                meta:{bread:['业务管理','结算数据']}
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
            data: menuList1
        }
    }
});

//图表
Mock.mock('localhost:8080/load', 'post', () => {
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            xdata: ['20.01', '20.02', '20.03', '20.04', '20.05', '20.06', '20.07'],
            ydata: [25, 80, 60, 50, 60, 30, 20]
        }
    }
});

//所有人员
Mock.mock(RegExp('localhost:8080/account/all' + '.*'), 'get', options => {
    let paramsData= options.url.split("?")[1].split("&")
    let params={}
    for(let i=0;i<paramsData.length;i++){
        let arr = paramsData[i].split("=")
        params[arr[0]]=arr[1]
    }
    let moreList = []
    for (let i = 0; i < params.pageSize; i++) {
        let newObject =Mock.mock({
                    'name': "@cname",
                    'character|1': [1,2],
                    'remark|5-20': '@cword',
                    'createTime': Mock.Random.date(),
                    'num': Mock.Random.integer(30,200),
                    "totalAmount":Mock.Random.integer(10000000,500000000),
                    "continued":Mock.Random.integer(10000000,500000000),
            })
        newObject.account=100000+i
        moreList.push(newObject)
      }
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:moreList,
            total:100,
        }
    }
})
Mock.mock(RegExp('localhost:8080/account/one' + '.*'), 'get', options => {
    let params=JSON.parse(options.body).id
    let newObject =Mock.mock({
                    'name': "@cname",
                    "id":params,
                    'character|1': [1,2],
                    'remark|5-20': '@cword',
                    'createTime': Mock.Random.date(),
                    'num': Mock.Random.integer(30,200),
                    "totalAmount":Mock.Random.integer(10000000,500000000),
                    "continued":Mock.Random.integer(10000000,500000000),
    })
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            ...newObject,
        }
    }
})
//产品管理--全部产品   
Mock.mock(RegExp('localhost:8080/productList' + '.*'), 'get', (options) => {
    // const { password, username } = JSON.parse(req.body)
    let paramsData= options.url.split("?")[1].split("&")
    let params={}
    for(let i=0;i<paramsData.length;i++){
        let arr = paramsData[i].split("=")
        params[arr[0]]=arr[1]
    }
    let moreList = []
    for (let i = 0; i < params.pageSize; i++) {
        let newObject =Mock.mock({
                'type|1': [0,1,2],
                'productName|1':["巴贝拉贷款123","麦穗金融213","日借款123","爱猫借贷23","樱花分期34","小熊金融54","借乐花45","星星钱袋45"],
                'companyName|1':["巴贝拉贷款","麦穗金融","日借款","爱猫借贷","樱花分期","小熊金融","借乐花","星星钱袋"],
                'limit|1': [100,200,300],
                'name': "@cname",
                'productDetail': Mock.mock('@ctitle'),
                'rate|1':[4.1,4.3,3.8,3.9,5,3] ,
                'money':Mock.Random.integer(30,200),
                'number':Mock.Random.integer(30,200),
                'profit': Mock.Random.integer(10000000,500000000),
                'average': Mock.Random.integer(10000000,250000000),
                'date|1':[1,2,3,4],
                'createdate':Mock.Random.date(),
            })
        newObject.id=1+i
        moreList.push(newObject)
      }
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:moreList,
            total:100,
        }
    }
})
Mock.mock(RegExp('localhost:8080/balanceList' + '.*'), 'get', (options) => {
    // const { password, username } = JSON.parse(req.body)
    let paramsData= options.url.split("?")[1].split("&")
    let params={}
    for(let i=0;i<paramsData.length;i++){
        let arr = paramsData[i].split("=")
        params[arr[0]]=arr[1]
    }
    let moreList = []
    for (let i = 0; i < params.pageSize; i++) {
        let newObject =Mock.mock({
                'type|1': [0,1,2],
                'productName|1':["巴贝拉贷款123","麦穗金融213","日借款123","爱猫借贷23","樱花分期34","小熊金融54","借乐花45","星星钱袋45"],
                'companyName|1':["巴贝拉贷款","麦穗金融","日借款","爱猫借贷","樱花分期","小熊金融","借乐花","星星钱袋"],
                'limit|1': [100,200,300],
                'name': "@cname",
                'productDetail': Mock.mock('@ctitle'),
                'rate|1':[4.1,4.3,3.8,3.9,5,3] ,
                'money':Mock.Random.integer(30,200),
                'number':Mock.Random.integer(30,200),
                'profit': Mock.Random.integer(10000000,500000000),
                'date|1':[1,2,3,4],
                'createdate':Mock.Random.date(),
                'endDate':Mock.Random.date(),
                'status|1':[0,1,2,3],
                'realityProfit':Mock.Random.integer(10000000,250000000),
                'text':Mock.mock('@ctitle'),
            })
        newObject.id=1+i
        moreList.push(newObject)
      }
    return {
        code: 200,
        success: true,
        message: "成功",
        data: {
            list:moreList,
            total:100,
        }
    }
})