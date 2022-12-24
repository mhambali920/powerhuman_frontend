<template>
  <button @click="openSidebar" id="toggleOpenSidebar" class="lg:hidden">
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
        d="M4 6h16M4 12h16M4 18h7"
      ></path>
    </svg>
  </button>
</template>
<script>
export default {
  methods: {
    openSidebar() {
      this.$store.commit('SET_SIDEBAR_VISIBLE', true)
    },
  },
}
</script>
