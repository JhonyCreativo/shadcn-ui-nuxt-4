<script setup  lang="ts">
import { DonutChart } from "@/components/ui/chart-donut"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
]

function valueFormatter(tick: number | Date) {
  return typeof tick === "number"
    ? `$ ${new Intl.NumberFormat("us").format(tick).toString()}`
    : ""
}
</script>
<template>
    <DashboardAdmin>
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
          <div class="aspect-video rounded-xl flex items-center justify-center bg-white" >
            <DonutChart
               index="name"
               :category="'total'"
               :data="data"
               :value-formatter="valueFormatter"
             />
          </div>
          <div class="aspect-video rounded-xl flex items-center justify-center bg-white" >
            other component
          </div>
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </DashboardAdmin>
</template>
