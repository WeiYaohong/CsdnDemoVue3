<template>
  <div class="comprehensive-table-container" style="height: 100%">
    <div id="echarts-pie" style="widht: 400px; height: 400px"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import { translateTitle } from '@/utils/i18n'
  export default defineComponent({
    name: 'FullScreen',
    components: {},
    setup() {
      // const $baseConfirm = inject('$baseConfirm')
      // const $baseMessage = inject('$baseMessage')

      const state = reactive({
        tableSortRef: null,
        listLoading: false,
        tableList: [],
        pieOption: {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: '5%',
            left: 'center',
            // doesn't perfectly work with our tricks, disable it
            selectedMode: false,
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '70%'],
              // adjust the start angle
              startAngle: 180,
              label: {
                show: true,
                formatter(param) {
                  // correct the percentage
                  return param.name + ' (' + param.percent * 2 + '%)'
                },
              },
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
                {
                  // make an record to fill the bottom 50%
                  value: 1048 + 735 + 580 + 484 + 300,
                  itemStyle: {
                    // stop the chart from rendering this piece
                    color: 'none',
                    decal: {
                      symbol: 'none',
                    },
                  },
                  label: {
                    show: false,
                  },
                },
              ],
            },
          ],
        },
      })

      //  查询数据
      const initEchart = async () => {
        var chartDom = document.getElementById('echarts-pie')
        var myEcharts = echarts.init(chartDom)
        myEcharts.setOption(state.pieOption)
      }

      onMounted(() => {
        initEchart()
      })

      return {
        ...toRefs(state),
        initEchart,
        translateTitle,
      }
    },
  })
</script>
