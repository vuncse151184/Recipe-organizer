import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardMedia, Rating, CardContent, Typography, Box } from '@mui/material'
import NotFound from '../NotFound'

const SearchResult = () => {
    const location = useLocation()
    const searchResult = location.state?.searchResult
    const result = searchResult?.data
    return (
        <>
            {result === undefined ? (
                <NotFound />
            ) : (
                <>
                    <div className="container">
                        <h2 style={{ fontWeight: 600, color: '#f39c12', textAlign: 'center' }}>
                            Search Results
                        </h2>
                    </div>
                    <div className="container">
                        {result?.length === 0 ? (
                            <div>
                                <h1 style={{ textAlign: 'center' }}>Couldn't find any recipes</h1>
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
                                        result.map(
                                            (recipe) =>
                                                !recipe.isDelete && (
                                                    <div
                                                        className="grid-item"
                                                        key={recipe.recipeId}
                                                    >
                                                        <Card
                                                            style={{ width: 345, maxHeight: 470 }}
                                                        >
                                                            <Link
                                                                to={`/recipe-detail/${recipe.recipeId}`}
                                                            >
                                                                <Box
                                                                    style={{ textAlign: 'center' }}
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
                                                                        size="small"
                                                                        precision={0.5}
                                                                        sx={{ mt: 2 }}
                                                                    />
                                                                </Box>

                                                                <CardContent
                                                                    style={{ textAlign: 'center' }}
                                                                >
                                                                    <Typography
                                                                        variant="body1"
                                                                        color="text.primary"
                                                                        style={{
                                                                            fontWeight: 600,
                                                                            fontSize: 15,
                                                                            height: 25,
                                                                            overflow: 'hidden',
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
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default SearchResult
