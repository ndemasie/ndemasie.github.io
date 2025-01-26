<script lang="ts" setup>
import { ExternalLinkIcon } from '@radix-icons/vue'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Code } from '@/data/codes'
import { store } from '@/stores/store.ts'

const props = defineProps<{
  codeKey: Code['key']
  direct?: boolean
}>()

const code = store.codeByKey[props.codeKey]
const brand = store.brandByKey[code.brandKey]

const onSelect = () => {
  store.setSelectedCodeKey(code.key)
}
</script>

<template>
  <Card
    class="sm:@container w-full flex flex-col h-full overflow-hidden"
    @click="onSelect"
  >
    <CardHeader
      class="mb-6 h-[160px] @[400px]:h-full @[400px]:max-h-[280px]"
      :style="{
        backgroundColor: brand.theme === 'light' ? 'white' : 'inherit',
      }"
    >
      <img
        class="h-full w-full"
        :src="brand.logoUrl"
        :aria-label="`${brand.name} logo`"
        :alt="`${brand.name} logo`"
      />
    </CardHeader>

    <CardContent class="flex-1">
      <CardTitle class="mb-2">{{ code.description }}</CardTitle>
      <CardDescription class="text-lg">{{ brand.name }}</CardDescription>
    </CardContent>

    <CardFooter class="w-full">
      <a v-if="props.direct" :href="code.url" target="_blank" class="w-full">
        <Button class="my-2 w-full" @click="onClose"
          >Get deal <ExternalLinkIcon class="w-4 h-4 mr-2"
        /></Button>
      </a>

      <Button v-else class="my-2 w-full" @click="onSelect">Open</Button>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
