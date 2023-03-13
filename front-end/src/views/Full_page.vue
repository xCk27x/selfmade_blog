<template>
  <section class="section-full">
    <post-content :id="postId"></post-content>
  </section>
</template>

<script>
import AllContent from "../components/FullPagePost.component.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    "post-content": AllContent,
  },
  setup() {
    const route = useRoute();
    const postId = route.params.id;

    return {
      postId,
    };
  },
};
</script>
