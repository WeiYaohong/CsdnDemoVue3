<!--直投检查清单列表-->
<template>
  <div class="comprehensive-table-container">
    <ums-query-form v-show="advanced">
      <ums-query-form-top-panel>
        <el-form
          :inline="true"
          label-width="80px"
          :model="queryForm"
          size="small"
          @submit.prevent
        >
          <el-form-item :label="translateTitle('月份')">
            <el-date-picker
              v-model="queryForm.monthOn"
              :placeholder="translateTitle('请选择')"
              type="month"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item :label="translateTitle('投标团队')">
            <el-select-v2
              v-model="queryForm.team"
              clearable
              :options="dicts.pmbidteams"
              :placeholder="translateTitle('请选择')"
            />
          </el-form-item>
          <!-- <el-form-item :label="translateTitle('投标工程师')">
            <el-select-v2
              v-model="queryForm.tender"
              clearable
              :options="dicts.pmbidengineers"
              :placeholder="translateTitle('请选择')"
            />
          </el-form-item> -->
          <el-form-item label-width="0px">
            <el-button
              v-permissions="['10107:Search']"
              type="primary"
              @click="queryData"
            >
              {{ translateTitle('检索') }}
            </el-button>
            <el-button
              v-permissions="['10109:Update']"
              :disabled="btns.calcDisabled"
              :loading="btns.calcLoading"
              size="small"
              type="primary"
              @click="handleCalcData"
            >
              {{ translateTitle('手动汇总') }}
            </el-button>
            <el-button
              v-permissions="['10107:Export']"
              size="small"
              title="导出报表"
              type="info"
              @click="handleExportReport"
            >
              {{ translateTitle('导出') }}
            </el-button>
            <!-- <el-button @click="resetQuery">{{ translateTitle('重置') }}</el-button> -->
          </el-form-item>
        </el-form>
      </ums-query-form-top-panel>
    </ums-query-form>

    <div class="report" style="display: flex">
      <div
        class="reportbod"
        style="flex: 1; display: flex; flex-direction: column; min-height: 100%"
      >
        <div class="prjCon">
          <div class="total">
            <span class="tttx">创建项目</span>
            <span class="ttnew">
              {{ wlData.totalData.newPrjNum }}
            </span>
          </div>
          <div class="total">
            <span class="tttx">报出项目</span>
            <span class="ttpending">
              {{ wlData.totalData.pendingNum }}
            </span>
          </div>
          <div class="total">
            <span class="tttx">中标项目</span>
            <span class="ttawarded">
              {{ wlData.totalData.awardedNum }}
            </span>
          </div>
          <div class="total">
            <span class="tttx">签订项目</span>
            <span class="ttbooked">
              {{ wlData.totalData.bookedNum }}
            </span>
          </div>
        </div>
        <div class="prjCap">
          <div class="capTit">WorkLoad VS Capicity</div>
          <!-- <div class="capChart">
                    <div class="jdt">
                      <div class="jdbar">
                        <div
                          class="jdper"
                          :per="jdbarper"
                          :style="{
                            'max-width': jdbarper,
                          }"
                        ></div>
                      </div>
                    </div>
                  </div> -->
          <!-- <div
            style="
              display: flex;
              height: 400px;
              flex-direction: column;
              align-items: center;
            "
          > -->
          <div id="echart_main" class="echart_main"></div>
          <!-- </div> -->
        </div>
      </div>
      <div class="reportbod" style="flex: 2">
        <div class="reportbtns">
          <el-button
            v-permissions="['50031:Update']"
            plain
            size="small"
            title="工程师汇总报表：指按工程师汇总的WorkLoad报表"
            type="info"
            @click="handleWorkLoadMonthTenderReportList()"
          >
            {{ translateTitle('工程师月度报表') }}
          </el-button>
        </div>
        <el-table
          :data="wlData.workLoadData"
          :loading="listLoading"
          style="width: 100%"
        >
          <el-table-column label="团队" prop="feild" />
          <el-table-column label="投标准备">
            <el-table-column label="Bidding" prop="upBiddingNum" />
            <el-table-column label="Quotation" prop="upQuotationNum" />
          </el-table-column>
          <el-table-column label="结果等待" prop="pendingNum" />
          <el-table-column label="中标通知" prop="awardedNum" />
          <el-table-column label="生成订单" prop="bookedNum" />
          <el-table-column label="其他" prop="finishedOthers" />
        </el-table>
        <!-- <table>
              <tbody>
                <tr>
                  <td rowspan="2">团队</td>
                  <td colspan="2">投标准备</td>
                  <td rowspan="2">结果等待</td>
                  <td rowspan="2">中标通知</td>
                  <td rowspan="2">生成订单</td>
                  <td rowspan="2">其他</td>
                </tr>
                <tr>
                  <td>Bidding</td>
                  <td>Quotation</td>
                </tr>
                <tr v-for="(row, index1) in wlData.workLoadData" :key="index1">
                  <td>{{ row.feild }}</td>
                  <td>{{ row.upBiddingNum }}</td>
                  <td>{{ row.upQuotationNum }}</td>
                  <td>{{ row.pendingNum }}</td>
                  <td>{{ row.awardedNum }}</td>
                  <td>{{ row.bookedNum }}</td>
                  <td>{{ row.finishedOthers }}</td>
                </tr>
              </tbody>
            </table> -->
      </div>
      <div class="reportbtm">
        <!-- {{ translateTitle('记录总数') + total + translateTitle('条') }} -->
      </div>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import { translateTitle } from '@/utils/i18n'
  // import { getDictMetas, getBidEngineerData } from '@/api/dict'
  import { formatDate } from '@/utils/tools'
  // import {
  //   getWorkLoadMonthDataByTeam,
  //   calcWorkLoadMonthData,
  //   exoprtWorkLoadReportData,
  // } from '@/api/process/report'
  export default defineComponent({
    name: 'WorkLoadMonthReport',
    components: {},
    setup() {
      const $baseConfirm = inject('$baseConfirm')
      const $baseMessage = inject('$baseMessage')
      // const $baseAlert = inject('$baseAlert')
      const $baseTableHeight = inject('$baseTableHeight')
      const router = useRouter()

      const state = reactive({
        tableSortRef: null,
        addContractDialogRef: null,
        height: $baseTableHeight(3) - 30,
        advanced: true,
        listLoading: false,
        btnLoading: false,
        pageForm: {
          page: 1,
          size: 10,
        },
        queryForm: {
          cdtDate: null,
          feild: 'factory',
          bidTeam: null,
          bidengineer: null,
        },
        list: [],
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper',
        selectList: [],
        dicts: {
          pmbidengineers: [],
          pmprovinces: [],
          pmregions: [],
          pmbidteams: [],
          pmordertypes: [],
          reportfeilds: [
            { value: 'factory', label: '工厂' },
            { value: 'bidTeam', label: '投标团队' },
            { value: 'bidengineer', label: '工程师' },
          ],
        },
        btns: {
          reportLoading: false,
          reportDisabled: false,
          calcLoading: false,
          calcDisabled: false,
        },
        dialog: {
          show: false,
          type: 'new',
          title: '',
          selectLoading: false,
          selectArr: [],
          formData: {},
        },
        jdbarcolor: ref('green'),
        jdbarper: '0%',
        wlData: {
          totalData: {
            year: 2023,
            month: 11,
            monthOn: '2023-11-30 16:01:18',
            newPrjNum: '0',
            pendingNum: '0',
            awardedNum: '0',
            bookedNum: '0',
          },
          workLoadData: [
            {
              feild: 'AVX Team',
              upBiddingNum: 0,
              upQuotationNum: 0,
              pendingNum: 0,
              awardedNum: 0,
              bookedNum: 0,
              finishedOthers: 0,
            },
          ],
          workLoadCapData: {
            year: 2023,
            month: 11,
            times: '0.00',
            totalTimes: '0.00',
            realRate: '0.00%',
            data2: 0,
            data3: 0,
            data4: 0,
            data5: 0,
            warningRateMin: 0,
            warningRateMax: 0,
            warningLevel: 0,
          },
        },
        tableData: [
          {
            month: '2022-01',
            mainFeild: '工厂',
            rows: [
              {
                Feild: 'AVX',
                OngoingBidding: 0,
                FinishedBidding: 0,
                OngoingContracting: 0,
                FinishedContracting: 0,
                OngoingOthers: 0,
                FinishedOthers: 0,
                Total: 0,
              },
              {
                Feild: 'AVX',
                OngoingBidding: 1,
                FinishedBidding: 2,
                OngoingContracting: 3,
                FinishedContracting: 0,
                OngoingOthers: 4,
                FinishedOthers: 0,
                Total: 0,
              },
              {
                Feild: 'Total',
                OngoingBidding: 1,
                FinishedBidding: 2,
                OngoingContracting: 3,
                FinishedContracting: 0,
                OngoingOthers: 4,
                FinishedOthers: 0,
                Total: 0,
              },
            ],
          },
          {
            month: '2022-02',
            mainFeild: '工厂',
            rows: [
              {
                Feild: 'AVX',
                OngoingBidding: 1,
                FinishedBidding: 2,
                OngoingContracting: 3,
                FinishedContracting: 0,
                OngoingOthers: 4,
                FinishedOthers: 0,
                Total: 0,
              },
              {
                Feild: 'AVX',
                OngoingBidding: 1,
                FinishedBidding: 2,
                OngoingContracting: 3,
                FinishedContracting: 0,
                OngoingOthers: 4,
                FinishedOthers: 0,
                Total: 0,
              },
              {
                Feild: 'Total',
                OngoingBidding: 1,
                FinishedBidding: 2,
                OngoingContracting: 3,
                FinishedContracting: 0,
                OngoingOthers: 4,
                FinishedOthers: 0,
                Total: 0,
              },
            ],
          },
        ],
        //echartOPTIONS
        echartOptions: {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            show: false,
          },
          series: [
            {
              name: 'WorkLoad VS Capicity',
              type: 'pie',
              radius: ['60%', '90%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              startAngle: 180,

              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                // label: {
                //   show: true,
                //   fontSize: 40,
                //   fontWeight: 'bold',
                // },
              },
              labelLine: {
                show: false,
              },
              data: [
                //这里4笔数据实际只展示2笔，另外两笔数据值和前两笔一样，但是隐藏
                //保证UI展示是个半圆且不变形
                {
                  value: 120,
                  // name: 'WorkLoad',
                  name: '',
                  itemStyle: { color: '#05AF1D' },
                  tooltip: {
                    valueFormatter: () => '',
                  },
                },
                {
                  value: 80,
                  // name: 'Capicity',
                  itemStyle: { color: '#0543AD' },
                  tooltip: {
                    show: false,
                  },
                },
                {
                  // make an record to fill the bottom 50%
                  value: 120,
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
                {
                  // make an record to fill the bottom 50%
                  value: 80,
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

      onActivated(() => {
        // state['tableSortRef'].doLayout()
        // fetchData()
        initChart()
      })
      const initChart = () => {
        // myEchart = echarts.init(main.value)
        var chartDom = document.getElementById('echart_main')
        var myEchart = echarts.init(chartDom)
        myEchart.setOption(state.echartOptions)
      }
      const changeEchartData = (times, totalTimes, warningColor) => {
        if (times == '' || times == null || times == undefined) {
          times = 0
        }
        if (totalTimes == '' || totalTimes == null || totalTimes == undefined) {
          totalTimes = 0
        }
        times = Number(times)
        totalTimes = Number(totalTimes)

        let newtimes = parseFloat(times.toFixed(2))
        let newtotalTimes = parseFloat(totalTimes.toFixed(2))
        let distimes = totalTimes - times
        let newdistimes = parseFloat(distimes.toFixed(2))

        console.log(newtimes)
        console.log(newtotalTimes)
        console.log(newdistimes)
        console.log(warningColor)

        //展示的数据
        state.echartOptions.series[0].data[0].value = newtimes
        state.echartOptions.series[0].data[0].name = '40%'
        state.echartOptions.series[0].data[1].value = newdistimes
        // state.echartOptions.series[0].data[0].itemStyle.color = warningColor
        //隐藏的数据
        state.echartOptions.series[0].data[2].value = newtimes
        state.echartOptions.series[0].data[3].value = newdistimes
        initChart()
      }

      const switchDictData = (dictdata, val) => {
        let vStr = '-'
        dictdata.forEach((item) => {
          if (item.value == val) {
            vStr = item.label
            return
          }
        })
        return vStr
      }
      const toggleAdvanced = () => {
        state.advanced = !state.advanced
      }

      const queryData = () => {
        state.pageForm.page = 1
        fetchData()
      }
      const resetQuery = () => {
        state.queryForm = {}
        state.pageForm.page = 1
        fetchData()
      }
      const fetchSelData = async () => {
        try {
          var codes = ['pmprovinces', 'pmbidteams', 'pmordertypes', 'pmregions']
          let res = await getDictMetas(codes)
          if (res.type == 'SUCCESS') {
            state.dicts.pmordertypes = res.data.pmordertypes
            state.dicts.pmprovinces = res.data.pmprovinces
            state.dicts.pmbidteams = res.data.pmbidteams
            state.dicts.pmregions = res.data.pmregions
            console.log('state.dicts', state.dicts)
          }

          let res1 = await getBidEngineerData({ name: null })
          if (res1.type == 'SUCCESS') {
            state.dicts.pmbidengineers = res1.data
          }
        } catch (e) {
          console.log(e)
        }
      }
      const fetchData = async () => {
        try {
          state.listLoading = true
          let param = state.queryForm
          let res = await getWorkLoadMonthDataByTeam(param)
          state.wlData.workLoadData = res.data.workLoadData
          state.wlData.totalData = res.data.totalData
          state.wlData.workLoadCapData = res.data.workLoadCapData
          if (res.data.workLoadCapData) {
            changeEchartData(
              res.data.workLoadCapData.times,
              res.data.workLoadCapData.totalTimes,
              res.data.workLoadCapData.warningColor
            )
            state.jdbarcolor = res.data.workLoadCapData.warningColor
            state.jdbarper = res.data.workLoadCapData.currRate
          } else {
            changeEchartData(0, 0, '')
          }
          state.listLoading = false
        } catch (e) {
          state.list = []
          state.listLoading = false
        }
      }

      const exportExcel = (exportName, res) => {
        let filename = `${exportName}.xlsx`
        let eleLink = document.createElement('a')
        eleLink.download = filename
        eleLink.style.display = 'none'
        let blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        const hrefUrl = URL.createObjectURL(blob)
        eleLink.href = hrefUrl
        // 触发点击
        document.body.appendChild(eleLink)
        eleLink.click()
        // 然后移除
        document.body.removeChild(eleLink)
      }

      const handleExportReport = () => {
        let filename = `WorkLoadReport`
        state.btns.reportDisabled = true
        state.btns.reportLoading = true
        exoprtWorkLoadReportData(state.queryForm).then((res) => {
          state.btns.reportDisabled = false
          state.btns.reportLoading = false
          exportExcel(filename, res)
        })
      }

      const handleCalcData = () => {
        state.btns.calcDisabled = true
        $baseConfirm(
          translateTitle(`你确定要手动渠道指定月份的WorkLoad报表吗`),
          null,
          async () => {
            state.btns.calcLoading = true

            let res = await calcWorkLoadMonthData(state.queryForm).finally(
              () => {
                state.btns.calcLoading = false
              }
            )
            if (res.data) {
              $baseMessage('汇总成功', 'success', 'yes-hey-message-success')
              // await fetchData()
            } else {
              $baseMessage('汇总失败', 'error', 'yes-hey-message-error')
            }
          }
        )
        state.btns.calcDisabled = false
      }

      const handleWorkLoadMonthTenderReportList = async (row) => {
        let query = {
          monthOn: state.queryForm.monthOn,
          team: state.queryForm.team,
          tender: state.queryForm.tender,
        }
        if (row) {
          query.team = row.team
        }
        router.push({
          path: '/WorkLoadMonthTenderReport',
          query: query,
        })
      }

      onMounted(() => {
        state.queryForm.monthOn = formatDate(Date.now(), 'yyyy-MM-dd')
        // fetchSelData()
        // fetchData()
        changeEchartData(753, 1234, '#123456')
      })

      return {
        ...toRefs(state),
        fetchSelData,
        toggleAdvanced,
        translateTitle,
        switchDictData,
        queryData,
        resetQuery,
        fetchData,
        handleExportReport,
        handleCalcData,
        handleWorkLoadMonthTenderReportList,
        initChart,
        changeEchartData,
      }
    },
  })
</script>

<style scoped>
  .el-form {
    display: flex;
    align-items: center;
    vertical-align: middle;
  }
  .el-form .el-form-item {
    display: inline-flex;
  }
  .el-form .el-select-v2 {
    width: 160px;
  }
  .el-form .el-input {
    width: 100px !important;
  }
  .reportfeild {
    width: 120px;
  }
  .reportdate {
    width: 100px;
  }

  .reporttit {
    padding: 8px 0px;
  }
  .reportbtm {
    padding: 8px 0px;
  }

  .reportbod .prjCon {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 8px;
    justify-content: space-between;
  }
  .reportbod .prjCon .total {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-items: center;
    width: 80px;
    height: 80px;
    margin-right: 8px;
    border: 1px solid;
    border-radius: 5px;
  }

  .reportbod .prjCon .total .tttx {
    display: inline-flex;
    justify-content: center;
    width: 80px;
    font-size: 12px;
  }
  .reportbod .prjCon .total .ttnum {
    display: inline-flex;
    justify-content: center;
    width: 80px;
    font-size: 30px;
  }
  .reportbod .prjCon .total .ttnew {
    display: inline-flex;
    justify-content: center;
    width: 80px;
    font-size: 30px;
    color: rgba(0, 0, 255, 0.796);
  }
  .reportbod .prjCon .total .ttpending {
    display: inline-flex;
    justify-content: center;
    width: 80px;
    font-size: 30px;
    color: rgb(36, 233, 36);
  }
  .reportbod .prjCon .total .ttawarded {
    display: inline-flex;
    justify-content: center;
    width: 80px;
    font-size: 30px;
    color: rgb(240, 35, 35);
  }
  .reportbod .prjCon .total .ttbooked {
    display: inline-flex;
    justify-content: center;
    width: 80px;
    font-size: 30px;
    color: rgb(51, 47, 47);
  }
  .reportbod .prjCap {
    /* display: flex; */
    flex-direction: column;

    align-items: center;
    justify-items: flex-start;
  }
  .reportbod .prjCap .capTit {
    width: 100%;
    text-align: center;
    font-size: 18px;
  }
  .reportbod .prjCap .capChart {
    height: 80px;
    padding-top: 8px;
  }
  .reportbod .prjCap .echart_main {
    flex: 1;
    width: 100%;
    height: 300px;
    /* background: #333333; */
  }

  .reportbod .reportbtns {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-bottom: 6px;
  }
  .reportbod table {
    width: 100%;
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    text-align: center;
    border-collapse: collapse;
    border-color: #666666;
    border-width: 1px;
  }

  .reportbod table th {
    padding: 8px;
    background-color: #dedede;
    border-color: #666666;
    border-style: solid;
    border-width: 1px;
  }
  .reportbod table td {
    width: 150px;
    padding: 8px;
    text-align: center;
    background-color: #ffffff;
    border-color: #666666;
    border-style: solid;
    border-width: 1px;
  }

  .reportbod table td .ico {
    width: 1em;
    height: 1em;
    margin-right: 8px;
  }

  .reportbod table td input {
    text-align: center !important;
  }

  .jdt {
    padding-top: 20px;
    margin-left: 10px;
  }
  .jdbar {
    width: 300px;
    height: 30px;
    background: blue;
  }

  .jdper {
    position: relative;
    width: 100%;
    max-width: 80%;
    height: 30px;
    background: v-bind(jdbarcolor);
  }

  .jdper::before {
    position: absolute;
    top: -30px;
    right: 0;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    content: attr(per);
    background: #b1a9a7;
    border-radius: 2px;
    transform: translateX(50%);
  }

  .jdper::after {
    position: absolute;
    top: -18px;
    right: 0;
    z-index: -1;
    display: inline-block;
    width: 10px;
    height: 10px;
    content: '';
    background: #b1a9a7;
    border-radius: 2px;
    transform: translateX(50%) rotate(45deg);
  }
</style>
