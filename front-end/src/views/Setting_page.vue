<template>
  <section class="section-setting">
    <div class="setting-view">
      <RouterLink to="/setting/profile">
        <div class="setting-view__option"><b>profile</b></div>
      </RouterLink>
      <RouterLink to="/setting/posts">
        <div class="setting-view__option"><b>posts</b></div>
      </RouterLink>
    </div>
    <RouterView />
  </section>
</template>

<script>
export default {};
</script>
