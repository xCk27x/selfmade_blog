<template>
  <section class="section-show">
    <h2>這裡是所有的文章，歡迎查閱~</h2>
    <ul>
      <single-post :post="post" v-for="post in posts" :key="post.id"></single-post>
    </ul>
  </section>
</template>

<script>
import { reactive, onMounted } from "vue";
import axios from "axios";

import singlePost from "../components/FullPagePost.component.vue";

export default {
  components: {
    "single-post": singlePost,
  },

  setup() {
    const token = localStorage.getItem("token");
    const posts = reactive([]);

    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/post", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        posts.push(...response.data);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      getPosts();
    });

    return {
      posts,
    };
  },
};
</script>
