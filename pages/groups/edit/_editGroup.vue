<template>
  <div>
    <header-menu />
    <b-container>
      <b-card
        class="outer-card"
        title="Update Group Infos..."
        sub-title="It can be possible to edit a group which exits in own group list in home page"
      >
        <b-row class="mt-5">
          <b-col md="3"></b-col>
          <b-col md="6">
            <b-card class="inner-card center">
              <b-form @submit.prevent="onEditGroup()">
                <div>
                  <label>Group Name</label>
                  <b-form-input v-model="editedGroup.groupName" type="text" />
                </div>
                <div>
                  <label>Description</label>
                  <b-form-input v-model="editedGroup.description" type="text" />
                </div>
                <div>
                  <label>Status</label>
                  <b-form-checkbox
                    v-model="editedGroup.isActive"
                    name="check-button"
                    switch
                  >
                    Status <b>(is Active: {{ editedGroup.isActive }})</b>
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
                    >Edit</b-button
                  >
                </div>
              </b-form>
            </b-card>
          </b-col>
          <b-col md="3"></b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import headerMenu from '../../../components/common/headerMenu.vue'

export default Vue.extend({
  components: { headerMenu },
  mixins: [validationMixin],
  validations: {
    editedGroup: {
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
      editedGroup: {
        groupName: '',
        description: '',
        isActive: true,
      },
    }
  },
  created() {
    this.fetchGroupInfos()
  },
  methods: {
    async onEditGroup() {
      await this.$axios
        .$put(
          `${process.env.BASE_URL}/group/update/${this.$route.params.editGroup}`,
          (this as any).editedGroup
        )
        .then((res) => {
          console.log(res)
          ;(this as any).okMessage('success', 'Group is successfully updated..')
          this.$router.push('/groups')
        })
        .catch((error) => {
          console.log(error)
          ;(this as any).okMessage('danger', 'Failed to edit group infos')
        })
    },
    validateState(name: any) {
      const data = this.$v.editedGroup[name]
      return data?.$dirty ? data?.$error === false : null
    },
    onReset() {
      ;(this as any).editedGroup.groupName = ''
      ;(this as any).editedGroup.description = ''
      ;(this as any).editedGroup.isActive = true
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
    async fetchGroupInfos() {
      console.log(this.$route.params.id)
      await this.$axios
        .$get(
          `${process.env.BASE_URL}/group/findgroup/${this.$route.params.editGroup}`
        )
        .then((res) => {
          console.log(res)
          ;(this as any).editedGroup.groupName = res.groupName
          ;(this as any).editedGroup.description = res.description
          ;(this as any).editedGroup.isActive = res.isActive
        })
        .catch((error) => {
          console.log(error)
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