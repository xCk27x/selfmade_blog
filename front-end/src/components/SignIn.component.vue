<template>
  <div class="login">
    <h2>登錄</h2>
    <form @submit.prevent="login" class="input-container">
      <label for="email">Email:</label>
      <input v-model="email" type="email" name="email" required />
      <label for="password">Password:</label>
      <input v-model="password" type="password" name="password" required />
      <button type="submit">登陸</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import store from "../store";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/login",
          {
            email: email.value,
            password: password.value,
          }
        );
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        store.commit("userLogin");
        // 登陸成功，導航到'/article'
        router.push("/show");
        alert("登入成功");
      } catch (error) {
        // 登陸失敗，顯示錯誤訊息
        console.error(error);
        alert("登入失敗，請重新檢查您的帳好及密碼是否有誤");
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>
