<template>
  <div
    :class="{ hidden: !toggleSidebar }"
    class="lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[999]"
    id="sidebarHRIS"
  >
    <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
      <div class="flex items-center justify-between">
        <NuxtLink :to="{ name: 'companies' }" class="flex justify-center">
          <img src="/assets/svgs/logo-type.svg" alt="" />
        </NuxtLink>
        <button @click="closeSidebar" id="toggleCloseSidebar" class="lg:hidden">
          <svg
            class="w-6 h-6 text-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-sm text-grey">Daily Use</div>
        <NuxtLink :to="{ name: 'companies-id' }" class="nav-link">
          <img src="/assets/svgs/ic-grid.svg" alt="" />
          Overview
        </NuxtLink>
        <NuxtLink :to="{ name: 'companies-id-employees' }" class="nav-link">
          <img src="/assets/svgs/ic-users.svg" alt="" />
          Employees
        </NuxtLink>
        <NuxtLink :to="{ name: 'companies-id-teams' }" class="nav-link">
          <img src="/assets/svgs/ic-briefcase.svg" alt="" />
          My Teams
        </NuxtLink>
        <NuxtLink :to="{ name: 'companies-id-roles' }" class="nav-link">
          <img src="/assets/svgs/ic-flag.svg" alt="" />
          Roles
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-sm text-grey">Others</div>
        <NuxtLink :to="{ name: 'insurances' }" class="nav-link">
          <img src="/assets/svgs/ic-box.svg" alt="" />
          Insurances
        </NuxtLink>
        <NuxtLink :to="{ name: 'companies' }" class="nav-link">
          <img src="/assets/svgs/ic-home.svg" alt="" />
          Company
        </NuxtLink>
        <NuxtLink :to="{ name: 'rewards' }" class="nav-link">
          <img src="/assets/svgs/ic-gift.svg" alt="" />
          Rewards
        </NuxtLink>
        <NuxtLink :to="{ name: 'settings' }" class="nav-link">
          <img src="/assets/svgs/ic-settings.svg" alt="" />
          Settings
        </NuxtLink>
        <button @click="$auth.logout()" class="nav-link">
          <img src="/assets/svgs/ic-signout.svg" alt="" />
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    toggleSidebar: {
      get() {
        return this.$store.state.sidebarOpen
      },
      set(value) {
        this.$store.commit('SET_SIDEBAR_VISIBLE', value)
      },
    },
  },
  methods: {
    closeSidebar() {
      this.toggleSidebar = false
    },
  },
}
</script>
