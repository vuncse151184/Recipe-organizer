import './index.css'
import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlanByWeek, createPlan, getRecipesPlan, getPlanForCreate } from "../../../redux/apiThunk/planThunk";
// import { getPlanForCreateApi } from '../../../api/plan'
import Food from '../Food'
import NextIcon from '../../../components/IconComponent/NextIcon'
import PreviousIcon from '../../../components/IconComponent/PreviousIcon'
import CircularProgress from "@mui/material/CircularProgress";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import toast, { Toaster } from 'react-hot-toast';
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import Select from 'react-select'

const dayOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

const getMonday = (currentDate) => {
    currentDate = new Date(currentDate);
    let day = currentDate.getDay(),
        diff = currentDate.getDate() - day + (day === 0 ? - 6 : 1); // adjust when day is sunday
    return new Date(currentDate.setDate(diff));
};
const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
const formatDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return mm + "/" + dd + "/" + yyyy;
};
const formatDateRouter = (date) => {
    const yyyy = date?.getFullYear();
    let mm = date?.getMonth() + 1; // Months start at 0!
    let dd = date?.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + "-" + mm + "-" + yyyy;
};
const subDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
};

const changeColor = (date) => {
    if (date.match(formatDate(new Date()))) {
        return '#F39C12'
    }
}

