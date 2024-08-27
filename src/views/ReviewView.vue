<template>
  <h1>Review</h1>
  <div>
    <input type="text" v-model="newName" />{{ newName }}
    <input type="number" v-model="newNumber" />{{ newNumber }}
    <button type="button" @click="addProduct">新增資料</button>
  </div>
  {{ data }}
  <table>
    <thead>
      <tr>
        <th>標題</th>
        <th>價格</th>
        <th>調整價格</th>
        <th>刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td><input type="number" v-model="item.price" /></td>
        <td><button type="button" @click="delItem(item.id)">刪除</button></td>
      </tr>
    </tbody>
  </table>
  <h2>Sum：{{ sum }}</h2>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const newName = ref('')
const newNumber = ref(0)
const data = ref([])

const addProduct = () => {
  console.log('addProduct')
  data.value.push({
    id: new Date().getTime(),
    name: newName.value,
    price: newNumber.value
  })
  newName.value = ''
  newNumber.value = 0
}
const delItem = (id) => {
  const index = data.value.findIndex((item) => item.id === id)
  data.value.splice(index, 1)
}
// forEach 寫法
// const sum = computed(() => {
//   console.log('sum:', data.value)
//   let tempSum = 0
//   data.value.forEach((item) => {
//     tempSum += item.price
//   })
//   return tempSum
// })

// reduce 寫法
// const sum = computed(() => {
//   console.log('sum:', data.value)
//   const tempSum = data.value.reduce((pre, item) => {
//     console.log(pre, item)
//     return pre + item.price //第一次為外部傳入，第二次以後為前一個 return
//   }, 0)

//   return tempSum
// })

//reduce 簡寫
const sum = computed(() => {
  return data.value.reduce((pre, item) => pre + item.price, 0)
})
let interValId = 0
onMounted(() => {
  //AJAX
  setTimeout(() => {
    data.value = [
      { id: 1, name: '白飯', price: 20 },
      { id: 2, name: '魯豬腳', price: 50 },
      { id: 3, name: '青菜', price: 30 },
      { id: 4, name: '豆乾', price: 15 },
      { id: 5, name: '海帶', price: 15 }
    ]
  }, 1000)
})

//重複觸發
interValId = setInterval(() => {
  console.log(1)
}, 500)

onUnmounted(() => {
  clearInterval(interValId)
})
</script>
<style></style>
