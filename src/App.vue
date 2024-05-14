<script setup>
import NavBar from './components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'
import { computed, onBeforeMount, ref, shallowRef } from 'vue'

const forms = shallowRef([])
const activeIndex = ref(null)
const activeComponent = computed(() => forms.value[activeIndex.value])

const onClickInc = () => {
  if (activeIndex.value < forms.value.length - 1 && activeIndex.value > -1) {
    activeIndex.value++
  }
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
      <div class="d-flex gap-3">
        <span
          v-for="(form, i) in forms"
          :key="form.__name"
          :class="{ 'text-danger': i === activeIndex }"
          >{{ form.emits[0] }}</span
        >
      </div>
      <KeepAlive>
        <component
          :is="activeComponent"
          @onClickInc="onClickInc"
          @onClickDec="onClickDec"
          :activeIndex="activeIndex"
          :formsLength="forms.length"
        />
      </KeepAlive>
    </div>
  </main>
  <my-footer />
</template>

<style>
@import './styles/_main.scss';
</style>
