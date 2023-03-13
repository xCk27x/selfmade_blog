import { createRouter, createWebHistory } from "vue-router";

// 引用pages
import Home from "@/views/Home_page.vue";
import Authenticate from "@/views/Authenticate_page.vue";
import Create from "@/views/Create_page.vue";
import Show from "@/views/Show_page.vue";
import Setting from "@/views/Setting_page.vue";
import Full from "@/views/Full_page.vue";
import AllContent from "@/components/FullPagePost.component.vue";
import UserProfile from "@/components/SettingUserProfile.component.vue";
import UserPosts from "@/components/SettingUserPosts.component.vue";
import ChangeName from "@/components/ChangeName.component.vue";
import ChangeEmail from "@/components/ChangeEmail.component.vue";
import ChangePassword from "@/components/ChangePassword.component.vue";

// 定義路由
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/authenticate",
    name: "AuthenticatePage",
    component: Authenticate,
  },
  {
    path: "/show",
    name: "showPost",
    component: Show,
  },
  {
    path: "/create",
    name: "createPost",
    component: Create,
  },
  {
    path: "/full",
    name: "FullPagePost",
    component: Full,
    children: [
      {
        path: ":id",
        name: "AllContentById",
        component: AllContent,
      },
    ]
  },
  {
    path: "/setting",
    name: "setting",
    component: Setting,
    children: [
      {
        path: "profile",
        name: "profile",
        component: UserProfile,
        children: [
          {
            path: "changeName",
            name: "changeName",
            component: ChangeName,
          },
          {
            path: "changeEmail",
            name: "changeEmail",
            component: ChangeEmail,
          },
          {
            path: "changePassword",
            name: "changePassword",
            component: ChangePassword,
          },
        ],
      },
      {
        path: "posts",
        name: "posts",
        component: UserPosts,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
