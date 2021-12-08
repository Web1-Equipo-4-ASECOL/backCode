const mongoose = require('mongoose');
const{ Schema } = mongoose;

const compraSchema = new Schema({
    user_compra : {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    codigo : {
        type: String,
        required:true,
        maxlength:10,
        unique:true
    },
    descripcion : {
        type: String,
        required:true,
        maxlength:255,
    },
    producto : {
        type : Schema.Types.ObjectId, 
        ref: 'producto',
        required: true
    },
    cantidad : {
        type: Number,
        default: 0,
        required:true
    },
    total : {
        type: Number,
        default: 0,
        required:true
    },
    estado : {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Compra = mongoose.model('compra',compraSchema);

module.exports = Compra