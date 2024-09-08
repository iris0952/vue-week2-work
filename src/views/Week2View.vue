<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body" v-if="!isLogin">
            <h3 class="card-title text-center">{{ isRegister ? '註冊' : '登入' }}</h3>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="account" class="form-label">帳號</label>
                <input
                  type="text"
                  id="account"
                  v-model="account"
                  class="form-control"
                  placeholder="輸入信箱"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">密碼</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                  placeholder="輸入密碼"
                  required
                />
              </div>
              <div v-if="isRegister" class="mb-3">
                <label for="nickname" class="form-label">暱稱</label>
                <input
                  type="text"
                  id="nickname"
                  v-model="nickname"
                  class="form-control"
                  placeholder="輸入暱稱"
                  required
                />
              </div>
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click="isRegister ? signUp() : login()"
                >
                  {{ isRegister ? '註冊' : '登入' }}
                </button>
                <button type="button" class="btn btn-secondary" @click="toggleRegister">
                  {{ isRegister ? '返回登入' : '註冊' }}
                </button>
              </div>
            </form>
          </div>
          <div class="card-body" v-else-if="!isCheckOut">
            <h3 class="card-title text-center">驗證</h3>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="account" class="form-label">Token</label>
                <input type="text" id="account" v-model="token" class="form-control" required />
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary" @click="checkOut()">驗證</button>
                <button type="button" class="btn btn-secondary" @click="backToLogin()">
                  返回登入
                </button>
              </div>
            </form>
          </div>
          <div class="card-body" v-else>
            <h3 class="card-title text-center">Todo List</h3>
            <div class="text-end mb-3">
              <button type="button" class="btn btn-primary" @click="signOut">登出</button>
            </div>
            <div class="mb-3">
              <input
                v-model="newTodo"
                @keyup.enter="addTodo"
                type="text"
                class="form-control"
                placeholder="確認後按下enter"
              />
            </div>
            <ul class="list-group">
              <li
                v-for="todo in todoList"
                :key="todo.id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <span v-show="!todo.isEditing">{{ todo.content }}</span>
                <input type="text" v-model="todo.content" v-show="todo.isEditing" class="" />
                <div>
                  <button @click="toggleEdit(todo)" class="btn btn-primary btn-sm">
                    {{ todo.isEditing ? '確認' : '編輯' }}
                  </button>
                  <button @click="removeTodo(todo.id)" class="btn btn-danger btn-sm">刪除</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const url = 'https://todolist-api.hexschool.io'

const account = ref('')
const password = ref('')
const nickname = ref('')
const isRegister = ref(false)
const isLogin = ref(false)
const isCheckOut = ref(false)
const token = ref('')

const signUp = async () => {
  try {
    const response = await axios.post(`${url}/users/sign_up`, {
      email: account.value,
      password: password.value,
      nickname: nickname.value
    })
    alert('註冊成功')
    toggleRegister()
  } catch (error) {
    alert('註冊失敗:' + error.message)
  }
}

const login = async () => {
  try {
    const response = await axios.post(`${url}/users/sign_in`, {
      email: account.value,
      password: password.value
    })
    token.value = response.data.token
    alert('登入成功')
    account.value = ''
    password.value = ''
    isLogin.value = true
  } catch (error) {
    alert('登入失敗:' + error.message)
  }
}

const checkOut = async () => {
  try {
    if (!token.value) {
      alert('Token is missing')
      return
    }
    const response = await axios.get(`${url}/users/checkout`, {
      headers: {
        Authorization: token.value
      }
    })
    isCheckOut.value = true
    alert('驗證成功 UID: ' + response.data.uid)
    getTodo()
  } catch (error) {
    alert('驗證失敗: ' + error.message)
  }
}

const signOut = async () => {
  try {
    const response = await axios.post(
      `${url}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: token.value
        }
      }
    )
    alert('登出成功')
    token.value = ''
    backToLogin()
  } catch (error) {
    console.log(error)

    alert('登出失敗: ' + error.message)
  }
}

const todoList = ref([])

const getTodo = async () => {
  const response = await axios.get(`${url}/todos`, {
    headers: {
      Authorization: token.value
    }
  })
  todoList.value = response.data.data.map((todo) => ({ ...todo, isEditing: false }))
}

const newTodo = ref('')

const addTodo = async () => {
  try {
    const todo = {
      content: newTodo.value
    }

    await axios.post(`${url}/todos`, todo, {
      headers: {
        Authorization: token.value
      }
    })

    alert('新增成功')
    newTodo.value = ''
    getTodo()
  } catch (error) {
    alert('新增失敗:' + error.message)
  }
}

const removeTodo = async (id) => {
  try {
    await axios.delete(`${url}/todos/${id}`, {
      headers: {
        Authorization: token.value
      }
    })

    alert('刪除成功')
    getTodo()
  } catch (error) {
    alert('刪除失敗:' + error.message)
  }
}

const toggleEdit = (todo) => {
  if (todo.isEditing) {
    updateTodo(todo.id)
  } else {
    todo.isEditing = true
  }
}

const updateTodo = async (id) => {
  try {
    const todo = todoList.value.find((todo) => todo.id === id)

    await axios.put(`${url}/todos/${id}`, todo, {
      headers: {
        Authorization: token.value
      }
    })

    getTodo()
    alert('編輯成功')
  } catch (error) {
    alert('編輯失敗:' + error.message)
  }
}

const backToLogin = () => {
  token.value = ''
  isRegister.value = false
  isLogin.value = false
}

const toggleRegister = () => {
  isRegister.value = !isRegister.value
  account.value = ''
  password.value = ''
  nickname.value = ''
}
</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>
