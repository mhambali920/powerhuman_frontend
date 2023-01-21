<template>
  <div class="max-w-screen-xl mx-auto">
    <header class="p-4"><img src="/assets/svgs/logo-type.svg" alt="" /></header>
    <section class="py-[50px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark">Sign Up</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Manage your employees to achieve <br />
        a bigger goals for your company
      </p>
      <Transition>
        <div
          v-if="errors.register"
          class="text-white bg-red-500 px-4 py-2 mb-2 rounded-lg"
        >
          {{ errors.register }}
          <span class="ml-10 cursor-pointer" @click="errors.register = null"
            >x</span
          >
        </div>
      </Transition>
      <form @submit.prevent="userRegister" class="w-full card">
        <div class="form-group">
          <label for="" class="text-grey">Name</label>
          <input v-model="register.name" type="text" class="input-field" />
          <InputError
            v-if="errors.validation"
            :errors="errors.validation.name"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Email Address</label>
          <input v-model="register.email" type="email" class="input-field" />
          <InputError
            v-if="errors.validation"
            :errors="errors.validation.email"
          />
        </div>
        <div class="form-group relative">
          <label for="" class="text-grey">Password</label>
          <InputPassword
            v-model="register.password"
            :password="register.password"
          />
          <InputError
            v-if="errors.validation"
            :errors="errors.validation.password"
          />
        </div>
        <div class="form-group relative">
          <label for="" class="text-grey">Confirm Password</label>
          <InputPassword v-model="confPassword" :password="confPassword" />
        </div>
        <p v-if="!matchPassword" class="text-red-500 text-xs">
          password not match...
        </p>

        <button
          :disabled="!matchPassword"
          type="submit"
          class="w-full btn btn-primary mt-[14px]"
        >
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
import InputPassword from '~/components/InputPassword.vue'
import InputError from '~/components/InputError.vue'

export default {
  data() {
    return {
      confPassword: '',
      register: {
        name: '',
        email: '',
        password: '',
      },
      errors: {
        validation: null,
        register: null,
      },
    }
  },
  computed: {
    matchPassword() {
      return this.register.password === this.confPassword
    },
  },
  methods: {
    async userRegister() {
      try {
        let response = await this.$axios.post('/register', this.register)
        // console.log(response)
        if (response.status == 200) {
          this.$router.push({ name: 'login' })
        }
      } catch (e) {
        // console.log(e.response)
        if (e.response.status === 422) {
          this.errors.validation = e.response.data.errors
        } else {
          this.errors.register = e.response.data.meta.message
        }
      }
    },
  },
  components: { InputPassword, InputError },
}
</script>
