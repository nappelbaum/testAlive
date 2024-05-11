<script setup>
import NavBar from './components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'
import { computed, onBeforeMount, ref, shallowRef } from 'vue'

const forms = shallowRef([])
const activeIndex = ref(null)
const activeComponent = computed(() => forms.value[activeIndex.value])

const onClickInc = () => {
  if (activeIndex.value < forms.value.length - 1 && activeIndex.value > -1) activeIndex.value++
}
const onClickDec = () => {
  if (activeIndex.value > 0 && activeIndex.value < forms.value.length - 1) activeIndex.value--
}

onBeforeMount(async () => {
  let formNumber = 1
  let nextForm = true

  while (nextForm) {
    try {
      const form = await import(`./components/MyForm${formNumber}.vue`)
      forms.value.push(form?.default)
      formNumber++
    } catch (err) {
      nextForm = false
    }
  }

  console.log(forms.value)
  activeIndex.value = 0
})
</script>

<template>
  <nav-bar />

  <main class="main py-5">
    <div class="container-xxl">
      <KeepAlive>
        <component :is="activeComponent" />
      </KeepAlive>

      <div class="d-flex gap-4 mx-auto my-3 justify-content-center">
        <div v-if="activeIndex && activeIndex < forms.length - 1">
          <button @click="onClickDec" type="submit" class="btn btn-primary">
            {{ '<' }}- НАЗАД
          </button>
        </div>
        <div v-if="activeIndex < forms.length - 1">
          <button @click="onClickInc" type="submit" class="btn btn-primary">ДАЛЕЕ -></button>
        </div>
      </div>
    </div>
  </main>
  <my-footer />
</template>

<style>
@import './styles/_main.scss';
</style>
