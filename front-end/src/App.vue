<template>
  <header>
    <router-link to="/">
      <div class="website-name">
        <h1>Ck27 Blog</h1>
      </div>
    </router-link>
    <nav>
      <router-link to="/show">
        <div class="nav__item">
          <h2>文章總覽</h2>
        </div>
      </router-link>
      <router-link to="/create">
        <div class="nav__item">
          <h2>新文章</h2>
        </div>
      </router-link>
      <router-link v-if="!isLoggedin" to="/authenticate">
        <div class="nav__item">
          <h2>登入</h2>
        </div>
      </router-link>
      <router-link v-else to="/setting">
        <div class="nav__item">
          <h2>使用者設定</h2>
        </div>
      </router-link>
    </nav>
  </header>
  <RouterView />
</template>

<script>
import { computed } from "vue";
import store from "./store";

window.addEventListener("storage", (event) => {
  if (event.key === "token") {
    console.log(localStorage.getItem("token"));
  }
});

export default {
  setup() {
    const isLoggedin = computed(() => store.state.isLoggedin);

    console.log(isLoggedin.value);

    return {
      isLoggedin,
    };
  },
};
</script>
