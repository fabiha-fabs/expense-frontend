<template>
  <main>
    <b-navbar toggleable="lg" type="dark" class="py-4 header">
      <b-navbar-brand href="#"
        >Expense System
        <small
          >({{ $store.state.auth.user.userId }}-{{
            $store.state.auth.user.userName
          }})</small
        ></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click.prevent="goHome()">
            <b-avatar
              variant="secondary"
              src="~assets/images/home.png"
              size="sm"
            />
            Home</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav class="align-items-center">
          <b-avatar
            variant="secondary"
            src="~assets/images/iconmenugroup.png"
            size="sm"
          />
          <b-nav-item-dropdown text="Groups">
            <b-dropdown-item
              @click.prevent="goCreateGroup()"
              style="border: 1px 0 0 0 solid #3c0a05"
            >
              <b-avatar
                variant="secondary"
                src="~assets/images/creategroup.png"
                size="sm"
              />
              Create Group</b-dropdown-item
            >
            <b-dropdown-item
              @click.prevent="goHome()"
              style="border: 1px 0 0 0 solid #3c0a05"
              ><b-avatar
                variant="secondary"
                src="~assets/images/grouplist.png"
                size="sm"
              />
              Groups List</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="align-items-center">
          <b-avatar
            variant="secondary"
            src="~assets/images/iconuser.png"
            size="sm"
          />
          <b-nav-item-dropdown>
            <template #button-content> User </template>
            <b-dropdown-item
              @click.prevent="goProfile()"
              style="border: 1px 0 0 0 solid #3c0a05"
            >
              <b-avatar
                variant="secondary"
                src="~assets/images/profile.png"
                size="sm"
              />
              Profile</b-dropdown-item
            >
            <b-dropdown-item
              @click.prevent="goUsersList()"
              style="border: 1px 0 0 0 solid #3c0a05"
            >
              <b-avatar
                variant="secondary"
                src="~assets/images/userlist.png"
                size="sm"
              />

              List of User(s)</b-dropdown-item
            >
            <b-dropdown-item
              @click.prevent="logout"
              style="border: 1px 0 0 0 solid #3c0a05"
            >
              <b-avatar
                variant="secondary"
                src="~assets/images/signout.png"
                size="sm"
              />
              Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form v-if="this.$route.name == 'groups'">
            <b-form-input
              v-if="this.$route.name == 'groups' && this.groupsFilter"
              v-model="groupsFilter.groupName"
              size="sm"
              class="mr-sm-2"
              placeholder="Search Groups..."
            ></b-form-input>
            <b-button
              v-b-modal.modal-tall-allgroups
              size="sm"
              class="my-2 my-sm-0"
              >Join New</b-button
            >
          </b-nav-form>
          <b-nav-form>
            <b-button
              size="sm"
              class="my-2 my-sm-1 ml-2"
              variant="danger"
              @click.prevent="logout"
              >Log out</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal
      id="modal-tall-allgroups"
      title="Search Group(s) To Join or Leave"
      content-class="shadow"
      size="lg"
      centered
      hide-footer
    >
      <group-list :groups-list="groupsList" />
    </b-modal>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['groupsFilter'],
  data() {
    return {
      groupsList: [],
    }
  },
  created() {
    this.getGroupsAll()
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    goProfile() {
      this.$router.push('/users/profile')
    },
    goHome() {
      this.$router.push('/groups')
    },
    goUsersList() {
      this.$router.push('/users/usersList')
    },
    goCreateGroup() {
      this.$router.push('/groups/createGroup')
    },
    async getGroupsAll() {
      await this.$axios
        .$get(`${process.env.BASE_URL}/group/groupall`)
        .then((res) => {
          this.groupsList = res
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
})
</script>
<style lang="scss">
.header {
  background-color: #3c0a05;
}
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
  background-color: #1a4350 !important;
  color: #dee2e6;
}
.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #0b1b26 !important;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}
</style>