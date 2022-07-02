import { defineStore } from 'pinia'
import defaultBoard from '@/defaultBoard'

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export const useBoardStore = defineStore('BoardStore', {
  state() {
    return {
      board,
    }
  },
})
