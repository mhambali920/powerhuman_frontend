<template>
  <div>
    <!-- Sidebar -->
    <DashboardSidebar />
    <!-- Main Content -->
    <Nuxt />
  </div>
</template>
<script>
export default {
  watch: {
    $route() {
      this.$store.commit('SET_SIDEBAR_VISIBLE', false)
    },
  },
}
</script>
