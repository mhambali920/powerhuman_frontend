<template>
  <div class="max-w-screen-xl mx-auto">
    <header class="p-4"><img src="/assets/svgs/logo-type.svg" alt="" /></header>
    <section class="py-[50px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark">Sign In</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Manage your employees to achieve <br />
        a bigger goals for your company
      </p>
      <form class="w-full card" @submit.prevent="userLogin">
        <p v-if="loginInfo" class="text-red-500 font-light text-sm text-center">
          {{ loginInfo.statusText }}
        </p>
        <div class="form-group">
          <label for="" class="text-grey">Email Address</label>
          <input v-model="login.email" type="email" class="input-field" />
        </div>
        <div class="form-group relative">
          <label for="" class="text-grey">Password</label>
          <input
            v-model="login.password"
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
export default {
  auth: 'guest',
  data() {
    return {
      loginInfo: {},
      showPassword: false,
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        this.loginInfo = await this.$auth.loginWith('local', {
          data: this.login,
        })
      } catch (err) {
        this.loginInfo = err.response
      }
    },
  },
}
</script>
