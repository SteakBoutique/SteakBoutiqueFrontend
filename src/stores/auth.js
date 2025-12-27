import { defineStore } from 'pinia'
import { supabase } from '../lib/supabaseClient.ts' 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null
  }),
  actions: {
    async fetchUser() {
      const { data } = await supabase.auth.getSession()
      this.session = data.session
      this.user = data.session?.user || null
    },
    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      this.user = data.user
      this.session = data.session
    },
    async logout() {
      await supabase.auth.signOut()
      this.user = null
      this.session = null
    }
  }
})