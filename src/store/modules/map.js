const state = {
    patternState: true, //默认为cesium   可以切换leaflet
    baseMap: "",//地图底图切换
    screenData: {},//分屏数据
    curtainState: false,//拉帘状态
    curtainLayers: null,//拉帘图层
    // curtainLayers: 'geoserver:H2B_OPER_SST_L4A_FU_01D_20200320_dps',//拉帘图层
}
const mutations = {
    //切换cesium 和 leaflet
    SET_PATTERNSTATE(state, n) {
        state.patternState = n;
    },
    SET_BASEMAO(state, n) {
        state.baseMap = n;
    },
    SET_SCREENDATA(state, n) {
        state.screenData = n;
    },
    SET_CURTAINSTATE(state, n) {
        state.curtainState = n;
    },
    SET_CURTAINLAYERS(state, n) {
        state.curtainLayers = n;
    },
}
const actions = {
    setPatternState({ commit }, n) {
        commit('SET_PATTERNSTATE', n)
    },
    setBaseMap({ commit }, n) {
        commit('SET_BASEMAO', n)
    },
    setScreenData({ commit }, n) {
        commit('SET_SCREENDATA', n)
    },
    setCurtainState({ commit }, n) {
        commit('SET_CURTAINSTATE', n)
    },
    setCurtainLayers({ commit }, n) {
        commit('SET_CURTAINLAYERS', n)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}