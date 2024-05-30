import React, { Fragment, useState, useEffect } from 'react'
import './index.css'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector, useDispatch } from 'react-redux'
import {
    getAllUser,
    changeRole,
    banUser,
    unbanUser
} from '../../redux/apiThunk/userThunk'
import CircularProgress from "@mui/material/CircularProgress";

import Swal from "sweetalert2";
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const changeColor = (status) => (
    status === 'Active' ? "#339900" : "#cc3300"
)

const headCells = [
    {
        id: 'no',
        label: 'No',
    },
    {
        id: 'id',
        label: 'ID',
    },
    {
        id: 'avatar',
        label: 'Avatar',
    },
    {
        id: 'fullName',
        label: 'Full Name',
    },
    {
        id: 'email',
        label: 'Email',
    },
    {
        id: 'role',
        label: 'role',
    },
    {
        id: 'status',
        label: 'Status',
    },
    {
        id: '',
        label: '',
    },
]

function EnhancedTableHead(props) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={'normal'}
                    >
                        <b>{headCell.label}</b>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
}

export default function UserList() {
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [reload, setReload] = useState(false)
    const [id, setId] = useState();
    const [userStatus, setUserStatus] = useState()
    const [userRole, setUserRole] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUser({ movePage: page + 1, items: rowsPerPage }))
    }, [dispatch, reload, rowsPerPage, page])
    const userList = useSelector((state) => state.user)
    const status = useSelector((state) => state.user.loading)

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = userList?.users?.data?.map((n) => n.name)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event, id, status, role) => {
        setId(id)
        setUserStatus(status)
        setUserRole(role)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const updateRole = async (role) => {
        handleClose()
        if (userStatus === 'Active') {
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
                    await dispatch(changeRole({ id: id, role: role })).then((result) => {
                        result.payload.message === "Success" ? toast.success('Update Success!') : toast.error('Update Fail')
                        setReload(!reload)
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    // toast('Nothing Update!')
                }
            });
        } else {
            toast.error('User is not Active. \n Role cannot change!')
        }
    }

    const updateStatus = async () => {
        await userStatus === 'Active' ? (
            Swal.fire({
                title: "Do you want to save the changes?",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#285D9A",
                cancelButtonColor: "#e74a3b",
                confirmButtonText: "Yes, save it!",
                background: "white",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await dispatch(banUser({ id: id })).then((result) => {
                        result.payload.message === "Success" ? toast.success('DeActive User Success!') : toast.error(result.payload.message)
                        setReload(!reload)
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    // toast('Nothing Update!')
                }
            })
        ) : (
            Swal.fire({
                title: "Do you want to save the changes?",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#285D9A",
                cancelButtonColor: "#e74a3b",
                confirmButtonText: "Yes, save it!",
                background: "white",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await dispatch(unbanUser({ id: id })).then((result) => {
                        result.payload.message === "Success" ? toast.success('Active User Success!') : toast.error(result.payload.message)
                        setReload(!reload)
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    // toast('Nothing Update!')
                }
            })
        )
        handleClose()
    }

    let content
    if (status === 'loading') {
        content = (
            <CircularProgress
                sx={{
                    marginTop: '10%',
                    marginLeft: '50%',
                    marginBottom: '10%'
                }}
            />
        )
    } else if (status === 'fail' || (userList.users.data && userList.users.data.length === 0)) {
        content = <div style={{ paddingLeft: "45%%" }}> No data</div>;
    } else {
        content = (<div className="container user-list">
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                numSelected={selected?.length}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={userList?.users?.data?.length}
                            />
                            <TableBody>
                                {userList?.users.data?.map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={row.id}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="normal"
                                            >
                                                {(index + 1) + userList?.users.itemPerPage * (userList?.users.moveToPage - 1)}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="normal"
                                            >
                                                {row.userId}
                                            </TableCell>
                                            <TableCell align="left">
                                                <img src={row.avatarName} alt='avatar' />
                                            </TableCell>
                                            <TableCell align="left">{row.fullName}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.roleName}</TableCell>
                                            <TableCell align="left" style={{ color: changeColor(row.status) }}>{row.status}</TableCell>
                                            <TableCell align="left">
                                                <div>
                                                    <Button
                                                        id="demo-customized-button"
                                                        aria-controls={open ? 'demo-customized-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        variant="contained"
                                                        disableElevation
                                                        onClick={(event) => handleClickMenu(event, row.userId, row.status, row.roleName)}
                                                        endIcon={<KeyboardArrowDownIcon />}
                                                    >
                                                        Options
                                                    </Button>
                                                    <StyledMenu
                                                        id="demo-customized-menu"
                                                        MenuListProps={{
                                                            'aria-labelledby': 'demo-customized-button',
                                                        }}
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        PaperProps={{
                                                            style: {
                                                                boxShadow: 'none',
                                                                border: '1px solid #000',
                                                            }
                                                        }}
                                                    >
                                                        {userStatus === "Active"
                                                            ? (<MenuItem onClick={() => updateStatus()} disableRipple>
                                                                <ClearSharpIcon />
                                                                DeActive Account
                                                            </MenuItem>)
                                                            : (<MenuItem onClick={() => updateStatus()} disableRipple>
                                                                <ClearSharpIcon />
                                                                Active Account
                                                            </MenuItem>)}
                                                        <Divider sx={{ my: 0.5 }} />
                                                        {userRole === "User"
                                                            ? (<MenuItem onClick={() => updateRole('Cooker')} disableRipple>
                                                                <EditIcon />
                                                                Change to Cooker
                                                            </MenuItem>)
                                                            : (<MenuItem onClick={() => updateRole('User')} disableRipple>
                                                                <EditIcon />
                                                                Change to User
                                                            </MenuItem>)}
                                                    </StyledMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 25, 50]}
                        component="div"
                        count={userList.users.totalData}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </div >)
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
                    User List
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Manage user accounts
                </Typography>
            </Container>
            {content}
        </Fragment>
    )
}
