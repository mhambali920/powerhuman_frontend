<template>
  <div>
    <div class="pt-[20px] md:px-[20px] flex justify-between items-center px-4">
      <a href="/index.html">
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
      },
    }
  },
  methods: {
    async createCompany() {
      try {
        this.$axios.post('/company', this.company).then((response) => {
          // console.log(response)
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
