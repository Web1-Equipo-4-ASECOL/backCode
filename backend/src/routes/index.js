const express = require('express');
const router = express.Router();
const usuarioRouter = require('./usuario');
// const categoriaRouter = require('../models/categoria');
// const productoRouter = require('../models/producto');

router.use('/user',usuarioRouter);
// router.use('/producto',productoRouter);
// router.use('/categoria',categoriaRouter);
module.exports = router;