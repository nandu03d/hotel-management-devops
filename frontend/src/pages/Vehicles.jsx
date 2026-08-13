import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
    Button
} from "@mui/material";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
    getAllVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle
} from "../services/vehicleService";

import VehicleDialog from "../components/VehicleDialog";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [vehicleToDelete, setVehicleToDelete] = useState(null);

    useEffect(() => {
        loadVehicles();
    }, []);

    const handleSaveVehicle = async (vehicle) => {

        try {

            if (selectedVehicle) {

                // EDIT
                await updateVehicle(selectedVehicle.id, vehicle);

                setSnackbarMessage("Vehicle updated successfully!");

            } else {

                // ADD
                await createVehicle(vehicle);

                setSnackbarMessage("Vehicle added successfully!");

            }

            setOpenDialog(false);
            setSelectedVehicle(null);

            await loadVehicles();

            setSnackbarOpen(true);

        } catch (err) {

            console.error("Full Error:", err);
            console.error("Status:", err.response?.status);
            console.error("Response:", err.response?.data);

            alert(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to save vehicle."
            );

        }

    };
    const handleDeleteVehicle = async () => {

        try {

            await deleteVehicle(vehicleToDelete.id);

            setDeleteDialogOpen(false);
            setVehicleToDelete(null);

            await loadVehicles();

            setSnackbarMessage("Vehicle deleted successfully!");

            setSnackbarOpen(true);

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to delete vehicle."
            );

        }

    };


    const loadVehicles = async () => {

        try {

            const response = await getAllVehicles();

            setVehicles(response.data);

        } catch (err) {

            console.error(err);

            setError("Unable to load vehicles.");

        } finally {

            setLoading(false);

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
                Vehicle Management
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mb: 3 }}
                onClick={() => {
                    setSelectedVehicle(null);
                    setOpenDialog(true);
                }}
            >
                Add Vehicle
            </Button>

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell><b>Vehicle Number</b></TableCell>
                            <TableCell><b>Registration</b></TableCell>
                            <TableCell><b>Type</b></TableCell>
                            <TableCell><b>Fuel</b></TableCell>
                            <TableCell><b>Capacity</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                            <TableCell><b>Available</b></TableCell>
                            <TableCell align="center">
                                <b>Actions</b>
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {vehicles.map((vehicle) => (

                            <TableRow key={vehicle.id} hover>

                                <TableCell>{vehicle.vehicleNumber}</TableCell>

                                <TableCell>{vehicle.registrationNumber}</TableCell>

                                <TableCell>{vehicle.vehicleType}</TableCell>

                                <TableCell>{vehicle.fuelType}</TableCell>

                                <TableCell>{vehicle.capacityKg}</TableCell>

                                <TableCell>{vehicle.status}</TableCell>

                                <TableCell>
                                    {vehicle.availability ? "Yes" : "No"}
                                </TableCell>
                                <TableCell align="center">

                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            setSelectedVehicle(vehicle);
                                            setOpenDialog(true);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => {
                                            setVehicleToDelete(vehicle);
                                            setDeleteDialogOpen(true);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                </TableCell>
                            </TableRow>

                        ))}

                    </TableBody>

                </Table>
            </TableContainer>

            <VehicleDialog
                open={openDialog}
                selectedVehicle={selectedVehicle}
                onClose={() => {
                    setOpenDialog(false);
                    setSelectedVehicle(null);
                }}
                onSave={handleSaveVehicle}
            />

            <Dialog
                open={deleteDialogOpen}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setVehicleToDelete(null);
                }}
            >

                <DialogTitle>
                    Delete Vehicle
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>
                        Are you sure you want to delete this vehicle?
                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => {
                            setDeleteDialogOpen(false);
                            setVehicleToDelete(null);
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleDeleteVehicle}
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

export default Vehicles;