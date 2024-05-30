import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { removePlan } from '../../../redux/apiThunk/planThunk'
import { useDispatch } from 'react-redux'
import Swal from "sweetalert2";
import toast from 'react-hot-toast';
// import styled from 'styled-components';
import ErrorIcon from '@mui/icons-material/Error';
import Tooltip from '@mui/material/Tooltip';

const Food = ({ id, foodId, name, image, time, ingredient, calories, isDelete, handleReload }) => {
    const dispatch = useDispatch()
    let content
    const iconStyle = {
        fontSize: 14,
        marginRight: 4,
        color: '#eb2f06'
    };
    //delete plan meal
    const deletePlanMeal = async (e) => {
        e.preventDefault()
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
                await dispatch(removePlan({ id: id })).then((result) => {
                    result.payload.status === 1 ? toast.success('Delete Success!') : toast.error('Delete Failed!')
                    handleReload()
                }).catch((err) => {
                    console.log(err);
                });
            } else {
            }
        });
    }

    isDelete
        ? content = (
            <Link className='product-infor' style={{ cursor: 'text' }}>
                <img src={image} alt={name} />
                <div className="product-detail">
                    <b>{name}</b>
                    <div style={{ fontSize: "15px" }}>
                        Cooking: {time} minutes<br />
                        Ingredient: {ingredient} Ingredients<br />
                        Calo: {calories}g
                    </div>
                </div>
                <Tooltip title="Cooker deleted this recipe" placement="right">
                    <ErrorIcon style={iconStyle} />
                </Tooltip>
            </Link>
        )
        : content = (
            <Link className='product-infor' to={`/recipe-detail/${foodId}`}>
                <img src={image} alt={name} />
                <div className="product-detail">
                    <b>{name}</b>
                    <div style={{ fontSize: "15px" }}>
                        Cooking: {time} minutes<br />
                        Ingredient: {ingredient} Ingredients<br />
                        Calo: {calories}g
                    </div>
                </div>
            </Link>
        )

    return (
        <div className="product">
            {content}

            <div className='product-feature' style={{ alignItems: 'right' }}>
                <button onClick={(e) => deletePlanMeal(e)}>
                    Delete
                </button>
            </div>
        </div >
    )
}

export default Food
