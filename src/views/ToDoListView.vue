<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"><span>王小明的代辦</span></a>
        </li>
        <li @click="handleSignout">登出</li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <TodoInput @add-todo="addTodo" />
        <TodoList v-if="todos.length" :todos="todos" @remove-todo="removeTodo" />
        <p v-else>尚無代辦事項</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import TodoInput from '@/components/icons/TodoInput.vue'
import TodoList from '@/components/icons/TodoList.vue'

import { signout } from '@/utils/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const todos = ref([])

//string.trim()移除字串前後的所有空白字元（含空格、換行、tab 等），並回傳新的字串。
//透過 .trim()，可以避免新增無效的待辦事項。
const addTodo = (content) => {
  if (content.trim() !== '') {
    todos.value.push({
      id: Date.now(),
      content,
      status: false,
    })
  }
}

const removeTodo = (id) => {
  todos.value = todos.value.filter((t) => t.id !== id)
}

const handleSignout = async () => {
  try {
    await signout()
    document.cookie = 'mycookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    alert('成功登出')
    router.push('/login')
  } catch (err) {
    alert(err.response.data.message)
  }
}
</script>

<style>
li {
  cursor: pointer;
  margin-left: 20px;
}

li:hover {
  color: darkgoldenrod;
}
</style>
