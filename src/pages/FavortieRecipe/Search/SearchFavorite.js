import React from 'react'
import './index.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchFavorite = ({ country, meal, totalTime, serving }) => {
    const [searchName, setSearchName] = useState('')
    const minTotalTime = totalTime[0]
    const maxTotalTime = totalTime[1]
    const minServing = totalTime[0]
    const maxServing = totalTime[1]
    const result = useNavigate()
    const searchUrl = `https://recipe-organizer-api.azurewebsites.net/api/FavoriteRecipes/SearchFavoriteRecipe`
    const [searchResult, setSearchResult] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    const handleSearch = (e) => {
        e.preventDefault()
        const cId = country === undefined ? '' : country?.countryId
        const mId = meal === undefined ? '' : meal?.mealId
        const searchData = {
            recipeName: searchName,
            countryId: cId,
            mealId: mId,
            minTotalTime: minTotalTime,
            maxTotalTime: maxTotalTime,
            minServing: minServing,
            maxServing: maxServing,
        }
        axios
            .post(searchUrl, searchData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((response) => {
                setSearchResult(response.data)
                result('/search-favorite-results', {
                    state: { searchResult: response.data },
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }
    return (
        <div className="search">
            <div className="row">
                <div className="col-12">
                    <form className="search-form" onSubmit={handleSearch}>
                        <div className="input-container">
                            <div className="search-box">
                                <input
                                    type="search"
                                    name="search"
                                    placeholder="Type any keywords..."
                                    className="search-input"
                                    style={{ outline: '2px solid #ccc' }}
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="search-button"
                                    style={{ outline: 'none' }}
                                >
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchFavorite
