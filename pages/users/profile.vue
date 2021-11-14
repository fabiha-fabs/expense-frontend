<template>
    <div>
        <header-menu/>

        <b-row class="mt-1 pt-3">
            <b-col md="3"> 
            </b-col>
            <b-col md="6">
            <b-card style="background-color: #f7f7f7">
                <div class="photo-container clearfix align-items-center">
                    <b-img src="~/assets/images/me.jpg" rounded="circle" alt="Center image" width="200" height="200"/>
                </div>
                <b-span><h3> {{ profile.userName }} </h3></b-span>
                <h6>User ID: {{ $store.state.auth.user.userId }} </h6>
                <b-card-text>
                A super admin user can perform all opertions in this product. 
                And has ability to change this appplication.
                </b-card-text>

                <b-card-text>All information about this user are mentioned below step by step.</b-card-text>

                <h6>Password: <b-span>{{ profile.password }} </b-span> </h6>
                <h6>E-mail ID: {{ profile.emailId }} </h6>
                <h6>Active user?  : {{ $store.state.auth.user.isActive }} </h6>
                <h6>Contact No: {{ profile.contactNo }} </h6>
                <h6>Country: {{ profile.country }} </h6>
                <h6>Created At: {{ $store.state.auth.user.createdAt }} </h6>
                <h6>Last Updated At: {{ $store.state.auth.user.updatedAt }} </h6>
                <h6>Deleted At: {{ $store.state.auth.user.deletedAt }} </h6>
                    <br><br>
             
                    <b-button size="sm" class="mr-2" variant="info"
                        @click="setUserId($store.state.auth.user.userId)" >Edit</b-button>
              
              
               <b-modal 
                    id="modal-no-backdrop"
                    v-model="modalVisible" 
                    hide-backdrop 
                    content-class="shadow" 
                    title="Update User" 
                    hide-footer
                    @hidden="fetchAuthUserInfo">
                <p class="my-2">
                <updated-user :user-id="clickedUserId"></updated-user> 
                </p>
            </b-modal>

            </b-card>
            </b-col>
            <b-col md="3"/>
        </b-row>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import headerMenu from '../../components/common/headerMenu.vue';
import updatedUser from '../../components/auth/updatedUser.vue'

export default Vue.extend({
    components: { headerMenu, updatedUser },
    data() {
        return{
            profile: {
                userName: '',
                password: '',
                emailId: '',
                contactNo: '',
                country: ''
            },
            clickedUserId: null,
        }
    },
    computed: {
        clickedUser: {
      set(value) {
        (this as any).$store.commit("user/SET_CLICKED_USER", value);
      },
      get() {
        return (this as any).$store.getters["user/get_clicked_user"];
      }
    },
      modalVisible: {
            set(value) {
                this.$store.commit("user/SET_MODAL_VISIBLE", value);
            },
            get() {
                return this.$store.getters["user/get_modal_visible"];
            }
        }
    },
    async created() {
      /* console.log(this.$store.state.auth.user.userId);
      await this.$store.dispatch("user/fetchUser", this.$store.state.auth.user.userId).then(() => {
        (this as any).profile = {...(this as any).clickedUser};
        console.log('call profile:: ', (this as any).profile);
      }); */
     await this.fetchAuthUserInfo();
    },
    methods: {
        async fetchAuthUserInfo(){
            console.log(this.$store.state.auth.user.userId);
            await this.$store.dispatch("user/fetchUser", this.$store.state.auth.user.userId).then(() => {
                (this as any).profile = {...(this as any).clickedUser};
                console.log('call profile:: ', (this as any).profile);
            });
        },
        setUserId(uID: Number){
                (this as any).clickedUserId = uID ;
                console.log('call set props method:: ', (this as any).clickedUserId);
                this.modalVisible = true;
                // (this as any).$bvModal.show('modal-no-backdrop');
                
        }
    }
})
</script>