import { ActionTree, GetterTree, MutationTree } from "vuex/types";
import { namespace } from "vuex-class";
import { ExpenseState } from "./types";

export const state = (): ExpenseState => ({
      modalVisible: false
});

export const getters: GetterTree<ExpenseState, ExpenseState> = {
    /* get_clicked_user: (state: ExpenseState): any => state.clickedUser, */
    get_modal_visible: (state: ExpenseState): boolean => state.modalVisible
}

export const actions: ActionTree<ExpenseState, ExpenseState> = {
    async fetchUser({ commit }, payload) {
        const res = await this.$axios.$get(`${process.env.BASE_URL}/users/finduser/${payload}`);
        commit("SET_CLICKED_USER", res);
    },
    /* async updateUser({commit, state}, payload) {
        const res = await this.$axios.$put(`${process.env.BASE_URL}/users/update/${payload}`, state.clickedUser)
        commit("SET_CLICKED_USER", res);
    } */
}

export const mutations: MutationTree<ExpenseState> = {
    /* SET_CLICKED_USER(state: ExpenseState, data) {
        state.clickedUser = data;
    }, */
    SET_MODAL_VISIBLE(state: ExpenseState, data) {
        state.modalVisible = data;
    },
}

export const userVuexNamespace = namespace("expense/");