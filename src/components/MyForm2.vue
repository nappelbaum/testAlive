<script setup>
import { reactive, ref } from 'vue'
import { useUser } from '../stores/user'
import FormButtons from './UI/FormButtons.vue'

const user = useUser()
const alert = ref(false)

const persInfo = reactive({
  name: '',
  lastName: ''
})

defineProps({
  activeIndex: Number,
  formsLength: Number
})

const emit = defineEmits(['Name', 'onClickInc', 'onClickDec'])

const onSubmit = () => {
  if (!persInfo.name || !persInfo.lastName) {
    alert.value = true
    return
  }

  user.editUser(persInfo)
  emit('onClickInc')
}

const onBackward = () => {
  user.editUser(persInfo)
  emit('onClickDec')
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Form 2</div>

        <div class="card-body">
          <form @submit.prevent="onSubmit">
            <div class="row mb-3">
              <label for="name" class="col-md-4 col-form-label text-md-end">Your name</label>

              <div class="col-md-6">
                <input
                  v-model="persInfo.name"
                  id="name"
                  type="text"
                  class="form-control"
                  name="name"
                  required
                  autocomplete="name"
                  autofocus
                />
              </div>
            </div>

            <div class="row mb-3">
              <label for="lastName" class="col-md-4 col-form-label text-md-end"
                >Your lastName</label
              >

              <div class="col-md-6">
                <input
                  v-model="persInfo.lastName"
                  id="lastName"
                  type="text"
                  class="form-control"
                  name="lastName"
                  required
                  autocomplete="lastName"
                />
              </div>
            </div>

            <p v-if="alert" class="text-danger fw-bold text-center">
              Проверьте правильность заполненных данных
            </p>
            <form-buttons
              :activeIndex="activeIndex"
              :formsLength="formsLength"
              @onBackward="onBackward"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
