import express from 'express';
import { crearProducto, obtenerProductos } from '../controllers/product.controller.js';

const router = express.Router();


router.post('/productos', crearProducto);
router.get('/productos', obtenerProductos);

export default router;