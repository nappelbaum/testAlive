<script setup>
import { reactive, onDeactivated } from 'vue'
import { useUser } from '../stores/user'

const user = useUser()

const persInfo = reactive({
  name: '',
  lastName: ''
})

onDeactivated(() => {
  user.editUser(persInfo)
})
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Form 2</div>

        <div class="card-body">
          <form @submit.prevent="">
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
