import CocktailCard from "../components/CocktailCard.js";
import MainMenu from "../components/MainMenu.js";
import { getRandomCocktail, getNonAlcoholic, getCocktailsListByIngredient, getCocktailsByName, getCocktailById } from "../services/cocktails.js";


const MainView = {
  template: `
  <main-menu
    @getRandomCocktail=randomCocktail
    @getNonAlcoholicCocktail=nonAlcoholicCocktail
    @getCocktailsByName=cocktailsByName
    @getCocktailsByIngredient=cocktailsByIngredient
  >
  </main-menu>

  <p class="results" v-if=isCocktailsListEmpty>{{ this.cocktailsList.length }} résultat<span v-if="this.cocktailsList.length > 1">s</span></p>

  <div class="loader" v-if="loaderState"></div>

  <section>
    <article class="error-message" v-if=error.error>
      <aside>{{ error.message }}</aside>
    </article>
    <cocktail-card v-for="cocktail in this.cocktailsList" :cocktail=cocktail></cocktail-card>
  </section>
  `,
  components: {
    CocktailCard,
    MainMenu
  },
  data() {
    return {
      cocktailsList: [],
      loaderState: false,
      error: {
        error: false,
        message: ""
      }
    }
  },
  computed: {
    isCocktailsListEmpty () {
      return this.cocktailsList.length > 0 ? true : false;
    }
  },
  methods: {
    startLoading() {
      this.loaderState = true;
    },

    endLoading () {
      this.loaderState = false;
    },

    resetData () {
      this.cocktailsList = [];
      this.error = {
        error: false,
        message: ""
      };
    },

    async randomCocktail () {
      this.resetData();
      this.cocktailsList = await getRandomCocktail();
    },

    async nonAlcoholicCocktail () {
      var list = await getNonAlcoholic();
      const randomDrink = Math.floor(Math.random() * list.length);
      const drink = await getCocktailById(list[randomDrink].idDrink);
      await this.resetData();
      this.cocktailsList.push(drink);
    },

    async cocktailsByIngredient (ingredient) {
      this.startLoading()
      this.resetData();
      if (ingredient) {
        var idList = await getCocktailsListByIngredient(ingredient);
        const promiseArray = [];

        idList.forEach((id) => {
          promiseArray.push(getCocktailById(id));
        });

        await Promise.all(promiseArray)
          .then(data => this.cocktailsList = data);

      } else {
        this.error = {error: true, message: 'Vous devez sélectionner un ingrédient'}
      }
      this.endLoading();
    },

    async cocktailsByName (name) {
      this.resetData();
      if (name) {
        var list = await getCocktailsByName(name);
        if(!list.error){
          this.cocktailsList = list;
        } else {
          this.error = list;
        }
      } else {
        this.error = {error: true, message:"Vous devez entrer le nom d'un cocktail"}
      }
    },
  },
};

export default MainView;
