import { Schema, model } from "mongoose";

const orderSchema = new Schema(
    {
        order_id: { type: String, required: true },
        full_name: { type: String, required: true },
        email: { type: String, required: true },
        delivery_address: {
            address: { type: String, required: true },
            landmark: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        payment_details: {
            card_number: { type: String, required: true },
            card_holder_name: { type: String, required: true },
            expiry_date: { type: String, required: true },
            cvv: { type: String, required: true },
        },
        product_id: { type: String, required: true },
        quantity: { type: Number, required: true },
        total_amount: { type: Number, required: true },
        status: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Order = model("Order", orderSchema);

export default Order;
