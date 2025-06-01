import React, { useEffect, useState } from "react";
import {
    TextField,
    Grid,
    Paper,
    Typography,
    Button,
    Box,
    Divider,
    Avatar,
} from "@mui/material";

import { Add, Remove } from "@mui/icons-material";
import { createOrder } from "../redux/OrderSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
const CheckoutForm = () => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const subtotal = +(product.price * quantity).toFixed(2);
    const estimatedTax = +(subtotal * 0.08).toFixed(2);
    const total = +(subtotal + estimatedTax).toFixed(2);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        address: "",
        landmark: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        cardHolderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submit");
        let status;
        if (form.cardNumber === "4242424242424242") {
            // Simulate Approved
            status = "approved";
        }

        if (form.cardNumber === "4000000000000002") {
            // Simulate Declined
            status = "declined";
        }

        if (form.cardNumber === "5000000000000000") {
            // Simulate Gateway Error
            status = "gateway_error";
        }
        dispatch(
            createOrder({
                ...form,
                quantity,
                totalAmount: total,
                productId: params.id,
                status,
            })
        );
        navigate(`/product/${params.id}/order`);
    };

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
            });
    }, [params.id]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
                px: 4,
                mt: 2,
                width: "100%",
                maxWidth: "1200px",
                mx: "auto",
            }}
        >
            <Box sx={{ flex: 7 }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    style={{ maxWidth: 700, mx: "auto", mt: 4, boxShadow: 3 }}
                >
                    {/* Contact Section */}
                    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Contact
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="fullName"
                                    label="Full Name"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Delivery Address Section */}
                    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Delivery Address
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            {/* country */}
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="country"
                                    label="Country"
                                    value={form.country}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    value={form.address}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            {/* landmark */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="landmark"
                                    label="Landmark"
                                    value={form.landmark}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="city"
                                    label="City"
                                    value={form.city}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            {/* state */}
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="state"
                                    label="State"
                                    value={form.state}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="postalCode"
                                    label="Postal Code"
                                    value={form.postalCode}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Payment Details Section */}
                    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Payment Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            {/* card holder name */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="cardHolderName"
                                    label="Card Holder Name"
                                    value={form.cardHolderName}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="cardNumber"
                                    label="Card Number"
                                    value={form.cardNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="expiryDate"
                                    label="Expiry Date (MM/YY)"
                                    value={form.expiryDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="cvv"
                                    label="CVV"
                                    value={form.cvv}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mb: 3 }}
                    >
                        Place Order
                    </Button>
                </Box>
            </Box>
            <Box sx={{ flex: 5, mt: 4, position: "sticky", top: 0 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems="flex-start">
                            {/* Image */}
                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center", // vertically center image and text
                                    justifyContent: "space-between",
                                    gap: 20,
                                }}
                            >
                                <Avatar
                                    variant="square"
                                    src={product?.thumbnail}
                                    alt={product?.title}
                                    sx={{ width: 100, height: 100 }}
                                />

                                <Box display="flex" gap={2}>
                                    <Remove
                                        sx={{ cursor: "pointer" }}
                                        onClick={() =>
                                            setQuantity((prev) =>
                                                Math.max(1, prev - 1)
                                            )
                                        }
                                    />
                                    <Typography variant="body1">
                                        {quantity}
                                    </Typography>
                                    <Add
                                        sx={{ cursor: "pointer" }}
                                        onClick={() =>
                                            setQuantity((prev) => prev + 1)
                                        }
                                    />
                                </Box>
                            </Grid>

                            {/* Text Content */}
                            <Grid item xs>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                >
                                    {product?.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ my: 0.5 }}
                                >
                                    {product?.description}
                                </Typography>
                                <Box display="flex" gap={2}>
                                    <Typography variant="body2">
                                        Quantity: <strong>{quantity}</strong>
                                    </Typography>
                                    <Typography variant="body2">
                                        Price:{" "}
                                        <strong>
                                            ${product?.price?.toFixed(2)}
                                        </strong>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography>Subtotal</Typography>
                        <Typography>${subtotal?.toFixed(2)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography>Estimated Tax (8%)</Typography>
                        <Typography>${estimatedTax?.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        fontWeight="bold"
                    >
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6">
                            ${total?.toFixed(2)}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default CheckoutForm;
