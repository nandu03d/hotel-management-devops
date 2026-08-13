import { useState, useEffect } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    FormControlLabel,
    Switch
} from "@mui/material";

function VehicleDialog({
                           open,
                           onClose,
                           onSave,
                           selectedVehicle
                       }) {

    const initialState = {
        vehicleNumber: "",
        registrationNumber: "",
        vehicleType: "TRUCK",
        fuelType: "DIESEL",
        capacityKg: "",
        availability: true,
        status: "AVAILABLE"
    };

    const [vehicle, setVehicle] = useState(initialState);

    useEffect(() => {

        if (open) {

            if (selectedVehicle) {

                setVehicle(selectedVehicle);

            } else {

                setVehicle(initialState);

            }

        }

    }, [open, selectedVehicle]);

    const handleChange = (event) => {

        const { name, value, checked, type } = event.target;

        setVehicle((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };

    const handleSave = () => {

        onSave(vehicle);

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                {selectedVehicle ? "Edit Vehicle" : "Add Vehicle"}

            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Vehicle Number"
                            name="vehicleNumber"
                            value={vehicle.vehicleNumber}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Registration Number"
                            name="registrationNumber"
                            value={vehicle.registrationNumber}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Vehicle Type"
                            name="vehicleType"
                            value={vehicle.vehicleType}
                            onChange={handleChange}
                        >
                            <MenuItem value="TRUCK">TRUCK</MenuItem>
                            <MenuItem value="VAN">VAN</MenuItem>
                            <MenuItem value="BIKE">BIKE</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Fuel Type"
                            name="fuelType"
                            value={vehicle.fuelType}
                            onChange={handleChange}
                        >
                            <MenuItem value="DIESEL">DIESEL</MenuItem>
                            <MenuItem value="PETROL">PETROL</MenuItem>
                            <MenuItem value="ELECTRIC">ELECTRIC</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Capacity (Kg)"
                            name="capacityKg"
                            value={vehicle.capacityKg}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            name="status"
                            value={vehicle.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="AVAILABLE">
                                AVAILABLE
                            </MenuItem>

                            <MenuItem value="ON_DELIVERY">
                                ON_DELIVERY
                            </MenuItem>

                            <MenuItem value="MAINTENANCE">
                                MAINTENANCE
                            </MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={vehicle.availability}
                                    onChange={handleChange}
                                    name="availability"
                                />
                            }
                            label="Available"
                        />
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

export default VehicleDialog;