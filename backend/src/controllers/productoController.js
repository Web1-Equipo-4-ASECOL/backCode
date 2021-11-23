const models = require('../models');
const bcrypt = require('bcryptjs');
const token = require('../services/token');

module.exports = {
    add : async(req,res,next) =>{
        try {
            const reg = await models.Producto.create(req.body)
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
            const reg = await models.Producto.find({$or: [
                {nombre: new RegExp(valorBusqueda, 'i')}, 
                {descripcion: new RegExp(valorBusqueda, 'i')},
                {codigo: new RegExp(valorBusqueda, 'i')},
                // {categoria: new RegExp(valorBusqueda, 'i')},
            ]
        })
            .populate('categoria',{
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
            const reg = await models.Producto.findByIdAndUpdate({_id: req.body._id},{estado: 1});
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
            const reg = await models.Producto.findByIdAndUpdate({_id: req.body._id},{estado: 0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error interno'
            });
            next(error);
        }
    },
    update: async(req,res,next) =>{
        try {
            let checkNombre = await models.Producto.findOne({nombre:req.body.nombre})
            if(!checkNombre){
                const reg = await models.Producto.findByIdAndUpdate({_id : req.body._id},{
                    nombre : req.body.nombre,
                    descripcion : req.body.descripcion,
                    categoria : req.body.categoria,
                    codigo : req.body.codigo,
                    precio : req.body.precio,
                    imagen : req.body.imagen,
                })
                res.status(200).json(reg)
            }else{ 
                const reg = await models.Producto.findByIdAndUpdate({_id : req.body._id},{
                    descripcion : req.body.descripcion,
                    categoria : req.body.categoria,
                    codigo : req.body.codigo,
                    precio : req.body.precio,
                    imagen : req.body.imagen,
                })
                res.status(200).json(reg)
            }
        } catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error interno'
            });
            next(error);
        }
    },
    listActive: async(req,res,next) =>{
        try {
            const reg = await models.Producto.find({estado : 1}).sort({createdAt : -1});
            res.status(200).json(reg)
        }  catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error interno'
            });
            next(error);
        }
    },
    remove: async(req,res,next) =>{
        try {
            const reg = await models.Producto.findByIdAndDelete({_id : req.body._id});
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error interno'
            });
            next(error);
        }
    }

}