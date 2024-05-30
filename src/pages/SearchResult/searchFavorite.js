import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    Card,
    CardMedia,
    Rating,
    CardContent,
    Typography,
    Box,
    Button,
    CardActions,
} from '@mui/material'
import SearchFilter from '../FavortieRecipe/SearchFavoriteFilter'
import ErrorIcon from '@mui/icons-material/Error'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'

import { useDispatch } from 'react-redux'
import { removeFavor } from '../../redux/apiThunk/getFavoriteUserThunk'
import { useNavigate } from 'react-router-dom'

const SearchResultFavorite = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchResult = location.state?.searchResult
    const result = searchResult?.data

    console.log(result)
    const handleConfirmRemove = async (id) => {
        console.log('id', id)
        Swal.fire({
            title: 'Remove your favorite!',
            text: 'Do you want to remove your favorite?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(removeFavor(id))
                    .then((result) => {
                        if (result.payload && result.payload.message === 'Success') {
                            toast.success('Remove successful!!!', {
                                duration: 1500,
                            })
                            setTimeout(() => {
                                navigate('/favorite-recipe')
                            }, 3000)
                        } else {
                            toast.error('Remove failed!')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <SearchFilter />
            <div className="container">
                <h2 style={{ fontWeight: 600, color: '#f39c12', textAlign: 'center' }}>
                    Search Favorite Results
                </h2>
            </div>
            <div className="container">
                {result?.length === 0 ? (
                    <div>
                        <h1 style={{ textAlign: 'center' }}>Couldn't find any favorite recipes</h1>
                        <div style={{ textAlign: 'center' }}>
                            <Link to="/favorite-recipe">
                                <button
                                    style={{
                                        padding: '10px 50px',
                                        marginTop: 50,
                                        marginBottom: 150,
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        backgroundColor: '#f39c12',
                                        color: 'white',
                                        fontSize: 25,
                                        outline: 'none',
                                        border: 'none',
                                    }}
                                >
                                    Back
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div
                            className="container mb-5"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '40px',
                                paddingTop: 30,
                            }}
                        >
                            {result &&
                                Array.isArray(result) &&
                                result.map((recipe) =>
                                    !recipe.isDelete ? (
                                        <div className="grid-item" key={recipe.recipeId}>
                                            <Card style={{ width: 345, maxHeight: 470 }}>
                                                <Link to={`/recipe-detail/${recipe.recipeId}`}>
                                                    <Box style={{ textAlign: 'center' }}>
                                                        <CardMedia
                                                            component="img"
                                                            style={{ width: 350, height: 194 }}
                                                            image={recipe.photoVMs[0].photoName}
                                                            alt="Perfect Pancakes"
                                                        />
                                                        <Rating
                                                            name="read-only"
                                                            value={recipe.aveVote}
                                                            readOnly
                                                            size="small"
                                                            precision={0.5}
                                                            sx={{ mt: 2 }}
                                                        />
                                                    </Box>
                                                </Link>
                                                <CardContent style={{ textAlign: 'center' }}>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.primary"
                                                        style={{
                                                            fontWeight: 600,
                                                            fontSize: 15,
                                                            height: 25,
                                                            overflow: 'hidden',
                                                            marginBottom: 10,
                                                        }}
                                                    >
                                                        {recipe.recipeName}
                                                    </Typography>
                                                    <Typography
                                                        variant="body3"
                                                        color="text.secondary"
                                                    >
                                                        {new Date(
                                                            recipe.updateTime
                                                        ).toLocaleDateString()}
                                                    </Typography>
                                                    <CardActions
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <Button
                                                            size="small"
                                                            style={{
                                                                outline: 'none',
                                                                color: '#f39c12',
                                                            }}
                                                            onClick={() =>
                                                                handleConfirmRemove(recipe.recipeId)
                                                            }
                                                        >
                                                            Remove
                                                        </Button>
                                                    </CardActions>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ) : (
                                        <div className="grid-item" key={recipe.recipeId}>
                                            <Card
                                                style={{
                                                    width: 345,
                                                    maxHeight: 470,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Link to={`/recipe-detail/${recipe.recipeId}`}>
                                                    <CardMedia
                                                        component="img"
                                                        style={{ width: 350, height: 194 }}
                                                        image={recipe.photoVMs[0].photoName}
                                                        alt="Perfect Pancakes"
                                                    />
                                                    <Rating
                                                        name="read-only"
                                                        value={recipe.aveVote}
                                                        readOnly
                                                        size="small"
                                                        precision={0.5}
                                                        sx={{ mt: 2 }}
                                                    />
                                                </Link>
                                                <CardContent>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.primary"
                                                        style={{
                                                            fontWeight: 600,
                                                            height: 25,
                                                            overflow: 'hidden',
                                                            marginBottom: 10,
                                                        }}
                                                    >
                                                        {recipe.recipeName}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body3"
                                                            color="text.secondary"
                                                        >
                                                            {new Date(
                                                                recipe.updateTime
                                                            ).toLocaleDateString()}
                                                        </Typography>
                                                        &nbsp; &nbsp;
                                                        <ErrorIcon
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        />
                                                    </Box>
                                                    <CardActions
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <Button
                                                            size="small"
                                                            style={{
                                                                outline: 'none',
                                                                color: '#f39c12',
                                                            }}
                                                            onClick={() =>
                                                                handleConfirmRemove(recipe.recipeId)
                                                            }
                                                        >
                                                            Remove
                                                        </Button>
                                                    </CardActions>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )
                                )}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SearchResultFavorite
