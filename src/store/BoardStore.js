import { defineStore } from 'pinia'
import defaultBoard from '@/defaultBoard'

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
})
