<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        class="column"
        v-for="(column, columnIndex) in board.columns"
        :key="columnIndex"
        draggable="true"
        @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
        @dragstart.self="pickupColumn($event, columnIndex)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
        <div class="list-none">
          <div
            class="task"
            v-for="(task, taskIndex) in column.tasks"
            :key="taskIndex"
            @click="openTask(task)"
            draggable="true"
            @dragstart="pickupTask($event, taskIndex, columnIndex)"
            @drop.stop="
              moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)
            "
            @dragover.prevent
            @dragenter.prevent
          >
            <span class="w-full shrink-0 font-bold">{{ task.name }}</span>
            <p class="w-full shrink-0 mt-1 text-sm" v-if="task.description">
              {{ task.description }}
            </p>
          </div>
          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </div>

      <div class="column flex">
        <input
          type="text"
          v-model="newColumnName"
          class="p-2 mr-2 flex-grow bg-transparent"
          placeholder="+ New Column Name"
          @keyup.enter="createColumn"
        />
      </div>
    </div>
    <div class="task-bg" v-if="isTaskOpen" @click.self="closeTask">
      <router-view />
    </div>
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
  data() {
    return {
      newColumnName: '',
    }
  },
  computed: {
    board() {
      return this.boardStore.board
    },
    isTaskOpen() {
      return this.$route.name === 'TaskView'
    },
  },
  methods: {
    createColumn() {
      this.boardStore.createColumn(this.newColumnName)
      this.newColumnName = ''
    },
    openTask(task) {
      this.$router.push({ name: 'TaskView', params: { id: task.id } })
    },
    closeTask() {
      this.$router.push({ name: 'BoardView' })
    },
    createTask(event, tasks) {
      this.boardStore.createTask(tasks, event.target.value)
      event.target.value = ''
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
    moveTask(event, toTasks, toTaskIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = event.dataTransfer.getData('from-task-index')

      this.boardStore.moveTask(fromTasks, toTasks, fromTaskIndex, toTaskIndex)
    },
    pickupColumn(event, columnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-column-index', columnIndex)
      event.dataTransfer.setData('type', 'column')
    },
    moveColumn(event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')

      this.boardStore.moveColumn(fromColumnIndex, toColumnIndex)
    },
  },
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline;
}

.column {
  @apply bg-gray-300 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-700 h-full overflow-auto;
}

.task-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
