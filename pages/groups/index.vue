<template>
  <main>
    <header-menu :groups-filter="filter" />
    <b-container>
      <b-row class="mt-3 p-1">
        <b-col
          v-for="item in groupsList"
          :key="item.groupId"
          md="3"
          class="p-3"
        >
          <b-card-group id="groups-card-id">
            <b-card
              text-variant="white"
              class="groups-card text-center shadow mb-5"
            >
              <b-card-header class="groups-card-header border p-2"
                ><h6>{{ item.groupName }}</h6></b-card-header
              >
              <b-avatar
                variant="info"
                src="~assets/images/icongroups.png"
                class="mr-2 mt-2"
              />
              <b-card-text v-if="`${item.isActive}` == 'true'"
                >Status: Active
              </b-card-text>
              <b-card-text v-else-if="`${item.isActive}` == 'false'"
                >Status: Not Active
              </b-card-text>
              <b-card-text>{{ item.description }} <br /> </b-card-text>
              <b-button
                :to="`/groups/edit/${item.groupId}`"
                variant="danger"
                size="sm"
                >Edit</b-button
              >
              <b-button
                :to="`/groups/${item.groupId}`"
                size="sm"
                variant="success"
                >View</b-button
              >
            </b-card>
          </b-card-group>
        </b-col>
        <b-col md="3"></b-col>
        <b-col md="3"></b-col>
        <b-col md="3"></b-col>
      </b-row>
      <b-row>
        <b-col md="8"></b-col>
        <b-col md="3" class="float-right">
          <b-pagination
            v-model="filter.pageNumber"
            :total-rows="totalGroupCount"
            :per-page="filter.perPage"
            aria-controls="groups-card-id"
            size="sm"
            class="float-right"
          >
          </b-pagination>
        </b-col>
        <b-col md="1" class="float-right">
          <b-form-select
            v-model="filter.perPage"
            :options="perPageOptions"
            size="sm"
          >
          </b-form-select>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import headerMenu from '../../components/common/headerMenu.vue'
import { objectToQueryString } from '../../helper/object.helper'
export default Vue.extend({
  components: { headerMenu },
  data() {
    return {
      groupsList: [],
      totalGroupCount: 0,
      filter: {
        groupName: '',
        pageNumber: 1,
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
  async created() {
    await this.filterGroups()
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
    logout() {
      this.$auth.logout()
    },
    goProfile() {
      this.$router.push('/users/profile')
    },
    /* async getGroupsAll() {
      await this.$axios
        .$get(`${process.env.BASE_URL}/group/groupall`)
        .then((res) => {
          this.groupsList = res
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }, */
    async filterGroups() {
      await this.$axios
        .$get(
          `${process.env.BASE_URL}/group/joined-groups?${objectToQueryString(
            (this as any).filter
          )}`
        )
        .then((res) => {
          this.groupsList = res.data
          this.totalGroupCount = res.count
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async filterGroups1() {
      await this.$axios
        .$get(
          `${process.env.BASE_URL}/group/filtergroup?${objectToQueryString(
            (this as any).filter
          )}`
        )
        .then((res) => {
          this.groupsList = res.data
          this.totalGroupCount = res.count
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
})
</script>
<style lang="scss" scoped>
.groups-card {
  background-color: #3c0a05;
}
.groups-card-header {
  background-color: #052f3d;
}
</style>