import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';


dotenv.config(); 

const router = express.Router();


const client = new MercadoPagoConfig({ 
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
});

router.post('/create-preference', async (req, res) => {
    try {
        const { items } = req.body;

       
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "El carrito está vacío" });
        }

        
        const itemsToPay = items.map(item => ({
            id: String(item._id),
            title: String(item.nombre).trim(),
            unit_price: parseFloat(Number(item.precio).toFixed(2)), 
            quantity: parseInt(item.cantidad, 10),                
            currency_id: 'ARS'      
        }));

        const preference = new Preference(client);

        
        const response = await preference.create({
            body: {
                items: itemsToPay,
                
                backUrls: {
                    success: 'http://localhost:5173/',     
                    failure: 'http://localhost:5173/cart', 
                    pending: 'http://localhost:5173/',
                },
                
                autoReturn: 'approved', 
            }
        });

       
        res.status(200).json({ 
            id: response.id, 
            init_point: response.init_point 
        });

    } catch (error) {
        console.error("Error al crear la preferencia de Mercado Pago:", error);
        res.status(500).json({ 
            message: "Error interno al procesar el pago",
            error: error.message 
        });
    }
});

export default router;