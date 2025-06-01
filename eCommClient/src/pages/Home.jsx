import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CardActions,
} from "@mui/material";

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
		const categories = ["mens-shirts", "mens-shoes", "womens-bags", "womens-dresses"];
		Promise.all(
			categories.map((category) =>
				fetch(`https://dummyjson.com/products/category/${category}`)
					.then((res) => res.json())
					.then((data) => setProducts((prevProducts) => [...prevProducts, ...data.products]))
			)
		)
    }, []);

    return (
        <Box p={4} ml={4}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                All Products
            </Typography>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card
                            sx={{
								marginBottom: "1rem",
								width: "16rem",
								height: "24rem",
								padding: "1rem",
								borderRadius: "8px",
								backgroundColor: "grey.100",
								boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                display: "flex",
                                flexWrap: "wrap",
                                flexDirection: "column",
                                cursor: "pointer",
                                transition: "transform 0.3s ease",
                                "&:hover": { transform: "scale(1.05)" },
								"&:active": { transform: "scale(0.95)" },

                            }}
                            onClick={() =>
                                (window.location.href = `/product/${product.id}`)
                            }
                        >
                            <CardMedia
                                component="img"
                                height="200"
								sx={{ objectFit: "cover",  }}
                                image={product.thumbnail}
                                alt={product.title}
                            />
                            <CardContent sx={{ flexGrow: 1, padding: "0.8rem" }}>
                                <Typography variant="h6" gutterBottom>
                                    {product.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    ${product.price}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ mt: 0 }}>
                                <Button size="small" variant="outlined">
                                    View Product
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HomePage;
