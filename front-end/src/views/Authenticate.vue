<template>
  <section class="section-authenticate">
    <signIn-page></signIn-page>
    <signUp-page></signUp-page>
  </section>
</template>

<script>
import signIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import axios from "axios";

export default {
  name: "authentication-page",
  components: {
    "signIn-page": signIn,
    "signUp-page": SignUp,
  },
}
</script>