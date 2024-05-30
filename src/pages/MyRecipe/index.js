import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { Box, Typography, CardContent, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
const MyRecipe = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = user?.token;
    const [authenticatedUser, setAuthenticatedUser] = useState(accessToken ? true : false);

    const [allMyRecipes, setAllMyRecipes] = useState([])
    const allMyRecipessUrl = `https://recipe-organizer-api.azurewebsites.net/api/Recipes/GetByCooker`

    const [isLoading, setIsLoading] = useState(true);

    const getAllMyRecipes = async () => {
        try {
            const response = await fetch(allMyRecipessUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (response.status === 401) {
                await Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'Login expired!',
                    showConfirmButton: false,
                    footer: '<a href="/login" style="font-size: 20px; color: red">LOGIN AGAIN</a>',
                })
            }
            if (response.ok) {
                const data = await response.json();

                setAllMyRecipes(data);

                setIsLoading(false);
            }
        } catch (error) {
            console.log(error.message);

        };
    }
    useEffect(() => {
        getAllMyRecipes();
    }, []);

    const handleDeleteRecipe = async (id) => {
        const deleteRecipeURL = `https://recipe-organizer-api.azurewebsites.net/api/Recipes/DeleteRecipe?id=${id}`
        try {
            await Swal.fire({
                title: "Do you want to delete this recipe?",
                icon: "info",
                showDenyButton: true,
                showCancelButton: true,
                denyButtonText: "Yes, delete it!",
                background: "white",
                showConfirmButton: false,
            }).then(async (result) => {
                if (result.isDenied) {
                    const response = await fetch(deleteRecipeURL, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });
                    if (response.ok) {
                        console.log("response", response.json())
                        Swal.fire('Deleted!', '', 'success')
                        setAllMyRecipes(prevState => ({
                            ...prevState,
                            data: prevState.data.filter(recipe => recipe.recipeId !== id)
                        }));
                    }
                } else {
                    toast('Nothing Update!')
                }
            });

        } catch (error) {
            console.log(error.message);

        }

    }
    return (
        <React.Fragment>
            <CssBaseline />
            {!authenticatedUser ? (
                <Box sx={{ paddingTop: "100px", paddingBottom: "200px", display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>
                    <Typography sx={{ paddingRight: "10px" }}> Please</Typography>
                    <a style={{ color: "rgb(243, 156, 18)", textDecoration: "underline", fontSize: "25px" }} href="/login">LOGIN</a>
                    <Typography sx={{ paddingLeft: "10px" }}> before using this feature</Typography>
                </Box>) : (
                <Container maxWidth="lg">
                    <Box sx={{ minHeight: '200px', height: 'auto', border: " 1px solid rgba(0,0,0,.15)" }}>
                        <Box sx={{ paddingTop: "50px", paddingLeft: "40px", display: "flex", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "60px", fontWeight: "800", color: "rgb(243, 156, 18)" }}>All My Recipes</Typography>
                            <Box sx={{ paddingLeft: "300px" }}>
                                <Link to={'/create-recipe'} >
                                    <Button variant="contained">
                                        Add Recipe &nbsp; <AddCircleIcon color='rgb(243, 156, 18)' />
                                    </Button>
                                </Link>
                            </Box>

                        </Box>
                        <Divider sx={{ width: "70", fontWeight: "bold", marginTop: "20px", marginBottom: "20px" }} />

                        <Box sx={{ paddingTop: "50px" }}>
                            {isLoading ? (
                                <CircularProgress sx={{
                                    marginTop: '10%',
                                    marginLeft: '47%',
                                    marginBottom: '10%',
                                }} />
                            ) : (
                                <div>
                                    {allMyRecipes?.data ?

                                        (
                                            allMyRecipes?.data.map((myRecipe) => (
                                                <div
                                                    className=" mb-4"
                                                    key={myRecipe.recipeId}
                                                    style={{ padding: "20px", margin: "20px", display: "flex", justifyContent: "space-between", borderStyle: "outset" }}
                                                >
                                                    <Link to={`/recipe-detail/${myRecipe.recipeId}`}>
                                                        <Box style={{ display: "flex" }}>
                                                            <Box sx={{ maxWidth: "300px", width: "300px" }}>
                                                                <img
                                                                    style={{ maxWidth: 280, height: 100 }}
                                                                    src={myRecipe.photoVMs[0].photoName}
                                                                    alt={myRecipe.recipeName}
                                                                />
                                                            </Box>

                                                            <Box sx={{ paddingLeft: "5px", maxWidth: "800px", width: "500px", paddingBottom: "20px" }}>
                                                                <h5
                                                                    style={{ fontWeight: '600', fontSize: "35px" }}
                                                                >
                                                                    {myRecipe.recipeName}
                                                                </h5>
                                                                <h5 style={{ fontWeight: '300', fontSize: "15px" }}>
                                                                    created at {new Date(myRecipe.updateTime).toLocaleDateString()}
                                                                </h5>
                                                            </Box>
                                                        </Box>
                                                    </Link>
                                                    <Box sx={{ alignItems: "center" }}>
                                                        <Box>
                                                            <Link to={`/update-recipe/${myRecipe.recipeId}`}>
                                                                <Button>
                                                                    <ModeEditOutlineIcon fontSize='large' sx={{ color: "#2986cc" }} />
                                                                </Button>

                                                            </Link>
                                                        </Box>
                                                        <Box sx={{ paddingTop: "20px" }}>
                                                            <Button onClick={() => handleDeleteRecipe(myRecipe.recipeId)}>
                                                                <DeleteSweepIcon fontSize='large' sx={{ color: "#cc0000" }} />
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </div>
                                            ))
                                        ) : (
                                            <Box>
                                                <Typography sx={{ fontSize: "40px", fontWeight: "500", color: "rgb(243, 156, 18)" }}>
                                                    You haven't create any recipe yet
                                                </Typography>
                                            </Box>
                                        )
                                    }
                                </div>

                            )}
                        </Box>
                    </Box>
                </Container>
            )}
        </React.Fragment>

    );
};

export default MyRecipe
