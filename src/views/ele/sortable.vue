<template>
  <div class="comprehensive-table-container">
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
  import Sortable from 'sortablejs'
  export default defineComponent({
    name: 'Sortable',
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
      //排序功能
      const rowSortable = () => {
        Sortable.create(
          state['tableSortRef'].$el.querySelector(
            '.el-table__body-wrapper > table > tbody'
          ),
          {
            handle: '.draggable',
            onMove: () => {
              // 参数evt, oe
              // let dragged = evt.dragged.className
              // let related = evt.related.className
              // if (dragged.indexOf('ec_unDraggable') > -1) {
              //   if (
              //     related.indexOf('com_unDraggable') > -1 ||
              //     related.indexOf('zdj_unDraggable') > -1 ||
              //     related.indexOf('fb_unDraggable') > -1
              //   ) {
              //     return false
              //   }
              // }
              // if (dragged.indexOf('zdj_unDraggable') > -1) {
              //   if (
              //     related.indexOf('com_unDraggable') > -1 ||
              //     related.indexOf('ec_unDraggable') > -1 ||
              //     related.indexOf('fb_unDraggable') > -1
              //   ) {
              //     return false
              //   }
              // }
              // if (dragged.indexOf('fb_unDraggable') > -1) {
              //   if (
              //     related.indexOf('com_unDraggable') > -1 ||
              //     related.indexOf('ec_unDraggable') > -1 ||
              //     related.indexOf('zdj_unDraggable') > -1
              //   ) {
              //     return false
              //   }
              // }
            },
            onEnd: (sortableEvent) => {
              let newIndex = sortableEvent.newIndex
              let oldIndex = sortableEvent.oldIndex
              let currRow = state.tableList.data[oldIndex]
              state.tableList.data.splice(oldIndex, 1)
              state.tableList.data.splice(newIndex, 0, currRow)
            },
          }
        )
      }

      onMounted(() => {
        fetchData()
        rowSortable()
      })

      return {
        ...toRefs(state),
        fetchData,
        translateTitle,
        rowSortable,
      }
    },
  })
</script>
