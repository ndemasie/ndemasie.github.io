<script lang="ts" setup>
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
  active: boolean
}>()

const code = store.codeByKey[props.codeKey]
const brand = store.brandByKey[code.brandKey]

const logoStyles = {
  backgroundColor: brand.theme === 'light' ? 'white' : 'inherit',
  backgroundImage: `url('${brand.logoUrl}')`,
}

const onSelect = () => {
  store.setSelectedCodeKey(code.key)
}
</script>

<template>
  <Card class="flex flex-col h-full" @click="onSelect">
    <CardHeader>
      <div class="brand-logo" aria-label="{{brand.name}}" :style="logoStyles" />
    </CardHeader>
    <CardContent class="flex-1">
      <CardTitle>{{ code.description }}</CardTitle>
      <!-- <CardDescription>{{ brand.name }}</CardDescription> -->
    </CardContent>
    <CardFooter>
      <Button class="w-full" @click="onSelect">Open</Button>
    </CardFooter>
  </Card>
</template>

<style scoped>
.brand-logo {
  width: 100%;
  height: 100px;
  background-size: calc(100% - 16px);
  background-position: center;
  background-repeat: no-repeat;
  background-origin: content-box;
}
</style>
