
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres']
    },

    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    },

    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        trim: true
    },

    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0.01, 'El precio debe ser mayor que cero']
    },

    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
        min: [0, 'La cantidad no puede ser negativa'],
        validate: {
            validator: Number.isInteger,
            message: 'La cantidad debe ser un número entero'
        }
    },

    estado: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);
