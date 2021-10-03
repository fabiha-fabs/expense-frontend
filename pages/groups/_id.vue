<template>
    <main>
        <header-menu />
        <b-container>
            <b-card-group>
            <b-card class="text-center"
                    bg-variant="secondary "
                    text-variant="dark">
                <h2 >{{groupInfos.groupName}}</h2>
                <h6>{{groupInfos.groupId}}</h6>
                <b-card-text>
                    {{groupInfos.description}}
                </b-card-text>
            <b-card-text>
            <b-button v-b-modal.modal-no-backdrop class="float-left mb-2" variant="info" size="sm">Create Expense</b-button>
                <b-modal 
                    id="modal-no-backdrop"
                    v-model="modalVisible" 
                    hide-backdrop 
                    content-class="shadow" 
                    title="Create Expense" 
                    hide-footer
                    @hidden="fetchExpensesForCurrentGroup()">
                <p class="my-2">
                <create-expense :group-id="`${groupInfos.groupId}`"></create-expense> 
                </p>
            </b-modal>
                <b-table id="expenses-table" 
                    :fields="fields"
                    :items="groupInfos.expenses" 
                    striped 
                    bordered 
                    outlined 
                    small 
                    hover 
                    dark>
        
                    <template #cell(edit)="row"   >
                        <b-button v-b-modal.modal-expense-edit size="sm" class="mr-2" variant="info"
                            @click="setExpenseId(row.item.expenseId)" >Edit</b-button>
                    </template>
                    <template #cell(remove)="row"   >
                        <b-button v-b-modal.modal-expense-remove size="sm" class="mr-2" variant="info"
                            @click="setExpenseId(row.item.expenseId)" >Remove</b-button>
                    </template>
                </b-table>
            </b-card-text>
            <template #footer>
                <small class="text-muted">Last updated 3 mins ago</small>
            </template>
            </b-card>
        </b-card-group>
                
        </b-container>
    </main>
</template>
<script lang="ts">
import Vue from 'vue'
import headerMenu from '../../components/common/headerMenu.vue';
import CreateExpense from '../../components/expense/createExpense.vue';

export default Vue.extend({
    components: { headerMenu, CreateExpense, },
    data() {
        return {
         fields: ['expenseId', 'expenseName', 'description', 'amount', 'edit', 'remove', 'expenseDate' ,'createdAt'],
         groupInfos: []
        }
    },
    computed: {
    modalVisible: {
      set(value) {
        (this as any).$store.commit("expense/SET_MODAL_VISIBLE", value);
      },
      get() {
        return (this as any).$store.getters["expense/get_modal_visible"];
      }
    }
  },
    async created() {
       await this.fetchExpensesForCurrentGroup();
    },
    methods:{
        async fetchExpensesForCurrentGroup(){
            
            await this.$axios.$get(`${process.env.BASE_URL}/group/findgroup/${this.$route.params.id}`)
            .then((res) => {
                 this.groupInfos = res ;
                 console.log(res);
                })
            .catch((error) => {
                console.log(error);
            });
        },
        setExpenseId(uID: Number){
        /* (this as any).clickedUserId = uID ;
                console.log('call set props method:: ', (this as any).clickedUserId); */
                this.modalVisible = true;
    }
    }
    
})
</script>