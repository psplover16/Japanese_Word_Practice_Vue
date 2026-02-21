import { createRouter, createWebHistory } from "vue-router";

const layouts = () => import("@/layouts/index.vue");
const letterPractice = () => import("@/views/letterPractice.vue");
const wordPractice = () => import("@/views/wordPractice.vue");
const changeRules = () => import("@/views/changeRules.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: layouts,

    children: [
      {
        path: "",
        name: "Default",
        redirect: { name: "LetterPractice" },
      },
      {
        path: "letter-practice",
        name: "LetterPractice",
        meta: {
          title: "50音",
        },
        component: letterPractice,
      },
      {
        path: "change-rules",
        name: "ChangeRules",
        meta: {
          title: "變化規則",
        },
        component: changeRules,
      },
      {
        path: "word-practice",
        name: "WordPractice",
        meta: {
          title: "單字",
        },
        component: wordPractice,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
