<template>
  <AppDrop @drop.self="moveTaskOrColumn">
    <AppDrag
      class="task"
      @click="openTask(task)"
      :transferData="{
        type: 'task',
        fromTaskIndex: taskIndex,
        fromColumnIndex: columnIndex,
      }"
    >
      <span class="w-full shrink-0 font-bold">{{ task.name }}</span>
      <p class="w-full shrink-0 mt-1 text-sm" v-if="task.description">
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
</template>

<script>
import { useBoardStore } from '@/store/BoardStore'
import AppDrag from '@/components/AppDrag'
import AppDrop from '@/components/AppDrop'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  setup() {
    const boardStore = useBoardStore()

    return {
      boardStore,
    }
  },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
  components: {
    AppDrag,
    AppDrop,
  },
  methods: {
    openTask(task) {
      this.$router.push({ name: 'TaskView', params: { id: task.id } })
    },
  },
}
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline;
}
</style>
