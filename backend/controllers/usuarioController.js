const models = require('../models');
const bcrypt = require('bcryptjs');
const token = require('../services/token');

//privado

//publica
module.exports = {
    add : async(req,res,next) =>{
        try {
            let checkemail = await models.Usuario.findOne({correo:req.body.correo})
            if(!checkemail){
                req.body.password = await bcrypt.hash(req.body.password, 10);
                const reg = await models.Usuario.create(req.body)
                res.status(200).json(reg)
            }else{
                res.status(401).send({
                    message : 'El usuario ya existe!'
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
            let valorBusqueda = req.query.valor; //Lo manda por params 
            // let valorBusqueda = req.body.valor; 
            // const reg = await models.Usuario.find({createdAt: 0, _id:0}).sort()
            const reg = await models.Usuario.find({$or: [
                {nombre: new RegExp(valorBusqueda, 'i')}, 
                {correo: new RegExp(valorBusqueda, 'i')}, 
                {rol: new RegExp(valorBusqueda, 'i')}
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
            const reg = await models.Usuario.findByIdAndUpdate({_id: req.body._id},{estado: 1});
            res.status(200).json(reg);

            //Hacer un solo metodo de cambio de estado
            // const regAux = await models.Usuario.find({_id: req.body._id});
            // let estadoAux = regAux.estado === 1 ? 0 : 1
            // const reg2 = await models.Usuario.updateOne({_id: req.body._id},{estado : estadoAux}) 
            // res.status(200).json(reg2);
        } catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error interno'
            });
            next(error);
        }
    },
    disabled: async(req,res,next) =>{
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id: req.body._id},{estado: 0});
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
            let auxPassword = req.body.password;
            const regAux = await models.Usuario.findOne({correo : req.body.correo});
            if(auxPassword !== regAux.password){
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg = await models.Usuario.updateOne({correo : req.body.correo},{
                nombre : req.body.nombre,
                rol : req.body.rol,
                password: req.body.password
            })
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error interno'
            });
            next(error);
        }
    },
    login: async(req,res,next) =>{
        try {
            let checkUser = await models.Usuario.findOne({
                correo : req.body.correo, 
                estado : 1
            });
            // console.log(checkUser)
            if(checkUser){
                let match = await bcrypt.compare(req.body.password, checkUser.password);
                if(match){
                    let tokenReturn = await token.encode(checkUser);
                    // console.log(tokenReturn)
                    res.status(200).json({checkUser,tokenReturn})
                    // res.status(200).json({checkUser})
                }else{
                    res.status(401).send({
                        message : 'Usuario no autorizado'
                    }) 
                }
            }else{
                res.status(404).send({
                    message : 'Usuario no encontrado'
                })
            }
        } catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error interno'
            });
            next(error);
        }
    }
}

