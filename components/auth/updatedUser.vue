<template>
  <b-card class="center">
    <b-form>
      <div>
        <label>Username</label>
        <b-form-input
          v-model="register.userName"
          :state="validateState('userName')"
          type="text"
        />
        <b-form-invalid-feedback v-if="!$v.register.userName.minLength">
          User name must have at least
          {{ $v.register.userName.$params.minLength.min }} letters.
        </b-form-invalid-feedback>
      </div>
      <div>
        <label>Password</label>
        <b-form-input
          v-model="register.password"
          type="password"
          :state="validateState('password')"
        />
        <b-form-invalid-feedback v-if="!$v.register.password.minLength">
          Password must have at least
          {{ $v.register.password.$params.minLength.min }} letters.
        </b-form-invalid-feedback>
      </div>
      <div>
        <label>E-mail</label>
        <b-form-input v-model="register.emailId" type="text" />
      </div>
      <div>
        <label>Contact No</label>
        <b-form-input v-model="register.contactNo" type="text" />
      </div>
      <div>
        <label>Country</label>
        <b-form-input v-model="register.country" type="text" />
      </div>
      <br /><br />
      <div class="btn-div">
        <b-button variant="danger" size="sm" @click="modalVisible = false"
          >CLose</b-button
        >
        <b-button
          type="submit"
          variant="success"
          size="sm"
          @click.prevent="updatedUserInfo"
          >Update</b-button
        >
      </div>
    </b-form>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { minLength, required } from 'vuelidate/lib/validators'

export default Vue.extend({
  mixins: [validationMixin],
  validations: {
    register: {
      userName: {
        required,
        minLength: minLength(3),
      },
      password: {
        required,
        minLength: minLength(3),
      },
    },
  },
  props: ['userId'],
  data() {
    return {
      register: {
        userName: '',
        password: '',
        emailId: '',
        contactNo: '',
        country: '',
      },
    }
  },
  computed: {
    clickedUser: {
      set(value) {
        ;(this as any).$store.commit('user/SET_CLICKED_USER', value)
      },
      get() {
        return (this as any).$store.getters['user/get_clicked_user']
      },
    },
    modalVisible: {
      set(value) {
        ;(this as any).$store.commit('user/SET_MODAL_VISIBLE', value)
      },
      get() {
        return (this as any).$store.getters['user/get_modal_visible']
      },
    },
  },
  async created() {
    // await this.$axios.$get(`${process.env.BASE_URL}/users/finduser/${this.userId}`)
    console.log(this.userId)
    await this.$store.dispatch('user/fetchUser', this.userId).then(() => {
      ;(this as any).register = { ...(this as any).clickedUser }
    })
  },
  methods: {
    async updatedUserInfo() {
      this.$v.register.$touch()

      if (this.$v.register.$anyError) {
        return
      }
      /* const userId: any = this.$store.state.auth.user.userId ;  */
      ;(this as any).clickedUser = (this as any).register
      console.log('id:: ', this.userId)
      await this.$store
        .dispatch('user/updateUser', this.userId)
        .then(() => {
          ;(this as any).toastMessage('success', 'Update is successful..')
          ;(this as any).modalVisible = false
        })
        .catch((error) => {
          console.log(error)
          ;(this as any).toastMessage('danger', 'Failed to update')
        })
    },
    validateState(name: any) {
      const data = this.$v.register[name]
      return data?.$dirty ? data?.$error === false : null
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
<!--
<style lang="scss" >
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
}
</style>-->