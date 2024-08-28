<template>
  <h1>Todo API</h1>
  <div>
    <h2>註冊</h2>
    <input type="email" placeholder="Email" v-model="signUpField.email" />
    <input type="text" placeholder="Password" v-model="signUpField.password" />
    <input type="text" placeholder="nickname" v-model="signUpField.nickname" />
    <button type="button" @click="signUp">註冊</button><br />
    {{ signUpField }} <br />
    UID: {{ signUpRes }}
  </div>
  <div>
    <h2>登入</h2>
    <input type="email" placeholder="Email" v-model="signInField.email" />
    <input type="text" placeholder="Password" v-model="signInField.password" />
    <button type="button" @click="signIn">登入</button><br />
    {{ signInField }} <br />
    Token: {{ signInRes }}
  </div>
  <div>
    <h2>驗證</h2>
    <div v-if="user.uid">
      <p>UID: {{ user.uid }}</p>
      <p>Nickname: {{ user.nickname }}</p>
    </div>
    <div v-else>你還沒有登入喔！</div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const api = 'https://todolist-api.hexschool.io'
//註冊
const signUpField = ref({
  email: '',
  password: '',
  nickname: ''
})
const signUpRes = ref('')
const signUp = async () => {
  try {
    console.log(`${api}/users/sign_up`)
    const res = await axios.post(`${api}/users/sign_up`, signUpField.value)
    console.log(res)
    signUpRes.value = res.data.uid
  } catch (error) {
    console.log(error)
  }
}

//登入
const signInField = ref({
  email: '',
  password: ''
})
const signInRes = ref('')
const signIn = async () => {
  try {
    console.log(`${api}/users/sign_in`)
    const res = await axios.post(`${api}/users/sign_in`, signInField.value)
    console.log(res)
    signInRes.value = res.data.token
    document.cookie = `customTodoToken=${res.data.token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`
  } catch (error) {
    console.log(error)
  }
}

const user = ref({
  nickname: '',
  uid: ''
})
//驗證登入
onMounted(async () => {
  var token = document.cookie.replace(/(?:(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  console.log(token)

  const res = await axios.get(`${api}/users/checkout`, {
    headers: {
      Authorization: token
    }
  })

  console.log(res)
  user.value = res.data
})
</script>
