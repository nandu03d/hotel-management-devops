import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import { Link } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />

            <List>

                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton component={Link} to="/drivers">
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drivers" />
                </ListItemButton>

                <ListItemButton component={Link} to="/vehicles">
                    <ListItemIcon>
                        <LocalShippingIcon />
                    </ListItemIcon>
                    <ListItemText primary="Vehicles" />
                </ListItemButton>

                <ListItemButton component={Link} to="/deliveries">
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Deliveries" />
                </ListItemButton>

                <ListItemButton component={Link} to="/ai">
                    <ListItemIcon>
                        <SmartToyIcon />
                    </ListItemIcon>
                    <ListItemText primary="AI Assistant" />
                </ListItemButton>

            </List>
        </Drawer>
    );
}

export default Sidebar;