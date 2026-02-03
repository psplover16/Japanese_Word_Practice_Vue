import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/layouts/index.vue"),

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
        component: () => import("@/views/letterPractice.vue"),
      },
      {
        path: "word-practice",
        name: "WordPractice",
        meta: {
          title: "日語單詞練習",
        },
        component: () => import("@/views/wordPractice.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
