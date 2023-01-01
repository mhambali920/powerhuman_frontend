<template>
  <Home />
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
export default {
  name: 'IndexPage',
  mounted() {
    AOS.init()
  },
}
</script>
