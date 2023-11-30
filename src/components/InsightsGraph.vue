<template>
  <div>InsightsGraph</div>
  <div>
    <span>{{ dataStore.storeToShow.store_label }} </span> --
    <span> {{ dataStore.productToShow.name_product }}</span>
  </div>

  <div>
    <div ref="exampleChart" style="width: 1000px; height: 500px"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watchEffect } from 'vue'
import * as echarts from 'echarts'

import { useDataStore } from '../stores/Data'
const dataStore = useDataStore()

const InsightsData = computed(() => dataStore.getInsightsByProduct)

const exampleChart = ref(null)

const setOptions = (chart: echarts.ECharts) => {
  const option = {
    xAxis: {
      type: 'category',
      data: InsightsData.value.map((element) => element.target_date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: InsightsData.value.map((element) => element.variance),
        type: 'line'
      }
    ]
  }
  option && chart.setOption(option)
}

const initChart = () => {
  const myChart = echarts.init(exampleChart.value)
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
