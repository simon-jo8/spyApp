import { createStore } from 'vuex';

export default createStore({
    state: {
        isActive: false,
    },
    mutations: {
        setIsActive(state, value) {
        state.isActive = value;
        },
    },
    actions: {
        setIsActive({ commit }, value) {
        commit('setIsActive', value);
        },
    },
});