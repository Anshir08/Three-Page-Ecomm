import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Box,
    Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const user = {};
    const cartItems = [];

    return (
        <AppBar position="sticky" color="primary" width="100%">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography
                    variant="h6"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    MiniShop
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <Button
                        color="inherit"
                        onClick={() => navigate("/products")}
                    >
                        Products
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/orders")}>
                        Orders
                    </Button>

                    <IconButton
                        color="inherit"
                        onClick={() => navigate("/cart")}
                    >
                        <Badge badgeContent={cartItems.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <Button
                        color="inherit"
                        onClick={() => navigate("/profile")}
                    >
                        My Account
                    </Button>
                    {/* {!user ? (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate('/profile')}>My Account</Button>
          )} */}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
