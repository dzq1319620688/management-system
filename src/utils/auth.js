function getToken(){
    let data=sessionStorage.getItem("account")
    if(data){
        return JSON.parse(data).token
    }
    return
}

function getNickname(){
    let data=sessionStorage.getItem("account")
    if(data){
        return JSON.parse(data).nickname
    }
    return
}

function getId(){
    let data=sessionStorage.getItem("account")
    if(data){
        return JSON.parse(data).id
    }
    return
}

function setAccount(data){
    sessionStorage.setItem("account",JSON.stringify(data))
}

function removeAccount(){
    sessionStorage.removeItem("account")
}

export {getToken,setAccount,removeAccount,getNickname,getId}