<template>
  <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
    <!-- Top Section -->
    <section
      class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
    >
      <div class="flex items-center justify-between gap-4">
        <ToggleOpenSidebar />
        <div class="text-[32px] font-semibold text-dark">
          insurances omingsoon...
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'dashboard',
}
</script>
