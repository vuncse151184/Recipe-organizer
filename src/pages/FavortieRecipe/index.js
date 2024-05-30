import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Rating, CardActions, Button, Box } from '@mui/material'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { userFavor } from '../../redux/apiThunk/getFavoriteUserThunk'
import { removeFavor } from '../../redux/apiThunk/getFavoriteUserThunk'
import SearchFilter from './SearchFavoriteFilter'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import CircularProgress from '@mui/material/CircularProgress'
import ErrorIcon from '@mui/icons-material/Error'

const FavoriteRecipe = () => {
    const dispatch = useDispatch()
    const getUserFavor = useSelector((state) => state.uFavor.userFavorites)
    const status = useSelector((state) => state.uFavor.isLoading)
    const favorite = getUserFavor?.data
    const [reload, setReload] = useState(false)

    const handleConfirmRemove = async (id) => {
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
                            toast.success('Remove successful!!!')
                            setReload(!reload)
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
    useEffect(() => {
        dispatch(userFavor())
    }, [dispatch, reload])
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Container maxWidth="md">
                <SearchFilter />

                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    style={{ color: '#f39c12', marginTop: 20 }}
                    gutterBottom
                >
                    Favorite Recipes
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    All your favorite content in one place!
                </Typography>
            </Container>
            {status === 'loading' ? (
                <CircularProgress
                    sx={{
                        marginTop: '10%',
                        marginLeft: '47%',
                        marginBottom: '10%',
                    }}
                />
            ) : status === 'error' ? (
                <Box
                    sx={{
                        margin: '42px 0',
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
            ) : favorite?.length !== 0 ? (
                <>
                    {status === 'loading' ? (
                        <CircularProgress
                            sx={{
                                marginTop: '10%',
                                marginLeft: '47%',
                                marginBottom: '10%',
                            }}
                        />
                    ) : (
                        <div
                            className="container mb-5"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '40px',
                            }}
                        >
                            {favorite &&
                                Array.isArray(favorite) &&
                                favorite.map((favor) =>
                                    !favor.isDelete ? (
                                        <div className="grid-item" key={favor.recipeId}>
                                            <Card
                                                style={{
                                                    width: 345,
                                                    maxHeight: 470,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Link to={`/recipe-detail/${favor.recipeId}`}>
                                                    <CardMedia
                                                        component="img"
                                                        style={{ width: 350, height: 194 }}
                                                        image={favor.photoVMs[0].photoName}
                                                        alt="Perfect Pancakes"
                                                    />
                                                    <Rating
                                                        name="read-only"
                                                        value={favor.aveVote}
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
                                                            fontSize: 15,
                                                            height: 25,
                                                            overflow: 'hidden',
                                                            marginBottom: 10,
                                                        }}
                                                    >
                                                        {favor.recipeName}
                                                    </Typography>
                                                    <Typography
                                                        variant="body3"
                                                        color="text.secondary"
                                                    >
                                                        {new Date(
                                                            favor.updateTime
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
                                                                handleConfirmRemove(favor.recipeId)
                                                            }
                                                        >
                                                            Remove
                                                        </Button>
                                                    </CardActions>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ) : (
                                        <div className="grid-item" key={favor.recipeId}>
                                            <Card
                                                style={{
                                                    width: 345,
                                                    maxHeight: 470,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Link to={`/recipe-detail/${favor.recipeId}`}>
                                                    <CardMedia
                                                        component="img"
                                                        style={{ width: 350, height: 194 }}
                                                        image={favor.photoVMs[0].photoName}
                                                        alt="Perfect Pancakes"
                                                    />
                                                    <Rating
                                                        name="read-only"
                                                        value={favor.aveVote}
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
                                                        {favor.recipeName}
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
                                                                favor.updateTime
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
                                                                handleConfirmRemove(favor.recipeId)
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
                    )}
                </>
            ) : (
                <div style={{ marginTop: 50 }}>
                    <h3 style={{ textAlign: 'center' }}>No favorite recipes yet</h3>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/">
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
                                Back To Home
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}
export default FavoriteRecipe
