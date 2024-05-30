import './index.css'
import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Food from './Food'
import { getPlanByDate, createPlan, getRecipesPlan, removeDate, getPlanForCreate } from '../../redux/apiThunk/planThunk'
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-select'

const formatDate = (date) => {
    const [d, m, y] = date.split("-");
    return m + "/" + d + "/" + y
}

const PlanDetail = () => {
    const { date } = useParams();
    const [data, setData] = useState({
        dateSt: formatDate(date),
        breakfast: [],
        lunch: [],
        dinner: []
    })
    const [listBreak, setListBreak] = useState([])
    const [listLunch, setListLunch] = useState([])
    const [listDinner, setListDinner] = useState([])
    const dispatch = useDispatch();
    const [reload, setReload] = useState(false)
    useEffect(() => {
        dispatch(getPlanByDate({ date: formatDate(date) }))
        dispatch(getRecipesPlan())
        dispatch(getPlanForCreate({ date: data.dateSt })).then((result) => {
            setData({
                ...data,
                breakfast: result.payload.data.breakfast.map(item => item.value),
                lunch: result.payload.data.lunch.map(item => item.value),
                dinner: result.payload.data.dinner.map(item => item.value)
            })
            // console.log(result);
        }).catch((err) => {
        });
    }, [dispatch, date, reload]);

    const planDetail = useSelector((state) => state.plan);
    const dataStatus = useSelector((state) => state.plan.loading)
    const getAllRecipes = useSelector((state) => state.plan.recipePlan)
    const getCreate = useSelector((state) => state.plan.form)

    const handleReload = () => {
        setReload(!reload)
    }

    //get value for each meal
    const handleBreakfastChange = (selected) => {
        setData({
            ...data,
            breakfast: selected.map(item => item.value)
        });
    };
    const handleLunchChange = (selected) => {
        setData({
            ...data,
            lunch: selected.map(item => item.value)
        });
    };
    const handleDinnerChange = (selected) => {
        setData({
            ...data,
            dinner: selected.map(item => item.value)
        });
    };

    const handleFormCreate = async (e) => {
        e.preventDefault()
        setShow(false)
        await Swal.fire({
            title: "Do you want to save the changes?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#285D9A",
            cancelButtonColor: "#e74a3b",
            confirmButtonText: "Yes, save it!",
            background: "white",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(createPlan({ data: data })).then((result) => {
                    result.payload.status === 1 ? toast.success(result.payload.message) : toast.error(result.payload)
                    setListBreak([])
                    setListLunch([])
                    setListDinner([])
                    setReload(!reload)
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                toast('Nothing Create!')
            }
        });
        setReload(!reload)
    }

    const handleDeleteDate = async (e) => {
        e.preventDefault()
        setShow(false)
        await Swal.fire({
            title: "Do you want to save the changes?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#285D9A",
            cancelButtonColor: "#e74a3b",
            confirmButtonText: "Yes, save it!",
            background: "white",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(removeDate({ date: formatDate(date) })).then((result) => {
                    result.payload.message === "Success" ? toast.success('Delete Success!') : toast.error('Delete Failed!')
                    setReload(!reload)

                }).catch((err) => {
                    console.log(err);
                });
            } else {
                // toast('Nothing Create!')
            }
        });
        setReload(!reload)
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setListBreak([])
        setListLunch([])
        setListDinner([])
        setShow(false);
    }
    const handleShow = () => {
        getAllRecipes?.data?.map((item) => {
            if (item.mealVMs.mealName === 'Breakfast')
                listBreak.push({ value: item.recipeId, label: item.recipeName })
            else if (item.mealVMs.mealName === 'Lunch')
                listLunch.push({ value: item.recipeId, label: item.recipeName })
            else
                listDinner.push({ value: item.recipeId, label: item.recipeName })
            return 0
        })
        setShow(true);
    }

    let content
    if (dataStatus === 'loading') {
        content = (
            <CircularProgress
                sx={{
                    marginTop: '10%',
                    marginLeft: '47%',
                    marginBottom: '10%'
                }}
            />
        )
    } else if (dataStatus === 'succeeded' && (planDetail?.detail.data && planDetail?.detail.data?.ingredient.length === 0)) {
        content = (
            <div className="container meal-detail">
                <div className="meal">
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        You have no plan at {date}
                        <div style={{ marginTop: '10px' }}>
                            <Button variant="primary" onClick={handleShow}>
                                Add more Recipe
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create Meal Plan for {date}</Modal.Title>
                                </Modal.Header>
                                <form onSubmit={e => handleFormCreate(e)}>
                                    <Modal.Body>
                                        <div class="form-group">
                                            <label htmFor="recipe">Recipe for BreakFast<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Select
                                                defaultValue={getCreate?.data?.breakfast}
                                                isMulti
                                                name="colors"
                                                options={listBreak}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                onChange={handleBreakfastChange}
                                            />
                                            <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
                                        </div>
                                        <div class="form-group">
                                            <label htmFor="recipe">Recipe for Lunch<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Select
                                                defaultValue={getCreate?.data?.lunch}
                                                isMulti
                                                name="colors"
                                                options={listLunch}
                                                onChange={handleLunchChange}
                                            />
                                            <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
                                        </div>
                                        <div class="form-group">
                                            <label htmFor="recipe">Recipe for Dinner<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Select
                                                defaultValue={getCreate?.data?.dinner}
                                                isMulti
                                                name="colors"
                                                options={listDinner}
                                                onChange={handleDinnerChange}
                                            />
                                            <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type='submit' >
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Modal>
                        </div>
                    </Typography>
                </div>
            </div>)
    } else {
        content = (<div className="container meal-detail">
            <div className="meal">
                <div className="title">
                    <h4>Meal Planner</h4>
                    <div>
                        <Button onClick={handleShow}>
                            Update Meal Plan
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Meal Plan for {date}</Modal.Title>
                            </Modal.Header>
                            <form onSubmit={e => handleFormCreate(e)}>
                                <Modal.Body>
                                    <div class="form-group">
                                        <label htmFor="recipe">Recipe for BreakFast<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Select
                                            defaultValue={getCreate?.data?.breakfast}
                                            isMulti
                                            name="colors"
                                            options={listBreak}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={handleBreakfastChange}
                                        />
                                        <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
                                    </div>
                                    <div class="form-group">
                                        <label htmFor="recipe">Recipe for Lunch<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Select
                                            defaultValue={getCreate?.data?.lunch}
                                            isMulti
                                            name="colors"
                                            options={listLunch}
                                            onChange={handleLunchChange}
                                        />
                                        <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
                                    </div>
                                    <div class="form-group">
                                        <label htmFor="recipe">Recipe for Dinner<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Select
                                            defaultValue={getCreate?.data?.dinner}
                                            isMulti
                                            name="colors"
                                            options={listDinner}
                                            onChange={handleDinnerChange}
                                        />
                                        <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type='submit' >
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                        <button className="clear" onClick={(e) => handleDeleteDate(e)}>Clear All</button>
                    </div>
                </div>
                <div className="title">
                    <h4>Nutrition Facts (per serving)</h4>
                    <div className="nutrition">
                        <div className="nutrition-component">
                            Calories: <b>{planDetail?.detail.data?.calories}g</b>
                        </div>
                        <div className="nutrition-component">
                            Fat: <b>{planDetail?.detail.data?.fat}g</b>
                        </div>
                        <div className="nutrition-component">
                            Carbs: <b>{planDetail?.detail.data?.carbs}g</b>
                        </div>
                        <div className="nutrition-component">
                            Protein: <b>{planDetail?.detail.data?.protein}g</b>
                        </div>
                    </div>
                </div>
                <div className="title">
                    <h4>Breakfast</h4>
                    {planDetail?.detail.data?.food.breakfast?.map((food) => (
                        <Fragment>
                            <Food
                                id={food.planDetailId}
                                foodId={food.recipeId}
                                name={food.recipeName}
                                image={food.photos}
                                time={food.totalTime}
                                ingredient={food.totalIngredient}
                                calories={food.calories}
                                isDelete={food.isDelete}
                                handleReload={handleReload}
                            />
                            <br></br>
                        </Fragment>
                    ))}
                </div>
                <div className="title">
                    <h4>Lunch</h4>
                    {planDetail?.detail.data?.food.lunch?.map((food) => (
                        <Fragment>
                            <Food
                                id={food.planDetailId}
                                foodId={food.recipeId}
                                name={food.recipeName}
                                image={food.photos}
                                time={food.totalTime}
                                ingredient={food.totalIngredient}
                                calories={food.calories}
                                isDelete={food.isDelete}
                                handleReload={handleReload}
                            />
                            <br></br>
                        </Fragment>
                    ))}
                </div>
                <div className="title">
                    <h4>Dinner</h4>
                    {planDetail?.detail.data?.food.dinner?.map((food) => (
                        <Fragment>
                            <Food
                                id={food.planDetailId}
                                foodId={food.recipeId}
                                name={food.recipeName}
                                image={food.photos}
                                time={food.totalTime}
                                ingredient={food.totalIngredient}
                                calories={food.calories}
                                isDelete={food.isDelete}
                                handleReload={handleReload}
                            />
                            <br></br>
                        </Fragment>
                    ))}
                </div>
            </div>
            <div className="ingredient">
                <h4>Prepare Ingredients</h4>
                {planDetail?.detail.data?.ingredient?.map((item, index) => (
                    <div className='ingredients'>
                        <b>{index + 1}.  </b> {item?.totalQuantity} {item?.measure} of {item?.ingredientName}
                    </div>
                ))}
            </div>
        </div>)
    }

    return (
        <Fragment>
            <Toaster />
            <Container maxWidth="md">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    style={{ color: '#f39c12', marginTop: 20 }}
                    gutterBottom
                >
                    Meal Plan Detail
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    View your meal plan of week
                </Typography>
            </Container>
            {content}
        </Fragment>
    )
}

export default PlanDetail
