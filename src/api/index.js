//公共的请求方法

import axios from "axios";
import base from "./base";

const api ={
    //定义api时有包含传参的必须添加参数定义，即params，否则req.query.()无法传值
    CreateBinary(params){
        return axios({
            url: base.CreateBinary,
            method: 'post',
            data: params
        })
    },
    QueryBinary(params){
        return axios.get(base.QueryBinary,{params})
    },
    DeleteBinary(params){
        return axios.get(base.DeleteBinary,{params})
    },
    GetFunctions(params){
        return axios.get(base.GetFunctions,{params})
    },
    GetFunctionCode(params){
        return axios.get(base.GetFunctionCode,{params})
    }
    

};

export default api