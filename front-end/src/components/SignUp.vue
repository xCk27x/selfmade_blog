<template>
  <div class="sign-up">
    <h2>我還沒有帳號</h2>
    <form class="input-container">
      <label for="email">Email</label><br>
      <input type="email" v-model="email" placeholder="email" autocomplete="off" required /><br>

      <label for="password">密碼</label><br>
      <input type="password" v-model="password" placeholder="Password" autocomplete="off" required /><br>

      <label for="password">確認密碼</label><br>
      <input type="password" v-model="confirmPassword" placeholder="Password" autocomplete="off" required /><br>

      <button @click="handleLogin">註冊</button>
    </form>
  </div>
</template>

<script></script>