<script setup>
import { onMounted, nextTick, ref } from 'vue'
import { useUser } from '../stores/user'
import { shallowRef } from 'vue'
import { useAnimate } from '@vueuse/core'
import DropZone from './DropZone.vue'

const user = useUser()

const el = shallowRef()
const el2 = shallowRef()

const add = ref(false)
const animDuration = 1000

const addClick = (e) => {
  const button = e.currentTarget
  button.disabled = true
  add.value = true
  anim2.play()
  setTimeout(() => {
    add.value = false
    button.disabled = false
  }, animDuration)
}

const anim1 = useAnimate(
  el,
  [
    { clipPath: 'circle(20% at 0% 30%)' },
    { clipPath: 'circle(20% at 50% 80%)' },
    { clipPath: 'circle(20% at 100% 30%)' }
  ],
  {
    duration: 3000,
    iterations: 2,
    direction: 'alternate',
    easing: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)',
    fill: 'forwards'
  }
)

const anim2 = useAnimate(
  el2,
  [
    { clipPath: 'polygon(-100% 0, 0 0, 0 100%, -100% 100%)', opacity: '1' },
    { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: '1', offset: 0.85 },
    { opacity: '0' }
  ],
  {
    duration: animDuration,
    iterations: 1,
    // direction: 'alternate',
    easing: 'cubic-bezier(0.06, 0.03, 0.52, 0.96)'
  }
)

onMounted(async () => {
  console.log(user.user)

  await nextTick()
  // cancel()
})
</script>

<template>
  <drop-zone />

  <div class="row justify-content-center">
    <h2>Вы будете перенаправлены на страницу оплаты</h2>
  </div>

  <div>
    <div class="d-flex align-items-center justify-content-center w-100 h-50">
      <p ref="el" class="fs-1 text-success text-opacity-75 fw-bold">VueUse useAnimate</p>
    </div>
    <div>
      <button v-if="anim1.playState === 'running'" @click="anim1.pause">pause</button>
      <button v-else @click="anim1.play">play</button>
      <button @click="anim1.reverse">reverse</button>
      <button @click="anim1.finish">finish</button>
      <button @click="anim1.cancel">cancel</button>
    </div>
  </div>

  <div class="mt-5">
    <button
      @click="addClick"
      class="my-button px-5 py-3 mb-3 d-flex align-items-center justify-content-center"
    >
      <transition name="modal"><span v-if="!add" class="fs-5">Добавить</span></transition>

      <div class="suffer" v-show="add" ref="el2">
        <img width="40" src="/img/home.svg" alt="" />
      </div>
    </button>
    <div>
      <button v-if="anim2.playState === 'running'" @click="anim2.pause">pause</button>
      <button v-else @click="anim2.play">play</button>
      <button @click="anim2.reverse">reverse</button>
      <button @click="anim2.finish">finish</button>
      <button @click="anim2.cancel">cancel</button>
    </div>
  </div>
</template>

<style>
.my-button {
  position: relative;
  min-height: 70px;
  min-width: 200px;
  border: solid 1px #b9b9b9;
  border-radius: 5px;
  background-color: transparent;
  transition: all 0.3s;
}
.my-button:hover {
  background-color: rgb(241, 241, 241);
  color: rgb(65, 65, 65);
}
.my-button:active {
  background-color: rgb(241, 241, 241) !important;
  color: rgb(65, 65, 65) !important;
}

.suffer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
