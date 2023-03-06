import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Authenticate from "@/views/Authenticate.vue";
import PostArticle from "@/views/PostArticle.vue";
import CreateArticle from "@/views/CreateArticle.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/authenticate",
    name: "Authenticate",
    component: Authenticate,
  },
  {
    path: "/article",
    name: "PostArticle",
    component: PostArticle,
  },
  {
    path: "/create",
    name: "CreateArticle",
    component: CreateArticle,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
