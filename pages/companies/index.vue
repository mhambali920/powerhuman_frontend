<template>
  <section class="py-[200px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark mb-4">Select Companies</div>
    <div class="w-full card">
      <div class="form-group">
        <label for="" class="text-grey"
          >Companies<span v-show="!selectedCompany"
            >, please select one..,</span
          ></label
        >

        <p v-if="$fetchState.pending">Fetching companies...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <select
          v-else
          v-model="selectedCompany"
          name="companies"
          class="appearance-none input-field form-icon-chevron_down"
        >
          <option
            v-for="company in companies"
            :value="company.id"
            :key="company.id"
          >
            {{ company.name }}
          </option>
        </select>
      </div>
      <button
        @click="openCompany"
        :disabled="!selectedCompany"
        type="button"
        class="w-full btn btn-primary mt-[14px]"
      >
        Continue
      </button>
      <div class="text-center">or</div>
      <NuxtLink
        :to="{ name: 'companies-create' }"
        class="w-full border btn btn-white"
      >
        Create New Company
      </NuxtLink>
    </div>
  </section>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      companies: [],
      selectedCompany: '',
    }
  },
  async fetch() {
    let response = await this.$axios.get('/company?limit=100')
    if (response.status === 200) {
      this.companies = response.data.result.data
    }
    // console.log(response)
  },
  methods: {
    openCompany() {
      this.$store.commit('SET_COMPANY_ID', this.selectedCompany)
      this.$router.push({
        name: 'companies-id',
        params: {
          id: this.selectedCompany,
        },
      })
    },
  },
}
</script>
