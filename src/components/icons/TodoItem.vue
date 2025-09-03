<template>
  <li>
    <label class="todoList_label">
      <input class="todoList_input" type="checkbox" value="true" v-model="todo.status" />
      <span>{{ todo.content }}</span>
    </label>
    <a type="button" @click="removeTodo(todo.id)">
      <i class="fa fa-times remove"></i>
    </a>
  </li>
</template>
<script setup>
const { todo } = defineProps({
  todo: { type: Object, required: true },
})

const emit = defineEmits(['remove-todo'])
function removeTodo(id) {
  emit('remove-todo', id)
}
</script>

<style>
.remove {
  font-size: 2rem;
}
</style>
