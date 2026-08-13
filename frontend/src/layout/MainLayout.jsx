import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
    return (
        <Box sx={{ display: "flex" }}>
            <Navbar />
            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    backgroundColor: "#f4f6f8",
                    minHeight: "100vh",
                    overflowX: "hidden"
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default MainLayout;