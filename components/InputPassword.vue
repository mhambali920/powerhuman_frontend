<template>
  <div class="relative">
    <input
      :value="password"
      @input="updatePassword"
      :type="showPassword ? 'text' : 'password'"
      class="input-field w-full"
    />
    <div
      class="absolute right-8 bottom-3 bg-transparent flex items-center justify-center text-grey cursor-pointer"
      @click="showPassword = !showPassword"
    >
      <Icon name="eye" v-show="showPassword" />
      <Icon name="eyes-slash" v-show="!showPassword" />
    </div>
  </div>
</template>
<script>
export default {
  props: ['password'],
  data() {
    return {
      showPassword: false,
    }
  },
  methods: {
    updatePassword(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>
