import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";

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
        redirect: { name: "LetterPractice" },
      },
      {
        path: "letter-practice",
        name: "LetterPractice",
        meta: {
          title: "日語50音練習（平假名 / 片假名）",
        },
        component: defineAsyncComponent(letterPractice),
      },
      {
        path: "word-practice",
        name: "WordPractice",
        meta: {
          title: "日語單詞練習",
        },
        component: defineAsyncComponent(wordPractice),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
