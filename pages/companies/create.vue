<template>
  <div>
    <div class="pt-[20px] md:px-[20px] flex justify-between items-center px-4">
      <a href="#">
        <img src="/assets/svgs/logo-type.svg" alt="" />
      </a>
      <a href="#" onclick="history.back()">
        <img src="/assets/svgs/ric-close-white.svg" alt="" />
      </a>
    </div>

    <section class="py-[70px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark mb-4">
        Create Companies
      </div>
      <form class="w-full card" @submit.prevent="createCompany">
        <div class="form-group">
          <label for="" class="text-grey">Name</label>
          <input
            type="text"
            class="input-field"
            name="name"
            v-model="company.name"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Logo</label>
          <input
            type="file"
            class="input-field file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            @change="uploadFile"
            ref="logo"
          />
        </div>
        <button type="submit" class="w-full btn btn-primary mt-[14px]">
          Save
        </button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      company: {
        name: '',
        logo: null,
      },
    }
  },
  methods: {
    uploadFile() {
      this.company.logo = this.$refs.logo.files[0]
    },
    async createCompany() {
      const formData = new FormData()
      formData.append('name', this.company.name)
      formData.append('logo', this.company.logo)
      const headers = { 'Content-Type': 'multipart/form-data' }
      try {
        this.$axios.post('/company', formData, { headers }).then((response) => {
          this.$store.commit('SET_COMPANY_ID', response.data.result.id)
          this.$router.push({
            name: 'companies-id',
            params: {
              id: response.data.result.id,
            },
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
