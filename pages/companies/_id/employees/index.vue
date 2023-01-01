<template>
  <div>
    <div
      class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0"
    >
      <!-- Top Section -->
      <section
        class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
      >
        <div class="flex items-center justify-between gap-4">
          <ToggleOpenSidebar />
          <div class="text-[32px] font-semibold text-dark">Employees</div>
        </div>
        <div class="flex items-center gap-4">
          <form class="shrink md:w-[516px] w-full">
            <input
              name=""
              id=""
              class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
              placeholder="Search people"
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
              <div class="text-xl font-medium text-dark">Statistics</div>
              <p class="text-grey">Your team powers</p>
            </div>
            <NuxtLink
              :to="{ name: 'companies-id-employees-create' }"
              class="btn btn-primary"
              >Add Employee</NuxtLink
            >
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">In Total</p>
                <div
                  v-if="$fetchState.pending"
                  class="text-[24px] font-bold text-grey mt-[6px]"
                >
                  Loading...
                </div>
                <p v-else-if="$fetchState.error">An error occurred :(</p>
                <div v-else class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ employees.data.result.total }}
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Active</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  205,399
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Inactive</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  142,593
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">People</div>
              <p class="text-grey">The rangers</p>
            </div>
          </div>
        </div>
        <p v-if="$fetchState.pending">Fetching employees...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <div
          v-else
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3"
        >
          <!-- Card -->
          <div
            v-for="employee in employees.data.result.data"
            :key="employee.id"
            class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
          >
            <NuxtLink
              :to="{
                name: 'companies-id-employees-employee',
                params: { employee: employee.id },
              }"
              class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"
            ></NuxtLink>
            <img
              v-if="employee.photo"
              :src="employee.photo"
              class="w-24 h-24 rounded-full"
              alt=""
            />
            <img
              v-else
              :src="imageUrl(employee.gender)"
              class="w-24 h-24 rounded-full"
              alt=""
            />
            <div class="mt-6 mb-1 font-semibold text-center text-dark">
              {{ employee.name }}
            </div>
            <p class="text-center text-grey">{{ employee.role.name }}</p>

            <div
              v-if="employee.is_verified"
              class="mt-[30px] text-success flex items-center gap-[6px]"
            >
              <img src="/assets//svgs/ic-check-circle.svg" alt="" />
              Verified
            </div>
            <a
              v-else
              href="#verify"
              class="text-blue-700 mt-[30px] underline relative z-20"
            >
              Verify Now
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ToggleOpenSidebar from '~/components/ToggleOpenSidebar.vue'

export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      employees: [],
    }
  },
  methods: {
    imageUrl(gender) {
      return gender == 'MALE'
        ? '/assets/images/male.jpg'
        : '/assets/images/female.jpg'
    },
  },
  async fetch() {
    this.employees = await this.$axios.get('/employee', {
      params: {
        company_id: this.$route.params.id,
        team_id: this.$route.params.team_id,
        limit: 100,
        name: this.search,
      },
    })
  },

  components: { ToggleOpenSidebar },
}
</script>
