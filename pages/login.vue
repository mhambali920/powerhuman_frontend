<template>
  <div class="max-w-screen-xl mx-auto">
    <header class="p-4 flex items-center justify-center lg:justify-start">
      <img src="/assets/svgs/logo-type.svg" alt="" />
    </header>
    <section class="py-[50px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark">Sign In</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Manage your employees to achieve <br />
        a bigger goals for your company
      </p>
      <Transition>
        <div
          v-if="loginError"
          class="text-white bg-red-500 px-4 py-2 mb-2 rounded-lg"
        >
          {{ loginError }}
          <span class="ml-10 cursor-pointer" @click="loginError = null">x</span>
        </div>
      </Transition>
      <form class="w-full card" @submit.prevent="userLogin">
        <div class="form-group">
          <label for="" class="text-grey">Email Address</label>
          <input v-model="login.email" type="email" class="input-field" />
          <InputError v-if="validationError" :errors="validationError.email" />
        </div>

        <div class="form-group relative">
          <label for="" class="text-grey">Password</label>
          <InputPassword v-model="login.password" :password="login.password" />
          <InputError
            v-if="validationError"
            :errors="validationError.password"
          />
        </div>

        <button type="submit" class="w-full btn btn-primary mt-[14px]">
          Sign In
        </button>
      </form>
      <div
        class="w-full relative p-6 rounded-[26px] flex flex-col gap-y-4 md:max-w-[500px]"
      >
        <div class="flex items-center justify-end text-sm">
          <p class="mr-2 text-gray-700">Dont have account ?</p>
          <NuxtLink to="/register" class="text-primary font-semibold"
            >Register</NuxtLink
          >
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import InputError from '~/components/InputError.vue'
import InputPassword from '~/components/InputPassword.vue'

export default {
  auth: 'guest',
  data() {
    return {
      validationError: null,
      loginError: null,
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        })
      } catch (e) {
        // console.log(e.response)
        if (e.response.status === 400 || e.response.status === 422) {
          this.validationError = e.response.data.errors
        }
        if (e.response.status === 401) {
          this.loginError = e.response.data.meta.message
        }
      }
    },
  },
  components: { InputPassword, InputError },
}
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
