import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import DefaultLayout from '../components/DefaultLayout'

import PlanMeal from '../pages/PlanMeal'
import CreateRecipe from '../pages/CreateRecipe'
import FavoriteRecipe from '../pages/FavortieRecipe'
import Register from '../pages/Register'
// import UserList from '../pages/Register/UserList'
import UserList from '../pages/UserList'
import IngredientList from '../pages/Ingredients'
import UpdateIngredient from '../pages/UpdateIngredient'
import Login from '../pages/Login'
import Home from '../pages/Home/HomePage'
import NotFound from '../pages/NotFound'
import RecipeDetail from '../pages/RecipeDetail/RecipeDetail'
import PlanDetail from '../pages/PlanDetail'
import LayoutWithoutFilter from '../components/LayoutWithoutFilter'
import Profile from '../pages/Profile'
import ViewCooker from '../pages/ViewCooker'
import PrivateRouters from './PrivateRouters'
// import PrivateAuthRouters fro./AdminRoutersers'
import SearchResult from '../pages/SearchResult'
import SearchResultFavorite from '../pages/SearchResult/searchFavorite'
import UpdateRecipe from '../pages/UpdateRecipe'
import MyRecipe from '../pages/MyRecipe'
import AdminRouters from './AdminRouters'
import CookerRouters from './CookerRouters'
import UserRouters from './UserRouters'
export const publicRouters = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/search-results',
        name: 'search-results',
        component: SearchResult,
    },
    {
        path: '/recipe-detail/:id',
        name: 'recipe-detail',
        component: RecipeDetail,
        layout: LayoutWithoutFilter,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        layout: null,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        layout: null,
    },
    {
        path: '/error',
        name: 'error',
        component: NotFound,
        layout: null,
    },
    // {
    //     path: '/create-plan',
    //     name: 'create-plan',
    //     component: CreatePlan,
    //     layout: LayoutWithoutFilter,
    // },
    {
        path: '/favorite-recipe',
        name: 'favorite-recipe',
        component: FavoriteRecipe,
        layout: LayoutWithoutFilter,
    },
    {
        path: '/plan',
        name: 'plan',
        component: PlanMeal,
        layout: LayoutWithoutFilter,
    },
    {
        path: '/create-recipe',
        name: 'create-recipe',
        component: CreateRecipe,
        layout: LayoutWithoutFilter,
    },
    {
        path: '/recipe-cooker/:id',
        name: 'recipe-cooker',
        component: ViewCooker,
        layout: LayoutWithoutFilter,
    },
]

export const privateRouters = [
    {
        path: '/profile',
        name: 'user-profile',
        component: Profile,
        layout: LayoutWithoutFilter,
    },
]

export const adminRouters = [
    {
        path: '/user-list',
        name: 'user-list',
        component: UserList,
        layout: LayoutWithoutFilter,
    },
    {
        path: '/ingredient-list',
        name: 'ingredient-list',
        component: IngredientList,
        layout: LayoutWithoutFilter,
    },
    {
        path: '/ingredient-detail/:id',
        name: 'ingredient-detail',
        component: UpdateIngredient,
        layout: LayoutWithoutFilter,
    },
]

export const cookerRouters = [
    {
        path: '/update-recipe/:id',
        name: 'update-recipe',
        component: UpdateRecipe,
        layout: LayoutWithoutFilter,
    },
    {
        path: '/my-recipe',
        name: 'my-recipe',
        component: MyRecipe,
        layout: LayoutWithoutFilter,
    },
]

export const userRouters = [
    {
        path: '/search-favorite-results',
        name: 'search-favorite-results',
        component: SearchResultFavorite,
        layout: LayoutWithoutFilter,
    },
    {
        path: '/plan-detail/:date',
        name: 'plan-detail',
        component: PlanDetail,
        layout: LayoutWithoutFilter,
    },
]

//Scroll Top when clicked another page
function ScrollToTop() {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return null
}

export const RouterComponents = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <ScrollToTop />
                <Routes>
                    {publicRouters.map((route, index) => {
                        const Page = route.component
                        let Layout = DefaultLayout
                        if (route.layout) {
                            Layout = route.layout
                        } else if (route.layout === null) {
                            Layout = Fragment
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                    <Route exact path="/" element={<PrivateRouters />}>
                        {privateRouters.map((route, index) => {
                            const Page = route.component
                            let Layout = DefaultLayout
                            if (route.layout) {
                                Layout = route.layout
                            } else if (route.layout === null) {
                                Layout = Fragment
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}
                    </Route>
                    <Route exact path="/" element={<AdminRouters />}>
                        {adminRouters.map((route, index) => {
                            const Page = route.component
                            let Layout = DefaultLayout
                            if (route.layout) {
                                Layout = route.layout
                            } else if (route.layout === null) {
                                Layout = Fragment
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}
                    </Route>
                    <Route exact path="/" element={<CookerRouters />}>
                        {cookerRouters.map((route, index) => {
                            const Page = route.component
                            let Layout = DefaultLayout
                            if (route.layout) {
                                Layout = route.layout
                            } else if (route.layout === null) {
                                Layout = Fragment
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}
                    </Route>
                    <Route exact path="/" element={<UserRouters />}>
                        {userRouters.map((route, index) => {
                            const Page = route.component
                            let Layout = DefaultLayout
                            if (route.layout) {
                                Layout = route.layout
                            } else if (route.layout === null) {
                                Layout = Fragment
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}
