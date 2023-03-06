<template>
  <div class="comment-container">
    <h3 class="comment__header">對這篇文章由任何想法嗎? 歡迎在底下留言</h3>
    <div class="comment__body">
      <textarea class="comment__body--input" type="text" cols="40" v-model="commentContent"/>
      <button class="comment__body--button">送出評論</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentContent: '',
    }
  },
}
</script>