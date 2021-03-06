export default {
  props: {
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
    moveTaskOrColumn(transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    },
    moveColumn({ fromColumnIndex }) {
      this.boardStore.moveColumn({
        fromColumnIndex,
        toColumnIndex: this.columnIndex,
      })
    },
    moveTask({ fromColumnIndex, fromTaskIndex }) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks

      this.boardStore.moveTask({
        fromTasks,
        toTasks: this.column.tasks,
        fromTaskIndex,
        toTaskIndex:
          this.taskIndex !== undefined
            ? this.taskIndex
            : this.column.tasks.length,
      })
    },
  },
}
