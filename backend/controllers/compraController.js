const models = require('../models');
const bcrypt = require('bcryptjs');
const token = require('../services/token');

module.exports = {
    add : async(req,res,next) =>{
        try {
            const reg = await models.Compra.create(req.body)
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error interno'
            });
            next(error)
        }
    },

    list: async(req,res,next) =>{
    
        try {
            // let valorBusqueda = req.body.valor;  
            // const reg = await models.Producto.find({createdAt: 0, _id:0}).sort()
            let valorBusqueda = req.query.valor; //Lo manda por params 
            const reg = await models.Compra.find({$or: [
                // {user_compra: new RegExp(valorBusqueda, 'i')}
                {codigo: new RegExp(valorBusqueda, 'i')},
                
            ]
        }) .populate('producto',{
            nombre : 1
        })
            .sort({createdAt : -1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error interno'
            });
            next(error);
        }
    },
   
    enabled: async(req,res,next) =>{
        try {
            const reg = await models.Compra.findByIdAndUpdate({_id: req.body._id},{estado: 1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error interno'
            });
            next(error);
        }
    },
    disabled: async(req,res,next) =>{
        try {
            const reg = await models.Compra.findByIdAndUpdate({_id: req.body._id},{estado: 0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error interno'
            });
            next(error);
        }
    }
    

}