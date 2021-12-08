const models = require('../models');
const bcrypt = require('bcryptjs');
const token = require('../services/token');

//privado

//publica
module.exports = {
    add : async(req,res,next) =>{
        try {
            let checkNombre = await models.Categoria.findOne({nombre:req.body.nombre})
            if(!checkNombre){
                const reg = await models.Categoria.create(req.body)
                res.status(200).json(reg)
            }else{
                res.status(401).send({
                    message : 'La categoria ya existe!'
                })
            }
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
            // const reg = await models.Categoria.find({createdAt: 0, _id:0}).sort()
            console.log(req.body);
            let valorBusqueda = req.query.valor; //Lo manda por params 
            const reg = await models.Categoria.find({$or: [
                {nombre: new RegExp(valorBusqueda, 'i')}, 
                {descripcion: new RegExp(valorBusqueda, 'i')}
            ]}).sort({createdAt : -1});
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
            const reg = await models.Categoria.findByIdAndUpdate({_id: req.body._id},{estado: 1});
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
            const reg = await models.Categoria.findByIdAndUpdate({_id: req.body._id},{estado: 0});
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
            let checkNombre = await models.Categoria.findOne({nombre:req.body.nombre})
            if(!checkNombre){
                const reg = await models.Categoria.findByIdAndUpdate({_id : req.body._id},{
                    nombre : req.body.nombre,
                    descripcion : req.body.descripcion
                })
                res.status(200).json(reg)
            }else{ 
                const reg = await models.Categoria.findByIdAndUpdate({_id : req.body._id},{
                    descripcion : req.body.descripcion
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
            const reg = await models.Categoria.find({estado : 1}).sort({createdAt : -1});
            res.status(200).json(reg)
        }  catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error interno'
            });
            next(error);
        }
    },
    // remove: async(req,res,next) =>{
    //     try {
    //         const reg = await models.Categoria.findByIdAndDelete({_id : req.body._id});
    //         res.status(200).json(reg)
    //     } catch (error) {
    //         res.status(500).send({
    //             message : 'Ocurrió un error interno'
    //         });
    //         next(error);
    //     }
    // }

}