import React from 'react'
import imgLogo from '../../img/core-img/logo.png'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import { useNavigate, Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { Fragment } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const navigate = useNavigate()
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
        window.location.reload()
    }

    const user = JSON.parse(localStorage.getItem('user'))
    let headerList
    if (user?.role === 'Admin') {
        headerList = (
            <Fragment>
                <li>
                    <Link
                        to="/user-list"
                        className="nav-link px-2 link-dark"
                        style={{ fontSize: '20px' }}
                    >
                        User List
                    </Link>
                </li>
                <li>
                    <Link
                        to="/ingredient-list"
                        className="nav-link px-2 link-dark"
                        style={{ fontSize: '20px' }}
                    >
                        Ingredients List
                    </Link>
                </li>
            </Fragment>
        )
    } else if (user?.role === 'Cooker') {
        headerList = (
            <Fragment>
                <li>
                    <Link
                        to="/my-recipe"
                        className="nav-link px-2 link-dark"
                        style={{ fontSize: '20px' }}
                    >
                        My Recipes
                    </Link>
                </li>
                <li>
                    <Link
                        to="/create-recipe"
                        className="nav-link px-2 link-dark"
                        style={{ fontSize: '20px' }}
                    >
                        Add recipe
                    </Link>
                </li>
            </Fragment>
        )
    } else {
        headerList = (
            <Fragment>
                <li>
                    <Link
                        to="/plan"
                        className="nav-link px-2 link-dark"
                        style={{ fontSize: '20px' }}
                    >
                        Meal Plan
                    </Link>
                </li>
                <li>
                    <Link
                        to="/favorite-recipe"
                        className="nav-link px-2 link-dark"
                        style={{ fontSize: '20px' }}
                    >
                        Favorite Recipe
                    </Link>
                </li>
            </Fragment>
        )
    }
    return (
        <>
            <div
                className="w-100"
                style={{ position: 'fixed', zIndex: 500, backgroundColor: '#fff' }}
            >
                <div className="">
                    <div className="w-100">
                        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom align-items-center">
                            <Link className="nav-brand" to="/">
                                <img
                                    src={imgLogo}
                                    alt=""
                                    style={{ width: 100, height: 50, marginLeft: 65 }}
                                />
                            </Link>
                            <Box sx={{ width: '500px' }}>
                                <Swiper
                                    spaceBetween={20}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    modules={[Autoplay]}
                                    sx={{
                                        zIndex: -1,
                                        color: 'white',
                                    }}
                                >
                                    <SwiperSlide sx={{ paddingLeft: '20px', height: '20px' }}>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontSize: '25px',
                                                fontStyle: 'italic',
                                                display: 'inline',
                                            }}
                                        >
                                            Welcome to
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: '25px',
                                                display: 'inline',
                                                fontStyle: 'italic',
                                                paddingLeft: '5px',
                                                color: 'black',
                                                fontWeight: '600',
                                                fontFamily: 'Lucida Handwriting',
                                            }}
                                        >
                                            Delicious
                                        </Typography>
                                    </SwiperSlide>
                                    <SwiperSlide sx={{ paddingLeft: '20px', height: '20px' }}>
                                        {user ? (
                                            <>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontSize: '25px',
                                                        fontStyle: 'italic',
                                                        display: 'inline',
                                                    }}
                                                >
                                                    Hello
                                                </Typography>{' '}
                                                &nbsp;
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontSize: '25px',
                                                        fontStyle: 'italic',
                                                        display: 'inline',
                                                    }}
                                                >
                                                    {user?.role == 'Cooker' ? 'cooker' : ''}
                                                    {user?.role == 'User' ? 'user' : ''}
                                                    {user?.role == 'Admin' ? 'admin' : ''}
                                                </Typography>
                                                &nbsp; &nbsp;
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontSize: '25px',
                                                        display: 'inline',
                                                        fontStyle: 'italic',
                                                    }}
                                                >
                                                    {user?.fullname}
                                                </Typography>
                                            </>
                                        ) : (
                                            <>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontSize: '25px',
                                                        fontStyle: 'italic',
                                                        display: 'inline',
                                                    }}
                                                >
                                                    Welcome to
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: '25px',
                                                        display: 'inline',
                                                        fontStyle: 'italic',
                                                        paddingLeft: '5px',
                                                        color: 'black',
                                                        fontWeight: '600',
                                                        fontFamily: 'Lucida Handwriting',
                                                    }}
                                                >
                                                    Delicious
                                                </Typography>
                                            </>
                                        )}
                                    </SwiperSlide>
                                </Swiper>
                            </Box>

                            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ml-2 mr-2">
                                <li>
                                    <Link
                                        to="/"
                                        className="nav-link px-2 link-dark"
                                        style={{ fontSize: '20px' }}
                                    >
                                        Home
                                    </Link>
                                </li>
                                {headerList}
                                <li>
                                    {user ? (
                                        <>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '110px',
                                                }}
                                            >
                                                <Tooltip title="Account settings">
                                                    <IconButton
                                                        onClick={handleClick}
                                                        size="small"
                                                        style={{ outline: 'none' }}
                                                        sx={{ ml: 2 }}
                                                        aria-controls={
                                                            open ? 'account-menu' : undefined
                                                        }
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                    >
                                                        <img
                                                            src={user.photo}
                                                            alt="mdo"
                                                            width="32"
                                                            height="32"
                                                            className="rounded-circle"
                                                        />
                                                        <ArrowDropDownIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                            <Menu
                                                anchorEl={anchorEl}
                                                id="account-menu"
                                                open={open}
                                                onClose={handleClose}
                                                onClick={handleClose}
                                                PaperProps={{
                                                    elevation: 0,
                                                    sx: {
                                                        overflow: 'visible',
                                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                        mt: 1.5,
                                                        '& .MuiAvatar-root': {
                                                            width: 32,
                                                            height: 32,
                                                            ml: -0.5,
                                                            mr: 1,
                                                        },
                                                        '&:before': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            top: 0,
                                                            right: 14,
                                                            width: 10,
                                                            height: 10,
                                                            bgcolor: 'background.paper',
                                                            transform:
                                                                'translateY(-50%) rotate(45deg)',
                                                            zIndex: 0,
                                                        },
                                                    },
                                                }}
                                                transformOrigin={{
                                                    horizontal: 'right',
                                                    vertical: 'top',
                                                }}
                                                anchorOrigin={{
                                                    horizontal: 'right',
                                                    vertical: 'bottom',
                                                }}
                                            >
                                                <MenuItem onClick={handleClose}>
                                                    <Link to="/profile" style={{ display: 'flex' }}>
                                                        <ListItemIcon>
                                                            <AccountCircleIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{ fontSize: '20px' }}
                                                        >
                                                            Profile
                                                        </Typography>
                                                    </Link>
                                                </MenuItem>
                                                <Divider />
                                                {/* <MenuItem onClick={handleClose}>
                                                    <Link
                                                        to="/favorite-recipe"
                                                        style={{ display: 'flex' }}
                                                    >
                                                        <ListItemIcon>
                                                            <FavoriteBorderIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        <Typography variant="h6" fontSize={20}>
                                                            {' '}
                                                            Favorite Recipe
                                                        </Typography>
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem onClick={handleClose}>
                                                    <Link
                                                        to={`/my-recipe`}
                                                        style={{
                                                            alignContent: 'center',
                                                            textDecoration: 'none',
                                                            color: 'inherit',
                                                            display: 'flex',
                                                        }}
                                                    >
                                                        <ListItemIcon>
                                                            <MenuBookIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        <Typography variant="h6" fontSize={20}>
                                                            All my recipes
                                                        </Typography>
                                                    </Link>
                                                </MenuItem> */}
                                                <MenuItem onClick={handleLogout}>
                                                    <ListItemIcon>
                                                        <Logout fontSize="small" />
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                paddingLeft: '10px',
                                                                fontSize: '20px',
                                                            }}
                                                        >
                                                            Logout
                                                        </Typography>
                                                    </ListItemIcon>
                                                </MenuItem>
                                            </Menu>
                                        </>
                                    ) : (
                                        <a
                                            href="/login"
                                            className="nav-link px-2 link-dark"
                                            style={{ fontSize: '20px' }}
                                        >
                                            Login
                                        </a>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
