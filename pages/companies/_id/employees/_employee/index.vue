<template>
  <div>
    <div
      class="py-[25px] md:px-[50px] w-full bg-page flex justify-between items-center px-4 fixed z-[9999]"
    >
      <a href="/index.html">
        <img src="/assets/svgs/logo-type.svg" alt="" />
      </a>
      <a href="#" onclick="history.back()">
        <img src="/assets/svgs/ric-close-white.svg" alt="" />
      </a>
    </div>
    <section class="py-[150px] flex flex-col items-center justify-center px-4">
      <p v-if="$fetchState.pending">Fetching employee...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p>
      <div
        v-else
        class="overflow-hidden w-full flex flex-col bg-gradient-to-br from-primary to-blue-600 hover:bg-gradient-to-tl text-white relative p-6 rounded-[26px] md:max-w-4xl"
      >
        <div class="flex flex-col md:flex-row md:justify-around gap-y-4">
          <div
            class="flex items-center justify-center bg-transparent border-2 border-white w-40 h-40 rounded-full"
          >
            <img
              v-if="employee.photo"
              :src="employee.photo"
              class="w-36 h-36 rounded-full"
              alt=""
            />
            <img
              v-else
              :src="imageUrl(employee.gender)"
              class="w-36 h-36 rounded-full"
              alt=""
            />
          </div>
          <!-- basic info -->
          <div class="px-4">
            <p class="text-2xl">{{ employee.name.toUpperCase() }}</p>
            <p class="text-sm font-extralight mb-4">
              {{
                employee.gender.toLowerCase() +
                ', ' +
                employee.age +
                ' year old'
              }}
            </p>
            <div class="mb-2">
              <Icon name="phone" class="inline mr-2" />
              <span class="font-light">{{ employee.phone }}</span>
            </div>
            <div class="mb-2">
              <Icon name="email" class="inline mr-2" />
              <span class="font-light">{{ employee.email }}</span>
            </div>
          </div>
          <!-- info -->
          <div
            class="px-4 pt-7 md:pt-0 border-t-2 md:border-t-0 md:border-l-2 border-white"
          >
            <p class="mb-4 font-semibold">
              {{ employee.role.name + ' - ' + employee.company.name }}
            </p>
            <p class="mb-1">
              Team : <span class="font-light">{{ employee.team.name }}</span>
            </p>
            <p class="mb-4">
              Status :
              <span class="font-light">{{
                employee.is_verified ? 'Active' : 'Inactive'
              }}</span>
            </p>

            <p class="mb-2">Responsibilities :</p>
            <ul>
              <li
                v-for="resp in employee.role.responsibilities"
                :key="resp.id"
                class="font-extralight"
              >
                - {{ resp.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="flex items-center justify-center p-8 mt-12 gap-8">
          <FancyButton>Edit</FancyButton>
          <FancyButton>{{
            employee.is_verified ? 'INACTIVATE' : 'ACTIVATE'
          }}</FancyButton>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import FancyButton from '~/components/FancyButton.vue'
import Icon from '~/components/Icon.vue'
export default {
  middleware: 'auth',

  data() {
    return {
      employee: {},
    }
  },

  methods: {
    async fetchData() {
      let {
        data: { result },
      } = await this.$axios.get('/employee', {
        params: {
          company_id: this.$route.params.id,
          id: this.$route.params.employee,
        },
      })
      this.employee = result
    },
    imageUrl(gender) {
      return gender == 'MALE'
        ? '/assets/images/male.jpg'
        : '/assets/images/female.jpg'
    },
  },
  async fetch() {
    await this.fetchData()
  },
  components: { Icon, FancyButton },
}
</script>
