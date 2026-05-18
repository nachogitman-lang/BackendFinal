import Producto from '../models/product.js';

export const crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, imagen } = req.body;


        if (!nombre || !descripcion || !precio || !imagen) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const nuevoProducto = new Producto({ nombre, descripcion, precio, imagen });
        await nuevoProducto.save();

        res.status(201).json({ message: "Producto guardado con éxito", producto: nuevoProducto });
    } catch (error) {
        console.error("Error en el controlador de productos:", error);
        res.status(500).json({ message: "Error interno del servidor al guardar el producto" });
    }
};

export const obtenerProductos = async (req, res) => {
    try {
        
        const productos = await Producto.find(); 
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al obtener los productos de la base de datos" });
    }
};