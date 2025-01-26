import keyBy from 'lodash/keyBy'
import { reactive } from 'vue'

import { brands, codes } from '@/data/codes'
import type { Brand, Code } from '@/data/codes'

type Store = {
  brandByKey: Record<string, Brand>
  codeByKey: Record<string, Code>
  selectedCodeKey: Code['key'] | null | undefined
  setSelectedCodeKey: (key: Code['key'] | null | undefined) => void
}

export const store = reactive<Store>({
  brandByKey: keyBy(brands, 'key'),
  codeByKey: keyBy(codes, 'key'),
  selectedCodeKey: null,
  setSelectedCodeKey(key) {
    if (!key || key in store.codeByKey) {
      store.selectedCodeKey = key
    }
  },
})
