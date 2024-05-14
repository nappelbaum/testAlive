<script setup>
defineProps({
  activeIndex: Number,
  formsLength: Number
})

const emit = defineEmits(['onBackward'])
</script>

<template>
  <div class="d-flex gap-4 mx-auto my-3 justify-content-center">
    <div v-if="activeIndex && activeIndex < formsLength - 1">
      <button @click.prevent="emit('onBackward')" type="button" class="btn btn-primary">
        {{ '<' }}- НАЗАД
      </button>
    </div>
    <div>
      <button type="submit" class="btn btn-primary">ДАЛЕЕ -></button>
    </div>
  </div>
</template>
