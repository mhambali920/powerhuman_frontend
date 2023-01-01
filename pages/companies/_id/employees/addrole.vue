<template>
  <div>
    <div class="pt-[50px] md:px-[50px] flex justify-between items-center px-4">
      <NuxtLink :to="{ name: 'companies-id' }">
        <img src="/assets/svgs/logo-type.svg" alt="" />
      </NuxtLink>
      <a href="#" onclick="history.back()">
        <img src="/assets/svgs/ric-close-white.svg" alt="" />
      </a>
    </div>
    <section class="py-[70px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark">Give a Role</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Complete the information to make it more <br />
        easier when introduce to team
      </p>
      <form class="w-full card">
        <div class="flex flex-col items-center mb-[14px]">
          <img src="/assets/images/user-f-1.png" width="70" alt="" />
          <div class="mt-6 mb-1 text-lg font-semibold">
            {{ this.$store.state.employee.name }}
          </div>
          <p class="text-base text-grey">
            {{ this.$store.state.employee.email }}
          </p>
        </div>
        <p v-if="$fetchState.pending">Fetching role...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <div v-else class="form-group">
          <label for="" class="text-grey">Select Role</label>
          <select
            :value="role_id"
            @change="updateRoleId"
            class="appearance-none input-field form-icon-chevron_down"
          >
            <option
              v-for="role in roles.data.result.data"
              :key="role.id"
              :value="role.id"
            >
              {{ role.name }}
            </option>
          </select>
        </div>

        <!-- Responsibilities -->
        <section>
          <label for="" class="text-grey"> Responsibilities </label>
          <div class="flex flex-col gap-4 mt-[10px]">
            <div
              v-for="responsibility in responsibilities"
              :key="responsibility.id"
              class="flex items-start md:items-center gap-[6px]"
            >
              <img src="/assets/svgs/ic-check-circle.svg" alt="" />
              <span class="text-sm text-dark">
                {{ responsibility.name }}
              </span>
            </div>
          </div>
        </section>
        <NuxtLink
          :to="{ name: 'companies-id-employees-addtoteam' }"
          href="employee_add-to-team.html"
          class="w-full btn btn-primary mt-[14px]"
        >
          Continue
        </NuxtLink>
        <div class="text-center">or</div>
        <NuxtLink
          :to="{ name: 'companies-id-roles-create' }"
          class="w-full border btn btn-white"
        >
          Create New Role
        </NuxtLink>
      </form>
    </section>
  </div>
</template>
<script>
export default {
  middleware: 'auth',

  data() {
    return {
      roles: [],
      responsibilities: [],
    }
  },

  async fetch() {
    this.roles = await this.$axios.get('/role', {
      params: { company_id: this.$route.params.id },
    })
  },

  computed: {
    role_id() {
      return this.$store.state.employee.role_id
    },
  },
  methods: {
    fetchResponsibilites() {
      this.$axios
        .get('/responsibility', {
          params: {
            company_id: this.$route.params.id,
            role_id: this.$store.state.employee.role_id,
          },
        })
        .then(({ data }) => (this.responsibilities = data.result.data))
    },

    updateRoleId(e) {
      this.$store.commit('employee/updateRoleId', e.target.value)
      this.$store.commit(
        'employee/updateRoleName',
        e.target.options[e.target.selectedIndex].text
      )
      this.fetchResponsibilites()
    },
  },
}
</script>
