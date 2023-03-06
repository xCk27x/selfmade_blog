<template>
  <div class="sign-in">
    <h2>我已經有帳號了</h2>
    <form class="input-container">
      <label for="email">Email</label><br>
      <input
        type="email"
        v-model="email"
        placeholder="email"
        autocomplete="off"
        required
      /><br>

      <label for="password">密碼</label><br>
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        autocomplete="off"
        required
      /><br>

      <button>登入</button>
    </form>
  </div>
</template>

<script></script>