<template>
  <div class="userposts">
    <div class="userposts-header"></div>
    <div class="userposts-body"></div>
  </div>
</template>

<script>
import ShortPost from './ShortPagePost.vue'
import { ref } from 'vue';

export default {
  components: {
    'short-post': ShortPost,
  },
  setup() {
    const articles = ref([]);

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
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };
    return {
      articles,
    };
  }
} 
</script>
