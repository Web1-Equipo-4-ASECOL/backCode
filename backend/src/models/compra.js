const mongoose = require('mongoose');
const{ Schema } = mongoose;

const compraSchema = new Schema({
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
    prducto : {
        type : Schema.ObjectId, 
        ref: 'producto'
    },
    cantidad : {
        type: Number,
        required:true,
        default: 0
    },
    total : {
        type: Number,
        required:true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Compra = mongoose.model('categoria',compraSchema);

module.exports = Compra