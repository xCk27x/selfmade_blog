<template>
  <div class="userposts">
    <short-post
      v-for="post in posts"
      :key="post.id"
      :information="post"
    ></short-post>
  </div>
</template>

<script>
import ShortPost from "./ShortPagePost.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  components: {
    "short-post": ShortPost,
  },
  setup() {
    const posts = ref([]);

    const getNPostRandom = async (num) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/random/${num}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        posts.value = response.data;
        console.log(posts.value);
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(() => {
      getNPostRandom(10);
    });

    return {
      posts,
    };
  },
};
</script>
