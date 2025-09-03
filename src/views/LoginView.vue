<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            v-model="email"
            required
          />
          <span v-if="!email">此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            v-model="password"
            required
          />
          <span v-if="!password">此欄位不可留空</span>
          <input class="formControls_btnSubmit" type="button" @click="handleLogin" value="登入" />
          <router-link class="formControls_btnLink" to="/signup">註冊帳號</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from '@/utils/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

//表單資料 記得清除
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const res = await login(email.value, password.value)
    const { token } = res.data
    document.cookie = `mycookie=${token}`
    alert('登入成功')
    router.push('/todo')
  } catch (err) {
    alert(err.response.data.message)
  }
}
</script>
