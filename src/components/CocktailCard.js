const CocktailCard = {
  template:`
  <aside>
    <img :src="cocktail.strDrinkThumb">

  <div class="cocktail-title">
    <h2>{{ cocktail.strDrink }}
      <sup :class="[{ alcoholic:cocktail.strAlcoholic=='Alcoholic'}]">
        {{ cocktail.strAlcoholic }}
      </sup>
    </h2>

    <ul>
    <p><strong>Ingrédients :</strong></p>
      <li v-for="ingredient in ingredientsList">
        {{ ingredient.ingredient }} <span v-if="ingredient.measure!=null">( {{ingredient.measure}} )</span>
      </li>
    </ul>
  </div>

  </aside>
  `,
  props: {
    cocktail: Object,
  },
  data() {
    return {
      ingredientsList:[],
    }
  },
  mounted() {
    this.setIngredients();
  },

  methods: {
    setIngredients() {
      for (let index = 1; index < 15; index++) {
        if (this.cocktail[`strIngredient${index}`] != null) {
          var ingredient = {
            ingredient: this.cocktail[`strIngredient${index}`],
            measure: this.cocktail[`strMeasure${index}`]
          }
        }
        this.ingredientsList.push(ingredient);
      }
      this.ingredientsList = this.ingredientsList.filter((item,
        index) => this.ingredientsList.indexOf(item) === index);
    }
  }

}

export default CocktailCard;