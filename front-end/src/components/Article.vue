<template>
  <div class="article">
    <div class="article__header">
      <h3>{{ title }}</h3>
      <p class="author">author: {{ author }}</p>
    </div>
    <div class="article__body">
      {{ paragraph }}
    </div>
    <article-comment ></article-comment>
  </div>
</template>

<script>
import articleComment from '@/components/CommentBox.vue'

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: 'unknow',
    },
    paragraph: {
      type: String,
      default: 'Oh! this article has no content~',
    },
    createAt: Object,
  },
  components: {
    'article-comment': articleComment,
  },
}
</script>