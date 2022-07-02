<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        type="text"
        :value="task.name"
        @change="updateTaskProperty('name', $event)"
        class="p-2 m-2 w-full flex-grow text-xl font-bold"
      />

      <textarea
        class="relative bg-transparent px-2 mt-2 h-64 w-full leading-normal border-0"
        :value="task.description"
        @change="updateTaskProperty('description', $event)"
      ></textarea>
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
  methods: {
    updateTaskProperty(key, event) {
      this.boardStore.updateTask(this.task, key, event.target.value)
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
