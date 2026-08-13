import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Box
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function Navbar() {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: "calc(100% - 240px)",
                ml: "240px",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>

                <LocalShippingIcon sx={{ mr: 2 }} />

                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold",
                    }}
                >
                    AI Smart Logistics Management System
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Typography>
                        Admin
                    </Typography>

                    <Avatar>
                        A
                    </Avatar>
                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;