export default function MealPlan() {
    let month, contentAuth;
    const [show, setShow] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [reload, setReload] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const dispatch = useDispatch();
    const [data, setData] = useState({
        dateSt: "",
        breakfast: [],
        lunch: [],
        dinner: []
    })
    const [listBreak, setListBreak] = useState([])
    const [listLunch, setListLunch] = useState([])
    const [listDinner, setListDinner] = useState([])
    switch (getMonday(currentDate).getMonth() + 1) {
        case 1:
            month = ("January")
            break;
        case 2:
            month = ('February')
            break;
        case 3:
            month = ('March')
            break;
        case 4:
            month = ('April')
            break;
        case 5:
            month = ('May')
            break;
        case 6:
            month = ('June')
            break;
        case 7:
            month = ('July')
            break;
        case 8:
            month = ("August")
            break;
        case 9:
            month = ('September')
            break;
        case 10:
            month = ('October')
            break;
        case 11:
            month = ('November')
            break;
        default:
            month = ('December')
            break;
    }

    //fetch api
    useEffect(() => {
        dispatch(getPlanByWeek({ date: formatDate(getMonday(currentDate)) }))
        dispatch(getRecipesPlan())
    }, [dispatch, currentDate, reload])

    useEffect(() => {
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
    }, [data.dateSt])

    const mealPlan = useSelector((state) => state.plan)
    const dataStatus = useSelector((state) => state.plan.loading)
    const formStatus = useSelector((state) => state.plan.loadingPlan)
    const getAllRecipes = useSelector((state) => state.plan.recipePlan)
    let getCreate = useSelector((state) => state.plan.form)
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(getCreate);
    const formatData = (date) => {
        const [y, m, d] = date.split("-")
        return m + "/" + d + "/" + y
    }

    //show, close modal
    const handleClose = () => {
        setShow(false)
        setListBreak([])
        setListLunch([])
        setListDinner([])
        setData({
            ...data,
            dateSt: "02/29/2000"
        })
    }
    const handleShow = () => {
        getAllRecipes?.data?.map((item) => {
            if (item.mealVMs.mealName === 'Breakfast')
                listBreak.push({ value: item.recipeId, label: item.recipeName })
            else if (item.mealVMs.mealName === 'Lunch')
                listLunch.push({ value: item.recipeId, label: item.recipeName })
            else
                listDinner.push({ value: item.recipeId, label: item.recipeName })
        })
        setShow(true)
    };

    //set default value
    const handleDateChange = (e) => {
        e.preventDefault()
        setData({ ...data, dateSt: formatData(e.target.value) });
    };

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

    //create plan meal
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
                    result.payload.status === 1 ? toast.success(result.payload.message) : toast.error(result.payload.message)
                    setReload(!reload)
                    setData({
                        ...data,
                        dateSt: "02/29/2000"
                    })
                    setListBreak([])
                    setListLunch([])
                    setListDinner([])
                }).catch((err) => {
                });
            } else {
                toast('Nothing Create!')
            }
        });
        setListBreak([])
        setListLunch([])
        setListDinner([])
        setReload(!reload)
    }

    // let contentForm = (<Fragment>
    //     <div class="form-group">
    //         <label htmFor="recipe">Recipe for BreakFast</label>
    //         <Select
    //             // defaultValue={firstMeal}
    //             isMulti
    //             name="colors"
    //             options={listBreak}
    //             className="basic-multi-select"
    //             classNamePrefix="select"
    //             onChange={handleBreakfastChange}
    //             required
    //             isDisabled={isDisabled}
    //         />
    //         <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
    //     </div>
    //     <div class="form-group">
    //         <label htmFor="recipe">Recipe for Lunch</label>
    //         <Select
    //             // defaultValue={secondMeal}
    //             isMulti
    //             name="colors"
    //             options={listLunch}
    //             onChange={handleLunchChange}
    //             required
    //             isDisabled={isDisabled}
    //         />
    //         <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
    //     </div>
    //     <div class="form-group">
    //         <label htmFor="recipe">Recipe for Dinner</label>
    //         <Select
    //             // defaultValue={finalMeal}
    //             isMulti
    //             name="colors"
    //             options={listDinner}
    //             onChange={handleDinnerChange}
    //             required
    //             isDisabled={isDisabled}
    //         />
    //         <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
    //     </div>
    // </Fragment>)
    let contentForm
    if (formStatus === 'loading') {
        contentForm = (
            <CircularProgress
                sx={{
                    marginTop: '10%',
                    marginLeft: '47%',
                    marginBottom: '10%'
                }}
            />
        )
    } else {
        contentForm = (<Fragment>
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
        </Fragment>)
    }

    const content = (
        <Box
            sx={{
                margin: '47px 0',
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
    )
    if (dataStatus === 'loading') {
        contentAuth = (
            <CircularProgress
                sx={{
                    marginTop: '10%',
                    marginLeft: '47%',
                    marginBottom: '10%'
                }}
            />
        )
    } else if (dataStatus === 'succeeded' && (mealPlan.plans.data && mealPlan.plans.status !== 1)) {
        contentAuth = (
            <Fragment>
                <div className='date-info'>
                    <div className='date'>
                        <Button variant="primary" onClick={handleShow}>
                            Create Meal Plan
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Meal Plan</Modal.Title>
                            </Modal.Header>
                            <form onSubmit={e => handleFormCreate(e)}>
                                <Modal.Body>
                                    <div class="form-group">
                                        <div class="form-group">
                                            <label htmFor="date">Date<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input type="date" class="form-control" id="date" placeholder="Date"
                                                onChange={(e) => handleDateChange(e)} required />
                                        </div>
                                        <div class="form-group">
                                            <label htmFor="recipe">Recipe for BreakFast<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Select
                                                isMulti
                                                name="colors"
                                                options={listBreak}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                onChange={handleBreakfastChange}
                                                required
                                            />
                                            <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
                                        </div>
                                        <div class="form-group">
                                            <label htmFor="recipe">Recipe for Lunch<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Select
                                                isMulti
                                                name="colors"
                                                options={listLunch}
                                                onChange={handleLunchChange}
                                                required
                                            />
                                            <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
                                        </div>
                                        <div class="form-group">
                                            <label htmFor="recipe">Recipe for Dinner<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Select
                                                isMulti
                                                name="colors"
                                                options={listDinner}
                                                onChange={handleDinnerChange}
                                                required
                                            />
                                            <small id="recipeHepl" class="form-text text-muted">Choose recipe you want to add to plan.</small>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type='submid' >
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </div>
                    <div className='button'>
                        <button onClick={() => setCurrentDate(subDays(getMonday(currentDate), 7))}>
                            <PreviousIcon />
                        </button>
                        <button onClick={() => setCurrentDate(new Date())}>
                            Today
                        </button>
                        <button onClick={() => setCurrentDate(addDays(getMonday(currentDate), 7))}>
                            <NextIcon />
                        </button>
                    </div>
                </div>
                <div className='table-header'>
                    <div></div>
                    {dayOfWeek.map((day, index) => (
                        <div className="table-header-component" >
                            <a href={`/plan-detail/${formatDateRouter(addDays(getMonday(currentDate), index))}`}>
                                <div style={{ color: changeColor(formatDate(addDays(getMonday(currentDate), index))) }}>
                                    {day}
                                    <br></br>
                                    {formatDate(addDays(getMonday(currentDate), index))}
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                <div className='table-body'>
                    <div className='table-body-content'>
                        <div className="meal" style={{ color: '#32a6de' }}>
                            <div>
                                <b>BreakFast</b>
                            </div>
                            <div>
                                <b>6AM - 8AM</b>
                            </div>
                        </div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                    </div>
                    <div className='table-body-content'>
                        <div style={{ color: '#e29d1d' }}>
                            <div>
                                <b>Lunch</b>
                            </div>
                            <div>
                                <b>12:30AM - 2PM</b>
                            </div>
                        </div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                    </div>
                    <div className='table-body-content'>
                        <div style={{ color: '#68169c' }}>
                            <div>
                                <b>Dinner</b>
                            </div>
                            <div>
                                <b>6PM - 9PM</b>
                            </div>
                        </div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                    </div>
                </div>
            </Fragment >);
    } else {
        contentAuth = (
            <Fragment>
                <div className='date-info'>
                    <div className='date'>
                        <Button variant="primary" onClick={handleShow}>
                            Create Meal Plan
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Meal Plan</Modal.Title>
                            </Modal.Header>
                            <form onSubmit={e => handleFormCreate(e)}>
                                <Modal.Body>
                                    <div class="form-group">
                                        <div class="form-group">
                                            <label htmFor="date">Date<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input type="date" class="form-control" id="date" placeholder="Date"
                                                onChange={(e) => setData({ ...data, dateSt: formatData(e.target.value) })} required />
                                        </div>
                                        {contentForm}
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type='submid' >
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </div>
                    <div className='button'>
                        <button onClick={() => setCurrentDate(subDays(getMonday(currentDate), 7))}>
                            <PreviousIcon />
                        </button>
                        <button onClick={() => setCurrentDate(new Date())}>
                            Today
                        </button>
                        <button onClick={() => setCurrentDate(addDays(getMonday(currentDate), 7))}>
                            <NextIcon />
                        </button>
                    </div>
                </div>
                <div className='table-header'>
                    <div></div>
                    {dayOfWeek.map((day, index) => (
                        <div className="table-header-component" >
                            <a href={`/plan-detail/${formatDateRouter(addDays(getMonday(currentDate), index))}`}>
                                <div style={{ color: changeColor(formatDate(addDays(getMonday(currentDate), index))) }}>
                                    {day}
                                    <br></br>
                                    {formatDate(addDays(getMonday(currentDate), index))}
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                <div className="table-body">
                    <div className="table-body-content">
                        <div className="meal" style={{ color: '#32a6de' }}>
                            <div>
                                <b>BreakFast</b>
                            </div>
                            <div>
                                <b>6AM - 8AM</b>
                            </div>
                        </div>
                        {mealPlan?.plans.data?.food && mealPlan?.plans.data?.food.map((meal) => (
                            <div className="item">
                                {
                                    meal.breakfast.map((food) => {
                                        return (
                                            <Food
                                                id={food.recipeId}
                                                foodName={food.recipeName}
                                                calo={food.recipeCalo}
                                                isDelete={food.isDelete}
                                                meal='breakfast'
                                            />
                                        )
                                    })
                                }
                            </div>
                        ))}
                    </div>
                    <div className="table-body-content">
                        <div style={{ color: '#e29d1d' }}>
                            <div>
                                <b>Lunch</b>
                            </div>
                            <div>
                                <b>12:30AM - 2PM</b>
                            </div>
                        </div>
                        {mealPlan?.plans.data?.food && mealPlan?.plans.data?.food.map((meal) => (
                            <div className="item">
                                {
                                    meal.lunch.map((food) => {
                                        return (
                                            <Food
                                                id={food.recipeId}
                                                foodName={food.recipeName}
                                                calo={food.recipeCalo}
                                                isDelete={food.isDelete}
                                                meal='lunch'
                                            />
                                        )
                                    })
                                }
                            </div>
                        ))}
                    </div>
                    <div className="table-body-content">
                        <div style={{ color: '#68169c' }}>
                            <div>
                                <b>Dinner</b>
                            </div>
                            <div>
                                <b>6PM - 9PM</b>
                            </div>
                        </div>
                        {mealPlan?.plans.data?.food && mealPlan?.plans.data?.food.map((meal) => (
                            <div className="item" >
                                {
                                    meal.dinner.map((food) => {
                                        return (
                                            <Food
                                                id={food.recipeId}
                                                foodName={food.recipeName}
                                                calo={food.recipeCalo}
                                                isDelete={food.isDelete}
                                            />
                                        )
                                    })
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </Fragment>)
    }

    return (
        <Fragment>
            <Toaster />
            <div className="plan-meal">
                {user?.role ? (contentAuth) : (content)}
            </div >
        </Fragment>
    )
}
