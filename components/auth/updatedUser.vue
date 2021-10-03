<template>
  <b-card class="center">
    <b-form>
      <div>
        <label>Username</label>
        <b-form-input v-model="register.userName" :state="validateState('userName')" type="text" />
        <b-form-invalid-feedback v-if="!$v.register.userName.minLength">
            User name must have at least {{$v.register.userName.$params.minLength.min}} letters.
        </b-form-invalid-feedback>
      </div>
      <div>
        <label>Password</label>
        <b-form-input v-model="register.password" type="password" :state="validateState('password')" />
        <b-form-invalid-feedback v-if="!$v.register.password.minLength">
            Password must have at least {{$v.register.password.$params.minLength.min}} letters.
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
      <br><br>
      <div>
        <b-button type="submit" variant="success" @click.prevent="updatedUserInfo">Update</b-button> 
        <b-button variant="danger" @click="modalVisible=false">CLose</b-button>
      </div>
    </b-form>
      </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";

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
                minLength: minLength(3)
            }
        },
    },
    props: ["userId"],
    data() {
        return {
            register: {
                userName: '',
                password: '',
                emailId: '',
                contactNo: '',
                country: ''
            }
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
        (this as any).$store.commit("user/SET_MODAL_VISIBLE", value);
      },
      get() {
        return (this as any).$store.getters["user/get_modal_visible"];
      }
    }
  },
    async created() {
      // await this.$axios.$get(`${process.env.BASE_URL}/users/finduser/${this.userId}`)
      console.log(this.userId);
      await this.$store.dispatch("user/fetchUser", this.userId).then(() => {
        (this as any).register = {...(this as any).clickedUser};
      });
    },
    methods: {
    async updatedUserInfo(){

      this.$v.register.$touch();

        if (this.$v.register.$anyError) {
            return;
        }
      /* const userId: any = this.$store.state.auth.user.userId ;  */
      (this as any).clickedUser = (this as any).register;
      console.log('id:: ', this.userId);
            await this.$store.dispatch("user/updateUser", this.userId )
            .then(() => {
                 (this as any).toastMessage('success', 'Update is successful..');
                 (this as any).modalVisible = false;
          
                })
            .catch((error) => {
                console.log(error);
                (this as any).toastMessage('danger', 'Failed to update');
            });
        },
    validateState(name: any) {
      const data = this.$v.register[name];
      return data?.$dirty ? data?.$error === false : null;
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