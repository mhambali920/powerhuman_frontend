<template>
  <div>
    <!-- Main Content -->
    <div
      class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0"
    >
      <!-- Top Section -->
      <section
        class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
      >
        <div class="flex items-center justify-between gap-4">
          <ToggleOpenSidebar />
          <div class="text-[32px] font-semibold text-dark">Company Roles</div>
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
              :to="{ name: 'companies-id-roles-create' }"
              class="btn btn-primary"
              >New Role</NuxtLink
            >
          </div>
        </div>
        <p v-if="$fetchState.pending">Fetching roles...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          <div
            v-for="role in roles.data.result.data"
            :key="role.id"
            class="items-center card !flex-row gap-4"
          >
            <a
              href="#"
              class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"
            ></a>
            <img src="/assets/svgs/ric-flag.svg" alt="" />
            <div>
              <div class="mb-1 font-semibold text-dark">{{ role.name }}</div>
              <p class="text-grey">
                {{ role.employees_count }} people assigned
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'dashboard',

  data() {
    return {
      roles: [],
    }
  },

  async fetch() {
    this.roles = await this.$axios.get('/role', {
      params: { company_id: this.$route.params.id },
    })
  },
}
</script>
