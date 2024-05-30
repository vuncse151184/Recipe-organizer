import { configureStore } from '@reduxjs/toolkit'
import getAllRecipes from './reducers/getAllDataRecipes'
import planSlice from './reducers/planSlice'
import userSlice from './reducers/userSlice'
import getRecipeDetail from './reducers/getRecipeDetail'
import ingredientSlice from './reducers/ingredientSlice'
import bestRecipe from './reducers/getBestRecipesSlice'
import favoriteRecipe from './reducers/getFavoritesRecipeSlice'
import uFavor from './reducers/getFavoriteUserSlice'

const store = configureStore({
    reducer: {
        getAllRecipes: getAllRecipes,
        plan: planSlice,
        user: userSlice,
        getRecipeDetail: getRecipeDetail,
        ingredient: ingredientSlice,
        bestRecipe: bestRecipe,
        favoriteRecipe: favoriteRecipe,
        uFavor: uFavor,
    },
})

export default store
