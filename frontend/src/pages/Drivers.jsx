import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
    IconButton,
    Snackbar
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";

import {
    getAllDrivers,
    createDriver,
    updateDriver,
    deleteDriver
} from "../services/driverService";

import DriverDialog from "../components/DriverDialog";

function Drivers() {

    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [driverToDelete, setDriverToDelete] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        loadDrivers();
    }, []);

    const loadDrivers = async () => {

        try {

            const response = await getAllDrivers();

            setDrivers(response.data);

        } catch (err) {

            console.error(err);

            setError("Unable to load drivers.");

        } finally {

            setLoading(false);

        }

    };

    const handleSaveDriver = async (driver) => {

        try {

            if (selectedDriver) {

                await updateDriver(selectedDriver.id, driver);

                setSnackbarMessage("Driver updated successfully!");

            } else {

                await createDriver(driver);

                setSnackbarMessage("Driver added successfully!");

            }

            setOpenDialog(false);
            setSelectedDriver(null);

           await loadDrivers();

            setSnackbarOpen(true);

        } catch (err) {

            console.error(err);

            alert("Unable to save driver.");

        }

    };

    const handleDeleteDriver = async () => {

        try {

            await deleteDriver(driverToDelete.id);

            setDeleteDialogOpen(false);
            setDriverToDelete(null);

            await loadDrivers();
            setSnackbarMessage("Driver deleted successfully!");
            setSnackbarOpen(true);

        } catch (err) {

            console.error(err);

            alert("Unable to delete driver.");

        }

    };

    if (loading) {

        return <CircularProgress />;

    }

    if (error) {

        return <Alert severity="error">{error}</Alert>;

    }

    return (

        <>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >
                Driver Management
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mb: 3 }}
                onClick={() => {
                    setSelectedDriver(null);
                    setOpenDialog(true);
                }}
            >
                Add Driver
            </Button>

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell><b>Employee ID</b></TableCell>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Phone</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Experience</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                            <TableCell><b>Available</b></TableCell>
                            <TableCell align="center"><b>Actions</b></TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            drivers.map((driver) => (

                                <TableRow key={driver.id} hover>

                                    <TableCell>{driver.employeeId}</TableCell>

                                    <TableCell>{driver.fullName}</TableCell>

                                    <TableCell>{driver.phone}</TableCell>

                                    <TableCell>{driver.email}</TableCell>

                                    <TableCell>{driver.experience}</TableCell>

                                    <TableCell>{driver.status}</TableCell>

                                    <TableCell>

                                        {driver.availability ? "Yes" : "No"}

                                    </TableCell>

                                    <TableCell align="center">

                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                setSelectedDriver(driver);
                                                setOpenDialog(true);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() => {
                                                setDriverToDelete(driver);
                                                setDeleteDialogOpen(true);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

            <DriverDialog
                open={openDialog}
                selectedDriver={selectedDriver}
                onClose={() => {
                    setOpenDialog(false);
                    setSelectedDriver(null);
                }}
                onSave={handleSaveDriver}
            />

            <Dialog
                open={deleteDialogOpen}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setDriverToDelete(null);
                }}
            >

                <DialogTitle>
                    Delete Driver
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>
                        Are you sure you want to delete this driver?
                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => {
                            setDeleteDialogOpen(false);
                            setDriverToDelete(null);
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleDeleteDriver}
                    >
                        Delete
                    </Button>

                </DialogActions>

            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
                <MuiAlert
                    severity="success"
                    elevation={6}
                    variant="filled"
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

        </>

    );

}

export default Drivers;