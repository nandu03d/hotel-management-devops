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

function DriverDialog({ open, onClose, onSave, selectedDriver }) {

    const initialState = {
        employeeId: "",
        fullName: "",
        phone: "",
        email: "",
        licenseNumber: "",
        experience: "",
        availability: true,
        status: "AVAILABLE"
    };

    const [driver, setDriver] = useState(initialState);

    useEffect(() => {

        if (open) {

            if (selectedDriver) {

                setDriver(selectedDriver);

            } else {

                setDriver(initialState);

            }

        }

    }, [open, selectedDriver]);

    const handleChange = (event) => {

        const { name, value, checked, type } = event.target;

        setDriver((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSave = () => {
        onSave(driver);
    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>
                {selectedDriver ? "Edit Driver" : "Add Driver"}
            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Employee ID"
                            name="employeeId"
                            value={driver.employeeId}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={driver.fullName}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={driver.phone}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={driver.email}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="License Number"
                            name="licenseNumber"
                            value={driver.licenseNumber}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Experience"
                            name="experience"
                            value={driver.experience}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            name="status"
                            value={driver.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="AVAILABLE">
                                AVAILABLE
                            </MenuItem>

                            <MenuItem value="ON_DELIVERY">
                                ON_DELIVERY
                            </MenuItem>

                            <MenuItem value="OFF_DUTY">
                                OFF_DUTY
                            </MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={driver.availability}
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

export default DriverDialog;