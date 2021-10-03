<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="py-4">
      <b-navbar-brand href="#">Expense System</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click.prevent="goHome()">Home</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Groups</b-nav-item> -->
          <b-nav-item-dropdown text="Groups">
            <b-dropdown-item @click.prevent="goCreateGroup()">Create Group</b-dropdown-item>
            <b-dropdown-item @click.prevent="goHome()">Groups List</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav>
        <b-nav-item-dropdown text="Lang">
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              User
            </template>
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
            <b-button size="sm" class="my-2 my-sm-1 ml-2" @click.prevent="logout">Log out</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
  </b-navbar>
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