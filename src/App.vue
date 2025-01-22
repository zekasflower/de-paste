<script setup>
import { ref } from 'vue'
import { useEventListener, watchDebounced, useDark, useToggle } from '@vueuse/core'
import { useGlobalStore } from '@/stores/GlobalStore';

const store = useGlobalStore()

const pasted = ref(false)

const handlePaste = () => {
  pasted.value = true
  let arr = []
  store.history.unshift({
    key: 'key-1',
    id: 'id-1',
    text: new Date(),
    checked: false,
    hovered: false,
  })
}

const handleCopy = () => {
  console.log('is copied')
}

useEventListener(window, 'paste', () => {
  handlePaste()
})

watchDebounced(pasted, () => {
  pasted.value = false
}, {debounce: 1000})

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <section class="flex items-stretch h-screen">
    <section
      class="
        flex-1 relative flex items-center justify-center cursor-pointer select-none group border-r-2
        dark:border-dark-500
      "
      @click="handlePaste"
      :class="{ 'pointer-events-none': pasted }"
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
    <aside
      class="w-[440px] flex flex-col child:w-full overflow-hidden"
      v-if="store.history?.length"
    >
      <header class="p-6">
        <h3 class="text-xl font-medium w-fit">History</h3>
      </header>
      <section class="grow overflow-y-auto px-6 scrollbar-hide flex flex-col gap-y-4">
        <template v-for="(element, index) in store.history" :key="element.key">
          <section
            class="flex items-center gap-x-2 px-4 py-3 rounded-md bg-light-100 dark:bg-dark-500 child:flex-none transition duration-300 hover:brightness-95 dark:hover:brightness-110 cursor-pointer"
            @mouseenter="element.hovered = true"
            @mouseleave="element.hovered = false"
            @click="handleCopy"
          >
            <label class="select-none cursor-pointer flex-none" @click.stop>
              <Icon
                icon="heroicons:check"
                class="w-5 h-5 text-light-100 dark:text-dark-700 rounded border border-light-700 dark:border-dark-300 transition-all duration-300"
                :class="element.checked ? 'bg-light-700 dark:bg-dark-300 child:opacity-100' : 'bg-white dark:bg-dark-700 child:opacity-0'"
              />
              <input type="checkbox" v-model="element.checked" hidden />
            </label>

            <p
              class="line-clamp-1 !flex-1"
              :class="{ 'text-center': element.hovered }"
              v-text="element.hovered ? 'Copy!' : element.text"
            />

            <button
              class="text-2xl transition duration-300 hover:text-light-900 dark:text-dark-200 dark:hover:text-dark-100"
              >
              <!-- v-if="element.hovered" -->
              <Icon icon="heroicons:clipboard" />
            </button>

            <button
              class="text-2xl text-rose-700 dark:text-rose-600 transition duration-300 hover:text-rose-800 dark:hover:text-rose-500"
              @click.stop="store.history.splice(index, 1)"
              >
              <!-- v-if="element.hovered" -->
              <Icon icon="heroicons:trash" />
            </button>
          </section>
        </template>
      </section>
      <footer class="p-6 border-t-2 dark:border-dark-500 flex justify-end">
        <button class="text-light-100 bg-light-700 dark:bg-dark-200 dark:text-dark-700 rounded px-6 py-2">
          Clear All
        </button>
      </footer>
    </aside>
  </section>

  <button
    @click="toggleDark()"
    class="fixed top-3 right-3 text-2xl z-100 child:origin-center p-3"
  >
  <!-- <Transition name="fade" mode="out-in"> -->
    <Icon icon="heroicons:moon" v-if="isDark" />
    <Icon icon="heroicons:sun" v-else />
  <!-- </Transition> -->
  </button>
</template>