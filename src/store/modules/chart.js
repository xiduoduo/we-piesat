const state = {
    chartTitle:'',
}
const mutations = {
    SET_CHARTTITLE(state, n) {
        state.chartTitle = n;
    },
}
const actions = {
    setChartTitle({ commit }, n) {
        commit('SET_CHARTTITLE', n)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}