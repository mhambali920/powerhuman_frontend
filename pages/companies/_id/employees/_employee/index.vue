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
          <div class="text-[32px] font-semibold text-dark">
            Employee Details
          </div>
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
      <section v-if="$fetchState.pending">Loading...</section>
      <section
        v-else-if="$fetchState.error"
        class="absolute inset-20 flex items-center justify-center p-24"
      >
        <div class="text-red-500 text-xl text-center">An error occurred</div>
      </section>
      <section v-else class="pt-[50px] md:flex gap-2 space-y-4 md:space-y-0">
        <div>
          <figure
            class="bg-white rounded-xl p-8 w-full md:w-64 dark:bg-slate-800 overflow-hidden"
          >
            <img
              v-if="employee.photo"
              class="w-24 h-24 rounded-full mx-auto object-cover"
              :src="employee.photo"
              alt=""
              width="384"
              height="512"
            />
            <img
              v-else
              class="w-24 h-24 rounded-full mx-auto object-cover"
              :src="imageUrl"
              alt=""
              width="384"
              height="512"
            />

            <div class="pt-6 text-center space-y-4">
              <figcaption class="font-medium">
                <div class="text-primary dark:text-sky-400">
                  {{ employee.name }}
                </div>
                <div class="text-slate-700 dark:text-slate-500">
                  {{ employee.role.name }}, {{ employee.company.name }}
                </div>
              </figcaption>
            </div>
          </figure>
        </div>
        <div
          class="bg-white rounded-xl p-8 w-full dark:bg-slate-800 overflow-hidden"
        >
          <div class="md:grid grid-cols-2 gap-2 lg:grid-cols-3 mb-4">
            <div class="text-grey font-medium">Email Address</div>
            <div class="col-span-2">{{ employee.email }}</div>
          </div>
          <div class="md:grid grid-cols-2 gap-2 lg:grid-cols-3 mb-4">
            <div class="text-grey font-medium">Phone</div>
            <div class="col-span-2">{{ employee.phone }}</div>
          </div>
          <div class="md:grid grid-cols-2 gap-2 lg:grid-cols-3 mb-4">
            <div class="text-grey font-medium">Gender</div>
            <div class="col-span-2">{{ employee.gender }}</div>
          </div>
          <div class="md:grid grid-cols-2 gap-2 lg:grid-cols-3 mb-4">
            <div class="text-grey font-medium">Age</div>
            <div class="col-span-2">{{ employee.age }}</div>
          </div>
          <div class="md:grid grid-cols-2 gap-2 lg:grid-cols-3 mb-4">
            <div class="text-grey font-medium">Role</div>
            <div class="col-span-2">{{ employee.role.name }}</div>
          </div>
          <div class="md:grid grid-cols-2 gap-2 lg:grid-cols-3 mb-4">
            <div class="text-grey font-medium">Team</div>
            <div class="col-span-2">{{ employee.team.name }}</div>
          </div>
          <div class="md:grid grid-cols-2 gap-2 lg:grid-cols-3 mb-4">
            <div class="text-grey font-medium">Company</div>
            <div class="col-span-2">{{ employee.company.name }}</div>
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
      employee: {},
    }
  },
  async fetch() {
    let response = await this.$axios.get('/employee', {
      params: {
        id: this.$route.params.employee,
        company_id: this.$route.params.id,
      },
    })
    if (response.status == 200) this.employee = response.data.result
  },
  computed: {
    imageUrl() {
      if (!this.employee.photo) {
        return this.employee.gender == 'MALE'
          ? '/assets/images/male.jpg'
          : '/assets/images/female.jpg'
      }
    },
  },
  components: { ToggleOpenSidebar },
}
</script>
