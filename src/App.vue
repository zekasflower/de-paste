<script setup>
import { ref } from 'vue'
import { useEventListener, watchDebounced, useDark, useToggle } from '@vueuse/core'

const pasted = ref(false)

useEventListener(window, 'paste', () => {
  pasted.value = true
})

watchDebounced(pasted, () => {
  pasted.value = false
}, {debounce: 700})

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <section class="flex items-stretch h-screen">
    <section
      class="flex-1 relative flex items-center justify-center cursor-pointer select-none group"
      @click="pasted = true"
    >
      <!-- <input type="text" class=""> -->
      <section
        class="
          text-center transition duration-500 text-light-400 dark:text-dark-300 group-hover:brightness-75
          dark:group-hover:brightness-125
        "
      >
        <Transition name="fade-fast" mode="out-in">
          <h1 class="text-8xl" v-if="pasted">Pasted!</h1>

          <section class="flex flex-col gap-y-4 " v-else>
            <h1 class="text-8xl">Just paste it</h1>
            <p>You can just CLICK on this section too.</p>
          </section>
        </Transition>
      </section>
    </section>
    <!-- <section>
      no don't do
    </section> -->
  </section>

  <button
    @click="toggleDark()"
    class="fixed top-6 right-6 text-2xl z-100 child:origin-center"
  >
    <Transition name="full-scale" mode="out-in">
      <Icon icon="heroicons:moon" v-if="isDark" />
      <Icon icon="heroicons:sun" v-else />
    </Transition>
  </button>
</template>