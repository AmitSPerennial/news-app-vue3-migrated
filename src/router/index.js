import { createWebHistory, createRouter } from "vue-router";
import TopNewsComponent from "@/screens/TopNews.vue";
import BookmarksComponent from "@/screens/Bookmarks.vue";

const routes = [
  { path: "/", component: TopNewsComponent },
  { path: "/bookmarks", component: BookmarksComponent },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;