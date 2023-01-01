<template>
  <div class="min-h-screen bg-white sm:items-center sm:pt-0">
    <section
      ref="navbar"
      class="w-full py-4 fixed backdrop-blur-md z-40 text-gray-700 dark:text-gray-200 dark:bg-gray-800"
    >
      <div
        class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
      >
        <div class="flex flex-row items-center justify-between p-4">
          <NuxtLink :to="{ name: 'companies' }" class="flex justify-center">
            <img src="/assets/svgs/logo-type.svg" alt="" />
          </NuxtLink>
          <button
            class="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
            @click="open = !open"
          >
            <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
              <path
                v-show="!open"
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
              <path
                v-show="open"
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <Transition
          enter-active-class="duration-500 ease-out"
          enter-from-class="-translate-y-6 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="duration-500 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="-translate-y-6 transform opacity-0"
        >
          <nav>
            <ul
              :class="{ flex: open, hidden: !open }"
              class="flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row"
            >
              <li
                class="px-4 cursor-pointer py-2 mt-2 text-sm md:text-base font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-white focus:text-gray-900 hover:bg-primary focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                v-scroll-to="{
                  el: '#home',
                  easing: [0.6, 0.8, 0.3, 1.2],
                  duration: 2000,
                }"
              >
                Home
              </li>
              <li
                class="px-4 cursor-pointer py-2 mt-2 text-sm md:text-base font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-white focus:text-gray-900 hover:bg-primary focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                v-scroll-to="{
                  el: '#feature',
                  easing: [0.6, 0.8, 0.3, 1.2],
                  duration: 2000,
                }"
              >
                Feature
              </li>
              <li
                class="px-4 cursor-pointer py-2 mt-2 text-sm md:text-base font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-white focus:text-gray-900 hover:bg-primary focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                v-scroll-to="{
                  el: '#contact',
                  easing: [0.6, 0.8, 0.3, 1.2],
                  duration: 2000,
                }"
              >
                Contact
              </li>
              <li
                class="px-4 cursor-pointer py-2 mt-2 text-sm md:text-base font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-white focus:text-gray-900 hover:bg-primary focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                v-scroll-to="{
                  el: '#home',
                  easing: [0.6, 0.8, 0.3, 1.2],
                  duration: 2000,
                }"
              >
                Blog
              </li>
            </ul>
          </nav>
        </Transition>
      </div>
    </section>
    <HomeHero />
    <HomeFeature />
    <HomeContact />
    <HomeFooter />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      open: false,
    }
  },
  methods: {
    handleScroll() {
      const navbar = this.$refs.navbar
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg')
      } else {
        navbar.classList.remove('shadow-lg')
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
