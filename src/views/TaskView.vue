<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      {{ task.name }}
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
    task() {
      return this.boardStore.getTask(this.$route.params.id)
    },
  },
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white inset-0 mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
