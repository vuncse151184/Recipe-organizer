import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'
import {
    addIngredient,
    getAllIngredient,
    removeIngredient
} from '../../redux/apiThunk/ingredientThunk'
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
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
        id: 'ingredientName',
        label: 'Ingredient Name',
    },
    {
        id: 'measure',
        label: 'Measure',
    },
    {
        id: 'carb',
        label: 'Carbohydrate',
    },
    {
        id: 'fat',
        label: 'Fat',
    },
    {
        id: 'protein',
        label: 'Protein',
    },
    {
        id: 'calories',
        label: 'Calories',
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

export default function IngredientList() {
    const dispatch = useDispatch()
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const [id, setId] = useState(); //selected ingredient id
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [showCreate, setShowCreate] = useState(false);
    const [value, setValue] = useState({
        ingredientId: "",
        ingredientName: "",
        measure: "",
        carbohydrate: "",
        protein: "",
        fat: ""
    });
    const [reload, setReload] = useState(false) //recall api

    //get all ingredient
    useEffect(() => {
        dispatch(getAllIngredient({ movePage: page + 1, items: rowsPerPage }))
    }, [dispatch, reload, rowsPerPage, page])
    const ingredientList = useSelector((state) => state.ingredient.ingredients)
    const status = useSelector((state) => state.ingredient.loading)

    //change page
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    //show menu update, delete
    const handleClickMenu = (event, id) => {
        event.preventDefault()
        setId(id)
        // 
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //modal create
    const handleShowCreate = () => setShowCreate(true);
    const handleCloseModalCreate = () => {
        setValue({
            ...value,
            ingredientName: "",
            measure: "",
            carbohydrate: "",
            protein: "",
            fat: ""
        })
        setShowCreate(false);
    }

    //add new ingredient
    const handleSubmitCreate = async (e) => {
        e.preventDefault();
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
                await dispatch(addIngredient({ data: JSON.stringify(value) })).then((result) => {
                    result.payload.status === 1 ? toast.success(result.payload.message) : toast.error(result.payload)
                    setReload(!reload)
                    setValue({
                        ...value,
                        ingredientName: "",
                        measure: "",
                        carbohydrate: "",
                        protein: "",
                        fat: ""
                    })
                }).catch((err) => {
                    console.log(err);
                });
            } else {
            }
        });

        handleCloseModalCreate()
    }

    //delete ingredient
    const deleteIngredient = async () => {
        handleClose()
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
                await dispatch(removeIngredient({ id: id })).then((result) => {
                    result.payload.status === 1 ? toast.success(result.payload.message) : toast.error(result.payload)
                    setReload(!reload)
                }).catch((err) => {
                    console.log(err);
                });
            } else {
            }
        });
        handleClose();
    };

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
    } else if (status === 'fail' || (ingredientList.data && ingredientList.data.length === 0)) {
        content = <div style={{ paddingLeft: "45%%" }}> No data</div>;
    } else {
        content = (
            <Fragment>
                <Button variant="outlined" onClick={handleShowCreate} style={{ margin: '0 15px' }}>
                    Add More Ingredient
                </Button>
                <Modal show={showCreate} onHide={handleCloseModalCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new Ingredient</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={e => handleSubmitCreate(e)}>
                        <Modal.Body>
                            <div class="form-group">
                                <label htmlFor="exampleInputEmail1">Ingredient name<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input type="text" class="form-control" id="formName" placeholder="Enter name"
                                    value={value.ingredientName} onChange={e => setValue({ ...value, ingredientName: e.target.value })} required />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Measure<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input type="text" class="form-control" id="formMeasure" placeholder="Enter measure"
                                    value={value.measure} onChange={e => setValue({ ...value, measure: e.target.value })} required />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Carbohydrate<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input type="number" class="form-control" id="formCarb" placeholder="Enter carbohydrate"
                                    value={value.carbohydrate} onChange={e => setValue({ ...value, carbohydrate: e.target.value })} min={0} step={0.1} required />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Protein<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input type="number" class="form-control" id="formProtein" placeholder="Enter protein"
                                    value={value.protein} onChange={e => setValue({ ...value, protein: e.target.value })} min={0} step={0.1} required />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Fat<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input type="number" class="form-control" id="formFat" placeholder="Enter fat"
                                    value={value.fat} onChange={e => setValue({ ...value, fat: e.target.value })} min={0} step={0.1} required />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="contained" style={{ backgroundColor: '#6c757d' }} onClick={handleCloseModalCreate}>
                                Close
                            </Button>
                            <Button variant="contained" type='submit' >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <div className="container ingredient-list">
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                >
                                    <EnhancedTableHead />
                                    <TableBody>
                                        {ingredientList.data?.map((row, index) => {
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
                                                        {(index + 1) + ingredientList.itemPerPage * (ingredientList.moveToPage - 1)}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="normal"
                                                    >
                                                        {row.ingredientId}
                                                    </TableCell>
                                                    <TableCell align="left">{row.ingredientName}</TableCell>
                                                    <TableCell align="left">{row.measure}</TableCell>
                                                    <TableCell align="left">{row.carbohydrate}</TableCell>
                                                    <TableCell align="left">{row.fat}</TableCell>
                                                    <TableCell align="left">{row.protein}</TableCell>
                                                    <TableCell align="left">{row.calories}</TableCell>
                                                    <TableCell align="center">
                                                        <div>
                                                            <Button
                                                                id="demo-customized-button"
                                                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                                                aria-haspopup="true"
                                                                aria-expanded={open ? 'true' : undefined}
                                                                variant="contained"
                                                                disableElevation
                                                                onClick={(event) => handleClickMenu(event, row.ingredientId)}
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
                                                                        border: '1px solid #000'
                                                                    }
                                                                }}
                                                            >
                                                                {/* <MenuItem onClick={(e) => handleShowUpdate(e)} disableRipple>
                                                                        <EditIcon />
                                                                        Edit
                                                                    </MenuItem> */}
                                                                <Link to={`/ingredient-detail/${id}`}>
                                                                    <MenuItem disableRipple>
                                                                        <EditIcon />
                                                                        Edit
                                                                    </MenuItem>
                                                                </Link>
                                                                <MenuItem onClick={() => deleteIngredient()} disableRipple>
                                                                    <DeleteIcon />
                                                                    Delete
                                                                </MenuItem>
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
                                rowsPerPageOptions={[10, 25, 50]}
                                component="div"
                                count={ingredientList.totalData}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </div >
            </Fragment>)
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
                    Ingredient List
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Manage Ingredient in database
                </Typography>
            </Container>

            <div className='container form-create'>
                {content}
            </div>
        </Fragment>
    )
}
