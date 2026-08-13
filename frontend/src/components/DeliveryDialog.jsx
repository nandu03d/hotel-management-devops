import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem
} from "@mui/material";

function DeliveryDialog({
                            open,
                            onClose,
                            onSave,
                            selectedDelivery,
                            drivers,
                            vehicles
                        }) {

    const initialState = {
        pickupLocation: "",
        dropLocation: "",
        packageWeight: "",
        priority: "MEDIUM",
        status: "PENDING",
        driverId: "",
        vehicleId: ""
    };

    const [delivery, setDelivery] = useState(initialState);

    useEffect(() => {

        if (open) {

            if (selectedDelivery) {

                setDelivery(selectedDelivery);

            } else {

                setDelivery(initialState);

            }

        }

    }, [open, selectedDelivery]);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setDelivery((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSave = () => {

        onSave({
            ...delivery,
            driverId: Number(delivery.driverId),
            vehicleId: Number(delivery.vehicleId),
            packageWeight: Number(delivery.packageWeight)
        });

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>
                {selectedDelivery ? "Edit Delivery" : "Add Delivery"}
            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Pickup Location"
                            name="pickupLocation"
                            value={delivery.pickupLocation}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Drop Location"
                            name="dropLocation"
                            value={delivery.dropLocation}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Package Weight"
                            name="packageWeight"
                            value={delivery.packageWeight}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Priority"
                            name="priority"
                            value={delivery.priority}
                            onChange={handleChange}
                        >
                            <MenuItem value="LOW">LOW</MenuItem>
                            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                            <MenuItem value="HIGH">HIGH</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            name="status"
                            value={delivery.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="PENDING">PENDING</MenuItem>
                            <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                            <MenuItem value="DELIVERED">DELIVERED</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Driver"
                            name="driverId"
                            value={delivery.driverId}
                            onChange={handleChange}
                        >
                            {drivers.map(driver => (
                                <MenuItem
                                    key={driver.id}
                                    value={driver.id}
                                >
                                    {driver.fullName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Vehicle"
                            name="vehicleId"
                            value={delivery.vehicleId}
                            onChange={handleChange}
                        >
                            {vehicles.map(vehicle => (
                                <MenuItem
                                    key={vehicle.id}
                                    value={vehicle.id}
                                >
                                    {vehicle.vehicleNumber}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default DeliveryDialog;