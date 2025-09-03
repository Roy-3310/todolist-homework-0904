<template>
  <div class="todoList_list">
    <ul class="todoList_tab">
      <li>
        <a
          style="cursor: pointer"
          @click="currentFilter = 'all'"
          :class="{ active: currentFilter === 'all' }"
          >全部</a
        >
      </li>
      <li>
        <a
          style="cursor: pointer"
          @click="currentFilter = 'yet'"
          :class="{ active: currentFilter === 'yet' }"
          >待完成</a
        >
      </li>
      <li>
        <a
          style="cursor: pointer"
          @click="currentFilter = 'ok'"
          :class="{ active: currentFilter === 'ok' }"
          >已完成</a
        >
      </li>
    </ul>
    <div class="todoList_items">
      <ul class="todoList_item">
        <!-- $event代表事件物件 或是子元件傳出的資料 -->
        <TodoItem
          v-for="todo in currentStatus"
          :key="todo.id"
          :todo="todo"
          @remove-todo="emit('remove-todo', $event)"
        />
      </ul>
      <div class="todoList_statistics">
        <p>{{ count }} 個待完成項目</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import TodoItem from './TodoItem.vue'
const { todos } = defineProps({
  todos: { type: Array, required: true },
})

const emit = defineEmits(['remove-todo'])

const currentFilter = ref('all')

const currentStatus = computed(() => {
  switch (currentFilter.value) {
    case 'yet':
      return todos.filter((t) => !t.status)
    case 'ok':
      return todos.filter((t) => t.status)
    default:
      return todos
  }
})
const count = computed(() => {
  const temp = todos.filter((t) => !t.status)
  return temp.length
})
</script>
