<template>
  <main>
    <header-menu />
    <b-container>
      <b-card
        class="outer-card"
        title="Create Group Form"
        sub-title="It will be added to own group list in home page"
      >
        <b-row class="mt-5">
          <b-col md="3"></b-col>
          <b-col md="6">
            <!-- <h5>Create Group Form</h5> -->
            <b-card class="inner-card center">
              <b-form @submit.prevent="onCreateGroup()">
                <div>
                  <label>Group Name</label>
                  <b-form-input v-model="createGroup.groupName" type="text" />
                </div>
                <div>
                  <label>Description</label>
                  <b-form-input v-model="createGroup.description" type="text" />
                </div>
                <div>
                  <label>Status</label>
                  <b-form-checkbox
                    v-model="createGroup.isActive"
                    name="check-button"
                    switch
                  >
                    Status <b>(is Active: {{ createGroup.isActive }})</b>
                  </b-form-checkbox>
                </div>

                <div class="btn-div">
                  <b-button
                    type="reset"
                    variant="danger"
                    size="sm"
                    @click="onReset"
                    >Reset</b-button
                  >
                  <b-button type="submit" variant="success" size="sm"
                    >Create</b-button
                  >
                </div>
              </b-form>
            </b-card>
          </b-col>
          <b-col md="3"></b-col>
        </b-row>
      </b-card>
    </b-container>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import headerMenu from '../../components/common/headerMenu.vue'

export default Vue.extend({
  components: { headerMenu },
  mixins: [validationMixin],
  validations: {
    createGroup: {
      groupName: {
        required,
        minLength: minLength(3),
      },
      description: {
        required,
        minLength: minLength(3),
      },
      isActive: {
        required,
      },
    },
  },
  data() {
    return {
      createGroup: {
        groupName: '',
        description: '',
        isActive: true,
      },
      addUsersToGroupArr: {
        userIDsArr: [this.$store.state.auth.user.userId],
        groupID: '',
      },
    }
  },
  created() {},
  methods: {
    async onCreateGroup() {
      await this.$axios
        .$post(
          `${process.env.BASE_URL}/group/create`,
          (this as any).createGroup
        )
        .then(async (res) => {
          console.log(res)
          console.log(res.groupId)
          await this.addUsersToCurrentGroup(res.groupId)
          ;(this as any).okMessage('success', 'Group creation is successful..')
          ;(this as any).onReset()
        })
        .catch((error) => {
          console.log(error)
          ;(this as any).okMessage('danger', 'Failed to create group')
        })
    },
    validateState(name: any) {
      const data = this.$v.createGroup[name]
      return data?.$dirty ? data?.$error === false : null
    },
    onReset() {
      ;(this as any).createGroup.groupName = ''
      ;(this as any).createGroup.description = ''
      ;(this as any).createGroup.isActive = true
    },
    okMessage(v: string, msg: string) {
      ;(this as any).$bvModal.msgBoxOk(msg, {
        title: `Action`,
        variant: v,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: v,
        solid: true,
      })
    },
    async addUsersToCurrentGroup(groupId: any) {
      this.addUsersToGroupArr.groupID = groupId
      console.log(this.addUsersToGroupArr)

      await this.$axios
        .$post(
          `${process.env.BASE_URL}/group/addusers`,
          (this as any).addUsersToGroupArr
        )
        .then(async (res) => {
          console.log(res)
          ;(this as any).toastMessage(
            'success',
            'Added user(s) has been successful..'
          )
          await this.$store.dispatch('group/fetchGroup', groupId)
        })
        .catch((error) => {
          console.log(error)
          ;(this as any).toastMessage(
            'danger',
            'Failed to add user(s) to group'
          )
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
<style lang="scss" scoped>
.outer-card {
  background-color: #2a2929 !important;
  margin-top: 50px;
  text-align: center;
  font-family: 'Lucida Sans';
}
.card-title {
  color: aliceblue;
}
.card-subtitle {
  color: darkgrey;
}
.inner-card {
  text-align: left;
  font-family: Helvetica, sans-serif;
  background-color: #cfd3d7;
  font-size: 0.92em;
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
}
</style>