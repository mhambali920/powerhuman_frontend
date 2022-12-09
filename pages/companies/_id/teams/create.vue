<template>
  <div>
    <div class="pt-[50px] md:px-[50px] flex justify-between items-center px-4">
      <a href="/index.html">
        <img src="/assets/svgs/logo-type.svg" alt="" />
      </a>
      <a href="#" onclick="history.back()">
        <img src="/assets/svgs/ric-close-white.svg" alt="" />
      </a>
    </div>
    <section class="py-[70px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark">Build New Team</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Team that can bring your company <br />
        growing bigger and bigger
      </p>
      <form @submit.prevent="createTeam" class="w-full card">
        <div class="mb-[2px] mx-auto">
          <img src="/assets/svgs/ric-box.svg" alt="" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Email Address</label>
          <input
            type="email"
            class="input-field disabled:bg-grey disabled:outline-none"
            :value="this.$auth.user.email"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Team Name</label>
          <input type="text" class="input-field" v-model="team.name" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Team Icon</label>
          <input
            type="file"
            class="input-field"
            @change="uploadFile"
            ref="icon"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Status</label>
          <select
            name=""
            id=""
            class="appearance-none input-field form-icon-chevron_down"
          >
            <option value="" selected>Active</option>
            <option value="">Inactive</option>
          </select>
        </div>
        <button type="submit" class="w-full btn btn-primary mt-[14px]">
          Continue
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
      team: {
        name: '',
        icon: '',
        company_id: this.$route.params.id,
      },
    }
  },

  methods: {
    uploadFile() {
      this.team.icon = this.$refs.icon.files[0]
    },
    async createTeam() {
      try {
        const formData = new FormData()
        formData.append('icon', this.team.icon)
        formData.append('name', this.team.name)
        formData.append('company_id', this.team.company_id)
        const headers = { 'Content-Type': 'multipart/form-data' }
        let response = await this.$axios.post('/team', formData, { headers })
        this.$router.push({ name: 'companies-id-teams' })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
