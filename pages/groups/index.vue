<template>
    <main>
    <header-menu />
    <b-container>
      <b-row class="mt-3 p-1">
        <b-col v-for="item in groupsList" :key="item.groupId" md="3" class="p-3">
          <b-card-group>
              <b-card bg-variant="dark" text-variant="white" class="text-center" >
                <b-card-header><h6>{{ item.groupName }}</h6></b-card-header>
                <b-card-text> Status: {{ item.isActive }}</b-card-text>
                <b-card-text>{{ item.description }} <br> 
                </b-card-text>
                
                <b-button :to="`/groups/${item.groupId}`">Details</b-button>
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