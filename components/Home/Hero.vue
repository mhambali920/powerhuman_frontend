<template>
  <section
    id="home"
    class="flex min-h-screen flex-col lg:flex-row items-center px-4 md:px-16 pt-32 lg:pt-24 bg-white"
  >
    <div data-aos="fade-right" class="basis-1/2 px-4">
      <div class="mb-4">
        <h1
          class="text-2xl md:text-4xl font-bold text-slate-900 leading-relaxed"
        >
          Aplikasi HRIS online untuk optimalkan produktivitas karyawan
        </h1>
        <ul
          class="mt-8 mb-8 font-light marker:text-primary list-disc pl-5 space-y-3 text-slate-500"
        >
          <li class="my-2">
            Efektif dan efisien dalam mengelola sumber daya manusia
          </li>
          <li class="my-2">Tingkatkan produktivitas karyawan Anda</li>
          <li class="my-2">
            Berbasis cloud sehingga data aman dan mudah diakses
          </li>
        </ul>
      </div>
      <div class="mb-8">
        <NuxtLink :to="{ name: 'companies' }" class="btn btn-primary"
          >Get Started</NuxtLink
        >
      </div>
    </div>
    <div data-aos="fade-left" class="basis-1/2">
      <img
        class="w-full animate-wiggle"
        src="@/static/assets/svgs/hris.svg"
        alt=""
      />
    </div>
  </section>
</template>
