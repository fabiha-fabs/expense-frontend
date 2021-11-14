import { ActionTree, GetterTree, MutationTree } from "vuex/types";
import { namespace } from "vuex-class";
import { ExpenseState } from "./types";

export const state = (): ExpenseState => ({
      modalVisible: false,
      clickedExpense: {
        expenseName: '',
        description: '',
        amount: 0
      },
});

export const getters: GetterTree<ExpenseState, ExpenseState> = {
    get_clicked_expense: (state: ExpenseState): any => state.clickedExpense,
    get_modal_visible: (state: ExpenseState): boolean => state.modalVisible
}

export const actions: ActionTree<ExpenseState, ExpenseState> = {
    async fetchExpense({ commit }, payload) {
        const res = await this.$axios.$get(`${process.env.BASE_URL}/expense/findexpense/${payload}`);
        commit("SET_CLICKED_EXPENSE", res);
    },
    async updateExpense({commit, state}, payload) {
        const res = await this.$axios.$put(`${process.env.BASE_URL}/expense/update/${payload}`, state.clickedExpense)
        commit("SET_CLICKED_EXPENSE", res);
    }
}

export const mutations: MutationTree<ExpenseState> = {
    SET_CLICKED_EXPENSE(state: ExpenseState, data) {
        state.clickedExpense = data;
    },
    SET_MODAL_VISIBLE(state: ExpenseState, data) {
        state.modalVisible = data;
    },
}

export const userVuexNamespace = namespace("expense/");