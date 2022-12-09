<template>
  <div>
    <div class="pt-[50px] md:px-[50px] flex justify-between items-center px-4">
      <a href="/index.html">
        <img src="/assets/svgs/logo-type.svg" alt="" />
      </a>
      <a href="#" onclick="history.back()">
        <img src="/assets/svgs/ric-close-white.svg" alt="" />
      </a>
    </div>
    <section class="py-[70px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark">Empower Your Team</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Add your new people to grow the <br />
        company reaching their goals
      </p>
      <form class="w-full card">
        <div class="form-group">
          <label for="" class="text-grey">Complete Name</label>
          <input
            type="text"
            class="input-field"
            :value="name"
            @input="updateName"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Email Address</label>
          <input
            type="email"
            class="input-field"
            :value="email"
            @input="updateEmail"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Gender</label>
          <select
            :value="gender"
            @change="updateGender"
            class="appearance-none input-field form-icon-chevron_down"
          >
            <option value="MALE" selected>Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Age</label>
          <input
            type="number"
            class="input-field"
            :value="age"
            @input="updateAge"
          />
        </div>
        <NuxtLink
          :to="{ name: 'companies-id-employees-finishing' }"
          class="w-full btn btn-primary mt-[14px]"
        >
          Continue
        </NuxtLink>
      </form>
    </section>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  computed: {
    name() {
      return this.$store.state.employee.name
    },
    email() {
      return this.$store.state.employee.email
    },
    gender() {
      return this.$store.state.employee.gender
    },
    age() {
      return this.$store.state.employee.age
    },
  },

  methods: {
    updateName(e) {
      this.$store.commit('employee/updateName', e.target.value)
    },
    updateEmail(e) {
      this.$store.commit('employee/updateEmail', e.target.value)
    },
    updateGender(e) {
      this.$store.commit('employee/updateGender', e.target.value)
    },
    updateAge(e) {
      this.$store.commit('employee/updateAge', e.target.value)
    },
  },
}
</script>
