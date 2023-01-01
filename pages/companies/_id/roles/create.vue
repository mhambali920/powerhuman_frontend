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
      <div class="text-[32px] font-semibold text-dark">New Role</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Manage your employees to achieve <br />
        a bigger goals for your company
      </p>
      <form @submit.prevent="addRole" class="w-full card">
        <div class="form-group">
          <label for="" class="text-grey">Role Name</label>
          <input
            v-model="role.name"
            type="text"
            class="input-field"
            placeholder="e.g Product Marketing"
          />
          <p v-if="errors.name" class="text-red-500 text-xs">
            {{ errors.name[0] }}
          </p>
        </div>
        <div class="form-group">
          <label for="idRes" class="text-grey">Responsibility</label>
          <ul id="listResp" class="flex flex-col gap-4">
            <li
              v-for="(resp, index) in responsibilities"
              :key="index"
              class="inline-flex items-center w-full gap-5"
            >
              <input
                v-model="resp.name"
                type="text"
                id="idRes"
                name="responsibility"
                class="w-full input-field"
              />
              <span
                @click="addResponsibility"
                class="cursor-pointer"
                v-show="index === responsibilities.length - 1"
              >
                <img src="/assets/svgs/ric-plus.svg" alt="" />
              </span>
              <span
                @click="removeResponsibility(index)"
                class="cursor-pointer"
                v-show="index !== responsibilities.length - 1"
              >
                <img src="/assets/svgs/ric-close-red.svg" alt="" />
              </span>
            </li>
          </ul>
        </div>
        <button
          :disabled="filteredRsp.length == 0"
          type="submit"
          class="w-full btn btn-primary mt-[14px] disabled:bg-opacity-75"
        >
          Save Role
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
      role: {
        name: '',
        company_id: this.$route.params.id,
      },
      responsibilities: [
        {
          name: '',
        },
      ],
      errors: [],
    }
  },
  computed: {
    filteredRsp() {
      return this.responsibilities.filter((e) => e.name)
    },
  },
  methods: {
    addResponsibility() {
      this.responsibilities.push({
        name: '',
      })
    },
    removeResponsibility(index) {
      this.responsibilities.splice(index, 1)
    },
    // TODO: jika di lihat dari tampilan ini berarti create role sekaligu create responsibility
    async addRole() {
      try {
        if (this.filteredRsp.length) {
          let res = await this.$axios.post('/role', this.role)
          // console.log(res)
          if (res.status === 200) {
            let res2 = await this.$axios.post('/responsibilities', {
              name: this.filteredRsp,
              role_id: res.data.result.id,
              company_id: this.$route.params.id,
            })
            console.log(res2)
            if (res2.status === 200) {
              this.$router.push({ name: 'companies-id-roles' })
            } else {
              console.log('gagal redirect')
            }
          }
        }
      } catch (error) {
        console.log(error.response)
        this.errors = error.response.data.errors
      }
    },
  },
}
</script>
