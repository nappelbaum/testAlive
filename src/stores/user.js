import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    user: {}
  }),
  actions: {
    editUser(add) {
      this.user = { ...this.user, ...add }
    }
  }
})
