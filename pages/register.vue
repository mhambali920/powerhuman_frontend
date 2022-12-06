<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4">
    <img src="/assets/svgs/logo-type.svg" alt="" />
    <div class="text-[32px] font-semibold text-dark mt-[70px]">Sign Up</div>
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
      <div class="form-group">
        <label for="" class="text-grey">Password</label>
        <input
          v-model="register.password"
          type="password"
          class="input-field"
        />
      </div>
      <!-- <a href="signin.html" class="w-full btn btn-primary mt-[14px]">
        Continue
      </a> -->
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Continue
      </button>
    </form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
      },
    }
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
