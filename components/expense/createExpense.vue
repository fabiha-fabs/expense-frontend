<template>
  <b-card
    border-variant="primary"
    header-bg-variant="primary"
    header-text-variant="white"
    align="center"
  >
    <h4>{{ doAction }}</h4>
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
      <div>
        <label>Expense Date</label>
        <b-form-datepicker
          v-model="expense.expenseDate"
          locale="en-US"
        ></b-form-datepicker>
      </div>
      <br />
      <div class="btn-div" v-if="`${doAction}` == 'Create Expense'">
        <b-button
          type="submit"
          variant="success"
          size="sm"
          @click.prevent="createExpense()"
          >Create</b-button
        >
        <b-button variant="danger" @click="modalVisible = false" size="sm"
          >Close</b-button
        >
      </div>
      <div class="btn-div" v-else-if="`${doAction}` == 'Edit Expense'">
        <b-button
          type="submit"
          variant="success"
          size="sm"
          @click.prevent="updateExpense()"
          >Edit</b-button
        >
        <b-button variant="danger" @click="modalVisible = false" size="sm"
          >Close</b-button
        >
      </div>
    </b-form>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['groupId', 'expenseId', 'doAction'],
  data() {
    return {
      expense: {
        expenseName: '',
        description: '',
        amount: 0,
        expenseDate: new Date(),
        expenseUser: (this as any).$store.state.auth.user.userId,
        expenseGroup: (this as any).groupId,
      },
    }
  },
  computed: {
    modalVisible: {
      set(value) {
        ;(this as any).$store.commit('expense/SET_MODAL_VISIBLE', value)
      },
      get() {
        return (this as any).$store.getters['expense/get_modal_visible']
      },
    },
    clickedExpense: {
      set(value) {
        ;(this as any).$store.commit('expense/SET_CLICKED_EXPENSE', value)
      },
      get() {
        return (this as any).$store.getters['expense/get_clicked_expense']
      },
    },
  },
  async created() {
    if (this.doAction === 'Edit Expense') await this.fetchExpense()
  },
  methods: {
    async createExpense() {
      console.log((this as any).expense.expenseUser)
      console.log((this as any).expense.expenseGroup)

      await (this as any).$axios
        .$post(`${process.env.BASE_URL}/expense/create`, (this as any).expense)
        .then(async () => {
          ;(this as any).toastMessage('success', 'Expense is created..')
          ;(this as any).modalVisible = false
          await this.$store.dispatch(
            'group/fetchTotalCost',
            this.$route.params.id
          )
          await this.$store.dispatch('group/fetchGroup', this.$route.params.id)
        })
        .catch(() => {
          ;(this as any).toastMessage('danger', 'Failed to create')
        })
    },
    async fetchExpense() {
      console.log('fetchExpense call expenseId :: ', (this as any).expenseId)
      await (this as any).$store
        .dispatch('expense/fetchExpense', (this as any).expenseId)
        .then(() => {
          ;(this as any).expense = { ...(this as any).clickedExpense }
          console.log('fetchExpense call expense :: ', (this as any).expense)
        })
    },
    async updateExpense() {
      ;(this as any).clickedExpense = (this as any).expense
      console.log('updateExpense call expenseId:: ', (this as any).expenseId)
      await (this as any).$store
        .dispatch('expense/updateExpense', (this as any).expenseId)
        .then(async () => {
          ;(this as any).toastMessage(
            'success',
            'Expense update is successful..'
          )
          ;(this as any).modalVisible = false
          await this.$store.dispatch(
            'group/fetchTotalCost',
            this.$route.params.id
          )
          await this.$store.dispatch('group/fetchGroup', this.$route.params.id)
        })
        .catch(() => {
          ;(this as any).toastMessage('danger', 'Failed to update expense')
        })
    },

    toastMessage(v: string, msg: string) {
      ;(this as any).$bvToast.toast(msg, {
        title: `Action`,
        variant: v,
        solid: true,
      })
    },
  },
})
</script>

<style lang="scss" >
/*
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #5f768f;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #d9e7e6;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-success {
  color: #fff;
  background-color: #0b3948;
  border-color: #0b3948;
}
.btn-danger {
  color: #fff;
  background-color: #350202;
  border-color: #350202;
}
.btn-div {
  text-align: right;
}*/
</style>