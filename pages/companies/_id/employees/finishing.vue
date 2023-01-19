<template>
  <div>
    <div class="pt-[50px] md:px-[50px] flex justify-between items-center px-4">
      <NuxtLink :to="{ name: 'companies-id' }">
        <img src="/assets/svgs/logo-type.svg" alt="" />
      </NuxtLink>
      <a href="#" onclick="history.back()">
        <img src="/assets/svgs/ric-close-white.svg" alt="" />
      </a>
    </div>
    <section class="py-[70px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark">Finalizing Profile</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Complete the information to make it more <br />
        easier when introduce to team
      </p>
      <form class="w-full card">
        <div class="flex flex-col items-center mb-[14px]">
          <!-- <img src="/assets/images/user-f-1.png" width="70" alt="" /> -->
          <img
            v-if="photo"
            :src="photo"
            class="w-24 h-24 rounded-full"
            alt="foto"
          />
          <div class="mt-6 mb-1 text-lg font-semibold">
            {{ this.$store.state.employee.name }}
          </div>
          <p class="text-base text-grey">
            {{ this.$store.state.employee.email }}
          </p>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Phone Number</label>
          <input
            type="number"
            class="input-field"
            :value="phone"
            @input="updatePhone"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Photo</label>
          <input
            type="file"
            @change="updatePhoto"
            class="input-field file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <NuxtLink
          :to="{ name: 'companies-id-employees-addrole' }"
          class="w-full btn btn-primary mt-[14px]"
        >
          Continue
        </NuxtLink>
      </form>
    </section>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      photo: null,
    }
  },
  computed: {
    phone() {
      return this.$store.state.employee.phone
    },
  },
  methods: {
    updatePhone(e) {
      this.$store.commit('employee/updatePhone', e.target.value)
    },
    updatePhoto(e) {
      // console.log(e.target.files[0])
      // kirim file ke action vuex
      this.$store.dispatch('employee/uploadPhoto', e.target.files[0])

      // create url photo
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onloadend = () => {
        this.photo = reader.result
      }
    },
  },
}
</script>
