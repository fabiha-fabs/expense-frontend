<template>
  <b-card class="center" >
      <h4>{{ doAction }} </h4>
    <b-form>
      <div>
        <label>Expense</label>
        <b-form-input v-model="expense.expenseName" type="text" />
      </div>
      <div>
        <label>Description</label>
        <b-form-input v-model="expense.description" type="text" />
      </div>
      <div>
        <label>Amount</label>
        <b-form-input v-model="expense.amount" type="text" />
      </div>
      <br>
      <div v-if="`${doAction}` == 'Create Expense'">
        <b-button type="submit" variant="success" @click.prevent="createExpense()">Create</b-button> 
        <b-button variant="danger" @click="modalVisible=false">Close</b-button>
      </div>
      <div v-else-if="`${doAction}` == 'Edit Expense'">
        <b-button type="submit" variant="success" @click.prevent="updateExpense()">Edit</b-button> 
        <b-button variant="danger" @click="modalVisible=false">Close</b-button>
      </div>
    </b-form>
      </b-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: ["groupId", "expenseId", "doAction"],
    data() {
        return {
            expense: {
                expenseName: '',
                description: '',
                amount: 0,
                expenseUser: (this as any).$store.state.auth.user.userId,
                expenseGroup: (this as any).groupId
            }
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
    },
    clickedExpense: {
      set(value) {
        (this as any).$store.commit("expense/SET_CLICKED_EXPENSE", value);
      },
      get() {
        return (this as any).$store.getters["expense/get_clicked_expense"];
      }
    },
  }, 
    async created() {
       if(this.doAction === 'Edit Expense')
            await this.fetchExpense();
    },
    methods: {
    async createExpense(){
        console.log((this as any).expense.expenseUser) ;
        console.log((this as any).expense.expenseGroup) ;
        
        await (this as any).$axios.$post(`${process.env.BASE_URL}/expense/create`, (this as any).expense)
            .then(async() => {
                  (this as any).toastMessage('success', 'Expense is created..'); 
                  (this as any).modalVisible = false;
                  await this.$store.dispatch("group/fetchTotalCost", this.$route.params.id);
                  await this.$store.dispatch("group/fetchGroup", this.$route.params.id);
                })
            .catch(() => {
                (this as any).toastMessage('danger', 'Failed to create');
            });
        },
    async fetchExpense() {
        console.log('fetchExpense call expenseId :: ',(this as any).expenseId);
        await (this as any).$store.dispatch("expense/fetchExpense", (this as any).expenseId).then(() => {
        (this as any).expense = {...(this as any).clickedExpense};
        console.log('fetchExpense call expense :: ',(this as any).expense);
      });
    },    
    async updateExpense(){
        (this as any).clickedExpense = (this as any).expense;
        console.log('updateExpense call expenseId:: ', (this as any).expenseId);
        await (this as any).$store.dispatch("expense/updateExpense", (this as any).expenseId )
            .then(() => {
                 (this as any).toastMessage('success', 'Expense update is successful..');
                 (this as any).modalVisible = false;
            })
            .catch(() => {
                (this as any).toastMessage('danger', 'Failed to update expense');
            });
    },
    
    toastMessage( v: string , msg: string) {
         (this as any).$bvToast.toast(msg , {
          title: `Action`,
          variant: v,
          solid: true
        })
      } 
  }
})
</script>