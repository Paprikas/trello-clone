<template>
  <div
    class="column"
    draggable="true"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragstart.self="pickupColumn($event, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
    <div class="list-none">
      <ColumnTask
        v-for="(task, taskIndex) in column.tasks"
        :key="taskIndex"
        :task="task"
        :taskIndex="taskIndex"
        :column="column"
        :columnIndex="columnIndex"
        :board="board"
      />

      <input
        type="text"
        class="block p-2 w-full bg-transparent"
        placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column.tasks)"
      />
    </div>
  </div>
</template>
<script>
import { useBoardStore } from '@/store/BoardStore'
import ColumnTask from '@/components/ColumnTask'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  setup() {
    const boardStore = useBoardStore()

    return {
      boardStore,
    }
  },
  mixins: [movingTasksAndColumnsMixin],
  components: {
    ColumnTask,
  },
  methods: {
    pickupColumn(event, columnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-column-index', columnIndex)
      event.dataTransfer.setData('type', 'column')
    },
    createTask(event, tasks) {
      this.boardStore.createTask(tasks, event.target.value)
      event.target.value = ''
    },
  },
}
</script>

<style scoped>
.column {
  @apply bg-gray-300 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
