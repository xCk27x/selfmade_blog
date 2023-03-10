<template>
  <div class="sign-up">
    <h2>我還沒有帳號</h2>
    <form @submit.prevent="register" class="input-container">
      <label for="username">Username:</label>
      <input
        v-model="username"
        type="text"
        autocomplete="off"
        name="username"
        required
      />
      <label for="email">Email:</label>
      <input
        v-model="email"
        type="email"
        name="email"
        autocomplete="new-password"
        required
      />
      <label for="password">Password:</label>
      <input
        v-model="password"
        type="password"
        name="password"
        autocomplete="new-password"
        required
      />
      <label for="comfirmPassword">Comfirm Password:</label>
      <input
        v-model="confirmPassword"
        type="password"
        name="comfirmPassword"
        autocomplete="new-password"
        required
      />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const router = useRouter();

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        console.error("Password and confirm password do not match");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/register",
          {
            username: username.value,
            email: email.value,
            password: password.value,
          }
        );
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        router.push("/show");
        alert("帳號註冊成功，將為您重新導向");
      } catch (error) {
        console.error(error);
        alert("註冊失敗");
      }
    };

    return {
      username,
      email,
      password,
      confirmPassword,
      register,
    };
  },
};
</script>
