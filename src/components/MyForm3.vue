<script setup>
import { onDeactivated, reactive } from 'vue'
import { useUser } from '../stores/user'

const user = useUser()

const login2 = reactive({
  email2: '',
  password2: '',
  remember2: false
})

onDeactivated(() => {
  user.editUser(login2)
})
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Form 3</div>

        <div class="card-body">
          <form @submit.prevent="">
            <div class="row mb-3">
              <label for="email2" class="col-md-4 col-form-label text-md-end">email2 Address</label>

              <div class="col-md-6">
                <input
                  v-model="login2.email2"
                  id="email2"
                  type="email"
                  class="form-control"
                  name="email2"
                  required
                  autocomplete="email"
                  autofocus
                />
              </div>
            </div>

            <div class="row mb-3">
              <label for="password2" class="col-md-4 col-form-label text-md-end">Password2</label>

              <div class="col-md-6">
                <input
                  v-model="login2.password2"
                  id="password2"
                  type="password"
                  class="form-control"
                  name="password2"
                  required
                  autocomplete="current-password"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6 offset-md-4">
                <div class="form-check">
                  <input
                    v-model="login2.remember2"
                    class="form-check-input"
                    type="checkbox"
                    name="remember2"
                    id="remember2"
                  />

                  <label class="form-check-label" for="remember2"> Remember Me </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
