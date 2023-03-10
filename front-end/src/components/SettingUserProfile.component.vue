<template>
  <div class="profile">
    <div class="profile-header">
      <div class="profile-header__username">歡迎 {{ username }}</div>
      <button>
        <img class="profile-header__userimage" src="../../img/user.jpg" />
      </button>
    </div>
    <div class="profile-body">
      <ul class="option-container">
        <li class="option-box">
          <span>
            <p class="option-box__title">使用者姓名</p>
            <p class="option-box__content">{{ username }}</p>
          </span>
          <span>
            <p class="option-box__title">&nbsp;</p>
            <RouterLink to="/setting/profile/changeName">
              <p class="option-box__content">更改姓名</p>
            </RouterLink>
          </span>
        </li>
        <li class="option-box">
          <span>
            <p class="option-box__title">Email</p>
            <p class="option-box__content">{{ email }}</p>
          </span>
          <span>
            <p class="option-box__title">&nbsp;</p>
            <RouterLink to="/setting/profile/changeEmail">
              <p class="option-box__content">更改Email</p>
            </RouterLink>
          </span>
        </li>
        <li class="option-box">
          <span>
            <p class="option-box__title">密碼</p>
            <p class="option-box__content">{{ password }}</p>
          </span>
          <span>
            <p class="option-box__title">&nbsp;</p>
            <RouterLink to="/setting/profile/changeEmail">
              <p class="option-box__content">更改密碼</p>
            </RouterLink>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const token = localStorage.getItem("token");
    const username = ref("");
    const email = ref("");
    const password = ref("********");
    const router = useRouter();

    console.log(`Bearer ${token}`);

    const getUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.username);
        username.value = response.data.username;
        email.value = response.data.email;
      } catch (err) {
        console.error(err);
        alert("無法獲取使用者資訊");
        router.push("/authenticate");
      }

      axios.get()
    };

    onMounted(() => {
      getUserInfo();
    });

    return {
      username,
      email,
      password,
    };
  },
};
</script>
