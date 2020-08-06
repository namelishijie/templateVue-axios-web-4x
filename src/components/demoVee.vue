<template>
  <div>
    <ValidationObserver tag="form" ref="obs">
      <ValidationProvider rules="required" v-slot="{ errors }" name="nationalID">
        <input type="text" v-model="e">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
    </ValidationObserver>
    <button @click="on">on</button>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'demoVee',
  data() {
    return {
      e: ''
    }
  },
  methods: {
    async on() {
      const isValid = await this.$refs.obs.validate()
      if (!isValid) {
        console.log('没有通过执行')
        return
      }
      console.log('通过')
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider
  }
}
</script>