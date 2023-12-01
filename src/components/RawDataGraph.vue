<template>
  <p>RawDataGraph</p>

  <div ref="rawDataChart" style="width: 500px; height: 300px"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { useDataStore } from '../stores/Data'
const dataStore = useDataStore()

const rawDataChart = ref(null)

const rawDate = computed(() => dataStore.getRawDateByStoreAndTime)

const setOptions = (chart: echarts.ECharts) => {
  const option = {
    xAxis: {
      type: 'category',
      data: rawDate.value.map((element) => element.target_date),
      name: 'Date',
      tooltip: true
    },
    yAxis: {
      type: 'value',
      name: 'Quantity'
    },

    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['delivery_qty', 'demand_qty', 'recommendation']
    },
    series: [
      {
        data: rawDate.value.map((element) => element.delivery_qty),
        type: 'line',
        name: 'delivery_qty',
        markPoint: {}
      },
      {
        data: rawDate.value.map((element) => element.demand_qty),
        type: 'line',
        name: 'demand_qty',
        markPoint: {}
      },
      {
        data: rawDate.value.map((element) => element.recommendation),
        type: 'line',
        name: 'recommendation',
        markPoint: {}
      }
    ]
  }
  option && chart.setOption(option)
}

const initChart = () => {
  const myChart = echarts.init(rawDataChart.value)
  setOptions(myChart)
  return myChart
}

onMounted(() => {
  const myChart = initChart()
  watchEffect(() => {
    setOptions(myChart)
  })
})
</script>

<style scoped></style>
