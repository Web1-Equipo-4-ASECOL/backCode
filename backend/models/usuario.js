const mongoose = require('mongoose');
const{ Schema } = mongoose;

// var validateEmail = function(correo) {
//     var re = /^\w+([\.-]?\emailw+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(correo)
// };

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
        //validate: [validateEmail, 'Please fill a valid email address'],
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type:String,
        required:true,
        maxlength:100
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