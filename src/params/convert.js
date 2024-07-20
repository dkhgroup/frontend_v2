export function convertPopulateParams(params){
    let param = ""

    for(let i = 0; i < params.length; i++){
        param += `populate[${i}]=${params[i]}${i < params.length - 1 ? "&" : ""}`
    }

    return param
}