<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, columnIndex) in board.columns"
        :key="columnIndex"
        :column="column"
        :columnIndex="columnIndex"
        :board="board"
      />

      <div class="column flex">
        <input
          type="text"
          v-model="newColumnName"
          class="p-2 mr-2 flex-grow bg-transparent"
          placeholder="+ New Column Name"
          @keyup.enter="createColumn"
        />
      </div>

      <div class="task-bg" v-if="isTaskOpen" @click.self="closeTask">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { useBoardStore } from '@/store/BoardStore'
import BoardColumn from '@/components/BoardColumn'

export default {
  components: {
    BoardColumn,
  },
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
    closeTask() {
      this.$router.push({ name: 'BoardView' })
    },
  },
}
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-700 h-full overflow-auto;
}

.task-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
