<template>
  <div class="max-w-screen-xl mx-auto">
    <header class="p-4"><img src="/assets/svgs/logo-type.svg" alt="" /></header>
    <section class="py-[50px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark">Sign Up</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Manage your employees to achieve <br />
        a bigger goals for your company
      </p>
      <form @submit.prevent="userRegister" class="w-full card">
        <div class="form-group">
          <label for="" class="text-grey">Name</label>
          <input v-model="register.name" type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Email Address</label>
          <input v-model="register.email" type="email" class="input-field" />
        </div>
        <div class="form-group relative">
          <label for="" class="text-grey">Password</label>
          <input
            v-model="register.password"
            :type="showPassword ? 'text' : 'password'"
            class="input-field"
          />
          <button
            type="button"
            class="absolute right-8 bottom-3 bg-transparent flex items-center justify-center text-grey"
            @click="showPassword = !showPassword"
          >
            <Icon name="eye" v-show="showPassword" />
            <Icon name="eyes-slash" v-show="!showPassword" />
          </button>
        </div>
        <div class="form-group relative">
          <label for="" class="text-grey">Confirm Password</label>
          <input
            v-model="password"
            :type="showConfPassword ? 'text' : 'password'"
            class="input-field"
          />
          <button
            type="button"
            class="absolute right-8 bottom-3 bg-transparent flex items-center justify-center text-grey"
            @click="showConfPassword = !showConfPassword"
          >
            <Icon name="eye" v-show="showConfPassword" />
            <Icon name="eyes-slash" v-show="!showConfPassword" />
          </button>
          <p v-if="matchPassword" class="text-red-600 text-xs font-extralight">
            password not match...
          </p>
        </div>

        <button type="submit" class="w-full btn btn-primary mt-[14px]">
          Continue
        </button>
      </form>
      <div
        class="w-full relative p-6 rounded-[26px] flex flex-col gap-y-4 md:max-w-[500px]"
      >
        <div class="flex items-center justify-end text-sm">
          <p class="mr-2 text-gray-700">Already account ?</p>
          <NuxtLink to="/login" class="text-primary font-semibold"
            >Login</NuxtLink
          >
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showPassword: false,
      showConfPassword: false,
      password: '',
      register: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  computed: {
    matchPassword() {
      return (
        this.password.length > 3 && this.register.password !== this.password
      )
    },
  },
  methods: {
    async userRegister() {
      try {
        let response = await this.$axios.post('/register', this.register)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
