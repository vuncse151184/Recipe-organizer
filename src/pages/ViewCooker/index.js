import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Typography, Box, Card, CardActions, CardMedia, Rating, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import './cooker.css'
const ViewCooker = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const userAPIUrl = ` https://recipe-organizer-api.azurewebsites.net/api/Recipes/GetByUser?id=${id}`;

    const getUserAPI = () => {
        fetch(userAPIUrl)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404) {
                        navigate('/error')
                    }
                    throw new Error(`HTTP Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUser(data)
            })
            .catch((error) => console.log(error.message));
    }
    useEffect(() => (
        getUserAPI()
    ), [])
    return (
        <>
            <div className="pt-5 pb-5" >
                <section className="section about-section gray-bg" id="about">
                    <div className="container-fluid">
                        <div className="row align-items-center flex-row-reverse">
                            <div className="col-lg-8">
                                <div className="about-text go-to">
                                    <p style={{ fontStyle: "italic", fontSize: "40px", fontWeight: 300 }}>Hi, I am  chef</p>
                                    <h5 className="dark-color">{user?.user && user?.user.fullName}</h5>
                                    <div className="row about-list">
                                        <div className="col-md-12">
                                            <Box sx={{ display: "flex", alignContent: "center" }}>
                                                <Box> <MailOutlineIcon /> &nbsp;</Box>
                                                <Box >
                                                    <Typography variant="h6" gutterBottom sx={{ fontSize: "20px" }}>
                                                        {user?.user && user?.user.email}
                                                    </Typography>
                                                </Box>

                                            </Box>
                                        </div>
                                    </div>
                                    <div style={{ maxWidth: "500px", maxHeight: "150px", overflow: "hidden" }}>
                                        <h6 style={{ fontFamily: "Courier New, Courier, monospace", fontStyle: "italic", fontWeight: "300" }}>{user?.user && user?.user.userInfo}</h6>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                            <div className="col-lg-4 " style={{ display: "flex", justifyContent: "flex-end" }}>
                                <div className="about-avatar pr-5 mr-5">
                                    <img src={user?.user && user?.user.avatarName} title="" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="pt-5">
                            <div className="pl-5">
                                <h2 style={{ color: "rgb(243, 156, 18)" }}>RECIPES</h2>
                            </div>

                            <div
                                style={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: 40,
                                }}
                            >

                                <div className="container">
                                    <div className="row justify-content-center col-sm-12">
                                        {user?.data && user?.data.map((recipe) => (
                                            <div className="col-sm-4 mb-4" key={recipe.recipeId}>
                                                <Card style={{ width: 345, maxHeight: 470 }}>
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
                                                            sx={{ mt: 2 }}
                                                        />
                                                    </Link>
                                                    <CardContent>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.primary"
                                                            sx={{ height: "25px", overflow: "hidden" }}
                                                        >
                                                            {recipe.recipeName}
                                                        </Typography>
                                                        <br></br>
                                                        <CardActions
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                        </CardActions>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}
export default ViewCooker;