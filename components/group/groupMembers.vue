<template>
  <Main>
    <b-row>
      <div class="accordion m-2" role="tablist">
        <b-card no-body class="mb-3">
          <b-row>
            <b-col md="2" class="m-2">
              <b-button
                v-b-toggle.accordion-1
                block
                variant="info"
                class="font-weight-bold"
                size="sm"
              >
                Filter
              </b-button>
            </b-col>
          </b-row>
          <b-collapse
            id="accordion-1"
            visible
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-form>
              <b-row class="p-2">
                <b-col md="3">
                  <label>Username</label>
                  <b-form-input
                    v-model="filter.userName"
                    size="sm"
                    type="text"
                  />
                </b-col>
                <b-col md="3">
                  <label>E-mail</label>
                  <b-form-input
                    v-model="filter.emailId"
                    size="sm"
                    type="text"
                  />
                </b-col>
                <b-col md="3">
                  <label>Contact No</label>
                  <b-form-input
                    v-model="filter.contactNo"
                    size="sm"
                    type="text"
                  />
                </b-col>
                <b-col md="3">
                  <label>Country </label>
                  <b-form-input
                    v-model="filter.country"
                    size="sm"
                    type="text"
                  />
                </b-col>
              </b-row>
            </b-form>
          </b-collapse>
        </b-card>
      </div>
    </b-row>
    <b-row>
      <b-table
        id="db-users-table"
        class="m-2"
        :fields="fields"
        :items="usersAll"
        :per-page="filter.perPage"
        :current-page="filter.currentPage"
        striped
        bordered
        outlined
        small
        hover
        dark
      >
        <template #cell(add)="row">
          <b-form-checkbox
            :value="`${row.item.userId}`"
            size="sm"
            class="mr-2"
            variant="info"
            @change="toggleAll"
          ></b-form-checkbox>
        </template>
      </b-table>
    </b-row>
    <b-row class="float-right m-2">
      <b-button
        variant="info"
        class="m-1"
        size="sm"
        @click="addUsersToCurrentGroup()"
        >Add</b-button
      >
      <b-button
        variant="info"
        class="m-1"
        size="sm"
        @click="modalVisible = false"
        >Close</b-button
      >
    </b-row>
    <b-row>
      <b-col md="5"></b-col>
      <b-col md="3" class="float-left">
        <b-pagination
          v-model="filter.currentPage"
          :total-rows="items.length"
          :per-page="filter.perPage"
          aria-controls="users-table"
          size="sm"
          class="float-left"
        >
        </b-pagination>
      </b-col>
      <b-col md="1" class="float-left">
        <b-form-select
          v-model="filter.perPage"
          :options="perPageOptions"
          size="sm"
        >
        </b-form-select>
      </b-col>
    </b-row>
  </Main>
</template>
<script lang="ts">
import Vue from 'vue'
import { objectToQueryString } from '../../helper/object.helper'

export default Vue.extend({
  components: {},
  props: ['groupInfos', 'groupId'],
  data() {
    return {
      fields: [
        'userId',
        'userName',
        'emailId',
        'contactNo',
        'country',
        'isActive',
        'Add',
      ],
      items: [],
      usersAll: [],
      addUsersToGroupArr: {
        userIDsArr: [],
        groupID: '',
      },
      filter: {
        userName: '',
        emailId: '',
        contactNo: '',
        country: '',
        currentPage: 1,
        perPage: 10,
      },
      perPageOptions: [
        { value: 10, text: '10' },
        { value: 20, text: '20' },
        { value: 50, text: '50' },
        { value: 100, text: '100' },
      ],
    }
  },
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
  watch: {
    filter: {
      async handler() {
        await this.filterUsers()
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    //console.log('group members :: ', this.groupInfos.users)
    this.fetchAllUsersFromDB()
  },
  methods: {
    async fetchAllUsersFromDB() {
      await this.$axios
        .$get(`${process.env.BASE_URL}/users/userall`)
        .then((res) => {
          ;(this as any).usersAll = res
          console.log(res)
        })
    },
    toggleAll(checked: any) {
      ;(this as any).addUsersToGroupArr.userIDsArr.push(checked)
      console.log(
        'userIDsArr=',
        checked,
        this.addUsersToGroupArr.userIDsArr.length
      )
      console.log('userIDsArr=', this.addUsersToGroupArr.userIDsArr)
    },

    async addUsersToCurrentGroup() {
      this.addUsersToGroupArr.groupID = this.groupId
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
            'Added user(s) has been successful..'
          )
          this.modalVisible = false
          await this.$store.dispatch('group/fetchGroup', this.$route.params.id)
        })
        .catch((error) => {
          console.log(error)
          ;(this as any).toastMessage(
            'danger',
            'Failed to add user(s) to group'
          )
        })
    },
    toastMessage(v: string, msg: string) {
      ;(this as any).$bvToast.toast(msg, {
        title: `Action`,
        variant: v,
        solid: true,
      })
    },
    async filterUsers() {
      await this.$axios
        .$get(
          `${process.env.BASE_URL}/users/filter?${objectToQueryString(
            (this as any).filter
          )}`
        )
        .then((res) => {
          this.usersAll = res
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
})
</script>