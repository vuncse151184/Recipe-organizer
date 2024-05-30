import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Slider, Stack, Typography, Collapse, FormControl, FormGroup } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useState, useEffect } from 'react'
import Search from './Search/Search'
import axios from 'axios'

const SearchFilter = () => {
    const minmin = 0
    const maxmax = 1000
    const minServing = 1
    const maxServing = 20
    const [serving, setServing] = useState([1, 20])
    const [timeValue, setTimeValue] = useState([0, 1000])
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [isCollapsedServing, setIsCollapsedServing] = useState(true)
    const [openFilter, setOpenFilter] = useState(false)
    const [chooseCountry, setChooseCountry] = useState('')
    const [chooseMeal, setChooseMeal] = useState('')
    const [country, setCountry] = useState([])
    const [meal, setMeal] = useState([])
    const mealUrl = `https://recipe-organizer-api.azurewebsites.net/api/Meals/GetAll`
    const countryUrl = `https://recipe-organizer-api.azurewebsites.net/api/Countries/GetCountriesFilter`

    const countryApi = () => {
        axios
            .get(countryUrl)
            .then((response) => {
                if (response.status === 200) {
                    setCountry(response.data)
                }
            })
            .catch((error) => {
                setCountry([])
            })
    }
    const mealApi = () => {
        axios
            .get(mealUrl)
            .then((response) => {
                if (response.status === 200) {
                    setMeal(response.data)
                }
            })
            .catch((error) => {
                setCountry([])
            })
    }

    useEffect(() => {
        countryApi()
        mealApi()
    }, [])

    const handleTimeChange = (event, newValue) => {
        setTimeValue(newValue)
    }
    const handleServingChange = (event, newValue) => {
        setServing(newValue)
    }
    const handleCountryChange = (event, newValue) => {
        setChooseCountry(newValue)
    }
    const handleMealChange = (event, newValue) => {
        setChooseMeal(newValue)
    }
    return (
        <>
            <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <Search
                        country={chooseCountry}
                        meal={chooseMeal}
                        totalTime={timeValue}
                        serving={serving}
                    />
                </div>
                <div style={{ marginLeft: 10, marginTop: 130 }}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => setOpenFilter(!openFilter)}
                        style={{
                            backgroundColor: '#f39c12',
                            outline: 'none',
                            width: 100,
                            height: 40,
                        }}
                    >
                        <FilterListIcon />
                    </Button>
                </div>
            </div>

            {openFilter && (
                <div className="container">
                    <FormControl>
                        <FormGroup>
                            <Grid container spacing={3}>
                                {country.data && (
                                    <Grid xs={6}>
                                        <Autocomplete
                                            key="country-autocomplete"
                                            id="country"
                                            size="small"
                                            style={{ width: 200 }}
                                            options={country.data}
                                            autoHighlight
                                            getOptionLabel={(option) => option?.countryName}
                                            onChange={handleCountryChange}
                                            renderOption={(props, option) => (
                                                <Box
                                                    component="li"
                                                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                    {...props}
                                                >
                                                    {option?.countryName}
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Choose a country" />
                                            )}
                                        />
                                    </Grid>
                                )}
                                {meal.data && (
                                    <Grid xs={6}>
                                        <Autocomplete
                                            key="meal-autocomplete"
                                            id="meal"
                                            size="small"
                                            sx={{ width: 200 }}
                                            options={meal.data}
                                            autoHighlight
                                            getOptionLabel={(option) => option?.mealName}
                                            onChange={handleMealChange}
                                            renderOption={(props, option) => (
                                                <Box
                                                    component="li"
                                                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                    {...props}
                                                >
                                                    {option?.mealName}
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Meal" />
                                            )}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            <Grid container spacing={3} marginTop={5}>
                                <Grid xs={6}>
                                    <Button
                                        size="large"
                                        onClick={() => setIsCollapsed(!isCollapsed)}
                                        style={{
                                            outline: 'none',
                                            backgroundColor: '#f39c12',
                                            width: 200,
                                        }}
                                        variant="contained"
                                    >
                                        Total Time
                                    </Button>
                                    <Collapse in={!isCollapsed}>
                                        <Slider
                                            getAriaLabel={() => 'Time range'}
                                            value={timeValue}
                                            onChange={handleTimeChange}
                                            valueLabelDisplay="auto"
                                            min={minmin}
                                            max={maxmax}
                                            style={{ color: '#f39c12', width: 220 }}
                                        />
                                        <Stack
                                            direction="row"
                                            justifyContent="space-evenly"
                                            alignItems="center"
                                            textAlign={'center'}
                                        >
                                            <TextField
                                                label="min(s)"
                                                type="number"
                                                variant="outlined"
                                                InputLabelProps={{ shrink: true }}
                                                sx={{ width: '90px' }}
                                                value={timeValue[0]}
                                                onChange={(e) => {
                                                    const newValue = Number(e.target.value)
                                                    if (newValue >= minmin && newValue <= maxmax) {
                                                        setTimeValue([newValue, timeValue[1]])
                                                    }
                                                }}
                                            />
                                            <Typography> - </Typography>
                                            <TextField
                                                label="min(s)"
                                                type="number"
                                                variant="outlined"
                                                InputLabelProps={{ shrink: true }}
                                                sx={{ width: '90px' }}
                                                value={timeValue[1]}
                                                onChange={(e) => {
                                                    const newValue = Number(e.target.value)
                                                    if (newValue >= minmin && newValue <= maxmax) {
                                                        setTimeValue([timeValue[0], newValue])
                                                    }
                                                }}
                                            />
                                        </Stack>
                                    </Collapse>
                                </Grid>
                                <Grid xs={6}>
                                    <Button
                                        size="large"
                                        onClick={() => setIsCollapsedServing(!isCollapsedServing)}
                                        style={{
                                            outline: 'none',
                                            backgroundColor: '#f39c12',
                                            width: 200,
                                        }}
                                        variant="contained"
                                    >
                                        Serving
                                    </Button>
                                    <Collapse in={!isCollapsedServing}>
                                        <Slider
                                            getAriaLabel={() => 'Serving'}
                                            value={serving}
                                            onChange={handleServingChange}
                                            valueLabelDisplay="auto"
                                            min={minServing}
                                            max={maxServing}
                                            style={{ color: '#f39c12', width: 220 }}
                                        />
                                        <Stack
                                            direction="row"
                                            justifyContent="space-evenly"
                                            alignItems="center"
                                            textAlign={'center'}
                                        >
                                            <TextField
                                                label="person(s)"
                                                type="number"
                                                variant="outlined"
                                                InputLabelProps={{ shrink: true }}
                                                sx={{ width: '90px' }}
                                                value={serving[0]}
                                                onChange={(e) => {
                                                    const newValue = Number(e.target.value)
                                                    if (
                                                        newValue >= minServing &&
                                                        newValue <= maxServing
                                                    ) {
                                                        setServing([newValue, serving[1]])
                                                    }
                                                }}
                                            />
                                            <Typography> - </Typography>
                                            <TextField
                                                label="person(s)"
                                                type="number"
                                                variant="outlined"
                                                InputLabelProps={{ shrink: true }}
                                                sx={{ width: '90px' }}
                                                value={serving[1]}
                                                onChange={(e) => {
                                                    const newValue = Number(e.target.value)
                                                    if (
                                                        newValue >= minServing &&
                                                        newValue <= maxServing
                                                    ) {
                                                        setServing([serving[0], newValue])
                                                    }
                                                }}
                                            />
                                        </Stack>
                                    </Collapse>
                                </Grid>
                            </Grid>
                        </FormGroup>
                    </FormControl>
                </div>
            )}
        </>
    )
}

export default SearchFilter
