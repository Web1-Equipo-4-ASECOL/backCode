const models = require('../models');
const bcrypt = require('bcryptjs');
const token = require('../services/token');

//privado

//publica
module.exports = {
    add : async(req,res,next) =>{
        try {
            
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error interno'
            });
            next(error)
        }
    }
}