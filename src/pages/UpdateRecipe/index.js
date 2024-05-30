import * as React from 'react'
import { useRef, useState, useEffect } from 'react'
import { storage } from '../../App'
import { Input } from '@mui/base/Input'
import { styled } from '@mui/system'
import CircularProgress from '@mui/material/CircularProgress';
import {
    Typography,
    CssBaseline,
    Container,
    Box,
    OutlinedInput,
    Divider,
    Autocomplete,
    Stack,
    Button,
    TextField,
    InputLabel,
    Select,
    FormControl,
} from '@mui/material'
import { TextareaAutosize } from '@mui/base/TextareaAutosize'
import { useNavigate } from 'react-router-dom'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    uploadBytesResumable,
} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import imgBanner1 from './../../assets/pizza.jpg'
const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
        <Input
            slots={{ input: StyledInputElement, textarea: StyledTextareaElement }}
            {...props}
            ref={ref}
        />
    )
})
function UpdateRecipe() {
    const [isLoading, setIsLoading] = useState(false);
    console.log("isLoading", isLoading)
    //-------------------ERROR-----------------------------
    const [ingredientNameError, setIngredientNameError] = useState('')
    const [ingredientDup, setIngredientDup] = useState('')
    const [directionError, setDirectionError] = useState('')
    const [preError, setPreError] = useState('')
    const [standError, setStandError] = useState('')
    const [cookError, setCookError] = useState('')
    const [titleError, setTitleError] = useState('')
    const [countryError, setCountryError] = useState('')
    const [servingError, setServingError] = useState('')
    const [mealError, setMealError] = useState('')
    const [quantityError, setQuantityError] = useState('')
    //-------------------Get APIs HERE-----------------------------
    const navigate = useNavigate()
    const [updateRecipe, setUpdateRecipe] = useState('')
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = user?.token
    const recipeUpdateUrl = `https://recipe-organizer-api.azurewebsites.net/api/Recipes/GetRecipeUpdate?id=${id}`

    const getUpdateRecipe = async () => {
        fetch(recipeUpdateUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(async (response) => {
                if (response.status === 401) {
                    await Swal.fire({
                        position: 'center',
                        icon: 'info',
                        title: 'Login expired!',
                        showConfirmButton: false,
                        footer: '<a href="/login" style="font-size: 20px; color: red">LOGIN AGAIN</a>',
                    })
                }
                if (!response.ok) {
                    throw new Error(`HTTP Status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                console.log()
                setUpdateRecipe(data)
                setRecipeTitle(data?.data.recipeName)
                setRecipeDescription(data?.data.description)
                setSelectedImage(data?.data.photoVMs[0].photoName)
                const directionDataFromAPI = data.data.directionVMs

                const newdirectionFields = directionDataFromAPI.map((directionsData) => {
                    return {
                        directionsNum: directionsData.directionsNum,
                        directionsDesc: directionsData.directionsDesc,
                    };
                });

                const ingredientDataFromAPI = data.data.ingredientOfRecipeVMs
                const newIngredientFields = ingredientDataFromAPI.map((ingredientData) => {
                    return {
                        id: ingredientData.ingredientVM.ingredientId,
                        ingredientName:
                            ingredientData.ingredientVM.ingredientName +
                            ' - ' +
                            ingredientData.ingredientVM.measure,
                        quantity: ingredientData.quantity,
                    };
                });
                setDirectionFields(newdirectionFields)
                setIngredientFields(newIngredientFields)
                setNutritionValues(() => ({
                    ['fat']: data.data.fat,
                    ['carbs']: data.data.carbohydrate,
                    ['protein']: data.data.protein,
                }))
                setTotalCalories(data?.data.calories)
                setTimeValue(() => ({
                    ['prep']: data.data.prepTime,
                    ['stand']: data.data.standTime,
                    ['cook']: data.data.cookTime,
                }))
                setTotalTime(data?.data.totalTime)
                setServingAmount(data?.data.servings)
                setSelectedCountry(data?.data.countryVM.countryName)
                setSelectedCountryId(data?.data.countryVM.countryId)
                setSelectedMeal(data?.data.mealVMs.mealName)
                setSelectedMealId(data?.data.mealVMs.mealId)
            })
            .catch((error) => console.log(error.message))
    }

    // const [allCountries, setAllCountries] = useState('')
    // const allCountriesUrl = `https://recipe-organizer-api.azurewebsites.net/api/Countries/GetCountriesAdd`;

    // const getAllCountries = () => {
    //     fetch(allCountriesUrl)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP Status: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setAllCountries(data)
    //         })
    //         .catch((error) => console.log(error.message));
    // };

    const [allIngredients, setAllInredients] = useState('')
    const allIngredientsUrl = `https://recipe-organizer-api.azurewebsites.net/api/Ingredients/GetAll`

    const getAllIngredients = () => {
        fetch(allIngredientsUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                setAllInredients(data)
            })
            .catch((error) => console.log(error.message))
    }

    const [allCountries, setAllCountries] = useState('')
    const allCountriesUrl = `https://recipe-organizer-api.azurewebsites.net/api/Countries/GetCountriesAdd`

    const getAllCountries = () => {
        fetch(allCountriesUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                setAllCountries(data)
            })
            .catch((error) => console.log(error.message))
    }
    useEffect(() => {
        getAllCountries()
        getAllMeals()
        getAllIngredients()
        getUpdateRecipe()
    }, [])

    const [allMeals, setAllMeals] = useState('')
    const allMealsUrl = `https://recipe-organizer-api.azurewebsites.net/api/Meals/GetAll`

    const getAllMeals = () => {
        fetch(allMealsUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                setAllMeals(data)
            })
            .catch((error) => console.log(error.message))
    }

    const [photoVM, setPhotoVMs] = useState({
        photoName: '',
    })
    const [photoUrl, setPhotoUrl] = useState('')

    const handleUpdateRecipe = async () => {
        setIsLoading(true)
        if (uploadedFile) {
            const imageRef = ref(storage, `Recipes/${uuidv4()}`)
            uploadBytes(imageRef, uploadedFile).then(() => {
                const storageRef = imageRef
                const uploadTask = uploadBytesResumable(storageRef, uploadedFile)

                uploadTask.on(
                    'state_changed',
                    (snapshot) => { },
                    (error) => {
                        console.error(error)
                    },
                    async () => {
                        const url = await getDownloadURL(uploadTask.snapshot.ref)
                        const recipeName = recipeTitle
                        const description = recipeDescription
                        const prepTimeSt = timeValue.prep + ''
                        const cookTimeSt = timeValue.cook + ''
                        const standTimeSt = timeValue.stand + ''
                        const totalTime = totalTimes
                        const servingsSt = servingAmount + ''
                        // const carbohydrateSt = nutritionValues.carbs + ''
                        // const proteinSt = nutritionValues.protein + ''
                        // const fatSt = nutritionValues.fat + ''
                        // const calories = totalCalories
                        const photoVMs = {
                            photoName: url,
                        }
                        const directionVMs = directionFields
                        const parsedIngredientFields = ingredientFields.map((field) => ({
                            ...field,
                            quantity: Number(field.quantity),
                            id: field.id + '',
                        }));

                        const ingredientOfRecipeVMs = parsedIngredientFields
                        const recipeId = id
                        const countryId = selectedCountryId
                        const mealId = selectedMealId
                        const payload = {
                            mealId,
                            countryId,
                            recipeId,
                            recipeName,
                            description,
                            prepTimeSt,
                            cookTimeSt,
                            standTimeSt,
                            servingsSt,
                            // carbohydrateSt,
                            // proteinSt,
                            // fatSt,
                            // calories,
                            totalTime,
                            photoVMs,
                            ingredientOfRecipeVMs,
                            directionVMs,
                        }

                        try {
                            const user = JSON.parse(localStorage.getItem('user'))
                            const accessToken = user?.token
                            const response = await fetch(
                                `https://recipe-organizer-api.azurewebsites.net/api/Recipes/UpdateRecipe?id=${id}`,
                                {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${accessToken}`,
                                    },
                                    body: JSON.stringify(payload),
                                }
                            )
                            console.log(response)

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
                                try {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Recipe has been saved',
                                        showConfirmButton: false,
                                        timer: 2500,
                                    })
                                    setIsLoading(false);
                                    navigate('/my-recipe')
                                } catch (error) {
                                    console.error('Error parsing JSON:', error)
                                }
                            } else {
                                if (response.status === 400) {
                                    setIsLoading(false)
                                    setIngredientNameError('')
                                    setIngredientDup('')
                                    setDirectionError('')
                                    const data = await response.json()
                                    const msg = data.message
                                    if (msg.includes(',')) {
                                        const messError = msg.split(',')
                                        console.log(messError)
                                        messError.map((error) => {
                                            if (error === 'Prep Time must be greater than 0!!!') {
                                                setPreError(error)
                                            } else if (error === 'Recipe Name cannot be empty!!!') {
                                                setTitleError(error)
                                            } else if (error === 'Cook Time must be greater than 0!!!') {
                                                setCookError(error)
                                            } else if (error === 'Stand Time must be greater than 0!!!') {
                                                setStandError(error)
                                            } else if (error === 'Please choose Country!!!') {
                                                setCountryError(error)
                                            } else if (error === 'Servings must be greater than 0!!!') {
                                                setServingError(error)
                                            } else if (error === 'Please choose Meal Type!!!') {
                                                setMealError(error)
                                            } else if (error === 'Please select ingredient') {
                                                setIngredientNameError(error)
                                            } else if (error === 'Cannot add duplicate ingredient') {
                                                setIngredientDup(error)
                                            } else if (error === 'Quantity of ingredients cannot be a negative number') {
                                                setQuantityError(error)
                                            } else if (error.includes(`Please input for step`)) {
                                                setDirectionError(error)
                                            } else if (error === 'Prep Time not correct format!!!') {
                                                setPreError(error)
                                                console.log("prepErr", preError)
                                            } else if (error === 'Cook Time not correct format!!!') {
                                                setCookError(error)
                                            }
                                        })
                                        Swal.fire({
                                            position: 'center',
                                            icon: 'error',
                                            title: "UPDATE FAILED ",
                                            text: "Some error occured, check input again! ",
                                            timer: 2500,
                                        })
                                    }
                                }
                            }
                        } catch (error) {
                            // Handle error
                            console.error('Error:', error)
                        }
                    }
                )
            })
        } else {
            const recipeName = recipeTitle
            const description = recipeDescription
            const prepTimeSt = timeValue.prep + ''
            const cookTimeSt = timeValue.cook + ''
            const standTimeSt = timeValue.stand + ''
            const totalTime = totalTimes
            const servingsSt = servingAmount + ''
            // const carbohydrateSt = nutritionValues.carbs + ''
            // const proteinSt = nutritionValues.protein + ''
            // const fatSt = nutritionValues.fat + ''
            // const calories = totalCalories
            const photoVMs = {
                photoName: selectedImage,
            }
            const directionVMs = directionFields
            const parsedIngredientFields = ingredientFields.map((field) => ({
                ...field,
                quantity: Number(field.quantity),
                id: field.id + '',
            }));
            const ingredientOfRecipeVMs = parsedIngredientFields
            const recipeId = id
            const countryId = selectedCountryId
            const mealId = selectedMealId
            const payload = {
                mealId,
                countryId,
                recipeId,
                recipeName,
                description,
                prepTimeSt,
                cookTimeSt,
                standTimeSt,
                servingsSt,
                // carbohydrateSt,
                // proteinSt,
                // fatSt,
                // calories,
                totalTime,
                photoVMs,
                ingredientOfRecipeVMs,
                directionVMs,
            }
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                const accessToken = user?.token
                const response = await fetch(
                    `https://recipe-organizer-api.azurewebsites.net/api/Recipes/UpdateRecipe?id=${id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify(payload),
                    }
                )
                console.log('response', response)
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
                    try {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Recipe has been saved',
                            showConfirmButton: false,
                            timer: 2500,
                        })
                        setIsLoading(false)
                        navigate('/my-recipe')
                    } catch (error) {
                        console.error('Error parsing JSON:', error)
                    }
                } else {
                    if (response.status === 400) {
                        setIsLoading(false)
                        setIngredientNameError('')
                        setIngredientDup('')
                        setDirectionError('')
                        const data = await response.json()
                        const msg = data.message
                        console.log('message', msg)
                        if (msg.includes(',')) {
                            const messError = msg.split(',')

                            console.log(messError)
                            messError.map((error) => {
                                if (error === 'Prep Time must be greater than 0!!!') {
                                    setPreError(error)
                                } else if (error === 'Recipe Name cannot be empty!!!') {
                                    setTitleError(error)
                                } else if (
                                    error === 'Cook Time must be greater than 0!!!'
                                ) {
                                    setCookError(error)
                                } else if (
                                    error === 'Stand Time must be greater than 0!!!'
                                ) {
                                    setStandError(error)
                                } else if (error === 'Please choose Country!!!') {
                                    setCountryError(error)
                                } else if (
                                    error === 'Servings must be greater than 0!!!'
                                ) {
                                    setServingError(error)
                                } else if (error === 'Please choose Meal Type!!!') {
                                    setMealError(error)
                                } else if (error === 'Please select ingredient') {
                                    setIngredientNameError(error)
                                } else if (
                                    error === 'Cannot add duplicate ingredient'
                                ) {
                                    setIngredientDup(error)
                                } else if (
                                    error ===
                                    'Quantity of ingredients cannot be a negative number'
                                ) {
                                    setQuantityError(error)
                                    console.log(
                                        'aaaaaaaaaaaaaaaaaaaaaaa',
                                        quantityError
                                    )
                                } else if (error.includes(`Please input for step`)) {
                                    setDirectionError(error)
                                } else if (error === 'Prep Time not correct format!!!') {
                                    setPreError(error)
                                    console.log("prepErr", preError)
                                } else if (error === 'Cook Time not correct format!!!') {
                                    setCookError(error)
                                }
                            })
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "UPDATE FAILED ",
                                text: "Some error occured, check input again! ",
                                timer: 2500,
                            })
                        }
                    }
                    throw new Error('Request failed with status: ' + response.status)
                }
            } catch (error) {
                // Handle error
                console.error('Error:', error)
            }
        }
    }
    //------------------------------Image-------------------------------

    const [recipeTitle, setRecipeTitle] = useState('')
    const handleTitleChange = (event) => {
        setRecipeTitle(event.target.value)
    }
    const [recipeDescription, setRecipeDescription] = useState('')
    const handleDescriptionChange = (event) => {
        setRecipeDescription(event.target.value)
    }
    const fileInputRef = useRef(null)
    const handleUploadImage = () => {
        fileInputRef.current.click()
    }

    const [servingAmount, setServingAmount] = useState('1')
    const handleServingChange = (event) => {
        setServingAmount(event.target.value)
    }
    //--------------------------Ingredient--------------------------
    const [ingredientFields, setIngredientFields] = useState([
        { id: Date.now(), ingredientName: '', quantity: 1 },
    ])

    const handleChange = (id, fieldName, value) => {

        const updatedFields = ingredientFields.map((field) => {
            if (field.id === id) {
                const fieldValue = fieldName === 'quantity' ? Number(value) : value;
                return { ...field, [fieldName]: value }
            }
            console.log("quantity field", field)
            return field

        })
        setIngredientFields(updatedFields)
    }
    const handleAddIngredient = () => {
        setIngredientFields([
            ...ingredientFields,
            { id: Date.now(), ingredientName: '', quantity: 1 },
        ])
    }

    const handleDeleteIngredient = (id) => {
        const updatedFields = ingredientFields?.filter((field) => field.id !== id)
        setIngredientFields(updatedFields)
    }
    //--------------------------Images--------------------------
    const [uploadedFile, setUploadedFile] = useState(null)

    const [selectedImage, setSelectedImage] = useState(null)
    const [buttonStyle, setButtonStyle] = useState({
        zIndex: 0,
    })

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setUploadedFile(file)
        if (file) {
            const reader = new FileReader()

            reader.onload = (e) => {
                setSelectedImage(e.target.result)
            }
            reader.readAsDataURL(file)
            setButtonStyle({
                zIndex: -1,
            })
        }
    }
    //--------------------------Directions--------------------------
    const [directionFields, setDirectionFields] = useState([
        { directionsNum: 1, directionsDesc: '' },
    ]);
    const nextId = directionFields.length + 1;

    const handleAddStep = () => {
        setDirectionFields([...directionFields, { directionsNum: nextId, directionsDesc: '' }])
    }

    const handleDeleteStep = (id) => {
        const updatedFields = directionFields?.filter((field) => field.directionsNum !== id);
        console.log("updatedFields", updatedFields)
        console.log("delte id:", id)
        const renumberedFields = updatedFields.map((field, index) => ({
            ...field,
            directionsNum: index + 1,
        }));

        setDirectionFields(renumberedFields)
    }
    //--------------------------Nutritions--------------------------
    const [nutritionValues, setNutritionValues] = useState({
        fat: 0,
        carbs: 0,
        protein: 0,
    })

    const [totalCalories, setTotalCalories] = useState(0)
    const handleNutritionChange = (field, value) => {
        setNutritionValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }))

        const { fat, carbs, protein } = { ...nutritionValues, [field]: value }
        const calculatedCalories = fat * 9 + protein * 4 + carbs * 4
        setTotalCalories(calculatedCalories)
    }
    //--------------------------Time--------------------------
    const [timeValue, setTimeValue] = useState({
        prep: 0,
        stand: 0,
        cook: 0,
    })
    console.log("time:", timeValue)
    const [totalTimes, setTotalTime] = useState(0) // Initialize totalTime

    const handleTimeChange = (field, value) => {
        setTimeValue((prevValues) => ({
            ...prevValues,
            [field]: value,
        }))

        const { prep, stand, cook } = { ...timeValue, [field]: value }
        const calculatedTime = (prep || 0) * 1 + (stand || 0) * 1 + (cook || 0) * 1
        setTotalTime(calculatedTime) // Update totalTime based on the new time values
    }
    //--------------------------Optional--------------------------
    const [selectedMeal, setSelectedMeal] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')

    const [selectedCountryId, setSelectedCountryId] = useState('')
    const [selectedMealId, setSelectedMealId] = useState('')

    const countryIdLookup = {}
    const mealIdLookup = {}
    allCountries?.data?.forEach((country) => {
        countryIdLookup[country.countryName] = country.countryId
    })
    allMeals?.data?.forEach((meal) => {
        mealIdLookup[meal.mealName] = meal.mealId
    })

    const handleMealChange = (newValue) => {
        setSelectedMeal(newValue)
        const selectedId = mealIdLookup[newValue]
        setSelectedMealId(selectedId)
    }
    const handleCountryChange = (newValue) => {
        setSelectedCountry(newValue)
        const selectedId = countryIdLookup[newValue]
        setSelectedCountryId(selectedId)
    };

    return (
        <React.Fragment>
            <Toaster position="bottom-center" reverseOrder={false} />
            <CssBaseline />
            <Box sx={{ width: '100%', display: 'flex' }}>
                <Container
                    sx={{
                        bgcolor: '#fff',
                        border: 'ridge',
                        maxHeight: 'auto',
                        marginBottom: '50px',
                        marginTop: '80px',
                        flex: 1,
                    }}
                    maxWidth="sm"
                >
                    <Typography
                        sx={{ paddingLeft: '30px', fontFamily: 'Cursive', paddingBottom: '20px' }}
                        variant="h3"
                        component="h2"
                    >
                        {' '}
                        Update recipe{' '}
                    </Typography>
                    <Typography sx={{ fontSize: '15px' }} variant="subtitle1" gutterBottom>
                        {' '}
                        Uploading personal recipes is easy! Add yours to your favorites, share with
                        friends, family, or the Allrecipes community.
                    </Typography>
                    <Divider
                        sx={{
                            width: '70',
                            fontWeight: 'bold',
                            marginTop: '20px',
                            marginBottom: '20px',
                        }}
                    />

                    <Box
                        sx={{ height: 'auto', width: '100' }}
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        {/*-----------------------------------------  Title ----------------------------------------- */}
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ paddingRight: '30px' }}>
                                <Typography
                                    sx={{ lineHeight: '0.8', fontSize: '15px', fontWeight: 'bold' }}
                                    variant="h6"
                                    gutterBottom
                                >
                                    {' '}
                                    Recipe Title{' '}<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <OutlinedInput
                                    placeholder={updateRecipe.recipeName}
                                    sx={{ width: '320px' }}
                                    value={recipeTitle}
                                    onChange={handleTitleChange}
                                />

                                <Typography
                                    variant="caption"
                                    sx={{ color: 'red' }}
                                    display="block"
                                    gutterBottom
                                >
                                    {titleError}
                                </Typography>
                                <Typography
                                    sx={{
                                        lineHeight: '0.8',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        paddingTop: '20px',
                                    }}
                                    variant="h6"
                                    gutterBottom
                                >
                                    {' '}
                                    Recipe Description{' '}
                                </Typography>
                                <CustomInput
                                    aria-label="Demo input"
                                    multiline="true"
                                    placeholder="Share the story behind your recipe and what makes it special"
                                    value={recipeDescription}
                                    onChange={handleDescriptionChange}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    sx={{ lineHeight: '0.8', fontSize: '15px', fontWeight: 'bold' }}
                                    variant="h6"
                                    gutterBottom
                                >
                                    {' '}
                                    Photo{' '}
                                </Typography>
                                <Button
                                    onClick={handleUploadImage}
                                    sx={{
                                        backgroundImage: `url(${selectedImage || 'your-default-image-url.jpg'
                                            })`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '160px',
                                        height: '160px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        border: '2px dashed rgb(243, 156, 18)',
                                    }}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    />
                                    <AddPhotoAlternateIcon
                                        fontSize="large"
                                        sx={{ ...buttonStyle }}
                                    />
                                </Button>
                            </Box>
                        </Box>

                        <Divider
                            sx={{
                                width: '70',
                                fontWeight: 'bold',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                        />
                        {/* ----------------------------------------- Ingredients-----------------------------------------  */}
                        <Box sx={{ width: '80' }}>
                            <Typography
                                sx={{ lineHeight: '0.8', fontSize: '15px', fontWeight: 'bold' }}
                                variant="h6"
                                gutterBottom
                            >
                                Ingredients<span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <Typography sx={{ fontSize: '15px' }} variant="subtitle1" gutterBottom>
                                {' '}
                                Enter one ingredient per line. Include the quantity (i.e. cups,
                                tablespoons) and any special preparation (i.e. sifted, softened,
                                chopped). Use optional headers to organize the different parts of
                                the recipe (i.e. Cake, Frosting, Dressing).
                            </Typography>
                            {/* ...other code for instructions */}
                            <Stack spacing={2} sx={{ width: 'auto' }}>
                                {ingredientFields.map((field, index) => (
                                    <div style={{ display: 'flex' }} key={index}>
                                        <Autocomplete
                                            freeSolo
                                            sx={{ width: 500, paddingRight: 2 }}
                                            options={allIngredients?.data?.map(
                                                (option) =>
                                                    option.ingredientName + '  -  ' + option.measure
                                            )}
                                            value={field.ingredientName}
                                            getOptionLabel={(option) => option}
                                            onChange={(event, newValue) =>
                                                handleChange(field.id, 'ingredientName', newValue)
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    key={field.id}
                                                    label="Select ingredient"
                                                    value={field.ingredientName}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            field.id,
                                                            'ingredientName',
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            )}
                                        />
                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            placeholder="1"
                                            label="unit(s)"
                                            InputLabelProps={{ shrink: true }}
                                            inputProps={{ min: 0 }}
                                            sx={{ width: 150 }}
                                            value={field.quantity}
                                            onChange={(e) =>
                                                handleChange(field.id, 'quantity', e.target.value)
                                            }
                                        />
                                        <Button
                                            variant="text"
                                            className="btn-delete-recipe"
                                            onClick={() => handleDeleteIngredient(field?.id)}
                                        >
                                            <HighlightOffIcon color="warning" />
                                        </Button>
                                    </div>
                                ))}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: 'red' }}
                                            display="block"
                                            gutterBottom
                                        >
                                            {ingredientNameError}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: 'red' }}
                                            display="block"
                                            gutterBottom
                                        >
                                            {ingredientDup}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ maxWidth: 200 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: 'red' }}
                                            display="block"
                                            gutterBottom
                                        >
                                            {quantityError}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button onClick={handleAddIngredient} variant="contained">
                                        Add more ingredients
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                        <Divider
                            sx={{
                                width: '70',
                                fontWeight: 'bold',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                        />
                        {/* ----------------------------------------- Nutritions-----------------------------------------  */}
                        {/* <Box sx={{ width: '80' }}>
                            <Typography
                                sx={{ lineHeight: '0.8', fontSize: '15px', fontWeight: 'bold' }}
                                variant="h6"
                                gutterBottom
                            >
                                {' '}
                                Nutritions (Optional){' '}
                            </Typography>
                            <Typography sx={{ fontSize: '15px' }} variant="subtitle1" gutterBottom>
                                {' '}
                                Enter 3 main nutrions in your recipe .
                            </Typography>

                            <Stack spacing={2} sx={{ width: 'auto' }}>
                                <div style={{ display: 'flex' }}>
                                    <Box sx={{ marginRight: '20px' }}>
                                        <Typography
                                            className="typo-nutritions"
                                            variant="h5"
                                            gutterBottom
                                        >
                                            {' '}
                                            Fat
                                        </Typography>
                                        <TextField
                                            label="gram(s)"
                                            type="number"
                                            variant="outlined"
                                            placeholder="1"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ width: 150 }}
                                            inputProps={{ min: 0 }}
                                            value={nutritionValues.fat}
                                            onChange={(e) =>
                                                handleNutritionChange('fat', e.target.value)
                                            }
                                        />
                                    </Box>
                                    <Box sx={{ marginRight: '20px' }}>
                                        <Typography
                                            className="typo-nutritions"
                                            variant="h5"
                                            gutterBottom
                                        >
                                            {' '}
                                            Carbs
                                        </Typography>
                                        <TextField
                                            label="gram(s)"
                                            type="number"
                                            variant="outlined"
                                            placeholder="1"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ width: 150 }}
                                            inputProps={{ min: 0 }}
                                            value={nutritionValues.carbs}
                                            onChange={(e) =>
                                                handleNutritionChange('carbs', e.target.value)
                                            }
                                        />
                                    </Box>
                                    <Box>
                                        <Typography
                                            className="typo-nutritions"
                                            variant="h5"
                                            gutterBottom
                                        >
                                            {' '}
                                            Protein
                                        </Typography>
                                        <TextField
                                            label="gram(s)"
                                            type="number"
                                            variant="outlined"
                                            placeholder="1"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ width: 150 }}
                                            inputProps={{ min: 0 }}
                                            value={nutritionValues.protein}
                                            onChange={(e) =>
                                                handleNutritionChange('protein', e.target.value)
                                            }
                                        />
                                    </Box>
                                </div>
                                <Box
                                    sx={{
                                        width: '80',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingTop: '30px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            lineHeight: '0.8',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            marginRight: '10px',
                                        }}
                                        variant="h6"
                                        gutterBottom
                                    >
                                        {' '}
                                        Total Calories (Calo):{' '}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            lineHeight: '0.8',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            marginRight: '10px',
                                        }}
                                        variant="h6"
                                        gutterBottom
                                    >
                                        {totalCalories}{' '}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                        <Divider
                            sx={{
                                width: '70',
                                fontWeight: 'bold',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                        /> */}
                        {/* ----------------------------------------- Directions-----------------------------------------  */}
                        <Box sx={{ width: '80' }}>
                            <Typography
                                sx={{ lineHeight: '0.8', fontSize: '15px', fontWeight: 'bold' }}
                                variant="h6"
                                gutterBottom
                            >
                                Directions<span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <Typography sx={{ fontSize: '15px' }} variant="subtitle1" gutterBottom>
                                Explain how to make your recipe, including oven temperatures, baking
                                or cooking times, and pan sizes, etc. Use optional headers to
                                organize the different parts of the recipe (i.e. Prep, Bake,
                                Decorate).
                            </Typography>

                            {directionFields.map((field) => (
                                <Box key={field.directionsNum}>
                                    <Typography
                                        sx={{ fontSize: '15px' }}
                                        variant="subtitle1"
                                        gutterBottom
                                    >
                                        Step {field.directionsNum}
                                    </Typography>
                                    <Box sx={{ display: 'flex' }}>
                                        <TextareaAutosize
                                            aria-label={`Step ${field.directionsNum}`}
                                            style={{ width: '400px', paddingLeft: '10px' }}
                                            minRows={2}
                                            placeholder={`eg. Preheat oven to 350 degree F`}
                                            value={field.directionsDesc}
                                            onChange={(e) => {
                                                const updatedFields = directionFields.map(
                                                    (dirField) => {
                                                        if (
                                                            dirField.directionsNum ===
                                                            field.directionsNum
                                                        ) {
                                                            return {
                                                                ...dirField,
                                                                directionsDesc: e.target.value,
                                                            }
                                                        }
                                                        return dirField
                                                    }
                                                )
                                                setDirectionFields(updatedFields)
                                            }}
                                        />
                                        <Button
                                            variant="text"
                                            className="btn-delete-recipe"
                                            style={{
                                                outline: 'none',
                                                marginLeft: '10px',
                                                color: '#fff',
                                            }}
                                            onClick={() => handleDeleteStep(field.directionsNum)}
                                        >
                                            <HighlightOffIcon color="warning" />
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{ color: 'red' }}
                                    display="block"
                                    gutterBottom
                                >
                                    {directionError}
                                </Typography>
                            </Box>
                            <Box sx={{ marginTop: '10px' }}>
                                <Button onClick={handleAddStep} variant="contained">
                                    Add more steps
                                </Button>
                            </Box>
                        </Box>
                        <Divider
                            sx={{
                                width: '70',
                                fontWeight: 'bold',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                        />

                        {/* -----------------------------------------Time-----------------------------------------  */}
                        <Box sx={{ width: '80', display: 'flex', alignItems: 'center' }}>
                            <Stack spacing={2} sx={{ width: 'auto' }}>
                                <div style={{ display: 'flex' }}>
                                    <Box sx={{ marginRight: '20px' }}>
                                        <Typography
                                            className="typo-nutritions"
                                            variant="h6"
                                            gutterBottom
                                        >
                                            {' '}
                                            Prep Time<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            label="min(s)"
                                            type="number"
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ width: 150 }}
                                            inputProps={{ min: 0 }}
                                            value={timeValue.prep}
                                            onChange={(e) =>
                                                handleTimeChange('prep', e.target.value)
                                            }
                                        />
                                        {(!timeValue.prep || timeValue.prep < 1) && (
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'red', fontSize: 10 }}
                                                display="block"
                                                gutterBottom
                                            >
                                                {preError}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box sx={{ marginRight: '20px' }}>
                                        <Typography
                                            className="typo-nutritions"
                                            variant="h6"
                                            gutterBottom
                                        >
                                            {' '}
                                            Stand Time
                                        </Typography>
                                        <TextField
                                            label="min(s)"
                                            type="number"
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ width: 150 }}
                                            inputProps={{ min: 0 }}
                                            value={timeValue.stand}
                                            onChange={(e) =>
                                                handleTimeChange('stand', e.target.value)
                                            }
                                        />
                                        {(!timeValue.stand || timeValue.stand < 0) && (
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'red', fontSize: 10 }}
                                                display="block"
                                                gutterBottom
                                            >
                                                {standError}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box>
                                        <Typography
                                            className="typo-nutritions"
                                            variant="h6"
                                            gutterBottom
                                        >
                                            {' '}
                                            Cook Time<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            label="min(s)"
                                            type="number"
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ width: 150 }}
                                            inputProps={{ min: 0 }}
                                            value={timeValue.cook}
                                            onChange={(e) =>
                                                handleTimeChange('cook', e.target.value)
                                            }
                                        />
                                        {(!timeValue.cook || timeValue.cook < 1) && (
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'red', fontSize: 10 }}
                                                display="block"
                                                gutterBottom
                                            >
                                                {cookError}
                                            </Typography>
                                        )}
                                    </Box>
                                </div>
                                <Box
                                    sx={{
                                        width: '80',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingTop: '30px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            lineHeight: '0.8',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            marginRight: '10px',
                                        }}
                                        variant="h6"
                                        gutterBottom
                                    >
                                        {' '}
                                        Total time (mins):{' '}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            lineHeight: '0.8',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            marginRight: '10px',
                                        }}
                                        variant="h6"
                                        gutterBottom
                                    >
                                        {totalTimes}{' '}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                        <Divider
                            sx={{
                                width: '70',
                                fontWeight: 'bold',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                        />
                        {/* ----------------------------------------- Servings-----------------------------------------  */}

                        <Box sx={{ width: '80', display: 'flex' }}>
                            <Box sx={{ paddingRight: '20px' }}>
                                <Typography
                                    sx={{ lineHeight: '0.8', fontSize: '15px', fontWeight: 'bold' }}
                                    variant="h6"
                                    gutterBottom
                                >
                                    {' '}
                                    Servings{' '}<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <OutlinedInput
                                    onChange={handleServingChange}
                                    placeholder="1"
                                    value={servingAmount}
                                    type="number"
                                    inputProps={{ min: 1 }}
                                />
                                {(!servingAmount || servingAmount < 1) && (
                                    <Typography
                                        variant="caption"
                                        sx={{ color: 'red', fontSize: 10 }}
                                        display="block"
                                        gutterBottom
                                    >
                                        {servingError}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        {/* ----------------------------------------- Filtering Fields-----------------------------------------  */}

                        <Divider
                            sx={{
                                width: '70',
                                fontWeight: 'bold',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                        />
                        <Typography sx={{ fontSize: '15px' }} variant="subtitle1" gutterBottom>
                            This is the last part! It is very helpful for us to improve the
                            searching engine if you input all this.
                        </Typography>
                        <Box sx={{ display: 'flex', paddingTop: '10px' }}>
                            <Box>
                                <Typography
                                    sx={{ lineHeight: '0.8', fontSize: '15px', fontWeight: 'bold' }}
                                    variant="h6"
                                    gutterBottom
                                >
                                    {' '}
                                    Type of meal{' '}<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <Autocomplete
                                    freeSolo
                                    sx={{ width: 180, paddingRight: 2 }}
                                    options={
                                        allMeals?.data &&
                                        allMeals.data.map((option) => option.mealName)
                                    }
                                    getOptionLabel={(option) => option}
                                    value={selectedMeal}
                                    onChange={(event, newValue) => handleMealChange(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={selectedCountry}
                                            onChange={(e) => handleMealChange(e.target.value)}
                                        />
                                    )}
                                />
                                {!selectedMeal && (
                                    <Typography
                                        variant="caption"
                                        sx={{ color: 'red', fontSize: 10 }}
                                        display="block"
                                        gutterBottom
                                    >
                                        {mealError}
                                    </Typography>
                                )}
                            </Box>

                            <Box>
                                <Typography
                                    sx={{ lineHeight: '0.8', fontSize: '15px', fontWeight: 'bold' }}
                                    variant="h6"
                                    gutterBottom
                                >
                                    {' '}
                                    Select country<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <Autocomplete
                                    freeSolo
                                    sx={{ width: 350, paddingRight: 2 }}
                                    options={
                                        allCountries?.data &&
                                        allCountries?.data.map((option) => option.countryName)
                                    }
                                    getOptionLabel={(option) => option}
                                    value={selectedCountry}
                                    onChange={(event, newValue) => handleCountryChange(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={selectedCountry}
                                            onChange={(e) => handleCountryChange(e.target.value)}
                                        />
                                    )}
                                />
                                {!selectedCountry && (
                                    <Typography
                                        variant="caption"
                                        sx={{ color: 'red', fontSize: 10 }}
                                        display="block"
                                        gutterBottom
                                    >
                                        {countryError}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        <Divider
                            sx={{
                                width: '70',
                                fontWeight: 'bold',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                        />
                    </Box>

                    <Box sx={{ alignItems: 'center', marginBottom: '50px', paddingLeft: '240px' }}>
                        {isLoading ? (
                            <Button
                                onClick={handleUpdateRecipe}
                                variant="contained"
                                sx={{ backgroundColor: 'rgb(243, 156, 18) !important', width: '250px' }}
                                disableElevation
                            >
                                Submit Recipe
                                <CircularProgress size={24}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '90%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }} />
                            </Button>

                        ) : (
                            < Button
                                onClick={handleUpdateRecipe}
                                variant="contained"
                                sx={{ backgroundColor: 'rgb(243, 156, 18) !important', width: '250px' }}
                                disableElevation
                            >
                                Submit Recipe
                            </Button>
                        )}
                    </Box>

                </Container>
            </Box >
        </React.Fragment >
    )
}

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
}

const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
}

const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
)
const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 500fpx;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
)
const StyledTextareaElement = styled('textarea', {
    shouldForwardProp: (prop) => !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
})(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
)
export default UpdateRecipe
