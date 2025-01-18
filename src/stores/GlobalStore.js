import { defineStore, acceptHMRUpdate } from 'pinia'


export const useGlobalStore = defineStore('GlobalStore', {
  state: () => {
    return {
      history: [],
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}