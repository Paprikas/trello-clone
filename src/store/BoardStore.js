import { defineStore } from 'pinia'
import defaultBoard from '@/defaultBoard'
import { v4 as uuidv4 } from 'uuid'

if (!localStorage.getItem('board')) {
  localStorage.setItem('board', JSON.stringify(defaultBoard))
}

const board = JSON.parse(localStorage.getItem('board'))

export const useBoardStore = defineStore('BoardStore', {
  state() {
    return {
      board,
    }
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    },
  },
  actions: {
    createColumn(name) {
      this.board.columns.push({
        name,
        tasks: [],
      })
    },
    createTask(tasks, name) {
      tasks.push({
        name,
        id: uuidv4(),
        description: '',
      })
    },
    updateTask(task, key, value) {
      task[key] = value
      // Vue.set(task, key, value)
    },
    moveTask({ fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    moveColumn({ fromColumnIndex, toColumnIndex }) {
      const columnList = this.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
  },
})
