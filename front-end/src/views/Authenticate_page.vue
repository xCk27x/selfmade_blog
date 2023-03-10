<template>
  <section class="section-authenticate">
    <signIn-page></signIn-page>
    <signUp-page></signUp-page>
  </section>
</template>

<script>
import signIn from "@/components/SignIn.component.vue";
import SignUp from "@/components/SignUp.component.vue";

export default {
  name: "authentication-page",
  components: {
    "signIn-page": signIn,
    "signUp-page": SignUp,
  },
};
</script>
