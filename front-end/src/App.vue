<template>
  <header>
    <router-link to="/">
      <div class="website-name">
        <h1>Ck27 Blog</h1>
      </div>
    </router-link>
    <nav>
      <router-link to="/article">
        <div class="nav__item">
          <h2>文章總覽</h2>
        </div>
      </router-link>
      <router-link to="/create">
        <div class="nav__item">
          <h2>新文章</h2>
        </div>
      </router-link>
      <router-link to="/authenticate">
        <div class="nav__item">
          <h2>登入</h2>
        </div>
      </router-link>
    </nav>
  </header>
  <RouterView />
</template>

<script></script>
