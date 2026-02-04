import { createRouter, createWebHistory } from "vue-router";

const layouts = () => import("@/layouts/index.vue");
const letterPractice = () => import("@/views/letterPractice.vue");
const wordPractice = () => import("@/views/wordPractice.vue");

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
          title: "日語50音練習",
        },
        component: letterPractice,
      },
      {
        path: "word-practice",
        name: "WordPractice",
        meta: {
          title: "日語單詞練習",
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
