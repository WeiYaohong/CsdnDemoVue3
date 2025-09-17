<template>
  <div id="fullscreen" class="comprehensive-table-container">
    <div style="display: flex; justify-self: start; padding-bottom: 15px">
      <div style="flex: 1">
        <el-button type="primary" @click="fullScreen">
          {{ translateTitle('全屏') }}
        </el-button>
        <el-button @click="exitFullscreen">
          {{ translateTitle('退出全屏') }}
        </el-button>
      </div>
    </div>
    <el-table
      ref="tableSortRef"
      v-loading="listLoading"
      border
      :data="tableList"
      row-class-name="draggable"
      row-key="id"
    >
      <el-table-column label="Id" prop="id" width="50" />
      <el-table-column label="Date" prop="date" width="180" />
      <el-table-column label="Name" prop="name" width="180" />
      <el-table-column label="Address" prop="address" />
      <template #empty>
        <el-empty class="yes-data-empty" description="暂无数据" />
      </template>
    </el-table>
  </div>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'
  import { getTableList } from '@/api/mockdata'
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
      })

      //  查询数据
      const fetchData = async () => {
        state.listLoading = true
        const res = await getTableList()
        state.tableList = res.data
        state.listLoading = false
      }
      const fullScreen = () => {
        //全屏
        var element = document.getElementById('fullscreen')
        launchIntoFullscreen(element)
      }
      const launchIntoFullscreen = (element) => {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        }
      }
      const exitFullscreen = () => {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
      }
      const checkFull = () => {
        //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
        //火狐浏览器
        var isFull =
          document.mozFullScreen ||
          document.fullScreen ||
          //谷歌浏览器及Webkit内核浏览器
          document.webkitIsFullScreen ||
          document.webkitRequestFullScreen ||
          document.mozRequestFullScreen ||
          document.msFullscreenEnabled
        if (isFull === undefined) {
          isFull = false
        }
        return isFull
      }

      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
        fetchData,
        translateTitle,
        fullScreen,
        exitFullscreen,
        checkFull,
      }
    },
  })
</script>
