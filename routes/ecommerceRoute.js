const express = require('express');
const EcommerceController = require('../controllers/ecommerceController');
const ctrl = new EcommerceController();
const router = express.Router();

router.get('/', ctrl.ecommerceView);
router.get('/carrinho', ctrl.carrinhoView);
router.post('/obter-valor', ctrl.obterValor);

module.exports = router;