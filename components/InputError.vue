<template>
  <div>
    <p v-for="(val, index) in errors" :key="index" class="text-red-500 text-xs">
      {{ val }}
    </p>
  </div>
</template>
<script>
export default {
  props: ['errors'],
}
</script>
