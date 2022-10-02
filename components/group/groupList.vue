<template>
  <main>
    <b-row>
      <b-col md="8"></b-col>
      <b-col md="4">
        <b-form-input
          v-model="filter.groupName"
          size="sm"
          class="mr-sm-2"
          placeholder="Search by name..."
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-table
        id="db-groups-table"
        class="m-2"
        :fields="fields"
        :items="filteredGroups"
        :per-page="filter.perPage"
        :page-number="filter.pageNumber"
        striped
        bordered
        outlined
        small
        hover
        dark
      >
        <template #cell(isActive)="row">
          <p v-if="`${row.value}` == 'true'">Active</p>
          <p v-else-if="`${row.value}` == 'false'">No</p>
        </template>

        <template #cell(joined)="row">
          <b-link
            v-if="`${row.value}` == 'true'"
            :value="`${row.item.groupId}`"
            size="sm"
            class="mr-2"
            variant="info"
            @click="confirmToLeaveGroup(row.item.groupId, row.item.groupName)"
            >joined</b-link
          >
          <b-link
            v-else-if="`${row.value}` == 'false'"
            :value="`${row.item.groupId}`"
            size="sm"
            class="mr-2"
            variant="info"
            @click="joinGroup(row.item.groupId)"
            >join</b-link
          >
        </template>
      </b-table>
    </b-row>
    <b-row>
      <b-col md="7"></b-col>
      <b-col md="3" class="float-right">
        <b-pagination
          v-model="filter.pageNumber"
          :total-rows="totalfilteredGroupsCount"
          :per-page="filter.perPage"
          aria-controls="db-groups-table"
          size="sm"
          class="float-right"
        >
        </b-pagination>
      </b-col>
      <b-col md="2" class="float-right">
        <b-form-select
          v-model="filter.perPage"
          :options="perPageOptions"
          size="sm"
        >
        </b-form-select>
      </b-col>
    </b-row>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { objectToQueryString } from '../../helper/object.helper'

export default Vue.extend({
  computed: {
    modalVisible: {
      set(value) {
        ;(this as any).$store.commit('group/SET_MODAL_VISIBLE', value)
      },
      get() {
        return (this as any).$store.getters['group/get_modal_visible']
      },
    },
  },
  props: ['groupsList'],
  data() {
    return {
      fields: ['groupId', 'groupName', 'description', 'isActive', 'joined'],
      filter: {
        groupName: '',
        description: '',
        pageNumber: 1,
        perPage: 10,
      },
      perPageOptions: [
        { value: 10, text: '10' },
        { value: 20, text: '20' },
        { value: 50, text: '50' },
        { value: 100, text: '100' },
      ],
      filteredGroups: [],
      totalfilteredGroupsCount: 0,
      addUsersToGroupArr: {
        userIDsArr: [this.$store.state.auth.user.userId],
        groupID: '',
      },
      boxValue: false,
      detachedUsersArr: {
        userIDsArr: [this.$store.state.auth.user.userId],
        groupID: '',
      },
    }
  },
  watch: {
    filter: {
      async handler() {
        await this.filterGroups()
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async filterGroups() {
      await this.$axios
        .$get(
          `${
            process.env.BASE_URL
          }/group/join-or-leave-list?${objectToQueryString(
            (this as any).filter
          )}`
        )
        .then((res) => {
          this.filteredGroups = res.data
          this.totalfilteredGroupsCount = res.count
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async joinGroup(groupId: any) {
      this.addUsersToGroupArr.groupID = groupId
      console.log(this.addUsersToGroupArr)

      await this.$axios
        .$post(
          `${process.env.BASE_URL}/group/addusers`,
          (this as any).addUsersToGroupArr
        )
        .then(async (res) => {
          console.log(res)
          ;(this as any).toastMessage(
            'success',
            'Joined to this group has been successful..'
          )
          this.modalVisible = false
          //await this.$store.dispatch('group/fetchGroup', groupId)
          await this.filterGroups()
        })
        .catch((error) => {
          console.log(error)
          ;(this as any).toastMessage('danger', 'Failed to join this group')
        })
    },
    toastMessage(v: string, msg: string) {
      ;(this as any).$bvToast.toast(msg, {
        title: `Action`,
        variant: v,
        solid: true,
      })
    },
    confirmToLeaveGroup(groupId: any, groupName: string) {
      ;(this as any).$bvModal
        .msgBoxConfirm('Want to leave this group ' + groupName, {
          class: 'leaveGroupID',
          title: 'Please Confirm',
          size: 'sm',
          textColor: 'white',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then(async (value: boolean) => {
          this.boxValue = value
          console.log(value)
          if (value == true) {
            this.detachedUsersFromGroup(groupId, groupName)
          } else return
        })
        .catch((err: any) => {
          console.log(err)
        })
    },
    async detachedUsersFromGroup(groupId: any, groupName: string) {
      ;(this as any).detachedUsersArr.groupID = groupId
      console.log((this as any).detachedUsersArr.groupID)
      await this.$axios
        .$post(
          `${process.env.BASE_URL}/group/detachedusers`,
          (this as any).detachedUsersArr
        )
        .then(async (res) => {
          console.log(res)
          ;(this as any).toastMessage(
            'success',
            'Left group ' + groupName + ' successfully..'
          )
          await this.filterGroups()
        })
        .catch((error) => {
          console.log(error)
          ;(this as any).toastMessage('danger', 'Failed to leave group')
        })
    },
  },
})
</script>
<style lang="scss" scoped>
.table-dark {
  color: #fff;
  background-color: #3c0a05;
}
.table-dark th,
.table-dark td,
.table-dark thead th {
  border-color: #5b6064;
}
.btn-info {
  color: #fff;
  background-color: #02252a;
  border-color: #5b6064;
}
.text-dark {
  color: #f3f9ff !important;
}
.body-text-variant {
  color: #f3f9ff;
}
</style>