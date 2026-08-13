import { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert
} from "@mui/material";

import {
    People,
    LocalShipping,
    Inventory,
    AssignmentTurnedIn
} from "@mui/icons-material";

import { getDashboardData } from "../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await getDashboardData();
            setDashboard(response.data);
        } catch (err) {
            setError("Unable to load dashboard data.");
            console.error(err);
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
            <Typography variant="h4" fontWeight="bold" mb={3}>
                Dashboard
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <People color="primary" fontSize="large" />
                            <Typography variant="h6">
                                Total Drivers
                            </Typography>
                            <Typography variant="h4">
                                {dashboard.totalDrivers}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <People color="success" fontSize="large" />
                            <Typography variant="h6">
                                Available Drivers
                            </Typography>
                            <Typography variant="h4">
                                {dashboard.availableDrivers}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <LocalShipping color="primary" fontSize="large" />
                            <Typography variant="h6">
                                Total Vehicles
                            </Typography>
                            <Typography variant="h4">
                                {dashboard.totalVehicles}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Inventory color="success" fontSize="large" />
                            <Typography variant="h6">
                                Available Vehicles
                            </Typography>
                            <Typography variant="h4">
                                {dashboard.availableVehicles}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Inventory color="warning" fontSize="large" />
                            <Typography variant="h6">
                                Total Deliveries
                            </Typography>
                            <Typography variant="h4">
                                {dashboard.totalDeliveries}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <AssignmentTurnedIn color="info" fontSize="large" />
                            <Typography variant="h6">
                                Pending Deliveries
                            </Typography>
                            <Typography variant="h4">
                                {dashboard.pendingDeliveries}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <AssignmentTurnedIn color="success" fontSize="large" />
                            <Typography variant="h6">
                                Completed Deliveries
                            </Typography>
                            <Typography variant="h4">
                                {dashboard.completedDeliveries}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <AssignmentTurnedIn color="error" fontSize="large" />
                            <Typography variant="h6">
                                High Priority
                            </Typography>
                            <Typography variant="h4">
                                {dashboard.highPriorityDeliveries}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </>
    );
}

export default Dashboard;