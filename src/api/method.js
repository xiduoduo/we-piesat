import request from "@/utils/request"
import base from "./base"
//提交生产

export function oceanMonitor(taskType, metadataId, taskName) {
    const data = {
        taskType,
        metadataId,
        taskName,
    }
    return request({
        url: base.baseUrl + base.addList,
        method: 'post',
        data: data
    })
}

export function listByTypes(query) {
    return request({
        url: base.baseUrl + '/zj_ocean/oceanMonitor/SatelliteImage/listByTypes',
        method: 'get',
        params: query
    })
}

export function checkUnDataStatus(query) {
    return request({
        url: base.baseUrl + '/zj_ocean/oceanMonitor/productionTask/checkUnDataStatus',
        method: 'get',
        params: query
    })
}

//海岛变化
export function getFlowStatus(query) {
    return request({
        url: base.baseUrl + '/zj_ocean/oceanMonitor/productionTask/getFlowStatus',
        method: 'get',
        params: query
    })
}

//防灾减灾
export function getFzjzFlowStatus(query) {
    return request({
        url: base.baseUrl + '/zj_ocean/oceanMonitor/productionTask/getFzjzFlowStatus',
        method: 'get',
        params: query
    })
}

//算法结果
export function getVisualList(query) {
    return request({
        url: base.baseUrl + base.getVisualList,
        method: 'get',
        params: query
    })
}