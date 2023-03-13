<template>
  <div class="short-article">
    <div class="header">
      <h3>{{ information.title }}</h3>
    </div>
    <div class="content">
      <router-link :to="'/full/' + information.id">
        {{ information.content }}
      </router-link>
    </div>
    <div class="detail"></div>
  </div>
</template>

<script>
export default {
  props: {
    information: {
      type: Object,
      required: true,
    },
  },
};
</script>
