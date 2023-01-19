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
      <div class="text-[32px] font-semibold text-dark">Add to Team</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Add your new people to grow the <br />
        company reaching their goals
      </p>
      <div
        class="w-full card !max-w-[560px] sm:!flex-row items-center justify-between"
      >
        <div class="flex flex-row items-center gap-4">
          <img src="/assets/images/user-f-1.png" width="70" alt="" />
          <div>
            <div class="text-lg font-semibold">
              {{ this.$store.state.employee.name }}
            </div>
            <p class="text-base text-grey">
              {{ this.$store.state.employee.email }}
            </p>
          </div>
        </div>
        <p class="text-right text-grey">
          {{ this.$store.state.employee.role_name }}
        </p>
      </div>

      <!-- Your Teams -->
      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">Your Teams</div>
              <p class="text-grey">Improve your growth</p>
            </div>
          </div>
        </div>

        <form>
          <p v-if="$fetchState.pending">Fetching teams...</p>
          <p v-else-if="$fetchState.error">An error occurred :(</p>
          <div
            v-else
            class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3 mb-[50px]"
          >
            <div
              v-for="team in teams.data.result.data"
              :key="team.id"
              class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
            >
              <input
                @click="updateTeamId"
                :value="team.id"
                v-model="employee.team_id"
                type="radio"
                name="team_id"
                id="team_id"
                class="absolute inset-0 checked:ring-2 ring-primary rounded-[26px] appearance-none"
              />
              <img
                :src="team.icon"
                alt=""
                class="w-24 h-24 rounded-full object-cover"
              />
              <div class="mt-6 mb-1 font-semibold text-center text-dark">
                {{ team.name }}
              </div>
              <p class="text-center text-grey">
                {{ team.employees_count }} People
              </p>
            </div>
          </div>
          <div class="flex justify-center">
            <button
              v-if="employee.team_id"
              @click="saveEmployee"
              type="button"
              id="continueBtn"
              class="btn btn-primary"
            >
              Continue
            </button>
          </div>
        </form>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      teams: {},
      employee: {
        name: this.$store.state.employee.name,
        email: this.$store.state.employee.email,
        gender: this.$store.state.employee.gender,
        age: this.$store.state.employee.age,
        phone: this.$store.state.employee.phone,
        photo: this.$store.state.employee.photo,
        team_id: null,
        role_id: this.$store.state.employee.role_id,
        company_id: this.$route.params.id,
      },
    }
  },
  async fetch() {
    this.teams = await this.$axios.get('/team', {
      params: { company_id: this.$route.params.id },
    })
  },

  methods: {
    updateTeamId(e) {
      return this.$store.commit('employee/updateTeamId', e.target.value)
    },
    resetState() {
      this.$store.commit('employee/updateName', '')
      this.$store.commit('employee/updateEmail', '')
      this.$store.commit('employee/updateGender', '')
      this.$store.commit('employee/updateAge', '')
      this.$store.commit('employee/updatePhone', '')
      this.$store.commit('employee/updatePhoto', '')
      this.$store.commit('employee/updateTeamId', '')
      this.$store.commit('employee/updateRoleId', '')
      this.$store.commit('employee/updateRoleName', '')
    },
    async saveEmployee() {
      try {
        const formData = new FormData()
        for (let key in this.employee) {
          formData.append(key, this.employee[key])
        }
        // const headers = { 'Content-Type': 'multipart/form-data' }
        let response = await this.$axios.post('/employee', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (response.status == 200) {
          this.$router.push({ name: 'companies-id-employees' })
          // reset state
          this.resetState()
        }
      } catch (error) {
        console.log(error.response.data)
      }
    },
  },
}
</script>
