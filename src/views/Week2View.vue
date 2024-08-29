<template>
  <h1>Week2 作業</h1>
  <div>
    <h2>註冊</h2>
    <input type="email" placeholder="Email" v-model="signUpField.email" />
    <input type="text" placeholder="Password" v-model="signUpField.password" />
    <input type="text" placeholder="暱稱" v-model="signUpField.nickname" />
    <button type="button" @click="signUp">註冊</button> <br />
    <p class="text-danger" v-if="signUpErrMsg">{{ signUpErrMsg }}</p>
    <p class="text-danger" v-else>{{ signUpRes }}</p>
  </div>
  <div>
    <h2>登入</h2>
    <input type="email" placeholder="Email" v-model="signInField.email" />
    <input type="text" placeholder="Password" v-model="signInField.password" />
    <button type="button" @click="signIn">登入</button> <br />
    <p class="text-danger" v-if="signInErrMsg">{{ signInErrMsg }}</p>
    <p class="text-danger" v-else>{{ signInRes }}</p>
  </div>
  <div>
    <h2>驗證</h2>
    <div v-if="user.uid">
      <p>UID: {{ user.uid }}</p>
      <p>Nickname: {{ user.nickname }}</p>
    </div>
    <div v-else>你還沒有登入喔！</div>
  </div>
  <div>
    <h2>登出</h2>
    <button type="button" @click="signOut">登出</button>
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
const signUpErrMsg = ref('')

const signUp = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_up`, signUpField.value)
    console.log(res)
    signUpRes.value = '註冊成功'
    // signUpRes.value = res.data.uid
  } catch (error) {
    console.log(error)
    signUpErrMsg.value = error.response.data.message
  }
}

//登入
const signInField = ref({
  email: '',
  password: ''
})

const signInRes = ref('')
const signInErrMsg = ref('')

const signIn = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_in`, signInField.value)
    console.log(res)
    // signInRes.value = res.data.token
    signInRes.value = '登入成功'
    document.cookie = `customTodoToken=${res.data.token};`
  } catch (error) {
    console.log(error)
    signInErrMsg.value = error.response.data.message
  }
}

const user = ref({
  nickname: '',
  uid: ''
})

const token = ref('')

//validation
onMounted(async () => {
  const cookie = document.cookie.replace(
    /(?:(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  token.value = cookie
  console.log(cookie)
  if (cookie) {
    validation()
  }
})

const validation = async () => {
  try {
    const res = await axios.get(`${api}/users/checkout`, {
      headers: {
        Authorization: token.value
      }
    })
    user.value = res.data
    // getTodos()
  } catch (err) {
    // validation failed should logout the user
    console.log(err.response.data.message)
    signOut()
  }
}

// signout
const signOut = async () => {
  try {
    await axios.post(
      `${api}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: token.value
        }
      }
    )
    token.value = ''
    document.cookie = `customTodoToken=;`
    user.value = {}
  } catch (err) {
    console.log(err.response.data.message)
  }
}
</script>
<style>
.text-danger {
  color: red;
  font-size: 0.9rem;
}
</style>
