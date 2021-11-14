<template>
<main>
    <b-navbar toggleable="lg" type="dark" class="py-4 header">
      <b-navbar-brand href="#">Expense System</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click.prevent="goHome()">
          <b-avatar variant="secondary" src="~assets/images/home.png" size="sm" /> Home</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="align-items-center">
          <b-avatar variant="secondary" src="~assets/images/iconmenugroup.png" size="sm" />
          <b-nav-item-dropdown text="Groups">
            <b-dropdown-item @click.prevent="goCreateGroup()">Create Group</b-dropdown-item>
            <b-dropdown-item @click.prevent="goHome()">Groups List</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="align-items-center">
          <b-avatar variant="secondary" src="~assets/images/iconuser.png" size="sm" />
          <b-nav-item-dropdown>
            <template #button-content> User </template>
            <b-dropdown-item @click.prevent="goProfile()">Profile</b-dropdown-item>
            <b-dropdown-item @click.prevent="goUsersList()">List of User(s)</b-dropdown-item>
            <b-dropdown-item @click.prevent="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            <b-button size="sm" class="my-2 my-sm-1 ml-2" variant="danger" @click.prevent="logout">Log out</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
  </b-navbar>
</main>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    methods: {
      logout() {
        this.$auth.logout();
      },
      goProfile(){
        this.$router.push("/users/profile");
      },
      goHome(){
        this.$router.push("/groups");
      },
      goUsersList(){
        this.$router.push("/users/usersList");
      },
      goCreateGroup(){
        this.$router.push("/groups/createGroup");
      }
    }
})
</script>
<style lang="scss">
.header {
   background-color: #3C0A05;
} 
</style>