<template>
  <section class="section-create">
    <create-post></create-post>
  </section>
</template>

<script>
import createPost from "../components/CreatePost.component.vue";

export default {
  components: {
    "create-post": createPost,
  },
};
</script>
