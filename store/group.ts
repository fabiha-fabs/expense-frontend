import { ActionTree, GetterTree, MutationTree } from "vuex/types";
import { namespace } from "vuex-class";
import { GroupState } from "./types";

export const state = (): GroupState => ({
    groupsArray: {
        groupName: '',
        description: '',
        isActive: '',
    }
});

export const getters: GetterTree<GroupState, GroupState> = {
    get_clicked_user: (state: GroupState): any => state.groupsArray
}

export const actions: ActionTree<GroupState, GroupState> = {
    async fetchUser({ commit }, payload) {
        const res = await this.$axios.$get(`${process.env.BASE_URL}/users/finduser/${payload}`);
        commit("SET_CLICKED_USER", res);
    },
    /* async updateUser({commit, state}, payload) {
        const res = await this.$axios.$put(`${process.env.BASE_URL}/users/update/${payload}`, state.groupsArray)
        commit("SET_CLICKED_USER", res);
    } */
}

export const mutations: MutationTree<GroupState> = {
    SET_CLICKED_USER(state: GroupState, data) {
        state.groupsArray = data;
    }
   /*  SET_MODAL_VISIBLE(state: GroupState, data) {
        state.modalVisible = data;
    }, */
}

export const userVuexNamespace = namespace("group/");