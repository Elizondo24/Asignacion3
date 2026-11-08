
const Producto = require('../models/Producto');

// GET: Consultar todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();

        res.status(200).json({
            mensaje: 'Productos consultados correctamente',
            total: productos.length,
            productos
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar los productos',
            error: error.message
        });
    }
};

// GET: Consultar un producto por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json(producto);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'El identificador del producto no es válido'
            });
        }

        res.status(500).json({
            mensaje: 'Error al consultar el producto',
            error: error.message
        });
    }
};

// POST: Registrar un producto
const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);

        const productoGuardado = await nuevoProducto.save();

        res.status(201).json({
            mensaje: 'Producto registrado correctamente',
            producto: productoGuardado
        });

    } catch (error) {
        if (error.name === 'ValidationError' ||
            error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'Datos del producto inválidos',
                error: error.message
            });
        }

        res.status(500).json({
            mensaje: 'Error al registrar el producto',
            error: error.message
        });
    }
};

// PUT: Actualizar un producto
const actualizarProducto = async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Producto actualizado correctamente',
            producto: productoActualizado
        });

    } catch (error) {
        if (error.name === 'CastError' ||
            error.name === 'ValidationError') {
            return res.status(400).json({
                mensaje: 'Identificador o datos inválidos',
                error: error.message
            });
        }

        res.status(500).json({
            mensaje: 'Error al actualizar el producto',
            error: error.message
        });
    }
};

// DELETE: Eliminar un producto
const eliminarProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(
            req.params.id
        );

        if (!productoEliminado) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Producto eliminado correctamente',
            producto: productoEliminado
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'El identificador del producto no es válido'
            });
        }

        res.status(500).json({
            mensaje: 'Error al eliminar el producto',
            error: error.message
        });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
