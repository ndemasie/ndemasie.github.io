<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import CodeCard from '@/components/CodeCard.vue'

import { store } from '@/stores/store.ts'
import { codes } from '@/data/codes'

const props = defineProps<{
  search: string
}>()

const filteredCodes = computed(() => {
  const term = props.search.toLowerCase()
  if (!term) return codes

  return codes.filter((code) => {
    const brand = store.brandByKey[code.brandKey]
    return (
      code.key.toLowerCase().includes(term) ||
      code.description.toLowerCase().includes(term) ||
      brand?.key.toLowerCase().includes(term) ||
      brand?.name.toLowerCase().includes(term)
    )
  })
})
</script>

<template>
  <TransitionGroup
    tag="ul"
    name="list"
    class="grid md:grid-cols-3 gap-6 sm:grid-cols-2 justify-center align-center"
  >
    <li v-for="code in filteredCodes" :key="code.key">
      <CodeCard :codeKey="code.key" />
    </li>
  </TransitionGroup>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
  max-height: fit-content;
}
</style>
