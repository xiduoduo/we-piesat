const imageSys = require('../../assets/image/icons/topNavBag1.png');// 海洋卫星遥感应用平台.png
const state = {
    mapUrl: '/tdt', //服务器离线地图地址
    imgUrl: '/provincialImage', //服务器图片地址
    geoserverUrl: '', //geoserver服务器地址
    workingArea: '/geoserver/visual_space/wms',//部署

    // mapUrl: '/bd', //本地离线地图地址 
    // geoserverUrl: '/geoserverUrl', //geoserver本地地址
    // workingArea: '/geoserver/geoserver/wms',//本地

    // systematicName: '海洋卫星遥感应用平台',
    sysImage: imageSys,
}
const mutations = {

}
const actions = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
