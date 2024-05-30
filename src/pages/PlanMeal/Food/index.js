import React, { Fragment } from 'react'
import './index.css'
import styled from 'styled-components';
import ErrorIcon from '@mui/icons-material/Error';
import Tooltip from '@mui/material/Tooltip';

const StyledDiv = styled.div`
    width: 100%;
    height: max-content;
    padding: 5px;
    font-size: 12px;
    border-radius: 5px;
    font-weight: bold;
    margin-bottom: 5px;
    background-color: ${props => props.backgroundColor};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${props => props.hoverBackgroundColor};
    }
`;

const Food = ({ id, foodName, calo, isDelete, meal }) => {
    let bgColor, bgColorHover, content;
    const iconStyle = {
        fontSize: 14,
        marginRight: 4,
        color: '#eb2f06'
    };
    switch (meal) {
        case 'breakfast': {
            bgColor = '#c1e4f5'
            bgColorHover = '#32a6de99'
            break
        }
        case 'lunch': {
            bgColor = '#f6e1bb'
            bgColorHover = '#e29d1d99'
            break
        }
        default: {
            bgColor = '#d1b9e1'
            bgColorHover = '#68169c99'
        }
    }

    isDelete
        ? content = (
            <StyledDiv backgroundColor={bgColor} hoverBackgroundColor={bgColorHover}>
                <div>
                    <Tooltip title="Cooker deleted this recipe" placement="right">
                        <ErrorIcon style={iconStyle} />
                    </Tooltip>
                    {foodName}

                </div>
                <div style={{ color: '#718093' }}>Calories: {calo} kcal</div>
            </StyledDiv>
        )
        : content = (
            <a href={`/recipe-detail/${id}`} >
                <StyledDiv backgroundColor={bgColor} hoverBackgroundColor={bgColorHover}>
                    <div>
                        {foodName}
                    </div>
                    <div style={{ color: '#718093' }}>Calories: {calo} kcal</div>
                </StyledDiv>
            </a>
        )
    return <Fragment>{content}</Fragment>
}

export default Food
