const express = require('express');
const router = express.Router();
const usuarioRouter = require('./usuario');
const categoriaRouter = require('./categoria');
const productoRouter = require('./producto');
const compraRouter = require('./compra');

router.use('/usuario', usuarioRouter);
router.use('/producto', productoRouter);
router.use('/categoria', categoriaRouter);
router.use('/compra', compraRouter);
module.exports = router;