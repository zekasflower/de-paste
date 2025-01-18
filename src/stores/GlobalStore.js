import { defineStore, acceptHMRUpdate } from 'pinia'


export const useGlobalStore = defineStore('GlobalStore', {
  state: () => {
    return {
      editor: {
        mode: 'edit', // edit - preview
        screen: 'desktop' // desktop - tablet - mobile
      }

    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}