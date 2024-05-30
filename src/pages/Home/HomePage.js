import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchDataAsync } from '../../redux/apiThunk/getAllRecipesThunk'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box, Button } from '@mui/material'
import { Autoplay, Pagination, Navigation, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import CircularProgress from '@mui/material/CircularProgress'
import { bestRecipes } from '../../redux/apiThunk/getBestRecipeThunk'
import { favoritesRecipe } from '../../redux/apiThunk/getFavoritesRecipeThunk'
import { userFavorites } from '../../redux/apiThunk/getFavoriteUserThunk'
import toast, { Toaster } from 'react-hot-toast'
import FavoriteIcon from '@mui/icons-material/Favorite'

const HomePage = () => {
    const dispatch = useDispatch()
    const dispatchBestRecipes = useDispatch()
    const dispatchFavoriteRecipes = useDispatch()
    const getAllRecipesAPI = useSelector((state) => state.getAllRecipes.getAllRecipes)
    const bestRecipesAPI = useSelector((state) => state.bestRecipe.bestRecipes)
    const favoriteRecipeAPI = useSelector((state) => state.favoriteRecipe.favoriteRecipe)
    const status = useSelector((state) => state.getAllRecipes.isLoading)
    const [showMore, setShowMore] = useState(6)
    const [reload, setReload] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        dispatch(fetchDataAsync())
        dispatchBestRecipes(bestRecipes())
        dispatchFavoriteRecipes(favoritesRecipe())
    }, [dispatch, dispatchBestRecipes, dispatchFavoriteRecipes, reload])

    const handleShowLess = () => {
        setShowMore(6)
    }
    const handleAddFavorite = async (id) => {
        if (!user) {
            toast.error('You must login to add favorite', {
                duration: 1000,
            })
        } else if (user.role !== 'User') {
            toast.error('Cooker can not do this', {
                duration: 1000,
            })
        } else {
            await dispatch(userFavorites(id)).then((result) => {
                if (result.payload && result.payload.message === 'Success') {
                    toast.success('Add favorite success')
                    setReload(!reload)
                } else {
                    toast.error('Add favorite failed')
                }
            })
        }
    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            {status === 'error' ? (
                <Box
                    sx={{
                        paddingTop: '100px',
                        paddingBottom: '200px',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ paddingRight: '10px' }}> Please</Typography>
                    <a
                        style={{
                            color: 'rgb(243, 156, 18)',
                            textDecoration: 'underline',
                            fontSize: '25px',
                        }}
                        href="/login"
                    >
                        LOGIN
                    </a>
                    <Typography sx={{ paddingLeft: '10px' }}> before using this feature</Typography>
                </Box>
            ) : status === 'loading' ? (
                <CircularProgress
                    sx={{
                        marginTop: '10%',
                        marginLeft: '47%',
                        marginBottom: '10%',
                    }}
                />
            ) : (
                <div className="container-fluid">
                    <div className="mt-5">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            mousewheel={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation, Mousewheel]}
                            className="mySwiper"
                            style={{ width: 1200, height: 700, cursor: 'pointer' }}
                        >
                            {favoriteRecipeAPI.data &&
                                Array.isArray(favoriteRecipeAPI.data) &&
                                favoriteRecipeAPI.data.map(
                                    (favorite) =>
                                        !favorite?.isDelete && (
                                            <SwiperSlide key={favorite.photoVMs[0].photoId}>
                                                <Link to={`/recipe-detail/${favorite.recipeId}`}>
                                                    <div className="slide-container">
                                                        <img
                                                            className="slide-image"
                                                            src={favorite.photoVMs[0].photoName}
                                                            alt={favorite.recipeName}
                                                        />
                                                        <div className="slide-overlay slide-delay">
                                                            <h2
                                                                className="slide-title"
                                                                style={{ color: '#f39c12' }}
                                                            >
                                                                {favorite.recipeName}
                                                            </h2>
                                                            <p className="slide-description">
                                                                {favorite.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        )
                                )}
                        </Swiper>
                    </div>
                    <section className="best-receipe-area">
                        <h1 className="title-recipes">Best Recipes</h1>
                        <div
                            style={{
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 40,
                            }}
                        >
                            <div className="container">
                                <div className="row justify-content-center">
                                    {bestRecipesAPI.data &&
                                        Array.isArray(bestRecipesAPI.data) &&
                                        bestRecipesAPI.data.map(
                                            (bestRecipe) =>
                                                !bestRecipe.isDelete && (
                                                    <div
                                                        className="col-sm-4 mb-4"
                                                        key={bestRecipe.recipeId}
                                                    >
                                                        <Link
                                                            to={`/recipe-detail/${bestRecipe.recipeId}`}
                                                        >
                                                            <img
                                                                style={{ width: 350, height: 250 }}
                                                                src={
                                                                    bestRecipe.photoVMs[0].photoName
                                                                }
                                                                alt={bestRecipe.recipeName}
                                                            />
                                                            <h5
                                                                className="mt-3"
                                                                style={{
                                                                    fontWeight: '600',
                                                                    height: '25px',
                                                                    overflow: 'hidden',
                                                                }}
                                                            >
                                                                {bestRecipe.recipeName}
                                                            </h5>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                }}
                                                            >
                                                                <Rating
                                                                    name="read-only"
                                                                    value={bestRecipe?.aveVote}
                                                                    readOnly
                                                                    precision={0.5}
                                                                    size="small"
                                                                />
                                                                &nbsp; &nbsp;
                                                                <span
                                                                    style={{
                                                                        color: 'rgba(71,71,71, 0.6)',
                                                                    }}
                                                                >
                                                                    {bestRecipe?.aveVote}/5
                                                                </span>
                                                            </Box>
                                                        </Link>
                                                        <CardContent
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="body3"
                                                                color="text.primary"
                                                            >
                                                                {bestRecipe?.totalFavorite}
                                                            </Typography>
                                                            <Typography
                                                                style={{
                                                                    backgroundColor: 'white',
                                                                    height: '20px',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    outline: 'none',
                                                                }}
                                                            >
                                                                {bestRecipe?.isFavorite ? (
                                                                    <Button
                                                                        style={{
                                                                            outline: 'none',
                                                                        }}
                                                                    >
                                                                        <FavoriteIcon
                                                                            style={{
                                                                                color: 'orange',
                                                                            }}
                                                                        />
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleAddFavorite(
                                                                                bestRecipe?.recipeId
                                                                            )
                                                                        }
                                                                        style={{
                                                                            outline: 'none',
                                                                        }}
                                                                    >
                                                                        <FavoriteBorderIcon
                                                                            style={{
                                                                                color: 'black',
                                                                            }}
                                                                        />
                                                                    </Button>
                                                                )}
                                                            </Typography>
                                                        </CardContent>
                                                    </div>
                                                )
                                        )}
                                </div>
                            </div>
                        </div>
                    </section>
                    <div>
                        <h1 className="title-recipes">Lastest Recipes</h1>
                        <div
                            style={{
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 40,
                            }}
                        >
                            <div className="container">
                                <div className="row">
                                    {getAllRecipesAPI.data &&
                                        Array.isArray(getAllRecipesAPI.data) && (
                                            <div
                                                className="grid-container"
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                                    gap: '30px',
                                                }}
                                            >
                                                {getAllRecipesAPI?.data.slice(0, showMore).map(
                                                    (recipe) =>
                                                        !recipe.isDelete && (
                                                            <div
                                                                className="grid-item"
                                                                key={recipe.recipeId}
                                                            >
                                                                <Card
                                                                    style={{
                                                                        width: 345,
                                                                        maxHeight: 470,
                                                                    }}
                                                                >
                                                                    <Link
                                                                        to={`/recipe-detail/${recipe.recipeId}`}
                                                                    >
                                                                        <CardMedia
                                                                            component="img"
                                                                            style={{
                                                                                width: 350,
                                                                                height: 194,
                                                                            }}
                                                                            image={
                                                                                recipe.photoVMs[0]
                                                                                    .photoName
                                                                            }
                                                                            alt="Perfect Pancakes"
                                                                        />
                                                                        <Rating
                                                                            name="read-only"
                                                                            value={recipe.aveVote}
                                                                            readOnly
                                                                            precision={0.5}
                                                                            size="small"
                                                                            sx={{ mt: 2 }}
                                                                        />
                                                                        <CardContent>
                                                                            <Typography
                                                                                variant="body1"
                                                                                color="text.primary"
                                                                                style={{
                                                                                    fontWeight: 600,
                                                                                    fontSize: 15,
                                                                                    height: 25,
                                                                                    overflow:
                                                                                        'hidden',
                                                                                }}
                                                                            >
                                                                                {recipe.recipeName}
                                                                            </Typography>
                                                                            <br></br>
                                                                            <Typography
                                                                                variant="body3"
                                                                                color="text.secondary"
                                                                            >
                                                                                {new Date(
                                                                                    recipe.updateTime
                                                                                ).toLocaleDateString()}
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </Link>
                                                                </Card>
                                                            </div>
                                                        )
                                                )}
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            {getAllRecipesAPI?.data?.length > showMore ? (
                                <button
                                    onClick={() => {
                                        setShowMore((more) => more + 6)
                                    }}
                                    style={{
                                        padding: '15px 90px',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: 'white',
                                        backgroundColor: '#f39c12',
                                        fontSize: '20px',
                                        outline: 'none',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        marginBottom: 20,
                                    }}
                                >
                                    Show more recipes
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleShowLess()
                                    }}
                                    style={{
                                        padding: '15px 90px',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: 'white',
                                        backgroundColor: '#f39c12',
                                        fontSize: '20px',
                                        outline: 'none',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        marginBottom: 20,
                                    }}
                                >
                                    Show less
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default HomePage
