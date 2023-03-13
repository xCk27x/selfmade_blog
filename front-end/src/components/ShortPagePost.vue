<template>
  <div class="short-article">
    <div class="header"></div>
    <div class="content">
      <<router-link to="{name: 'FullPagePost', params: {id: post.id}}"></router-link>
    </div>
    <div class="detail"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const title = ref("");
    const content = ref("");
    const author = ref("");

    const getOnePostRandom = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/post/random",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        title.value = response.title;
        content.value = response.content;
        author.value = response.author_name;
      } catch (err) {
        console.error(err);
      }
    };
    return {
      title,
      content,
      author,
    };
  },
};
</script>
