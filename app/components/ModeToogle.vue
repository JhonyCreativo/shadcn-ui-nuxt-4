<script setup lang="ts">
// import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { HTMLAttributes } from "vue"
const colorMode = useColorMode()
const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
    <div :class=" props.class">
        <DropdownMenu >
          <DropdownMenuTrigger as-child>
            <Button variant="outline">
              <!-- <Icon name="material-symbols:dark-mode-outline" /> -->
              <Icon name="material-symbols:dark-mode-outline" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Icon name="material-symbols:sunny-outline-rounded" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span class="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="colorMode.preference = 'light'">
                <Icon name="material-symbols:sunny-outline-rounded"/>Light
          </DropdownMenuItem>
          <DropdownMenuItem @click="colorMode.preference = 'dark'">
              <Icon name="material-symbols:dark-mode-outline"/>Dark
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'system'">
              <Icon name="icon-park-solid:setting-computer"/> System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>