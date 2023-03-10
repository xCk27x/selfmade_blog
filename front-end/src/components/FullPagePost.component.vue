<template>
  <li class="article">
    <div class="article__header">
      <h3>{{ post.title }}</h3>
      <p class="author">author: {{ author }}</p>
    </div>
    <div class="article__body">
      <p>{{ post.content }}</p>
    </div>
  </li>
  <!-- <div class="article">
    <div class="article__header">
      <h3>{{ title }}</h3>
      <p class="author">author: {{ author }}</p>
    </div>
    <div class="article__body">
      {{ paragraph }}
    </div>
    <article-comment></article-comment>
  </div> -->
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    post: {
      required: true,
      type: Object,
    },
  },
  setup() {
    const author = ref("Derek");

    return {
      author,
    };
  },
};
</script>
