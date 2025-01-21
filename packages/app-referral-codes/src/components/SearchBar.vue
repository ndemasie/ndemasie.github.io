<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { MagnifyingGlassIcon } from '@radix-icons/vue'

const searchModel = defineModel('search', { type: String, default: '' })
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input
      id="search"
      type="text"
      placeholder="Search..."
      class="pl-10"
      v-model="searchModel"
    />
    <span
      class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
    >
      <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>

<style scoped></style>
