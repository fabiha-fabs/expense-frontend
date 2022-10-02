<template>
  <main style="background-color: #5a6268">
    <header-menu />
    <b-container>
      <b-card-group>
        <b-card class="text-center mt-5" text-variant="dark">
          <b-card-text>
            <h2>{{ groupInfos.groupName }}</h2>
            {{ groupInfos.description }}
          </b-card-text>

          <b-card-text>
            <b-tabs
              card
              variant="info"
              active-nav-item-class="font-weight-bold text-success"
            >
              <b-tab title="Expense Table">
                <div class="mb-2 mt-2">
                  <b-button
                    v-b-modal.modal-no-backdrop
                    class="float-left mb-1"
                    variant="info"
                    size="sm"
                    @click="setAction('Create Expense')"
                  >
                    Create Expense
                  </b-button>
                </div>
                <div class="mb-1 float-right">Total Cost: {{ totalCost }}</div>
                <b-table
                  id="expenses-table"
                  :fields="fields"
                  :items="groupInfos.expenses"
                  striped
                  bordered
                  outlined
                  small
                  hover
                  dark
                >
                  <template #cell(expenseDate)="row">
                    <b-form-datepicker
                      size="sm"
                      locale="en-US"
                      v-model="row.value"
                      disabled
                      dark
                    ></b-form-datepicker>
                  </template>
                  <template #cell(edit)="row">
                    <b-button
                      v-b-modal.modal-no-backdrop
                      size="sm"
                      class="mr-2"
                      variant="info"
                      @click="
                        setAction('Edit Expense')
                        setExpenseId(row.item.expenseId)
                      "
                      >Edit</b-button
                    >
                  </template>
                  <template #cell(remove)="row">
                    <b-button
                      size="sm"
                      class="mr-2"
                      variant="info"
                      @click="deleteExpense(row.item.expenseId)"
                      >Remove</b-button
                    >
                  </template>
                </b-table>
              </b-tab>
              <b-tab title="Group Members">
                <div>
                  <b-button
                    v-b-modal.modal-tall
                    class="float-left mb-2 mt-2"
                    variant="info"
                    size="sm"
                  >
                    Add User
                  </b-button>
                </div>
                <div class="mb-1 float-right">Total Cost: {{ totalCost }}</div>
                <b-table
                  id="group-members-table"
                  :fields="fieldUsers"
                  :items="groupInfos.users"
                  striped
                  bordered
                  outlined
                  small
                  hover
                  dark
                >
                  <template #cell(paidDue)="row">
                    {{ row.value }}
                    <b-badge
                      v-if="row.value < 0"
                      href="#"
                      variant="danger"
                      size="sm"
                      >due</b-badge
                    >
                  </template>
                  <template #cell(remove)="row">
                    <b-button
                      size="sm"
                      class="mr-2"
                      variant="info"
                      @click="detachedUsersFromGroup(row.item.userId)"
                      >Remove</b-button
                    >
                  </template>
                </b-table>
              </b-tab>
            </b-tabs>
          </b-card-text>
          <template #footer>
            <small class="text-muted"
              >Fabiha Tabassum ..lipu.scse@gmail.com</small
            >
          </template>
        </b-card>
      </b-card-group>
      <b-modal
        id="modal-no-backdrop"
        v-model="modalVisible"
        hide-backdrop
        content-class="shadow"
        hide-footer
      >
        <p v-if="`${this.do}` == 'Create Expense'" class="my-2">
          <create-expense
            :group-id="$route.params.id"
            :do-action="`${this.do}`"
          >
          </create-expense>
        </p>
        <p v-else-if="`${this.do}` == 'Edit Expense'" class="my-2">
          <create-expense
            :expense-id="`${clickedExpenseId}`"
            :group-id="$route.params.id"
            :do-action="`${this.do}`"
          >
          </create-expense>
        </p>
      </b-modal>
      <b-modal
        id="modal-tall"
        title="Add Members To Group"
        content-class="shadow"
        size="lg"
        centered
        hide-footer
      >
        <group-members :group-infos="groupInfos" :group-id="$route.params.id" />
      </b-modal>
    </b-container>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import headerMenu from '../../components/common/headerMenu.vue'
import CreateExpense from '../../components/expense/createExpense.vue'

export default Vue.extend({
  components: { headerMenu, CreateExpense },
  data() {
    return {
      fields: [
        'expenseId',
        'expenseName',
        'description',
        'amount',
        'edit',
        'remove',
        'expenseDate',
      ],
      clickedExpenseId: null,
      clickedExpenseDate: new Date(),
      do: '',
      fieldUsers: [
        'userId',
        'userName',
        'emailId',
        'contactNo',
        'country',
        'paidDue',
        'Remove',
      ],
      detachedUsersArr: {
        userIDsArr: [],
        groupID: '',
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
    groupInfos() {
      return (this as any).$store.getters['group/get_group_infos']
    },
    totalCost() {
      return (this as any).$store.getters['group/get_total_cost']
    },
  },
  async created() {
    await this.$store.dispatch('group/fetchTotalCost', this.$route.params.id)
    await this.$store.dispatch('group/fetchGroup', this.$route.params.id)
  },
  methods: {
    setExpenseId(uID: Number) {
      ;(this as any).clickedExpenseId = uID
      this.modalVisible = true
    },
    setAction(doing: any) {
      this.do = doing
    },
    async detachedUsersFromGroup(uID: any) {
      ;(this as any).detachedUsersArr.userIDsArr = [uID]
      ;(this as any).detachedUsersArr.groupID = this.$route.params.id
      console.log((this as any).detachedUsersArr.groupID)
      await this.$axios
        .$post(
          `${process.env.BASE_URL}/group/detachedusers`,
          (this as any).detachedUsersArr
        )
        .then((res) => {
          console.log(res)
          ;(this as any).toastMessage('success', 'User has been removed..')
          //(this as any).fetchExpensesForCurrentGroup();
          this.$store.dispatch('group/fetchGroup', this.$route.params.id)
        })
        .catch((error) => {
          console.log(error)
          ;(this as any).toastMessage('danger', 'Failed to remove user')
        })
    },
    toastMessage(v: string, msg: string) {
      ;(this as any).$bvToast.toast(msg, {
        title: `Action`,
        variant: v,
        solid: true,
      })
    },
    async deleteExpense(exID: any) {
      await this.$axios
        .$delete(`${process.env.BASE_URL}/expense/delete/${exID}`)
        .then(async (res) => {
          console.log(res)
          ;(this as any).toastMessage('success', 'Delete Expense $exID..')
          // (this as any).fetchExpensesForCurrentGroup();
          await this.$store.dispatch(
            'group/fetchTotalCost',
            this.$route.params.id
          )
          await this.$store.dispatch('group/fetchGroup', this.$route.params.id)
        })
        .catch((error) => {
          console.log(error)
          ;(this as any).toastMessage('danger', 'Failed to delete expense')
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.table-dark {
  color: #fff;
  background-color: #3c0a05;
}
.table-dark th,
.table-dark td,
.table-dark thead th {
  border-color: #5b6064;
}
.btn-info {
  color: #fff;
  background-color: #02252a;
  border-color: #5b6064;
}
.text-dark {
  color: #f3f9ff !important;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #2a2929;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
div.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgb(0 0 0 / 54%);
  border-bottom: 1px solid rgb(0 0 0 / 56%);
}
/* p .card-body.card-text.tabs.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgb(0 0 0 / 54%);
  border-bottom: 1px solid rgb(0 0 0 / 56%);
} */
</style>