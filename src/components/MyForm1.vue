<script setup>
import { onDeactivated, reactive } from 'vue'
import { useUser } from '../stores/user'

const user = useUser()

const login = reactive({
  email: '',
  password: '',
  remember: false
})

onDeactivated(() => {
  user.editUser(login)
})
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Form 1</div>

        <div class="card-body">
          <form @submit.prevent="">
            <div class="row mb-3">
              <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>

              <div class="col-md-6">
                <input
                  v-model="login.email"
                  id="email"
                  type="email"
                  class="form-control"
                  name="email"
                  required
                  autocomplete="email"
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
