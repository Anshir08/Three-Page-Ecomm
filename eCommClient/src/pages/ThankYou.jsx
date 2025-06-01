import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Paper, Grid, Divider } from "@mui/material";
import { getOrder } from "../redux/OrderSlice";
import CorrectIcon from "@mui/icons-material/CheckCircle";
import WrongIcon from "@mui/icons-material/Cancel";
import { useParams } from "react-router-dom";


const ThankYou = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { loading, order } = useSelector((state) => state.order);
    const [product, setProduct] = useState({});

    useEffect(() => {
        dispatch(getOrder(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (!order.product_id) return;
        fetch(`https://dummyjson.com/products/${order.product_id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [order.product_id]);

    if (loading) {
        return (
            <Box
                p={4}
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6">Loading order details...</Typography>
            </Box>
        );
    }

    if (order?.status === "declined" || order?.status === "gateway_error") {
        return (
            <Box
                p={4}
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4">Order Declined
                    <WrongIcon
                        sx={{ ml: 1, width: 32, height: 32, color: "red" }}
                    />
                </Typography>
                <Typography variant="h6">
                    The Payment has been failed
                </Typography>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Thank You for Your Purchase!
                <CorrectIcon
                    sx={{ ml: 1, width: 32, height: 32, color: "green" }}
                />
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
                Your order has been placed successfully.
            </Typography>

            <Paper sx={{ p: 3, my: 4 }} elevation={3}>
                <Typography variant="h6" gutterBottom>
                    Order Confirmation
                </Typography>

                <Typography>
                    <strong>Order Number:</strong> #{order?.order_id}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                    Order Summary
                </Typography>
                <Typography>
                    <strong>Product:</strong> {product?.title}
                </Typography>
                <Typography>
                    <strong>Category:</strong> {product?.category}
                </Typography>
                <Typography>
                    <strong>Quantity:</strong> {order?.quantity}
                </Typography>
                <Typography>
                    <strong>Price:</strong> ${product?.price?.toFixed(2)}
                </Typography>
                <Typography>
                    <strong>Subtotal:</strong> $
                    {(order?.quantity * product?.price).toFixed(2)}
                </Typography>
                <Typography>
                    <strong>Estimated Tax:</strong> 8%
                </Typography>
                <Typography>
                    <strong>Total:</strong> ${order?.total_amount?.toFixed(2)}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                    Customer Details
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <strong>Name:</strong> {order?.full_name}
                    </Grid>
                    <Grid item xs={12}>
                        <strong>Email:</strong> {order?.email}
                    </Grid>
                    <Grid item xs={12}>
                        <strong>Address:</strong>{" "}
                        {order?.delivery_address?.address},{" "}
                        {order?.delivery_address?.landmark},{" "}
                        {order?.delivery_address?.city}{" "}
                        {order?.delivery_address?.state},{" "}
                        {order?.delivery_address?.postalCode},{" "}
                        {order?.delivery_address?.country}
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="body1">
                You will receive an email confirmation shortly. We appreciate
                your business!
            </Typography>
        </Box>
    );
};

export default ThankYou;
