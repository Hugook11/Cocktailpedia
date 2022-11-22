import MainView from "../views/MainView.js";
import CreditsView from "../views/CreditsView.js";
import NotFound from "../views/NotFound.js";

const routes = [
  { path: "/", name:"mainView", component: MainView },
  { path: "/index.html", redirect: "/" },
  { path: "/credits", name:"credits", component: CreditsView},
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
