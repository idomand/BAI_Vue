<template>
  <p>InsightsGraph</p>
  <div>
    <div ref="insightsChart" style="width: 500px; height: 300px"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watchEffect } from 'vue'
import * as echarts from 'echarts'

import { useDataStore } from '../stores/Data'
const dataStore = useDataStore()

const InsightsData = computed(() => dataStore.getInsightsByProduct)

const insightsChart = ref(null)

const setOptions = (chart: echarts.ECharts) => {
  const option = {
    xAxis: {
      type: 'category',
      data: InsightsData.value.map((element) => element.target_date),
      name: 'Date',
      tooltip: true
    },
    yAxis: {
      type: 'value',
      name: 'Difference'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Difference']
    },
    series: [
      {
        data: InsightsData.value.map((element) => {
          return {
            value: element.variance,
            itemStyle: {
              color: element.IsBadRecommendation ? 'red' : 'green'
            }
          }
        }),
        type: 'bar',
        name: 'Difference'
      }
    ]
  }

  option && chart.setOption(option)
}
const initChart = () => {
  const myChart = echarts.init(insightsChart.value)
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
