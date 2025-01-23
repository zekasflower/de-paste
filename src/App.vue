<script setup>
import { computed, ref } from 'vue'
import { useEventListener, watchDebounced, useDark, useToggle, useStorage } from '@vueuse/core'
import { UseClipboard } from '@vueuse/components'

const history = useStorage('history', [])

const isDark = useDark()
const toggleDark = useToggle(isDark)

const pasted = ref(false)

const isSelectedItems = computed(
  () => !!(history.value.find(element => element.selected))
)
const clearSelected = () => {
  history.value = history.value.filter(element => !element.selected)
}

const handlePaste = () => {
  if (pasted.value) return

  pasted.value = true
  const getRandom = Math.random().toString(36).slice(2, 10)
  const itemKey = `key-${getRandom}`
  const itemId = `id-${getRandom}`

  navigator.clipboard.readText()
    .then(text => {
      history.value.unshift({
        key: itemKey,
        id: itemId,
        text: text,
        selected: false,
        hovered: false,
      })
    })
}

useEventListener(window, 'paste', () => {
  handlePaste()
})

watchDebounced(pasted, () => {
  pasted.value = false
}, {debounce: 1500})
</script>

<template>
  <section class="flex items-stretch h-screen">
    <!-- Just Paste It Section -->
    <section
      class="
        flex-1 relative flex items-center justify-center cursor-pointer group border-r-2
        dark:border-dark-500
      "
      @click="handlePaste"
    >
      <section
        class="
          text-center text-light-400 dark:text-dark-300 group-hover:brightness-75
          dark:group-hover:brightness-125
        "
      >
          <h1 class="text-8xl" v-if="pasted">Pasted!</h1>

          <section class="flex flex-col gap-y-4 " v-else>
            <h1 class="text-8xl">Just paste it</h1>
            <p>You can just CLICK on this section too.</p>
          </section>
      </section>
    </section>

    <!-- Start of History -->
    <aside
      class="w-[440px] flex flex-col child:w-full overflow-hidden"
      v-if="history?.length"
    >
      <header class="p-6">
        <h3 class="text-xl font-medium w-fit">History</h3>
      </header>

      <section class="grow overflow-y-auto px-6 scrollbar-hide flex flex-col gap-y-4">
        <template v-for="(element, index) in history" :key="element.key">
          <UseClipboard v-slot="{ copy, copied }" :source="element.text">
            <section
              class="
                flex items-center gap-x-2 px-4 py-3 rounded-md bg-light-100 dark:bg-dark-500 child:flex-none
                hover:brightness-95 dark:hover:brightness-110 cursor-pointer
              "
              @mouseenter="element.hovered = true"
              @mouseleave="element.hovered = false"
              @click="copy()"
            >
              <!-- Select Item checkbox -->
              <label class="cursor-pointer flex-none" @click.stop>
                <Icon
                  icon="heroicons:check"
                  class="w-5 h-5 text-light-100 dark:text-dark-700 rounded border border-light-700 dark:border-dark-300"
                  :class="
                    element.selected
                      ? 'bg-light-700 dark:bg-dark-300 child:opacity-100'
                      : 'bg-white dark:bg-dark-700 child:opacity-0'
                  "
                />

                <input type="checkbox" v-model="element.selected" hidden />
              </label>

              <!-- Item text -->
              <p
                class="line-clamp-1 !flex-1"
                :class="{ 'text-center': element.hovered }"
                v-text="
                  element.hovered
                    ? copied
                      ? 'Copied!'
                      : 'Copy!'
                    : element.text
                "
              />

              <!-- Copy button -->
              <button
                class="text-2xl hover:text-light-900 dark:text-dark-200 dark:hover:text-dark-100"
                @click="copy()"
                v-if="element.hovered"
              >
                <Icon icon="heroicons:clipboard" />
              </button>

              <!-- Remove button -->
              <button
                class="text-2xl text-rose-700 dark:text-rose-600 hover:text-rose-800 dark:hover:text-rose-500"
                @click.stop="history.splice(index, 1)"
                v-if="element.hovered"
                >
                <Icon icon="heroicons:trash" />
              </button>
            </section>
          </UseClipboard>
        </template>
      </section>

      <!-- History footer clear buttons -->
      <footer class="p-6 border-t-2 dark:border-dark-500 flex gap-x-3 justify-end">
        <button @click="clearSelected" v-if="isSelectedItems">
          Clear selected
        </button>
        <button
          class="text-light-100 bg-light-700 dark:bg-dark-200 dark:text-dark-700 rounded px-6 py-2"
          @click="history = []"
        >
          Clear All
        </button>
      </footer>
    </aside>
  </section>

  <!-- Dark toggler -->
  <button
    @click="toggleDark()"
    class="fixed top-3 right-3 text-2xl z-100 child:origin-center p-3"
  >
    <Icon icon="heroicons:moon" v-if="isDark" />
    <Icon icon="heroicons:sun" v-else />
  </button>
</template>

<style>
/* Fonts - Catamaran */
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@100..900&display=swap');


/* Importing tailwindcss */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  /* Scrollbar Hide Plugin */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .scrollbar-default {
    -ms-overflow-style: auto;
    scrollbar-width: auto;
    &::-webkit-scrollbar {
      display: block;
    }
  }
}

/* Global styles */

*, ::before, ::after {
  @apply border-light-100 dark:border-dark-500
}

html {
  @apply scroll-smooth
}

body {
  @apply font-catamaran font-light text-light-700 dark:text-dark-200 bg-white dark:bg-dark-700 select-none
}
</style>