import { ActionTree, GetterTree, MutationTree } from "vuex/types";
import { namespace } from "vuex-class";
import { UserState, } from "./types";

export const state = (): UserState => ({
    clickedUser: {
        userName: '',
        password: '',
        emailId: '',
        contactNo: '',
        country: '',
    },
    modalVisible: false,
});

export const getters: GetterTree<UserState, UserState> = {
    get_clicked_user: (state: UserState): any => state.clickedUser,
    get_modal_visible: (state: UserState): boolean => state.modalVisible,
}

export const actions: ActionTree<UserState, UserState> = {
    async fetchUser({ commit }, payload) {
        const res = await this.$axios.$get(`${process.env.BASE_URL}/users/finduser/${payload}`);
        commit("SET_CLICKED_USER", res);
    },
    async updateUser({commit, state}, payload) {
        const res = await this.$axios.$put(`${process.env.BASE_URL}/users/update/${payload}`, state.clickedUser)
        commit("SET_CLICKED_USER", res);
    }
}

export const mutations: MutationTree<UserState> = {
    SET_CLICKED_USER(state: UserState, data) {
        state.clickedUser = data;
    },
    SET_MODAL_VISIBLE(state: UserState, data) {
        state.modalVisible = data;
    },
}

export const userVuexNamespace = namespace("user/");