import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import productoRoutes from './src/routes/product.routes.js'; 
import checkoutRoutes from './src/routes/checkout.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json())

app.use('/api/checkout', checkoutRoutes);
app.use('/api', productoRoutes); 

const uri = `mongodb+srv://nachogitman_db_user:${process.env.MONGO_PASSWORD}@cluster0.hqn7k6e.mongodb.net/?appName=Cluster0`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDB() {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("¡Conectado exitosamente a MongoDB!");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}
connectDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});