const mongoose = require('mongoose');
const{ Schema } = mongoose;

const usuarioSchema = new Schema({
    nombre : {
        type: String,
        required:true,
        maxlength:100
    },
    correo : {
        type: String,
        required:true,
        maxlength:100,
        trim:true,
        unique:true,
        lowercase: true,
    },
    password : {
        type:String,
        required:true,
        maxlength:100
    },
    estado : {
        type: Number,
        default: 1
    },
    rol: {
        type:String,
        required:true,
        enum:['Administrador','Cliente']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Usuario = mongoose.model('usuario',usuarioSchema);

module.exports = Usuario