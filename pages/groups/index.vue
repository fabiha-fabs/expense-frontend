<template>
    <main>
    <header-menu />
    <b-container>
      <b-row class="mt-3 p-1">
        <b-col v-for="item in groupsList" :key="item.groupId" md="3" class="p-3">
          <b-card-group>
              <b-card text-variant="white" class="groups-card text-center shadow mb-5" >
                <b-card-header class="groups-card-header"><h6>{{ item.groupName }}</h6></b-card-header>
                <b-avatar variant="info" src="~assets/images/icongroups.png" class="mr-2"/>
                <b-card-text> Status: {{ item.isActive }}</b-card-text>
                <b-card-text>{{ item.description }} <br> 
                </b-card-text>
                <b-button :to="`/groups/edit/${item.groupId}`" variant="danger" size="sm">Edit</b-button>
                <b-button :to="`/groups/${item.groupId}`"  size="sm" variant="success">View</b-button>
              </b-card>
          </b-card-group>
        </b-col>
        <b-col md="3"></b-col>
        <b-col md="3"></b-col>
        <b-col md="3"></b-col>
      </b-row>
    </b-container>
    </main>
</template>

<script lang="ts">
import Vue from 'vue'
import headerMenu from '../../components/common/headerMenu.vue';
export default Vue.extend({
    components: { headerMenu },
    data() {
      return {
        groupsList: [],
      }
    },
    async created(){
        await this.getGroupsAll();
    },
    methods: {
      logout() {
        this.$auth.logout();
      },
      goProfile(){
        this.$router.push("/users/profile");
      },
      async getGroupsAll(){
            await this.$axios.$get(`${process.env.BASE_URL}/group/groupall`)
            .then((res) => {
                 this.groupsList = res;
                 console.log(res);
                })
            .catch((error) => {
                console.log(error);
            });
        },
    }
})
</script>
<style lang="scss" scoped>
.groups-card {
  background-color: #3C0A05;
}
.groups-card-header {
  background-color: #052f3d;
}
</style>