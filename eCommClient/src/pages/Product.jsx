// ProductPage.jsx
import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    MenuItem,
    Select,
    TextField,
    Card,
    CardMedia,
    CardContent,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "../redux/OrderSlice";
import { useDispatch } from "react-redux";

const ProductPage = () => {
    const [selectedColor, setSelectedColor] = useState("Black");
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const params = useParams();
    const colors = ["Black", "White", "Blue"];
    const sizes = ["S", "M", "L", "XL"];
	const [thumbnail, setThumbnail] = useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();


    // const product = {
    //   title: 'Premium T-Shirt',
    //   description: 'High quality cotton t-shirt with premium print.',
    //   price: 29.99,
    //   image: 'https://thebanyantee.com/cdn/shop/files/Black-T-shirt.jpg?v=1721380366',
    //   colors: ['Black', 'White', 'Blue'],
    //   sizes: ['S', 'M', 'L', 'XL'],
    // };

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct({
                    ...data,
                    colors,
                    sizes,
                });
            });
    }, [params.id]);

    const handleBuyNow = () => {
        dispatch(createOrder());
		navigate(`/product/${params.id}/checkout`);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            mt={3}
            mb={3}
            sx={{ flexGrow: 1 }}
        >
            <Card
                sx={{
                    display: "flex",
                    p: 2,
                    maxWidth: 800,
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                }}
            >
				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
				{product?.images?.map((image, index) => 
					<CardMedia
						key={index}
						component="img"
						sx={{ width: 100, height: 100, objectFit: "cover", border: "1px solid #ccc", borderRadius: "1rem", backgroundColor: (index === thumbnail) ? "lightblue" : "#fff", mb: 1, cursor: "pointer" }}
						image={image}
						alt={product?.title}
						onClick={() => setThumbnail(index)}
					/>
				)}
				</Box>
                <CardMedia
                    component="img"
                    sx={{ width: 400, height: 500, objectFit: "cover" }}
                    image={product?.images?.[thumbnail]}
                    alt={product?.title}
                />
                <CardContent sx={{ flex: 1, p: 2, m: 1 }}>
                    <Typography variant="h5" gutterBottom>
                        {product?.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {product?.description}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                        ${product?.price}
                    </Typography>

                    {/* Variant Selectors */}
                    <Box display="flex" gap={2} my={2}>
                        <FormControl fullWidth>
                            <InputLabel>Color</InputLabel>
                            <Select
                                value={selectedColor}
                                label="Color"
                                onChange={(e) =>
                                    setSelectedColor(e.target.value)
                                }
                            >
                                {product?.colors?.map((color) => (
                                    <MenuItem key={color} value={color}>
                                        {color}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Size</InputLabel>
                            <Select
                                value={selectedSize}
                                label="Size"
                                onChange={(e) =>
                                    setSelectedSize(e.target.value)
                                }
                            >
                                {product?.sizes?.map((size) => (
                                    <MenuItem key={size} value={size}>
                                        {size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Quantity Selector */}
                    <TextField
                        type="number"
                        label="Quantity"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(
                                Math.max(1, parseInt(e.target.value) || 1)
                            )
                        }
                        inputProps={{ min: 1 }}
                        sx={{ mb: 2, width: "120px" }}
                    />

                    {/* Buy Now Button */}
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleBuyNow}
                        >
                            Buy Now
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProductPage;
