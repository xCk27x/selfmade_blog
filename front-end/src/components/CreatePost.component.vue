<template>
  <div class="createArticle">
    <!--新增留言的component-->
    <h1>在這裡撰寫你的新文章吧~</h1>
    <form @submit.prevent="addPost">
      <div class="createArticle__header">
        <label for="title" class="label_header">文章標題</label>
        <input type="text" v-model="title" />
      </div>
      <div class="createArticle__body">
        <label for="content" class="label_header">文章內容</label>
        <textarea v-model="content"></textarea>
      </div>
      <input type="submit" value="發布貼文" class="btn" />
    </form>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    const token = localStorage.getItem("token");
    const title = ref("");
    const content = ref("");
    const post = reactive([]);

    console.log(token);

    const addPost = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/post",
          {
            title: title.value,
            content: content.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        post.push(response.data.post);
        console.log("Post created");
        alert("成功發布新文章了，歡迎你繼續分享更多創作");
      } catch (error) {
        console.error(error);
      }
      title.value = "";
      content.value = "";
    };

    return {
      title,
      content,
      post,
      addPost,
    };
  },
};
</script>
