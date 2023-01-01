<template>
  <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
    <!-- Top Section -->
    <section
      class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
    >
      <div class="flex items-center justify-between gap-4">
        <ToggleOpenSidebar />
        <div class="text-[32px] font-semibold text-dark">My Teams</div>
      </div>
      <div class="flex items-center gap-4">
        <form class="shrink md:w-[516px] w-full">
          <input
            type="text"
            name=""
            id=""
            class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
            placeholder="Search people, team, project"
          />
        </form>
        <a
          href="#"
          class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot"
        >
          <img src="/assets/svgs/ic-bell.svg" alt="" />
        </a>
      </div>
    </section>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div
          class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row"
        >
          <div>
            <div class="text-xl font-medium text-dark">Available</div>
            <p class="text-grey">Empower company</p>
          </div>
          <NuxtLink
            :to="{ name: 'companies-id-teams-create' }"
            class="btn btn-primary"
            >Build New Team</NuxtLink
          >
        </div>
      </div>

      <p v-if="$fetchState.pending">Fetching teams...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p>
      <div
        v-else
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3"
      >
        <div
          v-for="team in teams.data.result.data"
          :key="team.id"
          class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
        >
          <NuxtLink
            :to="{
              name: 'companies-id-employees',
              params: { team_id: team.id },
            }"
            class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"
          ></NuxtLink>
          <img
            v-if="team.icon"
            :src="team.icon"
            alt=""
            class="w-24 h-24 rounded-full object-cover"
          />
          <img
            v-else
            src="https://ui-avatars.com/api/?name=M+H&color=7F9CF5&background=EBF4FF"
            alt=""
          />
          <div class="mt-6 mb-1 font-semibold text-center text-dark">
            {{ team.name }}
          </div>
          <p class="text-center text-grey">{{ team.employees_count }} People</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      teams: [],
    }
  },
  async fetch() {
    this.teams = await this.$axios.get('/team', {
      params: { company_id: this.$route.params.id },
    })
  },
}
</script>
