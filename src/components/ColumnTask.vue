<template>
  <div
    class="task"
    @click="openTask(task)"
    draggable="true"
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
    @dragover.prevent
    @dragenter.prevent
  >
    <span class="w-full shrink-0 font-bold">{{ task.name }}</span>
    <p class="w-full shrink-0 mt-1 text-sm" v-if="task.description">
      {{ task.description }}
    </p>
  </div>
</template>

<script>
import { useBoardStore } from '@/store/BoardStore'

export default {
  setup() {
    const boardStore = useBoardStore()

    return {
      boardStore,
    }
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openTask(task) {
      this.$router.push({ name: 'TaskView', params: { id: task.id } })
    },
    pickupTask(event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-task-index', taskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'task')
    },
    moveTaskOrColumn(event, toTasks, toColumnIndex, toTaskIndex) {
      const type = event.dataTransfer.getData('type')

      if (type === 'task') {
        this.moveTask(
          event,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length
        )
      } else {
        this.moveColumn(event, toColumnIndex)
      }
    },
    moveColumn(event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')

      this.boardStore.moveColumn(fromColumnIndex, toColumnIndex)
    },
    moveTask(event, toTasks, toTaskIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = event.dataTransfer.getData('from-task-index')

      this.boardStore.moveTask(fromTasks, toTasks, fromTaskIndex, toTaskIndex)
    },
  },
}
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline;
}
</style>
