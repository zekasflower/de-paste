<script setup>
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

const pasted = ref(false)

useEventListener(window, 'paste', () => {
  pasted.value = !pasted.value
})
</script>

<template>
  <section class="flex items-stretch h-screen">
    <section class="flex-1 relative flex items-center justify-center cursor-pointer select-none group">
      <!-- <input type="text" class=""> -->
      <section class="flex flex-col gap-y-4 text-center text-light-400 transition duration-500 group-hover:brightness-75" @click="pasted = !pasted">
        <template v-if="pasted">
          <h1 class="text-8xl">Pasted!</h1>
        </template>
        <template v-else>
          <h1 class="text-8xl">Just paste it</h1>
          <p>You can just CLICK on this section too.</p>
        </template>
      </section>
    </section>
    <!-- <section>
      no don't do
    </section> -->
  </section>

  <Icon icon="heroicons:sun" class="fixed top-6 right-6 text-2xl z-100 cursor-pointer" />
</template>