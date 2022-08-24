const state = {
    drawRectangleFlag: false,
    drawCoordinate: [],
    clearDraw: false,
}
const mutations = {
    //绘制矩形状态
    updateDrawRectangle(state, n) {
        state.drawRectangleFlag = n;
    },
    //绘制坐标
    updatedDrawCoordinate(state, tailorCoordinate) {
        state.drawCoordinate = tailorCoordinate;
    },
    //清除绘制图层
    updatedClearDraw(state, n) {
        state.clearDraw = n;
    },
}
const actions = {
    updateDrawRectangle({ commit }, n) {
        commit('updateDrawRectangle', n)
    },
    updatedDrawCoordinate({ commit }, n) {
        commit('updatedDrawCoordinate', n)
    },
    updatedClearDraw({ commit }, n) {
        commit('updatedClearDraw', n)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}