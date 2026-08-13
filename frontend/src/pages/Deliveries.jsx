import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Button,
    Chip,
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

import DeliveryDialog from "../components/DeliveryDialog";

import {
    getAllDeliveries,
    createDelivery,
    updateDelivery,
    deleteDelivery
} from "../services/deliveryService";

import { getAllDrivers } from "../services/driverService";
import { getAllVehicles } from "../services/vehicleService";

function Deliveries() {

    const [deliveries, setDeliveries] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState(null);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deliveryToDelete, setDeliveryToDelete] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const [
                deliveriesResponse,
                driversResponse,
                vehiclesResponse
            ] = await Promise.all([
                getAllDeliveries(),
                getAllDrivers(),
                getAllVehicles()
            ]);

            setDeliveries(deliveriesResponse.data);
            setDrivers(driversResponse.data);
            setVehicles(vehiclesResponse.data);

        } catch (err) {

            console.error(err);

            setError("Unable to load deliveries.");

        } finally {

            setLoading(false);

        }

    };

    const handleSaveDelivery = async (delivery) => {

        try {

            if (selectedDelivery) {

                await updateDelivery(selectedDelivery.id, delivery);

                setSnackbarMessage("Delivery updated successfully!");

            } else {

                await createDelivery(delivery);

                setSnackbarMessage("Delivery added successfully!");

            }

            setOpenDialog(false);
            setSelectedDelivery(null);

            await loadData();

            setSnackbarOpen(true);

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to save delivery."
            );

        }

    };

    const handleDeleteDelivery = async () => {

        try {

            await deleteDelivery(deliveryToDelete.id);

            setDeleteDialogOpen(false);
            setDeliveryToDelete(null);

            await loadData();

            setSnackbarMessage("Delivery deleted successfully!");

            setSnackbarOpen(true);

        } catch (err) {

            console.error(err);

            alert("Unable to delete delivery.");

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
                Delivery Management
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mb: 3 }}
                onClick={() => {
                    setSelectedDelivery(null);
                    setOpenDialog(true);
                }}
            >
                Add Delivery
            </Button>

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell><b>Pickup</b></TableCell>
                            <TableCell><b>Drop</b></TableCell>
                            <TableCell><b>Weight</b></TableCell>
                            <TableCell><b>Priority</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                            <TableCell><b>Driver</b></TableCell>
                            <TableCell><b>Vehicle</b></TableCell>
                            <TableCell align="center"><b>Actions</b></TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {deliveries.map((delivery) => (

                            <TableRow key={delivery.id} hover>

                                <TableCell>{delivery.pickupLocation}</TableCell>
                                <TableCell>{delivery.dropLocation}</TableCell>
                                <TableCell>{delivery.packageWeight}</TableCell>
                                <TableCell><TableCell>
                                    <Chip
                                        label={delivery.priority}
                                        color={
                                            delivery.priority === "HIGH"
                                                ? "error"
                                                : delivery.priority === "MEDIUM"
                                                    ? "warning"
                                                    : "success"
                                        }
                                        size="small"
                                    />
                                </TableCell></TableCell>
                                <TableCell> <Chip
                                    label={delivery.status}
                                    color={
                                        delivery.status === "DELIVERED"
                                            ? "success"
                                            : delivery.status === "IN_PROGRESS"
                                                ? "info"
                                                : "warning"
                                    }
                                    size="small"
                                /></TableCell>
                                <TableCell>{delivery.driverName}</TableCell>
                                <TableCell>{delivery.vehicleNumber}</TableCell>

                                <TableCell align="center">

                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            setSelectedDelivery(delivery);
                                            setOpenDialog(true);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => {
                                            setDeliveryToDelete(delivery);
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

            <DeliveryDialog
                open={openDialog}
                selectedDelivery={selectedDelivery}
                drivers={drivers}
                vehicles={vehicles}
                onClose={() => {
                    setOpenDialog(false);
                    setSelectedDelivery(null);
                }}
                onSave={handleSaveDelivery}
            />

            <Dialog
                open={deleteDialogOpen}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setDeliveryToDelete(null);
                }}
            >

                <DialogTitle>
                    Delete Delivery
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>
                        Are you sure you want to delete this delivery?
                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => {
                            setDeleteDialogOpen(false);
                            setDeliveryToDelete(null);
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleDeleteDelivery}
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

export default Deliveries;