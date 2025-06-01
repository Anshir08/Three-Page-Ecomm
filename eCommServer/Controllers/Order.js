import Order from "../Models/Order.js";
import { sendEmail } from "../utils/sendMail.js";

export const createOrder = async (req, res) => {
    try {
        const {
            fullName,
            email,
            address,
            landmark,
            city,
            state,
            postalCode,
            country,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            productId,
            quantity,
            totalAmount,
            status,
        } = req.body;

        const order_id = Date.now().toString();
        const full_name = fullName;
        const delivery_address = {
            address,
            landmark,
            city,
            state,
            postalCode,
            country,
        };
        const payment_details = {
            card_number: cardNumber,
            card_holder_name: cardHolderName,
            expiry_date: expiryDate,
            cvv,
        };
        const product_id = productId;
        const total_amount = totalAmount;

        const order = new Order({
            order_id,
            full_name,
            email,
            delivery_address,
            payment_details,
            product_id,
            quantity,
            total_amount,
            status,
        });
        await order.save();
        await sendEmail({
            email,
            subject: "Order Confirmation ✅",
            message: "Your order has been placed successfully.",
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ product_id: req.params.productId });
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
