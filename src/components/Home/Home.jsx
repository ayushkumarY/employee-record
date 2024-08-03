import React, { useEffect, useState } from 'react';
import Table from '../Table/Table';
import axios from 'axios';
import { employee_edit } from '../../schemas';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Tooltip from '@mui/material/Tooltip';
import Popup from 'reactjs-popup';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [viewPopup, setViewPopup] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [open, setOpen] = useState(false);
    const [idEdit, setIdEdit] = useState(null);
    const [country, setCountry] = useState([]);

    const handleOpen = async (id) => {
        setOpen(true);
        setIdEdit(id);

        try {
            const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
            const employeeData = response.data;

            // Prefill form with the employee data
            formik.setValues({
                name: employeeData.name,
                emailId: employeeData.emailId,
                mobile: employeeData.mobile,
                state: employeeData.state,
                country: employeeData.country,
                district: employeeData.district,
            });
        } catch (error) {
            console.error('Failed to fetch employee data', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm(); // Reset form when closing the modal
    };

    const initialValues = {
        name: '',
        emailId: '',
        mobile: '',
        state: '',
        country: '',
        district: '',
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
    };

    const employeesData = async () => {
        try {
            const res = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee${search ? `/${search}` : ''}`);
            setData(Array.isArray(res.data) ? res.data : [res.data]);
        } catch (error) {
            console.error("Failed to fetch employee data", error);
        }
    };

    const getCountry = async () => {
        try {
            const res = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country');
            setCountry(res.data);
        } catch (error) {
            console.error("Failed to fetch country data", error);
        }
    };

    useEffect(() => {
        employeesData();
        getCountry();
    }, [search]);

    const handleChangeSearch = (e) => {
        setSearch(e.target.value.trim());
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
            toast.success('Deletion Successful', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            employeesData();
        } catch (error) {
            toast.error('Deletion Failed', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
            });
            employeesData();
            console.error("Failed to delete employee", error);
        }
    };

    const columns = [
        { name: 'Sr. No.', selector: (row, index) => index + 1, maxWidth: '90px' },
        { name: 'Id', selector: (row) => row.id, maxWidth: '90px' },
        { name: 'Photo', selector: (row) => <img src={row.avatar} height="75px" width="75px" alt="Avatar" />, maxWidth: '130px' },
        { name: 'Name', selector: (row) => row.name },
        { name: 'Email Id', selector: (row) => row.emailId },
        { name: 'Mobile No.', selector: (row) => row.mobile },
        {
            name: 'Country',
            selector: (row) => row.country.label,
            sortable: true,
            reorder: true
        },
        { name: 'State', selector: (row) => row.state.label },
        { name: 'District', selector: (row) => row.district.label },
        {
            name: 'Actions',
            selector: (row) => (
                <div>
                    <Tooltip title="Edit">
                        <IconButton aria-label="edit" size="large" onClick={() => handleOpen(row.id)}>
                            <BorderColorIcon sx={{ color: '#1a237e' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={() => {
                                setViewPopup(true);
                            }}
                        >
                            <DeleteIcon sx={{ color: '#1a237e' }} />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const closePopup = () => {
        setViewPopup(false);
        setSelectedEmployee(null);
    };

    const confirmDelete = () => {
        if (selectedEmployee) {
            deleteEmployee(selectedEmployee);
            closePopup();
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: employee_edit,
        onSubmit: async (values) => {
            try {
                const formData = {
                    'name': values.name,
                    'emailId': values.emailId,
                    'mobile': values.mobile,
                    'state': values.state,
                    'country': values.country,
                    'district': values.district,
                }
                console.log(formData)
                console.log("edit api called");

                await axios.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${idEdit}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Ensure the request is treated as multipart
                        'Accept': 'application/json', // Specifies that the client expects a JSON response
                    },
                });
                employeesData();
                handleClose();
                toast.success('Employee Updated', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                console.error("Failed to update employee", error);
                toast.error('Updation Failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
                employeesData();
                handleClose();
            }
        },
    });

    return (
        <main className='w-full h-screen overflow-y-auto flex flex-col gap-5'>
            <div className='min-h-[50px] text-white text-[19px] flex items-center justify-between px-5 py-3' style={{ background: 'linear-gradient(90deg, rgba(8,57,123,1) 36%, rgba(3,15,37,1) 100%)' }}>
                <span className='uppercase font-semibold tracking-widest'>
                    Home
                </span>
                <form className="flex items-center justify-end gap-x-2 min-w-[370px]">
                    <div className="flex items-center rounded-3xl overflow-auto">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Search by Id..."
                            className="outline-none overflow-auto px-3 py-[4px] min-w-[250px] max-w-full text-black text-[15px]"
                            onChange={handleChangeSearch}
                            autoComplete="off"
                        />
                    </div>
                    <svg width="25" color="white" height="25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z"></path>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </form>
            </div>
            <div className="w-full">
                {/* <div className="flex items-center justify-end">
                    <form className="flex items-center justify-end gap-x-1 min-w-[370px] py-2 mb-4 mt-4 bg-[#0f4bab] rounded-l-3xl pr-3">
                        <div className="flex items-center rounded-3xl overflow-auto">
                            <input
                                type="text"
                                id="search"
                                name="search"
                                placeholder="search by Id..."
                                className="outline-none overflow-auto px-3 py-1 min-w-[250px] max-w-full"
                                onChange={handleChangeSearch}
                                autoComplete="off"
                            />
                        </div>
                        <svg width="25" color="white" height="25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z"></path>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </form>
                </div> */}
                <div className="px-4">
                    <Table columns={columns} data={data} />
                </div>
                <Popup
                    open={viewPopup}
                    modal
                    onClose={closePopup}
                    closeOnDocumentClick={false}
                    // nested
                    overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <div className="bg-white px-10 py-7 rounded-md flex flex-col gap-y-5 w-[400px]" style={{ boxShadow: '2px -2px 26px -8px rgba(0,0,0,0.75)' }}>
                        <div className="flex flex-col gap-y-2">
                            <h2 className="text-xl font-semibold tracking-wide">Confirm deletion</h2>
                            <span className="tracking-wide text-lg">
                                Are you sure you would like to delete this profile from the database? This action cannot be undone.
                            </span>
                        </div>
                        <div className="flex items-center gap-x-10 w-full text-lg tracking-wide">
                            <button
                                className="bg-[#f1f2f3] px-3 py-1 rounded-md text-[#393d46] hover:bg-[#d3d7db] w-full"
                                onClick={closePopup}
                            >
                                Cancel
                            </button>
                            <button className="bg-red-600 px-3 py-1 rounded-md text-white hover:bg-red-500 w-full" onClick={confirmDelete}>
                                Yes
                            </button>
                        </div>
                    </div>
                </Popup >
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex items-start justify-center gap-x-10">
                                <div className="flex flex-col gap-y-5">
                                    <TextField
                                        id="outlined-required"
                                        label="Name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        autoComplete="off"
                                        value={formik.values.name}
                                    />
                                    {formik.errors.name && formik.touched.name && (
                                        <p className="text-red-500 mb-2">{formik.errors.name}</p>
                                    )}
                                    <TextField
                                        id="outlined-required"
                                        label="Email Id"
                                        name="emailId"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Email"
                                        autoComplete="off"
                                        value={formik.values.emailId}
                                    />
                                    {formik.errors.emailId && formik.touched.emailId && (
                                        <p className="text-red-500 mb-2">{formik.errors.emailId}</p>
                                    )}
                                    <TextField
                                        id="outlined-required"
                                        label="Phone Number"
                                        name="mobile"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Phone Number"
                                        autoComplete="off"
                                        value={formik.values.mobile}
                                    />
                                    {formik.errors.mobile && formik.touched.mobile && (
                                        <p className="text-red-500 mb-2">{formik.errors.mobile}</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-y-5">
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Country"
                                        name="country"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Select Country"
                                        autoComplete="off"
                                        value={formik.values.country}
                                    >
                                        {country.map((option) => (
                                            <MenuItem key={option.value} value={option.country}>
                                                {option.country}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    {formik.errors.country && formik.touched.country && (
                                        <p className="text-red-500 mb-2">{formik.errors.country}</p>
                                    )}
                                    <TextField
                                        id="outlined-required"
                                        label="State"
                                        name="state"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter State"
                                        autoComplete="off"
                                        value={formik.values.state}
                                    />
                                    {formik.errors.state && formik.touched.state && (
                                        <p className="text-red-500 mb-2">{formik.errors.state}</p>
                                    )}
                                    <TextField
                                        id="outlined-required"
                                        label="District"
                                        name="district"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter District"
                                        autoComplete="off"
                                        value={formik.values.district}
                                    />
                                    {formik.errors.district && formik.touched.district && (
                                        <p className="text-red-500 mb-2">{formik.errors.district}</p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-end gap-x-4 mt-5">
                                <Button onClick={handleClose} variant="contained">
                                    Close
                                </Button>
                                <Button type="submit" variant="contained">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div >
        </main>

    );
}

export default Home;
