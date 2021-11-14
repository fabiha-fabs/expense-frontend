<template>
    <main>
        <header-menu />
        <b-container>
        <b-row class="mt-5">
            <b-col md="12">
                <div class="accordion" role="tablist" >
                    <b-card no-body class="mb-3" style="background-color: #f7f7f7">
                    <b-row>
                        <b-col md="2"  class="m-2">
                            <b-button v-b-toggle.accordion-1 block  variant="info" class="font-weight-bold" size="sm">
                                Filter
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                        <b-form>
                            <b-row class="p-2">
                                <b-col md="3">
                                    <label>Username</label>
                                    <b-form-input v-model="filter.userName" size="sm" type="text" />
                                </b-col>
                                <b-col md="3">
                                    <label>E-mail</label>
                                    <b-form-input v-model="filter.emailId" size="sm" type="text" />
                                </b-col>
                                <b-col md="3">
                                    <label>Contact No</label>
                                    <b-form-input v-model="filter.contactNo" size="sm" type="text" />
                                </b-col>
                                <b-col md="3">
                                    <label>Country</label>
                                    <b-form-input v-model="filter.country" size="sm" type="text" />
                                </b-col>
                            </b-row>
                        </b-form>
                    </b-collapse>
                    </b-card>
                </div>

            <b-modal 
                    id="modal-no-backdrop"
                    v-model="modalVisible" 
                    hide-backdrop 
                    content-class="shadow" 
                    title="Update User" 
                    hide-footer
                    @hidden="getUsersAll">
                <p class="my-2">
                <updated-user :user-id="clickedUserId"></updated-user> 
                </p>
            </b-modal>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="12">
                <b-table id="users-table" 
                    :items="items" 
                    :fields="fields"
                    :per-page="filter.perPage"
                    :current-page="filter.currentPage"
                    striped 
                    bordered 
                    outlined 
                    small 
                    hover 
                    dark>
        
                    <template #cell(action)="row"   >
                        <b-button size="sm" class="mr-2" variant="info"
                            @click="setUserId(row.item.userId)" >Edit</b-button>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="8"></b-col>
            <b-col md="3" class="float-right">
                <b-pagination
                    v-model="filter.currentPage"
                    :total-rows="items.length"
                    :per-page="filter.perPage"
                    aria-controls="users-table"
                    size="sm"
                    class="float-right">
                </b-pagination>
            </b-col>
            <b-col md="1" class="float-right">
                <b-form-select 
                    v-model="filter.perPage" 
                    :options="perPageOptions" 
                    size="sm">
                </b-form-select>
            </b-col>
        </b-row>
        </b-container>
    </main>
</template>

<script lang="ts">
import Vue from 'vue'

import headerMenu from '../../components/common/headerMenu.vue';
import updatedUser from '../../components/auth/updatedUser.vue';
import { objectToQueryString } from '../../helper/object.helper';

export default Vue.extend({
    components: { headerMenu, updatedUser },
    data() {
      return {
        fields: ['userId', 'userName', 'emailId', 'isActive', 'contactNo', 'country', 'Action' ,'createdAt', 'updatedAt'],
        items: [],
        clickedUserId: null,
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
                        ]
      }
    },
    computed: {
      modalVisible: {
            set(value) {
                this.$store.commit("user/SET_MODAL_VISIBLE", value);
            },
            get() {
                return this.$store.getters["user/get_modal_visible"];
            }
        }
    },
    watch: {
        filter: {
            async handler () {
                await this.filterUsers();
            },
            immediate: true,
            deep: true,
        },
    },
    
    async created(){},
    methods:{
        async getUsersAll(){
            await this.$axios.$get(`${process.env.BASE_URL}/users/userall`)
            .then((res) => {
                 this.items = res;
                 console.log(res);
                })
            .catch((error) => {
                console.log(error);
            });
        },
        setUserId(uID: Number){
                (this as any).clickedUserId = uID ;
                console.log('call set props method:: ', (this as any).clickedUserId);
                this.modalVisible = true;
                // (this as any).$bvModal.show('modal-no-backdrop');
        },
        async filterUsers() {
            await this.$axios.$get(`${process.env.BASE_URL}/users/filter?${objectToQueryString((this as any).filter)}`)
            .then((res) => {
                 this.items = res;
                 console.log(res);
                })
            .catch((error) => {
                console.log(error);
            });
        }


    },
})
</script>
<style lang="scss">
.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color:coral;
    border-color: chocolate;
}
.page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: coral;;
    background-color: #fff;
    border: 1px solid #dee2e6;
}

.page-link:focus {
    z-index: 3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem orange;
}
</style>