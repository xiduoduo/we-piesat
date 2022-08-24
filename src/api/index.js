import request from '@/utils/request'
import base from "./base"
import qs from "qs"

const api = {
    // 查询列表
    listSeach(data) {
        return request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: base.baseUrl + base.listSeach,
            method: 'post',
            data: qs.stringify(data)
        })
    },
    //获取json
    getJson(url) {
        return request({
            url: url,
            method: 'get',
        })
    },
    // 查询结果列表查询
    listByTypes(data) {
        return request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: base.baseUrl + base.listByTypes,
            method: 'post',
            data: qs.stringify(data)
        })
    },
}
export default api;