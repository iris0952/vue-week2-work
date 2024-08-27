<template>
  <h1>Async Function</h1>
</template>
<script setup>
//Async/Await 使用前提，必須搭配 Promise
//1.setTimeOut -- 用 callback
//2.jQuery AJAX -- 用 callback
//3.Fetch API -- 可以用 Promise
//4.axios -- 可以用 Promise

import axios from 'axios'
console.log(axios)

//methods: get, post, delete, put, patch
//1.Promise , 2.依序運行
// axios
//   .get('https://randomuser.me/api/')
//   .then((response) => {
//     console.log(1, response)
//     return axios.get('https://randomuser.me/api/') //第二次發出的請求
//   })
//   .then((response) => {
//     console.log(2, response)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
//--------------

async function getData() {
  //定義取得什麼資料、執行甚麼方法
  const response = await axios.get('https://randomuser.me/api/') //Promise
  //加入await 會變成逐行執行
  console.log(1, response)

  //   const response2 = await axios.get('https://randomuser.me/api/')
  //   console.log(2, response2)

  try {
    //這個結構是必要的
    //正確的流程
    const response = await axios.get('https://randomuser.me/api/')
    console.log(1, response)
  } catch (error) {
    //錯誤的流程
    console.log(error)
  }
}
getData()

// Async Function 本質就是 Promise
// 1. 非同步最後才會執行
// setTimeout(() => { //非同步
//     console.log(2);
// },0)

// 2.要確保執行順序，使用 callback function
// setTimeout(() => {
//   console.log(1)
//   setTimeout(() => {
//     console.log(2)
//     setTimeout(() => {
//       console.log(3)
//     }, 7)
//   }, 10)
// }, 5)

//Promise base 搭配 Async/Await 的概念去撰寫
</script>
