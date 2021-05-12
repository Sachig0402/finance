import service from "@/utils/service"
export function get(url, params) {
    //配置,有method和url两个属性
    const config = {
        method: "get",
        url: url
    }
    //如果有参数的话,给config加一个config属性,把参数放入params属性中(规定了用get请求就要放入params属性中)
    if (params) {
        config.params = params;//!get请求要把params放在config的params里，这是文档里的规定
    }
    return service(config); //调用service函数
}

export function post(url, params) {
    //配置,有method和url两个属性
    const config = {
        method: "post",
        url: url
    }
    //!如果有参数的话,给config加一个data属性,把参数放入data属性中(规定了用post请求就要放入data属性中)
    if (params) {
        config.data = params;//!post请求要把params放在config的data里，这是规定
    }
    return service(config); //调用service函数
}