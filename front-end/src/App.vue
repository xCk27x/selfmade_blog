<template>
  <header>
    <router-link to="/" class="website-name float-left">Ck27 Blog</router-link>
    <router-link v-if="!isLoggedin" to="/authenticate" class="website-name float-right">登入</router-link>
    <router-link v-else to="/setting" class="website-name float-right">使用者設定</router-link>
    <router-link to="/create" class="website-name float-right">新文章</router-link>
    <router-link to="/show" class="website-name float-right">文章總覽</router-link>
  </header>
  <main>
    <RouterView />
  </main>
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
