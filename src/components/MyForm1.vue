<script setup>
import { reactive, ref } from 'vue'
import { useUser } from '../stores/user'
import FormButtons from './UI/FormButtons.vue'

const user = useUser()
const alert = ref(false)

const login = reactive({
  email: '',
  password: '',
  remember: false
})

defineProps({
  activeIndex: Number,
  formsLength: Number
})

const emit = defineEmits(['Login', 'onClickInc', 'onClickDec'])

const onSubmit = () => {
  if (!login.email || !login.email.includes('@') || !login.password) {
    alert.value = true
    return
  }

  user.editUser(login)
  emit('onClickInc')
}

const onBackward = () => {
  user.editUser(login)
  emit('onClickDec')
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Form 1</div>

        <div class="card-body">
          <form @submit.prevent="onSubmit">
            <div class="row mb-3">
              <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>

              <div class="col-md-6">
                <input
                  v-model="login.email"
                  id="email"
                  type="email"
                  class="form-control"
                  name="email"
                  autocomplete="email"
                  required
                  autofocus
                />
              </div>
            </div>

            <div class="row mb-3">
              <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

              <div class="col-md-6">
                <input
                  v-model="login.password"
                  id="password"
                  type="password"
                  class="form-control"
                  name="password"
                  required
                  autocomplete="current-password"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6 offset-md-4">
                <div class="form-check">
                  <input
                    v-model="login.remember"
                    class="form-check-input"
                    type="checkbox"
                    name="remember"
                    id="remember"
                  />

                  <label class="form-check-label" for="remember"> Remember Me </label>
                </div>
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
