<template>
  <b-card class="center">
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
      <div>
        <b-button type="submit" variant="success" @click.prevent="createExpense()">Create</b-button> 
        <b-button variant="danger" @click="modalVisible=false">Close</b-button>
      </div>
    </b-form>
      </b-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: ["groupId"],
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
    }
  },
    async created() {
  
    },
    methods: {
    async createExpense(){
        console.log((this as any).expense.expenseUser) ;
        console.log((this as any).expense.expenseGroup) ;
        await (this as any).$axios.$post(`${process.env.BASE_URL}/expense/create`, (this as any).expense)
            .then((res) => {
                console.log(res);
                 (this as any).toastMessage('success', 'Expense is created..'); 
                 (this as any).modalVisible = false;
                })
            .catch((error) => {
                console.log(error);
                (this as any).toastMessage('danger', 'Failed to create');
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