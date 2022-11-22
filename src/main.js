import MainMenu from "./components/MainMenu.js";
import CocktailHeader from "./components/CocktailHeader.js";
import CocktailCard from "./components/CocktailCard.js";
import router from "./router/index.js";

const options = {
  data() {
    return {
      message: "Message",
    };
  },
  components: {
    MainMenu,
    CocktailHeader,
    CocktailCard
  },
};

const app = Vue.createApp(options);
app.use(router);
app.component('CocktailCard', CocktailCard);

app.mount("#app");
