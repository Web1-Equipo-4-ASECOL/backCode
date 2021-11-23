const mongoose = require('mongoose');
const{ Schema } = mongoose;

const productoSchema = new Schema({
    categoria : {
        type : Schema.ObjectId, 
        ref: 'categoria'
    },
    codigo : {
        type: String,
        required:true,
        maxlength:25,
        unique:true
    },
    nombre : {
        type: String,
        required:true,
        maxlength:100,
        unique:true
    },
    descripcion : {
        type: String,
        required:true,
        maxlength:255,
    },
    precio : {
        type: Number,
        required:true,
    },
    estado : {
        type: Number,
        default: 1
    },
    imagen : {
        type: String,
        required:true,
    },
});

const Producto = mongoose.model('producto',productoSchema);
module.exports = Producto