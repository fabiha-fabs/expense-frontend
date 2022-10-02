import { ActionTree, GetterTree, MutationTree } from "vuex/types";
import { namespace } from "vuex-class";
import { GroupState } from "./types";

export const state = (): GroupState => ({
    groupsArray: {
        groupName: '',
        description: '',
        isActive: '',
    },
    totalCost: 0,
    groupInfos: [],
    modalVisible: false,
});

export const getters: GetterTree<GroupState, GroupState> = {
    get_clicked_user: (state: GroupState): any => state.groupsArray,
    get_total_cost: (state: GroupState): number => state.totalCost,
    get_group_infos: (state: GroupState): any[] => state.groupInfos,
    get_modal_visible: (state: GroupState): boolean => state.modalVisible
}

export const actions: ActionTree<GroupState, GroupState> = {
    async fetchGroup({ commit }, payload) {
        const res = await this.$axios.$get(`${process.env.BASE_URL}/group/findgroup/${payload}`);
        commit("SET_GROUP_INFOS", res);
    },
    /* async updateUser({commit, state}, payload) {
        const res = await this.$axios.$put(`${process.env.BASE_URL}/users/update/${payload}`, state.groupsArray)
        commit("SET_CLICKED_USER", res);
    } */
    async fetchTotalCost({ commit }, payload) {
        const res = await this.$axios.$get(`${process.env.BASE_URL}/group/calculate-total-cost/${payload}`);
        commit("SET_TOTAL_COST", res);
    }
}

export const mutations: MutationTree<GroupState> = {
    SET_GROUP_INFOS(state: GroupState, data) {
        state.groupInfos = data;
    },
    SET_TOTAL_COST(state: GroupState, data) {
        state.totalCost = data;
    },
    SET_MODAL_VISIBLE(state: GroupState, data) {
        state.modalVisible = data;
    },
}

export const userVuexNamespace = namespace("group/");