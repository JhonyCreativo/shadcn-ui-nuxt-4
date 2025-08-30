<script lang="ts">
export const description
  = "A sidebar that collapses to icons."
export const iframeHeight = "800px"
export const containerClass = "w-full h-full"
</script>

<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center justify-between gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
        </div>
        <div class="flex items-center px-4">
          <ModeToogle class="mr-1" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
       <slot></slot>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
