<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        class="column"
        v-for="(column, column_index) in board.columns"
        :key="column_index"
      >
        <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
        <div class="list-none">
          <div
            class="task"
            v-for="(task, task_index) in column.tasks"
            :key="task_index"
          >
            <span class="w-full shrink-0 font-bold">{{ task.name }}</span>
            <p class="w-full shrink-0 mt-1 text-sm" v-if="task.description">
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>
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
  computed: {
    board() {
      return this.boardStore.board
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
